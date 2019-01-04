const _ = require('lodash'),
    config = require('..//config'),
    common = require('../lib/common'),
    AdapterBase = require('./AdapterBase'),
    cache = {};

/**
 * Dependencies are injected so adapters can be setup outside of codebase.
 * @param {AdapterBase} adapter
 * @returns {AdapterImplementation} The implementation that's configured for current setup
 */
function getAdapterImplementation(adapter) {
    const choice = config.get(`${adapter.getKey()}:active`);
    let adapterConfig,
        AdapterImplementationClass,
        adapterImplementation;

    adapterConfig = config.get(adapter.getKey())[choice];

    // CASE: type does not exist
    if (!choice) {
        throw new common.errors.IncorrectUsageError({
            message: `No adapter found for ${adapter.getKey()}`
        });
    }

    // CASE: cached
    if (cache[choice]) {
        return cache[choice];
    }

    // CASE: active adapter is a npm module
    try {
        AdapterImplementationClass = require(choice);
    } catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') {
            throw new common.errors.IncorrectUsageError({err});
        }
    }

    // CASE: load adapter from content (.../content/storage)
    const implementationPath = `${config.getAdapterPath(adapter.getKey())}${choice}`;
    try {
        AdapterImplementationClass = require(implementationPath);
    } catch (err) {
        if (err.message.match(/strict mode/gi)) {
            throw new common.errors.IncorrectUsageError({
                message: `Your custom ${adapter.getKey()} adapter must use strict mode.`,
                help: 'Add \'use strict\'; on top of your adapter.',
                err: err
            });
            // CASE: if module not found it can be an error within the adapter (cannot find bluebird for example)
        } else if (err.code === 'MODULE_NOT_FOUND' && err.message.indexOf(implementationPath) === -1) {
            throw new common.errors.IncorrectUsageError({
                message: `We have detected an error in your custom ${adapter.getKey()} adapter.`,
                err
            });
            // CASE: only throw error if module does exist
        } else if (err.code !== 'MODULE_NOT_FOUND') {
            throw new common.errors.IncorrectUsageError({
                message: `We have detected an unknown error in your custom ${adapter.getKey()} adapter.`,
                err
            });
        }
    }

    // CASE: check in the internal path, if it exists
    if (adapter.getInternalPathKey()) {
        try {
            AdapterImplementationClass = AdapterImplementationClass || require(`${config.get('paths')[adapter.getInternalPathKey()]}${choice}`);
        } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') {
                throw new common.errors.IncorrectUsageError({
                    err,
                    context: `We cannot find your adapter in: ${config.getContentPath('storage')} or: ${config.get('paths').internalStoragePath}`
                });
            } else {
                throw new common.errors.IncorrectUsageError({
                    message: 'We have detected an error in your custom storage adapter.',
                    err
                });
            }
        }
    }

    adapterImplementation = new AdapterImplementationClass(adapterConfig);

    // CASE: if multiple adapter modules are installed, instanceof could return false
    if (
        !(adapterImplementation instanceof adapter.getBase()) &&
        Object.getPrototypeOf(AdapterImplementationClass).name !== adapter.getBase().name
    ) {
        throw new common.errors.IncorrectUsageError({
            message: `Your ${adapter.getKey()} adapter does not inherit from the Base interface.`
        });
    }

    if (!adapterImplementation.requiredFns) {
        throw new common.errors.IncorrectUsageError({
            message: `Your ${adapter.getKey()} adapter does not provide the minimum required functions.`
        });
    }

    if (
        // Note, because the user can supply whatever implementation they want,
        // this isn't strictly safe.
        _.xor(
            adapterImplementation.requiredFns,
            Object.keys(
                _.pick(
                    Object.getPrototypeOf(adapterImplementation),
                    adapterImplementation.requiredFns
                )
            )
        ).length
    ) {
        throw new common.errors.IncorrectUsageError({
            message: `Your ${adapter.getKey()} adapter does not provide the minimum required functions.`
        });
    }

    cache[choice] = adapterImplementation;
    return cache[choice];
}

module.exports = getAdapterImplementation;

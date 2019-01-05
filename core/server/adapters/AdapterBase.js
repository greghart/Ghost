/**
 * The adapter base is a simple interface that adapters must adhere to.
 *
 * The base class also comes with some default implementations for registering,
 * configuring, and loading adapter implementations.
 */
class AdapterBase {

    /**
     * @returns a unique key for this adapter. Dictates path in config
     */
    getKey() {
        throw new Error('AdapterBase.getKey -- must be defined');
    }

    /**
     * support for an internal configurable path to adapter implementations
     *
     * @todo What is the use case around configuring internal adapter paths?
     * @returns {string} A key in paths config, if any
     */
    getInternalPathKey() {
        return undefined;
    }

    /**
     * Get the default implementation base, if any
     *
     * @returns {Class} Some base implementation interface
     */
    getBase() {
        throw new Error('AdapterBase.getBase -- must be defined');
    }

    // @todo Explicitly set the default implementation choice? Currently just enforced by default config.
}

module.exports = AdapterBase;

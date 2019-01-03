const StorageAdapter = require('./StorageAdapter'),
    getAdapterImplementation = require('../getAdapterImplementation');

const adapter = new StorageAdapter();

module.exports.getStorage = () => { return getAdapterImplementation(adapter); }

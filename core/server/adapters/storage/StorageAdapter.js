const AdapterBase = require('../AdapterBase'),
    StorageBase = require('ghost-storage-base');

class StorageAdapter extends AdapterBase {

    getKey() {
        return 'storage';
    }

    getInternalPathKey() {
        return 'internalStoragePath';
    }

    getBase() {
        return StorageBase;
    }

}

module.exports = StorageAdapter;

const AdapterBase = require('../AdapterBase'),
    SchedulingBase = require('./SchedulingBase');

class SchedulingAdapter extends AdapterBase {

    getKey() {
        return 'scheduling';
    }

    getInternalPathKey() {
        return 'internalSchedulingPath';
    }

    getBase() {
        return SchedulingBase;
    }

}

module.exports = SchedulingAdapter;

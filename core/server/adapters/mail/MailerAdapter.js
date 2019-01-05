const AdapterBase = require('../AdapterBase');
const MailerBase = require('./MailerBase');

class MailerAdapter extends AdapterBase {

    getKey() {
        return 'mail';
    }

    getInternalPathKey() {
        return 'internalMailerPath';
    }

    getBase() {
        return MailerBase;
    }

}

module.exports = MailerAdapter;

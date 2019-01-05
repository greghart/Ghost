const MailerAdapter = require('./MailerAdapter'),
    getAdapterImplementation = require('../getAdapterImplementation');

const adapter = new MailerAdapter();

module.exports.getMailer = () => { return getAdapterImplementation(adapter); }

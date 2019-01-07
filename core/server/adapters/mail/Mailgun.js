/**
 * An example mailer adapter for utilizing Mailgun.
 * Thin wrapper around `mailgun-js`
 * TODO Move this to a standalone module, and remove dependency while we're at it.
 */
const _ = require('lodash'),
    getMailgun = require('mailgun-js'),
    MailerBase = require('./MailerBase');

class Mailgun extends MailerBase {

    constructor(options) {
        super(options);
        this.options = options;
        // Delegate options from config directly
        this.mailgun = getMailgun(options);
    }

    send({ to, subject, text, html }) {
        const mailgunData = {
            from: this.options.from || 'Your Ghost Blog <me@samples.mailgun.org>',
            to,
            subject,
            text,
            html
        };
        return this.mailgun.messages().send(mailgunData)
        .then((results) => {
            return results;
        });
    }

    isUsingDirect() {
        return false;
    }

}

module.exports = Mailgun

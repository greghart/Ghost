
class MailerBase {

    constructor() {
        Object.defineProperty(this, 'requiredFns', {
            value: ['send', 'isUsingDirect'],
            writable: false
        });
    }

    /**
     * Send a message
     * @param {Object} - { to, subject, text, html }. Note, `from` should be set in adapter only.
     */
    send(message) {
        throw new Error('MailerBase.send -- must be defined');
    }

    /**
     * @todo Leaky abstraction? Current mail consumers send a notification when
     *       nodemailer is in direct transport. Can this just be part of adapter?
     * @returns {boolean} Whether we are trying to directly send e-mails
     */
    isUsingDirect() {
        throw new Error('MailerBase.isUsingDirect -- must be defined');
    }

}

module.exports = MailerBase;

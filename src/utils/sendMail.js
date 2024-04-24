import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EADMIN,
        pass: config.PADMIN
    }
});

export const sendMail = (to, subject, message) => {
    return transport.sendMail({
        from: config.EADMIN,
        to,
        subject,
        html: message
    });
};

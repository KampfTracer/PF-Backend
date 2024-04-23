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



// Este código está deshabilitado para evitar su ejecución

// import nodemailer from 'nodemailer';
// import { config } from '../config/config.js';

// const transport = nodemailer.createTransport({
//     host: 'smtp.protonmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: config.EADMIN,
//         pass: config.PADMIN
//     }
// });

// export const sendMail = (to, subject, message) => {
//     // Esta función está deshabilitada
//     // return transport.sendMail({
//     //     from: config.EADMIN,
//     //     to,
//     //     subject,
//     //     html: message
//     // });
// };

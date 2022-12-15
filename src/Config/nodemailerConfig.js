const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "htk02102002@gmail.com", 
        pass: "rxqenmkgbvlxwjim", 
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter

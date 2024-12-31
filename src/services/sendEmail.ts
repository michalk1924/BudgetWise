"use server"

const nodemailer = require('nodemailer');

async function sendEmail(to: string, subject: string, text: string, file? : ArrayBuffer) {

    console.log("sendEmail" + subject + " " + text);
    
    if (!to || !subject || !text) {
        throw new Error('Missing required parameters');
    }
    if (!validateEmail(to)) {
        throw new Error('Invalid email format');
    }    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const attachmentBuffer = file ? Buffer.from(file) : undefined;

    let mailOptions = {
        from: 'michal21924@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: attachmentBuffer ? [{ filename: 'monthly-summary.pdf', content: attachmentBuffer }] : []
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw 'Failed to send email';
    }
}

function validateEmail(to: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(to);
}

export default sendEmail;

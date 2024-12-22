"use server"

const nodemailer = require('nodemailer');

async function sendEmail(to: string, subject: string, text: string) {
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
            rejectUnauthorized: false // השבתת אימות SSL
            //לעבוד על זה!!!!!!!! אם יעשה בעיות גם במייל השני!!!!!!!
        }
    });


    let mailOptions = {
        from: 'michal21924@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Failed to send email');
    }
}

function validateEmail(to: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(to);
}

export default sendEmail;

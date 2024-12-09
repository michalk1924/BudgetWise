"use client"

import sendEmail from '../../services/sendEmail';

const a = {
    to: "michalk1924@gmail.com",
    subject: "email from budget wise",
    text: "wow i do it!!!!!!!!! ⭐⭐⭐⭐⭐⭐"
}

export default function sendEmailFunction() {
  
    const send = () =>{
        sendEmail(a.to, a.subject, a.text);
        console.log("email sent");
    }

    return (
        <button onClick={send}>Send Email</button>
    )
}

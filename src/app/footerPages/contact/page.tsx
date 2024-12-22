import React from 'react';
import styles from "../footerPages.module.css";

const ContactUsPage = () => {
    return (
      <div className={styles.page}>
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, please reach out to us:</p>
        <p>Email: support@financeapp.com</p>
        <p>Phone: +1 (800) 123-4567</p>
      </div>
    );
  };

  export default ContactUsPage;

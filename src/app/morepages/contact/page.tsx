import React from "react";
import { Colors } from "../../../consts/enums";
import styles from "../../styles/styles.module.css";

const ContactUs: React.FC = () => {
  return (
    <div className={styles.page} style={{ backgroundColor: Colors.Success }}>
      <h1>Contact Us</h1>
      <p>Have questions? Reach out to us, and we’ll be happy to help!</p>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit" style={{ backgroundColor: Colors.Primary, color: "#fff" }}>Send</button>
      </form>
    </div>
  );
};

export default ContactUs;

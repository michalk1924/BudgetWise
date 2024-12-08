import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.footerTop}>
        <h3>Want to stay updated?</h3>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className={styles.footerSection}>
        <div className={styles.links}>
          <a href="#">Coaching Program</a>
          <a href="#">Login to App</a>
          <a href="#">Blog</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
        <div className={styles.footerSection}>
          <div className={styles.links}>
            <a href="#terms">Terms of Use</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#content">Content Policy</a>
            <a href="#accessibility">Accessibility Statement</a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.socialMedia}>
            <a href="#">
              <img src="/facebook_icon.webp" alt="Facebook" />
            </a>
            <a href="#">
              <img src="/whatsapp-icon.jpg" alt="whatsapp" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.footerBottom}>
        <p>© All rights reserved for My App</p>
        <p>
          <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

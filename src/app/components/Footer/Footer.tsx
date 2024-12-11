import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <br />
        <br />
        <h3>Want to stay updated?</h3>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.footerMain}>
        <div className={styles.footerMiddle}>
          <div className={styles.footerSection}>
            <div className={styles.links}>
              <Link href="/login" title="login">
                login
              </Link>
              <Link href="/footerPages/questions">Questions and Answers</Link>
              <Link href="/about">About Us</Link>
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.links}>
            <Link href="/footerPages/contact">Contact Us</Link>
              <Link href="/footerPages/content">Content Policy</Link>
              <Link href="/footerPages/accessibility">
                Accessibility Statement
              </Link>
            </div>
          </div>

          <div className={styles.footerSection}>
            <div className={styles.icons}>
              <div className={styles.socialMedia}>
                <a href="#">
                  <img src="/facebook_icon.webp" alt="Facebook" />
                </a>
                <a href="#">
                  <img src="/whatsapp-icon.jpg" alt="whatsapp" />
                </a>
              </div>
              <div className={styles.companies}>
                <a href="#">
                  <img src="/comp-icon1.png" alt="" />
                </a>
                <a href="#">
                  <img src="/comp-icon2.png" alt="" />
                </a>
                <a href="#">
                  <img src="/comp-icon3.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <p>© All rights reserved for My App</p>
          <p>
          <Link href="/footerPages/terms">Terms of Use</Link>
          |               <Link href="/footerPages/privacy">Privacy Policy</Link>

          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

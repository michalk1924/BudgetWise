import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

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
            <Link href="/morepages/coaching-program" className={styles.link}>
              Coaching Program
            </Link>
            <Link href="/login" className={styles.link}>
              Login to App
            </Link>
            <Link href="/blog" className={styles.link}>
              Blog
            </Link>
            <Link href="/about" className={styles.link}>
              About Us
            </Link>
            <Link href="/contact" className={styles.link}>
              Contact Us
            </Link>
          </div>
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
            <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

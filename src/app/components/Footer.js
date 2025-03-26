import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css"; // Import CSS Module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Company Info */}
        <div className={styles.footerSection}>
          <p className={styles.footerCompanyName}>
            700 Sewage Cleaning Services UAE
          </p>
        </div>

        {/* Company Links */}
        <div className={styles.footerSection}>
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/about-us" className={styles.footerLink}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className={styles.footerLink}>
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/careers" className={styles.footerLink}>
                Careers
              </Link>
            </li>
            <li>
              <Link href="/projects" className={styles.footerLink}>
                Our Projects
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className={styles.footerSection}>
          <h4>Resources</h4>
          <ul>
            <li>Electrical Safety</li>
            <li>Blog</li>
            <li>Energy Efficiency</li>
          </ul>
        </div>

        {/* Contact Now */}
        <div className={styles.footerSection}>
          <h4>Contact Now</h4>
          <a href="tel:+971555989664" className={styles.footerContactButton}>
            Call Us Now
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>
          Copyright © 2025 700Sewag | Design by{" "}
          <Link
            href="https://www.linkedin.com/in/geddada-renuka-6aa213300/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Renuka
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/arikatla-bhupathi-naidu-02356828a/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Bhupathi
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/nagababu-a-a20aa2269/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Nagababu
          </Link>
        </p>
        <div className={styles.footerLinks}>
          <Link href="#terms" className={styles.footerLink}>
            Terms of Use
          </Link>
          <Link href="#privacy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="#cookies" className={styles.footerLink}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

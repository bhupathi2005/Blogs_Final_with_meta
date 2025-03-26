"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css"; // Import CSS module

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target !== document.querySelector(`.${styles.menuToggle}`)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}></Link>
        <div
          className={`${styles.menu} ${menuOpen ? styles.active : ""}`}
          ref={menuRef}
        >
          <Link href="/" className={styles.menuItem}>
            Home
          </Link>
          <Link href="/about-us" className={styles.menuItem}>
            About Us
          </Link>
          <Link href="/services" className={styles.menuItem}>
            Services
          </Link>
          <Link href="/contact" className={styles.menuItem}>
            Contact
          </Link>
          <Link href="/blog" className={styles.menuItem}>
            Blogs
          </Link>
          <a href="tel:+971555989664" className={styles.contact}>
            Contact Us
          </a>
        </div>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

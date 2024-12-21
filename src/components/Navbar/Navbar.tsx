"use client"
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>The Daily Scribble</h1>
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
        <Link href="/write" className={styles.link}>
          Write
        </Link>
        <Link href="/sign-in" className={styles.link}>
          Sign in
        </Link>
        <button className={styles.getStarted}>Get started</button>
      </nav>
      <div
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
        onClick={toggleMenu} // Close the sidebar when clicked outside
      >
        <nav className={styles.sidebarNav}>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <Link href="/sign-in" className={styles.link}>
            Sign in
          </Link>
          <button className={styles.getStarted}>Get started</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

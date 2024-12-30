"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const isLoggedIn = false; // Replace with your actual login check logic

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>The Daily Scribble</h1>
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
        <Link href="/new-blog" className={styles.link}>
          Write
        </Link>
        {isLoggedIn ? (
          <div >
            <Image
              src="/icons/user.svg" 
              alt="User Avatar"
              // className={styles.avatar}
              width={25}
              height={25}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <Link href="/profile" className={styles.dropdownItem}>
                  Profile
                </Link>
                <Link href="/manage-posts" className={styles.dropdownItem}>
                  Manage Posts
                </Link>
                <Link href="/statistics" className={styles.dropdownItem}>
                 Statistics
                </Link>
                <button className={styles.logoutbtn } onClick={() => alert("Logging out...")}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
            <button className={styles.getStarted}>Get started</button>
          </>
        )}
      </nav>
      <div
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
        onClick={toggleMenu}
      >
        <nav className={styles.sidebarNav}>
          <Link href="/new-blog" className={styles.link}>
            Write
          </Link>
          {!isLoggedIn && (
            <>
              <Link href="/login" className={styles.link}>
                Sign in
              </Link>
              <button className={styles.getStarted}>Get started</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


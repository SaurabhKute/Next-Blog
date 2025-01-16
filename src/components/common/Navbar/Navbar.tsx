"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // Import next-auth hooks
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession(); // Get session data

  // console.log(session, "@session");

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" }); // Redirect to homepage after logout
  };

  const isLoggedIn = Boolean(session); // Check if the user is logged in

  return (
    <header className={styles.navbar}>
      <Link className={styles.siteLogo} href="/">
        The Daily Scribble
      </Link>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        &#9776;
      </button>
      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ""}`}>
        {isLoggedIn ? (
          <>
            <Link href="/new-blog" className={styles.navLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" /* Icon size */
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.writeIcon}
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
              Write
            </Link>

            <div className={styles.profileWrapper}>
              <Image
                src={session?.user?.image || "/icons/user.svg"}
                alt={session?.user?.name || "User Avatar"}
                className={styles.userAvatar}
                width={35}
                height={35}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/profile" className={styles.dropdownItem}>
                    Profile
                  </Link>
                  <Link href="/manage-posts" className={styles.dropdownItem}>
                    Manage Posts
                  </Link>
                  <Link href="/statistics" className={styles.dropdownItem}>
                    Statistics
                  </Link>
                  <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout {` (${session?.user?.name})`}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.authWrapper}>
            <Link href="/auth/login" className={styles.navLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" /* Icon size */
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.writeIcon}
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
              Write
            </Link>
            <Link href="/auth/login" className={styles.navLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" /* Icon size */
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.signInIcon}
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Sign in
            </Link>

            <button className={styles.startButton}>Get started</button>
          </div>
        )}
      </nav>
      <div
        className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
      >
        <nav className={styles.sidebarNav}>
          {isLoggedIn ? (
            <div className={styles.sidebarProfile}>
              <Link href="/profile" className={styles.sidebarLink}>
                Profile
              </Link>
              <Link href="/manage-posts" className={styles.sidebarLink}>
                Manage Posts
              </Link>
              <Link href="/statistics" className={styles.sidebarLink}>
                Statistics
              </Link>
              <button
                className={styles.sidebarLogoutButton}
                onClick={handleLogout}
              >
                Logout {` (${session?.user?.name})`}
              </button>
            </div>
          ) : (
            <div className={styles.sidebarAuth}>
              <Link href="/auth/login" className={styles.sidebarLink}>
                Write
              </Link>
              <Link href="/auth/login" className={styles.sidebarLink}>
                Sign in
              </Link>
              <button className={styles.sidebarStartButton}>Get started</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface DropdownItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}


export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session data and loading status

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const closeSidebar = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await signOut({ callbackUrl: "/auth/login" });
  };

  const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick, icon }) => (
    <Link href={href} className={styles.navLink} onClick={onClick}>
      {icon}
      {label}
    </Link>
  );


  const DropdownItem: React.FC<DropdownItemProps> = ({ href, label, onClick }) => (
    <Link href={href} className={styles.dropdownItem} onClick={onClick}>
      {label}
    </Link>
  );



  const UserAvatar: React.FC = () => (
    <Image
      src={session?.user?.image || "/icons/user.svg"}
      alt={session?.user?.name || "User Avatar"}
      className={styles.userAvatar}
      width={35}
      height={35}
      onClick={toggleDropdown}
    />
  );


  return (
    <header className={styles.navbar}>
      <Link className={styles.siteLogo} href="/">
        The Daily Scribble
      </Link>

      {session && <SearchBar/>
    }

      {status === "loading" ? (
        <div className={styles.loading}></div>
      ) : (
        <>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            &#9776;
          </button>

          {/* Navigation Links */}
          <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ""}`}>
            {session ? (
              <>
                <NavLink
                  href="/new-blog"
                  label="Write"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
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
                  }
                />

                <div className={styles.profileWrapper}>
                  <UserAvatar />
                  {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <DropdownItem href="/profile" label="Profile" onClick={closeSidebar} />
                      {/* <DropdownItem href="/manage-posts" label="Manage Posts" onClick={closeSidebar} /> */}
                      {/* <DropdownItem href="/statistics" label="Statistics" onClick={closeSidebar} /> */}
                      <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout {` (${session?.user?.name})`}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.authWrapper}>
                <NavLink
                  href="/auth/login"
                  label="Write"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
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
                  }
                />
                <NavLink
                  href="/auth/login"
                  label="Sign in"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
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
                  }
                />
                <button className={styles.startButton}>Get started</button>
              </div>
            )}
          </nav>


          <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}>
            <nav className={styles.sidebarNav}>
              {session ? (
                <>
                  <DropdownItem href="/profile" label="Profile" onClick={closeSidebar} />
                  <DropdownItem href="/manage-posts" label="Manage Posts" onClick={closeSidebar} />
                  <DropdownItem href="/statistics" label="Statistics" onClick={closeSidebar} />
                  <NavLink href="/new-blog" label="Write" onClick={closeSidebar} /> {/* Ensure Write is here */}
                  <button className={styles.sidebarLogoutButton} onClick={handleLogout}>
                    Logout {` (${session?.user?.name})`}
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="/auth/login" label="Write" onClick={closeSidebar} /> {/* Make sure Write is available for guests */}
                  <NavLink href="/auth/login" label="Sign in" onClick={closeSidebar} />
                  <button className={styles.sidebarStartButton} onClick={closeSidebar}>
                    Get started
                  </button>
                </>
              )}
            </nav>
          </div>

        </>
      )}
    </header>
  );
}

"use client";

import React, { useState } from "react";
import styles from "./SearchBar.module.css"; // Import CSS
import { useSearch } from "@/context/SearchContext"; // Import Context

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // Use global search state
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update global search context
  };

  return (
    <>
      {/* Desktop Search Bar (Visible on Large Screens) */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchQuery} // Bind to global state
            onChange={handleInputChange}
          />
          <svg
            className={styles.searchIconInside}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="16" y1="16" x2="20" y2="20" />
          </svg>
        </div>
      </div>

      {/* Mobile Search Icon - Click to Toggle Search Bar */}
      <button className={styles.mobileSearchIcon} onClick={toggleMobileSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="16" y1="16" x2="20" y2="20" />
        </svg>
      </button>

      {/* Mobile Search Container - Toggled when Icon is Clicked */}
      <div
        className={`${styles.mobileSearchContainer} ${isMobileSearchOpen ? styles.open : ""}`}
      >
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchQuery} // Bind to global state
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default SearchBar;

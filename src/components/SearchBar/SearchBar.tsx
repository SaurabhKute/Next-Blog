"use client";

import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash"; // Import lodash debounce
import styles from "./SearchBar.module.css";
import { useSearch } from "@/context/SearchContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen((prev) => !prev);
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 500),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedSetSearchQuery(inputValue);
    return () => debouncedSetSearchQuery.cancel();
  }, [inputValue, debouncedSetSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={inputValue}
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

      <div
        className={`${styles.mobileSearchContainer} ${isMobileSearchOpen ? styles.open : ""}`}
      >
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default SearchBar;

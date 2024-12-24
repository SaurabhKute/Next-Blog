"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./FilterSection.module.css";
import { Category } from "@/app/lib/definations";


type FilterProps = {
  categories: Category[];
  onFilterChange:(category:string)=> void;
};


export default function FilterSection({
  categories,onFilterChange
}: FilterProps) {
{
  const filterListRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    const checkArrowsVisibility = () => {
      if (filterListRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = filterListRef.current;
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        setShowLeftArrow(scrollLeft > 0);
      }
    };

    checkArrowsVisibility();
    window.addEventListener("resize", checkArrowsVisibility);
    filterListRef.current?.addEventListener("scroll", checkArrowsVisibility);

    return () => {
      window.removeEventListener("resize", checkArrowsVisibility);
      filterListRef.current?.removeEventListener("scroll", checkArrowsVisibility);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (filterListRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      filterListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filterNames = [
    { id: 0, name: "All" },
    ...(categories || []),
  ];

  return (
    <div className={styles.filterSection}>
      {showLeftArrow && (
        <button
          className={`${styles.arrowBtn} ${styles.leftArrow}`}
          aria-label="Scroll Left"
          onClick={() => scroll("left")}
        >
          <svg
            width="26px"
            height="26px"
            className="svgIcon-use"
            viewBox="0 0 19 19"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.47 13.969 6.986 9.484 11.47 5l.553.492L8.03 9.484l3.993 3.993z"
            ></path>
          </svg>
        </button>
      )}
      <div className={styles.filtersContainer} ref={filterListRef}>
        {filterNames.map((filter, index) => (
          <button
            key={index}
            className={`${styles.filterText} ${
              selectedFilter === filter.name ? styles.selectedFilter : ""
            }`}
            onClick={() => {onFilterChange(filter.name);setSelectedFilter(filter.name)}}
          >
            {filter.name}
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button
          className={`${styles.arrowBtn} ${styles.rightArrow}`}
          aria-label="Scroll Right"
          onClick={() => scroll("right")}
        >
          <svg
            width="26px"
            height="26px"
            className="svgIcon-use"
            viewBox="0 0 19 19"
            aria-hidden="true"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              fillRule="evenodd"
              d="M11.47 13.969 6.986 9.484 11.47 5l.553.492L8.03 9.484l3.993 3.993z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
};

// src/app/ui/skeletons/PostSkeleton.tsx
import React from "react";
import styles from "./PostSkeleton.module.css";

export const PostSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonAuthor}></div>
            <div className={styles.skeletonActions}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

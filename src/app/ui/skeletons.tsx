import React from "react";
import styles from "../../components/Post/Posts.module.css";

const shimmer = "shimmer-effect-class";

export function PostSkeleton() {
  return (
    <div className={`${styles.postCard} ${shimmer}`}>
      <div className={styles.postContent}>
        <div className={`${styles.postTitle} bg-gray-200 h-6 w-3/4 rounded-md`} />
        <div className={`${styles.postDescription} bg-gray-200 h-4 w-full rounded-md mt-2`} />
        <div className={`${styles.postDescription} bg-gray-200 h-4 w-5/6 rounded-md mt-2`} />
        <div className={`${styles.postAuthor} bg-gray-200 h-4 w-1/2 rounded-md mt-4`} />
        <div className={`${styles.postActions} flex items-center space-x-4 mt-4`}>
          <div className="bg-gray-200 h-4 w-20 rounded-md" />
          <div className="bg-gray-200 h-6 w-6 rounded-full" />
          <div className="bg-gray-200 h-4 w-6 rounded-md" />
          <div className="bg-gray-200 h-6 w-6 rounded-full" />
          <div className="bg-gray-200 h-4 w-6 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className={styles.postsContainer}>
      <div className={styles.postList}>
        {[...Array(5)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

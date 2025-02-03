"use client";

import React, { useEffect, useState } from "react";
import Posts from "@/components/Post/Posts";
import FilterSection from "@/components/Filter/FilterSection";
import PopularPosts from "@/components/PopularPosts/PopularPosts";
import RecentPosts from "@/components/RecentPosts/RecentPosts";

import styles from "../Dashboard.module.css";
import { Category, Post } from "@/types/types";

type DashboardProps = {
  initialPosts: Post[];
  initialCategories: Category[];
};

export default function Dashboard({
  initialPosts,
  initialCategories,
}: DashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
  },[]);

  const handleFilterChange = async (category: number) => {
    setLoading(true); // Start loading

    try {
      const response = await fetch(`/api/posts?category=${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered posts");
      }

      const filteredPosts: Post[] = await response.json();
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching filtered posts:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postsContainer}>
          <FilterSection
            categories={categories}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <div className={styles.postLoader}>
              <div className={styles.spinner}></div>
              <p>Loading Posts...</p>
            </div>
          ) : (
            <Posts posts={posts} />
          )}
        </div>

        <aside className={styles.sidebar}>
          <PopularPosts popularPosts={posts} />
          <RecentPosts recentPosts={posts} />
        </aside>
      </div>
    </div>
  );
}

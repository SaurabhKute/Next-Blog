// /app/components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import Posts from "@/components/Post/Posts";
import FilterSection from "@/components/Filter/FilterSection";
import PopularPosts from "@/components/PopularPosts/PopularPosts";
import RecentPosts from "@/components/RecentPosts/RecentPosts";
import { Category, Post } from "@/app/lib/definations";
import styles from "../Dashboard.module.css";

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

  const handleFilterChange = async (category: string) => {
    // console.log(category, "FilterName"); 

    try {
      const response = await fetch(`/api/posts?category=${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered posts");
      }

      const filteredPosts: Post[] = await response.json();
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching filtered posts:", error);
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
          <Posts posts={posts} />
        </div>
        <aside className={styles.sidebar}>
          <PopularPosts popularPosts={posts} />
          <RecentPosts recentPosts={posts} />
        </aside>
      </div>
    </div>
  );
}

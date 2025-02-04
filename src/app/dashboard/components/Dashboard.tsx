"use client";

import React, { useEffect, useState } from "react";
import Posts from "@/components/Post/Posts";
import FilterSection from "@/components/Filter/FilterSection";
import PopularPosts from "@/components/PopularPosts/PopularPosts";
import RecentPosts from "@/components/RecentPosts/RecentPosts";

import styles from "../Dashboard.module.css";
import { Category, Post } from "@/types/types";
import { useSearch } from "@/context/SearchContext";
import { useSession } from "next-auth/react";

type DashboardProps = {
  initialPosts: Post[];
  initialCategories: Category[];
};

export default function Dashboard({
  initialPosts,
  initialCategories,
}: DashboardProps) {

  const {data:session} = useSession();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchPosts = async (category?: number) => {
    setLoading(true);
  
    try {
      const userId = session?.user?.id;
  
      let url = `/api/posts?search=${searchQuery}`;
      
      if (category) {
        url += `&category=${category}`;
      }
      
      if (userId) {
        url += `&userId=${userId}`;
      }
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const fetchedPosts: Post[] = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleFilterChange = (category: number) => {
    setSelectedCategory(category);
    fetchPosts(category);
  };

  // Fetch posts whenever the search query changes
  useEffect(() => {
    fetchPosts(selectedCategory || undefined);
  }, [searchQuery]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postsContainer}>
          <FilterSection categories={categories} onFilterChange={handleFilterChange} />

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

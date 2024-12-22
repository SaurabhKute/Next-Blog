import React, { Suspense } from "react";
import styles from "./Dashboard.module.css";
import Posts from "@/components/Post/Posts";
import FilterSection from "@/components/Filter/FilterSection";
import PopularPosts from "@/components/PopularPosts/PopularPosts";
import RecentPosts from "@/components/RecentPosts/RecentPosts";
import { fetchCategories, fetchPosts } from "@/app/lib/data";


export default async function Dashboard() {
  
  const posts = await fetchPosts(); // Fetch posts data
  const categories  = await fetchCategories();

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postsContainer}>
          <FilterSection  categories={categories}/>
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

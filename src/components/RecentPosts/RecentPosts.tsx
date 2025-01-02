import React from 'react';
import styles from './RecentPosts.module.css';
import Image from 'next/image';
import { Post } from '@/types/types';



type RecentPostsProps = {
  recentPosts: Post[];
};

export default function RecentPosts({recentPosts}:RecentPostsProps) {
  // Dummy data for recent posts
  // const recentPosts = [
  //   {
  //     id: 1,
  //     title: "The Art of Web Development",
  //     content:
  //       "Explore the essential principles of creating amazing web applications.",
  //     author: "John Doe",
  //     image:
  //       "https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development",
  //     timestamp: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     title: "React vs Angular vs Vue",
  //     content: "A comprehensive comparison of the top frontend frameworks.",
  //     author: "Jane Smith",
  //     image:
  //       "https://dummyjson.com/image/400x200/008080/ffffff?text=Frontend+Frameworks",
  //     timestamp: "5 hours ago",
  //   },
  //   {
  //     id: 3,
  //     title: "Understanding CSS Grid",
  //     content: "Learn how to use CSS Grid for responsive layouts.",
  //     author: "Alice Johnson",
  //     image: "https://dummyjson.com/image/400x200/008080/ffffff?text=CSS+Grid",
  //     timestamp: "1 day ago",
  //   },
  // ]

  return (
    <div className={styles.recentPostsContainer}>
    <h3 className={styles.heading}>Recent Posts</h3>
  
    <ul className={styles.postsList}>

      {recentPosts && recentPosts.length > 0 ? <>
        {recentPosts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <div className={styles.postDetails}>
            <Image
              src={post.image}
              alt={post.title}
              // className={styles.postImage}
              height={50}
              width={70}
            />
            <h5 className={styles.postTitle}>{post.title}</h5>
          </div>
          <span className={styles.postDate}>{new Date(post.updated_at).toLocaleString()}</span>
        </li>
      ))}</>:<>
      <p>No Posts Available</p>
      </>}
     
    </ul>
  </div>
  
  );
};


'use client';

import React, { useState, useEffect } from 'react';
import styles from './PopularPosts.module.css';

const PopularPosts = () => {
  // Dummy data for popular posts
  const popularPosts:any = [
    {
      id: 1,
      title: "The Art of Web Development The Art of Web Development The Art of Web Development",
      content:
        "Explore the essential principles of creating amazing web applications.",
      author: "John Doe",
      image:
        "https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "React vs Angular vs Vue",
      content: "A comprehensive comparison of the top frontend frameworks.",
      author: "Jane Smith",
      image:
        "https://dummyjson.com/image/400x200/008080/ffffff?text=Frontend+Frameworks",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Understanding CSS Grid",
      content: "Learn how to use CSS Grid for responsive layouts.",
      author: "Alice Johnson",
      image: "https://dummyjson.com/image/400x200/008080/ffffff?text=CSS+Grid",
      timestamp: "1 day ago",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (popularPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % popularPosts.length);
      }, 5000); // Slide every 5 seconds
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [popularPosts]);

  return (
    <>
    <h3 className={styles.heading}>Popular Posts</h3>

    <div
      className={styles.popularPostsContainer}
      style={{
        backgroundImage: popularPosts.length > 0
          ? `url(${popularPosts[currentIndex].image})`
          : 'url(/images/bg.jpg)', // Fallback background image
      }}
    >
   
      
      {popularPosts.length > 0 ? (
        <div className={styles.popularPostsCarousel}>
          {popularPosts.map((post:any, index:number) => (
            <div
              key={post.id}
              className={`${styles.carouselItem} ${currentIndex === index ? styles.active : ''}`}
            >
              <img
                src={post.image}
                alt={post.title}
                className={styles.carouselImage}
              />
              <h4 className={styles.postTitle}>{post.title}</h4>
              <span className={styles.postDate}>{post.timestamp}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.defaultTextContainer}>
          <h2 className={styles.defaultText}>Explore our latest blog posts</h2>
        </div>
      )}
    </div>
    </>
  );
};

export default PopularPosts;

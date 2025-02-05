'use client';

import React, { useState, useEffect } from 'react';
import styles from './PopularPosts.module.css';
import Image from 'next/image';
import { Post } from '@/types/types';
import { formatDate } from '@/utils/dateFormatter';
import { useRouter } from 'next/navigation';

type PopularPostsProps = {
  popularPosts: Post[];
};

export default function PopularPosts({ popularPosts }: PopularPostsProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleRedirectClick = (id: number) => {
    router.push(`/read/${id}`);
  };

  useEffect(() => {
    if (popularPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % popularPosts.length);
      }, 5000);
      return () => clearInterval(interval);
    } else if (popularPosts.length === 1) {
      setCurrentIndex(0);
    }
  }, [popularPosts]);

  return (
    <>
      <h3 className={styles.heading}>Popular Posts</h3>

      <div
        className={styles.popularPostsContainer}
        style={{
          backgroundImage: popularPosts.length > 0
            ? `url(${popularPosts[currentIndex]?.image})`
            : 'url(/images/bg.jpg)',
        }}
      >
        {popularPosts.length > 0 ? (
          <div className={styles.popularPostsCarousel}>
            {popularPosts.map((post, index) => (
              <div
                key={post.id}
                className={`${styles.carouselItem} ${currentIndex === index ? styles.active : ''}`}
                onClick={() => handleRedirectClick(post.id)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  className={styles.carouselImage}
                  height={100}
                  width={100}
                  layout="responsive"
                />
                <h4 className={styles.postTitle}>{post.title}</h4>
                <span className={styles.postDate}>{formatDate(post.updated_at).toLocaleString()}</span>
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

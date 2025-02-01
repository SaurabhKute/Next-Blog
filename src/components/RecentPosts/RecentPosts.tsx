import React from 'react';
import styles from './RecentPosts.module.css';
import Image from 'next/image';
import { Post } from '@/types/types';
import { formatDate } from '@/utils/dateFormatter';

type RecentPostsProps = {
  recentPosts: Post[];
};

export default function RecentPosts({ recentPosts }: RecentPostsProps) {
  return (
    <div className={styles.recentPostsContainer}>
      <h3 className={styles.heading}>Recent Posts</h3>

      <ul className={styles.postsList}>
        {recentPosts && recentPosts.length > 0 ? (
          <>
            {recentPosts.map((post) => (
              <li key={post.id} className={styles.postItem}>
                <div className={styles.postDetails}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    height={50}
                    width={70}
                  />
                  <div className={styles.postTextContainer}>
                    <h5 className={styles.postTitle}>{post.title}</h5>
                    <span className={styles.postDate}>
                      {formatDate(post.updated_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <p>No Posts Available</p>
        )}
      </ul>
    </div>
  );
}

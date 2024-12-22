import React from "react";
import styles from "./Posts.module.css";
import { Post } from "@/app/lib/definations";



type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {


  return (
    <div className={styles.postsContainer}>
      {/* <h2 className={styles.heading}>Posts</h2> */}
      <div className={styles.postList}>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard} >
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postDescription}><div
                className={styles.postDescription}
                dangerouslySetInnerHTML={{
                  __html:
                    post.content && `${post.content.slice(0, 100)}`,
                }}
              ></div></p>
              <p className={styles.postAuthor}>By {post.author}</p>
              <div className={styles.postActions}>
                <span className={styles.postTimestamp}> {new Date(post.updated_at).toLocaleString()}</span>
                <img src="/icons/liked.svg" alt="Example Icon" className={styles.liked} style={{ width: '25px', height: '25px' }} />
                <span className={styles.count}>4</span>

                {/* <img src="/icons/not-liked.svg" alt="Example Icon" style={{ width: '22px', height: '22px' }} /> */}
                <img src="/icons/comment.svg" alt="Example Icon" className={styles.comment} style={{ width: '22px', height: '22px' }} />
                <span className={styles.count}>4</span>
                {/* <button className={styles.readMoreButton}>Read More</button> */}
              </div>
            </div>
            <img
              src={post.image}
              alt={post.title}
              className={styles.postImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


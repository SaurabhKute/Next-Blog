import React from "react";
import styles from "./Posts.module.css";

export default function Posts(){
  // Dummy data for posts
  const dummyPosts = [
    {
      id: 1,
      title: "The Art of Web Development",
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

  return (
    <div className={styles.postsContainer}>
      {/* <h2 className={styles.heading}>Posts</h2> */}
      <div className={styles.postList}>
        {dummyPosts.map((post) => (
          <div key={post.id} className={styles.postCard} >
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postDescription}>{post.content}</p>
              <p className={styles.postAuthor}>By {post.author}</p>
              <div className={styles.postActions}>
                <span className={styles.postTimestamp}>{post.timestamp}</span>
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


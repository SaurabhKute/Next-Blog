"use client";

import React, { useEffect, useState } from "react";
import styles from "../BlogRead.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

// type Blog = {
//   title: string;
//   content: string;
//   image?: string;
//   author: string;
//   date: string;
//   tags: string[];
// };

export default function BlogRead() {
  const pathname = usePathname();
  const id = pathname?.split("/read/").pop();

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          // console.log(id, "@@@@@@@");
          const response = await fetch(`/api/read?postId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch filtered posts");
          }
          const data = await response.json();
          console.log(data,"@data");
          setBlog(data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!blog) {
    return <div className={styles.error}>Blog not found!</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{blog?.title}</h1>

      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <Image src="/icons/writer.svg" alt="Writer" width={50} height={50} />
        </div>
        <div className={styles.metaRight}>
          <span className={styles.author}>{blog?.author}</span>
          <span className={styles.date}>{blog?.updated_at}</span>
        </div>
      </div>

      {blog?.image && (
        <img src={blog?.image} alt={blog?.title} className={styles.image} />
      )}

      <div className={styles.content}>
        <span dangerouslySetInnerHTML={{ __html: blog.content }}></span>
      </div>

      {blog?.tags && (
        <div className={styles.tagsContainer}>
          {blog?.tags.map((tag: string, index: number) => (
            <span key={index} className={styles.chip}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    // <p>{blog.author}</p>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import styles from "../BlogRead.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Post } from "@/types/types";
import Loading from "../loading";
import NotFound from "../not-found";

export default function BlogRead() {
  const pathname = usePathname();
  const id = pathname?.split("/read/").pop();

  const [blog, setBlog] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/read?postId=${id}`);
          if (!response.ok) {
            throw new Error("Blog not found");
          }
          const data = await response.json();
          setBlog(data);
        } catch (error:unknown) {
          if (error instanceof Error) {
            console.error("Error fetching blog:", error);
            setError(error.message || "Failed to fetch blog.");
          } else {
            console.error("Unknown error:", error);
            setError("Failed to fetch blog.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <Loading/>; // You can replace this with a spinner if you have one.
  }

  if (error || !blog) {
    return (
      <NotFound/>
      // <div className={styles.error}>
      //   <h1>Blog not found!</h1>
      //   <p>{error}</p>
      // </div>
    );
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
  );
}

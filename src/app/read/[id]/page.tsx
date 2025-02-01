"use client";

import React, { useEffect, useState } from "react";
import styles from "../BlogRead.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Post } from "@/types/types";
import Loading from "../loading";
import NotFound from "../not-found";
import { formatDate } from "@/utils/dateFormatter";
import { useSession } from "next-auth/react";

export default function BlogRead() {

      const { data: session } = useSession();
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
        } catch (error: unknown) {
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
    return <Loading />; // You can replace this with a spinner if you have one.
  }

  if (error || !blog) {
    return (
      <NotFound />
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
          <Image src={session?.user?.image || ""} alt="Writer" width={50} height={50} className={styles.userAvatar} />
        </div>
        <div className={styles.metaRight}>
          <span className={styles.author}>{blog?.author}</span>
          <span className={styles.date}>

            {blog?.updated_at ? formatDate(blog?.updated_at) : ''}
          </span>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.leftIcons}>
          {/* Like Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>

        </div>
        <div className={styles.rightIcons}>
          {/* Save Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <path d="M17 3H7c-1.1 0-2 .9-2 2v14l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
          </svg>
          {/* Edit Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
          </svg>
        </div>
      </div>




      {blog?.image && (
        <img src={blog?.image || ""} alt={blog?.title} className={styles.image} />
      )}

      <div className={styles.content}>
        <span dangerouslySetInnerHTML={{ __html: blog.content }}></span>
      </div>

      {blog?.tags && Array.isArray(blog?.tags) && (
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

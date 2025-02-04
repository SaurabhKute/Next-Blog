"use client";

import React, { useEffect, useState } from "react";
import styles from "../BlogRead.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "@/types/types";
import Loading from "../loading";
import NotFound from "../not-found";
import { formatDate } from "@/utils/dateFormatter";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb";

const breadcrumb = {
  label: 'Read', 
};

export default function BlogRead() {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/read/").pop();

  const [blog, setBlog] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Track the like state

  useEffect(() => {
    if (id && session?.user?.id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/read?postId=${id}&userId=${session?.user?.id}`); 
          if (!response.ok) {
            throw new Error("Blog not found");
          }
          const data = await response.json();
          setBlog(data);
          setIsLiked(data.is_liked || false); // Set the initial like state
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
  }, [id, session?.user?.id]);
  
  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = (postId: number) => {
    setMenuVisible(false);
    toast.success("Redirecting to Edit Page...");
    router.push(`/edit/${postId}`); // Navigate to update page
  };

  const handleDelete = async (postId: number) => {
    setMenuVisible(false);

    if (!session || !session.user?.id) {
      alert("You must be logged in to delete a post.");
      return;
    }

    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post.");
      }

      toast.success("Post deleted successfully!");
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error deleting post:", error.message);
      } else {
        toast.error("An unknown error occurred.");
        console.error("Unknown error:", error);
      }
    }
  };

  const handleLikeToggle = async () => {
    if (!session || !session.user?.id) {
      toast.error("You must be logged in to like a post.");
      return;
    }
  
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
  
    const action = newIsLiked ? "like" : "dislike"; 
  
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: blog?.id,
          userId: session.user.id,
          action,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
  
      // If successful, update like status
      toast.success(newIsLiked ? "Post liked" : "Post disliked");
    } catch (error) {
      // If there's an error, revert the UI change
      setIsLiked(isLiked);
      toast.error("Error updating like status");
      console.error("Error updating like:", error);
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  if (error || !blog) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      <BreadCrumb breadcrumb={breadcrumb} />
      <h1 className={styles.title}>{blog?.title}</h1>

      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <Image src={session?.user?.image || ""} alt="Writer" width={40} height={40} className={styles.userAvatar} />
        </div>
        <div className={styles.metaRight}>
          <span className={styles.author}>{blog?.author}</span>
          <span className={styles.date}>
            {blog?.updated_at ? formatDate(blog?.updated_at) : ""}
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
            onClick={handleLikeToggle}
            style={{ cursor: "pointer", fill: isLiked ? "red" : "" , stroke:isLiked ? "none" : 'gray'}}
          >
 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
 </svg>
        </div>
        <div className={styles.rightIcons}>
          {/* Save Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
            <path d="M17 3H7c-1.1 0-2 .9-2 2v14l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
          </svg>
          {/* Edit Icon */}
          {session?.user?.id === blog?.user_id && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={styles.icon}
              onClick={handleMenuToggle}
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          )}

          {menuVisible && (
            <div className={styles.tooltipMenu}>
              <button onClick={() => handleEdit(blog?.id)} className={styles.menuItem}>Edit</button>
              <button onClick={() => handleDelete(blog?.id)} className={styles.menuItem}>Delete</button>
            </div>
          )}
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

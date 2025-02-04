import React, { useState, useEffect } from "react";
import styles from "./Posts.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import extractFirstParagraph from "@/utils/extractParagraph";
import { useSession } from "next-auth/react";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const { data: session } = useSession();
  const router = useRouter();

  // State for user ID
  const [userId, setUserId] = useState<string | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }

    // Ensure localStorage is accessed only on the client side
    if (typeof window !== "undefined") {
      const updatedPosts = posts.map((post) => ({
        ...post,
        is_liked: localStorage.getItem(`liked_${post.id}`) === "true" ? true : post.is_liked,
      }));
      setPostList(updatedPosts);
    }
  }, [posts, session]);

  const handleRedirectClick = (id: number) => {
    router.push(`/read/${id}`);
  };

  // Handle Like/Dislike functionality
  async function handleLike(post: Post) {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    const action = post.is_liked ? "dislike" : "like";
    const updatedPost = { 
      ...post, 
      is_liked: !post.is_liked, 
      total_likes: post.is_liked ? post.total_likes - 1 : post.total_likes + 1 
    };

    // Optimistically update UI
    setPostList((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, userId, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Persist like state in localStorage
      localStorage.setItem(`liked_${post.id}`, updatedPost.is_liked.toString());

      // Update post list with new like count
      setPostList((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, total_likes: data.totalLikes } : p))
      );
    } catch (error) {
      console.error("Error updating likes:", error);

      // Rollback UI update in case of failure
      setPostList((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? post : p))
      );
    }
  }

  return (
    <div className={styles.postsContainer}>
      {postList.length > 0 ? (
        <div className={styles.postList}>
          {postList.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postContent}>
                <h3
                  className={styles.postTitle}
                  onClick={() => handleRedirectClick(post.id)}
                >
                  {post.title}
                </h3>
                <div className={styles.postDescription}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: extractFirstParagraph(post.content, 80),
                    }}
                  />
                </div>
                <p className={styles.postAuthor}>By {post.author}</p>

                <div className={styles.postActions}>
                  <span className={styles.postTimestamp}>
                    {formatDate(post.updated_at)}
                  </span>

                  {/* Like/Dislike Button */}
                  <Image
                    src={post.is_liked ? "/icons/liked.svg" : "/icons/not-liked.svg"}
                    alt={post.is_liked ? "Liked" : "Not Liked"}
                    className={styles.liked}
                    width={25}
                    height={25}
                    onClick={() => handleLike(post)}
                    style={{ cursor: "pointer" }}
                  />
                  <span className={styles.count}>{post.total_likes || 0}</span>
                </div>
              </div>

              {/* Image Section */}
              <Image
                src={post.image}
                alt={post.title}
                className={styles.postImage}
                width={300}
                height={200}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noPost}>No Posts Available</p>
      )}
    </div>
  );
}

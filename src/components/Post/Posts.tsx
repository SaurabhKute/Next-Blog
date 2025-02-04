import React, { useState } from "react";
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
  const userId = session?.user?.id || null;

  // State to track liked posts dynamically
  const [likedStates, setLikedStates] = useState<Record<number, boolean>>({});
  const [likesCounts, setLikesCounts] = useState<Record<number, number>>({});

  const handleRedirectClick = (id: number) => {
    router.push(`/read/${id}`);
  };

  // Handle Like/Dislike functionality
  async function handleLike(postId: number, isLiked: boolean) {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    const action = isLiked ? "dislike" : "like";

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Update state dynamically
      setLikedStates((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }));

      setLikesCounts((prev) => ({
        ...prev,
        [postId]: data.totalLikes,
      }));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }

  return (
    <div className={styles.postsContainer}>
      {posts && posts.length > 0 ? (
        <div className={styles.postList}>
          {posts.map((post: Post) => {
            const isLiked = likedStates[post.id] ?? post.is_liked;
            const likeCount = likesCounts[post.id] ?? post.total_likes;

            return (
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
                      src={isLiked ? "/icons/liked.svg" : "/icons/not-liked.svg"}
                      alt={isLiked ? "Liked" : "Not Liked"}
                      className={styles.liked}
                      width={25}
                      height={25}
                      onClick={() => handleLike(post.id, isLiked)}
                      style={{ cursor: "pointer" }}
                    />
                    <span className={styles.count}>{likeCount}</span>

                    <Image
                      src="/icons/comment.svg"
                      alt="Comment Icon"
                      className={styles.comment}
                      width={25}
                      height={25}
                    />
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
            );
          })}
        </div>
      ) : (
        <p className={styles.noPost}>No Posts Available</p>
      )}
    </div>
  );
}

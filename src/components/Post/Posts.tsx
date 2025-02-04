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

  // State to track liked posts and like counts
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
  const [userId, setUserId] = useState<string | null>(null);

  // Initialize liked state and like count from API response
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }

    const initialLikedPosts: { [key: string]: boolean } = {};
    const initialLikesCount: { [key: string]: number } = {};

    posts.forEach((post) => {
      initialLikedPosts[post.id] = post?.is_liked;
      initialLikesCount[post.id] = post?.total_likes;
    });

    setLikedPosts(initialLikedPosts);
    setLikesCount(initialLikesCount);
  }, [posts, session]);

  const handleRedirectClick = (id: number) => {
    router.push(`/read/${id}`);
  };

  // Handle Like/Dislike functionality
  async function handleLike(postId: number) {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    const isLiked = likedPosts[postId] || false;
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

      // Toggle liked state and update likes count
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }));

      setLikesCount((prev) => ({
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
          {posts.map((post: Post) => (
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
                    src={
                      likedPosts[post.id]
                        ? "/icons/liked.svg"
                        : "/icons/not-liked.svg"
                    }
                    alt={likedPosts[post.id] ? "Liked" : "Not Liked"}
                    className={styles.liked}
                    width={25}
                    height={25}
                    onClick={() => handleLike(post.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <span className={styles.count}>{likesCount[post.id] || 0}</span>

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
          ))}
        </div>
      ) : (
        <p className={styles.noPost}>No Posts Available</p>
      )}
    </div>
  );
}

import React from "react";
import styles from "./Posts.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { Post } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {

  const router = useRouter();

  const handleRedirectClick = (id:number) => {
    router.push(`/read/${id}`)
  }
  return (
    <div className={styles.postsContainer}>
      {posts && posts.length > 0 ? (
        <div className={styles.postList}>
          {posts.map((post: Post) => (
            <div key={post.id} className={styles.postCard}>
              {/* Content Section */}
              <div className={styles.postContent}>
                {/* <Link href={`/read/${post.id}`} passHref className={styles.link}> */}
                  {/* <a> */}
                    <h3 className={styles.postTitle} onClick={()=> handleRedirectClick(post.id)}>{post.title}</h3>
                    <div className={styles.postDescription}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post.content && `${post.content.slice(0, 80)}...`,
                        }}
                      ></span>
                    </div>
                    <p className={styles.postAuthor}>By {post.author}</p>
                  {/* </a> */}
                {/* </Link> */}
                <div className={styles.postActions}>
                  <span className={styles.postTimestamp}>
                   {formatDate(post?.updated_at)}
                  </span>
                  <Image
                    src="/icons/liked.svg"
                    alt="Liked Icon"
                    className={styles.liked}
                    width={25}
                    height={25}
                  />
                  <span className={styles.count}>4</span>

                  {/* <Image
                    src="/icons/not-liked.svg"
                    alt="Liked Icon"
                    className={styles.liked}
                    width={25}
                    height={25}
                  /> */}

                  <Image
                    src="/icons/comment.svg"
                    alt="Comment Icon"
                    className={styles.comment}
                    width={25}
                    height={25}
                  />
                  <span className={styles.count}>4</span>
                </div>
              </div>

              {/* Image Section */}
              <Image
                src={post.image}
                alt={post?.title}
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

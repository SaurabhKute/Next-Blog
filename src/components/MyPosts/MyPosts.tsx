import { useSession } from 'next-auth/react';
import styles from './MyPosts.module.css';
import { useEffect, useState } from 'react';
import Loading from '@/app/read/loading';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/types';
import { formatDate } from '@/utils/dateFormatter';


export default function MyPosts() {
  const router = useRouter()

  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostsByUserId = async (userId: string) => {
    try {
      const response = await fetch(`/api/postsByUserId?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const postsData = await response.json();
      // console.log(postsData,"@@@@@@@@@@@@@@@");
      setPosts(postsData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch posts");
      setLoading(false);
    }
  };



  const handleRedirectClick = (id: number) => {
    router.push(`/read/${id}`)
  }

  useEffect(() => {
    if (session?.user?.id) {
      // console.log(session?.user.id,"@@@");
      fetchPostsByUserId(session?.user.id);
    }
  }, [session?.user?.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>

      {posts.length > 0 ? (
        posts?.map((post: Post) => (
          <div key={post.id} className={styles.postsContainer} >
            <div className={styles.post} onClick={() => handleRedirectClick(post.id)}>
              <div className={styles.textContent}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                {/* <p className={styles.postSubtitle}>{post}</p> */}
                <span className={styles.postDate}>{formatDate(post.updated_at)}</span>

              </div>
              <div className={styles.imageWrapper}>
                <img
                  src={post?.image}
                  alt="Blog Image"
                  className={styles.blogImage}
                />

              </div>

            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}

    </>
  );
}

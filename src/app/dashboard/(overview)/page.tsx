import FilterSection from '@/components/Filter/FilterSection';
import styles from './Dashboard.module.css'; 
import Posts from '@/components/Post/Posts';
import PopularPosts from '@/components/PopularPosts/PopularPosts';
import RecentPosts from '@/components/RecentPosts/RecentPosts';

export default function Dashboard() {
  return (
    <div className={styles.appContainer}>
    
      <div className={styles.mainContent}>
  
        <div className={styles.postsContainer}>
        <FilterSection />
          <Posts />
        </div>
        <aside className={styles.sidebar}>
          <PopularPosts />
          <RecentPosts />
        </aside>
      </div>
    </div>
  );
}


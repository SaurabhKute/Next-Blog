'use client';


import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

export default function NotFound() {

  const router = useRouter();
  const handleGoToDashboard = () => {
    router.push('/dashboard');
  }
  return (
    <div className={styles.notFound}>
      <p>Page Not Found</p>
      <button className={styles.goToDashboard} onClick={handleGoToDashboard}>Go to Dashboard</button>
    </div>
  );
}

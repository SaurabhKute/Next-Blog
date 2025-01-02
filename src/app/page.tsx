'use client';

import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

export default function Home() {
    const router = useRouter();
    const isAuthenticated = true; // Replace with your actual authentication logic

    const handleStartReading = () => {
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <div className={styles.main}>
            <main>
                <section className={styles.hero}>
                    <h1>Human stories & ideas</h1>
                    <p>A place to read, write, and deepen your understanding</p>
                    <button className={styles.ctaButton} onClick={handleStartReading}>
                        Start reading
                    </button>
                </section>
            </main>
        </div>
    );
}

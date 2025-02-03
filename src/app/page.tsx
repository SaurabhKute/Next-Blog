'use client';

import { useRouter } from 'next/navigation';
import styles from './Home.module.css';
import { useSession } from 'next-auth/react';
import Loading from './loading';

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();


    if (status === 'loading') {
        return <Loading />;
    }

    const isAuthenticated = status === 'authenticated';

    const handleStartReading = () => {
        router.push(isAuthenticated ? '/dashboard' : '/auth/login');
    };

    return (
        <div className={styles.main}>
            <section className={styles.hero}>
                <h1>Where Stories Come to Life</h1>
                <p>Discover, create, and share powerful ideas that inspire.</p>

                {isAuthenticated && session?.user && (
                    <p className={styles.welcome}>Welcome back, {session.user.name}!</p>
                )}

                <button className={styles.ctaButton} onClick={handleStartReading}>
                    {isAuthenticated ? "Go to Dashboard" : "Start Reading"}
                </button>
            </section>
        </div>
    );
}

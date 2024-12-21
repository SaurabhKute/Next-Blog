// pages/index.tsx
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.main}>
            <main>
                <section className={styles.hero}>
                    <h1>Human stories & ideas</h1>
                    <p>A place to read, write, and deepen your understanding</p>
                    <button className={styles.ctaButton}>Start reading</button>
                </section>
            </main>
        </div>
    );
}

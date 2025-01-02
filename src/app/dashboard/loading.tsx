import styles from './Dashboard.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Loading Dashboard...</p>
    </div>
  );
}

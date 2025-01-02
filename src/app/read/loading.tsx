import styles from './BlogRead.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Loading Post...</p>
    </div>
  );
}

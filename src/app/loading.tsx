import styles from "./Home.module.css";

export default function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loadingLine}></div>
        </div>
    )
}
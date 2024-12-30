import Link from 'next/link';
import styles from './Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Hi, Welcome back to The Daily Scribble</h2>
        <p>
          Discover insights, stories, and inspiration to fuel your day.
        </p>
        <img src="/resume6.png" alt="Blog Image Preview" className={styles.image} />
      </div>
      <div className={styles.rightSection}>
        <h3>Sign in to your account</h3>
        <p>
          Don’t have an account?{" "}
          <Link className={styles.link} href="/signup">
            Get started
          </Link>
        </p>
        <form className={styles.form}>
          <input type="email" placeholder="Email Address" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <p className={styles.forgotPassword}>Forgot password?</p>
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
        <div className={styles.socialLogin}>
  <p>Or</p>
  <div className={styles.iconContainer}>
    <img src="/icons/google.svg" alt="Google Icon" className={styles.icon} />
    <img src="/icons/github.svg" alt="Github Icon" className={styles.icon} />
  </div>
</div>

      </div>
    </div>
  );
}

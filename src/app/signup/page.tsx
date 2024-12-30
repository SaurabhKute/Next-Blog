import Link from 'next/link';
import styles from './Signup.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Welcome to The Daily Scribble</h2>
        <p>
          Join us to explore inspiring stories, valuable insights, and more!
        </p>
        <img src="/resume6.png" alt="Blog Image Preview" className={styles.image} />
      </div>
      <div className={styles.rightSection}>
        <h3>Create your account</h3>
        <p>
          Already have an account?{" "}
          <Link className={styles.link} href="/login">
            Sign In
          </Link>
        </p>
        <form className={styles.form}>
          <input type="text" placeholder="Full Name" className={styles.input} required />
          <input type="email" placeholder="Email Address" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <button type="submit" className={styles.button}>
            Sign Up
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

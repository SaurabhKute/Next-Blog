'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import styles from './Signup.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function SignupPage() {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await toast.promise(
        fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Could not complete signup');
            }
            router.replace('/auth/login'); 
            return data;
          }),
        {
          loading: 'Signing up...',
          success: <b>Signup successful!</b>,
          error: (error:Error) => (
            <b>{error.message}</b> 
          ),
        }
      );
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Welcome to The Daily Scribble</h2>
        <p>
          Join us to explore inspiring stories, valuable insights, and more!
        </p>
        {/* <img src="/resume6.png" alt="ew" className={styles.image} /> */}
      </div>
      <div className={styles.rightSection}>
        <h3>Create your account</h3>
        <p>
          Already have an account?{" "}
          <Link className={styles.link} href="/auth/login">
            Sign In
          </Link>
        </p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={styles.input}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.input}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={formik.isSubmitting}>
            Sign Up
          </button>
        </form>

        {/* <div className={styles.socialLogin}>
          <p>Or</p>
          <div className={styles.iconContainer}>
            <img src="/icons/google.svg" alt="Google Icon" className={styles.icon} />
            <img src="/icons/github.svg" alt="Github Icon" className={styles.icon} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

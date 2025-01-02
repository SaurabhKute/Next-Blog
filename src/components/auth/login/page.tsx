'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import styles from './Login.module.css';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginForm() {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false, // Prevent auto-navigation for error handling
        });

        if (result?.error) {
          // Handle authentication errors
          const errorMessage = result.error === "CredentialsSignin" ? 
          "Invalid email or password. Please try again." : 
          result.error;
  
        toast.error(errorMessage); 
        } else {
          // Redirect to dashboard or another page on success
          toast.success('Login successful!');
         router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/dashboard' });
      // console.log(result,"#######")
      if (!result) {
        console.error('Google login failed');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Hi, Welcome back to The Daily Scribble</h2>
        <p>
          Discover insights, stories, and inspiration to fuel your day.
        </p>
      </div>
      <div className={styles.rightSection}>
        <h3>Sign in to your account</h3>
        <p>
          Don’t have an account?{" "}
          <Link className={styles.link} href="/auth/signup">
            Get started
          </Link>
        </p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
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

          <p className={styles.forgotPassword}>Forgot password?</p>
          <button type="submit" className={styles.button} disabled={formik.isSubmitting}>
            Sign In
          </button>
        </form>

        <div className={styles.socialLogin}>
          <p>Or</p>
          <div className={styles.iconContainer}>
            <img
              src="/icons/google.svg"
              alt="Google Icon"
              className={styles.icon}
              onClick={handleGoogleLogin}  // Google login trigger
            />
            <img src="/icons/github.svg" alt="Github Icon" className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

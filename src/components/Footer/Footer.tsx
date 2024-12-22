// components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>Blog</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </footer>
    );
};



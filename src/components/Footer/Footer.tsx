// components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
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

export default Footer;

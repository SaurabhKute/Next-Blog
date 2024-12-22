'use client';

import React from 'react';
import styles from './BlogRead.module.css';
import Image from 'next/image';

interface BlogReadProps {
    title: string;
    content: string;
    image?: string;
    author: string;
    date: string;
    tags?: string[];
}

const testBlog = {
    title: "Understanding the Basics of React.js",
    content: `
      <p>React.js is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components.</p>
      <p>One of the core features of React is the use of a virtual DOM, which improves performance by minimizing direct interactions with the actual DOM.</p>
      <h2>Why React?</h2>
      <p>React offers several advantages:</p>
      <ul>
        <li>Reusable components</li>
        <li>Virtual DOM for better performance</li>
        <li>Rich ecosystem with tools like Redux and Next.js</li>
      </ul>
      <img src="https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development" alt="React Example" />
      <p>In conclusion, React is a versatile and efficient library for modern web development.</p>
    `,
    image: "https://dummyjson.com/image/400x200/008080/ffffff?text=Web+Development",
    author: "John Doe",
    date: "December 21, 2024",
    tags: ["React", "JavaScript", "Web Development", "UI/UX"],
};

const BlogRead: React.FC<BlogReadProps> = () => {
    return (
        <div className={styles.container}>
            {/* Blog Title */}
            <h1 className={styles.title}>{testBlog.title}</h1>

            {/* Author and Date */}
            <div className={styles.meta}>
                <div className={styles.metaLeft}>
                    <Image src="/icons/writer.svg" alt="Writer" width={50} height={50} />
                </div>
                <div className={styles.metaRight}>
                    <span className={styles.author}>{testBlog.author}</span>
                    <span className={styles.date}>{testBlog.date}</span>
                </div>
            </div>

            {/* Blog Image */}
            {testBlog.image && <img src={testBlog.image} alt={testBlog.title} className={styles.image} />}

            {/* Blog Content */}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: testBlog.content }}
            ></div>

             {/* Tags */}
             {testBlog.tags && (
                <div className={styles.tagsContainer}>
                    {testBlog.tags.map((tag, index) => (
                        <span key={index} className={styles.chip}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default BlogRead;

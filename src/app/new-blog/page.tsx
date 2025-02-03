'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './WriteBlog.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category } from '@/types/types';
import BreadCrumb from '@/components/common/BreadCrumb/BreadCrumb';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

const breadcrumb = {
  label: 'Write',
};

export default function WriteBlog() {
  const { data: session } = useSession();
  const router = useRouter();

  const isMounted = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          console.error('Failed to fetch categories:', res.statusText);
          return;
        }

        const data = await res.json();

        if (isMounted.current) {
          setCategories(data); // Ensure this happens only when the component is mounted
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();

    return () => {
      isMounted.current = false; // Mark the component as unmounted during cleanup
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleRemoveImage = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
    setImage(null);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handlePublish = async () => {
    setLoading(true);
    if (!image) {
      toast.error('Please upload an image!');
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      const blogData = {
        title,
        content,
        image: imageUrl,
        author: session?.user?.name,
        tags: JSON.stringify(tags),
        category,
        user_id: session?.user?.id,
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        router.push(`/read/${data.id}`);
      } else {
        toast.error('Failed to publish blog');
      }
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast.error('An error occurred. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className={styles.header}>
        <h1 className={styles.heading}>Write a Blog</h1>
        <button
          onClick={handlePublish}
          className={styles.publishButton}
          disabled={loading}
        >
          {loading ? 'Publishing' : 'Publish'}
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Blog Title:
        </label>
        <input
          type="text"
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Blog Content:</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName={styles.editorWrapper}
          editorClassName={styles.editor}
          toolbarClassName={styles.toolbar}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Select Category:
        </label>
        <select
          className={styles.dropdown}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags" className={styles.label}>
          Tags:
        </label>
        <div className={styles.tagsInputContainer}>
          <input
            type="text"
            id="tags"
            className={styles.input}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <button onClick={handleAddTag} className={styles.addTagButton}>
            Add
          </button>
        </div>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className={styles.removeTagButton}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.label}>
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          className={styles.fileInput}
          onChange={handleImageUpload}
          accept="image/*"
          ref={inputRef}
        />
      </div>

      {image && (
        <div className={styles.imagePreview}>
          <p>Preview:</p>
          <div className={styles.previewContainer}>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className={styles.previewImage}
            />
            <div className={styles.imageInfo}>
              <span>{image.name}</span>
              <button onClick={handleRemoveImage} className={styles.removeButton}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

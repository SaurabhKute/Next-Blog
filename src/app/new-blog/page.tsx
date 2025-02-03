'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './WriteBlog.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

export default function WriteBlog() {

  const { data: session } = useSession();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleRemoveImage = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
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
    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handlePublish = async () => {
    if (!image) {
      toast.error("Please upload an image!")
      alert("Please upload an image!");
      return;
    }

    try {
      // Upload image to Cloudinary and get the URL
      const imageUrl = await uploadImageToCloudinary(image);

      // console.log("Uploaded Image URL:", imageUrl); 

      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      const blogData = {
        title,
        content,
        image: imageUrl, // Ensure Cloudinary URL is sent
        author: session?.user?.name,
        tags: JSON.stringify(tags),
        category,
        user_id: session?.user?.id,
      };

      // console.log("Sending Blog Data:", blogData);  

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/read/${data.id}`);
        alert("Blog published successfully!");
      } else {
        alert("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("An error occurred. Try again.");
    }
  };



  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.heading}>Write a Blog</h1>
        <button onClick={handlePublish} className={styles.publishButton}>
          Publish
        </button>
      </div>

      {/* Title Input */}
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

      {/* WYSIWYG Editor */}
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

      {/* Category Dropdown */}
      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Select Category:
        </label>
        <select
          id="category"
          className={styles.dropdown}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="lifestyle">LifeStyle</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
        </select>
      </div>

      {/* Tags Input */}
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

      {/* Image Upload */}
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

      {/* Image Preview */}
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
};


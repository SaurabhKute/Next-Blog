'use client';

import React, {  useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './WriteBlog.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

const WriteBlog: React.FC = () => {
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

  const handlePublish = () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log({
      title,
      content,
      image,
      tags,
      category,
    });
    alert('Blog published successfully!');
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
          <option value="lifestyle">Lifestyle</option>
          <option value="business">Business</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
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

export default WriteBlog;

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import toast from 'react-hot-toast';
import styles from '../../new-blog/WriteBlog.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSession } from 'next-auth/react';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
    ssr: false,
});

export default function UpdateBlog() {

    const { data: session } = useSession();
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    // console.log(id,"Params");
    const [postId, setPostId] = useState();
    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty() || {});
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/read?postId=${id}`);
                const data = await res.json();
    
                setPostId(data.id);
                setTitle(data.title);
                setCategory(data.category);
    
                // ✅ Ensure tags is always an array
                const parsedTags = Array?.isArray(data.tags) 
                    ? data.tags 
                    : typeof data.tags === 'string' 
                    ? JSON.parse(data.tags) 
                    : [];
    
                setTags(parsedTags);
                setImagePreview(data.image);
    
                // Dynamically import html-to-draftjs inside useEffect
                const htmlToDraft = (await import("html-to-draftjs")).default;
                const blocksFromHtml = htmlToDraft(data.content);
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                setEditorState(EditorState.createWithContent(contentState));
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
    
        fetchBlog();
    }, [id]);
    
    

    const handleUpdate = async () => {
        try {
            const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            const updatedBlog = {
                postId,
                userId: session?.user?.id,
                title,
                content,
                image: imagePreview,
                tags: JSON.stringify(tags), // ✅ Ensure tags are sent as a string
                category,
            };
    
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBlog),
            });
    
            if (response.ok) {
                toast.success('Blog updated successfully!');
                router.push(`/read/${id}`);
            } else {
                toast.error('Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('An error occurred.');
        }
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Edit Blog</h1>
                <button onClick={handleUpdate} className={styles.publishButton}>Update</button>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Title:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Content:</label>
                <Editor editorState={editorState} onEditorStateChange={setEditorState}
                    wrapperClassName={styles.editorWrapper}
                    editorClassName={styles.editor}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Category:</label>
                <select className={styles.dropdown} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="business">Business</option>
                    <option value="travel">Travel</option>
                    <option value="health">Health</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Tags:</label>
                <div className={styles.tagsInputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                    />
                    <button onClick={() => setTags([...tags, newTag])} className={styles.addTagButton}>Add</button>
                </div>
                <div className={styles.tagsContainer}>
                    {tags?.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag}
                            <button onClick={() => setTags(tags.filter(t => t !== tag))} className={styles.removeTagButton}>
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Image:</label>
                <input
                    type="file"
                    className={styles.fileInput}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImage(file);
                            setImagePreview(URL.createObjectURL(file));
                        }
                    }}
                />
            </div>

            {imagePreview && (
                <div className={styles.imagePreview}>
                    <p>Preview:</p>
                    <div className={styles.previewContainer}>
                        <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                        <div className={styles.imageInfo}>
                            <button onClick={() => setImagePreview('')} className={styles.removeButton}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

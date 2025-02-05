"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../common/Modal/Modal";
import toast from "react-hot-toast";
import MyPosts from "../MyPosts/MyPosts";
import Image from "next/image"; // Ensure Image from Next.js is imported
import styles from './ProfileForm.module.css';
import { formatDate } from "@/utils/dateFormatter";

interface FormData {
  [key: string]: string;
}

export default function ProfileForm() {
  const { data: session } = useSession();
  const [activeStep, setActiveStep] = useState("My Posts");
  const [isModalOpen, setModalOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: "", // Ensure bio is initialized correctly
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically updating formData based on the name
    }));
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const renderContent = () => {
    switch (activeStep) {
      case "My Posts":
        return <MyPosts />;
      case "Saved":
        return <div>Saved content goes here...</div>;
      default:
        return <div>Content not found.</div>;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = session?.user?.id;
        console.log(`Fetching profile from /api/profile?userId=${userId}`);
        
        const response = await fetch(`/api/profile?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched profile data:", data);
  
        setFormData({
          name: data.name,
          email: data.email,
          bio: data.bio || "",
        });
        setCreatedAt(data.created_at || null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile");
      }
    };
  
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);
  

  const handleSaveProfile = async () => {
    try {
      const userId = session?.user?.id;
      console.log("Saving profile with data:", formData);
  
      const response = await fetch(`/api/profile?userId=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
  
      const updatedProfile = await response.json();
      console.log("Updated Profile:", updatedProfile);
  
      toast.success("Profile updated successfully!");
      setFormData(updatedProfile);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  

  return (
    <>
      <div className={styles.profileHeaderContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.background}></div>
          <div className={styles.profileDetails}>
            <Image
              src={session?.user?.image || "/default-avatar.png"} // Default image fallback
              alt="Profile Picture"
              className={styles.profilePic}
              height={100} // Set appropriate height
              width={100}  // Set appropriate width
            />
            <div className={styles.infoSection}>
              <h1 className={styles.name}>{session?.user?.name}</h1>
              <p className={styles.bio}>{formData.bio}</p>
              <p className={styles.meta}>
              {formData.email} • Joined {createdAt ? formatDate(createdAt) : "N/A"} 
              </p>
            </div>    
            <div className={styles.actionButtons}>
              <div className={styles.buttons}>
                <button className={styles.edit} onClick={handleOpenModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.editIcon}
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.stepperNav}>
          {["My Posts", "Saved"].map((step) => (
            <div
              key={step}
              className={`${styles.stepperItem} ${
                activeStep === step ? styles.activeStep : ""
              }`}
              onClick={() => setActiveStep(step)}
            >
              {step}
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <div className={styles.aboutSection}>{renderContent()}</div>
          </div>
          <div className={styles.rightPanel}>
            <div className={styles.fixedPanel}>
              <div className={styles.frontPageSection}>
                <h4>Following</h4>
                <div className={styles.following}>
                  <div className={styles.left}>
                    <Image
                      src="/icons/user.svg"
                      alt="User Icon"
                      height={24} // Adjust as needed
                      width={24}  // Adjust as needed
                    />
                    <p>Alex Paul</p>
                  </div>
                  <Image
                    src="/icons/three-dots.svg"
                    alt="Menu Icon"
                    className={styles.dots}
                    height={24} // Adjust as needed
                    width={24}  // Adjust as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <h3>Profile Information</h3>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.profileImageSection}>
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="Profile Pic"
                className={styles.profileImg}
                height={100} // Set appropriate height
                width={100}  // Set appropriate width
              />
              <div className={styles.imageButtons}>
                <button className={`${styles.imageButton} ${styles.updateBtn}`}>
                  Update
                </button>
                <button className={`${styles.imageButton} ${styles.removeBtn}`}>
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className={styles.inputFields}>
            <label>
              Name
              <input
                type="text"
                placeholder="Enter your name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
              />
              <span className={styles.charCount}>12/50</span>
            </label>
            <label>
              Email
              <input
                type="text"
                placeholder="Add..."
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
              />
              <span className={styles.charCount}>2/4</span>
            </label>
            <label>
              Short Bio
              <textarea
                placeholder="Write a short bio"
                className={styles.textarea}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
              <span className={styles.charCount}>{formData.bio.length}/160</span>
            </label>
          </div>

          <div className={styles.btnGroup}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.saveBtn} onClick={handleSaveProfile}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

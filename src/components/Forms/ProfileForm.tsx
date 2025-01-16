"use client";

import React, { useState } from "react";
import styles from "./Profile.module.css";
import { useSession } from "next-auth/react";
import Modal from "../common/Modal/Modal";

export default function ProfilePage() {
  const { data: session } = useSession(); // Get session data
  const [activeStep, setActiveStep] = useState("Profile");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const renderContent = () => {
    switch (activeStep) {
      case "Profile":
        return <div>Profile content goes here...</div>;
      case "Posts":
        return <div>Posts content goes here...</div>;
      case "Saved":
        return <div>Saved content goes here...</div>;
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <>
      <div className={styles.profileHeaderContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.background}></div>
          <div className={styles.profileDetails}>
            <img
              src={session?.user?.image || ""}
              alt="Profile Picture"
              className={styles.profilePic}
            />
            <div className={styles.infoSection}>
              <h1 className={styles.name}>{session?.user?.name}</h1>
              <p className={styles.bio}>
                Follow for daily design tips, memes, and freebies 🍋 designer /
                co-founder
                <a href="#"> @lemonsqueezy</a>, <a href="#">@dunked</a>,{" "}
                <a href="#">@premiumpixels</a>, <a href="#">@iconic</a>
              </p>
              <p className={styles.meta}>
                {session?.user?.email} {"  "} • Joined Jun 2020 • India
              </p>
            </div>
            <div className={styles.actionButtons}>
              <div className={styles.stats}>
                <span className={styles.statItem}>
                  <strong>3492</strong> Followers
                </span>
                <span className={styles.statDivider}>|</span>
                <span className={styles.statItem}>
                  <strong>3492</strong> Following
                </span>
              </div>
              <div className={styles.buttons}>
                <button className={styles.edit} onClick={handleOpenModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" /* Icon size */
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
          {["Profile", "Posts", "Saved"].map((step) => (
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
                <h4>Website URL</h4>
                <span className={styles.linkUrl}>
                  <a
                    href="https://medium.com/@saurabhkute321"
                    className={styles.hyperlink}
                  >
                    https://medium.com/@saurabhkute321
                  </a>
                </span>
              </div>
              <div className={styles.frontPageSection}>
                <h4>Following</h4>
                <div className={styles.following}>
                  <div className={styles.left}>
                    <img src="/icons/user.svg" alt="User Icon" />
                    <p>Alex Paul</p>
                  </div>
                  <img
                    src="/icons/three-dots.svg"
                    alt="Menu Icon"
                    className={styles.dots}
                  />
                </div>
                <div className={styles.following}>
                  <div className={styles.left}>
                    <img src="/icons/user.svg" alt="User Icon" />
                    <p>Alex Paul</p>
                  </div>
                  <img
                    src="/icons/three-dots.svg"
                    alt="Menu Icon"
                    className={styles.dots}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modalBody}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h3>Profile Information</h3>
          </div>

          {/* Profile Section */}
          <div className={styles.profileSection}>
            <div className={styles.profileImageSection}>
              <img
                src={session?.user?.image || ""}
                alt="Profile Pic"
                className={styles.profileImg}
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

          {/* Input Fields */}
          <div className={styles.inputFields}>
            <label>
              Name*
              <input
                type="text"
                placeholder="Enter your name"
                className={styles.input}
                value={session?.user?.name || ""}
              />
              <span className={styles.charCount}>12/50</span>
            </label>
            <label>
              Email
              <input
                type="text"
                placeholder="Add..."
                className={styles.input}
                value={session?.user?.email || ""}
              />
              <span className={styles.charCount}>2/4</span>
            </label>
            <label>
              Short Bio
              <textarea
                placeholder="Write a short bio"
                className={styles.textarea}
              ></textarea>
              <span className={styles.charCount}>68/160</span>
            </label>
          </div>

          {/* Button Group */}
          <div className={styles.btnGroup}>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              Cancel
            </button>
            <button className={styles.saveBtn}>Save</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

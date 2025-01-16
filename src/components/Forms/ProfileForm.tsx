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
              className={`${styles.stepperItem} ${activeStep === step ? styles.activeStep : ""
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
        <div>
          <h2>Modal Title</h2>
          <p>
            This is some example content to demonstrate the scroll behavior when the
            content exceeds the modal's height. Add more text to test scrolling.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            euismod, nunc eu laoreet efficitur, risus lorem posuere ligula, nec
            volutpat felis eros id lectus.
          </p>
          <button onClick={handleCloseModal}>Close Modal</button>
        </div>
      </Modal>


    </>
  );
}

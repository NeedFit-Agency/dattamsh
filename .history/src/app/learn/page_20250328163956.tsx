// src/app/learn/page.tsx
import React from 'react';
import styles from './LearnPage.module.css';
import LessonPathItem from '../components/learn/LessonPathItem/LessonPathItem';
import { FaArrowLeft, FaBookOpen } from 'react-icons/fa'; // Import icons
import Image from 'next/image'; // Import Next.js Image component

// Assume you have duo-owl.png and globe.png in your /public folder
// You might need to download similar images or use placeholders
// Example placeholder URLs (replace with actual images):
const duoOwlSrc = '/duo-owl.png'; // Make sure this file exists in /public
const globeSrc = '/globe.png';   // Make sure this file exists in /public

export default function LearnPage() {
  // Dummy lesson data (as defined in step 2)
  const lessons = [
    { id: 1, status: 'completed', type: 'lesson' },
    { id: 2, status: 'current', type: 'lesson', title: 'START' },
    { id: 3, status: 'upcoming', type: 'dumbbell' },
    { id: 4, status: 'upcoming', type: 'chest' },
    { id: 5, status: 'upcoming', type: 'lesson' },
    // Add more lessons as needed
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <button className={styles.backButton} aria-label="Go back">
            <FaArrowLeft />
          </button>
          <div className={styles.titleGroup}>
            <span className={styles.sectionUnitText}>Section 1, Unit 4</span>
            <span className={styles.lessonTitleText}>Talk about your house</span>
          </div>
        </div>
        <button className={styles.guidebookButton}>
          <FaBookOpen className={styles.guidebookIcon} />
          GUIDEBOOK
        </button>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Talk about your house</h2>

        {/* Decorative Images */}
        {/* Use Next.js Image for optimization if images are in /public */}
        <Image
            src={duoOwlSrc}
            alt="Duo the owl"
            width={80} // Specify dimensions
            height={95} // Specify dimensions
            className={styles.duoOwl}
            unoptimized // Add this if you have issues with external/placeholder URLs or simple local files
         />
         <Image
            src={globeSrc}
            alt="Globe"
            width={60} // Specify dimensions
            height={75} // Specify dimensions
            className={styles.globe}
            unoptimized // Add this if you have issues with external/placeholder URLs or simple local files
          />

        {/* Lesson Path */}
        <div className={styles.pathContainer}>
          {lessons.map((lesson) => (
            <LessonPathItem
              key={lesson.id}
              status={lesson.status as 'completed' | 'current' | 'upcoming'} // Type assertion
              type={lesson.type}
              title={lesson.title}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
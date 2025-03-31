// ./learn/page.tsx
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react'; // Import React for style typing

// Adjust these import paths based on your actual project structure
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  // --- Define items for the specific target section ---
  const sectionItems = [
    { type: 'checkmark', id: 1, completed: true }, // Top checkmark
    { type: 'checkmark', id: 2, completed: true }, // Middle checkmark
    { type: 'checkmark', id: 3, completed: true }, // Bottom checkmark
    { type: 'chest', id: 4 },                    // Chest
    { type: 'level-badge', id: 5, level: 1 },   // Level Badge (original ID was 6)
    { type: 'duo', id: 6 }                       // Duo Owl (original ID was 5)
  ] as const;
  // --- End section items ---


  const handleScrollDown = () => {
    console.log("Scroll down clicked - I run in the browser!");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const unitTitle = "Pair letters and sounds"; // Or your actual title

  // --- Positioning Configuration (Adjust these values for pixel perfection) ---
  const itemSize = 80; // Base size from LessonPathItem.module.css
  const verticalSpacing = 30; // Vertical space between centers of items in the main flow
  const sectionHeight = 500; // Estimated height needed for this section, adjust as needed

  const positions: { [key: number]: React.CSSProperties } = {
    // Item ID: { top, left, transform }
    1: { // Top checkmark
      top: `${0 * (itemSize + verticalSpacing)}px`,
      left: '50%',
      transform: 'translateX(calc(-50% + 10px))', // Slightly right
    },
    2: { // Middle checkmark
      top: `${1 * (itemSize + verticalSpacing)}px`,
      left: '50%',
      transform: 'translateX(calc(-50% - 25px))', // More left
    },
    3: { // Bottom checkmark
      top: `${2 * (itemSize + verticalSpacing)}px`,
      left: '50%',
      transform: 'translateX(calc(-50% + 5px))',  // Slightly right again
    },
    4: { // Chest
      top: `${3 * (itemSize + verticalSpacing) + 10}px`, // Extra space below checkmarks
      left: '50%',
      transform: 'translateX(-50%)', // Centered horizontally
    },
    5: { // Level Badge
      top: `${4 * (itemSize + verticalSpacing) + 20}px`, // More space below chest
      left: '50%',
      transform: 'translateX(-50%)', // Centered horizontally
    },
    6: { // Duo Owl (SPECIAL PLACEMENT)
      top: `${1 * (itemSize + verticalSpacing) + 10}px`, // Align vertically near middle checkmark
      left: 'calc(50% + 120px)', // Significantly to the right of center
      transform: 'translateX(-50%)', // Center the owl itself on its left value
    },
  };
  // --- End Positioning Configuration ---

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* --- Header --- */}
            <div className={styles.lessonHeader}>
              <div className={styles.headerLeft}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                <div className={styles.headerTitle}>SECTION 1, UNIT 1<h2>{unitTitle}</h2></div>
              </div>
              <button className={styles.guidebookButton}>
                <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />GUIDEBOOK
              </button>
            </div>

            {/* --- Divider --- */}
            <div className={styles.lessonTitleDivider}><span>{unitTitle}</span></div>

            {/* --- Container for the absolutely positioned items --- */}
            <div className={styles.lessonPath} style={{ height: `${sectionHeight}px` }}>
              {/* We only render this specific section */}
              {sectionItems.map((item) => {
                const isClickable = !(item.type === 'checkmark' && item.completed);
                const PathComponent = isClickable ? Link : 'div';
                const itemStyle = positions[item.id] || {}; // Get pre-defined position

                return (
                  <PathComponent
                    key={item.id}
                    href={isClickable ? `/quiz?lesson=${item.id}` : undefined}
                    passHref={isClickable}
                    className={styles.lessonLink} // Now uses absolute positioning
                    style={itemStyle} // Apply position styles directly
                    aria-label={isClickable ? `Start or practice lesson ${item.id}` : `Lesson ${item.id} completed`}
                  >
                    <LessonPathItem
                      type={item.type}
                      level={item.type === 'level-badge' ? item.level : undefined}
                      completed={item.completed}
                    />
                  </PathComponent>
                );
              })}
            </div> {/* End lessonPath */}

            {/* --- Scroll Button --- */}
            <button className={styles.scrollDownButton} onClick={handleScrollDown} aria-label="Scroll down">
              <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
            </button>
          </main>
          <RightRail />
        </div>
      </div>
    </div>
  );
}
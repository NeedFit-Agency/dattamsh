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

// Helper function to chunk array into sections
function chunkArray<T>(array: ReadonlyArray<T>, size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size) as T[]); // Need type assertion for readonly array slice
  }
  return result;
}


export default function LearnPage() {
  const allLessonItems = [ // Renamed from lessonItems
    // Your existing flat array of items...
    { type: 'checkmark', id: 1, completed: true },
    { type: 'checkmark', id: 2, completed: true },
    { type: 'checkmark', id: 3, completed: true },
    { type: 'chest', id: 4 },
    { type: 'duo', id: 5 },
    // Section Break
    { type: 'level-badge', id: 6, level: 1 },
    { type: 'checkmark', id: 7, completed: true },
    { type: 'checkmark', id: 8, completed: true },
    { type: 'chest', id: 9 },
    { type: 'duo', id: 10 },
    // Section Break
    { type: 'level-badge', id: 11, level: 2 },
    { type: 'checkmark', id: 12, completed: true },
    { type: 'checkmark', id: 13, completed: true },
    { type: 'checkmark', id: 14, completed: true },
    { type: 'chest', id: 15 },
    // Section Break
    { type: 'duo', id: 16 },
    { type: 'level-badge', id: 17, level: 3 },
    // Add more items as needed...
  ] as const;

  // --- Group items into sections (e.g., 5 items per section) ---
  const itemsPerSection = 5;
  const sections = chunkArray(allLessonItems, itemsPerSection);
  // --- End Grouping ---


  const handleScrollDown = () => {
    // ... scroll function ...
    console.log("Scroll down clicked - I run in the browser!");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const unitTitle = "Pair letters and sounds";

  // --- Curve & Shift Parameters ---
  const curveAmplitude = 40; // How far left/right the *curve* goes (pixels)
  const curveFrequency = 0.35; // How tight the *curve* is
  const sectionShiftAmount = 90; // How far left/right each *section* is shifted
  // --- End Parameters ---

  let globalItemIndex = 0; // Counter for overall item position for curve calculation

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
              {/* ... header content ... */}
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

            <div className={styles.lessonPath}>
              {/* --- Outer loop for Sections --- */}
              {sections.map((sectionItems, sectionIndex) => {
                // Determine section horizontal shift
                const sectionTranslateX = sectionIndex % 2 === 0
                  ? -sectionShiftAmount // Even sections shift left
                  : sectionShiftAmount; // Odd sections shift right
                const sectionStyle: React.CSSProperties = {
                   transform: `translateX(${sectionTranslateX}px)`,
                };

                return (
                  <div
                    key={`section-${sectionIndex}`}
                    className={styles.sectionContainer}
                    style={sectionStyle} // Apply shift to the whole section
                  >
                    {/* --- Inner loop for Items within Section --- */}
                    {sectionItems.map((item) => {
                      const isClickable = !(item.type === 'checkmark' && item.completed);
                      const PathComponent = isClickable ? Link : 'div';

                      // Calculate CURVE translation based on GLOBAL index
                      const itemCurveTranslateX = curveAmplitude * Math.sin(curveFrequency * globalItemIndex);
                      const itemStyle: React.CSSProperties = {
                        // Apply only the curve transform here, section shift is on parent
                        transform: `translateX(${itemCurveTranslateX}px)`,
                      };

                      const currentGlobalIndex = globalItemIndex; // Capture index for key/callback
                      globalItemIndex++; // Increment for the next item

                      return (
                        <PathComponent
                          key={item.id}
                          href={isClickable ? `/quiz?lesson=${item.id}` : undefined}
                          passHref={isClickable}
                          className={styles.lessonLink}
                          style={itemStyle} // Apply calculated CURVE transform
                          aria-label={isClickable ? `Start lesson ${item.id}` : `Lesson ${item.id} completed`}
                        >
                          <LessonPathItem
                            type={item.type}
                            level={item.type === 'level-badge' ? item.level : undefined}
                            completed={item.completed}
                          />
                        </PathComponent>
                      );
                    })}
                  </div> // End sectionContainer
                );
              })} {/* --- End Sections Loop --- */}
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
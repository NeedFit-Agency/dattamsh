'use client'; // Keep this

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Adjust these import paths based on your actual project structure
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem'; // Corrected path segment
import styles from './LearnPage.module.css';

export default function LearnPage() {
  // --- Keep your original dummy data ---
  const lessonItems = [
    { type: 'checkmark', id: 1, completed: true }, // Add completed flag for styling
    { type: 'checkmark', id: 2, completed: true },
    { type: 'checkmark', id: 3, completed: true },
    { type: 'chest', id: 4 },
    { type: 'duo', id: 5 }, // Keep 'duo' type
    { type: 'level-badge', id: 6, level: 1 }, // Keep 'level-badge' type
    // Additional learning modules
    { type: 'checkmark', id: 7, completed: true },
    { type: 'checkmark', id: 8, completed: true },
    { type: 'chest', id: 9 },
    { type: 'duo', id: 10 },
    { type: 'level-badge', id: 11, level: 2 },
    { type: 'checkmark', id: 12, completed: true },
    { type: 'checkmark', id: 13, completed: true },
    { type: 'checkmark', id: 14, completed: true },
    { type: 'chest', id: 15 },
    { type: 'duo', id: 16 },
    { type: 'level-badge', id: 17, level: 3 },
  ] as const;
  // --- END ORIGINAL DATA ---

  const handleScrollDown = () => {
    console.log("Scroll down clicked - I run in the browser!");
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
  };

  // --- Get title from header for divider ---
  const unitTitle = "Pair letters and sounds"; // Or derive dynamically if needed

  return (
    <div className={styles.appContainer}>
      <Sidebar /> {/* Ensure this component exists and path is correct */}

      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          {/* Replace dummy data with actual props later */}
          <StatsBar streak={1} gems={234} hearts={2} /> {/* Ensure this component exists */}
        </div>

        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* --- Header remains the same --- */}
            <div className={styles.lessonHeader}>
              <div className={styles.headerLeft}>
                {/* Add Link or onClick handler if back navigation is needed */}
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                <div className={styles.headerTitle}>
                  SECTION 1, UNIT 1
                  <h2>{unitTitle}</h2> {/* Use variable */}
                </div>
              </div>
              <button className={styles.guidebookButton}>
                <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
                GUIDEBOOK
              </button>
            </div>

            {/* --- NEW: Divider --- */}
            <div className={styles.lessonTitleDivider}>
              <span>{unitTitle}</span> {/* Use variable */}
            </div>
            {/* --- END NEW --- */}

            <div className={styles.lessonPath}>
              {lessonItems.map((item, index) => {
                 // Determine if the item is clickable (e.g., not completed checkmarks)
                 const isClickable = !(item.type === 'checkmark' && item.completed);
                 const PathComponent = isClickable ? Link : 'div';

                 return (
                   <PathComponent
                     key={item.id}
                     href={isClickable ? `/quiz?lesson=${item.id}` : undefined}
                     passHref={isClickable}
                     // --- Apply positioning class ---
                     className={`${styles.lessonLink} ${styles[`itemPosition${index}`] ?? ''}`} // Add nullish coalescing for safety
                     aria-label={isClickable ? `Start lesson ${item.id}` : `Lesson ${item.id} completed`}
                     style={{ pointerEvents: isClickable ? 'auto' : 'none' }} // Disable pointer events for non-clickable divs
                   >
                     <LessonPathItem
                         type={item.type}
                         // --- Pass correct level prop for badges ---
                         level={item.type === 'level-badge' ? item.level : undefined}
                         // --- Pass completed status ---
                         completed={item.completed}
                     />
                   </PathComponent>
                 );
              })}
            </div>

            {/* --- Scroll Button remains the same --- */}
            <button className={styles.scrollDownButton} onClick={handleScrollDown} aria-label="Scroll down">
               <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
            </button>
          </main>

          {/* --- RightRail remains the same --- */}
          <RightRail /> {/* Ensure this component exists and path is correct */}
        </div>
      </div>
    </div>
  );
}
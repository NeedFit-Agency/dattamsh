// ./learn/page.tsx
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Keep the rest of your imports
import Sidebar from '@/app/components/layout/Sidebar/Sidebar'; // Assuming path is correct
import StatsBar from '@/app/components/layout/StatsBar/StatsBar'; // Assuming path is correct
import RightRail from '@/app/components/layout/RightRail/RightRail'; // Assuming path is correct
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem'; // Assuming path is correct
import styles from './LearnPage.module.css';

export default function LearnPage() {
  // --- NEW: Updated dummy data to match the image ---
  const lessonItems = [
    // Note: IDs are illustrative, adjust if they have meaning
    { type: 'checkmark', id: 1, completed: true }, // Completed lesson
    { type: 'star', id: 2, isCurrent: true },      // Current lesson with START
    { type: 'duo-globe', id: 3 },                // Duo holding globe
    { type: 'practice', id: 4 },                 // Practice dumbbell
    { type: 'chest', id: 5 },                    // Treasure chest
    // Add more items as needed for the full path...
    // { type: 'level-badge', id: 6, level: 1 }, // Example if needed later
  ] as const;
  // --- END NEW ---

  const handleScrollDown = () => {
    console.log("Scroll down clicked - I run in the browser!");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          {/* Replace dummy data with actual props later */}
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>

        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* --- Header remains similar, check title/unit --- */}
            <div className={styles.lessonHeader}>
              <div className={styles.headerLeft}>
                {/* Add Link or onClick if back navigation is needed */}
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                <div className={styles.headerTitle}>
                  SECTION 1, UNIT 4 {/* <-- Updated text */}
                  <h2>Talk about your house</h2> {/* <-- Updated text */}
                </div>
              </div>
              <button className={styles.guidebookButton}>
                <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
                GUIDEBOOK
              </button>
            </div>

            {/* --- NEW: Divider --- */}
            <div className={styles.lessonTitleDivider}>
              <span>Talk about your house</span>
            </div>
            {/* --- END NEW --- */}

            <div className={styles.lessonPath}>
              {lessonItems.map((item, index) => {
                // Determine if the item is clickable (current or future lessons)
                // Adjust this logic based on your actual requirements
                const isClickable = item.isCurrent || !item.completed;
                const PathComponent = isClickable ? Link : 'div'; // Use Link only if clickable

                return (
                  <PathComponent
                    key={item.id}
                    href={isClickable ? `/quiz?lesson=${item.id}` : undefined}
                    passHref={isClickable}
                    className={`${styles.lessonLink} ${styles[`itemPosition${index}`]}`} // Add positioning class
                    aria-label={isClickable ? `Start lesson ${item.id}` : `Lesson ${item.id} completed`}
                    style={{ pointerEvents: isClickable ? 'auto' : 'none' }} // Disable clicks on non-link divs
                  >
                    {/* --- Pass relevant props to LessonPathItem --- */}
                    <LessonPathItem
                        type={item.type}
                        level={item.type === 'level-badge' ? item.level : undefined} // Pass level only if badge
                        isCurrent={item.isCurrent}
                        completed={item.completed} // Pass completion status
                    />
                  </PathComponent>
                );
              })}
            </div>

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
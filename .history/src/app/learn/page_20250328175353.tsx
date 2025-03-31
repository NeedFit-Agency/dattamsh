// ./learn/page.tsx
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Adjust these import paths based on your actual project structure
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  const lessonItems = [
    // Keep your existing lessonItems array...
    { type: 'checkmark', id: 1, completed: true },
    { type: 'checkmark', id: 2, completed: true },
    { type: 'checkmark', id: 3, completed: true },
    { type: 'chest', id: 4 },
    { type: 'duo', id: 5 },
    { type: 'level-badge', id: 6, level: 1 },
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

  const handleScrollDown = () => {
    // ... scroll function remains the same ...
    console.log("Scroll down clicked - I run in the browser!");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const unitTitle = "Pair letters and sounds";

  // --- Curve Parameters ---
  const curveAmplitude = 35; // How far left/right the curve goes (pixels)
  const curveFrequency = 0.4; // How tight the curve is (lower value = wider waves)
  // --- End Curve Parameters ---

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* --- Header remains the same --- */}
            <div className={styles.lessonHeader}>
              {/* ... header content ... */}
              <div className={styles.headerLeft}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                <div className={styles.headerTitle}>
                  SECTION 1, UNIT 1
                  <h2>{unitTitle}</h2>
                </div>
              </div>
              <button className={styles.guidebookButton}>
                <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
                GUIDEBOOK
              </button>
            </div>

            {/* --- Divider remains the same --- */}
            <div className={styles.lessonTitleDivider}>
              <span>{unitTitle}</span>
            </div>

            <div className={styles.lessonPath}>
              {lessonItems.map((item, index) => {
                const isClickable = !(item.type === 'checkmark' && item.completed);
                const PathComponent = isClickable ? Link : 'div';

                // --- Calculate dynamic translation for curve ---
                const translateX = curveAmplitude * Math.sin(curveFrequency * index);
                const dynamicStyle = {
                  transform: `translateX(${translateX}px)`,
                };
                // --- End Calculation ---

                return (
                  <PathComponent
                    key={item.id}
                    href={isClickable ? `/quiz?lesson=${item.id}` : undefined}
                    passHref={isClickable}
                    // --- Apply style directly, remove itemPosition classes ---
                    className={styles.lessonLink} // Only base class needed now
                    style={dynamicStyle} // Apply calculated transform
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
            </div>

            {/* --- Scroll Button remains the same --- */}
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
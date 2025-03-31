'use client'; // <--- ADD THIS LINE AT THE VERY TOP

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Keep the rest of your imports
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  // Dummy data for lesson path
  const lessonItems = [
    { type: 'checkmark', id: 1 },
    { type: 'checkmark', id: 2 },
    { type: 'checkmark', id: 3 },
    { type: 'chest', id: 4 },
    { type: 'duo', id: 5 },
    { type: 'level-badge', id: 6, level: 1 },
    // Additional learning modules
    { type: 'checkmark', id: 7 },
    { type: 'checkmark', id: 8 },
    { type: 'chest', id: 9 },
    { type: 'duo', id: 10 },
    { type: 'level-badge', id: 11, level: 2 },
    { type: 'checkmark', id: 12 },
    { type: 'checkmark', id: 13 },
    { type: 'checkmark', id: 14 },
    { type: 'chest', id: 15 },
    { type: 'duo', id: 16 },
    { type: 'level-badge', id: 17, level: 3 },
  ] as const;

  // Now this function is defined within a Client Component
  const handleScrollDown = () => {
    console.log("Scroll down clicked - I run in the browser!");
    // You can implement window.scrollTo or element.scrollIntoView here
    // Example: Smooth scroll to the bottom (might need adjustments)
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar /> {/* Sidebar itself might also need 'use client' if it has internal state/events */}

      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>

        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            <div className={styles.lessonHeader}>
              <div className={styles.headerLeft}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
                <div className={styles.headerTitle}>
                  SECTION 1, UNIT 1
                  <h2>Pair letters and sounds</h2>
                </div>
              </div>
              <button className={styles.guidebookButton}>
                <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
                GUIDEBOOK
              </button>
            </div>

            <div className={styles.lessonPath}>
              {lessonItems.map(item => (
                <Link
                    key={item.id}
                    href={`/quiz?lesson=${item.id}`}
                    passHref
                    className={styles.lessonLink}
                    aria-label={`Start lesson ${item.id}`}
                >
                   <LessonPathItem type={item.type} level={item.id} />
                </Link>
              ))}
            </div>

            {/* This button's onClick handler will now work */}
            <button className={styles.scrollDownButton} onClick={handleScrollDown} aria-label="Scroll down">
               <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
            </button>
          </main>

          <RightRail /> {/* RightRail might also need 'use client' if it has internal state/events */}
        </div>
      </div>
    </div>
  );
}
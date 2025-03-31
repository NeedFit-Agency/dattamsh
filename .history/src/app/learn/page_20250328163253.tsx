'use client'; // <--- ADD THIS LINE AT THE VERY TOP

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Update icon import
import { faArrowLeft, faFileLines } from '@fortawesome/free-solid-svg-icons';

// Keep the rest of your imports
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem'; // Assuming this component exists and handles the types
import styles from './LearnPage.module.css';

export default function LearnPage() {
  // Updated dummy data to match the screenshot structure
  const lessonItems = [
    { type: 'checkmark-green', id: 'complete-prev', active: false }, // Previous completed lesson (green check)
    { type: 'start', id: 'unit4-start', isCurrent: true },           // Current lesson (star + START bubble)
    { type: 'dumbbell', id: 'practice1', active: false },            // Gray dumbbell icon
    { type: 'chest', id: 'chest1', active: false },                   // Gray chest icon
    { type: 'placeholder', id: 'lesson-next1', active: false },       // Gray placeholder circle (assuming)
    { type: 'duo-globe', id: 'duo-mascot' },                          // Duo mascot with globe
    // Add more items if they exist below the fold in the design
  ] as const;

  // handleScrollDown is removed as the button is removed

  return (
    <div className={styles.appContainer}>
      {/* Assuming Sidebar component does not need 'use client' unless it has interactivity */}
      <Sidebar />

      <div className={styles.mainAreaWrapper}>
        {/* Assuming StatsBar component does not need 'use client' */}
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>

        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* Updated Lesson Header */}
            <div className={styles.lessonHeader}>
              <div className={styles.headerLeft}>
                {/* Back arrow can be a Link or button depending on desired behavior */}
                <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
                <div className={styles.headerTitle}>
                  SECTION 1, UNIT 4
                  {/* Updated H2 title */}
                  <h2>Talk about your house</h2>
                </div>
              </div>
              <button className={styles.guidebookButton}>
                {/* Updated icon */}
                <FontAwesomeIcon icon={faFileLines} className={styles.guidebookIcon} />
                GUIDEBOOK
              </button>
            </div>

            {/* Added Lesson Path Title */}
            <div className={styles.lessonPathTitle}>
              Talk about your house
            </div>

            {/* Updated Lesson Path */}
            <div className={styles.lessonPath}>
              {lessonItems.map(item => {
                  // Conditionally wrap interactive items with Link
                  const isInteractive = item.type === 'start' || (item.type !== 'duo-globe' && item.type !== 'checkmark-green' && item.active !== false);
                  const Wrapper = isInteractive ? Link : 'div'; // Use Link for interactive, div for static
                  const wrapperProps = isInteractive ? {
                      href: `/lesson?id=${item.id}`, // Adjust href structure as needed
                      passHref: true,
                      className: styles.lessonLink,
                      'aria-label': `Start ${item.type} ${item.id}`
                  } : { className: styles.lessonLink }; // Apply spacing class even to divs

                  return (
                      <Wrapper key={item.id} {...wrapperProps}>
                          {/* Pass necessary props to LessonPathItem */}
                          {/* Ensure LessonPathItem handles 'checkmark-green', 'start', 'dumbbell', 'placeholder', 'duo-globe', 'isCurrent', 'active' */}
                          <LessonPathItem
                              type={item.type}
                              level={item.id} // Or pass a specific level prop if needed
                              isCurrent={item.isCurrent}
                              active={item.active}
                           />
                      </Wrapper>
                  );
              })}
            </div>

            {/* Scroll down button removed */}

          </main>

          {/* Assuming RightRail component does not need 'use client' */}
          <RightRail />
        </div>
      </div>
    </div>
  );
}
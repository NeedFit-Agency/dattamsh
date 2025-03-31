// ./src/app/component/learn/learpathitem/learnpathitem.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --- NEW: Import necessary icons ---
import { faCheck, faStar, faDumbbell } from '@fortawesome/free-solid-svg-icons';
// --- END NEW ---
import Image from 'next/image';
import styles from './LessonPathItem.module.css'; // --- MAKE SURE THIS PATH IS CORRECT ---

interface LessonPathItemProps {
  // --- NEW: Updated types ---
  type: 'checkmark' | 'star' | 'duo-globe' | 'practice' | 'chest' | 'level-badge';
  // --- END NEW ---
  level?: number;
  isCurrent?: boolean; // To show the START bubble
  completed?: boolean; // To potentially style completed items differently
  onClick?: () => void; // Retained, though Link handles navigation now
}

export default function LessonPathItem({ type, level, isCurrent, completed, onClick }: LessonPathItemProps) {

  // Determine the main class based on type and state
  let itemClass = `${styles.pathItem} ${styles[type]}`;
  if (completed && type !== 'checkmark' && type !== 'star') { // Add completed style if needed
     // itemClass += ` ${styles.completed}`; // Optional: Define .completed styles if non-checkmarks need visual change
  }

  // No need for internal handleClick prevention if parent Link handles it

  const renderContent = () => {
    switch (type) {
      case 'checkmark':
        return <FontAwesomeIcon icon={faCheck} className={styles.icon} />;
      case 'star': // Current lesson
        return <FontAwesomeIcon icon={faStar} className={styles.icon} />;
      case 'practice': // Dumbbell icon
        return <FontAwesomeIcon icon={faDumbbell} className={styles.icon} />;
      case 'chest':
        // Use CSS for chest appearance (keyhole, etc.)
        return <div className={styles.chestContent}></div>;
      case 'duo-globe':
        return (
          <Image
            // --- IMPORTANT: Replace with actual path to your optimized Duo+Globe image ---
            src="/images/duo-globe.svg" // Or .png, .webp etc.
            alt="Duo with globe"
            width={65} // Adjust width as needed
            height={60} // Adjust height as needed
            className={styles.duoImage}
          />
        );
      case 'level-badge': // Keep if needed elsewhere
        return (
          <>
            {level}
            {/* Laurel leaves via ::before/::after in CSS module */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    // The parent Link or div now has position:relative
    <div className={itemClass} onClick={onClick}>
      {isCurrent && type === 'star' && (
        <div className={styles.startBubble}>START</div>
      )}
      {renderContent()}
    </div>
  );
}
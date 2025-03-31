// ./src/app/components/learn/LessonPathItem/LessonPathItem.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Only import check icon
// Removed Image import if not used for Duo anymore
import styles from './LessonPathItem.module.css'; // Ensure this path is correct

interface LessonPathItemProps {
  type: 'checkmark' | 'chest' | 'duo' | 'level-badge';
  level?: number; // For level-badge
  completed?: boolean; // For checkmark styling
  onClick?: () => void; // Optional click handler
}

export default function LessonPathItem({ type, level, completed, onClick }: LessonPathItemProps) {

  // Determine the main class based on type
  let itemClass = `${styles.pathItem} ${styles[type]}`; // e.g., "pathItem checkmark"

  // Add completed style specifically for checkmarks if needed (or handle in CSS)
  if (completed && type === 'checkmark') {
     itemClass += ` ${styles.completed}`; // Add .completed class for styling completed checkmarks
  }

  const renderContent = () => {
    switch (type) {
      case 'checkmark':
        return <FontAwesomeIcon icon={faCheck} className={styles.icon} />;
      case 'chest':
        // Chest visuals are done purely in CSS via .chest and .chestContent
        return <div className={styles.chestContent}></div>;
      case 'duo':
        // Basic Duo Owl using CSS shapes
        return (
          <div className={styles.owlBody}>
             <div className={`${styles.owlEye} ${styles.left}`}></div>
             <div className={`${styles.owlEye} ${styles.right}`}></div>
             <div className={styles.owlBeak}></div>
          </div>
        );
      case 'level-badge':
        // Level badge shows number; laurels are added via CSS ::before/::after
        return (
          <>{level}</>
        );
      default:
        return null;
    }
  };

  // Render the item container with its content
  return (
    <div className={itemClass} onClick={onClick}>
      {renderContent()}
    </div>
  );
}
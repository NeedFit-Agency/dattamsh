// ./src/app/components/learn/LessonPathItem/LessonPathItem.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Only import check icon
import Image from 'next/image';
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
        return <div className={styles.chestContent}></div>;
      case 'duo':
        return (
          <div className={styles.mascotContainer}>
            <Image 
              src="/mascot.png"
              alt="Mascot"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        );
      case 'level-badge':
        return (
          <>{level}</>
        );
      default:
        return null;
    }
  };

  return (
    <div className={itemClass} onClick={onClick}>
      {renderContent()}
    </div>
  );
}
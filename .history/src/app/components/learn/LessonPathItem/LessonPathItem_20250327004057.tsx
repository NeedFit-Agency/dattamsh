import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'; // Recommended for optimization
import styles from './LessonPathItem.module.css';

interface LessonPathItemProps {
  type: 'checkmark' | 'chest' | 'duo' | 'level-badge';
  level?: number;
  onClick?: () => void; // For clickable items
}

export default function LessonPathItem({ type, level, onClick }: LessonPathItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick) {
      // Prevent navigation if no onClick (e.g., non-clickable checkmark)
      // This assumes the Link wraps this component externally
    } else {
        onClick();
    }
  };

  switch (type) {
    case 'checkmark':
      return (
        <div className={`${styles.pathItem} ${styles.checkmark}`} onClick={handleClick}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      );
    case 'chest':
      return (
        <div className={`${styles.pathItem} ${styles.chest}`} onClick={handleClick}>
          {/* Keyhole CSS approximation goes in the CSS module */}
        </div>
      );
    case 'duo':
      return (
        <div className={`${styles.pathItem} ${styles.duoOwl}`} onClick={handleClick}>
           {/* Simple Duo CSS approximation in CSS module */}
           <div className={styles.owlBody}>
              <div className={`${styles.owlEye} ${styles.left}`}></div>
              <div className={`${styles.owlEye} ${styles.right}`}></div>
              <div className={styles.owlBeak}></div>
           </div>
        </div>
      );
    case 'level-badge':
      return (
        <div className={`${styles.pathItem} ${styles.levelBadge}`} onClick={handleClick}>
          {level}
          {/* Laurel leaves via ::before/::after in CSS module */}
        </div>
      );
    default:
      return null;
  }
}
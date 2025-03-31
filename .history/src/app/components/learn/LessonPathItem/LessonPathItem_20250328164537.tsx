import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from './LessonPathItem.module.css';

interface LessonPathItemProps {
  type: 'checkmark' | 'chest' | 'duo' | 'level-badge' | 'star';
  level?: number;
  onClick?: () => void; // For clickable items
  disabled?: boolean;
  isFirst?: boolean;
}

export default function LessonPathItem({ 
  type, 
  level, 
  onClick, 
  disabled = false,
  isFirst = false
}: LessonPathItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick || disabled) {
      // Prevent navigation if no onClick or disabled
      e.preventDefault();
    } else {
      onClick();
    }
  };

  const disabledClass = disabled ? styles.disabled : '';

  switch (type) {
    case 'checkmark':
      return (
        <div className={`${styles.pathItem} ${styles.checkmark} ${disabledClass}`} onClick={handleClick}>
          <FontAwesomeIcon icon={faCheck} />
          {isFirst && <div className={styles.pathConnector}></div>}
        </div>
      );
    case 'star':
      return (
        <div className={`${styles.pathItem} ${styles.star} ${disabledClass}`} onClick={handleClick}>
          <div className={styles.starInner}>
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className={styles.pathConnector}></div>
        </div>
      );
    case 'chest':
      return (
        <div className={`${styles.pathItem} ${styles.chest} ${disabledClass}`} onClick={handleClick}>
          {/* Keyhole CSS approximation goes in the CSS module */}
          <div className={styles.pathConnector}></div>
        </div>
      );
    case 'duo':
      return (
        <div className={`${styles.pathItem} ${styles.duoOwl} ${disabledClass}`} onClick={handleClick}>
           {/* Simple Duo CSS approximation in CSS module */}
           <div className={styles.owlBody}>
              <div className={`${styles.owlEye} ${styles.left}`}></div>
              <div className={`${styles.owlEye} ${styles.right}`}></div>
              <div className={styles.owlBeak}></div>
           </div>
           <div className={styles.pathConnector}></div>
        </div>
      );
    case 'level-badge':
      return (
        <div className={`${styles.pathItem} ${styles.levelBadge} ${disabledClass}`} onClick={handleClick}>
          {level}
          {/* Laurel leaves via ::before/::after in CSS module */}
          <div className={styles.pathConnector}></div>
        </div>
      );
    default:
      return null;
  }
}
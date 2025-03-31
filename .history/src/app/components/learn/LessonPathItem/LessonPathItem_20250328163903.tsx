// src/app/components/learn/LessonPathItem/LessonPathItem.tsx
import React from 'react';
import styles from './LessonPathItem.module.css';
import { FaCheck, FaStar, FaDumbbell, FaArchive, FaQuestion } from 'react-icons/fa'; // Example icons

interface LessonPathItemProps {
  status: 'completed' | 'current' | 'upcoming';
  type: 'lesson' | 'dumbbell' | 'chest' | string; // Allow other types
  title?: string; // For START text or potentially others
}

const LessonPathItem: React.FC<LessonPathItemProps> = ({ status, type, title }) => {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <FaCheck />;
      case 'current':
        return <FaStar />;
      case 'upcoming':
        switch (type) {
          case 'dumbbell':
            return <FaDumbbell />;
          case 'chest':
            return <FaArchive />;
          case 'lesson': // Default icon for upcoming lessons
             return <FaStar style={{ opacity: 0.5 }}/>; // Faded star maybe? Or nothing?
          default:
            return <FaQuestion />; // Placeholder for unknown types
        }
      default:
        return null;
    }
  };

  // Combine base class with status-specific and type-specific classes
  const wrapperClasses = `${styles.itemWrapper} ${styles[status]} ${styles[type] || ''}`;

  return (
    <div className={wrapperClasses}>
      <div className={styles.circle}>
        <span className={styles.icon}>{getIcon()}</span>
      </div>
      {status === 'current' && title && (
        <span className={styles.startText}>{title}</span>
      )}
    </div>
  );
};

export default LessonPathItem;
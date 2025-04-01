'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGear, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/learning/learning.module.css';

interface LearningHeaderProps {
  progress: number;
  hearts: number;
  onBackClick: () => void;
}

export default function LearningHeader({ progress, hearts, onBackClick }: LearningHeaderProps) {
  const renderHearts = () => {
    const heartsArray = [];
    const maxHearts = 3;
    for (let i = 0; i < maxHearts; i++) {
      heartsArray.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faHeart} 
          style={{ opacity: i < hearts ? 1 : 0.3 }}
        />
      );
    }
    heartsArray.push(
      <span 
        key="count" 
        style={{ fontWeight: 'bold', marginLeft: '4px', color: 'var(--error-red)' }}
      >
        {hearts}
      </span>
    );
    return heartsArray;
  };

  return (
    <header className={styles.learningHeader}>
      <div className={styles.headerNavigation}>
        <button 
          className={styles.backButton} 
          onClick={onBackClick} 
          title="Exit Lesson"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{width: `${progress}%`}}
          />
        </div>
        <div className={styles.headerActions}>
          <div className={styles.heartsContainer}>{renderHearts()}</div>
          <button 
            className={styles.settingsButton} 
            title="Settings (Not Implemented)"
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>
      </div>
    </header>
  );
} 
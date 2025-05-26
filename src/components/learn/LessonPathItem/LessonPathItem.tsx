// ./src/app/components/learn/LessonPathItem/LessonPathItem.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Only import check icon
import Image from 'next/image';
import styles from './LessonPathItem.module.css'; // Ensure this path is correct
import React, { useState, useEffect } from 'react';

interface LessonPathItemProps {
  type: 'checkmark' | 'chest' | 'robo' | 'level-badge';
  level?: number; // For level-badge
  completed?: boolean; // For checkmark styling
  onClick?: () => void; // Optional click handler
}

export default function LessonPathItem({ type, level, completed, onClick }: LessonPathItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Spin on mount for 'robo'
  useEffect(() => {
    if (type === 'robo') {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 700); // match spin duration
    }
  }, [type]);

  // Determine the main class based on type
  let itemClass = `${styles.pathItem} ${styles[type]}`; // e.g., "pathItem checkmark"

  // Add completed style specifically for checkmarks if needed (or handle in CSS)
  if (completed && type === 'checkmark') {
     itemClass += ` ${styles.completed}`; // Add .completed class for styling completed checkmarks
  }

  const handleMascotClick = () => {
    if (type === 'robo') {
      setIsAnimating(true);
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 700); // match spin duration
    }
    if (onClick) onClick();
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const renderSparkles = () => {
    if (!isAnimating) return null;
    const positions = [
      { top: '-10px', left: '50%', transform: 'translate(-50%, -100%)' },
      { top: '50%', left: '-10px', transform: 'translate(-100%, -50%)' },
      { bottom: '-10px', left: '50%', transform: 'translate(-50%, 100%)' },
      { top: '50%', right: '-10px', transform: 'translate(100%, -50%)' },
    ];
    return positions.map((style, i) => (
      <span
        key={i}
        className={styles.sparkle}
        style={{ ...style }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 0L10.5 6H17L11.5 9.5L13 16L9 12.5L5 16L6.5 9.5L1 6H7.5L9 0Z" fill="#FFD700"/>
        </svg>
      </span>
    ));
  };

  const renderContent = () => {
    switch (type) {
      case 'checkmark':
        return <FontAwesomeIcon icon={faCheck} className={styles.icon} />;
      case 'chest':
        return <div className={styles.chestContent}></div>;
      case 'robo':
        return (
          <div
            className={
              styles.mascotContainer +
              (isAnimating ? ' ' + styles.animate : '') +
              (isSpinning ? ' ' + styles.spin : '')
            }
            onAnimationEnd={handleAnimationEnd}
          >
            {renderSparkles()}
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
    <div className={itemClass} onClick={handleMascotClick}>
      {renderContent()}
    </div>
  );
}
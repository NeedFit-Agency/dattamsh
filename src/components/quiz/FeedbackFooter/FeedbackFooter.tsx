'use client';

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './FeedbackFooter.module.css';

interface FeedbackFooterProps {
  isCorrect: boolean;
  message: string;
  onContinue: () => void;
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = ({ isCorrect, message, onContinue }) => {
  // Auto-focus the continue button for keyboard navigation
  useEffect(() => {
    const continueButton = document.getElementById('continue-button');
    if (continueButton) {
      continueButton.focus();
    }
  }, []);

  const feedbackClasses = [
    styles.feedbackFooter,
    isCorrect ? styles.correct : styles.incorrect,
  ].join(' ');

  return (
    <div className={feedbackClasses}>
      <div className={styles.feedbackContent}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon 
            icon={isCorrect ? faCheck : faTimes} 
            className={styles.feedbackIcon} 
          />
        </div>
        <div className={styles.messageContainer}>
          <p className={styles.feedbackMessage}>{message}</p>
        </div>
      </div>
      <button
        id="continue-button"
        className={styles.continueButton}
        onClick={onContinue}
      >
        CONTINUE
      </button>
    </div>
  );
};

export default FeedbackFooter;
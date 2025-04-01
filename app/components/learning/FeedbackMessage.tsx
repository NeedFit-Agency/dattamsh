'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/learning/learning.module.css';

interface FeedbackMessageProps {
  message: string;
  isChecked: boolean;
  isAllCorrect: boolean;
}

export default function FeedbackMessage({ 
  message, 
  isChecked, 
  isAllCorrect 
}: FeedbackMessageProps) {
  return (
    <div
      className={`${styles.dragDropFeedback} ${
        isChecked && isAllCorrect
          ? styles.dragDropFeedbackCorrect
          : styles.dragDropFeedbackIncorrect
      }`}
    >
      <FontAwesomeIcon
        icon={isChecked && isAllCorrect ? faCheck : faTimes}
        style={{
          marginRight: '8px',
          color: isChecked && isAllCorrect ? 'var(--success-green)' : 'var(--error-red)'
        }}
      />
      {message}
    </div>
  );
} 
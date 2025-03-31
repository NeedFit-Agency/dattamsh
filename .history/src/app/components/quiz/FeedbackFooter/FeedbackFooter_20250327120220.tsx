'use client';

import styles from './FeedbackFooter.module.css';

interface FeedbackFooterProps {
  isCorrect: boolean;
  message: string;
  onContinue: () => void;
}

export default function FeedbackFooter({ isCorrect, message, onContinue }: FeedbackFooterProps) {
  return (
    <div className={`${styles.feedbackFooter} ${isCorrect ? styles.correct : styles.incorrect}`}>
      <div className={styles.message}>{message}</div>
      <button 
        onClick={onContinue}
        className={`${styles.continueButton} ${isCorrect ? styles.correctButton : styles.incorrectButton}`}
      >
        CONTINUE
      </button>
    </div>
  );
}
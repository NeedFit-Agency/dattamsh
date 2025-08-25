import React from 'react';
import styles from './FeedbackDialog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface FeedbackDialogProps {
  isOpen: boolean;
  type: 'correct' | 'incorrect' | null;
  message: string;
  onClose: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  isOpen,
  type,
  message,
  onClose
}) => {
  if (!isOpen || !type) return null;

  const isCorrect = type === 'correct';
  const icon = isCorrect ? faCheckCircle : faTimesCircle;
  const iconColor = isCorrect ? '#10b981' : '#ef4444';

  return (
    <div 
      className={`${styles.dialog} ${isCorrect ? styles.correct : styles.incorrect}`}
      role="dialog"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-message"
    >
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon 
              icon={icon} 
              className={styles.icon}
              style={{ color: iconColor }}
            />
          </div>
          
          <h2 id="feedback-title" className={styles.title}>
            {isCorrect ? 'Great Job!' : 'Try Again!'}
          </h2>
          
          <p id="feedback-message" className={styles.message}>
            {message}
          </p>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.primaryButton}
            onClick={onClose}
            autoFocus
          >
            {isCorrect ? 'Continue' : 'Got it'}
          </button>
        </div>
      </div>
    );
  };

export default FeedbackDialog;

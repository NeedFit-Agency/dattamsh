import React from 'react';
import styles from './WrongAnswerDialog.module.css';

interface WrongAnswerDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  message?: string;
  explanation?: string;
}

const WrongAnswerDialog: React.FC<WrongAnswerDialogProps> = ({
  isVisible,
  onClose,
  onTryAgain,
  message = "That's not quite right!",
  explanation = "Let's review the correct order and try again. Remember to think about the logical flow of building a SQL table."
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>❌</span>
          </div>
          <h2 className={styles.title}>Incorrect Answer</h2>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          
          {explanation && (
            <div className={styles.explanation}>
              <h3>💡 Tip</h3>
              <p>{explanation}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button 
            className={styles.tryAgainButton}
            onClick={onTryAgain}
          >
            Try Again
          </button>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongAnswerDialog;

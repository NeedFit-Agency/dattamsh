import React from 'react';
import styles from './CongratulationsScreen.module.css';

interface CongratulationsScreenProps {
  isVisible: boolean;
  message?: string;
  buttonText?: string;
  onButtonClick: () => void;
  mascot?: React.ReactNode;
  showStars?: boolean;
  showTryAgain?: boolean;
  tryAgainText?: string;
  onTryAgainClick?: () => void;
}

const DefaultMascot = () => (
  <svg viewBox="0 0 100 80" width="100" height="80">
    <path fill="#38bdf8" d="M10,80 C10,46.86 36.86,20 70,20 L75,20 C75,30 70,40 60,40 C50,40 45,30 45,20 L50,20 C83.14,20 110,46.86 110,80 L10,80 Z"></path>
    <path fill="#7dd3fc" d="M50,20 C50,9 60,0 70,0 C80,0 90,9 90,20 L50,20 Z"></path>
    <circle fill="#fff" cx="55" cy="55" r="12"></circle>
    <circle fill="#475569" cx="52" cy="58" r="5"></circle>
    <circle fill="#fff" cx="85" cy="55" r="12"></circle>
    <circle fill="#475569" cx="88" cy="58" r="5"></circle>
  </svg>
);

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  isVisible,
  message = "YOU DID IT!",
  buttonText = "Next",
  onButtonClick,
  mascot = <DefaultMascot />,
  showStars = true,
  showTryAgain = false,
  tryAgainText = "Try Again",
  onTryAgainClick
}) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.winScreen} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.winText}>{message}</div>
      
      {showStars && (
        <div className={styles.starContainer}>
          <div className={`${styles.star} ${styles.s1}`}>⭐</div>
          <div className={`${styles.star} ${styles.s2}`}>⭐</div>
          <div className={`${styles.star} ${styles.s3}`}>⭐</div>
          <div className={`${styles.star} ${styles.s4}`}>⭐</div>
          <div className={`${styles.star} ${styles.s5}`}>⭐</div>
        </div>
      )}
        <div className={styles.winMascot}>
        {mascot}
      </div>
      
      <div className={styles.buttonContainer}>
        {showTryAgain && onTryAgainClick && (
          <button className={`${styles.playAgainBtn} ${styles.tryAgainBtn}`} onClick={onTryAgainClick}>
            {tryAgainText}
          </button>
        )}
        <button className={styles.playAgainBtn} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CongratulationsScreen;

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './CongratulationsScreen.module.css';

interface CongratulationsScreenProps {
  isVisible: boolean;
  message?: string;
  subtitle?: string; // New prop for customizable subtitle
  buttonText?: string;
  onButtonClick?: (() => void) | { href: string };
  showStars?: boolean;
  showTryAgain?: boolean;
  tryAgainText?: string;
  onTryAgainClick?: () => void;
  isLastActivity?: boolean; // New prop to indicate if this is the last activity
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className={styles.confetti} style={style} />
);

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  isVisible,
  message = "You have completed the activity",
  subtitle, // New subtitle prop
  buttonText = "Finish",
  onButtonClick,
  showStars = true,
  showTryAgain = false,
  tryAgainText = "Try Again",
  onTryAgainClick,
  isLastActivity = false, // Default to false
}) => {
  const router = useRouter();
  
  // Smart subtitle generation based on context
  const getDefaultSubtitle = () => {
    // If custom subtitle is provided, use it
    if (subtitle) return subtitle;
    
    // Grade completion context - most significant achievement
    if (message?.includes('completed grade')) {
      const gradeSubtitles = [
        "You finished the whole grade",
        "Great job completing this grade",
        "You did it. Grade complete",
        "You finished all the lessons in this grade",
        "Well done. You completed the grade"
      ];
      return gradeSubtitles[Math.floor(Math.random() * gradeSubtitles.length)];
    }
    
    // Chapter completion context
    if (message?.includes('chapter') || isLastActivity) {
      const chapterSubtitles = [
        "You finished this chapter",
        "Great job completing this chapter",
        "You learned a lot in this chapter",
        "Chapter done. Well done",
        "You finished all the lessons in this chapter"
      ];
      return chapterSubtitles[Math.floor(Math.random() * chapterSubtitles.length)];
    }
    
    // Activity completion context
    if (message?.includes('activity') || message?.includes('challenge')) {
      const activitySubtitles = [
        "You finished this activity",
        "Great job completing this task",
        "You did this activity well",
        "Activity complete. Good work",
        "You finished this learning task"
      ];
      return activitySubtitles[Math.floor(Math.random() * activitySubtitles.length)];
    }
    
    // General success context (WhoAmI, correct answers)
    if (message?.includes('Great job') || message?.includes('got it right')) {
      const successSubtitles = [
        "You got the right answer",
        "Well done. You did it",
        "Great thinking. You're right",
        "You answered correctly",
        "Good job. You know this",
        "You got it. Well done",
        "You answered the question right"
      ];
      return successSubtitles[Math.floor(Math.random() * successSubtitles.length)];
    }
    
    // Default encouraging subtitle with variety
    const defaultSubtitles = [
      "You did a great job",
      "Well done",
      "You did it",
      "Great work",
      "You did well",
      "Good job",
      "You're doing great"
    ];
    return defaultSubtitles[Math.floor(Math.random() * defaultSubtitles.length)];
  };

  const finalSubtitle = getDefaultSubtitle();

  // Optimize confetti count for mobile devices
  const confettiPieces = useMemo(() => {
    if (!isVisible) return [];
    const pieces = [];
    const colors = ['#f1c40f', '#e67e22', '#3498db', '#2ecc71', '#9b59b6', '#1abc9c'];
    
    // Reduce confetti count on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const confettiCount = isMobile ? 40 : 80;
    
    for (let i = 0; i < confettiCount; i++) {
      pieces.push({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
      });
    }
    return pieces;
  }, [isVisible]);

  // Determine the final button text based on isLastActivity prop
  const finalButtonText = useMemo(() => {
    if (isLastActivity) {
      return "Next Grade";
    }
    return buttonText;
  }, [isLastActivity, buttonText]);

  if (!isVisible) return null;

  const handleButtonClick = () => {
    
    // Check if this is a grade completion button - this should take priority
    if (buttonText.includes('Congratulations. You have completed grade')) {
      // Extract the current grade number from the button text
      const gradeMatch = buttonText.match(/grade (\d+)/);
      if (gradeMatch) {
        const currentGrade = parseInt(gradeMatch[1]);
        const nextGrade = currentGrade + 1;
        router.replace(`/standard/${nextGrade}/chapter/1`);
        return; // Exit early to prevent other navigation
      } else {
        router.replace('/home');
        return; // Exit early to prevent other navigation
      }
    }
    
    // Handle last activity navigation (Next Grade button)
    if (isLastActivity) {
      // Extract the current grade number from the URL or message
      const gradeMatch = message?.match(/grade (\d+)/) || window.location.pathname.match(/\/standard\/(\d+)/);
      if (gradeMatch) {
        const currentGrade = parseInt(gradeMatch[1]);
        const nextGrade = currentGrade + 1;
        router.replace(`/standard/${nextGrade}/chapter/1`);
        return; // Exit early to prevent other navigation
      } else {
        // Fallback: navigate to home if we can't determine the grade
        router.replace('/home');
        return;
      }
    }
    
    // Handle other button clicks (non-grade completion)
    if (onButtonClick && typeof onButtonClick === 'object' && onButtonClick.href) {
      router.push(onButtonClick.href);
    } else if (onButtonClick && typeof onButtonClick === 'function') {
      onButtonClick();
    } else {
      // Fallback for when no onButtonClick is provided
      console.log('No onButtonClick provided, staying on current page');
    }
  };

  return (
    <div className={`${styles.winScreen} ${styles.visible}`}>
      {/* Confetti Background */}
      <div className={styles.confettiContainer}>
        {confettiPieces.map((style, index) => (
          <ConfettiPiece key={index} style={style} />
        ))}
      </div>

      {/* Main Content Container */}
      <div className={styles.contentContainer}>
        {/* Message Section */}
        <div className={styles.messageSection}>
          <h1 className={styles.winText}>{message}</h1>
          <div className={styles.subtitleText}>
            {finalSubtitle}
          </div>
        </div>

        {/* Lottie Animation Section */}
        <div className={styles.lottieSection}>
          <DotLottieReact
            src="https://lottie.host/9c6ebd15-be72-4e2f-9b07-37b0f1613072/CBVyvMFBIi.lottie"
            loop
            autoplay
            className={styles.lottieAnimation}
          />
        </div>

        {/* Button Section */}
        <div className={styles.buttonContainer}>
          {showTryAgain && onTryAgainClick && (
            <button
              className={`${styles.playAgainBtn} ${styles.tryAgainBtn}`}
              onClick={onTryAgainClick}
              aria-label={tryAgainText}
            >
              {tryAgainText}
            </button>
          )}
          <button 
            className={`${styles.playAgainBtn} ${(buttonText.includes('Next Grade') || isLastActivity) ? styles.gradeCompletionBtn : ''}`}
            onClick={handleButtonClick}
            aria-label={finalButtonText}
          >
            {finalButtonText}
          </button>
        </div>
      </div>

      {/* Stars Animation */}
      {showStars && (
        <div className={styles.starContainer}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${styles.star} ${styles[`s${i + 1}`]}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CongratulationsScreen;

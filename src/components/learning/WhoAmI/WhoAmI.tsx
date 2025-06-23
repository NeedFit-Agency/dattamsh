import React, { useState, useEffect, useRef } from 'react';
import styles from './WhoAmI.module.css';
import CongratulationsScreen from '../../shared/CongratulationsScreen';

interface Option {
  id: string;
  text: string;
  icon: React.ReactNode;
}

export interface WhoAmIProps {
  riddleText: string;
  questionText?: string;
  options: Option[];
  correctAnswerId: string;
  onComplete?: (() => void) | { href: string };
  onIncorrectAttempt?: () => void;
  mascot?: React.ReactNode; // Optional custom mascot
  buttonTextWhenCorrect?: string; // Text to display on the button when answer is correct
  buttonTextWhenIncorrect?: string; // Text to display on the button when answer is incorrect
  isLastLesson?: boolean; // Whether this is the last lesson in the chapter
}

const DefaultMascot = () => (
  <svg viewBox="0 0 100 80" width="100" height="80"><path fill="#38bdf8" d="M10,80 C10,46.86 36.86,20 70,20 L75,20 C75,30 70,40 60,40 C50,40 45,30 45,20 L50,20 C83.14,20 110,46.86 110,80 L10,80 Z"></path><path fill="#7dd3fc" d="M50,20 C50,9 60,0 70,0 C80,0 90,9 90,20 L50,20 Z"></path><circle fill="#fff" cx="55" cy="55" r="12"></circle><circle fill="#475569" cx="52" cy="58" r="5"></circle><circle fill="#fff" cx="85" cy="55" r="12"></circle><circle fill="#475569" cx="88" cy="58" r="5"></circle></svg>
);

const WhoAmI: React.FC<WhoAmIProps> = ({
  riddleText,
  questionText = "WHO AM I?",
  options = [],
  correctAnswerId,
  onComplete,
  onIncorrectAttempt,
  mascot = <DefaultMascot />,
  buttonTextWhenCorrect = "Next",
  buttonTextWhenIncorrect = "Try Again",
  isLastLesson = false,
}) => {  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);  const [showWinScreen, setShowWinScreen] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [winScreenMessage, setWinScreenMessage] = useState("YOU DID IT!");
  const [buttonText, setButtonText] = useState(buttonTextWhenCorrect);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Preload audio - consider moving audio to public folder and using paths
 
  }, []);  const handleOptionClick = (optionId: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(optionId);

    if (optionId === correctAnswerId) {
      correctSoundRef.current?.play().catch(console.error);
      setIsCorrectAnswer(true);
      setLessonCompleted(true); // Mark lesson as completed
      setWinScreenMessage("YOU DID IT!");
      setButtonText(isLastLesson ? "Finish" : buttonTextWhenCorrect);
      setTimeout(() => {
        setShowCongratulations(true);
      }, 2000);
    } else {
      incorrectSoundRef.current?.play().catch(console.error);
      setIsCorrectAnswer(false);
      setWinScreenMessage("TRY AGAIN!");
      setButtonText(buttonTextWhenIncorrect);
      setTimeout(() => {
        setShowWinScreen(true);
        if (onIncorrectAttempt) onIncorrectAttempt();
      }, 1200);
    }
  };  const resetGame = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowWinScreen(false);
    setShowCongratulations(false);
    setIsCorrectAnswer(false);
    // We don't reset the lessonCompleted flag here to maintain the completion state
  };

  const handleReset = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowWinScreen(false);
    setShowCongratulations(false);
    setIsCorrectAnswer(false);
  };

  // Reset state when we detect a new lesson (based on key props changing)
  useEffect(() => {
    // Reset all component state when key props change (indicates new lesson)
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowWinScreen(false);
    setShowCongratulations(false);
    setIsCorrectAnswer(false);
    setLessonCompleted(false);
  }, [correctAnswerId, riddleText]);
  
  const getButtonClass = (optionId: string) => {
    if (!isAnswered) return styles.optionButton;
    if (optionId === correctAnswerId) return `${styles.optionButton} ${styles.correct}`;
    if (optionId === selectedAnswer && optionId !== correctAnswerId) return `${styles.optionButton} ${styles.incorrect}`;
    return styles.optionButton;
  };  return (
    <div className={styles.container}>
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : handleReset}
        onTryAgainClick={handleReset}
        showTryAgain={!isCorrectAnswer}
        buttonText={isLastLesson ? 'Finish Course' : 'Next Lesson'}
        tryAgainText="Play Again"
        message={isCorrectAnswer ? "Great job! You got it right!" : "Not quite! Give it another shot."}
        mascot={mascot}
      />
      <div className={`${styles.gameCard} ${showWinScreen ? styles.gameOver : ''}`}>
        <span className={styles.gearIcon}>⚙️</span>
        
        {showWinScreen && (
          <div className={`${styles.winScreen} ${styles.visible}`}>
            <div className={styles.winText}>{winScreenMessage}</div>
            <div className={styles.starContainer}>
              <div className={`${styles.star} ${styles.s1}`}>⭐</div>
              <div className={`${styles.star} ${styles.s2}`}>⭐</div>
              <div className={`${styles.star} ${styles.s3}`}>⭐</div>
              <div className={`${styles.star} ${styles.s4}`}>⭐</div>
              <div className={`${styles.star} ${styles.s5}`}>⭐</div>
            </div>
            <div className={styles.winMascot}>
              {mascot}
            </div>
            <button className={styles.playAgainBtn} onClick={resetGame}>
              {buttonText}
            </button>
          </div>
        )}

        <div className={styles.mascotContainer}>
          {mascot}
        </div>

        <div className={styles.promptContainer}>
          <p className={styles.promptText}>{riddleText}</p>
          <h2 className={styles.promptQuestion}>{questionText}</h2>
        </div>

        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <button
              key={option.id}
              className={getButtonClass(option.id)}
              onClick={() => handleOptionClick(option.id)}
              disabled={isAnswered}
            >
              <div className={styles.optionIcon}>{option.icon}</div>
              <span>{option.text}</span>
            </button>          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoAmI;


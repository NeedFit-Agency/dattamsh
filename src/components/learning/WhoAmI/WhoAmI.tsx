import React, { useState, useEffect, useRef } from 'react';
import styles from './WhoAmI.module.css';

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
  onComplete?: () => void;
  onIncorrectAttempt?: () => void;
  mascot?: React.ReactNode; // Optional custom mascot
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
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [winScreenMessage, setWinScreenMessage] = useState("YOU DID IT!");

  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Preload audio - consider moving audio to public folder and using paths
    if (typeof Audio !== "undefined") {
        const correctAudio = new Audio("data:audio/mpeg;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVhvT18IAgEBDQRLRw0QDhVOTE9PEA4ADw8OEQ4OFA8PDhQODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4QDg8ODhEOEA4PDw4RDg4_TTE=");
        correctSoundRef.current = correctAudio;

        const incorrectAudio = new Audio("data:audio/mpeg;base64,UklGRkFvT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV1vT18BAwZAB1d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d/f3d/f3Z/f3d/f3Z/f3d/f3Z/f3d");
        incorrectSoundRef.current = incorrectAudio;
    }
  }, []);
  const handleOptionClick = (optionId: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(optionId);

    if (optionId === correctAnswerId) {
      correctSoundRef.current?.play().catch(console.error);
      setWinScreenMessage("YOU DID IT!");
      setTimeout(() => {
        setShowWinScreen(true);
        if (onComplete) onComplete();
      }, 800);
    } else {
      incorrectSoundRef.current?.play().catch(console.error);
      setWinScreenMessage("TRY AGAIN!");
      setTimeout(() => {
        setShowWinScreen(true);
        if (onIncorrectAttempt) onIncorrectAttempt();
      }, 1200);
    }
  };

  const resetGame = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowWinScreen(false);
  };

  const getButtonClass = (optionId: string) => {
    if (!isAnswered) return styles.optionButton;
    if (optionId === correctAnswerId) return `${styles.optionButton} ${styles.correct}`;
    if (optionId === selectedAnswer && optionId !== correctAnswerId) return `${styles.optionButton} ${styles.incorrect}`;
    return styles.optionButton;
  };
  return (
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
          <button className={styles.playAgainBtn} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}      <div className={styles.promptContainer}>
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
            <div>{option.icon}</div>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhoAmI;


import React, { useState, useEffect, useRef } from 'react';
import styles from './WhoAmI.module.css';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import TTS from '../../shared/TTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string;
}

export interface WhoAmIProps {
  riddleText: string;
  questionText?: string;
  options: Option[];
  onComplete?: (() => void) | { href: string };
  onIncorrectAttempt?: () => void;
  mascot?: React.ReactNode; // Optional custom mascot
  buttonTextWhenCorrect?: string; // Text to display on the button when answer is correct
  buttonTextWhenIncorrect?: string; // Text to display on the button when answer is incorrect
  isLastLesson?: boolean; // Whether this is the last lesson in the chapter
  audioSrc?: string; // Audio file path for .m4a files
  speakText?: string; // Fallback text for TTS
  standard?: string; // The current standard/grade level
}

const DefaultMascot = () => (
  <svg viewBox="0 0 100 80" width="100" height="80"><path fill="#38bdf8" d="M10,80 C10,46.86 36.86,20 70,20 L75,20 C75,30 70,40 60,40 C50,40 45,30 45,20 L50,20 C83.14,20 110,46.86 110,80 L10,80 Z"></path><path fill="#7dd3fc" d="M50,20 C50,9 60,0 70,0 C80,0 90,9 90,20 L50,20 Z"></path><circle fill="#fff" cx="55" cy="55" r="12"></circle><circle fill="#475569" cx="52" cy="58" r="5"></circle><circle fill="#fff" cx="85" cy="55" r="12"></circle><circle fill="#475569" cx="88" cy="58" r="5"></circle></svg>
);

const WhoAmI: React.FC<WhoAmIProps> = ({
  riddleText,
  questionText = "WHO AM I?",
  options = [],
  onComplete,
  onIncorrectAttempt,
  mascot = <DefaultMascot />,
  buttonTextWhenCorrect = "Next",
  buttonTextWhenIncorrect = "Try Again",
  isLastLesson = false,
  audioSrc,
  speakText,
  standard
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTitleAudioPlaying, setIsTitleAudioPlaying] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [winScreenMessage, setWinScreenMessage] = useState("YOU DID IT!");
  const [buttonText, setButtonText] = useState(buttonTextWhenCorrect);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement>(null);
  const questionAudioRef = useRef<HTMLAudioElement>(null);
  const titleAudioRef = useRef<HTMLAudioElement>(null);

  // Find the correct answer ID
  const correctAnswerId = options.find(option => option.isCorrect)?.id || '';

  // Check if audio should be shown (for grades 1, 2, 3, 4)
  const shouldShowAudio = standard && ['1', '2', '3', '4'].includes(standard);

  // Monitor audio state changes
  useEffect(() => {
    const audio = questionAudioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('Audio ended');
      setIsAudioPlaying(false);
    };

    const handlePause = () => {
      console.log('Audio paused');
      setIsAudioPlaying(false);
    };

    const handlePlay = () => {
      console.log('Audio started playing');
      setIsAudioPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [audioSrc]);

  // Monitor title audio state changes
  useEffect(() => {
    const audio = titleAudioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('Title audio ended');
      setIsTitleAudioPlaying(false);
    };

    const handlePause = () => {
      console.log('Title audio paused');
      setIsTitleAudioPlaying(false);
    };

    const handlePlay = () => {
      console.log('Title audio started playing');
      setIsTitleAudioPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const playQuestionAudio = () => {
    if (questionAudioRef.current) {
      if (isAudioPlaying) {
        questionAudioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        questionAudioRef.current.play().catch((error) => {
          console.error('Audio play failed:', error);
          // Fallback to TTS if audio file fails
          playTTSFallback();
        });
        setIsAudioPlaying(true);
      }
    } else {
      // Fallback to TTS if no audio file
      playTTSFallback();
    }
  };

  const playTitleAudio = () => {
    if (titleAudioRef.current) {
      if (isTitleAudioPlaying) {
        titleAudioRef.current.pause();
        setIsTitleAudioPlaying(false);
      } else {
        titleAudioRef.current.play().catch((error) => {
          console.error('Title audio play failed:', error);
        });
        setIsTitleAudioPlaying(true);
      }
    }
  };

  const playTTSFallback = () => {
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = speakText || `${riddleText} ${questionText}`;

    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.5;
        utterance.pitch = 1.0;
        
        utterance.onstart = () => setIsAudioPlaying(true);
        utterance.onend = () => setIsAudioPlaying(false);
        utterance.onerror = (e) => {
          console.error("SpeechSynthesis Error:", e);
          setIsAudioPlaying(false);
        };
        
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("SpeechSynthesis failed:", e);
        setIsAudioPlaying(false);
      }
    } else {
      setIsAudioPlaying(false);
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(optionId);

    if (optionId === correctAnswerId) {
      correctSoundRef.current?.play().catch(console.error);
      setIsCorrectAnswer(true);
      setLessonCompleted(true); // Mark lesson as completed
      setWinScreenMessage("YOU DID IT!");
      setButtonText(isLastLesson ? "Finish" : buttonTextWhenCorrect);
      
      if (isLastLesson) {
        // Show congratulations screen only for the last question
        setTimeout(() => {
          setShowCongratulations(true);
        }, 2000);
      } else {
        // For middle questions, proceed to next question directly after a short delay
        setTimeout(() => {
          if (onComplete && typeof onComplete === 'function') {
            onComplete();
          } else if (onComplete && typeof onComplete === 'object' && onComplete.href) {
            window.location.href = onComplete.href;
          }
        }, 1500);
      }
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
  };

  const resetGame = () => {
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
  };

  return (
    <div className={styles.container}>
      {/* Audio element for .m4a files */}
      {shouldShowAudio && audioSrc && (
        <audio 
          ref={questionAudioRef} 
          src={audioSrc}
          onError={() => {
            console.error('Audio file failed to load');
            setIsAudioPlaying(false);
          }}
        />
      )}
      
      {/* Audio element for title */}
      {shouldShowAudio && (
        <audio 
          ref={titleAudioRef} 
          src="/voice/4.1.m4a"
          onError={() => {
            console.error('Title audio file failed to load');
            setIsTitleAudioPlaying(false);
          }}
        />
      )}
      
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : handleReset}
        onTryAgainClick={handleReset}
        showTryAgain={!isCorrectAnswer}
        buttonText={isLastLesson ? 'Next Course' : 'Next Chapter'}
        tryAgainText="Play Again"
        message={isCorrectAnswer ? "Great job! You got it right!" : "Not quite! Give it another shot."}
        mascot={mascot}
      />
      <div className={`${styles.gameCard} ${showWinScreen ? styles.gameOver : ''}`}>
        <span className={styles.gearIcon}>⚙️</span>

        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Choose the correct option</h3>
          {shouldShowAudio && (
            <button
              className={`${styles.titleAudioButton} ${isTitleAudioPlaying ? styles.titleAudioButtonPlaying : ''}`}
              onClick={playTitleAudio}
              aria-label={isTitleAudioPlaying ? "Stop reading" : "Listen to the heading"}
              title={isTitleAudioPlaying ? "Stop reading" : "Listen to the heading"}
            >
              <FontAwesomeIcon icon={faHeadphones} />
              <span>{isTitleAudioPlaying ? "Listening..." : "Listen"}</span>
            </button>
          )}
        </div>
        <img src="/mascot.png" alt="Mascot" className={styles.mascotImage} />

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
              <img src="/mascot.png" alt="Mascot" className={styles.mascotImage} />
            </div>
            <button className={styles.playAgainBtn} onClick={resetGame}>
              {buttonText}
            </button>
          </div>
        )}

        <div className={styles.promptWrapper}>
          <div className={styles.promptContainer}>
            <p className={styles.promptText}>{riddleText}</p>
            <div className={styles.questionContainer}>
              <div className={styles.questionRow}>
              </div>
            </div>
          </div>
          {shouldShowAudio && (
            <button
              className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
              onClick={playQuestionAudio}
              aria-label={isAudioPlaying ? "Stop reading" : "Listen to the question"}
              title={isAudioPlaying ? "Stop reading" : "Listen to the question"}
            >
              <FontAwesomeIcon icon={faHeadphones} />
              <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
            </button>
          )}
        </div>
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <button
              key={option.id}
              className={getButtonClass(option.id)}
              onClick={() => handleOptionClick(option.id)}
              disabled={isAnswered}
            >
              {option.imageUrl && (
                <div className={styles.optionIcon}>
                  <img src={option.imageUrl} alt={option.text} className={styles.optionImage} />
                </div>
              )}
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoAmI;


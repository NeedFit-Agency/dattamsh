'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faTimes, faFire, faHeadphones, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { QuizProps } from './types';
import styles from './quiz.module.css';

const Quiz: React.FC<QuizProps> = ({
  title,
  questions,
  progress = 0,
  audioContent,
  onBack,
  onComplete
}) => {
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isGraded, setIsGraded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Calculate percentage score
  const scorePercentage = questions.length > 0 
    ? Math.round((correctAnswers / questions.length) * 100) 
    : 0;

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = audioContent || currentQuestion?.prompt || title;

    // Use speech synthesis
    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
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

  const handleAnswerSelect = (index: number) => {
    if (isGraded) return;
    setSelectedAnswerIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === null) return;
    const isAnswerCorrect = selectedAnswerIndex === currentQuestion?.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setIsGraded(true);
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      if ((streak + 1) % 3 === 0) {
        setShowStars(true);
        setTimeout(() => setShowStars(false), 2000);
      }
    } else {
      setStreak(0);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerIndex(null);
        setIsGraded(false);
      }, 300);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (onBack) {
      onBack();
    }
  };

  if (!currentQuestion && !completed) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div 
        className={styles.completionContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.completionTitle}>Congratulations!</h2>
        <div className={styles.trophyContainer}>
          <div className={styles.trophy}>
            <FontAwesomeIcon icon={faStar} size="3x" className={styles.trophyIcon} />
          </div>
        </div>
        <p className={styles.completionText}>You've completed this quiz.</p>
        <div className={styles.scorePercentage}>
          <span className={styles.scoreValue}>{scorePercentage}%</span>
          <span className={styles.scoreLabel}>Accuracy</span>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{correctAnswers}/{questions.length}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
        </div>
        <motion.button 
          className={styles.continueButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
        >
          CONTINUE
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Progress indicator */}
      <div className={styles.navigationHeader}>
        <a className={styles.backArrow} onClick={handlePrevious}>←</a>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <motion.h1 
        className={styles.contentTitle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      <div className={styles.quizContainer}>
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>

        <div className={styles.questionArea}>
          <div className={styles.prompt}>
            {currentQuestion?.prompt}
            <button 
              className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`}
              onClick={playAudio}
            >
              <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
            </button>
          </div>

          {currentQuestion?.imageUrl && (
            <div className={styles.questionImage}>
              <img src={currentQuestion.imageUrl} alt="Question illustration" />
            </div>
          )}
        </div>

        <div className={styles.answersArea}>
          {currentQuestion?.options.map((option, index) => (
            <motion.button 
              key={index}
              className={`${styles.option} ${
                selectedAnswerIndex === index ? styles.selected : ''
              } ${
                isGraded && index === currentQuestion.correctAnswer ? styles.correct : ''
              } ${
                isGraded && selectedAnswerIndex === index && index !== currentQuestion.correctAnswer ? styles.incorrect : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={isGraded}
              whileHover={!isGraded ? { scale: 1.03 } : {}}
              whileTap={!isGraded ? { scale: 0.97 } : {}}
            >
              <div className={styles.optionNumber}>{index + 1}</div>
              <div className={styles.optionText}>{option}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isGraded ? (
            <motion.div 
              className={`${styles.feedbackFooter} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className={styles.feedbackIcon}>
                <FontAwesomeIcon icon={isCorrect ? faCheck : faTimes} />
              </div>
              <div className={styles.feedbackText}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
                {currentQuestion?.explanation && (
                  <div className={styles.explanation}>{currentQuestion.explanation}</div>
                )}
              </div>
              <button 
                className={styles.continueBtn}
                onClick={handleContinue}
              >
                Continue
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className={styles.checkAnswerContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                className={`${styles.checkButton} ${selectedAnswerIndex === null ? styles.disabled : ''}`}
                onClick={handleCheckAnswer}
                disabled={selectedAnswerIndex === null}
              >
                Check Answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak stars animation */}
        <AnimatePresence>
          {showStars && (
            <motion.div 
              className={styles.streakStars}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <FontAwesomeIcon icon={faFire} className={styles.streakIcon} />
              <span>{streak} streak!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className={styles.footerNav}>
        <button 
          className={`${styles.navButton} ${styles.navButtonPrevious}`} 
          onClick={handlePrevious}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        {!isGraded && (
          <button 
            className={`${styles.navButton} ${styles.navButtonContinue} ${selectedAnswerIndex === null ? styles.disabled : ''}`}
            onClick={handleCheckAnswer}
            disabled={selectedAnswerIndex === null}
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faTimes, faVolumeUp, faFire } from '@fortawesome/free-solid-svg-icons';
import styles from './Quiz.module.css';
import AnswerOption from '../AnswerOption/AnswerOption';
import CharacterCard from '../CharacterCard/CharacterCard';
import LegendaryTrophy from '../LegendaryTrophy/LegendaryTrophy';

interface QuizProps {
  lessonId?: string;
  onComplete?: () => void;
}

interface Question {
  id: number;
  character?: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Sample questions - in a real app, these would come from an API
const sampleQuestions: Question[] = [
  {
    id: 1,
    character: 'あ',
    prompt: 'What sound does this character make?',
    options: ['a', 'i', 'u', 'e'],
    correctAnswer: 0,
    explanation: 'あ makes the "a" sound as in "father".'
  },
  {
    id: 2,
    character: 'い',
    prompt: 'What sound does this character make?',
    options: ['ka', 'i', 'ta', 'sa'],
    correctAnswer: 1,
    explanation: 'い makes the "i" sound as in "meet".'
  },
  {
    id: 3,
    prompt: 'Which character makes the "u" sound?',
    options: ['あ', 'い', 'う', 'え'],
    correctAnswer: 2,
    explanation: 'う makes the "u" sound as in "cool".'
  },
];

export function Quiz({ lessonId, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isGraded, setIsGraded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [streak, setStreak] = useState(0);
  const [showStars, setShowStars] = useState(false);

  // Load questions based on lessonId
  useEffect(() => {
    // In a real app, fetch questions from API based on lessonId
    // For now, use sample questions with a delay to simulate loading
    setTimeout(() => {
      setQuestions(sampleQuestions);
    }, 500);
  }, [lessonId]);

  const currentQuestion = questions[currentQuestionIndex];

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
      // Play success sound
      const audio = new Audio('/sounds/correct.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Increase streak
      setStreak(prev => prev + 1);
      
      // Show stars animation if streak is multiple of 3
      if ((streak + 1) % 3 === 0) {
        setShowStars(true);
        setTimeout(() => setShowStars(false), 2000);
      }
    } else {
      // Play error sound
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Reset streak
      setStreak(0);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question with a slight delay for better UX
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerIndex(null);
        setIsGraded(false);
      }, 300);
    } else {
      // Quiz completed
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleSpeaker = () => {
    // In a real app, this would play audio for the character
    console.log("Playing audio for character:", currentQuestion?.character);
    
    // Simulate audio playing with visual feedback
    const speakerElement = document.getElementById('speaker-icon');
    if (speakerElement) {
      speakerElement.classList.add(styles.playing);
      setTimeout(() => {
        speakerElement.classList.remove(styles.playing);
      }, 1000);
    }
  };

  if (!currentQuestion && !completed) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your lesson...</p>
      </div>
    );
  }

  // Show completion screen
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
          <LegendaryTrophy />
          <motion.div 
            className={styles.confetti}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </div>
        <p className={styles.completionText}>You've completed this lesson.</p>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{questions.length}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>+10</span>
            <span className={styles.statLabel}>XP Earned</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>+5</span>
            <span className={styles.statLabel}>Gems</span>
          </div>
        </div>
        <motion.button 
          className={styles.continueButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/learn'}
        >
          CONTINUE
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className={styles.progressBarOuter}>
          <div 
            className={styles.progressBarInner} 
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={styles.questionArea}
        >
          {currentQuestion.character && (
            <CharacterCard 
              character={currentQuestion.character}
              onSpeakerClick={handleSpeaker}
            />
          )}
          <h2 className={styles.prompt}>{currentQuestion.prompt}</h2>
        </motion.div>
      </AnimatePresence>
      
      <div className={styles.answersArea}>
        {currentQuestion.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AnswerOption
              number={index + 1}
              text={option}
              isSelected={selectedAnswerIndex === index}
              isCorrect={isGraded && index === currentQuestion.correctAnswer}
              isIncorrect={isGraded && selectedAnswerIndex === index && index !== currentQuestion.correctAnswer}
              onClick={() => handleAnswerSelect(index)}
              disabled={isGraded}
            />
          </motion.div>
        ))}
      </div>
      
      {!isGraded ? (
        <div className={styles.checkAnswerContainer}>
          <motion.button
            className={`${styles.checkButton} ${selectedAnswerIndex === null ? styles.disabled : ''}`}
            whileHover={selectedAnswerIndex !== null ? { scale: 1.05 } : {}}
            whileTap={selectedAnswerIndex !== null ? { scale: 0.95 } : {}}
            onClick={handleCheckAnswer}
            disabled={selectedAnswerIndex === null}
          >
            CHECK
          </motion.button>
        </div>
      ) : (
        <motion.div 
          className={`${styles.feedbackFooter} ${isCorrect ? styles.correct : styles.incorrect}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.feedbackContent}>
            <div className={styles.feedbackIcon}>
              {isCorrect ? 
                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} /> : 
                <FontAwesomeIcon icon={faTimes} className={styles.timesIcon} />
              }
            </div>
            <div className={styles.feedbackText}>
              <h3>{isCorrect ? "Great job!" : "Not quite."}</h3>
              <p>
                {isCorrect 
                  ? "That's correct!" 
                  : <>
                      The correct answer is <span className={styles.correctAnswer}>
                        {currentQuestion.options[currentQuestion.correctAnswer]}
                      </span>
                      {currentQuestion.explanation && 
                        <span className={styles.explanation}>{currentQuestion.explanation}</span>
                      }
                    </>
                }
              </p>
            </div>
          </div>
          <motion.button 
            className={styles.continueButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
          >
            {currentQuestionIndex < questions.length - 1 ? "CONTINUE" : "FINISH"}
          </motion.button>
        </motion.div>
      )}

      {/* Streak indicator */}
      {streak > 0 && (
        <div className={styles.streakIndicator}>
          <FontAwesomeIcon icon={faFire} /> Streak: {streak}
        </div>
      )}
      
      {/* Stars animation for streaks */}
      {showStars && (
        <div className={styles.starsContainer}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.star}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: Math.random() * 400 - 200,
                y: Math.random() * -300,
              }}
              transition={{ 
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              <FontAwesomeIcon icon={faStar} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
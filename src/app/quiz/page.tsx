'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faTimes, faFire, faHeadphones, faX } from '@fortawesome/free-solid-svg-icons';
// import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider'; // Keep commented out or remove if fully migrated
import { AnalyticsService } from '@/utils/analyticsService'; 
import Link from 'next/link';
import AnswerOption from '@/components/quiz/AnswerOption/AnswerOption';
import LegendaryTrophy from '@/components/quiz/LegendaryTrophy/LegendaryTrophy';
import { quizzes, type Question } from '@/data/quizeData';
import styles from './QuizPage.module.css';
import Image from 'next/image';

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const searchParams = useSearchParams();
  const standardId = searchParams.get('standard') || '1';
  const lessonId = searchParams.get('chapter') || '1'; // chapterId is referred to as lessonId here
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  
  // const analytics = useAnalyticsContext(); // Ensure this is commented out or removed
  
  // Timing tracking
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isGraded, setIsGraded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [streak, setStreak] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isListening, setIsListening] = useState(false);

  // Get the chapter title from quizzes data
  const chapterIndex = Number(lessonId) - 1;
  const chapter = quizzes[standardId]?.[chapterIndex];
  const chapterTitle = chapter?.title || `Chapter ${lessonId}`;
  // Load questions based on lessonId
  useEffect(() => {
    setTimeout(() => {
      const chapters = quizzes[standardId];
      if (chapters && chapters.length > 0) {
        setQuestions(chapters[chapterIndex].questions);
        
        AnalyticsService.logGameplayEvent(
          `quiz_standard_${standardId}_chapter_${lessonId}`,
          'start',
          { 
            completion_status: 'started',
            total_questions: chapters[chapterIndex].questions.length
          }
        );
        
        setQuizStartTime(Date.now());
        setQuestionStartTime(Date.now());
      } else {
        setQuestions([]);
      }
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [standardId, lessonId, chapterIndex]); // Removed 'analytics' from dependency array

  // Calculate percentage score
  const scorePercentage = questions.length > 0 
    ? Math.round((correctAnswers / questions.length) * 100) 
    : 0;

  const currentQuestion = questions[currentQuestionIndex];

  // Listen to question function
  const handleListen = () => {
    if (isListening || !currentQuestion) return;
    setIsListening(true);
    const speech = new window.SpeechSynthesisUtterance();
    speech.text = currentQuestion.prompt;
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.onend = () => setIsListening(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

    // Log listen interaction
    AnalyticsService.logGameplayEvent(
      `quiz_standard_${standardId}_chapter_${lessonId}_q${currentQuestionIndex}`,
      'interaction',
      { 
        interaction_type: 'listen_to_question',
        question_prompt: currentQuestion.prompt.substring(0, 100) // Log a snippet
      }
    );
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleAnswerSelect = (index: number) => {
    if (isGraded) return;
    setSelectedAnswerIndex(index);
  };
  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === null) return;
    
    // Calculate time spent on this question
    const timeSpentMs = Date.now() - questionStartTime;
    
    const isAnswerCorrect = selectedAnswerIndex === currentQuestion?.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setIsGraded(true);
    
    // Track question answer
    // analytics.trackQuestionAnswer( // OLD way
    //   standardId,
    //   lessonId, 
    //   currentQuestionIndex, 
    //   isAnswerCorrect, 
    //   timeSpentMs
    // );
    AnalyticsService.logGameplayEvent(
      `quiz_standard_${standardId}_chapter_${lessonId}_q${currentQuestionIndex}`,
      'answer',
      {
        question_prompt: currentQuestion?.prompt.substring(0,100),
        selected_answer_index: selectedAnswerIndex,
        selected_answer_text: currentQuestion?.options[selectedAnswerIndex]?.substring(0,100),
        correct_answer_index: currentQuestion?.correctAnswer,
        correct_answer_text: currentQuestion?.options[currentQuestion?.correctAnswer]?.substring(0,100),
        is_correct: isAnswerCorrect,
        time_spent_ms: timeSpentMs,
        streak_before_answer: streak
      }
    );
    
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
      const audio = new Audio('/sounds/correct.mp3');
      audio.play().catch(() => {});
      setStreak(prev => prev + 1);
      if ((streak + 1) % 3 === 0) {
        setShowStars(true);
        setTimeout(() => setShowStars(false), 2000);
      }
    } else {
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.play().catch(() => {});
      setStreak(0);
    }
  };
  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerIndex(null);
        setIsGraded(false);
        
        // Reset question start time for the next question
        setQuestionStartTime(Date.now());
      }, 300);
    } else {
      setCompleted(true);
      
      // Calculate total time spent on the quiz
      const totalTimeSpentMs = Date.now() - quizStartTime;
      
      // Track quiz completion
      // analytics.trackQuizCompletion( // OLD way
      //   standardId,
      //   lessonId,
      //   correctAnswers,
      //   questions.length,
      //   totalTimeSpentMs
      // );
      AnalyticsService.logGameplayEvent(
        `quiz_standard_${standardId}_chapter_${lessonId}`,
        'complete',
        {
          completion_status: 'completed',
          score: correctAnswers,
          total_questions: questions.length,
          score_percentage: scorePercentage,
          time_spent_ms: totalTimeSpentMs,
          final_streak: streak
        }
      );
      
      // Mark chapter as completed in localStorage
      if (typeof window !== 'undefined') {
        const completedChapters = JSON.parse(localStorage.getItem('completedChapters') || '{}');
        completedChapters[`${standardId}-${lessonId}`] = true;
        localStorage.setItem('completedChapters', JSON.stringify(completedChapters));
      }
    }
  };

  const handleQuitConfirmed = () => {
    const totalTimeSpentMs = Date.now() - quizStartTime;
    AnalyticsService.logGameplayEvent(
      `quiz_standard_${standardId}_chapter_${lessonId}`,
      'quit',
      {
        completion_status: 'quit',
        last_question_index: currentQuestionIndex,
        correct_answers_so_far: correctAnswers,
        total_questions: questions.length,
        time_spent_ms: totalTimeSpentMs,
        current_streak: streak
      }
    );
    // Navigate away, e.g., back to chapter list or home
    // router.push(`/standard/${standardId}/chapter/${lessonId}`); // Or wherever quit should lead
  };

  if (!currentQuestion && !completed) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your lesson...</p>
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
          <LegendaryTrophy />
          <motion.div 
            className={styles.confetti}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </div>
        <p className={styles.completionText}>You&apos;ve completed this lesson.</p>
        <div className={styles.scorePercentage}>
          <span className={styles.scoreValue}>{scorePercentage}%</span>
          <span className={styles.scoreLabel}>Accuracy</span>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{correctAnswers}/{questions.length}</span>
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
          onClick={() => window.location.href = `/standard/${lessonId}`}
        >
          CONTINUE
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainAreaWrapper}>
        <div className={`${styles.header} ${styles.highFidelityHeader}`}>
          <button 
            className={styles.quitButton} 
            onClick={() => setShowQuitConfirm(true)}
            aria-label="Quit lesson"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className={styles.highFidelityTitle}>
            {chapterTitle}
          </div>
        </div>
        <div className={styles.contentArea}>
          <div className={styles.quizContainer}>
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
                {currentQuestion.imageUrl && (
                  <div className={styles.questionImage}>
                    <Image 
                      src={currentQuestion.imageUrl} 
                      alt="Question visual" 
                      className={styles.machineImage}
                      width={200}
                      height={200}
                    />
                  </div>
                )}
                <div className={styles.questionWithAudio}>
                  <h2 className={styles.prompt}>{currentQuestion.prompt}</h2>
                  <button 
                    onClick={handleListen}
                    className={`${styles.listenButton} ${isListening ? styles.listening : ''}`}
                    disabled={isListening}
                    aria-label="Listen to question"
                  >
                    <FontAwesomeIcon icon={faHeadphones} />
                    <span>{isListening ? "Listening..." : "Listen"}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className={styles.answersArea}>
              {currentQuestion.options.map((option: string, index: number) => (
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
                        ? "That&apos;s correct!" 
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
            {streak > 0 && (
              <div className={styles.streakIndicator}>
                <FontAwesomeIcon icon={faFire} /> Streak: {streak}
              </div>
            )}
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
        </div>
        {showQuitConfirm && (
          <div className={styles.quitConfirmModal}>
            <div className={styles.modalContent}>
              <h3>Are you sure you want to quit?</h3>
              <p>Your progress in this lesson will be lost.</p>
              <div className={styles.modalButtons}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setShowQuitConfirm(false)}
                >
                  CONTINUE LESSON
                </button>
                <Link 
                  href={`/standard/${standardId}/chapter/${lessonId}`}
                  className={styles.quitConfirmButton}
                  onClick={handleQuitConfirmed} 
                >
                  QUIT
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Ensure QuizPageContent is correctly typed if it wasn't before, though it seems to be a function component already.
// The error might have been a side effect of other syntax issues.
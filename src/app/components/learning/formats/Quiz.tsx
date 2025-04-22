'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheckCircle, faTimesCircle, faRedo } from '@fortawesome/free-solid-svg-icons';
import { QuizProps } from './types';
import styles from '../../../learning/learning.module.css';

export const Quiz: React.FC<QuizProps> = ({
  title,
  question,
  options,
  explanation,
  imageUrl,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || question;

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

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const checkAnswer = () => {
    if (!selectedOption) return;
    
    const selected = options.find(opt => opt.id === selectedOption);
    const correct = selected?.isCorrect || false;
    
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  // Find the correct option for explanation purposes
  const correctOption = options.find(opt => opt.isCorrect);

  return (
    <div className={styles.quizContainer}>
      {/* Title Section */}
      {title && <h3 className={styles.quizTitle}>{title}</h3>}
      
      {/* Question Section */}
      <div className={styles.quizQuestionSection}>
        <div className={styles.quizQuestion}>{question}</div>
        
        {/* Quiz Image (if provided) */}
        {imageUrl && (
          <div className={styles.quizImageContainer}>
            <img src={imageUrl} alt="Quiz" className={styles.quizImage} />
          </div>
        )}
        
        {/* Audio Button */}
        {(audioSrc || speakText) && (
          <button 
            className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
            onClick={playAudio}
          >
            <FontAwesomeIcon icon={faHeadphones} />
            {isAudioPlaying ? "Listening..." : "Listen"}
          </button>
        )}
      </div>
      
      {/* Options */}
      <div className={styles.quizOptionsContainer}>
        <AnimatePresence>
          {options.map(option => (
            <motion.div
              key={option.id}
              className={`${styles.quizOption} ${
                selectedOption === option.id ? styles.selectedOption : ''
              } ${
                isAnswered && option.id === selectedOption ? 
                  (option.isCorrect ? styles.correctOption : styles.incorrectOption) : ''
              } ${
                isAnswered && option.isCorrect && option.id !== selectedOption ? 
                  styles.revealCorrect : ''
              }`}
              onClick={() => handleOptionSelect(option.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.optionContent}>
                <div className={styles.optionText}>{option.text}</div>
                {isAnswered && (
                  <div className={styles.optionIcon}>
                    {option.isCorrect ? (
                      <FontAwesomeIcon icon={faCheckCircle} className={styles.correctIcon} />
                    ) : (
                      option.id === selectedOption && (
                        <FontAwesomeIcon icon={faTimesCircle} className={styles.incorrectIcon} />
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Explanation (shows after answering) */}
      {isAnswered && (
        <motion.div 
          className={`${styles.quizExplanation} ${
            isCorrect ? styles.correctExplanation : styles.incorrectExplanation
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4>{isCorrect ? 'Great job!' : 'Not quite right.'}</h4>
          {explanation ? (
            <p>{explanation}</p>
          ) : (
            <p>
              {isCorrect 
                ? 'You selected the correct answer!' 
                : `The correct answer is: ${correctOption?.text}`
              }
            </p>
          )}
        </motion.div>
      )}
      
      {/* Action Buttons */}
      <div className={styles.quizActionButtons}>
        {!isAnswered ? (
          <button 
            className={styles.checkButton} 
            onClick={checkAnswer}
            disabled={!selectedOption}
          >
            Check Answer
          </button>
        ) : (
          <button className={styles.resetButton} onClick={resetQuiz}>
            <FontAwesomeIcon icon={faRedo} /> Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
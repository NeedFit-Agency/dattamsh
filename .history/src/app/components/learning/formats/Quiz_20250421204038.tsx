'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheck, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
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
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak) {
      textToSpeak = question;
    }

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
    if (!isChecked) {
      setSelectedOptionId(optionId);
    }
  };

  const checkAnswer = () => {
    if (!selectedOptionId) return;
    
    const selectedOption = options.find(option => option.id === selectedOptionId);
    if (selectedOption) {
      setIsCorrect(selectedOption.isCorrect);
      setIsChecked(true);
      setShowExplanation(true);
    }
  };

  const resetQuiz = () => {
    setSelectedOptionId(null);
    setIsChecked(false);
    setShowExplanation(false);
    setIsCorrect(false);
  };

  const getOptionClassName = (optionId: string) => {
    let className = styles.quizOption;
    
    if (selectedOptionId === optionId) {
      className += ` ${styles.selectedOption}`;
      
      if (isChecked) {
        const option = options.find(o => o.id === optionId);
        if (option?.isCorrect) {
          className += ` ${styles.correctOption}`;
        } else {
          className += ` ${styles.incorrectOption}`;
        }
      }
    } else if (isChecked) {
      const option = options.find(o => o.id === optionId);
      if (option?.isCorrect) {
        className += ` ${styles.revealCorrect}`;
      }
    }
    
    return className;
  };

  return (
    <div className={styles.quizContainer}>
      {/* Question Section */}
      <div className={styles.quizQuestionSection}>
        <h3 className={styles.quizQuestion}>{question}</h3>
        
        {(audioSrc || speakText) && (
          <button 
            className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
            onClick={playAudio} 
            title={isAudioPlaying ? "Stop" : "Listen"}
          >
            <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
          </button>
        )}
        
        {imageUrl && (
          <div className={styles.quizImageContainer}>
            <img 
              src={imageUrl} 
              alt="Quiz question visual aid" 
              className={styles.quizImage} 
            />
          </div>
        )}
      </div>

      {/* Options Section */}
      <div className={styles.quizOptionsContainer}>
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={getOptionClassName(option.id)}
            onClick={() => handleOptionSelect(option.id)}
            whileHover={!isChecked ? { scale: 1.02 } : {}}
            whileTap={!isChecked ? { scale: 0.98 } : {}}
          >
            <div className={styles.optionContent}>
              <div className={styles.optionText}>{option.text}</div>
              {isChecked && option.id === selectedOptionId && (
                <div className={styles.optionIcon}>
                  <FontAwesomeIcon 
                    icon={option.isCorrect ? faCheck : faTimes} 
                    className={option.isCorrect ? styles.correctIcon : styles.incorrectIcon} 
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explanation Section (shown after answer is checked) */}
      {showExplanation && (
        <motion.div 
          className={`${styles.quizExplanation} ${isCorrect ? styles.correctExplanation : styles.incorrectExplanation}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4>{isCorrect ? 'Correct!' : 'Not quite.'}</h4>
          <p>
            {explanation || (
              isCorrect 
                ? 'Well done! You selected the right answer.' 
                : 'That\'s not correct. Try to review the material and try again.'
            )}
          </p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className={styles.quizActionButtons}>
        {!isChecked ? (
          <button 
            className={styles.checkButton} 
            onClick={checkAnswer}
            disabled={!selectedOptionId}
          >
            Check Answer <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <button 
            className={styles.resetButton} 
            onClick={resetQuiz}
          >
            Try Again <FontAwesomeIcon icon={faRedo} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
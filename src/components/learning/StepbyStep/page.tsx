'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, StepByStepProps } from './types';
import styles from './stepbystep.module.css';

const StepByStep: React.FC<StepByStepProps> = ({
  title,
  steps,
  initialStepIndex = 0,
  progress = 40,
  hearts = 3,
  gems = 234,
  shields = 1,
  onComplete,
  onStepChange,
  onBack
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    // If the step changes externally, update our internal state
    if (initialStepIndex !== currentStepIndex) {
      setCurrentStepIndex(initialStepIndex);
    }
  }, [initialStepIndex]);

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index);
    if (onStepChange) {
      onStepChange(index);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      if (onStepChange) {
        onStepChange(newIndex);
      }
    } else if (onBack) {
      onBack();
    }
  };

  const handleContinue = () => {
    if (!isLastStep) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      if (onStepChange) {
        onStepChange(newIndex);
      }
    } else if (onComplete) {
      onComplete();
    }
  };

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = currentStep.audioContent || currentStep.instruction;

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

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.appHeader}>
        <div className={styles.appName}>&lt;/&gt; Learning Steps</div>
        <div className={styles.userStats}>
          <div className={styles.statItem}>
            <FontAwesomeIcon icon={faShield} className={styles.iconPlaceholder} /> {shields}
          </div>
          <div className={styles.statItem}>
            <FontAwesomeIcon icon={faGem} className={styles.iconPlaceholder} /> {gems}
          </div>
          <div className={`${styles.statItem} ${styles.hearts}`}>
            <FontAwesomeIcon icon={faHeart} /> {hearts}
          </div>
          <FontAwesomeIcon icon={faCog} className={styles.settingsIcon} />
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.navigationHeader}>
          <a className={styles.backArrow} onClick={handlePrevious}>←</a>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h1 className={styles.contentTitle}>{title}</h1>

        <div className={styles.stepLayout}>
          <aside className={styles.stepList}>
            <h3>Steps:</h3>
            <ul className={styles.stepListUl}>
              {steps.map((step, index) => (
                <li key={step.id} className={styles.stepListLi}>
                  <a 
                    className={`${styles.stepListItem} ${index === currentStepIndex ? styles.stepListItemActive : ''}`}
                    onClick={() => handleStepSelect(index)}
                  >
                    <span className={`${styles.stepNumber} ${index === currentStepIndex ? styles.stepNumberActive : ''}`}>
                      {step.number}.
                    </span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <AnimatePresence mode="wait">
            <motion.main 
              key={currentStepIndex}
              className={styles.stepContentArea}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.stepVisual}>
                {typeof currentStep.visualContent === 'string' ? (
                  currentStep.visualContent
                ) : (
                  currentStep.visualContent
                )}
              </div>
              <div className={styles.stepInstructions}>
                {currentStep.instruction}
                <button 
                  className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`}
                  onClick={playAudio}
                >
                  <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
                </button>
              </div>
            </motion.main>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className={styles.footerNav}>
        <button 
          className={`${styles.navButton} ${styles.navButtonPrevious} ${isFirstStep ? styles.navButtonDisabled : ''}`} 
          onClick={handlePrevious}
          disabled={isFirstStep && !onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        <button 
          className={`${styles.navButton} ${styles.navButtonContinue}`} 
          onClick={handleContinue}
        >
          Continue <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default StepByStep;
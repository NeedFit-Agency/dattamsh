'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './Application.module.css';

export interface ExampleItem {
  id: string;
  scenario: string;
  explanation: string;
  visualIcon: string;  // Emoji or icon character to display
  category?: string;   // Optional category for grouping examples
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // Optional difficulty level
  isInteractive?: boolean; // Whether this example has interactive elements
  tags?: string[];    // Optional tags for filtering
  color?: string;     // Optional custom color for the example card
}

export interface ApplicationProps {
  title: string;
  subtitle?: string;
  examples: ExampleItem[];
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  audioContent?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const Application: React.FC<ApplicationProps> = ({
  title,
  subtitle,
  examples = [], // Default to empty array to prevent null/undefined errors
  progress = 80,
  hearts = 3,
  gems = 234,
  shields = 1,
  audioContent,
  onComplete,
  onBack
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handlePrevious = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleExampleClick = (example: ExampleItem) => {
    if (example.isInteractive) {
      setActiveExampleId(activeExampleId === example.id ? null : example.id);
      // You can add additional interaction logic here
    }
  };

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = audioContent || subtitle || title;

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
        <div className={styles.appName}>&lt;/&gt; Learning Applications</div>
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
        {subtitle && (
          <p className={styles.contentSubtitle}>
            {subtitle}
            <button 
              className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`}
              onClick={playAudio}
            >
              <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
            </button>
          </p>
        )}

        <div className={styles.examplesGrid}>
          {examples && examples.length > 0 ? (
            examples.map((example, index) => (
              <motion.div
                key={example.id}
                className={`${styles.exampleCard} ${example.isInteractive ? styles.interactive : ''} ${activeExampleId === example.id ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                style={example.color ? { borderColor: example.color } : {}}
                onClick={() => example.isInteractive && handleExampleClick(example)}
              >
                {example.difficulty && (
                  <div className={`${styles.difficultyBadge} ${styles[example.difficulty]}`}>
                    {example.difficulty}
                  </div>
                )}
                <div className={styles.exampleVisual}>
                  {example.visualIcon}
                </div>
                <div className={styles.exampleScenario}>
                  {example.scenario}
                </div>
                <div className={styles.exampleExplanation}>
                  {example.explanation}
                </div>
                {example.category && (
                  <div className={styles.exampleCategory}>{example.category}</div>
                )}
                {example.tags && example.tags.length > 0 && (
                  <div className={styles.tagContainer}>
                    {example.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className={styles.noExamples}>No examples available</div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className={styles.footerNav}>
        <button 
          className={`${styles.navButton} ${styles.navButtonPrevious}`} 
          onClick={handlePrevious}
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

export default Application;
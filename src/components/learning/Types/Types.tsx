'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './types.module.css';

export interface FileType {
  id: string;
  name: string;
  description: string;
  icon: string;  // Emoji or icon character to display
}

export interface TypesProps {
  title: string;
  subtitle?: string;
  types: FileType[];
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  audioContent?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const Types: React.FC<TypesProps> = ({
  title,
  subtitle,
  types,
  progress = 70,
  hearts = 3,
  gems = 234,
  shields = 1,
  audioContent,
  onComplete,
  onBack
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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
        <div className={styles.appName}>&lt;/&gt; Learning Types</div>
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

        <motion.h1 
          className={styles.contentTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
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

        <div className={styles.typesGrid}>
          {types.map((type, index) => (
            <motion.div
              key={type.id}
              className={styles.typeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className={styles.typeIcon}>
                {type.icon}
              </div>
              <div className={styles.typeName}>
                {type.name}
              </div>
              <div className={styles.typeDescription}>
                {type.description}
              </div>
            </motion.div>
          ))}
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

export default Types;
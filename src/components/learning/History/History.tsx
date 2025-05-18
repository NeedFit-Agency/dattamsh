'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './history.module.css';
import Image from 'next/image';

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  visualIcon: string;  // Emoji or icon character to display
  position: 'left' | 'right';
}

export interface HistoryProps {
  title: string;
  subtitle?: string;
  items: HistoryItem[];
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  audioContent?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const History: React.FC<HistoryProps> = ({
  title,
  subtitle,
  items,
  progress = 60,
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
        <div className={styles.appName}>&lt;/&gt; Learning History</div>
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

        <div className={styles.timeline}>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${styles.timelineItem} ${item.position === 'left' ? styles.timelineItemLeft : styles.timelineItemRight}`}
                initial={{ opacity: 0, x: item.position === 'left' ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.timelineVisual}>
                    {item.visualIcon &&
                      (/(\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$)/i.test(item.visualIcon)) ? (
                        <Image
                          src={item.visualIcon}
                          alt={item.title}
                          width={100}
                          height={100}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <span>{item.visualIcon}</span>
                      )}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.timelineContent}>
              <p>No timeline items available.</p>
            </div>
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

export default History;
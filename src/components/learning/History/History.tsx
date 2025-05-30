'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
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
    <>
      <div className={styles.playfulBackground}>
        <div className={`${styles.floatingShape} ${styles.star}`} style={{ top: '10%', left: '8%' }}></div>
        <div className={`${styles.floatingShape} ${styles.cloud}`} style={{ top: '60%', left: '5%' }}></div>
        <div className={`${styles.floatingShape} ${styles.circle}`} style={{ top: '30%', right: '10%' }}></div>
        <div className={`${styles.floatingShape} ${styles.star}`} style={{ bottom: '12%', right: '18%' }}></div>
        <div className={`${styles.floatingShape} ${styles.cloud}`} style={{ bottom: '8%', left: '40%' }}></div>
        <div className={`${styles.floatingShape} ${styles.circle}`} style={{ top: '18%', left: '60%' }}></div>
      </div>
      <div className={styles.mainContainer}>
        {/* Content */}
        <div className={styles.contentWrapper}>
          <div className={styles.navigationHeader}>
            <button
              type="button"
              className={styles.backButton}
              aria-label="Go back"
              onClick={handlePrevious}
            >
              <span aria-hidden="true" style={{fontSize: '1.5em', lineHeight: 1}}>&larr;</span>
            </button>
            <div
              className={styles.progressBarContainer}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress"
            >
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              <span className="sr-only">{`Progress: ${progress}%`}</span>
            </div>
          </div>

          <div className={styles.headerContent}>
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
          </div>

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
                            width={160}
                            height={160}
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
      </div>
    </>
  );
};

export default History;
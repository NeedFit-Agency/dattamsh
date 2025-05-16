'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faShield, faGem, faHeart, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TextProps } from './types';
import styles from './text.module.css';

// Helper function to format content with emojis
const formatContentWithEmojis = (text: string): React.ReactNode => {
  const hasEmojis = /[\p{Emoji}]/u.test(text);

  if (hasEmojis) {
    const parts = text.split(/(\p{Emoji}+)/u);
    return parts.map((part, index) => {
      if (/[\p{Emoji}]/u.test(part)) {
        return (
          <span
            key={index}
            className={styles.emoji}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }

  if (/^\s*(\d+[\.\)]|[•\-\*])\s+/.test(text)) {
    return <strong className={styles.listItem}>{text}</strong>;
  }

  return text;
};

const Text: React.FC<TextProps> = ({
  title,
  description,
  imageUrl,
  exampleImages,
  audioSrc,
  speakText,
  progress = 0,
  onBack
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const playAudio = () => {
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || (Array.isArray(description) ? description.join(' ') : description);

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

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.navigationHeader}>
          {onBack && (
            <button
              className={styles.backButton}
              onClick={onBack}
              title="Back"
              aria-label="Back"
              type="button"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h1 className={styles.contentTitle}>{title}</h1>

        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            {/* Image section */}
            {imageUrl && (
              <div className={styles.imageContainer}>
                <motion.img
                  src={imageUrl}
                  alt={title}
                  className={styles.mainImage}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            )}
            {/* Example images grid */}
            {exampleImages && exampleImages.length > 0 && (
              <div className={styles.exampleImagesGrid}>
                {exampleImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      title={img.alt}
                      className={styles.exampleImage}
                      whileHover={{
                        scale: 1.05,
                        rotate: Math.random() * 4 - 2,
                        boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                      }}
                    />
                    {img.alt && <p className={styles.imageCaption}>{img.alt}</p>}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Custom layout for Questions to Ponder */}
            {title === 'Questions to Ponder' ? (
              <div className={styles.questionsToPonderBox}>
                <ul className={styles.questionsList}>
                  {Array.isArray(description) ? description.map((q, i) => (
                    <li key={i} className={styles.questionItem}>
                      <span className={styles.questionIcon}>❓</span>
                      <span>{q}</span>
                    </li>
                  )) : (
                    <li className={styles.questionItem}>
                      <span className={styles.questionIcon}>❓</span>
                      <span>{description}</span>
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <div className={styles.textSection}>
                {Array.isArray(description) ? (
                  description.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className={styles.paragraph}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {formatContentWithEmojis(paragraph)}
                    </motion.p>
                  ))
                ) : (
                  <p className={styles.paragraph}>
                    {formatContentWithEmojis(description)}
                  </p>
                )}
                {/* Audio button */}
                {(audioSrc || speakText) && (
                  <button
                    className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`}
                    onClick={playAudio}
                    aria-label={isAudioPlaying ? "Stop Audio" : "Listen to Text"}
                  >
                    <FontAwesomeIcon icon={faHeadphones} />
                    <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
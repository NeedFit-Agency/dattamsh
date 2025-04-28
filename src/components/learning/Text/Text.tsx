'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  onBack,
  onComplete
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
    <div className={styles.container}>
      {/* Progress indicator */}
      {typeof progress === 'number' && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.progressText}>{Math.round(progress)}% complete</span>
        </div>
      )}

      {/* Title */}
      <h2 className={styles.title}>{title}</h2>

      {/* Main content layout */}
      <div className={styles.contentLayout}>
        {/* Visual column */}
        {(imageUrl || exampleImages) && (
          <div className={styles.visualColumn}>
            {imageUrl && (
              <motion.img
                src={imageUrl}
                alt={title}
                className={styles.mainImage}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
            
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
          </div>
        )}

        {/* Text column */}
        <div className={styles.textColumn}>
          <div className={styles.descriptionContainer}>
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
                className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                onClick={playAudio}
                aria-label={isAudioPlaying ? "Stop Audio" : "Listen to Text"}
              >
                <FontAwesomeIcon icon={faHeadphones} />
                <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className={styles.navigationFooter}>
        {onBack && (
          <button 
            className={`${styles.navigationButton} ${styles.backButton}`}
            onClick={onBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
        
        {onComplete && (
          <button 
            className={`${styles.navigationButton} ${styles.continueButton}`}
            onClick={onComplete}
          >
            Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Text;
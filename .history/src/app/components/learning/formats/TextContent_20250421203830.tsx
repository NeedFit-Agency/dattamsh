'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { TextContentProps } from './types';
import styles from '../../../learning/learning.module.css';

// Helper function to format content with emojis
const formatContentWithEmojis = (text: string): React.ReactNode => {
  // Check if text already contains emojis
  const hasEmojis = /[\p{Emoji}]/u.test(text);
  
  if (hasEmojis) {
    // Split text by emoji characters and wrap emojis in a span with special styling
    const parts = text.split(/(\p{Emoji}+)/u);
    return parts.map((part, index) => {
      if (/[\p{Emoji}]/u.test(part)) {
        return <span key={index} className="emoji" style={{ 
          fontSize: '1.4em', 
          verticalAlign: 'middle',
          display: 'inline-block',
          margin: '0 2px',
          animation: 'wiggle 2s infinite ease-in-out'
        }}>{part}</span>;
      }
      return part;
    });
  }
  
  // If text contains formatting like bullet points or numbered steps
  if (text.match(/^\d[\.\)]|^[•\-\*]/)) {
    return <strong style={{ fontWeight: 600 }}>{text}</strong>;
  }
  
  return text;
};

export const TextContent: React.FC<TextContentProps> = ({
  title,
  description,
  imageUrl,
  exampleImages,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak) {
      textToSpeak = Array.isArray(description) ? description.join(' ') : description;
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

  return (
    <div className={styles.learningSlideLayout}>
      {/* Visual Column */}
      {(imageUrl || exampleImages) && (
        <div className={styles.learningVisualColumn}>
          {imageUrl && (
            <motion.img 
              src={imageUrl} 
              alt={title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          )}
          {exampleImages && !imageUrl && (
            <div className={styles.exampleImageContainer}>
              {exampleImages.map((img, i) => (
                <div
                  key={i}
                  className={styles.tooltipWrapper}
                  data-tooltip={img.alt}
                  style={{ '--image-index': i } as any}
                >
                  <motion.img 
                    src={img.src} 
                    alt={img.alt} 
                    className={styles.exampleImage}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 2,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Text Column (Mascot + Speech) */}
      <div className={styles.learningTextColumn}>
        <div className={styles.mascotContainer}>
          <div className={styles.mascotSpeechBubble}>
            {Array.isArray(description) ? 
              description.map((p, i) => (
                <p key={i}>
                  {formatContentWithEmojis(p)}
                </p>
              )) 
              : 
              <p>{formatContentWithEmojis(description)}</p>
            }
            {(audioSrc || speakText) && (
              <button 
                className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                onClick={playAudio} 
                title={isAudioPlaying ? "Stop" : "Listen"}
              >
                <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
              </button>
            )}
          </div>
          <div className={styles.mascotImageContainer}>
            <motion.img 
              src="/images/mascot.png" 
              alt="Owlbert Mascot" 
              className={styles.mascotImage}
              initial={{ y: 0 }}
              animate={{ 
                y: [-10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.3
                }
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [-5, 5, -5, 5, 0],
                transition: {
                  rotate: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }
              }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
        </div>
        {imageUrl && exampleImages && (
          <div className={styles.exampleImageContainer}> 
            {exampleImages.map((img, i) => (
              <div 
                key={i}
                className={styles.tooltipWrapper}
                data-tooltip={img.alt}
              >
                <motion.img 
                  src={img.src} 
                  alt={img.alt} 
                  className={styles.exampleImage}
                  title={img.alt}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextContent;
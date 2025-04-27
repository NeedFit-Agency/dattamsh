'use client';

import React, { useState } from 'react';
import { TextContentProps } from './types';
import styles from '../../../learning/learning.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export const TextContent: React.FC<TextContentProps> = ({
  title,
  description,
  content,
  highlights = [],
  images = [],
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Convert content to array if it's a string
  const contentArray = Array.isArray(content) ? content : [content];

  // Convert description to array if it's a string
  const descriptionArray = description ? (Array.isArray(description) ? description : [description]) : [];

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || 
      (Array.isArray(content) ? content.join('. ') : content) || 
      (description ? (Array.isArray(description) ? description.join('. ') : description) : '');

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

  const highlightText = (text: string) => {
    if (highlights.length === 0) return text;

    let highlightedText = text;
    highlights.forEach(highlight => {
      // Safely escape any special regex characters in the highlight text
      const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
      
      highlightedText = highlightedText.replace(
        regex, 
        '<span class="highlight">$1</span>'
      );
    });

    return (
      <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
    );
  };

  return (
    <div className={styles.textContent}>
      {title && <h3 className={styles.contentTitle}>{title}</h3>}
      
      {/* Description (if provided) */}
      {descriptionArray.length > 0 && (
        <div className={styles.contentDescription}>
          {descriptionArray.map((paragraph, index) => (
            <p key={`desc-${index}`}>{highlightText(paragraph)}</p>
          ))}
        </div>
      )}
      
      {/* Audio button */}
      {(audioSrc || speakText) && (
        <button 
          className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
          onClick={playAudio}
          aria-label={isAudioPlaying ? "Stop audio" : "Play audio"}
        >
          <FontAwesomeIcon icon={isAudioPlaying ? faVolumeUp : faHeadphones} />
          {isAudioPlaying ? "Listening..." : "Listen"}
        </button>
      )}
      
      {/* Main content */}
      <div className={styles.contentBody}>
        {contentArray.map((paragraph, index) => (
          <p key={`content-${index}`} className={styles.contentParagraph}>
            {highlightText(paragraph)}
          </p>
        ))}
      </div>
      
      {/* Images (if provided) */}
      {images.length > 0 && (
        <div className={styles.contentImages}>
          {images.map((image, index) => (
            <figure key={`img-${index}`} className={styles.contentImageContainer}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className={styles.contentImage}
              />
              {image.caption && (
                <figcaption className={styles.imageCaption}>
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextContent;
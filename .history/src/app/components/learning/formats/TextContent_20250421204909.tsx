'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { TextContentProps } from './types';
import styles from '../../../learning/learning.module.css';

export const TextContent: React.FC<TextContentProps> = ({
  title,
  content,
  highlights = [],
  mascot = false,
  imageUrl,
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
      textToSpeak = Array.isArray(content) ? content.join(' ') : content;
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

  // Function to highlight specified text
  const highlightText = (text: string) => {
    if (highlights && highlights.length > 0) {
      let highlightedText = text;
      
      // Sort highlights by length (descending) to avoid highlighting part of another highlight
      const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
      
      for (const highlight of sortedHighlights) {
        // Use global regex to replace all instances, but escape special characters first
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedHighlight})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<em>$1</em>');
      }
      
      return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    }
    
    return text;
  };

  return (
    <div className={styles.learningSlideLayout}>
      {/* Title (if provided) */}
      {title && <h3 className={styles.lessonSubTitle}>{title}</h3>}
      
      {/* Main Content */}
      {mascot ? (
        // Mascot speech bubble layout
        <div className={styles.mascotContainer}>
          <div className={styles.mascotSpeechBubble}>
            {Array.isArray(content) ? (
              content.map((paragraph, index) => (
                <p key={index}>{highlightText(paragraph)}</p>
              ))
            ) : (
              <p>{highlightText(content)}</p>
            )}
            
            {(audioSrc || speakText) && (
              <button 
                className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                onClick={playAudio}
              >
                <FontAwesomeIcon icon={faHeadphones} />
                {isAudioPlaying ? "Listening..." : "Listen"}
              </button>
            )}
          </div>
          
          <div className={styles.mascotImageContainer}>
            <img 
              src="/images/mascot.png" 
              alt="Learning Mascot" 
              className={styles.mascotImage}
            />
          </div>
        </div>
      ) : (
        // Standard content layout
        <div className={styles.learningVisualColumn}>
          {/* Text Content */}
          <div className={styles.mascotSpeechBubble} style={{ width: '100%' }}>
            {Array.isArray(content) ? (
              content.map((paragraph, index) => (
                <p key={index}>{highlightText(paragraph)}</p>
              ))
            ) : (
              <p>{highlightText(content)}</p>
            )}
            
            {(audioSrc || speakText) && (
              <button 
                className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                onClick={playAudio}
              >
                <FontAwesomeIcon icon={faHeadphones} />
                {isAudioPlaying ? "Listening..." : "Listen"}
              </button>
            )}
          </div>
          
          {/* Image (if provided) */}
          {imageUrl && (
            <div className={styles.exampleImageContainer} style={{ gridTemplateColumns: '1fr' }}>
              <div className={styles.exampleImage} style={{ height: 'auto', maxHeight: '300px' }}>
                <img 
                  src={imageUrl} 
                  alt={title || "Illustration"} 
                  style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextContent;
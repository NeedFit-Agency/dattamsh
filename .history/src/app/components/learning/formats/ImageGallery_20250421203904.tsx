'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faChevronLeft, faChevronRight, faExpand } from '@fortawesome/free-solid-svg-icons';
import { ImageGalleryProps } from './types';
import styles from '../../../learning/learning.module.css';

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  title,
  description,
  images,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak && description) {
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

  const goToPrevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className={`${styles.learningSlideLayout} ${styles.galleryLayout}`}>
      {/* Description Section (if available) */}
      {description && (
        <div className={styles.galleryDescription}>
          {Array.isArray(description) ? 
            description.map((p, i) => <p key={i}>{p}</p>) : 
            <p>{description}</p>
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
      )}

      {/* Main Gallery Section */}
      <div className={`${styles.galleryContainer} ${isFullscreen ? styles.fullscreenGallery : ''}`}>
        {isFullscreen && (
          <div className={styles.fullscreenOverlay} onClick={toggleFullscreen}>
            <button className={styles.closeFullscreen} onClick={toggleFullscreen}>×</button>
            <img 
              src={currentImage.src} 
              alt={currentImage.alt} 
              className={styles.fullscreenImage} 
            />
            {currentImage.caption && (
              <div className={styles.fullscreenCaption}>{currentImage.caption}</div>
            )}
          </div>
        )}

        <div className={styles.mainGallery}>
          <button className={styles.galleryNav} onClick={goToPrevImage} aria-label="Previous image">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <div className={styles.galleryImageWrapper}>
            <motion.img 
              src={currentImage.src} 
              alt={currentImage.alt}
              className={styles.galleryImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={currentImageIndex} // Key helps React recognize this as a new image to animate
            />
            <button 
              className={styles.fullscreenButton} 
              onClick={toggleFullscreen}
              aria-label="View fullscreen"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
            {currentImage.caption && (
              <div className={styles.imageCaption}>{currentImage.caption}</div>
            )}
          </div>
          
          <button className={styles.galleryNav} onClick={goToNextImage} aria-label="Next image">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className={styles.galleryThumbnails}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
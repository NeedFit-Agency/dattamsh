'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageGalleryProps } from './types';
import styles from '../../../learning/learning.module.css';
import Image from 'next/image';

export const ImageGallery: React.FC<ImageGalleryProps> = ({
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
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={styles.galleryLayout}>
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

      {/* Gallery Section */}
      <div className={styles.galleryContainer}>
        <div className={styles.mainGallery}>
          {/* Previous Button */}
          {images.length > 1 && (
            <button 
              className={styles.galleryNav} 
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          
          {/* Main Image */}
          <div className={styles.galleryImageWrapper}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className={styles.galleryImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Caption */}
            {images[currentImageIndex].caption && (
              <div className={styles.imageCaption}>
                {images[currentImageIndex].caption}
              </div>
            )}
            
            {/* Fullscreen Button */}
            <button 
              className={styles.fullscreenButton} 
              onClick={toggleFullscreen}
              aria-label="View fullscreen"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </div>
          
          {/* Next Button */}
          {images.length > 1 && (
            <button 
              className={styles.galleryNav} 
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
        
        {/* Thumbnails (if more than one image) */}
        {images.length > 1 && (
          <div className={styles.galleryThumbnails}>
            {images.map((image, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image src={image.src} alt={`Thumbnail ${index + 1}`} width={100} height={100} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen View */}
      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={toggleFullscreen}>
          <button 
            className={styles.closeFullscreen}
            onClick={toggleFullscreen}
            aria-label="Close fullscreen"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <Image 
            src={images[currentImageIndex].src} 
            alt={images[currentImageIndex].alt}
            className={styles.fullscreenImage}
            width={1920}
            height={1080}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          />
          
          {images[currentImageIndex].caption && (
            <div 
              className={styles.fullscreenCaption}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on caption
            >
              {images[currentImageIndex].caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
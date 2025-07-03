import React, { useState, useRef } from 'react';
import styles from './AudioButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

interface AudioButtonProps {
  textToSpeak: string;
  className?: string;
  ariaLabel?: string;
  buttonText?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  className = '',
  ariaLabel = 'Play audio',
  buttonText = 'Listen',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlay = () => {
    if (!textToSpeak || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    try {
      const utterance = new window.SpeechSynthesisUtterance(textToSpeak);
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.audioButton} ${isPlaying ? styles.audioButtonPlaying : ''} ${className}`}
      onClick={handlePlay}
      aria-label={ariaLabel}
      disabled={!textToSpeak || typeof window === 'undefined' || !window.speechSynthesis}
    >
      <FontAwesomeIcon icon={faHeadphones} />
      <span>{isPlaying ? 'Listening...' : buttonText}</span>
    </button>
  );
};

export default AudioButton; 
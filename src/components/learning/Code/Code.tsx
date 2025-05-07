'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog, faCopy } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './code.module.css';

export interface OutputContent {
  type: 'text' | 'image' | 'html';
  content: string;
  alt?: string; // Alt text for images
}

export interface CodeProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  outputTitle?: string;
  outputContent?: OutputContent;
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  audioContent?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const Code: React.FC<CodeProps> = ({
  title,
  description,
  code,
  language = 'text',
  outputTitle = 'What it Looks Like:',
  outputContent,
  progress = 65,
  hearts = 3,
  gems = 234,
  shields = 1,
  audioContent,
  onComplete,
  onBack
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Simple syntax highlighting for code
  const highlightCode = (code: string, language: string) => {
    // Basic implementation that can be extended for different languages
    // Ensure code is a string to prevent 'replace' of undefined errors
    if (code === undefined || code === null) {
      return '';
    }
    
    let highlighted = code.toString();
    const keywords = ['REPEAT', 'TIMES', 'FORWARD', 'RIGHT', 'LEFT', 'IF', 'ELSE', 'THEN', 'WHILE', 'FOR', 'TO', 'STEP', 'FUNCTION', 'RETURN'];
    
    if (language) {
      // Replace keywords with styled spans
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="${styles.keyword}">${keyword}</span>`);
      });
      
      // Highlight comments
      highlighted = highlighted.replace(/\/\/.*$/gm, match => `<span class="${styles.comment}">${match}</span>`);
      highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, match => `<span class="${styles.comment}">${match}</span>`);
      
      // Highlight strings
      highlighted = highlighted.replace(/"([^"]*)"/g, match => `<span class="${styles.string}">${match}</span>`);
      highlighted = highlighted.replace(/'([^']*)'/g, match => `<span class="${styles.string}">${match}</span>`);
      
      // Highlight numbers
      highlighted = highlighted.replace(/\b(\d+)\b/g, match => `<span class="${styles.number}">${match}</span>`);
      
      // Highlight operators
      highlighted = highlighted.replace(/([+\-*/%=<>!&|^~])/g, match => `<span class="${styles.operator}">${match}</span>`);
    }
    
    return highlighted;
  };

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const playAudio = () => {
    if (audioContent) {
      setIsAudioPlaying(true);
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.onend = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={styles.codeContainer}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <FontAwesomeIcon icon={faHeart} className={styles.statIcon} />
            <span>{hearts}</span>
          </div>
          <div className={styles.statItem}>
            <FontAwesomeIcon icon={faGem} className={styles.statIcon} />
            <span>{gems}</span>
          </div>
          <div className={styles.statItem}>
            <FontAwesomeIcon icon={faShield} className={styles.statIcon} />
            <span>{shields}</span>
          </div>
        </div>
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.settings}>
          <FontAwesomeIcon icon={faCog} className={styles.settingsIcon} />
        </div>
      </div>

      <div className={styles.content}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}

        {audioContent && (
          <p className={styles.audioContainer}>
            <button 
              className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
              onClick={playAudio}
            >
              <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
            </button>
          </p>
        )}

        <motion.div 
          className={styles.codeBlockContainer}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.codeBlock}>
            <button 
              className={styles.copyButton} 
              onClick={handleCopyCode}
            >
              <FontAwesomeIcon icon={faCopy} /> Copy
            </button>
            <div 
              className={`${styles.copiedMessage} ${isCopied ? styles.copiedMessageVisible : ''}`}
            >
              Copied!
            </div>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
            </pre>
          </div>
        </motion.div>

        {outputContent && (
          <motion.div 
            className={styles.outputArea}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4>{outputTitle}</h4>
            <div className={styles.outputContent}>
              {outputContent.type === 'text' && (
                <p>{outputContent.content}</p>
              )}
              {outputContent.type === 'image' && (
                <img 
                  src={outputContent.content} 
                  alt={outputContent.alt || 'Output image'} 
                  className={styles.outputImage} 
                />
              )}
              {outputContent.type === 'html' && (
                <div dangerouslySetInnerHTML={{ __html: outputContent.content }} />
              )}
            </div>
          </motion.div>
        )}

        <div className={styles.navigationButtons}>
          <button 
            className={`${styles.navButton} ${styles.backButton}`}
            onClick={handlePrevious}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <button 
            className={`${styles.navButton} ${styles.continueButton}`}
            onClick={handleContinue}
          >
            Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Code;
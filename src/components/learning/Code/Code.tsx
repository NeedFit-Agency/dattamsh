'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faArrowLeft, faArrowRight, faShield, faGem, faHeart, faCog, faCopy } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './code.module.css';
import Image from 'next/image';

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
    let highlighted = code;
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
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = audioContent || description || title;

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

  const renderOutput = () => {
    if (!outputContent) return null;

    switch (outputContent.type) {
      case 'image':
        return (
          <Image 
            src={outputContent.content} 
            alt={outputContent.alt || 'Code output'} 
            width={300}
            height={200}
          />
        );
      case 'html':
        return (
          <div dangerouslySetInnerHTML={{ __html: outputContent.content }} />
        );
      case 'text':
      default:
        return outputContent.content;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.navigationHeader}>
          <a className={styles.backArrow} onClick={handlePrevious}>←</a>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <motion.h1 
          className={styles.contentTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {description && (
          <p className={styles.contentDescription}>
            {description}
            <button 
              className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`}
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
              {renderOutput()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Code;
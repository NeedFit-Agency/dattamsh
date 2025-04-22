'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeExampleProps } from './types';
import styles from '../../../learning/learning.module.css';

export const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  description,
  code,
  language,
  highlightLines = [],
  explanation,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak) {
      if (Array.isArray(description)) {
        textToSpeak = description.join(' ');
      } else {
        textToSpeak = description || '';
      }
      
      if (explanation) {
        textToSpeak += ' ' + explanation;
      }
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Prepare line props for highlighted lines
  const lineProps = highlightLines.reduce((acc, lineNumber) => {
    acc[lineNumber - 1] = { style: { backgroundColor: 'rgba(255, 255, 0, 0.2)' } };
    return acc;
  }, {} as Record<number, { style: React.CSSProperties }>);

  return (
    <div className={styles.codeExampleContainer}>
      {/* Title (if provided) */}
      {title && <h3 className={styles.codeExampleTitle}>{title}</h3>}
      
      {/* Description */}
      {description && (
        <div className={styles.codeDescription}>
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{description}</p>
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
      )}
      
      {/* Code Block */}
      <div className={styles.codeBlock}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLanguage}>{language.toUpperCase()}</span>
          <button 
            className={styles.copyButton} 
            onClick={copyToClipboard}
            title={isCopied ? "Copied!" : "Copy to clipboard"}
          >
            <FontAwesomeIcon icon={isCopied ? faCheck : faClipboard} />
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className={styles.syntaxHighlighter}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            lineProps={lineProps}
            showLineNumbers={true}
            wrapLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      
      {/* Explanation (if provided) */}
      {explanation && (
        <div className={styles.codeExplanation}>
          <h4>Explanation:</h4>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CodeExample;
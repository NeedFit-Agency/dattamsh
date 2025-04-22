'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCopy, faCheck, faPlay } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
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
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  // Simple code execution simulation for educational purposes
  const runCode = () => {
    // This is a simplified example - in real world, you would run the code through a sandbox or API
    try {
      // Only allow JavaScript execution in this example
      if (language === 'javascript') {
        setOutput('Simulating code execution:\n-----------------\n');
        
        // Add a timeout to simulate processing
        setTimeout(() => {
          try {
            // WARNING: This is for educational purposes only and has serious security implications
            // Never run user-generated code in a real application without proper sandboxing
            const result = new Function(`
              try {
                ${code}
                return { success: true, output: "Code executed successfully!" };
              } catch (error) {
                return { success: false, error: error.toString() };
              }
            `)();
            
            if (result.success) {
              setOutput(prev => `${prev}${result.output}`);
            } else {
              setOutput(prev => `${prev}Error: ${result.error}`);
            }
          } catch (error) {
            setOutput(prev => `${prev}Error: ${error.toString()}`);
          }
        }, 500);
      } else {
        setOutput(`Running ${language} code is not supported in this demo. In a real application, you would send this to a server for execution.`);
      }
    } catch (error) {
      setOutput(`Error: ${error.toString()}`);
    }
  };

  // Format code with syntax highlighting (basic version)
  const formatCode = () => {
    if (!code) return <pre className={styles.codeBlock}></pre>;
    
    const codeLines = code.split('\n');
    
    return (
      <pre className={styles.codeBlock}>
        <code className={`language-${language}`}>
          {codeLines.map((line, i) => {
            const isHighlighted = highlightLines.includes(i + 1);
            return (
              <div 
                key={i} 
                className={`${styles.codeLine} ${isHighlighted ? styles.highlightedLine : ''}`}
              >
                <span className={styles.lineNumber}>{i + 1}</span>
                <span className={styles.lineContent}>{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    );
  };

  return (
    <div className={styles.codeExampleContainer}>
      {/* Description Section */}
      <div className={styles.codeDescription}>
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

      {/* Code Block */}
      <div className={styles.codeBlockContainer}>
        <div className={styles.codeHeader}>
          <div className={styles.languageTag}>{language}</div>
          
          <div className={styles.codeActions}>
            {language === 'javascript' && (
              <button 
                className={styles.runCodeButton} 
                onClick={runCode}
                title="Run Code (JavaScript only)"
              >
                <FontAwesomeIcon icon={faPlay} /> Run
              </button>
            )}
            
            <button 
              className={styles.copyButton} 
              onClick={copyCode}
              title="Copy Code"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} /> 
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        
        {formatCode()}
        
        {output && (
          <motion.div 
            className={styles.codeOutput}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.outputHeader}>Output</div>
            <pre>{output}</pre>
          </motion.div>
        )}
      </div>

      {/* Explanation (if provided) */}
      {explanation && (
        <div className={styles.codeExplanation}>
          <h4>Explanation</h4>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CodeExample;
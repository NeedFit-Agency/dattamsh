import React, { useState } from 'react';
import styles from './Puzzle.module.css';
import { PuzzleProps } from './types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Puzzle: React.FC<PuzzleProps & { onBack?: () => void }> = ({
  title,
  subtitle,
  avatarUrl,
  chatText,
  imageUrl,
  prompt,
  onBack,
}) => {
  const [feedback, setFeedback] = useState<'success' | 'wrong' | null>(null);

  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof window !== 'undefined') window.history.back();
  };

  // Hotspot click handlers
  const handleHotspot = (part: string) => {
    if (part === 'monitor') {
      setFeedback('success');
      setTimeout(() => setFeedback(null), 2000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className={styles.activityBg}>
      <motion.div 
        className={styles.activityCard}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button className={styles.chooseBackButton} onClick={handleBack} aria-label="Go back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className={styles.backText}>Back</span>
        </button>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.titleRow}>
            <span className={styles.schoolTitle}>{title}</span>
          </div>
        </div>

        {/* Chat bubble */}
        <div className={styles.chatRow}>
          <img src="/images/mascot.png" alt="Avatar" className={styles.avatar} />
          <div className={styles.chatBubble}>{chatText}</div>
        </div>

        {/* Main image with puzzle hotspots */}
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ position: 'relative' }}
        >
          <img src={imageUrl} alt="Activity" className={styles.mainImage} />
          {/* Hotspot for monitor (correct) */}
          <button
            className={`${styles.hotspot} ${styles.monitor}`}
            aria-label="Monitor (shows pictures)"
            onClick={() => handleHotspot('monitor')}
            tabIndex={0}
          />
          {/* Hotspot for pencil cup (wrong) */}
          <button
            className={`${styles.hotspot} ${styles.pencil}`}
            aria-label="Pencil cup"
            onClick={() => handleHotspot('pencil')}
            tabIndex={0}
          />
          {/* Hotspot for big star (wrong) */}
          <button
            className={`${styles.hotspot} ${styles.star}`}
            aria-label="Star"
            onClick={() => handleHotspot('star')}
            tabIndex={0}
          />
          {/* Feedback overlays */}
          {feedback === 'success' && (
            <div className={styles.successFeedback}>
              <span role="img" aria-label="Correct">✅</span> Great job! That's the screen!
            </div>
          )}
          {feedback === 'wrong' && (
            <div className={styles.wrongFeedback}>
              <span role="img" aria-label="Try again">❌</span> Try again!
            </div>
          )}
        </motion.div>

        {/* Prompt */}
        <div className={styles.prompt}>{prompt}</div>
      </motion.div>
    </div>
  );
};

export default Puzzle;

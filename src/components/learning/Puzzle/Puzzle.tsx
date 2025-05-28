import React, { useState } from 'react';
import styles from './Puzzle.module.css';
import { PuzzleProps } from './types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Puzzle: React.FC<PuzzleProps & { 
  onBack?: () => void; 
  hotspots?: { part: string; position: string; isCorrect: boolean }[] 
}> = ({
  title,
  subtitle,
  avatarUrl,
  chatText,
  imageUrl,
  prompt,
  onBack,
  hotspots = [],
}) => {
  const [feedback, setFeedback] = useState<'success' | 'wrong' | null>(null);
  const [clickedHotspots, setClickedHotspots] = useState<Set<string>>(new Set());

  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof window !== 'undefined') window.history.back();
  };

  const handleHotspot = (hotspot: { part: string; position: string; isCorrect: boolean }) => {
    // Prevent multiple clicks on the same hotspot
    if (clickedHotspots.has(hotspot.part)) return;

    if (hotspot.isCorrect) {
      setFeedback('success');
      setClickedHotspots(prev => new Set(prev).add(hotspot.part));
      setTimeout(() => setFeedback(null), 2000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, hotspot: { part: string; position: string; isCorrect: boolean }) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleHotspot(hotspot);
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
        <button 
          className={styles.chooseBackButton} 
          onClick={handleBack} 
          aria-label="Go back"
        >
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
        >
          <img src={imageUrl} alt="Activity" className={styles.mainImage} />
          
          {/* Render hotspots */}
          {hotspots.map((hotspot, index) => {
            const positionClass = styles[hotspot.position] || '';
            const isClicked = clickedHotspots.has(hotspot.part);
            
            return (
              <button
                key={`${hotspot.part}-${index}`}
                className={`${styles.hotspot} ${positionClass}`}
                aria-label={`Click on ${hotspot.part}`}
                onClick={() => handleHotspot(hotspot)}
                onKeyDown={(e) => handleKeyDown(e, hotspot)}
                tabIndex={0}
                disabled={isClicked}
                style={{
                  opacity: isClicked ? 0.5 : 1,
                  pointerEvents: isClicked ? 'none' : 'auto'
                }}
                title={`Find the ${hotspot.part}`}
              />
            );
          })}

          {/* Feedback overlays */}
          {feedback === 'success' && (
            <motion.div 
              className={styles.successFeedback}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <span role="img" aria-label="Correct">✅</span> 
              Great job!
            </motion.div>
          )}
          
          {feedback === 'wrong' && (
            <motion.div 
              className={styles.wrongFeedback}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <span role="img" aria-label="Try again">❌</span> 
              Try again!
            </motion.div>
          )}
        </motion.div>

        {/* Prompt */}
        <div className={styles.prompt}>{prompt}</div>
      </motion.div>
    </div>
  );
};

export default Puzzle;
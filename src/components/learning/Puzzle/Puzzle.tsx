import React, { useState } from 'react';
import styles from './Puzzle.module.css';
import { PuzzleProps } from './types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Puzzle: React.FC<PuzzleProps & { 
  onBack?: () => void; 
  hotspots?: { part: string; position: string; isCorrect: boolean }[]; 
  onNext?: () => void;
}> = ({
  title,
  subtitle,
  avatarUrl,
  chatText,
  imageUrl,
  prompt,
  onBack,
  hotspots = [],
  onNext,
}) => {
  const [feedback, setFeedback] = useState<'success' | 'wrong' | null>(null);
  const [clickedHotspots, setClickedHotspots] = useState<Set<string>>(new Set());
  const [wrongHotspotIndex, setWrongHotspotIndex] = useState<number | null>(null);

  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof window !== 'undefined') window.history.back();
  };

  const handleHotspot = (hotspot: { part: string; position: string; isCorrect: boolean }, index: number) => {
    // Prevent multiple clicks on the same hotspot
    if (clickedHotspots.has(hotspot.part)) return;

    if (hotspot.isCorrect) {
      setFeedback('success');
      setClickedHotspots(prev => new Set(prev).add(hotspot.part));
      setTimeout(() => {
        setFeedback(null);
        setWrongHotspotIndex(null);
        if (typeof onNext === 'function') {
          onNext();
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      setWrongHotspotIndex(index);
      setTimeout(() => {
        setFeedback(null);
        setWrongHotspotIndex(null);
      }, 1200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, hotspot: { part: string; position: string; isCorrect: boolean }, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleHotspot(hotspot, index);
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
                onClick={() => handleHotspot(hotspot, index)}
                onKeyDown={(e) => handleKeyDown(e, hotspot, index)}
                tabIndex={0}
                disabled={isClicked}
                style={{
                  opacity: isClicked ? 0.5 : 1,
                  pointerEvents: isClicked ? 'none' : 'auto',
                  position: 'absolute',
                  overflow: 'visible',
                }}
                title={`Find the ${hotspot.part}`}
              >
                {/* Feedback overlays for wrong answer, shown inside the clicked hotspot */}
                {feedback === 'wrong' && wrongHotspotIndex === index && (
                  <span className={styles.hotspotFeedback} role="alert" aria-live="assertive">
                    <span role="img" aria-label="Try again">❌</span> Try again!
                  </span>
                )}
              </button>
            );
          })}

          {/* Feedback overlays */}
          {feedback === 'success' && (
            <motion.div 
              className={styles.successFeedback}
              initial={{ scale: 0.6, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
            >
              <span role="img" aria-label="Correct">✅</span> 
              Great job!
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
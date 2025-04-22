'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheckCircle, faTimesCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import { DragDropProps } from './types';
import styles from '../../../learning/learning.module.css';

export const DragDrop: React.FC<DragDropProps> = ({
  title,
  instruction,
  items,
  targets,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [dragItems, setDragItems] = useState(items.map(item => ({ ...item, placed: false, targetId: '' })));
  const [droppedItems, setDroppedItems] = useState<Record<string, { id: string, text: string, type: string, imageUrl?: string }[]>>({});
  const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);

  // Initialize empty arrays for each target
  useEffect(() => {
    const initialDropped: Record<string, any[]> = {};
    targets.forEach(target => {
      initialDropped[target.id] = [];
    });
    setDroppedItems(initialDropped);
  }, [targets]);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || instruction;

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

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('itemId', item.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const draggedItem = dragItems.find(item => item.id === itemId);
    
    if (!draggedItem || draggedItem.placed) return;

    // Check if the item matches the target type
    const target = targets.find(t => t.id === targetId);
    
    // Update the dragItems to mark this item as placed
    setDragItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, placed: true, targetId: targetId } 
          : item
      )
    );

    // Add the item to the target's dropped items
    setDroppedItems(prev => ({
      ...prev,
      [targetId]: [...prev[targetId], draggedItem]
    }));

    // Clear any previous feedback
    setFeedback({ show: false, correct: false, message: '' });
  };

  const handleRemoveItem = (targetId: string, itemId: string) => {
    // Remove the item from the target
    setDroppedItems(prev => ({
      ...prev,
      [targetId]: prev[targetId].filter(item => item.id !== itemId)
    }));

    // Mark the item as not placed
    setDragItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, placed: false, targetId: '' } 
          : item
      )
    );

    // Clear any previous feedback
    setFeedback({ show: false, correct: false, message: '' });
  };

  const checkAnswers = () => {
    setIsCheckingAnswers(true);
    let allCorrect = true;
    let message = '';

    // Check each placed item
    for (const item of dragItems.filter(i => i.placed)) {
      const target = targets.find(t => t.id === item.targetId);
      if (target && item.type !== target.type) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      if (dragItems.some(item => !item.placed)) {
        // Some items were correct but not all items were placed
        message = 'Some items are correct, but you need to place all items!';
        setFeedback({ show: true, correct: false, message });
      } else {
        // All items were placed correctly
        message = 'Great job! All items are correctly sorted!';
        setFeedback({ show: true, correct: true, message });
      }
    } else {
      // Some items were placed incorrectly
      message = 'Some items are in the wrong category. Try again!';
      setFeedback({ show: true, correct: false, message });
    }

    setTimeout(() => {
      setIsCheckingAnswers(false);
    }, 2000);
  };

  const resetActivity = () => {
    // Reset all items to unplaced state
    setDragItems(items.map(item => ({ ...item, placed: false, targetId: '' })));
    
    // Clear all target areas
    const resetDropped: Record<string, any[]> = {};
    targets.forEach(target => {
      resetDropped[target.id] = [];
    });
    setDroppedItems(resetDropped);

    // Clear feedback
    setFeedback({ show: false, correct: false, message: '' });
  };

  return (
    <div className={styles.dragDropContainer}>
      {/* Title and Instructions */}
      <div className={styles.instructionBox}>
        {title && <h3 className={styles.activityTitle}>{title}</h3>}
        <p className={styles.instruction}>{instruction}</p>
        
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

      {/* Activity Area */}
      <div className={styles.activityArea}>
        {/* Draggable Items */}
        <div className={styles.itemsContainer}>
          <h4 className={styles.itemsTitle}>Items</h4>
          <div className={styles.dragItems}>
            <AnimatePresence>
              {dragItems.filter(item => !item.placed).map(item => (
                <motion.div
                  key={item.id}
                  className={styles.dragItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.imageUrl && (
                    <div className={styles.dragItemImage}>
                      <img src={item.imageUrl} alt={item.text} />
                    </div>
                  )}
                  <span className={styles.dragItemText}>{item.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Drop Targets */}
        <div className={styles.targetsGrid} style={{ gridTemplateColumns: `repeat(${Math.min(targets.length, 3)}, 1fr)` }}>
          {targets.map(target => (
            <div key={target.id} className={styles.targetContainer}>
              <h4 className={styles.targetTitle}>{target.title}</h4>
              <div
                className={styles.dropTarget}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, target.id)}
              >
                {droppedItems[target.id]?.map(item => (
                  <div 
                    key={item.id} 
                    className={`${styles.droppedItem} ${
                      isCheckingAnswers ? 
                        (item.type === target.type ? styles.correctItem : styles.incorrectItem) 
                        : ''
                    }`}
                    onClick={() => handleRemoveItem(target.id, item.id)}
                  >
                    {item.imageUrl && (
                      <div className={styles.droppedItemImage}>
                        <img src={item.imageUrl} alt={item.text} />
                      </div>
                    )}
                    <span className={styles.droppedItemText}>{item.text}</span>
                    {isCheckingAnswers && (
                      <span className={styles.feedbackIcon}>
                        {item.type === target.type ? (
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.correctIcon} />
                        ) : (
                          <FontAwesomeIcon icon={faTimesCircle} className={styles.incorrectIcon} />
                        )}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.activityControls}>
        <button 
          className={styles.checkButton} 
          onClick={checkAnswers}
          disabled={!dragItems.some(item => item.placed) || isCheckingAnswers}
        >
          Check Answers
        </button>
        <button className={styles.resetButton} onClick={resetActivity}>
          <FontAwesomeIcon icon={faUndo} /> Reset
        </button>
      </div>

      {/* Feedback Message */}
      {feedback.show && (
        <div className={`${styles.feedbackMessage} ${feedback.correct ? styles.correctFeedback : styles.incorrectFeedback}`}>
          <p>{feedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheckCircle, faTimesCircle, faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DragDropProps } from './types';
import styles from './dragdrop.module.css';

interface DragItem {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
  placed: boolean;
  targetId: string;
}

interface Target {
  id: string;
  title: string;
  type: string;
}

export const DragDrop: React.FC<DragDropProps> = ({
  title,
  instruction,
  items,
  targets,
  audioSrc,
  speakText,
  progress = 0,
  onBack,
  onComplete
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [dragItems, setDragItems] = useState<DragItem[]>(
    items.map((item) => ({ 
      ...item, 
      placed: false, 
      targetId: '',
      text: item.text || item.content || '',
    }))
  );
  const [droppedItems, setDroppedItems] = useState<Record<string, DragItem[]>>({});
  const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const initialDropped: Record<string, DragItem[]> = {};
    targets.forEach((target) => {
      initialDropped[target.id] = [];
    });
    setDroppedItems(initialDropped);
  }, [targets]);

  const playAudio = () => {
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || instruction;

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

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('itemId', item.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const draggedItem = dragItems.find((item) => item.id === itemId);
    
    if (!draggedItem || draggedItem.placed) return;
    
    setDragItems(prev => 
      prev.map((item) => 
        item.id === itemId 
          ? { ...item, placed: true, targetId: targetId } 
          : item
      )
    );

    setDroppedItems(prev => ({
      ...prev,
      [targetId]: [...prev[targetId], draggedItem]
    }));

    setFeedback({ show: false, correct: false, message: '' });
  };

  const handleRemoveItem = (targetId: string, itemId: string) => {
    setDroppedItems(prev => ({
      ...prev,
      [targetId]: prev[targetId].filter((item) => item.id !== itemId)
    }));

    setDragItems(prev => 
      prev.map((item) => 
        item.id === itemId 
          ? { ...item, placed: false, targetId: '' } 
          : item
      )
    );

    setFeedback({ show: false, correct: false, message: '' });
    setAllCompleted(false);
  };

  const checkAnswers = () => {
    setIsCheckingAnswers(true);
    let allCorrect = true;
    let message = '';

    const placedItems = dragItems.filter((i) => i.placed);
    const allItemsPlaced = placedItems.length === dragItems.length;

    for (const item of placedItems) {
      const target = targets.find((t) => t.id === item.targetId);
      if (target && item.type !== target.type) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      if (!allItemsPlaced) {
        message = 'Some items are correct, but you need to place all items!';
        setFeedback({ show: true, correct: false, message });
      } else {
        message = 'Great job! All items are correctly sorted!';
        setFeedback({ show: true, correct: true, message });
        setAllCompleted(true);
      }
    } else {
      message = 'Some items are in the wrong category. Try again!';
      setFeedback({ show: true, correct: false, message });
    }

    setTimeout(() => {
      setIsCheckingAnswers(false);
    }, 2000);
  };

  const resetActivity = () => {
    setDragItems(items.map((item) => ({ 
      ...item, 
      placed: false, 
      targetId: '',
      text: item.text || item.content || '',
    })));
    
    const resetDropped: Record<string, DragItem[]> = {};
    targets.forEach((target) => {
      resetDropped[target.id] = [];
    });
    setDroppedItems(resetDropped);

    setFeedback({ show: false, correct: false, message: '' });
    setAllCompleted(false);
  };

  const handleContinue = () => {
    if (onComplete && allCompleted) {
      onComplete();
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress indicator */}
      {typeof progress === 'number' && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.progressText}>{Math.round(progress)}% complete</span>
        </div>
      )}

      <h2 className={styles.title}>{title}</h2>
      
      <div className={styles.instructionBox}>
        <p className={styles.instruction}>{instruction}</p>
        
        {(audioSrc || speakText) && (
          <button 
            className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
            onClick={playAudio}
          >
            <FontAwesomeIcon icon={faHeadphones} />
            <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
          </button>
        )}
      </div>

      <div className={styles.activityArea}>
        <div className={styles.itemsContainer}>
          <h4 className={styles.itemsTitle}>Items</h4>
          <div className={styles.dragItems}>
            <AnimatePresence mode="wait">
              {dragItems.filter((item) => !item.placed).map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.dragItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, item)}
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

        <div className={styles.targetsGrid} style={{ gridTemplateColumns: `repeat(${Math.min(targets.length, 3)}, 1fr)` }}>
          {targets.map((target) => (
            <div key={target.id} className={styles.targetContainer}>
              <h4 className={styles.targetTitle}>{target.title}</h4>
              <div
                className={styles.dropTarget}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, target.id)}
              >
                {droppedItems[target.id]?.map((item) => (
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

      <div className={styles.activityControls}>
        <button 
          className={styles.checkButton} 
          onClick={checkAnswers}
          disabled={!dragItems.some((item) => item.placed) || isCheckingAnswers}
        >
          Check Answers
        </button>
        <button className={styles.resetButton} onClick={resetActivity}>
          <FontAwesomeIcon icon={faUndo} /> Reset
        </button>
      </div>

      {feedback.show && (
        <div className={`${styles.feedbackMessage} ${feedback.correct ? styles.correctFeedback : styles.incorrectFeedback}`}>
          <p>{feedback.message}</p>
        </div>
      )}

      <div className={styles.navigationFooter}>
        {onBack && (
          <button 
            className={styles.navigationButton} 
            onClick={onBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
        {onComplete && (
          <button 
            className={`${styles.navigationButton} ${styles.continueButton} ${allCompleted ? styles.enabledButton : styles.disabledButton}`} 
            onClick={handleContinue}
            disabled={!allCompleted}
          >
            Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheckCircle, faTimesCircle, faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DragDropProps } from './types';
import styles from './dragdrop.module.css';
import Image from 'next/image';
import Confetti from '../../shared/Confetti/Confetti';

interface DragItem {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
  placed: boolean;
  targetId: string;
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const initialDropped: Record<string, DragItem[]> = {};
    targets.forEach((target) => {
      initialDropped[target.id] = [];
    });
    setDroppedItems(initialDropped);
  }, [targets]);

  useEffect(() => {
    if (feedback.show) {
      setShowSnackbar(true);
      const timer = setTimeout(() => {
        setShowSnackbar(false);
        setFeedback(f => ({ ...f, show: false }));
      }, 2500); // Snackbar visible for 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const playAudio = () => {
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = speakText || instruction;

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

  const handleContinueButton = () => {
    const placedItems = dragItems.filter((i) => i.placed);
    const allItemsPlaced = placedItems.length === dragItems.length;
    if (!allItemsPlaced) return;
    let allCorrect = true;
    for (const item of placedItems) {
      const target = targets.find((t) => t.id === item.targetId);
      if (target && item.type !== target.type) {
        allCorrect = false;
        break;
      }
    }
    if (allCorrect) {
      setFeedback({ show: true, correct: true, message: 'Great job! All items are correctly sorted!' });
      setAllCompleted(true);
      setIsCompleted(true);
    } else {
      setFeedback({ show: true, correct: false, message: 'Some items are in the wrong category. Try again!' });
      setTimeout(() => {
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
        setIsCompleted(false);
      }, 1500);
    }
  };

  const handleFinishLesson = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      {onBack && (
        <button className={styles.chooseBackButton} onClick={onBack} aria-label="Go back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className={styles.backText}>Back</span>
        </button>
      )}
      {/* Progress indicator */}
      {typeof progress === 'number' && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.progressText}>{Math.round(progress)}% complete</span>
        </div>
      )}

      <div className={styles.instructionBox}>
        <h2 className={styles.title}>{title}</h2>
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
        {feedback.show && (
          <div
            className={
              `${styles.feedbackMessage} ` +
              `${feedback.correct ? styles.correctFeedback : styles.incorrectFeedback}`
            }
            role="alert"
            aria-live="assertive"
            style={{ marginTop: 16 }}
          >
            {feedback.message}
            {feedback.correct && <Confetti count={40} />}
          </div>
        )}
      </div>
      <div className={styles.activityArea} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <div className={styles.itemsContainer} style={{ flex: 1, marginRight: 32, minHeight: 400 }}>
          <h4 className={styles.itemsTitle}>Items</h4>
          <div className={styles.dragItems}>
            <AnimatePresence mode="wait">
              {(() => {
                const nextItem = dragItems.find((item) => !item.placed);
                if (nextItem) {
                  return (
                    <motion.div
                      key={nextItem.id}
                      className={styles.dragItem}
                      draggable
                      onDragStart={(e: MouseEvent | TouchEvent | PointerEvent) => {
                        const dragEvent = e as unknown as React.DragEvent<HTMLDivElement>;
                        handleDragStart(dragEvent, nextItem);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {nextItem.imageUrl && (
                        <div className={styles.dragItemImage}>
                          <Image src={nextItem.imageUrl} alt={nextItem.text} width={50} height={50} />
                        </div>
                      )}
                      <span className={styles.dragItemText}>{nextItem.text}</span>
                    </motion.div>
                  );
                } else {
                  return (
                    <div className={styles.emptyMessage}>
                      All items placed!
                    </div>
                  );
                }
              })()}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.targetsGrid} style={{ flex: 2, gridTemplateColumns: `repeat(${Math.min(targets.length, 2)}, 1fr)` }}>
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
                    className={`${styles.droppedItem} ${isCheckingAnswers ?
                        (item.type === target.type ? styles.correctItem : styles.incorrectItem)
                        : ''
                      }`}
                    onClick={() => handleRemoveItem(target.id, item.id)}
                  >
                    {item.imageUrl && (
                      <div className={styles.droppedItemImage}>
                        <Image src={item.imageUrl} alt={item.text} width={50} height={50} />
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
        {/* No check/reset buttons, logic is in Continue below */}
      </div>

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
            className={`${styles.navigationButton} ${styles.continueButton} ${dragItems.filter((item) => !item.placed).length === 0 ? styles.enabledButton : styles.disabledButton}`}
            onClick={handleContinueButton}
            disabled={dragItems.filter((item) => !item.placed).length !== 0}
          >
            Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>

      {isCompleted && (
        <div className={styles.congratsOverlay} role="dialog" aria-modal="true" tabIndex={-1}>
          <div className={styles.congratsCard}>
            <Confetti count={40} />
            <div className={styles.congratsTitle}>🎉 You did it!</div>
            <div className={styles.congratsMessage}>Great job! All items are correctly sorted!</div>
            <div className={styles.congratsButtons}>
              <button
                className={styles.congratsButton}
                onClick={() => {
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
                  setIsCompleted(false);
                }}
                autoFocus
              >
                Play Again
              </button>
              <button
                className={styles.congratsButton}
                onClick={handleFinishLesson}
              >
                Finish Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function DragDemo() {
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className={styles.demoContainer}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className={styles.demoBox}
        whileDrag={{ scale: 1.15, rotate: 10, boxShadow: "0 8px 24px rgba(26,162,255,0.25)" }}
        whileTap={{ cursor: "grabbing" }}
      >
        Drag me!
      </motion.div>
    </div>
  );
}

export default DragDrop;
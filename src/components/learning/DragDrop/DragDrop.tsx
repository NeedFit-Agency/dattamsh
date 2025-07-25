'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheckCircle, faTimesCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import { DragDropProps } from './types';
import styles from './dragdrop.module.css';
import Image from 'next/image';
import Confetti from '../../shared/Confetti/Confetti';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import TTS from '../../shared/TTS';

interface DragItem {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
  placed: boolean;
  targetId: string;
}

interface TouchState {
  isDragging: boolean;
  draggedItem: DragItem | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
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
  onComplete,
  isLastLesson = false,
  standard
}) => {
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
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  // Touch state for mobile drag and drop
  const [touchState, setTouchState] = useState<TouchState>({
    isDragging: false,
    draggedItem: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  // Refs for touch handling
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedElementRef = useRef<HTMLDivElement>(null);

  // Detect if device supports touch
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    const initialDropped: Record<string, DragItem[]> = {};
    targets.forEach((target) => {
      initialDropped[target.id] = [];
    });
    setDroppedItems(initialDropped);
  }, [targets]);
  
  // Component initialization

    useEffect(() => {
      if (feedback.show) {
        setShowSnackbar(true);
        const timer = setTimeout(() => {
          setShowSnackbar(false);
          setFeedback(f => ({ ...f, show: false }));
        }, 2000); // Snackbar visible for 0.8 seconds
        return () => clearTimeout(timer);
      }
    }, [feedback]);

    // Reset game immediately after error feedback disappears
    const prevFeedbackShow = useRef(false);
    useEffect(() => {
      if (
        prevFeedbackShow.current &&
        !feedback.show &&
        feedback.correct === false
      ) {
        // Reset the game state
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
      }
      prevFeedbackShow.current = feedback.show;
    }, [feedback.show, feedback.correct, items, targets]);

  // Audio playing functionality for .m4a files
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check if audio should be shown (for grades 1, 2, 3, 4)
  const shouldShowAudio = standard && ['1', '2', '3', '4'].includes(standard);

  // Monitor audio state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('Audio ended');
      setIsAudioPlaying(false);
    };

    const handlePause = () => {
      console.log('Audio paused');
      setIsAudioPlaying(false);
    };

    const handlePlay = () => {
      console.log('Audio started playing');
      setIsAudioPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [audioSrc]);

  const playInstructionAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Audio play failed:', error);
          // Fallback to TTS if audio file fails
          playTTSFallback();
        });
        setIsAudioPlaying(true);
      }
    } else {
      // Fallback to TTS if no audio file
      playTTSFallback();
    }
  };

  const playTTSFallback = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('Speech synthesis not available');
      return;
    }

    window.speechSynthesis.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = speakText;

    if (!textToSpeak) {
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.5;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsAudioPlaying(true);
      };
      
      utterance.onend = () => {
        setIsAudioPlaying(false);
      };

      utterance.onerror = (e) => {
        console.error("SpeechSynthesis Error:", e);
        setIsAudioPlaying(false);
      };
      
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
      
    } catch (e) {
      console.error("SpeechSynthesis failed:", e);
      setIsAudioPlaying(false);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, item: DragItem) => {
    if (!isTouchDevice) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    setTouchState({
      isDragging: true,
      draggedItem: item,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });
    
    // Add visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.95)';
    target.style.opacity = '0.8';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDevice || !touchState.isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));
    
    // Add visual feedback for drop targets
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementUnderTouch) {
      const dropTarget = elementUnderTouch.closest(`[data-drop-target]`);
      if (dropTarget) {
        dropTarget.classList.add('touchActive');
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isTouchDevice || !touchState.isDragging || !touchState.draggedItem) return;
    
    e.preventDefault();
    
    // Remove visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = '';
    target.style.opacity = '';
    
    // Remove touch active class from all drop targets
    document.querySelectorAll('[data-drop-target]').forEach(el => {
      el.classList.remove('touchActive');
    });
    
    // Find the drop target under the touch point
    const touch = e.changedTouches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementUnderTouch) {
      const dropTarget = elementUnderTouch.closest(`[data-drop-target]`);
      if (dropTarget) {
        const targetId = dropTarget.getAttribute('data-drop-target');
        if (targetId) {
          handleDropItem(touchState.draggedItem, targetId);
        }
      }
    }
    
    // Reset touch state
    setTouchState({
      isDragging: false,
      draggedItem: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  };

  // Handle touch cancel (when touch is interrupted)
  const handleTouchCancel = (e: React.TouchEvent) => {
    if (!isTouchDevice) return;
    
    e.preventDefault();
    
    // Remove visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = '';
    target.style.opacity = '';
    
    // Remove touch active class from all drop targets
    document.querySelectorAll('[data-drop-target]').forEach(el => {
      el.classList.remove('touchActive');
    });
    
    // Reset touch state
    setTouchState({
      isDragging: false,
      draggedItem: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  };

  // Handle dropping an item (used by both drag and touch)
  const handleDropItem = (item: DragItem, targetId: string) => {
    if (item.placed) return;

    const updatedDragItems = dragItems.map((dragItem) =>
      dragItem.id === item.id
        ? { ...dragItem, placed: true, targetId: targetId }
        : dragItem
    );

    setDragItems(updatedDragItems);

    setDroppedItems(prev => ({
      ...prev,
      [targetId]: [...prev[targetId], item]
    }));

    setFeedback({ show: false, correct: false, message: '' });

    // Check if all items are placed
    const allItemsPlaced = updatedDragItems.every(dragItem => dragItem.placed);
    if (allItemsPlaced) {
      // Check if all items are correctly placed
      let allCorrect = true;
      for (const dragItem of updatedDragItems) {
        const target = targets.find((t) => t.id === dragItem.targetId);
        if (target && dragItem.type !== target.type) {
          allCorrect = false;
          break;
        }
      }

      if (allCorrect) {
        const successMessage = 'Great job! All items are correctly sorted!';
        setFeedback({ show: true, correct: true, message: successMessage });
        setAllCompleted(true);
        
        // Show congratulations screen after a short delay
        setTimeout(() => {
          setShowCongratulations(true);
        }, 2000);
      } else {
        let errorMessage = 'Oops, something went wrong. Try again';
        setFeedback({ show: true, correct: false, message: errorMessage });
      }
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

    handleDropItem(draggedItem, targetId);
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

  // Reset function for Try Again button
  const handleReset = () => {
    // Stop any ongoing speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsAudioPlaying(false);
    setShowCongratulations(false);
    setAllCompleted(false);
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
    setTouchState({
      isDragging: false,
      draggedItem: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  };

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Audio element for .m4a files */}
      {shouldShowAudio && audioSrc && (
        <audio 
          ref={audioRef} 
          src={audioSrc}
          onError={() => {
            console.error('Audio file failed to load');
            setIsAudioPlaying(false);
          }}
        />
      )}
      
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : handleReset}
        onTryAgainClick={handleReset}
        showTryAgain={true}
        buttonText={isLastLesson ? 'Next Course' : 'Next Chapter'}
        tryAgainText="Play Again"
      />

      <div className={styles.instructionBox}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.instruction}>{instruction}</p>
        <div className={styles.buttonGroup}>
          <div className={styles.leftButtons}>
            {shouldShowAudio && (
              <button
                className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Button clicked!');
                  playInstructionAudio();
                }}
                type="button"
              >
                <FontAwesomeIcon icon={faHeadphones} />
                <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
              </button>
            )}
          </div>
          <button
            className={styles.resetButton}
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faUndo} />
            <span>Reset</span>
          </button>
        </div>
        {feedback.show && (
          <div
            className={
              `${styles.feedbackMessage} ` +
              `${feedback.correct ? styles.correctFeedback : styles.incorrectFeedback}`
            }
            role="alert"
            aria-live="assertive"
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
                const unplacedItems = dragItems.filter((item) => !item.placed);
                
                if (unplacedItems.length > 0) {
                  // Show exactly 3 items on mobile, 1 on desktop
                  const itemsToShow = isTouchDevice ? 
                    unplacedItems.slice(0, 3) : 
                    unplacedItems.slice(0, 1);
                  
                  return itemsToShow.map((item) => (
                    <motion.div
                      key={item.id}
                      className={styles.dragItem}
                      draggable={!isTouchDevice}
                      onDragStart={!isTouchDevice ? (e: MouseEvent | TouchEvent | PointerEvent) => {
                        const dragEvent = e as unknown as React.DragEvent<HTMLDivElement>;
                        handleDragStart(dragEvent, item);
                      } : undefined}
                      onTouchStart={isTouchDevice ? (e: React.TouchEvent) => handleTouchStart(e, item) : undefined}
                      onTouchMove={isTouchDevice ? handleTouchMove : undefined}
                      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
                      onTouchCancel={isTouchDevice ? handleTouchCancel : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.imageUrl && (
                        <div className={styles.dragItemImage}>
                          <Image src={item.imageUrl} alt={item.text} width={50} height={50} />
                        </div>
                      )}
                      <span className={styles.dragItemText}>{item.text}</span>
                    </motion.div>
                  ));
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
                data-drop-target={target.id}
                onDragOver={!isTouchDevice ? handleDragOver : undefined}
                onDrop={!isTouchDevice ? (e) => handleDrop(e, target.id) : undefined}
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

      <div className={styles.feedbackContainer}>
        {/* Visual feedback for correct/incorrect drops can be added here */}
      </div>
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
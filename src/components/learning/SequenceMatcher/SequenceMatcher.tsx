import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './SequenceMatcher.module.css';
import { SequenceMatcherProps, DraggableItem } from './types';
import Confetti from '../../shared/Confetti/Confetti';

export interface SequenceMatcherImperativeHandle {
  checkAnswer: () => boolean;
  resetGame: () => void;
}

const SequenceMatcher = forwardRef<SequenceMatcherImperativeHandle, SequenceMatcherProps>(function SequenceMatcher({ 
  title = 'Arrange the Steps in the Correct Order!',
  items = [],
  dropZoneCount = 4,
  correctOrder = [],
  onComplete,
  onIncorrectAttempt
}, ref) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<{[zoneIndex: number]: DraggableItem}>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' });
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const draggedElementRef = useRef<HTMLElement | null>(null);

  // Get items that are not yet placed in drop zones
  const availableItems = items.filter((item: DraggableItem) => 
    !Object.values(placedItems).some((placedItem) => placedItem.id === item.id)
  );

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, item: DraggableItem) => {
    setDraggedItemId(item.id);
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
    const draggingElement = e.currentTarget as HTMLElement;
    draggedElementRef.current = draggingElement;
    draggingElement.classList.add(styles.dragging);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (draggedElementRef.current) {
      draggedElementRef.current.classList.remove(styles.dragging);
    }
    setDraggedItemId(null);
    draggedElementRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent, zoneIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget as HTMLElement;
    // Only add drag-over style if the zone is empty
    if (!placedItems[zoneIndex]) {
      target.classList.add(styles.dragOver);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(styles.dragOver);
  };

  const handleDrop = (e: React.DragEvent, zoneIndex: number) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(styles.dragOver);
    if (!draggedItemId) return;
    // Prevent dropping into a filled slot
    if (placedItems[zoneIndex]) return;
    const draggedItem = items.find((item) => item.id === draggedItemId);
    if (!draggedItem) return;
    // Place the item in the drop zone
    setPlacedItems((prev) => ({ ...prev, [zoneIndex]: draggedItem }));
    // Clear any existing feedback when placing items
    setFeedback({ type: null, message: '' });
  };

  // Handle dropping back to the draggable items area
  const handleDropToDraggableArea = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(styles.dragOver);
    if (!draggedItemId) return;
    // Remove item from any drop zone it was in
    const newPlacedItems = { ...placedItems };
    Object.keys(newPlacedItems).forEach((key) => {
      if (newPlacedItems[parseInt(key)].id === draggedItemId) {
        delete newPlacedItems[parseInt(key)];
      }
    });
    setPlacedItems(newPlacedItems);
  };

  // Check Answer Logic (for ref and internal use)
  const checkAnswer = () => {
    const placedCount = Object.keys(placedItems).length;
    if (placedCount < correctOrder.length) {
      setFeedback({ type: 'incorrect', message: 'Please place all items before checking!' });
      return false;
    }
    let isAllCorrect = true;
    const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
    dropZones.forEach((zone) => {
      zone.classList.remove(styles.slotCorrect, styles.slotIncorrect);
    });
    Object.entries(placedItems).forEach(([zoneIndexStr, item]) => {
      const zoneIndex = parseInt(zoneIndexStr);
      const expectedItemId = correctOrder[zoneIndex];
      const zone = dropZones[zoneIndex] as HTMLElement;
      if (item.id === expectedItemId) {
        zone.classList.add(styles.slotCorrect);
      } else {
        zone.classList.add(styles.slotIncorrect);
        isAllCorrect = false;
      }
    });
    if (isAllCorrect) {
      setFeedback({ type: 'correct', message: 'Perfect! You got it right!' });
      setShowTryAgain(true);
      setIsCompleted(true);
      return true;
    } else {
      setFeedback({ type: 'incorrect', message: 'Not quite, check the highlighted steps.' });
      setShowTryAgain(true);
      setIsCompleted(false);
      if (onIncorrectAttempt) {
        onIncorrectAttempt();
      }
      return false;
    }
  };

  // Reset Game Logic (for ref and internal use)
  const resetGame = () => {
    setPlacedItems({});
    setFeedback({ type: null, message: '' });
    setShowTryAgain(false);
    setIsCompleted(false);
    const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
    dropZones.forEach((zone) => {
      zone.classList.remove(styles.slotCorrect, styles.slotIncorrect, styles.dragOver);
    });
  };

  // Expose imperative methods to parent
  useImperativeHandle(ref, () => ({
    checkAnswer,
    resetGame,
  }), [placedItems, correctOrder, onIncorrectAttempt]);

  // Helper functions to get styling and icons for items
  const getItemStyleClass = (item: DraggableItem) => {
    switch (item.id) {
      case 'step-open':
      case 'open':
        return styles.stepOpen;
      case 'step-start':
      case 'start':
        return styles.stepStart;
      case 'step-type':
      case 'type':
        return styles.stepType;
      case 'step-save':
      case 'save':
        return styles.stepSave;
      default:
        return styles.stepOpen; // Default style
    }
  };

  const getItemIcon = (item: DraggableItem) => {
    switch (item.id) {
      case 'step-open':
      case 'open':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.9-2-2-2h-8l-2-2z"></path>
          </svg>
        );
      case 'step-start':
      case 'start':
        return (
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"></path>
          </svg>
        );
      case 'step-type':
      case 'type':
        return (
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path>
          </svg>
        );
      case 'step-save':
      case 'save':
        return (
          <svg viewBox="0 0 20 20">
            <path d="M15.833 2.5H4.167A1.667 1.667 0 0 0 2.5 4.167v11.666A1.667 1.667 0 0 0 4.167 17.5h11.666A1.667 1.667 0 0 0 17.5 15.833V4.167A1.667 1.667 0 0 0 15.833 2.5zM10 14.167a1.667 1.667 0 1 1 0-3.334 1.667 1.667 0 0 1 0 3.334zm3.333-8.334H5.833V4.167h7.5v1.666z"></path>
          </svg>
        );
      default:
        return <div>📄</div>; // Default icon
    }
  };

  return (
    <div className={styles.container}>
      {isCompleted && feedback.type === 'correct' && (
        <div className={styles.congratsOverlay} role="dialog" aria-modal="true" tabIndex={-1}>
          <div className={styles.congratsCard}>
            <Confetti count={40} />
            <div className={styles.congratsTitle}>🎉 You did it!</div>
            <div className={styles.congratsMessage}>Perfect! You got it right!</div>
            <div className={styles.congratsButtons}>
              <button
                className={styles.congratsButton}
                onClick={() => {
                  if (onComplete) onComplete();
                }}
                autoFocus
              >
                Finish Lesson
              </button>
              <button
                className={styles.congratsButton}
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.worksheetCard}>
        <span className={styles.gearIcon}>⚙️</span>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.mainContent}>
          <div className={styles.dropTargets}>
            <h3>Drop Zones</h3>
            {Array.from({ length: dropZoneCount }, (_, index) => (
              <div 
                key={index}
                className={styles.dropZone} 
                data-index={index}
                data-number={index + 1} /* Add sequence number (1-based) */
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
              >
                {placedItems[index] && (
                  <div 
                    className={`${styles.stepItem} ${getItemStyleClass(placedItems[index])}`}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, placedItems[index])}
                    onDragEnd={handleDragEnd}
                    data-id={placedItems[index].id}
                    style={{'--item-index': index} as React.CSSProperties}
                  >
                    <span className={styles.stepIcon}>
                      {getItemIcon(placedItems[index])}
                    </span>
                    <span>{placedItems[index].content}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.centerContent}>
            <div className={styles.centerMascot}>
              <img src="/images/mascot-small.png" alt="Mascot" />
            </div>
            <div className={styles.centerConnector}></div>
            <span className={styles.centerSparkle}>✨</span>
          </div>

          <div 
            className={styles.draggableItems}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add(styles.dragOver);
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove(styles.dragOver);
            }}
            onDrop={handleDropToDraggableArea}
          >
            <h3>Steps</h3>
            {availableItems.map((item: DraggableItem, index: number) => (
              <div 
                key={item.id}
                className={`${styles.stepItem} ${getItemStyleClass(item)}`}
                draggable="true" 
                data-id={item.id}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                style={{'--item-index': index} as React.CSSProperties}
              >
                <span className={styles.stepIcon}>
                  {getItemIcon(item)}
                </span>
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centered feedback message below main content */}
        {feedback.message && (
          <div className={styles.centeredFeedbackMessage} aria-live="polite">
             {feedback.message}
          </div>
        )}

        <button 
          className={`${styles.actionButton} ${styles.tryAgainBtn}`}
          onClick={resetGame}
          style={{ display: showTryAgain && !(isCompleted && feedback.type === 'correct') ? 'inline-flex' : 'none' }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
});

export default SequenceMatcher;

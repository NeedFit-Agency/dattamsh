import React, { useState, useRef } from 'react';
import styles from './SequenceMatcher.module.css';
import { SequenceMatcherProps, DraggableItem } from './types';

const SequenceMatcher: React.FC<SequenceMatcherProps> = ({ 
  title = 'Arrange the Steps in the Correct Order!',
  items = [],
  dropZoneCount = 4,
  correctOrder = [],
  onComplete,
  onIncorrectAttempt
}) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<{[zoneIndex: number]: DraggableItem}>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' });
  const [showTryAgain, setShowTryAgain] = useState(false);
  const draggedElementRef = useRef<HTMLElement | null>(null);

  // Get items that are not yet placed in drop zones
  const availableItems = items.filter(item => 
    !Object.values(placedItems).some(placedItem => placedItem.id === item.id)
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

    const draggedItem = items.find(item => item.id === draggedItemId);
    if (!draggedItem) return;

    // Place the item in the drop zone
    setPlacedItems(prev => ({ ...prev, [zoneIndex]: draggedItem }));
    
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
    Object.keys(newPlacedItems).forEach(key => {
      if (newPlacedItems[parseInt(key)].id === draggedItemId) {
        delete newPlacedItems[parseInt(key)];
      }
    });
    setPlacedItems(newPlacedItems);
  };

  // Check Answer Logic
  const checkAnswer = () => {
    const placedCount = Object.keys(placedItems).length;
    
    if (placedCount < correctOrder.length) {
      setFeedback({ type: 'incorrect', message: 'Please place all items before checking!' });
      return;
    }

    let isAllCorrect = true;
    const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
    
    // Clear previous feedback classes
    dropZones.forEach(zone => {
      zone.classList.remove(styles.slotCorrect, styles.slotIncorrect);
    });

    // Check each placed item against correct order
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
      if (onComplete) {
        setTimeout(() => onComplete(), 1500);
      }
    } else {
      setFeedback({ type: 'incorrect', message: 'Not quite, check the highlighted steps.' });
      setShowTryAgain(true);
      if (onIncorrectAttempt) {
        onIncorrectAttempt();
      }
    }
  };

  // Reset Game Logic
  const resetGame = () => {
    setPlacedItems({});
    setFeedback({ type: null, message: '' });
    setShowTryAgain(false);
    
    // Clear visual feedback
    const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
    dropZones.forEach(zone => {
      zone.classList.remove(styles.slotCorrect, styles.slotIncorrect, styles.dragOver);
    });
  };

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
            <h3>Available Items</h3>
            {availableItems.map((item, index) => (
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

        <div className={`${styles.feedbackMessage} ${
          feedback.type === 'correct' ? styles.feedbackCorrect : 
          feedback.type === 'incorrect' ? styles.feedbackIncorrect : ''
        }`}>
          {feedback.message}
        </div>

        <button 
          className={`${styles.actionButton} ${styles.checkAnswerBtn}`}
          onClick={checkAnswer}
          style={{ display: showTryAgain ? 'none' : 'inline-flex' }}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Check Answer</span>
        </button>
        
        <button 
          className={`${styles.actionButton} ${styles.tryAgainBtn}`}
          onClick={resetGame}
          style={{ display: showTryAgain ? 'inline-flex' : 'none' }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default SequenceMatcher;

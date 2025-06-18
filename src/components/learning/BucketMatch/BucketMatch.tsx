'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BucketMatchProps, Item, Bucket } from './types';
import styles from './bucketmatch.module.css';
import { itemSvgMap, BasketSvg } from './ItemSvgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Confetti from '../../shared/Confetti/Confetti';

// Helper to get the SVG for a fruit based on its type/color
const getFruitSvg = (itemType: string, imageUrl?: string) => {
  if (imageUrl) {
    return <img src={imageUrl} alt={itemType} style={{width: '100%', height: '100%', objectFit: 'contain'}} />;
  }
  
  // Use the dynamic SVG component from the map if available
  const SvgComponent = itemSvgMap[itemType];
  if (SvgComponent) {
    return <SvgComponent />;
  }
  
  return <div>{itemType}</div>; // Simple text fallback
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className={styles.chooseBackButton} onClick={onClick} aria-label="Go back">
    <FontAwesomeIcon icon={faArrowLeft} />
    <span className={styles.backText}>Back</span>
  </button>
);

export const BucketMatch: React.FC<BucketMatchProps> = ({
  title = 'Match the Following', // Default title
  instruction,
  items = [], // Default to empty array
  buckets = [], // Default to empty array
  audioSrc,
  progress,
  onBack,
  onComplete,
  successMessage = 'Great Job! You matched them all!',
  correctMessage = 'Correct!',
  tryAgainMessage = 'Try Again!',
  resetLabel = 'Reset Game',
  playAgainLabel = 'Play Again'
}) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  // Store item id and its target bucket id for items placed in buckets
  const [placedItems, setPlacedItems] = useState<{[itemId: string]: string}>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, bucketId?: string }>({ type: null });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const allItemsCount = items.length;
  const matchedItemsCount = Object.keys(placedItems).length;
  const allItemsMatched = allItemsCount > 0 && matchedItemsCount === allItemsCount;

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    setDraggedItemId(item.id);
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
    const draggingElement = e.currentTarget as HTMLElement;
    draggingElement.classList.add(styles.dragging);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (draggedItemId) {
        const draggingElement = document.getElementById(`fruit-${draggedItemId}`);
        if(draggingElement) draggingElement.classList.remove(styles.dragging);
    }
    setDraggedItemId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget as HTMLElement;
    // Check if the bucket is not already correctly filled
    const bucketId = target.dataset.bucketId;
    const isBucketFilledCorrectly = Object.values(placedItems).includes(bucketId || '');
    if (!isBucketFilledCorrectly) {
        target.classList.add(styles.dragOver);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(styles.dragOver);
  };
  const handleDrop = (e: React.DragEvent, targetBucket: Bucket) => {
    e.preventDefault();
    const targetBucketElement = e.currentTarget as HTMLElement;
    targetBucketElement.classList.remove(styles.dragOver);

    if (!draggedItemId) return;

    // Check if this bucket already has a correct item
    if (Object.values(placedItems).includes(targetBucket.id)) return;

    const draggedItem = items.find(item => item.id === draggedItemId);

    if (!draggedItem) return;

    const isCorrect = draggedItem.type === targetBucket.type;

    if (isCorrect) {
      // Store the placement in state
      setPlacedItems(prev => ({ ...prev, [draggedItem.id]: targetBucket.id }));
      setFeedback({ type: 'correct', bucketId: targetBucket.id });
      targetBucketElement.classList.add(styles.correct);
      
      // Play success audio if available
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Remove feedback message after a delay, unless all items are matched
      const updatedItemCount = Object.keys(placedItems).length + 1;
      if (updatedItemCount < allItemsCount) {
        setTimeout(() => setFeedback({ type: null }), 1500);
      }

    } else {
      setFeedback({ type: 'incorrect', bucketId: targetBucket.id });
      targetBucketElement.classList.add(styles.incorrect);
      setTimeout(() => {
        targetBucketElement.classList.remove(styles.incorrect);
        setFeedback({ type: null });
      }, 1000);
    }
    // Dragged item ID is cleared in handleDragEnd
  };
  const createConfetti = () => {
    // Add 30 confetti elements to celebrate success
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = styles.confetti;
        
        // Random colors for confetti
        const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3', '#E91E63', '#9C27B0'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position and animation duration
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = '1';
        
        // Append to document body
        document.body.appendChild(confetti);
        
        // Remove after animation completes
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }, i * 150); // Stagger the confetti creation
    }
  };
  useEffect(() => {
    if (allItemsMatched) {
      setFeedback({ type: 'correct' });
      createConfetti();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log("Success audio play failed:", e));
      }
      setIsCompleted(true);
      // Do NOT call onComplete here
    } else {
      setIsCompleted(false);
    }
  }, [allItemsMatched]);
  const handleReset = () => {
    // Reset state
    setPlacedItems({});
    setFeedback({ type: null });
    setDraggedItemId(null);
    
    // Remove all visual classes
    document.querySelectorAll(`.${styles.basketDropzone}`).forEach(el => {
      el.classList.remove(styles.correct, styles.incorrect, styles.dragOver);
    });
    
    // Re-enable draggable items
    document.querySelectorAll(`.${styles.fruitDraggable}`).forEach(el => {
      el.setAttribute('draggable', 'true');
    });
      // Reset any instruction text visibility
    document.querySelectorAll(`.${styles.bucketInstructionText}`).forEach(el => {
      (el as HTMLElement).style.opacity = '1';
    });
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleFinishLesson = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className={styles.container}>
      {isCompleted && (
        <div className={styles.congratsOverlay} role="dialog" aria-modal="true" tabIndex={-1}>
          <div className={styles.congratsCard}>
            <Confetti count={40} />
            <div className={styles.congratsTitle}>🎉 You did it!</div>
            <div className={styles.congratsMessage}>{successMessage}</div>
            <div className={styles.congratsButtons}>
              <button
                className={styles.congratsButton}
                onClick={handleReset}
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
      <div className={styles.worksheetCard}>
        {onBack && (
          <div className={styles.header}>
            {title && <h2 className={styles.mainTitle}>{title}</h2>}
            {audioSrc && (
              <>
                <button
                  className={styles.audioButton}
                  onClick={playAudio}
                  aria-label="Play audio"
                >
                  <img src="/images/sound.png" alt="Play sound" style={{ width: 24, height: 24 }} />
                </button>
                <audio ref={audioRef} src={audioSrc} />
              </>
            )}
          </div>
        )}
        {typeof progress !== 'undefined' && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{progress}%</span>
          </div>
        )}
        {instruction && <p className={styles.instruction}>{instruction}</p>}
        <div className={styles.matchArea}>
          <div className={styles.fruitsRow} role="list" aria-label="Draggable fruits">
            {items.map((item) => (
              <div
                key={item.id}
                className={`${styles.fruitItem} ${placedItems[item.id] ? styles.placed : ''}`}
                data-source-color={item.type}
                role="listitem"
              >
                <div
                  id={`fruit-${item.id}`}
                  className={styles.fruitDraggable}
                  draggable={!placedItems[item.id]}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  data-color={item.type}
                  title={item.text || item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  aria-label={`Draggable fruit: ${item.text}`}
                >
                  {getFruitSvg(item.type, item.imageUrl)}
                </div>
                <p className={styles.colorName}>{item.text || item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className={styles.bucketsRow} role="list" aria-label="Color buckets">
            {buckets.map((bucket) => {
              const isCorrectlyFilled = Object.entries(placedItems).some(([itemId, bId]) =>
                bId === bucket.id && items.find(i => i.id === itemId)?.type === bucket.type
              );
              const itemInThisBucket = items.find(i => placedItems[i.id] === bucket.id);
              return (
                <div key={bucket.id} className={styles.bucketContainer} role="listitem">
                  <div
                    data-bucket-id={bucket.id}
                    className={`${styles.basketDropzone} ${isCorrectlyFilled ? styles.correct : ''} ${feedback.bucketId === bucket.id && feedback.type === 'incorrect' ? styles.incorrect : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, bucket)}
                    data-target-color={bucket.type}
                    aria-label={`Drop zone for ${bucket.title}`}
                    role="region"
                  >
                    <BasketSvg />
                    {!itemInThisBucket && (
                      <div className={styles.bucketInstructionText}>
                        Drop here
                      </div>
                    )}
                    {itemInThisBucket && isCorrectlyFilled && (
                      <div className={styles.droppedFruit}>
                        {getFruitSvg(itemInThisBucket.type, itemInThisBucket.imageUrl)}
                      </div>
                    )}
                  </div>
                  <p className={styles.bucketLabel}>{bucket.title || bucket.type.charAt(0).toUpperCase() + bucket.type.slice(1)}</p>
                </div>
              );
            })}
          </div>
          {/* Centered feedback message in the empty space below buckets when completed */}
          {allItemsMatched && (
            <div className={styles.centeredFeedbackMessage} aria-live="polite">
              {successMessage}
            </div>
          )}
        </div>
        <div className={styles.feedbackActions}>
          <div
            id="feedback-message"
            className={`${styles.feedbackMessage} ${feedback.type === 'correct' ? styles.correctText : feedback.type === 'incorrect' ? styles.incorrectText : ''}`}
            aria-live="polite"
            style={{ marginBottom: '2.5rem' }}
          >
            {!allItemsMatched && (
              feedback.type === 'correct' && !Object.values(placedItems).includes(feedback.bucketId || '') ? correctMessage :
                feedback.type === 'incorrect' ? tryAgainMessage : ''
            )}
          </div>
          {(allItemsCount > 0 && !allItemsMatched) && (
            <button
              id="reset-button"
              className={styles.resetButton}
              onClick={handleReset}
              style={{ display: (matchedItemsCount > 0) ? 'block' : 'none' }}
            >
              {resetLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketMatch;
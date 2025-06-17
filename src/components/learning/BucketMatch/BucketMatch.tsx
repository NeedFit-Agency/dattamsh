'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BucketMatchProps, Item, Bucket } from './types';
import styles from './bucketmatch.module.css';
import { itemSvgMap, BasketSvg } from './ItemSvgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      setPlacedItems(prev => ({ ...prev, [draggedItem.id]: targetBucket.id }));
      setFeedback({ type: 'correct', bucketId: targetBucket.id });
      targetBucketElement.classList.add(styles.correct);
      
      // Remove feedback message after a delay, unless all items are matched
      if (Object.keys(placedItems).length + 1 < allItemsCount) {
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

  useEffect(() => {
    if (allItemsMatched) {
      setFeedback({ type: 'correct' }); // General success feedback
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 1000); // Delay completion call slightly for feedback visibility
      }
    }
  }, [allItemsMatched, onComplete]);

  const handleReset = () => {
    setPlacedItems({});
    setFeedback({ type: null });
    setDraggedItemId(null);
    document.querySelectorAll(`.${styles.basketDropzone}`).forEach(el => {
      el.classList.remove(styles.correct, styles.incorrect, styles.dragOver);
    });
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className={styles.container}>
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
      
      <div className={styles.worksheetCard}>
        {instruction && <p className={styles.instruction}>{instruction}</p>}

        <div className={styles.matchArea}>
          <div className={styles.fruitsContainer}>
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`${styles.fruitItem} ${placedItems[item.id] ? styles.placed : ''}`}
                data-source-color={item.type}
              >
                <div
                  id={`fruit-${item.id}`}
                  className={styles.fruitDraggable}
                  draggable={!placedItems[item.id]}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  data-color={item.type}
                >
                  {getFruitSvg(item.type, item.imageUrl)}
                </div>
                <p className={styles.colorName}>{item.text || item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
              </div>
            ))}
          </div>

          <div className={styles.basketsContainer}>
            {buckets.map((bucket) => {
              const isCorrectlyFilled = Object.entries(placedItems).some(([itemId, bId]) => 
                bId === bucket.id && items.find(i => i.id === itemId)?.type === bucket.type
              );
              const itemInThisBucket = items.find(i => placedItems[i.id] === bucket.id);              return (
                <div key={bucket.id} className={styles.bucketContainer}>
                  <div
                    data-bucket-id={bucket.id}
                    className={`${styles.basketDropzone} ${isCorrectlyFilled ? styles.correct : ''} ${feedback.bucketId === bucket.id && feedback.type === 'incorrect' ? styles.incorrect : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, bucket)}
                    data-target-color={bucket.type}
                  >
                    <BasketSvg />
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
        </div>        <div 
            id="feedback-message" 
            className={`${styles.feedbackMessage} ${feedback.type === 'correct' ? styles.correctText : feedback.type === 'incorrect' ? styles.incorrectText : ''}`}
        >
          {allItemsMatched ? successMessage : 
           feedback.type === 'correct' && !Object.values(placedItems).includes(feedback.bucketId || '') ? correctMessage : 
           feedback.type === 'incorrect' ? tryAgainMessage : ''}
        </div>        {(allItemsCount > 0) && (
          <button
            id="reset-button"
            className={styles.resetButton}
            onClick={handleReset}
            style={{ display: (matchedItemsCount > 0 || allItemsMatched) ? 'block' : 'none' }}
          >
            {allItemsMatched ? playAgainLabel : resetLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default BucketMatch;
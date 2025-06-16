'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BucketMatchProps, Item, Bucket } from './types'; // Assuming types are defined
import styles from './bucketmatch.module.css';

// Helper to get the SVG for a fruit based on its type/color
const getFruitSvg = (itemType: string, imageUrl?: string) => {
  if (imageUrl) {
    return <img src={imageUrl} alt={itemType} style={{width: '100%', height: '100%', objectFit: 'contain'}} />;
  }
  switch (itemType) {
    case 'red':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="M85,42.5c0,17-14.8,32.3-35,32.3S15,59.5,15,42.5C15,25.4,32.4,15,50,15S85,25.4,85,42.5z" fill="#D72828"/><path d="M50,15c-1.1,0-2.2,0-3.3,0.1c-1.4-2-3.3-3.6-5.4-4.8c-2.4-1.3-5-2-7.7-2c-5.9,0-11,2.8-14.3,7.2 c-2.4,3.2-3.8,7.3-3.8,11.5c0,0.5,0,1,0.1,1.5c-4,3.4-6.5,8.3-6.5,13.8C10.1,56.5,23.4,69.8,39.2,74.5c4,1.2,8.2,1.8,12.6,1.8 c1,0,2-0.1,3-0.1c16.3-1.6,29.3-14.4,30.2-30.8C85,44.2,85,43.3,85,42.5C85,25.4,69.5,15,50,15z" fill="#EA4D4D"/><path d="M60,11.3c0,0,5.7-2.6,9.4,0s4.2,7.3,0.8,9.7s-8.1,0.2-8.1,0.2s-2.9-4.7,0.4-8.1S60,11.3,60,11.3z" fill="#4CAF50"/><path d="M50,15c-3.2,0-6.2,0.6-9.1,1.7c-0.1,0-0.2,0-0.2,0.1c-2,0.7-3.9,1.8-5.5,3.2c-0.1,0.1-0.2,0.2-0.3,0.3 c-2.9,2.8-4.8,6.6-5.1,10.7c0,0.1,0,0.3,0,0.4c-0.1,1.5-0.2,3.1-0.2,4.6c0,1,0.1,2,0.2,3c0,0.1,0,0.2,0,0.3 C30.1,52,38.8,59.8,50,59.8c11.2,0,20.2-7.5,22.3-17.5c0.1-0.3,0.1-0.6,0.1-0.8c0-0.3,0-0.5,0-0.8c0-1.9-0.2-3.8-0.6-5.7 c-0.1-0.3-0.1-0.5-0.2-0.8c-0.8-3.7-2.6-7.1-5.2-9.8C63.8,22,60.1,20,56,18.9c-1.3-0.4-2.7-0.6-4-0.8C51.3,16.6,50.7,15,50,15z" fill="#F48A8A"/></g></svg>
      );
    case 'yellow':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="M78.6,67.7C75.2,76.1,65.5,81.4,56,80.2c-15.5-2-29-15-32.8-30.4C19.3,34.4,29,20.1,40,16.5 c2.7-0.9,5.5-1.1,8.3-0.9C64.6,18.5,76.5,37.6,78.6,55C79,59.2,79.1,63.5,78.6,67.7z" fill="#FFEB3B"/><path d="M48.3,15.6c-4.4-0.4-8.7,1.2-11.7,4.5c-3.1,3.3-4.5,7.9-3.9,12.4c1.2,9.9,9.9,19.3,19.9,20.8 C65.5,55.5,75,44.9,76.2,32c0.2-2.1,0-4.3-0.6-6.3c-1.2-4.1-4.2-7.5-8.2-9c-2.9-1.1-6-1.1-8.9-0.2C55.4,17.4,51.8,16.2,48.3,15.6z" fill="#FDD835"/><path d="M43.9,16c-0.3,0-0.7,0-1,0.1c-1.4,0.4-2.7,1.1-3.7,2.1c-0.2,0.2-0.3,0.3-0.5,0.5c-1.6,1.8-2.6,4-3,6.3 c0,0.2-0.1,0.3-0.1,0.5c-0.1,0.6-0.2,1.2-0.2,1.8c0,0.3,0,0.5,0,0.8c0.4,4.2,2.8,8.2,6.5,10.6c3.7,2.4,8.1,2.9,12.3,1.7 c5.8-1.7,10-6.7,11.2-12.5c0.1-0.3,0.1-0.5,0.1-0.8c0-0.1,0-0.2,0-0.3c0.1-0.8,0.1-1.5,0-2.3c-0.1-0.8-0.2-1.6-0.4-2.4 c-0.1-0.3-0.2-0.6-0.3-0.9c-0.5-2-1.5-3.8-2.8-5.4c-1.7-2-3.9-3.4-6.4-4.1C50.5,17.2,47.3,16,43.9,16z" fill="#FFF176"/><path d="M43.6,15.9c0.9-2.3,3.3-3.8,5.9-3.8c3.2,0,5.9,2.2,6.6,5.2c0.1,0.5,0.2,1,0.2,1.6c0,2.1-0.5,4.1-1.4,5.9 c-0.6,1.1-1.3,2.1-2.2,3c-2.5,2.5-6.1,3.8-9.7,3.1C46,30.3,43,26.9,43,23C43,20.5,43.1,18.1,43.6,15.9z" fill="#6D4C41"/><path d="M78.6,67.7c-0.1,1-0.3,2-0.5,3c-0.5,1.8-1.2,3.6-2,5.3c-2.8,5.8-7.9,10-14,11.7c-1,0.3-2,0.5-3,0.7 c-3.3,0.7-6.7,0.4-9.9-0.6c-4.4-1.4-8.3-4-11.4-7.5c-2.1-2.4-3.8-5.1-5.1-7.9c-0.3-0.8-0.7-1.6-1-2.4C26.1,59.3,24.1,48,27.1,38 c1.2-4.1,3.4-7.8,6.5-10.8c2.1-2.1,4.6-3.7,7.2-4.8c0.7-0.3,1.3-0.5,2-0.7c0.4-0.1,0.8-0.2,1.2-0.3c1.9-0.4,3.9-0.5,5.8-0.3 c7.4,0.8,14.2,5.2,18.2,11.7c2.7,4.4,4.2,9.5,4.4,14.8C72.9,53.8,75.3,60.5,78.6,67.7z" fill="#4E342E"/></g></svg>
      );
    case 'orange':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="M78,60c0,15.5-12.5,28-28,28S22,75.5,22,60S34.5,32,50,32S78,44.5,78,60z" fill="#FB8C00"/><path d="M66,27.1c0,0,7.8-2.2,12.3,0.3s5.4,8.1,1,11.2s-10.5,1.2-10.5,1.2s-2-5.7,0.3-9.1S66,27.1,66,27.1z" fill="#4CAF50"/><path d="M50,32c-1.4,0-2.8,0.1-4.2,0.4c-0.8-3.1-2.6-5.8-5.2-7.8c-2.9-2.3-6.5-3.6-10.4-3.6c-8,0-14.8,5.1-17.6,12.5 c-0.7,1.8-1.1,3.8-1.1,5.8c0,0.6,0,1.2,0.1,1.8c-3.6,3.6-5.8,8.5-5.8,13.9c0,10.6,8.6,19.2,19.2,19.2c1.7,0,3.3-0.2,4.9-0.6 c3.3,4.2,8.2,6.8,13.7,6.8c10.4,0,18.8-8.4,18.8-18.8c0-2.5-0.5-4.9-1.4-7.1C74.6,39.3,63.1,32,50,32z" fill="#FFB74D"/><path d="M50,32c-4,0-7.8,0.8-11.2,2.2c-0.1,0-0.2,0.1-0.2,0.1c-2.5,0.9-4.7,2.3-6.7,4.1c-0.1,0.1-0.2,0.2-0.3,0.3 c-3.5,3.2-5.8,7.6-6.2,12.4c0,0.2,0,0.3,0,0.5c-0.2,1.7-0.2,3.5-0.2,5.3c0,1.2,0.1,2.3,0.2,3.4c0,0.1,0,0.2,0,0.3 c0.5,5.8,3.3,11.1,7.6,15.1c4.3,4,10.1,6.2,16.2,6.2c6.1,0,11.8-2.2,16.2-6.2c3.2-3,5.4-7,6.4-11.4c0.1-0.3,0.1-0.6,0.1-1 c0-0.3,0-0.6,0-0.9c0-2.2-0.2-4.4-0.7-6.5c-0.1-0.3-0.1-0.5-0.2-0.8c-1-4.3-3.1-8.1-6.3-11.2c-3.2-3.1-7.3-4.9-11.6-5.5 C52.2,33.1,51.1,32,50,32z" fill="#FFE0B2"/></g></svg>
      );
    case 'purple':
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="M68,12.5c0,0,5.7-1.1,8.3,2.4s-0.1,8.5-5.2,9.3s-7.4-3.1-7.4-3.1s-0.5-4.5,2.1-7.2S68,12.5,68,12.5z" fill="#4CAF50"/><path d="M62.9,23.3c-2.3,1.3-4.8,2.1-7.4,2.5c-5.7,0.7-11.3,0.8-16.8,2.7c-5.2,1.8-9.9,5.2-12.8,9.9 c-3.1,4.9-4.1,10.7-2.9,16.3c1.3,5.6,4.8,10.4,9.6,13.6c4.8,3.2,10.7,4.5,16.5,3.6c3.4-0.5,6.7-1.7,9.6-3.4 c2.9-1.7,5.5-3.9,7.5-6.6c2.1-2.7,3.6-5.8,4.4-9c0.8-3.2,1-6.5,0.4-9.7c-0.6-3.2-1.9-6.3-3.8-9c-1.9-2.7-4.4-5-7.3-6.6 C63.9,25.8,63.4,24.5,62.9,23.3z" fill="#8D6E63"/><circle cx="50" cy="50" r="10" fill="#7E57C2"/><circle cx="38" cy="45" r="9" fill="#7E57C2"/><circle cx="62" cy="45" r="9" fill="#7E57C2"/><circle cx="50" cy="35" r="8" fill="#7E57C2"/><circle cx="42" cy="62" r="11" fill="#7E57C2"/><circle cx="58" cy="62" r="11" fill="#7E57C2"/><circle cx="31" cy="58" r="7" fill="#7E57C2"/><circle cx="69" cy="58" r="7" fill="#7E57C2"/><circle cx="50" cy="74" r="9" fill="#7E57C2"/><circle cx="35" cy="72" r="6" fill="#7E57C2"/><circle cx="65" cy="72" r="6" fill="#7E57C2"/><circle cx="50" cy="50" r="8" fill="#9575CD"/><circle cx="38" cy="45" r="7" fill="#9575CD"/><circle cx="62" cy="45" r="7" fill="#9575CD"/><circle cx="50" cy="35" r="6" fill="#9575CD"/><circle cx="42" cy="62" r="9" fill="#9575CD"/><circle cx="58" cy="62" r="9" fill="#9575CD"/><circle cx="31" cy="58" r="5" fill="#9575CD"/><circle cx="69" cy="58" r="5" fill="#9575CD"/><circle cx="50" cy="74" r="7" fill="#9575CD"/><circle cx="35" cy="72" r="4" fill="#9575CD"/><circle cx="65" cy="72" r="4" fill="#9575CD"/></g></svg>
      );
    default:
      return <div>{itemType}</div>; // Simple text fallback
  }
};

const BasketSvg = () => (
  <svg className={styles.basketSvg} viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M95 25C95 22.2386 92.7614 20 90 20H10C7.23858 20 5 22.2386 5 25V30H95V25Z" fill="#A1887F"/>
    <path d="M5 30H95L85 75C85 77.7614 82.7614 80 80 80H20C17.2386 80 15 77.7614 15 75L5 30Z" fill="#8D6E63"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 40H90V45H10V40ZM10 55H90V60H10V55Z" fill="#A1887F"/>
  </svg>
);

export const BucketMatch: React.FC<BucketMatchProps> = ({
  title = 'Match the Following', // Default title
  instruction,
  items = [], // Default to empty array
  buckets = [], // Default to empty array
  audioSrc,
  progress,
  onBack,
  onComplete
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
          <button
            className={styles.backButton}
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>
          {title && <h2 className={styles.mainTitle}>{title}</h2>}
          {audioSrc && (
            <>
              <button
                className={styles.audioButton}
                onClick={playAudio}
                aria-label="Play audio"
              >
                🔊 Play
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
        <h1 className={styles.gameTitle}>{title}</h1>
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
              const itemInThisBucket = items.find(i => placedItems[i.id] === bucket.id);

              return (
                <div
                  key={bucket.id}
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
              );
            })}
          </div>
        </div>

        <div 
            id="feedback-message" 
            className={`${styles.feedbackMessage} ${feedback.type === 'correct' ? styles.correctText : feedback.type === 'incorrect' ? styles.incorrectText : ''}`}
        >
          {allItemsMatched ? 'Great Job! You matched them all!' : 
           feedback.type === 'correct' && !Object.values(placedItems).includes(feedback.bucketId || '') ? 'Correct!' : 
           feedback.type === 'incorrect' ? 'Try Again!' : ''}
        </div>

        {(allItemsCount > 0) && (
          <button
            id="reset-button"
            className={styles.resetButton}
            onClick={handleReset}
            style={{ display: (matchedItemsCount > 0 || allItemsMatched) ? 'block' : 'none' }}
          >
            {allItemsMatched ? 'Play Again' : 'Reset Game'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BucketMatch;
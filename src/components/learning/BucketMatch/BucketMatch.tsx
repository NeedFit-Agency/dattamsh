'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BucketMatchProps, Item, Bucket } from './types';
import styles from './bucketmatch.module.css';
import { itemSvgMap } from './ItemSvgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeadphones, faUndo } from '@fortawesome/free-solid-svg-icons';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import TTS from '../../shared/TTS';

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
  isLastLesson = false,
  standard,
  isFourthChapter = false
}) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  // Store item id and its target bucket id for items placed in buckets
  const [placedItems, setPlacedItems] = useState<{[itemId: string]: string}>({});
  const [feedback, setFeedback] = useState<{ 
    type: 'correct' | 'incorrect' | null, 
    bucketId?: string,
    itemName?: string,
    bucketName?: string
  }>({ type: null });
  const [showCongratulations, setShowCongratulations] = useState(false);
  const instructionAudioRef = useRef<HTMLAudioElement>(null);

  // Check if audio should be shown (for grades 1, 2, 3, 4)
  const shouldShowAudio = standard && ['1', '2', '3', '4'].includes(standard);

  // Monitor instruction audio state changes
  useEffect(() => {
    const audio = instructionAudioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('Instruction audio ended');
      setIsAudioPlaying(false);
    };

    const handlePause = () => {
      console.log('Instruction audio paused');
      setIsAudioPlaying(false);
    };

    const handlePlay = () => {
      console.log('Instruction audio started playing');
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
      
      // Note: No separate success audio file available, so we don't play any audio
      // The instruction audio should only play when the user clicks the "Listen" button
      
      // Remove feedback message after a delay, unless all items are matched
      const updatedItemCount = Object.keys(placedItems).length + 1;
      if (updatedItemCount < allItemsCount) {
        setTimeout(() => setFeedback({ type: null }), 1500);
      }

    } else {
      // Enhanced error feedback with specific guidance
      const itemName = draggedItem.text || draggedItem.type.charAt(0).toUpperCase() + draggedItem.type.slice(1);
      const bucketName = targetBucket.title || targetBucket.type.charAt(0).toUpperCase() + targetBucket.type.slice(1);
      
      setFeedback({ 
        type: 'incorrect', 
        bucketId: targetBucket.id,
        itemName,
        bucketName
      });
      targetBucketElement.classList.add(styles.incorrect);
      
      // Add shake animation to the dragged item
      const draggedElement = document.getElementById(`fruit-${draggedItemId}`);
      if (draggedElement) {
        draggedElement.classList.add(styles.shake);
        setTimeout(() => {
          draggedElement.classList.remove(styles.shake);
        }, 600);
      }
      
      setTimeout(() => {
        targetBucketElement.classList.remove(styles.incorrect);
        setFeedback({ type: null });
      }, 8000); // Extended duration so kids can read the message slowly
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
  };  useEffect(() => {
    if (allItemsMatched) {
      setFeedback({ type: 'correct' }); // General success feedback
      createConfetti(); // Create confetti celebration
      
      // Note: No separate success audio file available, so we don't play any audio
      // The instruction audio should only play when the user clicks the "Listen" button
      
      // Clear feedback and show congratulations screen after a short delay
      setTimeout(() => {
        setFeedback({ type: null }); // Clear feedback before showing congratulations
        setShowCongratulations(true);
      }, 5000);
    }
  }, [allItemsMatched]);

  const handleReset = () => {
    setPlacedItems({});
    setFeedback({ type: null });
    setShowCongratulations(false);
    
    // Clear any remaining visual feedback from buckets
    const bucketElements = document.querySelectorAll('[data-bucket-id]');
    bucketElements.forEach(element => {
      element.classList.remove(styles.correct, styles.incorrect);
    });
  };

  const playAudio = () => {
    if (instructionAudioRef.current) {
      instructionAudioRef.current.play();
    }
  };

  const playInstructionAudio = () => {
    if (instructionAudioRef.current) {
      if (isAudioPlaying) {
        instructionAudioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        instructionAudioRef.current.play().catch((error: any) => {
          console.error('Instruction audio play failed:', error);
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
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    if (instruction && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(instruction);
        utterance.rate = 0.5;
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

  return (
    <div className={styles.container}>
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : handleReset}
        onTryAgainClick={handleReset}
        showTryAgain={true}

        buttonText={isFourthChapter ? `Congratulations! You have completed grade ${standard}!` : (isLastLesson ? 'Next Course' : 'Next Chapter')}
        tryAgainText="Play Again"
      />

      {/* Audio element for instruction playback */}
      {shouldShowAudio && audioSrc && (
        <audio 
          ref={instructionAudioRef} 
          src={audioSrc}
          onError={() => {
            console.error('Instruction audio file failed to load');
            setIsAudioPlaying(false);
          }}
        />
      )}
      {/* {typeof progress !== 'undefined' && (
        // <div className={styles.progressContainer}>
        //   <div className={styles.progressBar}>
        //     <div
        //       className={styles.progressFill}
        //       style={{ width: `${progress}%` }}
        //     />
        //   </div>
        // </div>
      )} */}
      
      <div className={styles.worksheetCard}>
        {/* Instruction Box with Title and Audio Button */}
        <div className={styles.instructionBox}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.buttonGroup}>
            <div className={styles.leftButtons}>
              {shouldShowAudio && (
                <button
                  className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                  onClick={playInstructionAudio}
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
        </div>
        <div className={styles.matchArea}>
          {/* Fruits Section - Top */}
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
                  title={item.text || item.type.charAt(0).toUpperCase() + item.type.slice(1)} /* Added title for accessibility */
                >
                  {getFruitSvg(item.type, item.imageUrl)}
                </div>
                {/* Color name text is hidden via CSS but kept for accessibility */}
                <p className={styles.colorName}>{item.text || item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
              </div>
            ))}
          </div>
          
          {/* Buckets Section - Bottom */}
          <div className={styles.basketsContainer}>
            {buckets.map((bucket) => {
              const isCorrectlyFilled = Object.entries(placedItems).some(([itemId, bId]) => 
                bId === bucket.id && items.find(i => i.id === itemId)?.type === bucket.type
              );
              const itemInThisBucket = items.find(i => placedItems[i.id] === bucket.id);
              return (
                <div key={bucket.id} className={styles.bucketContainer}>
                  <div
                    data-bucket-id={bucket.id}
                    className={`${styles.basketDropzone} ${isCorrectlyFilled ? styles.correct : ''} ${feedback.bucketId === bucket.id && feedback.type === 'incorrect' ? styles.incorrect : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, bucket)}
                    data-target-color={bucket.type}

                  >
                    {/* Show instruction text until an item is dropped */}
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
                  <div className={styles.bucketLabelContainer}>
                    {bucket.audioSrc ? (
                      <button
                        className={styles.bucketAudioButton}
                        onClick={() => {
                          const audio = new Audio(bucket.audioSrc);
                          audio.play().catch(e => console.log("Bucket audio play failed:", e));
                        }}
                        aria-label={`Play audio for ${bucket.title}`}
                      >
                        <FontAwesomeIcon icon={faHeadphones} />
                      </button>
                    ) : (
                      <TTS
                        text={bucket.title || bucket.type.charAt(0).toUpperCase() + bucket.type.slice(1)}
                        className={styles.bucketTTS}
                        iconClassName={styles.bucketHeadphones}
                        showText={false}
                        excitement="low"
                        naturalPauses={true}
                        humanLike={true}
                        rate={0.5}
                        pitch={1.0}
                      />
                    )}
                    <p className={styles.bucketLabel}>{bucket.title || bucket.type.charAt(0).toUpperCase() + bucket.type.slice(1)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>        {/* Feedback message - positioned as a center screen popup */}
        {feedback.type && !showCongratulations && (
          <div 
              id="feedback-message" 
              className={`${styles.feedbackMessage} ${
                feedback.type === 'correct' && !allItemsMatched
                  ? styles.correctText
                  : feedback.type === 'incorrect'
                  ? styles.incorrectText
                  : allItemsMatched
                  ? styles.correctText
                  : ''
              }`}
          >
            {allItemsMatched
              ? successMessage
              : feedback.type === 'correct'
              ? correctMessage
              : feedback.type === 'incorrect'
              ?`Oops! That is not the right answer. Try again!`
              : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default BucketMatch;
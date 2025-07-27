import React, { useState, useRef, useEffect } from 'react';
import styles from './SequenceMatcher.module.css';
import { SequenceMatcherProps, DraggableItem } from './types';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import TTS from '../../shared/TTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faUndo } from '@fortawesome/free-solid-svg-icons';

const SequenceMatcher: React.FC<SequenceMatcherProps> = ({ 
  title = 'Arrange the Steps in the Correct Order!',
  instruction,
  items = [],
  dropZoneCount = 4,
  correctOrder = [],
  onComplete,
  onIncorrectAttempt,
  isLastLesson = false,
  audioSrc,
  speakText,
  standard
}) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<{[zoneIndex: number]: DraggableItem}>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' });
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const draggedElementRef = useRef<HTMLElement | null>(null);
  const dropZonesContainerRef = useRef<HTMLDivElement | null>(null);

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

    // Scroll to the next drop zone if it's not visible
    const container = dropZonesContainerRef.current;
    const nextZoneIndex = zoneIndex + 1;
    
    if (container && nextZoneIndex < dropZoneCount) {
      // There are direct children, so we can use the index
      const nextDropZone = container.children[nextZoneIndex] as HTMLElement;

      if (nextDropZone) {
        // Use a timeout to allow React to render the new item before we scroll.
        setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const nextZoneRect = nextDropZone.getBoundingClientRect();
          
          // If the next drop zone is outside the visible area of the container, scroll to it.
          if (nextZoneRect.bottom > containerRect.bottom || nextZoneRect.top < containerRect.top) {
            nextDropZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
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
    });  if (isAllCorrect) {
      setFeedback({ type: 'correct', message: 'Well done! You arranged everything correctly!' });
      setShowTryAgain(true);
      
      // Show congratulations screen after a shorter delay for better feedback
      setTimeout(() => {
        setShowCongratulations(true);
      }, 5000);
    } else {
      setFeedback({ type: 'incorrect', message: 'Some steps are not in the right order. Try again!' });
      setShowTryAgain(true);
      if (onIncorrectAttempt) {
        onIncorrectAttempt();
      }
      
      // Auto-reset feature: Reset the sequence state after showing feedback for 3 seconds
      setTimeout(() => {
        autoResetSequence();
      }, 3000);
    }
  };

  const returnItemToSteps = (itemToReturn: DraggableItem) => {
    const newPlacedItems = { ...placedItems };
    const zoneIndexToRemove = Object.keys(newPlacedItems).find(
      (key) => newPlacedItems[parseInt(key)].id === itemToReturn.id
    );

    if (zoneIndexToRemove) {
      delete newPlacedItems[parseInt(zoneIndexToRemove)];
      setPlacedItems(newPlacedItems);

      setFeedback({ type: null, message: '' });
      const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
      dropZones.forEach(zone => {
        zone.classList.remove(styles.slotCorrect, styles.slotIncorrect);
      });
    }
  };

  // Reset Game Logic
  const resetGame = () => {
    setPlacedItems({});
    setFeedback({ type: null, message: '' });
    setShowTryAgain(false);
    setShowCongratulations(false);
    setIsAudioPlaying(false);
    
    // Stop any ongoing speech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Clear visual feedback
    const dropZones = document.querySelectorAll(`.${styles.dropZone}`);
    dropZones.forEach(zone => {
      zone.classList.remove(styles.slotCorrect, styles.slotIncorrect, styles.dragOver);
    });
  };

  // Auto-reset function that triggers after incorrect answers
  const autoResetSequence = () => {
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
  };  const getItemIcon = (item: DraggableItem) => {
    switch (item.id) {
      case 'step-1': // Save your work
        return (
          <img src="/images/save-work.svg" alt="Save" className={styles.imageIcon} />
        );
      case 'step-2': // Open the Start menu
        return (
          <img src="/images/start-menu.svg" alt="Start Menu" className={styles.imageIcon} />
        );
      case 'step-3': // Click on the power button
        return (
          <img src="/images/power-button.svg" alt="Power Button" className={styles.imageIcon} />
        );
      case 'step-4': // Select "Shut down"
        return (
          <img src="/images/select-shutdown.svg" alt="Shut Down" className={styles.imageIcon} />
        );
      case 'step-5': // Wait for the computer to turn off
        return (
          <img src="/images/computer-turning-off.svg" alt="Computer Off" className={styles.imageIcon} />
        );
      case 'step-6': // Switch off the power supply
        return (
          <img src="/images/power-supply-switch.svg" alt="Power Switch" className={styles.imageIcon} />
        );
      default:
        // Use computer.png as a default icon for any other steps
        return <img src="/images/computer.png" alt="Default" className={styles.imageIcon} />;
    }
  };

  // Audio ref for .m4a files
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

  // Function to handle audio playback
  const playQuestionAudio = () => {
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
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = instruction || speakText || title;

    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.5;
        utterance.pitch = 1.0;
        
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
      
      {/* Position congratulations screen at the top level for proper z-index */}
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : resetGame}
        onTryAgainClick={resetGame}
        showTryAgain={true}
        message="Amazing! You have arranged everything correctly!"
        buttonText={isLastLesson ? 'Next Course' : 'Next Chapter'}
        tryAgainText="Play Again"
      />
      <div className={styles.worksheetCard}>
        <span className={styles.gearIcon}>⚙️</span>
        
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.buttonGroup}>
            <div className={styles.leftButtons}>
              {shouldShowAudio && (
                <button
                  className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                  onClick={playQuestionAudio}
                  aria-label={isAudioPlaying ? "Stop reading" : "Listen to the instruction"}
                  title={isAudioPlaying ? "Stop reading" : "Listen to the instruction"}
                >
                  <FontAwesomeIcon icon={faHeadphones} />
                  <span>{isAudioPlaying ? "Listening..." : "Listen"}</span>
                </button>
              )}
            </div>
            <button 
              className={styles.resetButton} 
              onClick={resetGame}
            >
              <FontAwesomeIcon icon={faUndo} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.dropTargets}>
            <h3>Column A</h3>

            <div ref={dropZonesContainerRef} className={styles.dropZonesContainer}>
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
                      draggable="false"
                      data-id={placedItems[index].id}
                      style={{'--item-index': index} as React.CSSProperties}
                      onClick={() => returnItemToSteps(placedItems[index])}
                    >
                      <span className={`${styles.stepIcon} ${styles.imageIcon}`}>
                        {getItemIcon(placedItems[index])}
                      </span>
                      <span>{placedItems[index].content}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
            <h3>Column B</h3>
            <div className={styles.stepsContainer}>
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
                  <span className={`${styles.stepIcon} ${styles.imageIcon}`}>
                    {getItemIcon(item)}
                  </span>
                  <span className={styles.stepText}>{item.content}</span>
                  
                  {/* Audio button for individual items */}
                  <div 
                    className={styles.itemTTSContainer}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.audioSrc ? (
                      <button
                        className={styles.itemAudioButton}
                        onClick={() => {
                          const audio = new Audio(item.audioSrc);
                          audio.play().catch(e => console.log("Item audio play failed:", e));
                        }}
                        aria-label={`Play audio for ${item.content}`}
                      >
                        <FontAwesomeIcon icon={faHeadphones} />
                      </button>
                    ) : (
                      <TTS
                        text={item.content}
                        className={styles.itemTTS}
                        iconClassName={styles.itemHeadphones}
                        showText={false}
                        excitement="medium"
                        naturalPauses={true}
                        humanLike={true}
                        rate={0.5}
                        pitch={1.0}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>        {feedback.type && (
          <div 
            className={`${styles.feedbackMessage} ${feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
          >
            {feedback.message}
          </div>
        )}

        <div className={styles.actionButtonsContainer}>
          <button
            className={`${styles.actionButton} ${styles.checkAnswerBtn}`}
            onClick={checkAnswer}
            disabled={Object.keys(placedItems).length < correctOrder.length}
          >
            Check My Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SequenceMatcher;

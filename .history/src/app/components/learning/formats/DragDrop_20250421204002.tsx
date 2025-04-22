'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { DragDropProps } from './types';
import styles from '../../../learning/learning.module.css';

export const DragDrop: React.FC<DragDropProps> = ({
  title,
  instruction,
  items,
  targets,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [dndState, setDndState] = useState<{ [key: string]: any[] }>(() => {
    // Initialize state with items in the source and empty target arrays
    const initialState: { [key: string]: any[] } = { sourceItems: [...items] };
    targets.forEach(target => {
      initialState[target.id] = [];
    });
    return initialState;
  });
  
  const [dndChecked, setDndChecked] = useState(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak) {
      textToSpeak = instruction;
    }

    // Use speech synthesis
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

  // Create a function to create confetti
  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = styles.confetti;
    
    // Random properties for more natural animation
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Between 2-5s
    confetti.style.opacity = '1';
    confetti.style.animation = `${styles.confettiFall} ${Math.random() * 3 + 2}s linear forwards`;
    
    return confetti;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Return if dropped outside or if already checked
    if (!destination || dndChecked) return;

    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;
    
    // Return if dropping in same spot
    if (sourceId === destId && source.index === destination.index) return;

    if (sourceId === destId) {
      // Reordering within same list
      const items = Array.from(dndState[sourceId]);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: items
      }));
    } else {
      // Moving between lists
      const sourceItems = Array.from(dndState[sourceId]);
      const destItems = Array.from(dndState[destId]);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: sourceItems,
        [destId]: destItems
      }));
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    const totalPlacedInTargets = targets.reduce((count, target) => count + dndState[target.id].length, 0);
    const newCorrectnessMap: { [itemId: string]: boolean } = {};
    let allItemsPlaced = dndState.sourceItems.length === 0;

    // Check each target for correct items
    targets.forEach(target => {
      dndState[target.id].forEach(item => {
        const isCorrect = item.type === target.type;
        newCorrectnessMap[item.id] = isCorrect;
        if(isCorrect) correctCount++;
        else incorrectCount++;
      });
    });
    
    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    if (totalPlacedInTargets === 0) {
      setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else {
      if (incorrectCount === 0) {
        setDndFeedback("Great job! All items are in the correct boxes!");
        // Trigger confetti animation
        setShowConfetti(true);
        // Create confetti effect
        const confettiContainer = document.createElement('div');
        confettiContainer.className = styles.confettiContainer;
        document.body.appendChild(confettiContainer);
        
        // Add multiple confetti pieces
        for (let i = 0; i < 50; i++) {
          const piece = createConfetti();
          confettiContainer.appendChild(piece);
          
          // Remove piece after animation
          piece.addEventListener('animationend', () => {
            piece.remove();
          });
        }
        
        // Remove container after all animations
        setTimeout(() => {
          confettiContainer.remove();
          setShowConfetti(false);
        }, 5000);
      } else {
        setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
      }
    }
  };

  const resetActivity = () => {
    setDndState(() => {
      const initialState: { [key: string]: any[] } = { sourceItems: [...items] };
      targets.forEach(target => {
        initialState[target.id] = [];
      });
      return initialState;
    });
    setDndChecked(false);
    setDndFeedback(null);
    setItemCorrectness({});
    setShowConfetti(false);
  };

  return (
    <div className={styles.dragDropArea}>
      <div style={{textAlign: 'center'}}>
        <p className={styles.dragDropInstruction}>{instruction}</p>
        {(audioSrc || speakText) && (
          <button 
            className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
            onClick={playAudio} 
            title={isAudioPlaying ? "Stop" : "Listen"} 
            style={{marginTop: '-10px', marginBottom: '20px'}}
          >
            <FontAwesomeIcon icon={faHeadphones} /> Listen
          </button>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Source List */}
        <Droppable droppableId="sourceItems" direction="horizontal">
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps} 
              className={styles.draggableSourceList}
              style={{
                borderColor: snapshot.isDraggingOver ? 'var(--primary-blue)' : 'var(--border-light)',
                background: snapshot.isDraggingOver ? 'var(--bg-hover)' : 'var(--bg-light)'
              }}
            >
              {dndState.sourceItems?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${styles.draggableItem} ${snapshot.isDragging ? styles.draggableItemDragging : ''}`}
                      style={provided.draggableProps.style}
                    >
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={item.text} 
                          style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}
                        />
                      )}
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Target Lists */}
        <div className={styles.dropTargetsContainer}>
          {targets.map((target) => (
            <Droppable key={target.id} droppableId={target.id}>
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.dropTargetColumn} 
                    ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''} 
                    ${dndChecked && dndState[target.id].every(item => itemCorrectness[item.id]) ? styles.allCorrect : ''}`}
                >
                  <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                    {target.title}
                  </h3>
                  <div className={styles.dropTargetList}>
                    {dndState[target.id]?.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${styles.draggableItem} ${dndChecked ? (itemCorrectness[item.id] ? styles.itemCorrect : styles.itemIncorrect) : ''}`}
                            style={provided.draggableProps.style}
                          >
                            {item.imageUrl && (
                              <img 
                                src={item.imageUrl} 
                                alt={item.text} 
                                style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}
                              />
                            )}
                            {item.text}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Feedback Message */}
      {dndFeedback && (
        <div className={`${styles.dragDropFeedback} ${dndChecked && !Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0 ? styles.dragDropFeedbackCorrect : styles.dragDropFeedbackIncorrect}`}>
          {dndFeedback}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.dndActionButtons}>
        <button 
          className={styles.checkButton} 
          onClick={dndChecked ? resetActivity : checkAnswers}
        >
          {dndChecked ? 'Try Again' : 'Check Answers'}
          <FontAwesomeIcon icon={dndChecked ? faTimes : faCheck} />
        </button>
      </div>
    </div>
  );
};

export default DragDrop;
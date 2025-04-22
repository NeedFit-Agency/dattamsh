import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faLeaf, faWrench } from '@fortawesome/free-solid-svg-icons';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

import { DragDropProps, DraggableItemData } from './types';
import styles from '@/app/learning/learning.module.css';

const DragDrop: React.FC<DragDropProps> = ({ 
  content, 
  onPlayAudio, 
  isAudioPlaying,
  onCheck
}) => {
  // State
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({ 
    sourceItems: [], 
    naturalTarget: [], 
    manMadeTarget: [] 
  });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  // Initialize items when content changes
  useEffect(() => {
    setDndState({
      sourceItems: content.items,
      naturalTarget: [],
      manMadeTarget: []
    });
    setDndChecked(false);
    setDndFeedback(null);
    setItemCorrectness({});
  }, [content]);

  // Drag and Drop Handler
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

  // Check answers
  const checkDragDrop = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    const totalPlacedInTargets = dndState.naturalTarget.length + dndState.manMadeTarget.length;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};
    let allItemsPlaced = dndState.sourceItems.length === 0;

    dndState.naturalTarget.forEach(item => {
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    dndState.manMadeTarget.forEach(item => {
      const isCorrect = item.type === 'man-made';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    if (totalPlacedInTargets === 0) {
      setDndFeedback("Drag the items into the boxes first!");
      return;
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
      return;
    } 
    
    if (incorrectCount === 0) {
      setDndFeedback("Great job! All items are in the correct boxes!");
      onCheck({ 
        isCorrect: true, 
        itemsCorrect: correctCount, 
        itemsIncorrect: incorrectCount 
      });
    } else {
      setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
      onCheck({ 
        isCorrect: false, 
        itemsCorrect: correctCount, 
        itemsIncorrect: incorrectCount 
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.dragDropArea}>
        <div style={{textAlign: 'center'}}>
          <p className={styles.dragDropInstruction}>{content.instruction}</p>
          {(content.audioSrc || content.speakText) && (
            <button 
              className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
              onClick={onPlayAudio} 
              title={isAudioPlaying ? "Stop" : "Listen"} 
              style={{marginTop: '-10px', marginBottom: '20px'}}
            >
              <FontAwesomeIcon icon={faHeadphones} /> Listen
            </button>
          )}
        </div>

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
          {content.targets.map((target) => (
            <Droppable key={target.id} droppableId={target.id}>
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.dropTargetColumn} 
                    ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''} 
                    ${dndChecked && !Object.values(itemCorrectness).some(correct => !correct) ? styles.allCorrect : ''}`}
                >
                  <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                    <FontAwesomeIcon icon={target.type === 'natural' ? faLeaf : faWrench} style={{ marginRight: '8px'}}/>
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

        {/* Feedback Message */}
        {dndFeedback && (
          <div className={`${styles.dragDropFeedback} ${dndChecked && !Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0 ? styles.dragDropFeedbackCorrect : styles.dragDropFeedbackIncorrect}`}>
            {dndFeedback}
          </div>
        )}

        {/* Check Button */}
        {!dndChecked && (
          <button 
            className={styles.checkButton}
            onClick={checkDragDrop}
            disabled={dndState.naturalTarget.length + dndState.manMadeTarget.length === 0}
          >
            Check Answers
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

export default DragDrop;
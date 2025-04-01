'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { DragDropSlide, DragDropState, ItemCorrectnessMap } from './types';
import DraggableItem from './DraggableItem';
import DropTarget from './DropTarget';
import FeedbackMessage from './FeedbackMessage';
import styles from '@/app/learning/learning.module.css';

interface DragDropActivityProps {
  content: DragDropSlide;
  dndState: DragDropState;
  dndChecked: boolean;
  itemCorrectness: ItemCorrectnessMap;
  dndFeedback: string | null;
  isAudioPlaying: boolean;
  onDragEnd: (result: DropResult) => void;
  onPlayAudio: () => void;
}

export default function DragDropActivity({
  content,
  dndState,
  dndChecked,
  itemCorrectness,
  dndFeedback,
  isAudioPlaying,
  onDragEnd,
  onPlayAudio,
}: DragDropActivityProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.dragDropArea}>
        <div style={{ textAlign: 'center' }}>
          <p className={styles.dragDropInstruction}>{content.instruction}</p>
          {(content.audioSrc || content.speakText) && (
            <button
              className={`${styles.audioButton} ${
                isAudioPlaying ? styles.audioButtonPlaying : ''
              }`}
              onClick={onPlayAudio}
              title={isAudioPlaying ? 'Stop' : 'Listen'}
              style={{ marginTop: '-10px', marginBottom: '20px' }}
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
                borderColor: snapshot.isDraggingOver
                  ? 'var(--primary-blue)'
                  : 'var(--border-light)',
              }}
            >
              {dndState.sourceItems?.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={dndChecked}
                >
                  {(provDraggable, snapDraggable) => (
                    <DraggableItem
                      item={item}
                      isDragDisabled={dndChecked}
                      provided={provDraggable}
                      snapshot={snapDraggable}
                    />
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
            <Droppable
              key={target.id}
              droppableId={target.id}
              isDropDisabled={dndChecked}
            >
              {(provDroppable, snapDroppable) => (
                <DropTarget
                  target={target}
                  items={dndState[target.id]}
                  provided={provDroppable}
                  snapshot={snapDroppable}
                  isChecked={dndChecked}
                  itemCorrectness={itemCorrectness}
                />
              )}
            </Droppable>
          ))}
        </div>

        {/* Feedback Message */}
        {dndFeedback && (
          <FeedbackMessage
            message={dndFeedback}
            isChecked={dndChecked}
            isAllCorrect={
              !Object.values(itemCorrectness).some((c) => !c) &&
              dndState.sourceItems?.length === 0
            }
          />
        )}
      </div>
    </DragDropContext>
  );
} 
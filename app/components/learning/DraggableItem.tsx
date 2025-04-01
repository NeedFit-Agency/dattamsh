'use client';

import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { DraggableItemData } from './types';
import styles from '@/app/learning/learning.module.css';

interface DraggableItemProps {
  item: DraggableItemData;
  isDragDisabled: boolean;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isChecked?: boolean;
  isCorrect?: boolean;
}

export default function DraggableItem({ 
  item, 
  isDragDisabled, 
  provided, 
  snapshot,
  isChecked,
  isCorrect
}: DraggableItemProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`
        ${styles.draggableItem} 
        ${snapshot.isDragging ? styles.draggableItemDragging : ''}
        ${isChecked ? (isCorrect ? styles.itemCorrect : styles.itemIncorrect) : ''}
      `}
      style={{
        ...provided.draggableProps.style,
        cursor: isDragDisabled ? 'default' : 'grab'
      }}
    >
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.text} 
          style={{
            height: '30px', 
            marginRight: '8px', 
            pointerEvents: 'none'
          }}
        />
      )}
      {item.text}
    </div>
  );
} 
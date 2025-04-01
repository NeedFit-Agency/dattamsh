'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faWrench } from '@fortawesome/free-solid-svg-icons';
import { DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { DraggableItemData, DropTargetData, ItemCorrectnessMap } from './types';
import DraggableItem from './DraggableItem';
import styles from '@/app/learning/learning.module.css';

interface DropTargetProps {
  target: DropTargetData;
  items: DraggableItemData[];
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  isChecked: boolean;
  itemCorrectness: ItemCorrectnessMap;
}

export default function DropTarget({
  target,
  items,
  provided,
  snapshot,
  isChecked,
  itemCorrectness
}: DropTargetProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`${styles.dropTargetColumn} ${
        snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''
      }`}
    >
      <h3
        className={`${styles.dropTargetTitle} ${
          target.type === 'natural'
            ? styles.dropTargetTitleNatural
            : styles.dropTargetTitleManMade
        }`}
      >
        <FontAwesomeIcon
          icon={target.type === 'natural' ? faLeaf : faWrench}
          style={{ marginRight: '8px' }}
        />
        {target.title}
      </h3>
      <div className={styles.dropTargetList}>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            isDragDisabled={isChecked}
            provided={provided}
            snapshot={snapshot}
            isChecked={isChecked}
            isCorrect={itemCorrectness[item.id]}
          />
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
} 
export interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[];
  imageUrl?: string;
  exampleImages?: { src: string; alt: string }[];
  audioSrc?: string;
  speakText?: string;
}

export interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made';
  imageUrl?: string;
}

export interface DropTargetData {
  id: 'naturalTarget' | 'manMadeTarget';
  title: string;
  type: 'natural' | 'man-made';
}

export interface DragDropSlide {
  type: 'drag-drop';
  title: string;
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  audioSrc?: string;
  speakText?: string;
}

export type LessonContent = LearningSlide | DragDropSlide;

export interface DragDropState {
  sourceItems: DraggableItemData[];
  naturalTarget: DraggableItemData[];
  manMadeTarget: DraggableItemData[];
}

export interface ItemCorrectnessMap {
  [itemId: string]: boolean;
} 
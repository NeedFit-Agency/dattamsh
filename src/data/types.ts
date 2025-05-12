/**
 * Type definitions for educational standards data
 */

/**
 * Learning slide content type
 */
export interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[];
  imageUrl?: string;
  exampleImages?: { src: string; alt: string }[];
  audioSrc?: string;
  speakText?: string;
}

/**
 * Draggable item data for interactive activities
 */
export interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made';
  imageUrl?: string;
}

/**
 * Drop target data for drag-drop activities
 */
export interface DropTargetData {
  id: 'naturalTarget' | 'manMadeTarget';
  title: string;
  type: 'natural' | 'man-made';
}

/**
 * Drag and drop slide content type
 */
export interface DragDropSlide {
  type: 'drag-drop';
  title: string;
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  audioSrc?: string;
  speakText?: string;
}

/**
 * Union type for all lesson content types
 */
export type LessonContent = LearningSlide | DragDropSlide;

/**
 * Chapter structure containing lesson content
 */
export interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

/**
 * Standard structure containing chapters
 */
export interface Standard {
  [key: string]: Chapter[];
}
/**
 * Type definitions for standards and chapters data
 */

export type ContentItemType = {
  type: 'checkmark' | 'chest' | 'level-badge' | 'duo';
  id: number;
  completed: boolean;
  level?: number;
};

export type ChapterType = {
  id: number;
  title: string;
  completed: boolean;
};

export type ChaptersDataType = {
  [standardId: string]: ChapterType[];
};

export type StandardTitleType = {
  [standardId: string]: string;
};

export type HeaderThemeType = {
  [chapterId: string]: string;
};

export type ChapterDataType = {
  standardTitle: string;
  chapterTitle: string;
  headerTheme: string;
  content: ContentItemType[];
};

// Learning content types
export type FormatType = 
  | 'application'
  | 'type' 
  | 'code'
  | 'component'
  | 'drag-drop'
  | 'history'
  | 'quiz'
  | 'step-by-step'
  | 'video'
  | 'text';

export interface ExampleImage {
  src: string;
  alt: string;
}

export interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[];
  imageUrl?: string;
  exampleImages?: ExampleImage[];
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

export interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

export interface Standard {
  [key: string]: Chapter[];
}
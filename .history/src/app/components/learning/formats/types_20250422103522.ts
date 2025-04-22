/**
 * Common types for Learning components
 */

// Learning content types
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
  type: 'natural' | 'man-made' | 'classroom' | 'writing';
  imageUrl?: string;
}

export interface DropTargetData {
  id: string;
  title: string;
  type: 'natural' | 'man-made' | 'classroom' | 'writing';
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

export interface QuizSlide {
  type: 'quiz';
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imageUrl?: string;
  audioSrc?: string;
  speakText?: string;
}

export interface CodeExampleSlide {
  type: 'code-example';
  title: string;
  description: string;
  language: string;
  code: string;
  highlightedLines?: number[];
  explanation?: string;
  audioSrc?: string;
  speakText?: string;
}

export interface VideoSlide {
  type: 'video';
  title: string;
  description: string;
  videoUrl: string;
  isYouTube?: boolean;
  audioSrc?: string;
  speakText?: string;
}

// Union type for all possible content types
export type LessonContent = 
  | LearningSlide 
  | DragDropSlide 
  | QuizSlide 
  | CodeExampleSlide 
  | VideoSlide;

// Component prop types
export interface TextContentProps {
  content: LearningSlide;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
}

export interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  showThumbnails?: boolean;
}

export interface DragDropProps {
  content: DragDropSlide;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
  onCheck: (result: {
    isCorrect: boolean;
    itemsCorrect: number;
    itemsIncorrect: number;
  }) => void;
}

export interface QuizProps {
  content: QuizSlide;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export interface CodeExampleProps {
  content: CodeExampleSlide;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
}

export interface VideoProps {
  content: VideoSlide;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
}
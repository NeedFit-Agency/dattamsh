// Common types for learning content formats
export interface BaseContentProps {
  title: string;
  audioSrc?: string; // Optional audio file path
  speakText?: string; // Text for speech synthesis
}

// Text Content Format
export interface TextContentProps extends BaseContentProps {
  type: 'text';
  description: string | string[];
  imageUrl?: string; // Optional main image
  exampleImages?: { src: string; alt: string }[]; // Optional examples
}

// Image Gallery Format
export interface ImageGalleryProps extends BaseContentProps {
  type: 'gallery';
  description?: string | string[];
  images: { src: string; alt: string; caption?: string }[];
}

// Drag and Drop Format
export interface DragDropItemData {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
}

export interface DragDropTargetData {
  id: string;
  title: string;
  type: string;
}

export interface DragDropProps extends BaseContentProps {
  type: 'drag-drop';
  instruction: string;
  items: DragDropItemData[];
  targets: DragDropTargetData[];
}

// Quiz Format
export interface QuizOptionData {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizProps extends BaseContentProps {
  type: 'quiz';
  question: string;
  options: QuizOptionData[];
  explanation?: string;
  imageUrl?: string;
}

// Code Example Format
export interface CodeExampleProps extends BaseContentProps {
  type: 'code';
  description: string | string[];
  code: string;
  language: string; // e.g. 'javascript', 'python', 'html', etc.
  highlightLines?: number[]; // Lines to highlight
  explanation?: string;
}

// Video Format
export interface VideoProps extends BaseContentProps {
  type: 'video';
  description?: string | string[];
  videoSrc: string; // URL to video file or embed code
  videoType: 'file' | 'youtube' | 'vimeo'; // Type of video source
  poster?: string; // Thumbnail image
}

// Union type for all content formats
export type ContentFormatProps = 
  | TextContentProps 
  | ImageGalleryProps 
  | DragDropProps 
  | QuizProps 
  | CodeExampleProps 
  | VideoProps;
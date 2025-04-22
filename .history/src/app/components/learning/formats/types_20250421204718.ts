// Common types for learning content formats
export interface BaseContentProps {
  title?: string;
  audioSrc?: string; // Optional audio file path
  speakText?: string; // Text for speech synthesis
}

// Text Content Format
export interface TextContentProps extends BaseContentProps {
  content: string | string[];
  highlights?: string[];
  mascot?: boolean;
  imageUrl?: string; // Optional main image
}

// Image Gallery Format
export interface ImageGalleryProps extends BaseContentProps {
  description?: string | string[];
  images: { src: string; alt: string; caption?: string }[];
}

// Drag and Drop Format
export interface DragDropProps extends BaseContentProps {
  instruction: string;
  items: {
    id: string;
    text: string;
    type: string;
    imageUrl?: string;
  }[];
  targets: {
    id: string;
    title: string;
    type: string;
  }[];
}

// Quiz Format
export interface QuizProps extends BaseContentProps {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
  imageUrl?: string;
}

// Code Example Format
export interface CodeExampleProps extends BaseContentProps {
  description: string | string[];
  code: string;
  language: string; // e.g. 'javascript', 'python', 'html', etc.
  highlightLines?: number[]; // Lines to highlight
  explanation?: string;
}

// Video Format
export interface VideoProps extends BaseContentProps {
  description?: string | string[];
  videoSrc: string; // URL to video file or embed code
  videoType: 'youtube' | 'vimeo' | 'file'; // Type of video source
  poster?: string; // Thumbnail image
}

// Union type for all content formats
export interface LearningContent {
  id: string;
  type: 'text' | 'gallery' | 'drag-drop' | 'quiz' | 'code' | 'video';
  props: TextContentProps | ImageGalleryProps | DragDropProps | QuizProps | CodeExampleProps | VideoProps;
}

// Optional: You might want to create a type for a lesson which contains multiple content items
export interface LessonContent {
  id: string;
  title: string;
  description?: string;
  content: LearningContent[];
}
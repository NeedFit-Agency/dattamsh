// Common properties for all content formats
export interface BaseContentProps {
  id?: string;
  title?: string;
  description?: string | string[];
  audioSrc?: string;
  speakText?: string;
}

// For text-based explanations
export interface TextContentProps extends BaseContentProps {
  content: string | string[];
  highlights?: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

// For image galleries
export interface ImageGalleryProps extends BaseContentProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  layout?: 'grid' | 'carousel' | 'comparison';
}

// For drag and drop activities
export interface DragDropProps extends BaseContentProps {
  instruction: string;
  items: {
    id: string;
    text: string;
    type: string;
    imageUrl?: string;
    content?: string;
    image?: string;
  }[];
  targets: {
    id: string;
    title: string;
    type: string;
  }[];
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
  shuffleItems?: boolean;
}

// For multiple choice quizzes
export interface QuizProps extends BaseContentProps {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
  showExplanationOnAnswer?: boolean;
  allowMultipleAnswers?: boolean;
}

// For code examples with syntax highlighting
export interface CodeExampleProps extends BaseContentProps {
  code: string;
  language: string;
  highlightLines?: number[];
  explanation?: string;
}

// For video content
export interface VideoProps extends BaseContentProps {
  videoSrc: string;
  videoType?: string;
  poster?: string;
  transcript?: string | string[];
}

// Union type for any content format
export type ContentFormat = 
  | { type: 'text'; props: TextContentProps }
  | { type: 'image-gallery'; props: ImageGalleryProps }
  | { type: 'drag-drop'; props: DragDropProps }
  | { type: 'quiz'; props: QuizProps }
  | { type: 'code-example'; props: CodeExampleProps }
  | { type: 'video'; props: VideoProps };

// A learning section can contain multiple content formats
export interface LearningSection {
  id: string;
  title: string;
  content: ContentFormat[];
}

// A complete learning module
export interface LearningModule {
  id: string;
  title: string;
  description?: string;
  sections: LearningSection[];
}
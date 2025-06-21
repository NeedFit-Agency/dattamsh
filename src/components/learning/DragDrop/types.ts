export interface DragDropProps {
  title: string;
  instruction: string;
  items: Array<{
    id: string;
    text?: string;
    content?: string;
    type: string;
    imageUrl?: string;
  }>;
  targets: Array<{
    id: string;
    title: string;
    type: string;
  }>;
  audioSrc?: string;
  speakText?: string;
  progress?: number;
  onBack?: () => void;
  onComplete?: (() => void) | { href: string };
  isLastLesson?: boolean;
}
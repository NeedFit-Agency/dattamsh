export interface TextProps {
  title: string;
  description: string | string[];
  imageUrl?: string;
  exampleImages?: Array<{ src: string; alt: string }>;
  audioSrc?: string;
  speakText?: string;
  progress?: number;
  onBack?: () => void;
  onComplete?: () => void;
}
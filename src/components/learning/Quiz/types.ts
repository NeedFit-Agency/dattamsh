export interface Question {
  id: number;
  imageUrl?: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizProps {
  title: string;
  subtitle?: string;
  questions: Question[];
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  audioContent?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

export default QuizProps;
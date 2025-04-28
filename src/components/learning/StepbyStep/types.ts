export interface Step {
  id: string;
  number: number;
  title: string;
  instruction: string;
  visualContent: string | React.ReactNode;
  audioContent?: string;
}

export interface StepByStepProps {
  title: string;
  steps: Step[];
  initialStepIndex?: number;
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  onComplete?: () => void;
  onStepChange?: (stepIndex: number) => void;
  onBack?: () => void;
}
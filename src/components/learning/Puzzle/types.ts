export interface PuzzleProps {
  title: string;
  subtitle?: string;
  avatarUrl: string;
  chatText: string;
  imageUrl: string;
  prompt: string;
  hotspots?: { part: string; position: string; isCorrect: boolean }[];
} 
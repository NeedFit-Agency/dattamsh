// This file would define the types for the SequenceMatcher component
// For example:

export interface DraggableItem {
  id: string;
  content: string; // Text to display
  audioSrc?: string; // Optional audio source for individual items
  // Add any other properties specific to an item, e.g., icon, correct order index
}

export interface DropZoneTarget {
  id: string;
  expectedItemId: string; // ID of the item that should be dropped here
}

export interface SequenceMatcherProps {
  title?: string;
  instruction?: string; // Instruction text for the voice button
  items?: DraggableItem[]; // Made optional with default
  dropZoneCount?: number; // Made optional with default
  correctOrder?: string[]; // Made optional with default
  onComplete?: (() => void) | { href: string };
  onIncorrectAttempt?: () => void;
  isLastLesson?: boolean;
  audioSrc?: string; // Audio file path for .m4a files
  speakText?: string; // Fallback text for TTS
  standard?: string; // The current standard/grade level
  // Potentially props for audio, progress, back button like in BucketMatch
}

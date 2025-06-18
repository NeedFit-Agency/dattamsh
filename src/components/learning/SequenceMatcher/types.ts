// This file would define the types for the SequenceMatcher component
// For example:

export interface DraggableItem {
  id: string;
  content: string; // Text to display
  // Add any other properties specific to an item, e.g., icon, correct order index
}

export interface DropZoneTarget {
  id: string;
  expectedItemId: string; // ID of the item that should be dropped here
}

export interface SequenceMatcherProps {
  title?: string;
  items?: DraggableItem[]; // Made optional with default
  dropZoneCount?: number; // Made optional with default
  correctOrder?: string[]; // Made optional with default
  onComplete?: () => void;
  onIncorrectAttempt?: () => void;
  isLastLesson?: boolean;
  // Potentially props for audio, progress, back button like in BucketMatch
}

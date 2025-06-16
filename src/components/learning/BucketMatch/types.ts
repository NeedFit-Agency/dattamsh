// /components/learning/BucketMatch/types.ts

import React from 'react';

// Defines the types for items (e.g., fruits) and buckets (e.g., baskets).
// These types correspond to the 'type' property used for matching.
export type ItemType = 'red' | 'yellow' | 'orange' | 'purple' | string; // Allow for other string types if needed

// Defines the shape of a single draggable item object.
export interface Item {
  id: string;        // Unique identifier for the item
  type: ItemType;    // Type of the item, used for matching with buckets
  text?: string;     // Optional text label for the item
  imageUrl?: string; // Optional URL for an image representation of the item
  // SvgComponent?: React.FC<React.SVGProps<SVGSVGElement>>; // Kept if direct SVG components are still an option
}

// Defines the shape of a single bucket (drop target) object.
export interface Bucket {
  id: string;        // Unique identifier for the bucket
  type: ItemType;    // Type of items this bucket accepts
  title?: string;    // Optional title or label for the bucket
  // color?: string; // Optional background color for the bucket (can be handled by CSS based on type)
}

// Defines the props for the BucketMatch component.
export interface BucketMatchProps {
  title?: string;                    // Title of the matching game
  instruction?: string;              // Instructions for the user
  items: Item[];                     // Array of draggable items
  buckets: Bucket[];                 // Array of drop target buckets
  audioSrc?: string;                 // Optional audio source for instructions or feedback
  progress?: number;                 // Optional progress value (e.g., 0-100)
  onBack?: () => void;               // Optional callback function for a back button
  onComplete?: () => void;           // Optional callback function when all items are correctly matched
}

// Defines the structure for feedback messages (if needed separately from component state).
export interface FeedbackState {
  message: string;
  type: 'correct' | 'incorrect' | 'default' | null;
  bucketId?: string; // To target feedback to a specific bucket if necessary
}
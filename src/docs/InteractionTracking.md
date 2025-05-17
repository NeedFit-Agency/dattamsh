# Interaction Tracking Implementation Guide

## Overview

This document outlines the implementation of anonymized user interaction tracking in the application. The tracking system is designed to collect valuable usage data while ensuring privacy compliance and avoiding the collection of personally identifiable information (PII).

## Features Implemented

The tracking system captures the following anonymized metrics:

- **Grade level selection**: Tracks which grade levels users are selecting
- **Game modules played**: Records which game modules are being used
- **Time spent**: Measures duration spent on various content types
- **Error rates**: Captures errors encountered during gameplay or content interaction
- **Play count**: Tracks how many times each game or content is accessed
- **User count**: Maintains an anonymous count of unique users

## Implementation Architecture

### Core Components

1. **InteractionTrackingContext**: The central provider that wraps the entire application
2. **useInteractionTracking Hook**: A custom hook for components to easily track interactions
3. **Supabase Integration**: Backend storage with anonymous authentication

### Privacy Compliance

- No personally identifiable information (PII) is collected
- Anonymous authentication ensures user privacy
- Only path information is stored, not full URLs with query parameters
- Explicit filtering of sensitive data fields

## Usage Guidelines

### Basic Component Tracking

```tsx
const { trackView, trackComplete } = useInteractionTracking({
  contentId: 'unique-content-id',
  contentType: 'video', // or 'quiz', 'text', 'interactive', 'chapter', 'game_module'
  autoTrackView: true // automatically tracks view on component mount
});

// Track completion
trackComplete({ additionalData: 'value' });
```

### Tracking Time Spent

```tsx
const { startTimeTracking, stopTimeTracking } = useInteractionTracking({
  contentId: 'unique-content-id',
  contentType: 'video',
  trackTimeSpent: true // enables automatic time tracking on mount/unmount
});

// Manual time tracking
startTimeTracking();
// ... later
stopTimeTracking();
```

### Tracking Game Interactions

```tsx
const { 
  trackGame, 
  trackError, 
  trackComplete 
} = useInteractionTracking({
  contentId: 'game-123',
  contentType: 'game_module'
});

// Track game start
trackGame({ difficulty: 'medium', level: 3 });

// Track errors
trackError('wrong_answer', { questionId: 'q-123' });

// Track completion
trackComplete({ score: 85, errors: 2 });
```

### Tracking Grade Selection

```tsx
const { trackGradeLevel } = useInteractionTracking({
  contentId: 'grade-selection',
  contentType: 'chapter'
});

// Track when user selects a grade
trackGradeLevel('3rd Standard');
```

## Data Schema

Interaction data is stored in the `user_interactions` table with the following structure:

- `user_id`: Anonymous user identifier
- `action`: Type of action (view, complete, start, etc.)
- `content_id`: Identifier for the content being interacted with
- `content_type`: Type of content (video, quiz, game_module, etc.)
- `metadata`: JSON object with additional context data
- `timestamp`: When the interaction occurred

## Implementation Notes

- The entire application is wrapped with `InteractionTrackingProvider` in the root layout
- Anonymous authentication is handled automatically via Supabase
- Time tracking is implemented both automatically and manually as needed
- Error tracking includes counts and contextual information
- No progress tracking is implemented as per requirements
# Anonymized User Interaction Tracking System

## Overview

This document describes the implementation of an anonymized user interaction tracking system using Supabase. The system tracks user interactions with learning content without requiring explicit user registration.

## Features

- Anonymous authentication using Supabase Auth
- Tracking of various user interactions with learning content
- Row-level security to ensure data privacy
- Flexible metadata storage for different interaction types

## Implementation Components

- **Supabase Client** (`src/lib/supabase.ts`): Handles connection and authentication
- **Auth Hook** (`src/hooks/useSupabaseAuth.ts`): Manages anonymous sessions
- **Tracking Hook** (`src/hooks/useInteractionTracking.ts`): Provides tracking methods
- **Context Provider** (`src/contexts/InteractionTrackingContext.tsx`): Makes tracking available app-wide

## Database Schema

The `user_interactions` table stores:
- User ID (anonymous)
- Action type (view, complete, start, etc.)
- Content ID and type
- Timestamp
- Metadata (JSON)

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Run the SQL migration in `supabase/migrations/20240601000000_create_user_interactions_table.sql`
3. Copy `.env.local.example` to `.env.local` and add your Supabase credentials
4. Ensure the application is wrapped with `InteractionTrackingProvider`

## Usage Example

```tsx
// In a component
import { useInteractionTracking } from '../hooks/useInteractionTracking';

function VideoComponent() {
  const { trackInteraction } = useInteractionTracking({
    contentId: 'video-123',
    contentType: 'video',
    autoTrackView: true
  });
  
  const handlePlay = () => {
    trackInteraction('start');
  };
  
  return <video onPlay={handlePlay} />;
}
```

## Privacy Considerations

- No personally identifiable information is collected
- Users are identified only by anonymous IDs
- Row-level security ensures users can only access their own data
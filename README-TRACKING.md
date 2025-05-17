# Anonymized User Interaction Tracking

## Overview
This system tracks user interactions anonymously using Supabase, without requiring user registration.

## Components
- **Supabase Client** (`src/lib/supabase.ts`): Connection and anonymous auth
- **Auth Hook** (`src/hooks/useSupabaseAuth.ts`): Anonymous session management
- **Tracking Hook** (`src/hooks/useInteractionTracking.ts`): Interaction tracking methods
- **Context Provider** (`src/contexts/InteractionTrackingContext.tsx`): App-wide tracking

## Database
The `user_interactions` table stores anonymous user interactions with:
- User ID (anonymous)
- Action type (view, complete, start, etc.)
- Content ID and type
- Timestamp and metadata

## Setup
1. Create a Supabase project
2. Run the SQL in `supabase/migrations/20240601000000_create_user_interactions_table.sql`
3. Add Supabase credentials to `.env.local`
4. Wrap app with `InteractionTrackingProvider`

## Usage
```tsx
// Track video interactions
const { trackInteraction } = useInteractionTracking({
  contentId: 'video-123',
  contentType: 'video',
  autoTrackView: true
});

// Track specific events
trackInteraction('start');
trackInteraction('complete');
```
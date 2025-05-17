import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { logInteraction } from '../lib/supabase';

// Enhanced content types to better categorize learning materials
type ContentType = 'video' | 'quiz' | 'text' | 'interactive' | 'chapter' | 'game_module';

// Enhanced action types to track more detailed interactions
type ActionType = 'view' | 'complete' | 'start' | 'pause' | 'resume' | 'answer' | 'navigate' | 'error' | 'select_grade' | 'play_game';

interface InteractionTrackingContextType {
  trackInteraction: (action: ActionType, contentId: string, contentType: ContentType, metadata?: Record<string, any>) => Promise<any>;
  trackGradeSelection: (gradeLevel: string) => Promise<any>;
  trackGamePlay: (gameId: string, metadata?: Record<string, any>) => Promise<any>;
  trackGameError: (gameId: string, errorType: string, metadata?: Record<string, any>) => Promise<any>;
  trackTimeSpent: (contentId: string, contentType: ContentType, timeInSeconds: number) => Promise<any>;
  isAuthenticated: boolean;
  isLoading: boolean;
  userCount: number;
}

const InteractionTrackingContext = createContext<InteractionTrackingContextType | undefined>(undefined);

export function InteractionTrackingProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useSupabaseAuth();
  const [userCount, setUserCount] = React.useState<number>(0);
  
  // Track unique anonymous users (count only)
  useEffect(() => {
    if (user && !loading) {
      // Increment user count in local storage to track session
      const hasBeenCounted = localStorage.getItem('user_counted');
      if (!hasBeenCounted) {
        localStorage.setItem('user_counted', 'true');
        // This would typically update a counter in the database
        // but we're just simulating it here
        setUserCount(prev => prev + 1);
      }
    }
  }, [user, loading]);

  const trackInteraction = async (
    action: ActionType,
    contentId: string,
    contentType: ContentType,
    metadata: Record<string, any> = {}
  ) => {
    if (!user || loading) return { error: 'User not authenticated' };
    
    // Ensure no PII is collected
    const safeMetadata = { ...metadata };
    
    // Remove any potentially sensitive information
    delete safeMetadata.email;
    delete safeMetadata.name;
    delete safeMetadata.phone;
    delete safeMetadata.address;
    delete safeMetadata.ip;
    
    return await logInteraction({
      action,
      contentId,
      contentType,
      metadata: {
        ...safeMetadata,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? 
          window.location.pathname : '', // Only track path, not full URL with query params
      }
    });
  };
  
  // Specialized tracking functions for specific metrics
  const trackGradeSelection = async (gradeLevel: string) => {
    return trackInteraction('select_grade', gradeLevel, 'chapter', { gradeLevel });
  };
  
  const trackGamePlay = async (gameId: string, metadata: Record<string, any> = {}) => {
    return trackInteraction('play_game', gameId, 'game_module', metadata);
  };
  
  const trackGameError = async (gameId: string, errorType: string, metadata: Record<string, any> = {}) => {
    return trackInteraction('error', gameId, 'game_module', { errorType, ...metadata });
  };
  
  const trackTimeSpent = async (contentId: string, contentType: ContentType, timeInSeconds: number) => {
    return trackInteraction('complete', contentId, contentType, { timeSpent: timeInSeconds });
  };

  return (
    <InteractionTrackingContext.Provider
      value={{
        trackInteraction,
        trackGradeSelection,
        trackGamePlay,
        trackGameError,
        trackTimeSpent,
        isAuthenticated: !!user,
        isLoading: loading,
        userCount
      }}
    >
      {children}
    </InteractionTrackingContext.Provider>
  );
}

export function useInteractionTracking() {
  const context = useContext(InteractionTrackingContext);
  
  if (context === undefined) {
    throw new Error('useInteractionTracking must be used within an InteractionTrackingProvider');
  }
  
  return context;
}
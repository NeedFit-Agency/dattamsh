import { useEffect, useRef, useContext } from 'react';
import { InteractionTrackingContext } from '../contexts/InteractionTrackingContext';

type ContentType = 'video' | 'quiz' | 'text' | 'interactive' | 'chapter' | 'game_module';
type ActionType = 'view' | 'complete' | 'start' | 'pause' | 'resume' | 'answer' | 'navigate' | 'error' | 'select_grade' | 'play_game';

interface UseInteractionTrackingProps {
  contentId: string;
  contentType: ContentType;
  autoTrackView?: boolean;
  trackTimeSpent?: boolean;
}

/**
 * Enhanced hook to track user interactions with learning content
 * Automatically logs view events when mounted if autoTrackView is true
 * Can also track time spent on content if trackTimeSpent is true
 */
export function useInteractionTracking({
  contentId,
  contentType,
  autoTrackView = true,
  trackTimeSpent = false
}: UseInteractionTrackingProps) {
  const context = useContext(InteractionTrackingContext);
  
  if (context === undefined) {
    throw new Error('useInteractionTracking must be used within an InteractionTrackingProvider');
  }
  
  const { 
    trackInteraction, 
    trackGradeSelection, 
    trackGamePlay, 
    trackGameError, 
    trackTimeSpent: trackTime,
    isAuthenticated, 
    isLoading 
  } = context;
  
  const startTimeRef = useRef<number | null>(null);
  const errorCountRef = useRef<number>(0);
  
  // Automatically track view event when component mounts
  useEffect(() => {
    if (autoTrackView && isAuthenticated && !isLoading && contentId) {
      trackInteraction('view', contentId, contentType);
      
      // Initialize time tracking if enabled
      if (trackTimeSpent) {
        startTimeRef.current = Date.now();
      }
    }
    
    // Track time spent when component unmounts
    return () => {
      if (trackTimeSpent && startTimeRef.current && isAuthenticated && !isLoading) {
        const timeSpentSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        trackTime(contentId, contentType, timeSpentSeconds);
      }
    };
  }, [isAuthenticated, isLoading, contentId, autoTrackView, trackTimeSpent, contentType]);

  /**
   * Track a user interaction with the content
   */
  const track = async (action: ActionType, metadata: Record<string, any> = {}) => {
    if (!isAuthenticated || isLoading) return { error: 'User not authenticated' };
    return await trackInteraction(action, contentId, contentType, metadata);
  };

  return {
    // Basic tracking functions
    trackInteraction: track,
    trackView: () => track('view'),
    trackComplete: (metadata = {}) => track('complete', metadata),
    trackStart: (metadata = {}) => track('start', metadata),
    trackPause: (metadata = {}) => track('pause', metadata),
    trackResume: (metadata = {}) => track('resume', metadata),
    trackAnswer: (metadata = {}) => track('answer', metadata),
    trackNavigate: (metadata = {}) => track('navigate', metadata),
    
    // Enhanced tracking functions
    trackGradeLevel: (gradeLevel: string) => trackGradeSelection(gradeLevel),
    trackGame: (metadata = {}) => trackGamePlay(contentId, metadata),
    trackError: (errorType: string, metadata = {}) => {
      errorCountRef.current += 1;
      return trackGameError(contentId, errorType, { 
        ...metadata, 
        errorCount: errorCountRef.current 
      });
    },
    
    // Time tracking functions
    startTimeTracking: () => {
      startTimeRef.current = Date.now();
    },
    stopTimeTracking: () => {
      if (startTimeRef.current) {
        const timeSpentSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        startTimeRef.current = null;
        return trackTime(contentId, contentType, timeSpentSeconds);
      }
      return { error: 'Time tracking not started' };
    },
    
    // Utility functions
    getErrorCount: () => errorCountRef.current,
    isAuthenticated,
    isLoading
  };
}

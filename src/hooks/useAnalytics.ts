// src/hooks/useAnalytics.ts
import { useEffect, useState, useCallback } from 'react';
import AnalyticsService, { getSessionId, getInstitutionalContext } from '@/utils/analyticsService';
import { initializeAnalytics } from '@/utils/firebase';
import { getSessionTimeSpent } from '@/utils/sessionUtils';

export const useAnalytics = () => {
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);
  
  // Get current session info
  const sessionId = getSessionId();
  const context = getInstitutionalContext();
  
  // Initialize analytics and track session start
  useEffect(() => {
    const initAnalytics = async () => {
      // Initialize Firebase Analytics
      await initializeAnalytics();
      
      // Get session start time from localStorage if available
      const storedStartTime = localStorage.getItem('sessionStartTime');
      const now = Date.now();
      
      if (storedStartTime) {
        setSessionStartTime(parseInt(storedStartTime));
      } else {
        setSessionStartTime(now);
        if (sessionId) {
          localStorage.setItem('sessionStartTime', now.toString());
        }
      }
      
      setLastInteractionTime(now);
      
      // Only track session start if we have a sessionId
      if (sessionId) {
        console.log('Tracking session start from useAnalytics hook with ID:', sessionId);
        AnalyticsService.trackSessionStart();
      }
    };
    
    initAnalytics();
    
    // Track session end on unmount or window close
    const handleBeforeUnload = () => {
      if (sessionId) {
        const sessionDuration = getSessionTimeSpent();
        console.log('Session ending, duration:', sessionDuration, 'ms');
        AnalyticsService.trackSessionEnd(sessionDuration);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (sessionId) {
        const sessionDuration = getSessionTimeSpent();
        AnalyticsService.trackSessionEnd(sessionDuration);
      }
    };
  }, [sessionId]);
    // Update last interaction time on user activity
  const recordUserInteraction = () => {
    setLastInteractionTime(Date.now());
  };
  
  /**
   * Track the start of a module/activity
   */
  const trackModuleStart = useCallback((moduleId: string, additionalData = {}) => {
    if (!sessionId) {
      console.warn('No session ID available for analytics tracking');
      return false;
    }
    
    return AnalyticsService.logGameplayEvent(moduleId, 'start', {
      completion_status: 'started',
      time_spent: 0,
      errors: 0,
      additional_data: additionalData
    });
  }, [sessionId]);
  
  /**
   * Track a module/activity in progress
   */
  const trackModuleProgress = useCallback((moduleId: string, additionalData = {}) => {
    if (!sessionId) {
      console.warn('No session ID available for analytics tracking');
      return false;
    }
    
    return AnalyticsService.logGameplayEvent(moduleId, 'progress', {
      completion_status: 'started',
      time_spent: getSessionTimeSpent(),
      errors: 0,
      additional_data: additionalData
    });
  }, [sessionId]);
  
  /**
   * Track the completion of a module/activity
   */
  const trackModuleCompletion = useCallback(
    (moduleId: string, timeSpentMs?: number, score?: number, errors?: number, additionalData = {}) => {
      if (!sessionId) {
        console.warn('No session ID available for analytics tracking');
        return false;
      }
      
      return AnalyticsService.logGameplayEvent(moduleId, 'complete', {
        completion_status: 'completed',
        time_spent: timeSpentMs || getSessionTimeSpent(),
        score: score,
        errors: errors || 0,
        additional_data: additionalData
      });
    }, 
    [sessionId]
  );
  
  /**
   * Track when a user quits a module/activity
   */
  const trackModuleQuit = useCallback(
    (moduleId: string, timeSpentMs?: number, additionalData = {}) => {
      if (!sessionId) {
        console.warn('No session ID available for analytics tracking');
        return false;
      }
      
      return AnalyticsService.logGameplayEvent(moduleId, 'quit', {
        completion_status: 'quit',
        time_spent: timeSpentMs || getSessionTimeSpent(),
        additional_data: additionalData
      });
    },
    [sessionId]
  );
  
  return {
    // Basic session information
    sessionId,
    hasContext: !!context,
    institutionId: context?.institution_id,
    gradeId: context?.grade_id,
    classId: context?.class_id,
    
    // Analytics methods
    trackUserVisit: AnalyticsService.trackUserVisit,
    trackSessionStart: AnalyticsService.trackSessionStart,
    trackSessionEnd: AnalyticsService.trackSessionEnd,
    
    // Module tracking methods
    trackModuleStart,
    trackModuleProgress,
    trackModuleCompletion,
    trackModuleQuit,
    
    // Legacy methods
    trackStandardSelection: AnalyticsService.trackStandardSelection,
    trackChapterStart: AnalyticsService.trackChapterStart,
    trackChapterCompletion: AnalyticsService.trackChapterCompletion,
    trackLessonView: AnalyticsService.trackLessonView,
    trackQuizStart: AnalyticsService.trackQuizStart,
    trackQuizCompletion: AnalyticsService.trackQuizCompletion,
    trackQuestionAnswer: AnalyticsService.trackQuestionAnswer,
    
    // Additional hook-specific methods
    recordUserInteraction,
    getSessionDuration: () => getSessionTimeSpent(),
    getTimeSinceLastInteraction: () => Date.now() - lastInteractionTime
  };
};

export default useAnalytics;

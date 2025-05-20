// src/hooks/useAnalytics.ts
import { useEffect, useState } from 'react';
import { AnalyticsService } from '../utils/analyticsService';
import { initializeAnalytics } from '../utils/firebase';

export const useAnalytics = () => {
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);
  
  // Initialize analytics and track session start
  useEffect(() => {
    const initAnalytics = async () => {
      // Initialize Firebase Analytics
      await initializeAnalytics();
      
      // Track anonymous user visit
      AnalyticsService.trackUserVisit();
      
      // Start session tracking
      const now = Date.now();
      setSessionStartTime(now);
      setLastInteractionTime(now);
      AnalyticsService.trackSessionStart();
    };
    
    initAnalytics();
    
    // Track session end on unmount or window close
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStartTime;
      AnalyticsService.trackSessionEnd(sessionDuration);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      const sessionDuration = Date.now() - sessionStartTime;
      AnalyticsService.trackSessionEnd(sessionDuration);
    };
  }, [sessionStartTime]);
  
  // Update last interaction time on user activity
  const recordUserInteraction = () => {
    setLastInteractionTime(Date.now());
  };
  
  return {
    // Expose all analytics tracking methods
    ...AnalyticsService,
    
    // Additional hook-specific methods
    recordUserInteraction,
    getSessionDuration: () => Date.now() - sessionStartTime,
    getTimeSinceLastInteraction: () => Date.now() - lastInteractionTime
  };
};

export default useAnalytics;

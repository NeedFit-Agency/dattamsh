// src/utils/sessionUtils.ts - Utility functions for session management
import AnalyticsService, { 
  getSessionId, 
  generateSessionId, 
  hasInstitutionalContext,
  getInstitutionalContext 
} from './analyticsService';

/**
 * Initialize a session if needed.
 * - If no session ID exists but institutional context is available, generate a new session ID
 * - If no institutional context exists, don't generate a session ID (will be done after modal completion)
 * @returns boolean indicating if a session was initialized
 */
export const initializeSession = async () => {
  const hasContext = hasInstitutionalContext();
  let sessionId = getSessionId();
  
  console.log('Session initialization check - Context exists:', hasContext, 'Session ID:', sessionId);
  
  try {
    if (hasContext && !sessionId) {
      // We have institutional context but no session ID, generate one
      sessionId = generateSessionId();
      console.log('Generated new session ID for existing context:', sessionId);
      
      // Track session start since we have context and just generated an ID
      await AnalyticsService.trackSessionStart();
      
      // Store session start time
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        localStorage.setItem('sessionStartTime', Date.now().toString());
      }
      
      return true;
    } else if (hasContext && sessionId) {
      // We have both context and session ID, make sure session is started
      const context = getInstitutionalContext();
      let sessionStartTimeMissingOrStale = true;
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        const sessionStartTime = localStorage.getItem('sessionStartTime');
        if (sessionStartTime && !(Date.now() - context.timestamp > 24 * 60 * 60 * 1000)) {
          sessionStartTimeMissingOrStale = false;
        }
      }
      
      if (context && sessionStartTimeMissingOrStale) {
        // Either no start time or last session was more than 24 hours ago (or localStorage not available), start a new session
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
          localStorage.setItem('sessionStartTime', Date.now().toString());
        }
        await AnalyticsService.trackSessionStart();
      }
      return true;
    }
  } catch (error) {
    console.error('Error initializing session:', error);
  }
  
  return false;
};

/**
 * Calculate time spent in the current session
 * @returns number of milliseconds spent in the session
 */
export const getSessionTimeSpent = (): number => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    
    if (sessionStartTime) {
      return Date.now() - parseInt(sessionStartTime);
    }
  }
  
  return 0;
};

/**
 * Check if the current session is stale (no activity for more than 30 minutes)
 * @returns boolean indicating if the session is stale
 */
export const isSessionStale = (): boolean => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const lastActivity = localStorage.getItem('lastActivityTime');
    if (!lastActivity) {
      return false;
    }
    
    const inactiveTime = Date.now() - parseInt(lastActivity);
    return inactiveTime > 30 * 60 * 1000; // 30 minutes
  }
  return false;
};

/**
 * Update the last activity time
 */
export const updateLastActivityTime = (): void => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.setItem('lastActivityTime', Date.now().toString());
  }
};

/**
 * End the current session and clean up
 */
export const endSession = async (): Promise<boolean> => {
  const sessionId = getSessionId();
  const timeSpent = getSessionTimeSpent(); // This is now safely guarded
  
  if (!sessionId) {
    return false;
  }
  
  try {
    await AnalyticsService.trackSessionEnd(timeSpent);
    
    // Clear session-specific items but keep institutional context
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.removeItem('sessionStartTime');
      localStorage.removeItem('lastActivityTime');
    }
    
    return true;
  } catch (error) {
    console.error('Error ending session:', error);
    return false;
  }
};

export default {
  initializeSession,
  getSessionTimeSpent,
  isSessionStale,
  updateLastActivityTime,
  endSession
};

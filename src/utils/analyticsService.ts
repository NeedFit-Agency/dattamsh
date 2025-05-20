// src/utils/analyticsService.ts
import { 
  logAnalyticsEvent, 
  createSession,
  logModuleActivity,
  endSession,
  logEventToFirestore // Added import
} from './firebase';
import { v4 as uuidv4 } from 'uuid';

// Store the current session ID in memory
let currentSessionId: string | null = null;

// Analytics events for the education platform
export const AnalyticsEvents = {
  // Standard selection events
  STANDARD_SELECTED: 'standard_selected',
  
  // Chapter/lesson events
  CHAPTER_STARTED: 'chapter_started',
  CHAPTER_COMPLETED: 'chapter_completed',
  LESSON_VIEWED: 'lesson_viewed',
  
  // Quiz events
  QUIZ_STARTED: 'quiz_started',
  QUIZ_COMPLETED: 'quiz_completed',
  QUESTION_ANSWERED: 'question_answered',
  
  // Time tracking events
  SESSION_STARTED: 'session_started',
  SESSION_ENDED: 'session_ended',
  
  // User count (anonymized)
  USER_VISIT: 'user_visit',
  
  // Institution events
  INSTITUTION_SELECTED: 'institution_selected',
  GRADE_SELECTED: 'grade_selected',
  CLASS_SELECTED: 'class_selected'
};

// Create or retrieve a session ID
export const getOrCreateSessionId = () => {
  const context = getInstitutionalContext();
  if (context?.session_id) {
    currentSessionId = context.session_id;
    return context.session_id;
  }
  
  // Generate a new session ID if not available
  currentSessionId = uuidv4();
  return currentSessionId;
};

// Generate a new session ID
export const generateSessionId = (): string => {
  currentSessionId = uuidv4();
  if (typeof window !== 'undefined') {
    localStorage.setItem('sessionId', currentSessionId); // Store in localStorage
  }
  console.log('Generated new session ID:', currentSessionId);
  return currentSessionId;
};

// Get the current session ID
export const getSessionId = (): string | null => {
  if (!currentSessionId) {
    if (typeof window !== 'undefined') {
      // Try to get from localStorage first
      const storedId = localStorage.getItem('sessionId');
      if (storedId) {
        currentSessionId = storedId;
        return currentSessionId;
      }
    }
    
    // If not in localStorage, try to get from institutional context
    const context = getInstitutionalContext(); // Use the local getInstitutionalContext
    if (context?.session_id) {
      currentSessionId = context.session_id;
      if (typeof window !== 'undefined' && currentSessionId) { // Ensure localStorage is available and currentSessionId is not null
        localStorage.setItem('sessionId', currentSessionId);
      }
      return currentSessionId;
    }
  }
  return currentSessionId;
};

export const initializeAnalytics = () => {
  let sessionId = getSessionId();
  if (!sessionId) {
    sessionId = generateSessionId();
    // No need to set localStorage here, generateSessionId already does it
  }
  // console.log("Analytics initialized with session ID:", sessionId);
  return sessionId;
};

// Call initializeAnalytics when the module is first loaded, but ensure it's client-side
if (typeof window !== 'undefined') {
  initializeAnalytics();
}

// Get institutional context from localStorage (our own implementation)
export const getInstitutionalContext = () => {
  if (typeof window !== 'undefined') {
    const contextStr = localStorage.getItem('institutionalContext');
    if (contextStr) {
      try {
        return JSON.parse(contextStr);
      } catch (error) {
        console.error("Error parsing institutional context from localStorage:", error);
        return null;
      }
    }
  }
  return null;
};

// Set institutional context in localStorage
export const setInstitutionalContext = (institutionId: string, gradeId: string, classId: string) => {
  // If we don't have a session ID yet, generate one
  let sessionIdToUse = currentSessionId;
  if (!sessionIdToUse) {
    sessionIdToUse = generateSessionId(); // This already sets it in localStorage if window is defined
  }
  
  const contextData = {
    institution_id: institutionId,
    grade_id: gradeId,
    class_id: classId,
    session_id: sessionIdToUse, // Use the generated or existing session ID
    modalCompleted: true,
    timestamp: Date.now()
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('institutionalContext', JSON.stringify(contextData));
    // Optionally, store individual items if needed elsewhere directly
    const { institution_id, grade_id } = contextData;
    if (institution_id) localStorage.setItem('institution_id', institution_id);
    if (grade_id) localStorage.setItem('grade_id', grade_id);
  }
  
  console.log('Institutional context saved:', {institutionId, gradeId, classId});
  
  // Return the data for convenience
  return contextData;
};

// Check if institutional context exists
export const hasInstitutionalContext = () => {
  const context = getInstitutionalContext();
  return !!(
    context &&
    context.institution_id &&
    context.grade_id &&
    context.class_id &&
    context.modalCompleted
  );
};

// Analytics service with methods to track specific education events
export const AnalyticsService = {  
  // Create a new institutional session
  createInstitutionalSession: async (institutionId: string, gradeId: string, classId: string) => {
    // Generate a new session ID if we don't have one
    if (!currentSessionId) {
      currentSessionId = generateSessionId();
    }
    
    try {
      // Create the session in Firestore
      const sessionCreated = await createSession(currentSessionId, institutionId, gradeId, classId);
      
      if (!sessionCreated) {
        console.error('Failed to create session in Firestore');
        return null;
      }
      
      // Store in localStorage using our helper function
      setInstitutionalContext(institutionId, gradeId, classId);
      
      // Log the session start event
      await logAnalyticsEvent(AnalyticsEvents.SESSION_STARTED, {
        session_id: currentSessionId,
        institution_id: institutionId,
        grade_id: gradeId,
        class_id: classId,
        timestamp: Date.now()
      });
      
      return currentSessionId;
    } catch (error) {
      console.error('Error creating institutional session:', error);
      return null;
    }
  },

  // Generic event logging
  logEvent: async (eventName: string, eventData: Record<string, any>) => {
    const sessionId = getSessionId();
    if (!sessionId) {
      console.warn('AnalyticsService.logEvent: No session ID found. Event not logged.', eventName, eventData);
      return;
    }
    try {
      await logAnalyticsEvent(eventName, {
        ...eventData,
        session_id: sessionId, // Ensure session_id is part of the event data
        timestamp: Date.now(), // Add a timestamp if not already present
      });
      console.log(`Analytics event logged: ${eventName}`, { ...eventData, session_id: sessionId });
    } catch (error) {
      console.error(`Error logging event ${eventName}:`, error);
    }
  },
  
  // Log gameplay events (module-specific activities)
  logGameplayEvent: async (
    moduleId: string, // e.g., 'lesson_basics_of_computer', 'quiz_chapter1_q5'
    eventType: string, // e.g., 'start', 'complete', 'answer', 'interaction'
    eventData: { 
      time_spent_ms?: number; 
      errors?: number; 
      completion_status?: 'started' | 'completed' | 'quit';
      score?: number; 
      [key: string]: any; // For additional custom data, will be logged to 'events' for now
    }
  ) => {
    const sessionId = getSessionId();
    if (!sessionId) {
      console.warn(
        `AnalyticsService.logGameplayEvent: No session ID. Event not logged for moduleId: ${moduleId}, eventType: ${eventType}`
      );
      return;
    }

    try {
      // Determine completionStatus based on eventType or provided status
      let status: 'started' | 'completed' | 'quit' = 'started'; // Default
      if (eventData.completion_status) {
        status = eventData.completion_status;
      } else if (eventType === 'completed' || eventType === 'quit') {
        status = eventType;
      } else if (eventType === 'start') {
        status = 'started'; // Corrected mapping
      }

      // Log core metrics to moduleLogs
      await logModuleActivity(
        sessionId,
        moduleId, // This is the specific game module or sub-module ID
        eventData.time_spent_ms || 0,
        eventData.errors || 0,
        status,
        eventData.score
      );
      console.log(`Gameplay event (moduleLog) logged: ${eventType} for ${moduleId}`, { sessionId, ...eventData });

      // For additional, more granular data not fitting moduleLogs, log to the generic 'events' subcollection
      // This allows flexibility without changing logModuleActivity frequently
      const detailedEventData = { ...eventData };
      delete detailedEventData.time_spent_ms; // Already logged in moduleLogs
      delete detailedEventData.errors;        // Already logged in moduleLogs
      delete detailedEventData.completion_status; // Already logged in moduleLogs
      delete detailedEventData.score;         // Already logged in moduleLogs

      if (Object.keys(detailedEventData).length > 0) {
        await logEventToFirestore(`gameplay_${eventType}`, detailedEventData, sessionId);
        console.log(`Detailed gameplay event (firestore event) logged: gameplay_${eventType} for ${moduleId}`, { sessionId, ...detailedEventData });
      }

    } catch (error) {
      console.error(`Error logging gameplay event ${eventType} for ${moduleId}:`, error);
    }
  },
  
  // Track standard selection
  trackStandardSelection: (standardId: string) => {
    logAnalyticsEvent(AnalyticsEvents.STANDARD_SELECTED, {
      standard_id: standardId,
      timestamp: Date.now(),
    });
      // Log module activity if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `standard_${standardId}`,
        0, // time spent will be tracked separately
        0, // no errors yet
        'started'
      );
    }
  },
  
  // Track chapter start
  trackChapterStart: (standardId: string, chapterId: string) => {
    logAnalyticsEvent(AnalyticsEvents.CHAPTER_STARTED, {
      standard_id: standardId,
      chapter_id: chapterId,
      timestamp: Date.now(),
    });
      // Log module activity if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `standard_${standardId}_chapter_${chapterId}`,
        0, // time spent will be tracked separately
        0, // no errors yet
        'started'
      );
    }
  },
    // Track chapter completion
  trackChapterCompletion: (standardId: string, chapterId: string, timeSpentMs: number) => {
    logAnalyticsEvent(AnalyticsEvents.CHAPTER_COMPLETED, {
      standard_id: standardId,
      chapter_id: chapterId,
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
      // Log module activity if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `standard_${standardId}_chapter_${chapterId}`,
        timeSpentMs,
        0, // errors not tracked for chapters
        'completed'
      );
    }
  },
  
  // Track lesson view
  trackLessonView: (standardId: string, chapterId: string, lessonIndex: number) => {
    logAnalyticsEvent(AnalyticsEvents.LESSON_VIEWED, {
      standard_id: standardId,
      chapter_id: chapterId,
      lesson_index: lessonIndex,
      timestamp: Date.now(),
    });
  },
    // Track quiz start
  trackQuizStart: (standardId: string, chapterId: string) => {
    logAnalyticsEvent(AnalyticsEvents.QUIZ_STARTED, {
      standard_id: standardId,
      chapter_id: chapterId,
      timestamp: Date.now(),
    });
      // Log module activity if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `quiz_${standardId}_${chapterId}`,
        0, // time spent will be tracked separately
        0, // errors not yet tracked
        'started'
      );
    }
  },
  
  // Track quiz completion
  trackQuizCompletion: (
    standardId: string, 
    chapterId: string, 
    score: number, 
    totalQuestions: number, 
    timeSpentMs: number
  ) => {
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    const incorrectAnswers = totalQuestions - score;
    
    logAnalyticsEvent(AnalyticsEvents.QUIZ_COMPLETED, {
      standard_id: standardId,
      chapter_id: chapterId,
      score_percentage: scorePercentage,
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
      // Log module activity if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `quiz_${standardId}_${chapterId}`,
        timeSpentMs,
        incorrectAnswers, // track incorrect answers as errors
        'completed',
        scorePercentage // include score percentage
      );
    }
  },
    // Track question answer
  trackQuestionAnswer: (
    standardId: string,
    chapterId: string,
    questionIndex: number,
    isCorrect: boolean,
    timeSpentMs: number
  ) => {
    logAnalyticsEvent(AnalyticsEvents.QUESTION_ANSWERED, {
      standard_id: standardId,
      chapter_id: chapterId,
      question_index: questionIndex,
      is_correct: isCorrect,
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
      // Log a specific module activity for this question if we have a session ID
    const sessionId = getSessionId();
    if (sessionId) {
      logModuleActivity(
        sessionId,
        `quiz_${standardId}_${chapterId}_q${questionIndex}`,
        timeSpentMs,
        isCorrect ? 0 : 1, // 1 error if incorrect
        'completed',
        isCorrect ? 100 : 0 // 100% if correct, 0% if wrong
      );
    }
  },
    // Track session start - called when user starts using the app
  trackSessionStart: async () => {
    const context = getInstitutionalContext();
    const sessionId = getSessionId();
    
    if (!sessionId) {
      console.warn('Cannot track session start: No session ID available');
      return false;
    }
    
    try {
      if (context) {
        // Update session in Firestore
        const sessionCreated = await createSession(
          sessionId,
          context.institution_id,
          context.grade_id,
          context.class_id
        );
        
        if (!sessionCreated) {
          console.error('Failed to create/update session in Firestore');
          return false;
        }
        
        // Log the event
        await logAnalyticsEvent(AnalyticsEvents.SESSION_STARTED, {
          session_id: sessionId,
          institution_id: context.institution_id,
          grade_id: context.grade_id,
          class_id: context.class_id,
          timestamp: Date.now(),
        });
      } else {
        console.warn('Starting session without institutional context');
        await logAnalyticsEvent(AnalyticsEvents.SESSION_STARTED, {
          session_id: sessionId,
          timestamp: Date.now(),
        });
      }
      
      // Store the session start time
      if (typeof window !== 'undefined') {
        localStorage.setItem('sessionStartTime', Date.now().toString());
      }
      return true;
    } catch (error) {
      console.error('Error tracking session start:', error);
      return false;
    }
  },
  
  // Track session end - called when user leaves or app goes to background
  trackSessionEnd: async (timeSpentMs: number) => {
    const sessionId = getSessionId();
    
    if (!sessionId) {
      console.warn('Cannot track session end: No session ID available');
      return false;
    }
    
    try {
      // Log the event
      await logAnalyticsEvent(AnalyticsEvents.SESSION_ENDED, {
        session_id: sessionId,
        time_spent_ms: timeSpentMs,
        timestamp: Date.now(),
      });
      
      // Update the session in Firestore
      await endSession(sessionId, timeSpentMs);
      return true;
    } catch (error) {
      console.error('Error tracking session end:', error);
      return false;
    }
  },
    // Track unique user visits (anonymized)
  trackUserVisit: () => {
    logAnalyticsEvent(AnalyticsEvents.USER_VISIT, {
      timestamp: Date.now(),
    });
  },
  
  // Track generic module activity with all institutional context
  trackModuleActivity: (
    moduleId: string, 
    timeSpentMs: number,
    errorCount: number,
    completionStatus: 'started' | 'completed' | 'quit',
    score?: number
  ) => {
    const sessionId = getSessionId();
    const context = getInstitutionalContext();
    
    if (!sessionId) {
      console.warn('Attempted to track module activity without a session ID');
      return false;
    }
    
    // Log to module logs
    logModuleActivity(
      sessionId,
      moduleId,
      timeSpentMs,
      errorCount,
      completionStatus,
      score
    );
    
    // Also log as a general event with the context
    logAnalyticsEvent(`module_${completionStatus}`, {
      module_id: moduleId,
      time_spent_ms: timeSpentMs,
      errors: errorCount,
      score: score || 0,
      session_id: sessionId,
      ...(context ? {
        institution_id: context.institution_id,
        grade_id: context.grade_id,
        class_id: context.class_id
      } : {}),
      timestamp: Date.now()
    });
    
    return true;
  }
};

export default AnalyticsService;

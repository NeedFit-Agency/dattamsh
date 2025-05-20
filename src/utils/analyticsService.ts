// src/utils/analyticsService.ts
import { logAnalyticsEvent, initializeAnalytics } from './firebase';

// Initialize analytics when this module is imported
initializeAnalytics();

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
};

// Analytics service with methods to track specific education events
export const AnalyticsService = {
  // Track standard selection
  trackStandardSelection: (standardId: string) => {
    logAnalyticsEvent(AnalyticsEvents.STANDARD_SELECTED, {
      standard_id: standardId,
      timestamp: Date.now(),
    });
  },
  
  // Track chapter start
  trackChapterStart: (standardId: string, chapterId: string) => {
    logAnalyticsEvent(AnalyticsEvents.CHAPTER_STARTED, {
      standard_id: standardId,
      chapter_id: chapterId,
      timestamp: Date.now(),
    });
  },
  
  // Track chapter completion
  trackChapterCompletion: (standardId: string, chapterId: string, timeSpentMs: number) => {
    logAnalyticsEvent(AnalyticsEvents.CHAPTER_COMPLETED, {
      standard_id: standardId,
      chapter_id: chapterId,
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
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
  },
  
  // Track quiz completion
  trackQuizCompletion: (
    standardId: string, 
    chapterId: string, 
    score: number, 
    totalQuestions: number, 
    timeSpentMs: number
  ) => {
    logAnalyticsEvent(AnalyticsEvents.QUIZ_COMPLETED, {
      standard_id: standardId,
      chapter_id: chapterId,
      score_percentage: Math.round((score / totalQuestions) * 100),
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
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
  },
  
  // Track session start - called when user starts using the app
  trackSessionStart: () => {
    logAnalyticsEvent(AnalyticsEvents.SESSION_STARTED, {
      timestamp: Date.now(),
    });
  },
  
  // Track session end - called when user leaves or app goes to background
  trackSessionEnd: (timeSpentMs: number) => {
    logAnalyticsEvent(AnalyticsEvents.SESSION_ENDED, {
      time_spent_ms: timeSpentMs,
      timestamp: Date.now(),
    });
  },
  
  // Track unique user visits (anonymized)
  trackUserVisit: () => {
    logAnalyticsEvent(AnalyticsEvents.USER_VISIT, {
      timestamp: Date.now(),
    });
  },
};

export default AnalyticsService;

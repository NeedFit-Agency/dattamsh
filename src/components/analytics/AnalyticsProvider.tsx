// src/components/analytics/AnalyticsProvider.tsx
'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import useAnalytics from '@/hooks/useAnalytics';

// Create a context to provide analytics throughout the app
interface AnalyticsContextType {
  trackStandardSelection: (standardId: string) => void;
  trackChapterStart: (standardId: string, chapterId: string) => void;
  trackChapterCompletion: (standardId: string, chapterId: string, timeSpentMs: number) => void;
  trackLessonView: (standardId: string, chapterId: string, lessonIndex: number) => void;
  trackQuizStart: (standardId: string, chapterId: string) => void;
  trackQuizCompletion: (
    standardId: string,
    chapterId: string,
    score: number,
    totalQuestions: number,
    timeSpentMs: number
  ) => void;
  trackQuestionAnswer: (
    standardId: string,
    chapterId: string,
    questionIndex: number,
    isCorrect: boolean,
    timeSpentMs: number
  ) => void;
  recordUserInteraction: () => void;
  getSessionDuration: () => number;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analytics = useAnalytics();
  
  // Set up global event listeners to track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      analytics.recordUserInteraction();
    };
    
    // Track various user interactions
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [analytics]);
  
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;

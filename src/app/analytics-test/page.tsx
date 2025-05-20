'use client';

import React, { useState, useEffect } from 'react';
import useAnalytics from '@/hooks/useAnalytics';
import { getSessionId, getInstitutionalContext } from '@/utils/analyticsService';

export default function AnalyticsTestPage() {
  const analytics = useAnalytics();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [institutionalContext, setInstitutionalContext] = useState<any>(null);
  const [moduleId, setModuleId] = useState('test-module-1');
  const [eventStatus, setEventStatus] = useState<string | null>(null);
  
  useEffect(() => {
    // Get session ID and institutional context
    const sid = getSessionId();
    const context = getInstitutionalContext();
    
    setSessionId(sid);
    setInstitutionalContext(context);
  }, []);
  
  // Show success message for a few seconds
  const showSuccess = (message: string) => {
    setEventStatus(message);
    setTimeout(() => setEventStatus(null), 3000);
  };
  
  // Test functions for analytics events
  const testStandardSelection = () => {
    analytics.trackStandardSelection('test-standard-1');
    showSuccess('Standard selection event tracked!');
  };
  
  const testChapterStart = () => {
    analytics.trackChapterStart('test-standard-1', 'test-chapter-1');
    showSuccess('Chapter start event tracked!');
  };
  
  const testChapterCompletion = () => {
    analytics.trackChapterCompletion('test-standard-1', 'test-chapter-1', 60000); // 1 minute
    showSuccess('Chapter completion event tracked!');
  };
  
  const testQuizStart = () => {
    analytics.trackQuizStart('test-standard-1', 'test-chapter-1');
    showSuccess('Quiz start event tracked!');
  };
  
  const testQuizCompletion = () => {
    analytics.trackQuizCompletion('test-standard-1', 'test-chapter-1', 8, 10, 120000); // 80% score, 2 minutes
    showSuccess('Quiz completion event tracked!');
  };
  
  const testQuestionAnswer = () => {
    analytics.trackQuestionAnswer('test-standard-1', 'test-chapter-1', 1, true, 5000); // Correct answer, 5 seconds
    showSuccess('Question answer event tracked!');
  };
  
  // New test functions for gameplay events
  const testModuleStart = () => {
    analytics.trackModuleStart(moduleId, { custom_field: 'test value' });
    showSuccess(`Module ${moduleId} start event tracked!`);
  };
  
  const testModuleProgress = () => {
    analytics.trackModuleProgress(moduleId, { progress: 50 });
    showSuccess(`Module ${moduleId} progress event tracked!`);
  };
  
  const testModuleCompletion = () => {
    analytics.trackModuleCompletion(moduleId, 30000, 85, 2);
    showSuccess(`Module ${moduleId} completion event (85% score) tracked!`);
  };
  
  const testModuleQuit = () => {
    analytics.trackModuleQuit(moduleId, 15000);
    showSuccess(`Module ${moduleId} quit event tracked!`);
  };
  
  const clearContext = () => {
    localStorage.removeItem('institutionalContext');
    localStorage.removeItem('institution_id');
    localStorage.removeItem('grade_id');
    localStorage.removeItem('class_id');
    localStorage.removeItem('studentInfoCompleted');
    localStorage.removeItem('sessionId');
    
    setSessionId(null);
    setInstitutionalContext(null);
    showSuccess('Context cleared! Refresh the page to see the modal again.');
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#1AA2FF', marginBottom: '2rem' }}>Analytics Testing Page</h1>
      
      {eventStatus && (
        <div style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white',
          padding: '0.75rem',
          marginBottom: '1rem',
          borderRadius: '0.25rem'
        }}>
          {eventStatus}
        </div>
      )}
      
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '0.5rem' }}>
        <h2>Institutional Context</h2>
        {institutionalContext ? (
          <>
            <p><strong>Session ID:</strong> {sessionId}</p>
            <p><strong>Institution ID:</strong> {institutionalContext.institution_id}</p>
            <p><strong>Grade ID:</strong> {institutionalContext.grade_id}</p>
            <p><strong>Class ID:</strong> {institutionalContext.class_id}</p>
            <button 
              onClick={clearContext}
              style={{ 
                backgroundColor: '#ff5555', 
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Clear Context (Will Show Modal Again)
            </button>
          </>
        ) : (
          <p>No institutional context found. You should see the modal on page refresh.</p>
        )}
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Test Standard Analytics Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button 
            onClick={testStandardSelection}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Standard Selection
          </button>
          
          <button 
            onClick={testChapterStart}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Chapter Start
          </button>
          
          <button 
            onClick={testChapterCompletion}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Chapter Completion
          </button>
          
          <button 
            onClick={testQuizStart}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Quiz Start
          </button>
          
          <button 
            onClick={testQuizCompletion}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Quiz Completion
          </button>
          
          <button 
            onClick={testQuestionAnswer}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Question Answer
          </button>
        </div>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Test Module Gameplay Events</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Module ID: 
            <input 
              type="text" 
              value={moduleId} 
              onChange={(e) => setModuleId(e.target.value)} 
              style={{ 
                padding: '0.5rem',
                marginLeft: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </label>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button 
            onClick={testModuleStart}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Module Start
          </button>
          
          <button 
            onClick={testModuleProgress}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Module Progress
          </button>
          
          <button 
            onClick={testModuleCompletion}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Module Completion
          </button>
          
          <button 
            onClick={testModuleQuit}
            style={{ 
              backgroundColor: '#1AA2FF', 
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            disabled={!sessionId}
          >
            Test Module Quit
          </button>
        </div>
      </section>
      
      <section>
        <h2>Session Information</h2>
        <p><strong>Current Session ID:</strong> {sessionId || 'No active session'}</p>
        <p><strong>Current Session Duration:</strong> {Math.floor(analytics.getSessionDuration() / 1000)} seconds</p>
        <p><strong>Time Since Last Interaction:</strong> {Math.floor(analytics.getTimeSinceLastInteraction() / 1000)} seconds</p>
      </section>
    </div>
  );
}

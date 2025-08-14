'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';
import type { LessonContent } from '../../data/standardsData';

// Add fade transition styles
const fadeTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, transition: 'opacity 0.5s ease-in-out' },
};

const DragDrop = dynamic(() => import('./DragDrop'), { 
  loading: () => <LoadingSpinner message="Loading drag-drop content..." /> 
});

const BucketMatch = dynamic(() => import('./BucketMatch'), { 
  loading: () => <LoadingSpinner message="Loading bucket matching game..." /> 
});

const SequenceMatcher = dynamic(() => import('./SequenceMatcher'), { 
  loading: () => <LoadingSpinner message="Loading sequence matching game..." /> 
});

const WhoAmI = dynamic(() => import('./WhoAmI'), { 
  loading: () => <LoadingSpinner message="Loading who am I game..." /> 
});

const CodeAnalysis = dynamic(() => import('./CodeAnalysis/CodeAnalysis'), { 
  loading: () => <LoadingSpinner message="Loading code analysis..." /> 
});

const SQLQueryBuilder = dynamic(() => import('./SQLQueryBuilder'), { 
  loading: () => <LoadingSpinner message="Loading SQL Query Builder..." /> 
});

// Fallback component when a format doesn't have a corresponding component
const UnsupportedFormat: React.FC<{format: string}> = ({ format }) => (
  <div style={{ padding: '20px', border: '1px solid #ff6b6b', borderRadius: '8px', color: '#ff6b6b' }}>
    <h3>Unsupported Content Format</h3>
    <p>The content format {format} is not currently supported.</p>
  </div>
);

interface ContentRendererProps {
  content: LessonContent | null; // The content object with format field
  onBack?: () => void;
  onComplete?: (() => void) | { href: string };
  progress?: number;
  isLastLesson?: boolean; // Whether this is the last lesson in the chapter
  standard?: string; // The current standard/grade level
  isFourthChapter?: boolean; // Whether this is the 4th chapter (last chapter) of the grade
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onBack,
  onComplete,
  progress = 0,
  isLastLesson = false,
  standard,
  isFourthChapter
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [prevContentFormat, setPrevContentFormat] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [contentKey, setContentKey] = useState(0); // Used to force component re-render with fade effect
  // Enhanced loading state management
  useEffect(() => {
    // Always show loading state on component mount or content change
    setIsLoading(true);
    
    if (!content) {
      // Even with no content, show loading briefly for consistent UX
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }    // Simulate minimum loading time for better UX
    const minLoadTime = 1800; // ms - longer loading time for better experience
    const startTime = Date.now();
      // Track current timer to clean up properly
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setPrevContentFormat(content.format);
      setContentKey(prev => prev + 1); // Force re-render with new key
      
      // Start fade in effect after content has loaded
      setTimeout(() => setFadeIn(true), 50);
    }, minLoadTime);

    return () => clearTimeout(loadingTimer);
  }, [content]); // Only depend on content to prevent unnecessary re-renders
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(5px)', // Adds a nice blur effect
        WebkitBackdropFilter: 'blur(5px)' // For Safari support
      }}>
        <LoadingSpinner 
          message={`Loading ${content?.format?.replace('-', ' ') || 'learning'} content...`}
          fullScreen 
        />
      </div>
    );
  }
  if (!content) {
    return <div>No content available</div>;
  }

  // Create wrapper with fade-in effect
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      key={contentKey}
      style={{
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  );

  const { format } = content;

  // Map content format to corresponding component
  switch (format) {   case 'drag-drop': {
      const dndContent = content as import('../../data/standardsData').DragDropSlide;
      return (
        <ContentWrapper>
          <DragDrop
            title={dndContent.title}
            instruction={dndContent.instruction}
            items={dndContent.items}
            targets={dndContent.targets}
            audioSrc={dndContent.audioSrc}
            speakText={dndContent.speakText}
            progress={progress}
            onBack={onBack}
            onComplete={onComplete}
            isLastLesson={isLastLesson}
            standard={standard}
            isFourthChapter={isFourthChapter}
          />
        </ContentWrapper>
      );
    }    case 'sequence-match': {
      const sequenceMatchContent = content as import('../../data/standardsData').SequenceMatchSlide;
      return (
        <ContentWrapper>
          <SequenceMatcher
            title={sequenceMatchContent.title}
            instruction={sequenceMatchContent.instruction}
            items={sequenceMatchContent.items}
            dropZoneCount={sequenceMatchContent.dropZoneCount}
            correctOrder={sequenceMatchContent.correctOrder}
            audioSrc={sequenceMatchContent.audioSrc}
            speakText={sequenceMatchContent.speakText}
            onComplete={onComplete}
            isLastLesson={isLastLesson}
            standard={standard}
            isFourthChapter={isFourthChapter}
          />
        </ContentWrapper>
      );
    }    case 'who-am-i': {
      const whoAmIContent = content as import('../../data/standardsData').WhoAmISlide;
      return (
        <ContentWrapper>
          <WhoAmI
            riddleText={whoAmIContent.riddleText}
            questionText={whoAmIContent.questionText}
            options={whoAmIContent.options}
            audioSrc={whoAmIContent.audioSrc}
            speakText={whoAmIContent.speakText}
            onComplete={onComplete}
            isLastLesson={isLastLesson}
            standard={standard}
            isFourthChapter={isFourthChapter}
            // No useFinishButton for WhoAmI - will use "Next" instead
          />
        </ContentWrapper>
      );
    }   case 'bucket-match': {
      const bucketMatchContent = content as import('../../data/standardsData').BucketMatchSlide;      return (
        <ContentWrapper>
          <BucketMatch
            title={bucketMatchContent.title}
            instruction={bucketMatchContent.instruction}
            items={bucketMatchContent.items}
            buckets={bucketMatchContent.buckets}
            audioSrc={bucketMatchContent.audioSrc}
            progress={progress}
            onBack={onBack}
            onComplete={onComplete}
            successMessage={bucketMatchContent.successMessage}
            correctMessage={bucketMatchContent.correctMessage}
            tryAgainMessage={bucketMatchContent.tryAgainMessage}
            resetLabel={bucketMatchContent.resetLabel}
            playAgainLabel={bucketMatchContent.playAgainLabel}
            isLastLesson={isLastLesson}
            standard={standard}
            isFourthChapter={isFourthChapter}
          />
        </ContentWrapper>
      );
    }    case 'code-analysis': {
      const codeAnalysisContent = content as import('../../data/standardsData').CodeAnalysisSlide;
      return (
        <ContentWrapper>
          <div style={{ padding: '12px' }}>

            <CodeAnalysis 
              title={codeAnalysisContent.title}
              instruction={codeAnalysisContent.instruction}
            />
          </div>
        </ContentWrapper>
      );
    }
    
    case 'sql-query-builder': {
      const sqlQueryBuilderContent = content as import('../../data/standardsData').SQLQueryBuilderSlide;
      return (
        <ContentWrapper>
          <SQLQueryBuilder
            title={sqlQueryBuilderContent.title}
            instruction={sqlQueryBuilderContent.instruction}
            items={sqlQueryBuilderContent.items}
            correctOrder={sqlQueryBuilderContent.correctOrder}
            audioSrc={sqlQueryBuilderContent.audioSrc}
            speakText={sqlQueryBuilderContent.speakText}
            onComplete={onComplete}
            isLastLesson={isLastLesson}
            standard={standard}
            isFourthChapter={isFourthChapter}
          />
        </ContentWrapper>
      );
    }    default:
      return <ContentWrapper><UnsupportedFormat format={format} /></ContentWrapper>;
  }
};

export default ContentRenderer;
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';
import type { LessonContent } from '../../data/standardsData';

const Application = dynamic(() => import('./Application'), { 
  loading: () => <LoadingSpinner message="Loading application content..." /> 
});

const Types = dynamic(() => import('./Types'), { 
  loading: () => <LoadingSpinner message="Loading types content..." /> 
});

const Code = dynamic(() => import('./Code'), { 
  loading: () => <LoadingSpinner message="Loading code content..." /> 
});

const Component = dynamic(() => import('./Component'), { 
  loading: () => <LoadingSpinner message="Loading component content..." /> 
});

const DragDrop = dynamic(() => import('./DragDrop'), { 
  loading: () => <LoadingSpinner message="Loading drag-drop content..." /> 
});

const History = dynamic(() => import('./History'), { 
  loading: () => <LoadingSpinner message="Loading history content..." /> 
});

const StepByStep = dynamic(() => import('./StepbyStep'), { 
  loading: () => <LoadingSpinner message="Loading step-by-step content..." /> 
});

const Video = dynamic(() => import('./Video'), { 
  loading: () => <LoadingSpinner message="Loading video content..." /> 
});

const Text = dynamic(() => import('./Text'), { 
  loading: () => <LoadingSpinner message="Loading text content..." /> 
});

const Puzzle = dynamic(() => import('./Puzzle'), { 
  loading: () => <LoadingSpinner message="Loading puzzle content..." /> 
});

const BucketMatch = dynamic(() => import('./BucketMatch'), { 
  loading: () => <LoadingSpinner message="Loading bucket matching game..." /> 
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
  onComplete?: () => void;
  progress?: number;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onBack,
  onComplete,
  progress = 0
}) => {
  if (!content) {
    return <div>No content available</div>;
  }

  const { format } = content;

  // Map content format to corresponding component
  switch (format) {
    case 'application': {
      const appContent = content as any;
      return (
        <Application
          title={appContent.title}
          subtitle={appContent.subtitle}
          examples={appContent.examples}
          audioContent={appContent.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'type': {
      const typeContent = content as any;
      return (
        <Types
          title={typeContent.title}
          subtitle={typeContent.subtitle}
          types={typeContent.types}
          audioContent={typeContent.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'code': {
      const codeContent = content as any;
      return (
        <Code
          title={codeContent.title}
          description={codeContent.description}
          code={codeContent.code}
          language={codeContent.language}
          outputTitle={codeContent.outputTitle}
          outputContent={codeContent.outputContent}
          audioContent={codeContent.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'component': {
      const compContent = content as any;
      return (
        <Component
          title={compContent.title}
          subtitle={compContent.subtitle}
          components={compContent.components}
          audioContent={compContent.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'drag-drop': {
      const dndContent = content as import('../../data/standardsData').DragDropSlide;
      return (
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
        />
      );
    }
    case 'history': {
      // HistorySlide is in standardsData
      const historyContent = content as import('../../data/standardsData').HistorySlide;
      return (
        <History
          title={historyContent.title}
          items={historyContent.items}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'step-by-step': {
      const stepContent = content as any;
      const steps = Array.isArray(stepContent.steps)
        ? stepContent.steps.map((step: any) => ({
            ...step,
            visualContent: typeof step.visualContent === 'string' ? step.visualContent : ''
          }))
        : [
            {
              id: "1",
              number: 1,
              title: stepContent.title,
              instruction: Array.isArray(stepContent.description)
                ? stepContent.description[0]
                : stepContent.description,
              visualContent: typeof stepContent.visualContent === 'string' ? stepContent.visualContent : ''
            }
          ];
      return (
        <StepByStep
          title={stepContent.title}
          steps={steps}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'video': {
      const videoContent = content as any;
      return (
        <Video
          title={videoContent.title}
          videoSrc={videoContent.videoSrc}
          videoType={videoContent.videoType}
          youtubeId={videoContent.youtubeId}
          vimeoId={videoContent.vimeoId}
          mascotImage={videoContent.mascotImage}
          mascotTitle={videoContent.mascotTitle}
          keyPoints={videoContent.keyPoints}
          audioContent={videoContent.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'text': {
      const textContent = content as import('../../data/standardsData').LearningSlide;
      return (
        <Text
          title={textContent.title}
          description={textContent.description}
          imageUrl={textContent.imageUrl}
          exampleImages={textContent.exampleImages}
          audioSrc={textContent.audioSrc}
          speakText={textContent.speakText}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'puzzle': {
      // Map the content to PuzzleProps
      const puzzleContent = content as any;
      return (
        <Puzzle
          title={puzzleContent.title}
          subtitle={puzzleContent.subtitle}
          avatarUrl={puzzleContent.avatarUrl || '/images/mascot.png'}
          chatText={Array.isArray(puzzleContent.description) ? puzzleContent.description[0] : (puzzleContent.description || 'Can you solve the puzzle?')}
          imageUrl={puzzleContent.imageUrl}
          prompt={puzzleContent.prompt}
          hotspots={puzzleContent.hotspots}
          onBack={onBack}
        />
      );
    }
    case 'bucket-match': {
      const bucketMatchContent = content as import('../../data/standardsData').BucketMatchSlide;
      return (
        <BucketMatch
          title={bucketMatchContent.title}
          instruction={bucketMatchContent.instruction}
          items={bucketMatchContent.items}
          buckets={bucketMatchContent.buckets}
          audioSrc={bucketMatchContent.audioSrc}
          speakText={bucketMatchContent.speakText}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    default:
      return <UnsupportedFormat format={format} />;
  }
};

export default ContentRenderer;
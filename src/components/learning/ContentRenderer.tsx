'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

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

// Fallback component when a format doesn't have a corresponding component
const UnsupportedFormat: React.FC<{format: string}> = ({ format }) => (
  <div style={{ padding: '20px', border: '1px solid #ff6b6b', borderRadius: '8px', color: '#ff6b6b' }}>
    <h3>Unsupported Content Format</h3>
    <p>The content format "{format}" is not currently supported.</p>
  </div>
);

interface ContentRendererProps {
  content: any; // The content object with format field
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
    case 'application':
      return (
        <Application
          title={content.title}
          subtitle={content.subtitle}
          examples={content.examples}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'type':
      return (
        <Types
          title={content.title}
          subtitle={content.subtitle}
          types={content.types}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'code':
      return (
        <Code
          title={content.title}
          description={content.description}
          code={content.code}
          language={content.language}
          outputTitle={content.outputTitle}
          outputContent={content.outputContent}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'component':
      return (
        <Component
          title={content.title}
          subtitle={content.subtitle}
          components={content.components}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'drag-drop':
      return (
        <DragDrop
          title={content.title}
          instruction={content.instruction}
          items={content.items}
          targets={content.targets}
          audioSrc={content.audioSrc}
          speakText={content.speakText}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'history':
      return (
        <History
          title={content.title}
          subtitle={content.subtitle}
          items={content.items}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'step-by-step':
      return (
        <StepByStep
          title={content.title}
          steps={content.steps}
          initialStepIndex={content.initialStepIndex}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
          onStepChange={content.onStepChange}
        />
      );

    case 'video':
      return (
        <Video
          title={content.title}
          videoSrc={content.videoSrc}
          videoType={content.videoType}
          youtubeId={content.youtubeId}
          vimeoId={content.vimeoId}
          mascotImage={content.mascotImage}
          mascotTitle={content.mascotTitle}
          keyPoints={content.keyPoints}
          audioContent={content.audioContent}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );

    case 'text':
      return (
        <Text
          title={content.title}
          description={content.description}
          imageUrl={content.imageUrl}
          exampleImages={content.exampleImages}
          audioSrc={content.audioSrc}
          speakText={content.speakText}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    
    default:
      return <UnsupportedFormat format={format} />;
  }
};

export default ContentRenderer;
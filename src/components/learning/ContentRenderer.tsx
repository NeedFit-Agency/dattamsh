'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';
import type { LessonContent } from '../../data/standardsData';

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
   case 'drag-drop': {
      const dndContent = content as import('../../data/standardsData').DragDropSlide;
      return (
        <DragDrop
          title={dndContent.title}
          instruction={dndContent.instruction}
          items={dndContent.items}
          targets={dndContent.targets}
          audioSrc={dndContent.audioSrc}
          progress={progress}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
    }
    case 'sequence-match': {
      const sequenceMatchContent = content as import('../../data/standardsData').SequenceMatchSlide;
      return (
        <SequenceMatcher
          title={sequenceMatchContent.title}
          items={sequenceMatchContent.items}
          dropZoneCount={sequenceMatchContent.dropZoneCount}
          correctOrder={sequenceMatchContent.correctOrder}
          onComplete={onComplete}
        />
      );
    }    case 'who-am-i': {
      const whoAmIContent = content as import('../../data/standardsData').WhoAmISlide;
      const correctOption = whoAmIContent.options.find(opt => opt.isCorrect);
      const adaptedOptions = whoAmIContent.options.map(option => ({
        id: option.id,
        text: option.text,
        icon: <span>💡</span> // Default icon for all options
      }));
      
      return (
        <WhoAmI
          riddleText={whoAmIContent.riddleText}
          questionText={whoAmIContent.questionText}
          options={adaptedOptions}
          correctAnswerId={correctOption?.id || whoAmIContent.options[0]?.id}
          onComplete={onComplete}
        />
      );
    }   case 'bucket-match': {
      const bucketMatchContent = content as import('../../data/standardsData').BucketMatchSlide;
      return (
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
        />
      );
    }
    default:
      return <UnsupportedFormat format={format} />;
  }
};

export default ContentRenderer;
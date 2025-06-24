'use client';
import React from 'react'
import BucketMatch from '@/components/learning/BucketMatch';
import SequenceMatcher from '@/components/learning/SequenceMatcher/SequenceMatcher'; // Added import
import WhoAmI from '@/components/learning/WhoAmI';

const bucketMatchData = {
  title: "Match the Following",
  instruction: "Drag each fruit to the correct color basket",
  items: [
    { id: "apple1", text: "", type: "red", color: "transparent", imageUrl: "/images/fruits/apple.svg" },
    { id: "banana1", text: "", type: "yellow", color: "transparent", imageUrl: "/images/fruits/banana.svg" },
    { id: "orange1", text: "", type: "orange", color: "transparent", imageUrl: "/images/fruits/orange.svg" },
    { id: "grape1", text: "", type: "purple", color: "transparent", imageUrl: "/images/fruits/grapes.svg" }
  ],
  buckets: [
    { id: "red-bucket", title: "Red", type: "red", color: "transparent" },
    { id: "yellow-bucket", title: "Yellow", type: "yellow", color: "transparent" },
    { id: "orange-bucket", title: "Orange", type: "orange", color: "transparent" },
    { id: "purple-bucket", title: "Purple", type: "purple", color: "transparent" }
  ],
  audioSrc: "audio/match-colors.mp3",
  speakText: "Drag each fruit to the correct color basket",
  progress: 50
};

// Placeholder data for SequenceMatcher
const sequenceMatcherData = {
  title: "Arrange the Computer Setup Steps",
  items: [
    { id: 'step-plug', content: 'Plug in the monitor and CPU' },
    { id: 'step-power', content: 'Turn on the power button' },
    { id: 'step-mouse', content: 'Connect the mouse' },
    { id: 'step-keyboard', content: 'Connect the keyboard' },
  ],
  dropZoneCount: 4,
  correctOrder: ['step-plug', 'step-mouse', 'step-keyboard', 'step-power'], // Example correct order
};

// Data for WhoAmI component
const whoAmIData = {
  riddleText: "I am yellow, I love bananas, and I swing from trees.",
  questionText: "WHO AM I?",
  options: [
    {
      id: 'lion',
      text: 'Lion',
      icon: (
        <svg viewBox="0 0 24 24" fill="#fbbf24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,12.76 19.89,13.5 19.68,14.2C19.5,14.07 19.26,14 19,14H18.75A2.75,2.75 0 0,0 16,11.25V11A4,4 0 0,0 12,7A4,4 0 0,0 8,11V11.25A2.75,2.75 0 0,0 5.25,14H5C4.74,14 4.5,14.07 4.32,14.2C4.11,13.5 4,12.76 4,12A8,8 0 0,1 12,4M12,9A2,2 0 0,1 14,11V11.25A4.75,4.75 0 0,1 9.25,16H9A1,1 0 0,1 8,15V12A1,1 0 0,1 9,11H9.5A2.5,2.5 0 0,0 12,8.5V9M15,11A1,1 0 0,1 16,12V15A1,1 0 0,1 15,16H14.75A4.75,4.75 0 0,1 10,11.25V11A2,2 0 0,1 12,9V8.5A2.5,2.5 0 0,0 14.5,11H15Z" />
        </svg>
      )
    },
    {
      id: 'monkey',
      text: 'Monkey',
      icon: (
        <svg viewBox="0 0 24 24" fill="#ca8a04">
          <path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M10,4.3C10.5,4.1 11.2,4 12,4C12.8,4 13.5,4.1 14,4.3C14,5.2 13.1,6 12,6C10.9,6 10,5.2 10,4.3M12,20C8.1,20 5,16.9 5,13C5,12.4 5.1,11.9 5.2,11.4C6.1,12.2 7.5,12.7 9,12.9V15H15V12.9C16.5,12.7 17.9,12.2 18.8,11.4C18.9,11.9 19,12.4 19,13C19,16.9 15.9,20 12,20Z" />
        </svg>
      )
    },
    {
      id: 'snake',
      text: 'Snake',
      icon: (
        <svg viewBox="0 0 24 24" fill="#4d7c0f">
          <path d="M11.5,2C15.09,2 18,4.91 18,8.5C18,10.74 16.97,12.72 15.3,13.96L16.24,14.9L14.83,16.31L13.89,15.37C12.65,15.75 11.3,16 10,16C6,16 3,13 3,9C3,5 6,2 10,2H11.5M10.5,4C7.5,4 5,6.24 5,9C5,11.76 7.5,14 10.5,14C11.38,14 12.2,13.81 12.9,13.47L13.89,14.46L19.34,9.01L18.39,8.06C18.76,7.24 19,6.34 19,5.38C19,5.06 18.96,4.73 18.89,4.41C17.5,5.63 15.63,6.24 13.5,6C13.5,4.67 12.5,4 10.5,4Z" />
        </svg>
      )
    }
  ],
  correctAnswerId: 'monkey'
};

const page = () => {
  console.log('Activities page rendering...');
  console.log('BucketMatch data:', bucketMatchData);
  return (
    <>
      <div style={{ 
        minHeight: '100vh', 
        padding: '20px', 
        backgroundColor: '#fffff0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '900px', 
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: '#fffef5',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          marginBottom: '30px' 
        }}>
          <BucketMatch
            {...bucketMatchData}
            onBack={() => window.history.back()}
            onComplete={() => console.log('Bucket match completed!')}
          />      </div>
        {/* New Section for SequenceMatcher */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: '#fffef5',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>          <SequenceMatcher
            title={sequenceMatcherData.title}
            items={sequenceMatcherData.items}
            dropZoneCount={sequenceMatcherData.dropZoneCount}
            correctOrder={sequenceMatcherData.correctOrder}
            onComplete={() => console.log('Sequence match completed!')}
          />
        </div>
        
        {/* New Section for WhoAmI */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: '#fffef5',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <WhoAmI
            riddleText={whoAmIData.riddleText}
            questionText={whoAmIData.questionText}
            options={whoAmIData.options}
            correctAnswerId={whoAmIData.correctAnswerId}
            onComplete={() => console.log('WhoAmI completed!')}
            onIncorrectAttempt={() => console.log('WhoAmI incorrect attempt!')}
          />
        </div>
        {/* <hr style={{ margin: '32px 0', width: '100%', maxWidth: '900px' }} />
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <DragDrop {...dummyDragDrop} />
        </div> */}
      </div>
    </>
  );
}

export default page

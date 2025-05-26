'use client';
import React from 'react'
import StepByStep  from '@/components/learning/StepbyStep/page';
import TextContent from '@/components/learning/Text/Text';
import CodeExample from '@/components/learning/Code/Code';
import Video from '@/components/learning/Video/Video';
import Flashcard from '@/components/learning/Flashcard/Flashcard';
import { DragDrop } from '@/components/learning/DragDrop/DragDrop';
import Puzzle from '@/components/learning/Puzzle/Puzzle';

const seedPlantingSteps = [
    {
      id: 'step1',
      number: 1,
      title: 'Fill the Pot',
      instruction: 'Fill your pot with potting soil, leaving about an inch of space at the top.',
      visualContent: '🪴 (Visual for Filling Pot with Soil)'
    },
    {
      id: 'step2',
      number: 2,
      title: 'Make a Hole',
      instruction: 'Gently poke a small hole in the center of the soil with your finger. Not too deep! Just enough for the seed.',
      visualContent: '👇 + 🌱 (Visual for Making a Hole)'
    },
  ];

const dummyTextContent = {
  title: 'What is Photosynthesis?',
  description: 'Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.',
  content: [
    'Plants take in carbon dioxide from the air and water from the soil.',
    'Using sunlight, they convert these into glucose and oxygen.'
  ],
  highlights: ['carbon dioxide', 'sunlight', 'glucose', 'oxygen'],
  images: [
    {
      src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
      alt: 'Green leaf closeup',
      caption: 'A closeup of a green leaf.'
    }
  ]
};


const dummyQuiz = {
  title: 'Quiz: Plant Needs',
  question: 'Which of the following do plants need to perform photosynthesis?',
  options: [
    { id: '1', text: 'Oxygen', isCorrect: false },
    { id: '2', text: 'Sunlight', isCorrect: true },
    { id: '3', text: 'Carbon Dioxide', isCorrect: true },
    { id: '4', text: 'Nitrogen', isCorrect: false }
  ],
  explanation: 'Plants need sunlight and carbon dioxide for photosynthesis.'
};

const dummyCodeExample = {
  title: 'Example: Simple Addition in Python',
  description: 'This code adds two numbers and prints the result.',
  code: 'a = 5\nb = 3\nsum = a + b\nprint(sum)',
  language: 'python',
  highlightLines: [3, 4],
  explanation: 'Line 3 performs the addition, and line 4 prints the result.'
};

const dummyVideo = {
  title: 'Time-lapse: Plant Growing',
  description: 'Watch this time-lapse video of a plant growing from seed to maturity.',
  videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
  videoType: 'mp4',
  poster: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b',
  transcript: [
    'The video shows a plant growing from a seedling to a mature plant.',
    'Notice how the leaves unfurl and the stem grows taller over time.'
  ]
} as const;

const dummyFlashcard = {
  imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  cardName: 'Growing Plant',
};

const dummyDragDrop = {
  title: 'Sort the Items',
  instruction: 'Drag each item to the correct category.',
  items: [
    { id: '1', text: 'Apple', type: 'fruit' },
    { id: '2', text: 'Carrot', type: 'vegetable' },
    { id: '3', text: 'Banana', type: 'fruit' },
    { id: '4', text: 'Broccoli', type: 'vegetable' },
  ],
  targets: [
    { id: 't1', title: 'Fruits', type: 'fruit' },
    { id: 't2', title: 'Vegetables', type: 'vegetable' },
  ],
};

const dummyActivity = {
  title: 'Meet the Computer!',
  avatarUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2',
  chatText: "Hi friend! Let's find parts of the computer!",
  imageUrl: 'images/background/image-1.png',
  prompt: 'Computers show us games and cartoons! Can you find the part that shows pictures?',
  actionText: "Let's Go!",
};

const page = () => {
  return (
    <div >
      <Puzzle {...dummyActivity} />
      <hr style={{ margin: '32px 0' }} />
      <div style={{ margin: '32px 0' }} />
      <StepByStep
        title="Step-by-Step: Planting a Seed"
        steps={seedPlantingSteps}
        progress={40}
      />
      <hr style={{ margin: '32px 0' }} />
      <TextContent {...dummyTextContent} />
      <hr style={{ margin: '32px 0' }} />
      <Video {...dummyVideo} />
      <hr style={{ margin: '32px 0' }} />
      <CodeExample {...dummyCodeExample} />
      <hr style={{ margin: '32px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0' }}>
        <Flashcard imageUrl={dummyFlashcard.imageUrl} cardName={dummyFlashcard.cardName} />
      </div>
      <hr style={{ margin: '32px 0' }} />
      <div >
        <DragDrop {...dummyDragDrop} />
      </div>
      <hr style={{ margin: '32px 0' }} />
    </div>
  );
}

export default page

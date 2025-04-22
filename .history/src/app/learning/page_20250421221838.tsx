'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faGear,
  faVolumeUp, // General audio symbol (optional)
  faCheck,
  faTimes,
  faHeart,
  faLeaf, // Icon for Natural
  faWrench, // Icon for Man-made
  faHeadphones, // Specific icon for audio button
} from '@fortawesome/free-solid-svg-icons';
// IMPORTANT: Import from the new library @hello-pangea/dnd
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  // ResponderProvided, // Not always needed
} from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/ui/Tooltip';

import styles from './learning.module.css';

// Helper function to format content with emojis
const formatContentWithEmojis = (text: string): React.ReactNode => {
  // Check if text already contains emojis
  const hasEmojis = /[\p{Emoji}]/u.test(text);
  
  if (hasEmojis) {
    // Split text by emoji characters and wrap emojis in a span with special styling
    const parts = text.split(/(\p{Emoji}+)/u);
    return parts.map((part, index) => {
      if (/[\p{Emoji}]/u.test(part)) {
        return <span key={index} className="emoji" style={{ 
          fontSize: '1.4em', 
          verticalAlign: 'middle',
          display: 'inline-block',
          margin: '0 2px',
          animation: 'wiggle 2s infinite ease-in-out'
        }}>{part}</span>;
      }
      return part;
    });
  }
  
  // If text contains formatting like bullet points or numbered steps
  if (text.match(/^\d[\.\)]|^[•\-\*]/)) {
    return <strong style={{ fontWeight: 600 }}>{text}</strong>;
  }
  
  return text;
};

// --- Define Content Types ---
interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[];
  imageUrl?: string; // Optional main image
  exampleImages?: { src: string; alt: string }[]; // Optional examples
  audioSrc?: string; // Optional audio file path
  speakText?: string; // Text for speech synthesis
}

interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made' | 'classroom' | 'writing';
  imageUrl?: string; // Image for the draggable item itself
}

interface DropTargetData {
  id: 'naturalTarget' | 'manMadeTarget' | 'writingTarget' | 'classroomTarget';
  title: string;
  type: 'natural' | 'man-made' | 'classroom' | 'writing';
}

interface DragDropSlide {
  type: 'drag-drop';
  title: string;
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  audioSrc?: string; // Audio for instruction
  speakText?: string; // Text for instruction speech
}

type LessonContent = LearningSlide | DragDropSlide;

// --- Lesson Content: Introduction to Machines ---
// PLACEHOLDER PATHS - REPLACE WITH YOUR ACTUAL FILE PATHS in /public/*
const lessonContent: LessonContent[] = [
  {
    type: 'learn',
    title: 'Introduction',
    description: [
      'Hi there! I\'m Owlbert! We see so many things around us every day.',
      'Some things, like trees and birds, are found in nature.',
      'Other things, like chairs and cars, are made by people.',
      'Let\'s learn the difference together!',
    ],
    imageUrl: '/images/intro-scene.png', // Placeholder: e.g., nature scene with some objects
    audioSrc: '/audio/01_intro.mp3', // Placeholder
    speakText: "Hi there! I'm Owlbert! We see so many things around us every day. Some things, like trees and birds, are found in nature. Other things, like chairs and cars, are made by people. Let's learn the difference together!",
  },
  {
    type: 'learn',
    title: 'Natural Things',
    description: ['Natural things are things we find in nature. People didn\'t make them. Look at these examples!'],
    exampleImages: [
      { src: '/images/sun.png', alt: 'The bright Sun' },
      { src: '/images/water.png', alt: 'Flowing Water' },
      { src: '/images/tree.png', alt: 'A tall Tree' },
      { src: '/images/bird.png', alt: 'A flying Bird' },
    ],
     audioSrc: '/audio/02_natural.mp3', // Placeholder
     speakText: 'Natural things are things we find in nature. People didn\'t make them. Look at these examples! The bright Sun, flowing Water, a tall Tree, and a flying Bird.'
  },
  {
    type: 'learn',
    title: 'Man-made Things',
    description: ['Man-made things are things that people build or create. Can you spot some things people made here?'],
    exampleImages: [
      { src: '/images/school-bus.png', alt: 'A yellow School Bus' },
      { src: '/images/cycle.png', alt: 'A shiny Cycle' },
      { src: '/images/chair.png', alt: 'A comfy Chair' },
      { src: '/images/blackboard.png', alt: 'A classroom Blackboard' },
    ],
     audioSrc: '/audio/03_manmade.mp3', // Placeholder
     speakText: 'Man-made things are things that people build or create. Can you spot some things people made here? A yellow School Bus, a shiny Cycle, a comfy Chair, and a classroom Blackboard.'
  },
  {
    type: 'drag-drop',
    title: 'Activity: Sort Them Out!',
    instruction: 'Hoot hoot! Help me sort these pictures. Drag them into the correct box: "Natural Things" or "Man-made Things".',
    items: [
      // Use small, clear images for dragging
      { id: 'dnd-item-1', text: 'Tree', type: 'natural', imageUrl: '/images/tree-small.png' },
      { id: 'dnd-item-2', text: 'Chair', type: 'man-made', imageUrl: '/images/chair-small.png' },
      { id: 'dnd-item-3', text: 'Bird', type: 'natural', imageUrl: '/images/bird-small.png' },
      { id: 'dnd-item-4', text: 'Cycle', type: 'man-made', imageUrl: '/images/cycle-small.png' },
      { id: 'dnd-item-5', text: 'Sun', type: 'natural', imageUrl: '/images/sun-small.png' },
      { id: 'dnd-item-6', text: 'Blackboard', type: 'man-made', imageUrl: '/images/blackboard-small.png' },
    ],
    targets: [
      { id: 'naturalTarget', title: 'Natural Things', type: 'natural' },
      { id: 'manMadeTarget', title: 'Man-made Things', type: 'man-made' },
    ],
     audioSrc: '/audio/04_dnd_instruction.mp3', // Placeholder
     speakText: 'Hoot hoot! Help me sort these pictures. Drag them into the correct box: Natural Things or Man-made Things.'
  },
  {
    type: 'learn',
    title: 'What are Machines?',
    description: ['Great sorting! Now, some special man-made things help us do our work easily and save time.', 'We call these helpful things MACHINES!'],
    imageUrl: '/images/tools.png', // Placeholder: e.g., hammer, screwdriver, gear
     audioSrc: '/audio/05_what_machines.mp3', // Placeholder
     speakText: "Great sorting! Now, some special man-made things help us do our work easily and save time. We call these helpful things MACHINES!"
  },
  {
    type: 'learn',
    title: 'Examples of Machines',
    description: 'Machines help with many jobs! Let\'s see some common ones:',
    exampleImages: [
        { src: '/images/washing-machine.png', alt: 'Washing Machine - washes clothes' },
        { src: '/images/refrigerator.png', alt: 'Refrigerator - keeps food cold' },
        { src: '/images/scissors.png', alt: 'Scissors - cuts paper' },
        { src: '/images/sharpener.png', alt: 'Sharpener - sharpens pencils' },
        { src: '/images/fan.png', alt: 'Fan - moves air to cool us' },
    ],
     audioSrc: '/audio/06_machine_examples.mp3', // Placeholder
     speakText: 'Machines help with many jobs! Let\'s see some common ones: A washing machine washes clothes. A refrigerator keeps food cold. Scissors cut paper. A sharpener makes pencils sharp. A fan cools the room.'
  },
];

// --- Chapter 2: School Items ---
const contentChapter2: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'School Items Introduction', 
    description: [
      'Hello friends! Today we\'re going to learn about different items we use in school.',
      'School items help us learn and do our classwork better.',
      'Let\'s discover some important school items together!'
    ],
    imageUrl: '/images/mascot-small.png',
    audioSrc: '/audio/21_intro_school.mp3', // Placeholder
    speakText: 'Hello friends! Today we\'re going to learn about different items we use in school. School items help us learn and do our classwork better. Let\'s discover some important school items together!'
  },
  { 
    type: 'learn', 
    title: 'Writing Tools', 
    description: 'These are tools we use for writing at school. Which ones do you use?',
    exampleImages: [
      { src: '/images/pencil-small.png', alt: 'Pencil - Used for writing and drawing.' },
      { src: '/images/eraser-small.png', alt: 'Eraser - Used to remove pencil marks.' },
      { src: '/images/sharpener-small.png', alt: 'Sharpener - Makes pencils sharp for writing.' },
      { src: '/images/pen-small.png', alt: 'Pen - Used for writing in ink.' },
    ],
    audioSrc: '/audio/22_writing_tools.mp3', // Placeholder
    speakText: 'These are tools we use for writing at school. Which ones do you use? A pencil is used for writing and drawing. An eraser helps remove pencil marks when we make mistakes. A sharpener makes pencils sharp for writing. And a pen is used for writing in ink.'
  },
  {
    type: 'learn',
    title: 'Classroom Items',
    description: 'These are things we use in our classroom to help us learn together.',
    exampleImages: [
      { src: '/images/blackboard-small.png', alt: 'Blackboard - Teachers write lessons on it.' },
      { src: '/images/books-small.png', alt: 'Books - We read and learn from them.' },
      { src: '/images/schoolbag-small.png', alt: 'Schoolbag - Carries our books and supplies.' },
      { src: '/images/ruler-small.png', alt: 'Ruler - Used to draw straight lines and measure.' },
    ],
    audioSrc: '/audio/23_classroom_items.mp3', // Placeholder
    speakText: 'These are things we use in our classroom to help us learn together. A blackboard is where teachers write lessons. Books are what we read and learn from. A schoolbag carries our books and supplies. A ruler is used to draw straight lines and measure things.'
  },
  {
    type: 'drag-drop',
    title: 'Sort School Items',
    instruction: 'Drag each school item to the correct category: Writing Tools or Classroom Items!',
    items: [
      { id: 'si-item-1', text: 'Pencil', type: 'writing', imageUrl: '/images/pencil-small.png' },
      { id: 'si-item-2', text: 'Blackboard', type: 'classroom', imageUrl: '/images/blackboard-small.png' },
      { id: 'si-item-3', text: 'Eraser', type: 'writing', imageUrl: '/images/eraser-small.png' },
      { id: 'si-item-4', text: 'Books', type: 'classroom', imageUrl: '/images/books-small.png' },
      { id: 'si-item-5', text: 'Sharpener', type: 'writing', imageUrl: '/images/sharpener-small.png' },
      { id: 'si-item-6', text: 'Ruler', type: 'classroom', imageUrl: '/images/ruler-small.png' },
    ],
    targets: [
      { id: 'writingTarget', title: 'Writing Tools', type: 'writing' },
      { id: 'classroomTarget', title: 'Classroom Items', type: 'classroom' },
    ],
    audioSrc: '/audio/24_sort_school.mp3', // Placeholder
    speakText: 'Let\'s play a sorting game! Drag each school item to the correct category. Is it a Writing Tool or a Classroom Item? Think about how we use each item!'
  },
  { 
    type: 'learn', 
    title: 'Taking Care of School Items', 
    description: [
      'Our school items are important tools for learning.',
      'We should take good care of them so they last longer.',
      'Keep your pencils sharpened, your eraser clean, and your books covered.',
      'Don\'t draw on your desk or the walls. Keep everything neat and tidy!'
    ],
    imageUrl: '/images/mascot-small.png',
    audioSrc: '/audio/25_care_items.mp3', // Placeholder
    speakText: 'Our school items are important tools for learning. We should take good care of them so they last longer. Keep your pencils sharpened, your eraser clean, and your books covered. Don\'t draw on your desk or the walls. Keep everything neat and tidy!'
  }
];

// --- Chapter 3: Man-made vs. Natural Things ---
const contentChapter3: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Introduction to Things Around Us', 
    description: [
      'Hi there! I\'m Duo! We see so many things around us every day.',
      'Some things, like trees and birds, are found in nature.',
      'Other things, like chairs and cars, are made by people.',
      'Let\'s learn the difference together!'
    ],
    imageUrl: '/images/intro-scene-small.png',
    audioSrc: '/audio/31_intro_things.mp3', // Placeholder
    speakText: 'Hi there! I\'m Duo! We see so many things around us every day. Some things, like trees and birds, are found in nature. Other things, like chairs and cars, are made by people. Let\'s learn the difference together!'
  },
  { 
    type: 'learn', 
    title: 'Natural Things', 
    description: 'Natural things are things we find in nature. People didn\'t make them. Look at these examples!',
    exampleImages: [
      { src: '/images/sun-small.png', alt: 'Sun - A bright star that gives us light and heat.' },
      { src: '/images/water-small.png', alt: 'Water - Found in rivers, lakes, and oceans.' },
      { src: '/images/tree-small.png', alt: 'Tree - Plants that grow from the ground.' },
      { src: '/images/bird-small.png', alt: 'Bird - Animals that can fly in the sky.' },
    ],
    audioSrc: '/audio/32_natural_things.mp3', // Placeholder
    speakText: 'Natural things are things we find in nature. People didn\'t make them. Look at these examples! The sun is a bright star that gives us light and heat. Water is found in rivers, lakes, and oceans. Trees are plants that grow from the ground. Birds are animals that can fly in the sky.'
  },
  {
    type: 'learn',
    title: 'Man-made Things',
    description: 'Man-made things are things that people build or create. Can you spot some things people made here?',
    exampleImages: [
      { src: '/images/school-bus-small.png', alt: 'School Bus - A vehicle made to take children to school.' },
      { src: '/images/cycle-small.png', alt: 'Bicycle - A two-wheeled vehicle people made for riding.' },
      { src: '/images/chair-small.png', alt: 'Chair - Something made for people to sit on.' },
      { src: '/images/blackboard-small.png', alt: 'Blackboard - A board made for writing with chalk.' },
    ],
    audioSrc: '/audio/33_manmade_things.mp3', // Placeholder
    speakText: 'Man-made things are things that people build or create. Can you spot some things people made here? A school bus is a vehicle made to take children to school. A bicycle is a two-wheeled vehicle people made for riding. A chair is something made for people to sit on. A blackboard is a board made for writing with chalk.'
  },
  {
    type: 'drag-drop',
    title: 'Sort The Things',
    instruction: 'Drag each item to the correct group: Natural or Man-made!',
    items: [
      { id: 'nt-item-1', text: 'Sun', type: 'natural', imageUrl: '/images/sun-small.png' },
      { id: 'nt-item-2', text: 'Bicycle', type: 'man-made', imageUrl: '/images/cycle-small.png' },
      { id: 'nt-item-3', text: 'Tree', type: 'natural', imageUrl: '/images/tree-small.png' },
      { id: 'nt-item-4', text: 'Chair', type: 'man-made', imageUrl: '/images/chair-small.png' },
      { id: 'nt-item-5', text: 'Bird', type: 'natural', imageUrl: '/images/bird-small.png' },
      { id: 'nt-item-6', text: 'School Bus', type: 'man-made', imageUrl: '/images/school-bus-small.png' },
    ],
    targets: [
      { id: 'naturalTarget', title: 'Natural Things', type: 'natural' },
      { id: 'manMadeTarget', title: 'Man-made Things', type: 'man-made' },
    ],
    audioSrc: '/audio/34_sort_things.mp3', // Placeholder
    speakText: 'Let\'s play a sorting game! Drag each item to the correct group: Natural or Man-made. Remember, natural things are found in nature, and man-made things are created by people!'
  },
  { 
    type: 'learn', 
    title: 'Why We Need Both', 
    description: [
      'Both natural and man-made things are important in our lives!',
      'Natural things give us fresh air, water, food, and beautiful places to see.',
      'Man-made things help us learn, travel, stay comfortable, and have fun.',
      'We should take care of both natural and man-made things!'
    ],
    imageUrl: '/images/mascot-small.png',
    audioSrc: '/audio/35_both_important.mp3', // Placeholder
    speakText: 'Both natural and man-made things are important in our lives! Natural things give us fresh air, water, food, and beautiful places to see. Man-made things help us learn, travel, stay comfortable, and have fun. We should take care of both natural and man-made things!'
  }
];

// --- Chapter 4: Fun with Educational Games ---
const contentChapter4: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Learning Through Games', 
    description: [
      'Hello, game explorer! 🎮',
      'Did you know that playing games on the computer can help you learn?',
      'Educational games make learning super fun while teaching you important things!',
      'Let\'s discover some awesome games that help your brain grow smarter!'
    ],
    imageUrl: '/images/educational-games.png', // Educational games hero image
    audioSrc: '/audio/41_games_intro.mp3', // Placeholder
    speakText: 'Hello, game explorer! Did you know that playing games on the computer can help you learn? Educational games make learning super fun while teaching you important things! Let\'s discover some awesome games that help your brain grow smarter!'
  },
  { 
    type: 'learn', 
    title: 'Types of Educational Games', 
    description: 'Here are different types of fun learning games:',
    exampleImages: [
      { src: '/images/math-games.png', alt: 'Math Games - Practice counting, adding, and solving puzzles!' },
      { src: '/images/reading-games.png', alt: 'Reading Games - Learn new words and stories.' },
      { src: '/images/science-games.png', alt: 'Science Games - Explore animals, plants, and how things work.' },
      { src: '/images/creativity-games.png', alt: 'Creativity Games - Draw, design, and make music!' },
    ],
    audioSrc: '/audio/42_game_types.mp3', // Placeholder
    speakText: 'Here are different types of fun learning games: Math Games help you practice counting, adding, and solving puzzles! Reading Games help you learn new words and stories. Science Games let you explore animals, plants, and how things work. And Creativity Games let you draw, design, and make music!'
  },
  {
    type: 'drag-drop',
    title: 'Match the Learning Games',
    instruction: 'Match each game to what it helps you learn!',
    items: [
      { id: 'dnd-item-1', text: 'Counting Stars Game', type: 'man-made', imageUrl: '/images/counting-game-small.png' },
      { id: 'dnd-item-2', text: 'Dinosaur Facts Adventure', type: 'natural', imageUrl: '/images/dinosaur-game-small.png' },
      { id: 'dnd-item-3', text: 'Letter Bubbles', type: 'man-made', imageUrl: '/images/letter-game-small.png' },
      { id: 'dnd-item-4', text: 'Music Maker Studio', type: 'natural', imageUrl: '/images/music-game-small.png' },
      { id: 'dnd-item-5', text: 'Shape Puzzle Challenge', type: 'man-made', imageUrl: '/images/shapes-game-small.png' },
      { id: 'dnd-item-6', text: 'World Explorer Map', type: 'natural', imageUrl: '/images/map-game-small.png' },
    ],
    targets: [
      { id: 'manMadeTarget', title: 'Math & Logic', type: 'man-made' },
      { id: 'naturalTarget', title: 'World Knowledge', type: 'natural' },
    ],
    audioSrc: '/audio/43_matching_game.mp3', // Placeholder
    speakText: 'Match each game to what it helps you learn! Drag the games to either Math & Logic or World Knowledge based on what they teach you!'
  },
  { 
    type: 'learn', 
    title: 'Healthy Gaming Habits', 
    description: [
      'Games are fun, but remember:',
      '• Play for a short time (about 20-30 minutes)',
      '• Take breaks to rest your eyes and move your body',
      '• Sit in a chair with good posture',
      '• Keep the screen at eye level',
      '• Play games approved by your grown-ups',
      '• Balance screen time with other activities you love!'
    ],
    imageUrl: '/images/healthy-gaming.png', // Healthy gaming habits image
    audioSrc: '/audio/44_healthy_habits.mp3', // Placeholder
    speakText: 'Games are fun, but remember: Play for a short time (about 20-30 minutes). Take breaks to rest your eyes and move your body. Sit in a chair with good posture. Keep the screen at eye level. Play games approved by your grown-ups. And balance screen time with other activities you love!'
  },
  { 
    type: 'learn', 
    title: 'Make Your Own Game!', 
    description: 'Did you know you can create your own games too? Here are some simple ways to start:',
    exampleImages: [
      { src: '/images/scratch-jr.png', alt: 'Scratch Junior - For kids ages 5-7 to make simple games.' },
      { src: '/images/kodable.png', alt: 'Kodable - Learn coding basics through fun puzzles.' },
      { src: '/images/tynker.png', alt: 'Tynker - Create animations and games step by step.' },
      { src: '/images/board-game.png', alt: 'Or design your own board game with paper and markers!' },
    ],
    audioSrc: '/audio/45_make_games.mp3', // Placeholder
    speakText: 'Did you know you can create your own games too? Here are some simple ways to start: Scratch Junior is for kids ages 5-7 to make simple games. Kodable helps you learn coding basics through fun puzzles. With Tynker, you can create animations and games step by step. Or you can design your own board game with paper and markers! What kind of game would you like to create?'
  }
];

// --- End Lesson Content ---

// Helper function to reorder list
const reorder = (list: DraggableItemData[], startIndex: number, endIndex: number): DraggableItemData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move item between lists
const move = (
    source: DraggableItemData[], destination: DraggableItemData[], droppableSource: any, droppableDestination: any
): { [key: string]: DraggableItemData[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: { [key: string]: DraggableItemData[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

// Add this helper function at the top level
const getStyle = (style: any, snapshot: any) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `0.001s`,
  }
}

// Add this after the other imports
const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = styles.confetti;
  
  // Random properties for more natural animation
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Between 2-5s
  confetti.style.opacity = '1';
  confetti.style.animation = `${styles.confettiFall} ${Math.random() * 3 + 2}s linear forwards`;
  
  return confetti;
};

export default function LearningPage() {
  // --- State ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const router = useRouter();

  // Get URL parameters - standard and chapter for content selection
  const [chapterContent, setChapterContent] = useState<LessonContent[]>(lessonContent); // Default to chapter 1
  const [standard, setStandard] = useState<string>('1');
  const [chapter, setChapter] = useState<string>('1');

  // Drag-and-Drop State
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({ sourceItems: [], naturalTarget: [], manMadeTarget: [] });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  // Reference to currently playing audio object (if using Audio API)
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalSlides = chapterContent.length;
  const currentContent = chapterContent[currentSlideIndex];

  // Inside your component, add this new state
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Effects ---
  // Read URL parameters on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parse URL params if available
    const searchParams = new URLSearchParams(window.location.search);
    const standardParam = searchParams.get('standard') || '1';
    const chapterParam = searchParams.get('chapter') || '1';
    
    console.log("URL Parameters:", { standard: standardParam, chapter: chapterParam });
    
    setStandard(standardParam);
    setChapter(chapterParam);
    
    // Select the appropriate content based on chapter parameter
    let selectedContent: LessonContent[] = lessonContent; // Default to chapter 1
    
    if (standardParam === '1') {
      switch (chapterParam) {
        case '1':
          selectedContent = lessonContent;
          break;
        case '2':
          selectedContent = contentChapter2;
          break;
        case '3':
          selectedContent = contentChapter3;
          break;
        case '4':
          selectedContent = contentChapter4;
          break;
        default:
          console.log("Using default content for chapter:", chapterParam);
          selectedContent = lessonContent;
      }
    }
    
    console.log("Selected content for chapter:", chapterParam, "with", selectedContent.length, "slides");
    setChapterContent(selectedContent);
    
    // Reset to the first slide whenever content changes
    setCurrentSlideIndex(0);
  }, []);

  // Reset state when slide changes
  useEffect(() => {
    // Stop any playing audio/speech
    // if (audioRef.current) {
    //   audioRef.current.pause();
    //   audioRef.current = null;
    // }
    window.speechSynthesis?.cancel();
    setIsAudioPlaying(false);

    // Initialize DND state if it's a DND slide
    if (currentContent && currentContent.type === 'drag-drop') {
      setDndState({
        sourceItems: currentContent.items,
        naturalTarget: [],
        manMadeTarget: []
      });
      setDndChecked(false);
      setDndFeedback(null);
      setItemCorrectness({});
    }
  }, [currentSlideIndex, currentContent]);

  // Update progress bar
  useEffect(() => {
    setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
  }, [currentSlideIndex, totalSlides]);

  // Preload images (optional)
  useEffect(() => {
    if (!chapterContent) return;
    
    chapterContent.forEach(slide => {
      if (slide.type === 'learn') {
        if (slide.imageUrl) new Image().src = slide.imageUrl;
        slide.exampleImages?.forEach(img => { new Image().src = img.src; });
      } else if (slide.type === 'drag-drop') {
        slide.items.forEach(item => { if (item.imageUrl) new Image().src = item.imageUrl; });
      }
    });
  }, [chapterContent]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      // if (audioRef.current) { audioRef.current.pause(); }
      window.speechSynthesis?.cancel();
    };
  }, []);


  // --- Handlers ---
  const handleBackClick = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
    else setShowExitConfirm(true);
  };
  const handleConfirmExit = () => router.push(`/learn/${standard}/chapter/${chapter}`);
  const handleCancelExit = () => setShowExitConfirm(false);
  const handlePrevious = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  // --- Audio Playback ---
  const playSlideAudio = () => {
    // Stop current playback if any
    // if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) { // If button clicked while playing, just stop
        setIsAudioPlaying(false);
        return;
    }

    let textToSpeak = currentContent.speakText;
    if (!textToSpeak && currentContent.type === 'learn') {
        textToSpeak = Array.isArray(currentContent.description) ? currentContent.description.join(' ') : currentContent.description;
    }

    // Prioritize audio file if available (using SpeechSynthesis as fallback for now)
    if (currentContent.audioSrc) {
        console.warn("Audio file playback (.mp3) requires managing Audio objects. Using SpeechSynthesis as fallback.");
        // --- Basic Audio Object Example (Needs state/ref management for stopping) ---
        // try {
        //   const audio = new Audio(currentContent.audioSrc);
        //   audioRef.current = audio; // Store reference
        //   audio.play();
        //   setIsAudioPlaying(true);
        //   audio.onended = () => { setIsAudioPlaying(false); audioRef.current = null; };
        //   audio.onerror = () => { setIsAudioPlaying(false); audioRef.current = null; console.error("Error playing audio file"); /* Fallback? */ };
        // } catch (e) {
        //   console.error("Failed to play audio src:", e);
        //   if (textToSpeak) speakText(textToSpeak); // Fallback if Audio fails
        // }
        // --- Using SpeechSynthesis as fallback ---
         if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
             speakText(textToSpeak);
         } else {
             setIsAudioPlaying(false); // Ensure state is false if nothing can play
         }

    } else if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
       speakText(textToSpeak); // Use speech synthesis if no audio file
    } else {
        setIsAudioPlaying(false); // Cannot play anything
    }
  };

   const speakText = (text: string) => {
      try {
          const utterance = new SpeechSynthesisUtterance(text);
          // utterance.lang = 'en-US'; // Optional: Set language
          utterance.onstart = () => setIsAudioPlaying(true);
          utterance.onend = () => setIsAudioPlaying(false);

          utterance.onerror = (e) => {
              console.error("SpeechSynthesis Error:", e);
              setIsAudioPlaying(false);
          };
          window.speechSynthesis.speak(utterance);
      } catch (e) {
          console.error("SpeechSynthesis failed:", e);
          setIsAudioPlaying(false);
      }
   };

  // Drag and Drop Handler
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Return if dropped outside or if already checked
    if (!destination || dndChecked) return;

    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;
    
    // Return if dropping in same spot
    if (sourceId === destId && source.index === destination.index) return;

    if (sourceId === destId) {
      // Reordering within same list
      const items = Array.from(dndState[sourceId]);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: items
      }));
    } else {
      // Moving between lists
      const sourceItems = Array.from(dndState[sourceId]);
      const destItems = Array.from(dndState[destId]);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: sourceItems,
        [destId]: destItems
      }));
    }
  };

  // Modify the checkDragDrop function
  const checkDragDrop = () => {
    if (currentContent.type !== 'drag-drop') return;
    let correctCount = 0;
    let incorrectCount = 0;
    const totalPlacedInTargets = dndState.naturalTarget.length + dndState.manMadeTarget.length;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};
    let allItemsPlaced = dndState.sourceItems.length === 0;

    dndState.naturalTarget.forEach(item => {
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });
    
    dndState.manMadeTarget.forEach(item => {
      const isCorrect = item.type === 'man-made';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    if (totalPlacedInTargets === 0) {
      setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else {
      if (incorrectCount === 0) {
        setDndFeedback("Great job! All items are in the correct boxes!");
        // Trigger confetti animation
        setShowConfetti(true);
        // Create confetti effect
        const confettiContainer = document.createElement('div');
        confettiContainer.className = styles.confettiContainer;
        document.body.appendChild(confettiContainer);
        
        // Add multiple confetti pieces
        for (let i = 0; i < 50; i++) {
          const piece = createConfetti();
          confettiContainer.appendChild(piece);
          
          // Remove piece after animation
          piece.addEventListener('animationend', () => {
            piece.remove();
          });
        }
        
        // Remove container after all animations
        setTimeout(() => {
          confettiContainer.remove();
          setShowConfetti(false);
        }, 5000);
      } else {
        setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
        setHearts(prev => Math.max(0, prev - 1));
      }
    }
  };

  // Main Continue Button Logic
  const handleContinue = () => {
    if (currentContent.type === 'drag-drop') {
        if (!dndChecked) { checkDragDrop(); return; }
         // Optional: Prevent continue if failed and out of hearts
         const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);
         if (hearts <= 0 && anyIncorrect && dndState.sourceItems.length === 0) {
             console.log("Out of hearts / Failed DND");
             // Maybe show a modal or different feedback instead of just blocking
             return;
         }
    }
    if (currentSlideIndex < totalSlides - 1) { 
        setCurrentSlideIndex(currentSlideIndex + 1); 
    }
    else { 
        console.log("Lesson Finished! Redirecting to quiz"); 
        router.push('/quiz'); // Changed from '/' to '/quiz'
    }
};

  // --- Rendering ---
  const renderHearts = () => {
      const heartsArray = []; const maxHearts = 3;
      for (let i = 0; i < maxHearts; i++) heartsArray.push(<FontAwesomeIcon key={i} icon={faHeart} style={{ opacity: i < hearts ? 1 : 0.3 }}/>);
      heartsArray.push(<span key="count" style={{ fontWeight: 'bold', marginLeft: '4px', color: 'var(--error-red)' }}>{hearts}</span>);
      return heartsArray;
  };

  // Determine Button State and Style
  let continueButtonText = "Continue";
  let continueButtonDisabled = false;
  let continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`; // Green default

  if (currentContent.type === 'drag-drop') {
    const totalPlaced = dndState.naturalTarget.length + dndState.manMadeTarget.length;
    if (!dndChecked) {
      continueButtonText = "Check Answers";
      continueButtonDisabled = totalPlaced === 0;
      continueButtonClass = styles.continueButton; // Blue for Check
    } else {
      continueButtonText = "Continue";
      const allPlaced = dndState.sourceItems.length === 0;
      const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);
      continueButtonDisabled = hearts <= 0 && anyIncorrect && allPlaced;
      if (allPlaced && anyIncorrect) continueButtonClass = `${styles.continueButton} ${styles.continueButtonIncorrect}`;
      else if (allPlaced && !anyIncorrect) continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`;
      else continueButtonClass = styles.continueButton; // Blue if checked but not all placed
    }
  }
  if (currentSlideIndex === totalSlides - 1 && (currentContent.type !== 'drag-drop' || dndChecked)) { 
    continueButtonText = "Start Quiz"; // Changed from "Finish Lesson" to "Start Quiz"
}
  // --- JSX ---
  return (
    <div className={styles.learningContainer}>
      <div className={styles.learningContent}>
        {/* ----- Header ----- */}
        <header className={styles.learningHeader}>
             <div className={styles.headerNavigation}>
                <button className={styles.backButton} onClick={handleBackClick} title="Exit Lesson"><FontAwesomeIcon icon={faArrowLeft} /></button>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{width: `${progress}%`}}></div></div>
                <div className={styles.headerActions}>
                    <div className={styles.heartsContainer}>{renderHearts()}</div>
                    <button className={styles.settingsButton} title="Settings (Not Implemented)"><FontAwesomeIcon icon={faGear} /></button>
                </div>
            </div>
        </header>

        {/* ----- Main Content ----- */}
        <main className={styles.learningMain}>
          <h1 className={styles.lessonTitle}>{currentContent.title}</h1>

          <div className={styles.learningArea}>
            {/* --- Learning Slide Rendering --- */}
            {currentContent.type === 'learn' && (
                <div className={styles.learningSlideLayout}>
                    {/* Visual Column */}
                    {(currentContent.imageUrl || currentContent.exampleImages) && (
                        <div className={styles.learningVisualColumn}>
                            {currentContent.imageUrl && (
                                <motion.img 
                                    src={currentContent.imageUrl} 
                                    alt={currentContent.title}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            )}
                            {currentContent.exampleImages && !currentContent.imageUrl && (
                                <div className={styles.exampleImageContainer}>
                                    {currentContent.exampleImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className={styles.tooltipWrapper}
                                            data-tooltip={img.alt}
                                            style={{ '--image-index': i } as any}
                                        >
                                            <motion.img 
                                                src={img.src} 
                                                alt={img.alt} 
                                                className={styles.exampleImage}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    rotate: 2,
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 10
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Text Column (Mascot + Speech) */}
                    <div className={styles.learningTextColumn}>
                        <div className={styles.mascotContainer}>
                            <div className={styles.mascotSpeechBubble}>
                                {Array.isArray(currentContent.description) ? 
                                    currentContent.description.map((p, i) => (
                                        <p key={i}>
                                            {formatContentWithEmojis(p)}
                                        </p>
                                    )) 
                                    : 
                                    <p>{formatContentWithEmojis(currentContent.description)}</p>
                                }
                                {(currentContent.audioSrc || currentContent.speakText) && (
                                    <button 
                                        className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                                        onClick={playSlideAudio} 
                                        title={isAudioPlaying ? "Stop" : "Listen"}
                                    >
                                        <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
                                    </button>
                                )}
                            </div>
                            <div className={styles.mascotImageContainer}>
                                <motion.img 
                                    src="/images/mascot.png" 
                                    alt="Owlbert Mascot" 
                                    className={styles.mascotImage}
                                    initial={{ y: 0 }}
                                    animate={{ 
                                        y: [-10, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ 
                                        y: {
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        },
                                        scale: {
                                            duration: 0.3
                                        }
                                    }}
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: [-5, 5, -5, 5, 0],
                                        transition: {
                                            rotate: {
                                                duration: 0.5,
                                                ease: "easeInOut"
                                            }
                                        }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            </div>
                        </div>
                        {currentContent.imageUrl && currentContent.exampleImages && ( // Show examples below text if main image exists
                            <div className={styles.exampleImageContainer}> 
                                {currentContent.exampleImages.map((img, i) => (
                                    <div 
                                        key={i}
                                        className={styles.tooltipWrapper}
                                        data-tooltip={img.alt}
                                    >
                                        <motion.img 
                                            src={img.src} 
                                            alt={img.alt} 
                                            className={styles.exampleImage}
                                            title={img.alt}
                                            whileHover={{ 
                                                scale: 1.05,
                                                rotate: 2,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 10
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- Drag and Drop Slide Rendering --- */}
            {currentContent.type === 'drag-drop' && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.dragDropArea}>
                  <div style={{textAlign: 'center'}}>
                    <p className={styles.dragDropInstruction}>{currentContent.instruction}</p>
                    {(currentContent.audioSrc || currentContent.speakText) && (
                      <button 
                        className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                        onClick={playSlideAudio} 
                        title={isAudioPlaying ? "Stop" : "Listen"} 
                        style={{marginTop: '-10px', marginBottom: '20px'}}
                      >
                        <FontAwesomeIcon icon={faHeadphones} /> Listen
                      </button>
                    )}
                  </div>

                  {/* Source List */}
                  <Droppable droppableId="sourceItems" direction="horizontal">
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                        className={styles.draggableSourceList}
                        style={{
                          borderColor: snapshot.isDraggingOver ? 'var(--primary-blue)' : 'var(--border-light)',
                          background: snapshot.isDraggingOver ? 'var(--bg-hover)' : 'var(--bg-light)'
                        }}
                      >
                        {dndState.sourceItems?.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.draggableItem} ${snapshot.isDragging ? styles.draggableItemDragging : ''}`}
                                style={provided.draggableProps.style}
                              >
                                {item.imageUrl && (
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.text} 
                                    style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}
                                  />
                                )}
                                {item.text}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* Target Lists */}
                  <div className={styles.dropTargetsContainer}>
                    {currentContent.targets.map((target) => (
                      <Droppable key={target.id} droppableId={target.id}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`${styles.dropTargetColumn} 
                              ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''} 
                              ${dndChecked && !Object.values(itemCorrectness).some(correct => !correct) ? styles.allCorrect : ''}`}
                          >
                            <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                              <FontAwesomeIcon icon={target.type === 'natural' ? faLeaf : faWrench} style={{ marginRight: '8px'}}/>
                              {target.title}
                            </h3>
                            <div className={styles.dropTargetList}>
                              {dndState[target.id]?.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`${styles.draggableItem} ${dndChecked ? (itemCorrectness[item.id] ? styles.itemCorrect : styles.itemIncorrect) : ''}`}
                                      style={provided.draggableProps.style}
                                    >
                                      {item.imageUrl && (
                                        <img 
                                          src={item.imageUrl} 
                                          alt={item.text} 
                                          style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}
                                        />
                                      )}
                                      {item.text}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>

                  {/* Feedback Message */}
                  {dndFeedback && (
                    <div className={`${styles.dragDropFeedback} ${dndChecked && !Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0 ? styles.dragDropFeedbackCorrect : styles.dragDropFeedbackIncorrect}`}>
                      {dndFeedback}
                    </div>
                  )}
                </div>
              </DragDropContext>
            )}
          </div> {/* End learningArea */}
        </main>

        {/* ----- Footer ----- */}
        <footer className={styles.learningFooter}>
              <button className={styles.previousButton} onClick={handlePrevious} disabled={currentSlideIndex === 0}> <FontAwesomeIcon icon={faArrowLeft} /> Previous </button>
              <button className={continueButtonClass} onClick={handleContinue} disabled={continueButtonDisabled}> {continueButtonText} <FontAwesomeIcon icon={faArrowRight} /> </button>
        </footer>
      </div> {/* End learningContent */}

       {/* --- Exit Modal --- */}
       {showExitConfirm && (
           <div className={styles.modalOverlay} onClick={handleCancelExit}>
               <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                   <h2>Exit Lesson?</h2> <p>Your progress might not be saved.</p>
                   <div className={styles.modalButtons}>
                       <button className={styles.modalCancel} onClick={handleCancelExit}>Cancel</button>
                       <button className={styles.modalConfirm} onClick={handleConfirmExit}>Exit Anyway</button>
                   </div>
               </div>
           </div>
       )}
    </div> 
  );
}
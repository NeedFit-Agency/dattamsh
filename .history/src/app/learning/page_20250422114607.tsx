'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faGear,
  // faVolumeUp, // Keep if planning UI audio indicator
  // faCheck,    // Keep if planning explicit checkmark UI
  // faTimes,    // Keep if planning explicit times UI
  faHeart,
  faLeaf,       // Icon for Natural
  faWrench,     // Icon for Man-made
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
// Removed unused Tooltip import
// import { Tooltip } from '@/components/ui/Tooltip';

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
          // Consider removing animation if distracting or performance issue
          // animation: 'wiggle 2s infinite ease-in-out'
        }}>{part}</span>;
      }
      return part;
    });
  }

  // If text contains formatting like bullet points or numbered steps
  // Improved regex to handle more list types (., ), -, *, •)
  if (/^\s*(\d+[\.\)]|[•\-\*])\s+/.test(text)) {
     // Render as a list item structure might be better if using real lists
     // For now, just bolding as before
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
  // Standardized to only 'natural' or 'man-made' for current logic
  type: 'natural' | 'man-made';
  imageUrl?: string; // Image for the draggable item itself
}

interface DropTargetData {
    // Standardized IDs to match state keys and item types
  id: 'naturalTarget' | 'manMadeTarget';
  title: string;
  // Standardized to only 'natural' or 'man-made' for current logic
  type: 'natural' | 'man-made';
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
      // Standardized types to 'natural' or 'man-made'
      { id: 'dnd-item-1', text: 'Tree', type: 'natural', imageUrl: '/images/tree-small.png' },
      { id: 'dnd-item-2', text: 'Chair', type: 'man-made', imageUrl: '/images/chair-small.png' },
      { id: 'dnd-item-3', text: 'Bird', type: 'natural', imageUrl: '/images/bird-small.png' },
      { id: 'dnd-item-4', text: 'Cycle', type: 'man-made', imageUrl: '/images/cycle-small.png' },
      { id: 'dnd-item-5', text: 'Sun', type: 'natural', imageUrl: '/images/sun-small.png' },
      { id: 'dnd-item-6', text: 'Blackboard', type: 'man-made', imageUrl: '/images/blackboard-small.png' },
    ],
    targets: [
      // Standardized target IDs and types
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

// --- Chapter 2: All About Computers ------
const contentChapter2: LessonContent[] = [
  {
    type: 'learn',
    title: 'Introduction to Computers',
    description: [
      'Hello friends! Today we\'re going to learn all about computers.', // Removed trailing 'computers.'
      'Computers are special machines that help us do many things.',
      'They can help us learn, play games, and talk to people far away.', // Removed trailing ',y lives.'
      'Let\'s discover what computers are and how they work!',
    ],
    // Corrected typo: ageUrl -> imageUrl
    imageUrl: '/images/computer-intro.png',
    audioSrc: '/audio/21_intro_computer.mp3', // Corrected path/text mismatch if any
    speakText: 'Hello friends! Today we\'re going to learn all about computers. Computers are special machines that help us do many things. They can help us learn, play games, and talk to people far away. Let\'s discover what computers are and how they work!'
  },
  {
    // Corrected duplicate type and title issue
    type: 'learn',
    title: 'Parts of a Computer',
    description: 'A computer has many important parts. These are the main parts of a computer:',
    exampleImages: [
      { src: '/images/monitor.png', alt: 'Monitor - Shows pictures and words' },
      { src: '/images/keyboard.png', alt: 'Keyboard - Used to type letters and numbers' },
      { src: '/images/mouse.png', alt: 'Mouse - Helps you point and click' },
      { src: '/images/cpu.png', alt: 'CPU - The brain of the computer' },
    ],
    audioSrc: '/audio/22_computer_parts.mp3',
    speakText: 'A computer has many important parts. These are the main parts of a computer: The monitor shows pictures and words. The keyboard is used to type letters and numbers. The mouse helps you point and click. The CPU is the brain of the computer.'
  },
  {
    // Corrected duplicate type and title issue
    type: 'learn',
    title: 'What Computers Can Do',
    description: 'Computers can do many amazing things to help us:',
    exampleImages: [
      { src: '/images/learning.png', alt: 'Learning - Computers help us learn new things' },
      { src: '/images/drawing.png', alt: 'Drawing - We can draw pictures on computers' },
      { src: '/images/watching.png', alt: 'Watching - We can watch videos and cartoons' },
      { src: '/images/games.png', alt: 'Games - We can play fun games on computers' },
    ],
    audioSrc: '/audio/23_computer_uses.mp3',
    speakText: 'Computers can do many amazing things to help us: Computers help us learn new things. We can draw pictures on computers. We can watch videos and cartoons. We can play fun games on computers.'
  },
  {
    // Corrected duplicate type and title issue
    type: 'drag-drop',
    title: 'Computer Parts Activity',
    // Updated instruction & types for Hardware/Software (Natural/Man-made)
    instruction: 'Drag each item to where it belongs: Hardware (Man-made things you can touch) or Software (Natural concepts/programs)',
    items: [
      // Standardized types to 'natural' (Software) or 'man-made' (Hardware)
      { id: 'cp-item-1', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor-small.png' },
      { id: 'cp-item-2', text: 'Video Game', type: 'natural', imageUrl: '/images/game-small.png' },
      { id: 'cp-item-3', text: 'Keyboard', type: 'man-made', imageUrl: '/images/keyboard-small.png' },
      { id: 'cp-item-4', text: 'Drawing App', type: 'natural', imageUrl: '/images/drawing-app-small.png' },
      { id: 'cp-item-5', text: 'Mouse', type: 'man-made', imageUrl: '/images/mouse-small.png' },
      { id: 'cp-item-6', text: 'Math Program', type: 'natural', imageUrl: '/images/math-app-small.png' },
    ],
    targets: [
      // Standardized target IDs and types
      { id: 'manMadeTarget', title: 'Hardware (Man-made)', type: 'man-made' },
      { id: 'naturalTarget', title: 'Software (Natural Concept)', type: 'natural' },
    ],
    audioSrc: '/audio/24_sort_parts.mp3',
    speakText: 'Let\'s play a sorting game! Drag each item to where it belongs. Is it Hardware that you can touch (man-made), or Software that runs on the computer (a natural concept)? Think about which is which!'
  },
  {
    // Corrected duplicate type
    type: 'learn',
    title: 'Computer Safety Rules',
    description: [
      'When using computers, we need to follow some important rules:',
      '• Always wash your hands before using a computer',
      '• Be gentle with the keyboard and mouse',
      '• Don\'t eat or drink near the computer',
      '• Don\'t pull on any wires or cables',
      '• Ask a grown-up for help when needed',
      '• Take breaks to rest your eyes and body',
    ],
    imageUrl: '/images/computer-safety.png',
    audioSrc: '/audio/25_computer_safety.mp3',
    speakText: 'When using computers, we need to follow some important rules: Always wash your hands before using a computer. Be gentle with the keyboard and mouse. Don\'t eat or drink near the computer. Don\'t pull on any wires or cables. Ask a grown-up for help when needed. Take breaks to rest your eyes and body.'
  }
];

// --- Chapter 3: Computer Care and Safety ---
const contentChapter3: LessonContent[] = [
    {
    type: 'learn',
    title: 'Taking Care of Computers',
    description: [
      'Hi there! I\'m Bitsy! Today we\'ll learn how to take good care of computers.',
      'Computers are delicate machines that need proper care to work well.',
      'Taking care of computers helps them last longer and work better.',
      'Let\'s learn some important rules for computer care!'
    ],
    imageUrl: '/images/computer-care-intro.png',
    audioSrc: '/audio/31_intro_care.mp3',
    speakText: 'Hi there! I\'m Bitsy! Today we\'ll learn how to take good care of computers. Computers are delicate machines that need proper care to work well. Taking care of computers helps them last longer and work better. Let\'s learn some important rules for computer care!'
  },
  {
    type: 'learn',
    title: 'Keeping Computers Clean',
    description: 'Keeping computers clean is very important. Here are ways to keep them clean:',
    exampleImages: [
      { src: '/images/clean-hands.png', alt: 'Clean hands - Always wash hands before using a computer' },
      { src: '/images/no-food.png', alt: 'No food or drinks - Keep food and drinks away from computers' },
      { src: '/images/dust-free.png', alt: 'Dust-free - Keep dust away from computers' },
      { src: '/images/clean-screen.png', alt: 'Clean screen - Keep the screen clean and clear' },
    ],
    audioSrc: '/audio/32_keep_clean.mp3',
    speakText: 'Keeping computers clean is very important. Here are ways to keep them clean: Always wash hands before using a computer. Keep food and drinks away from computers. Keep dust away from computers. Keep the screen clean and clear.'
  },
  {
    type: 'learn',
    title: 'Safe Computer Use',
    description: 'Using computers safely keeps you and the computer protected:',
    exampleImages: [
      { src: '/images/good-posture.png', alt: 'Good posture - Sit straight when using a computer' },
      { src: '/images/eye-distance.png', alt: 'Eye distance - Keep your eyes at a safe distance from the screen' },
      { src: '/images/break-time.png', alt: 'Break time - Take breaks to rest your eyes and body' },
      { src: '/images/adult-help.png', alt: 'Adult help - Ask for help when needed' },
    ],
    audioSrc: '/audio/33_safe_use.mp3',
    speakText: 'Using computers safely keeps you and the computer protected: Sit straight when using a computer. Keep your eyes at a safe distance from the screen. Take breaks to rest your eyes and body. Ask for help when needed.'
  },
  {
    type: 'drag-drop',
    title: 'Computer Safety Rules',
    // Updated instruction & types for Good/Bad Habits (Natural/Man-made)
    instruction: 'Drag each action to the correct category: Good Computer Habits (Natural Instinct/Good) or Bad Computer Habits (Man-made Mistakes/Bad)',
    items: [
      // Standardized types to 'natural' (Good) or 'man-made' (Bad)
      { id: 'cs-item-1', text: 'Wash hands before use', type: 'natural', imageUrl: '/images/clean-hands-small.png' },
      { id: 'cs-item-2', text: 'Eating near computer', type: 'man-made', imageUrl: '/images/eating-small.png' },
      { id: 'cs-item-3', text: 'Taking short breaks', type: 'natural', imageUrl: '/images/break-small.png' },
      { id: 'cs-item-4', text: 'Pulling on cables', type: 'man-made', imageUrl: '/images/pulling-small.png' },
      { id: 'cs-item-5', text: 'Sitting up straight', type: 'natural', imageUrl: '/images/posture-small.png' },
      // Assuming touching screen with dirty fingers is bad
      { id: 'cs-item-6', text: 'Touching screen with dirty fingers', type: 'man-made', imageUrl: '/images/touching-small.png' },
    ],
    targets: [
      // Standardized target IDs and types
      { id: 'naturalTarget', title: 'Good Computer Habits', type: 'natural' },
      { id: 'manMadeTarget', title: 'Bad Computer Habits', type: 'man-made' },
    ],
    audioSrc: '/audio/34_sort_habits.mp3',
    speakText: 'Let\'s play a sorting game! Drag each action to the correct category: Good Computer Habits or Bad Computer Habits. Think about which actions help keep computers safe and which might harm them!'
  },
  {
    type: 'learn',
    title: 'When to Ask for Help',
    description: [
      'Sometimes we need help with computers. Ask a grown-up when:',
      '• Something stops working',
      '• You see an error message',
      '• You don\'t know what to do next',
      '• You accidentally click on something unfamiliar',
      '• The computer makes strange sounds',
      '• You need to plug in or unplug something',
    ],
    imageUrl: '/images/ask-for-help.png',
    audioSrc: '/audio/35_ask_help.mp3',
    speakText: 'Sometimes we need help with computers. Ask a grown-up when: Something stops working. You see an error message. You don\'t know what to do next. You accidentally click on something unfamiliar. The computer makes strange sounds. You need to plug in or unplug something.'
  }
];

// --- Chapter 4: Keyboard and Mouse Fun ---
const contentChapter4: LessonContent[] = [
  {
    type: 'learn',
    title: 'Using Computer Input Devices',
    description: [
      'Hello, computer explorer!',
      'Today we\'ll learn about the keyboard and mouse.',
      'These are special tools that help us tell the computer what to do.',
      'Let\'s discover how to use them the right way!'
    ],
    imageUrl: '/images/input-devices.png',
    audioSrc: '/audio/41_input_intro.mp3',
    speakText: 'Hello, computer explorer! Today we\'ll learn about the keyboard and mouse. These are special tools that help us tell the computer what to do. Let\'s discover how to use them the right way!'
  },
  {
    type: 'learn',
    title: 'Using the Mouse',
    description: 'The mouse helps us point and click on things. Here\'s how to use it:',
    exampleImages: [
      { src: '/images/mouse-hold.png', alt: 'Hold the mouse - Hold it gently with your fingertips' },
      { src: '/images/mouse-click.png', alt: 'Click - Press the button to select things' },
      { src: '/images/mouse-double-click.png', alt: 'Double-click - Click twice quickly to open things' },
      { src: '/images/mouse-drag.png', alt: 'Drag - Hold the button down while moving to drag things' },
    ],
    audioSrc: '/audio/42_using_mouse.mp3',
    speakText: 'The mouse helps us point and click on things. Here\'s how to use it: Hold it gently with your fingertips. Press the button to select things. Click twice quickly to open things. Hold the button down while moving to drag things.'
  },
  {
    type: 'learn',
    title: 'Using the Keyboard',
    description: 'The keyboard helps us type letters, numbers, and special commands:',
    exampleImages: [
      { src: '/images/letter-keys.png', alt: 'Letter keys - Type words and sentences' },
      { src: '/images/number-keys.png', alt: 'Number keys - Type numbers' },
      { src: '/images/space-bar.png', alt: 'Space bar - Makes spaces between words' },
      { src: '/images/enter-key.png', alt: 'Enter key - Starts a new line or submits information' },
    ],
    audioSrc: '/audio/43_using_keyboard.mp3',
    speakText: 'The keyboard helps us type letters, numbers, and special commands: Letter keys let you type words and sentences. Number keys let you type numbers. The space bar makes spaces between words. The enter key starts a new line or submits information.'
  },
  {
    type: 'drag-drop',
    title: 'Match the Input Actions',
    // Updated instruction & types for Mouse/Keyboard (Man-made/Natural Device)
    instruction: 'Match each action to the correct device: Mouse (Man-made Pointer) or Keyboard (Natural Typing)',
    items: [
      // Standardized types to 'natural' (Keyboard) or 'man-made' (Mouse)
      { id: 'in-item-1', text: 'Click to select', type: 'man-made', imageUrl: '/images/click-small.png' },
      { id: 'in-item-2', text: 'Type your name', type: 'natural', imageUrl: '/images/type-small.png' },
      { id: 'in-item-3', text: 'Drag and drop', type: 'man-made', imageUrl: '/images/drag-small.png' },
      { id: 'in-item-4', text: 'Press Enter', type: 'natural', imageUrl: '/images/enter-small.png' },
      { id: 'in-item-5', text: 'Double-click icon', type: 'man-made', imageUrl: '/images/double-click-small.png' },
      { id: 'in-item-6', text: 'Press Space bar', type: 'natural', imageUrl: '/images/space-small.png' },
    ],
    targets: [
       // Standardized target IDs and types
      { id: 'manMadeTarget', title: 'Mouse Actions', type: 'man-made' },
      { id: 'naturalTarget', title: 'Keyboard Actions', type: 'natural' },
    ],
    audioSrc: '/audio/44_match_actions.mp3',
    speakText: 'Match each action to the correct device: Mouse or Keyboard. Drag the actions to either Mouse Actions or Keyboard Actions based on which device you would use!'
  },
  {
    type: 'learn',
    title: 'Practice Makes Perfect',
    description: [
      'The more you practice using the mouse and keyboard, the better you\'ll get!',
      'Here are some fun ways to practice:',
      '• Drawing programs to practice mouse control',
      '• Typing games to learn keyboard letters',
      '• Simple computer games that use both',
      '• Ask your teacher or parents for computer time to practice',
      '• Remember to take breaks and have fun while learning!'
    ],
    imageUrl: '/images/practice-skills.png',
    audioSrc: '/audio/45_practice.mp3',
    speakText: 'The more you practice using the mouse and keyboard, the better you\'ll get! Here are some fun ways to practice: Drawing programs to practice mouse control. Typing games to learn keyboard letters. Simple computer games that use both. Ask your teacher or parents for computer time to practice. Remember to take breaks and have fun while learning!'
  }
];
// --- End Lesson Content ---


// Removed unused helper functions: reorder, move, getStyle

// Add this function at the top level for confetti creation
const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = styles.confetti; // Assumes .confetti class exists in CSS
  // Random properties for more natural animation
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Between 2-5s
  confetti.style.opacity = '1';
  // Assumes confettiFall keyframes exist in CSS
  confetti.style.animation = `${styles.confettiFall} ${Math.random() * 3 + 2}s linear forwards`;

  return confetti;
};

export default function LearningPage() {
  // --- State ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3); // Max hearts
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const router = useRouter();

  // Content Selection State
  const [chapterContent, setChapterContent] = useState<LessonContent[]>(lessonContent); // Default to chapter 1
  const [standard, setStandard] = useState<string>('1'); // Default standard
  const [chapter, setChapter] = useState<string>('1'); // Default chapter

  // Drag-and-Drop State - Initialized for natural/man-made targets
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({
     sourceItems: [],
     naturalTarget: [],
     manMadeTarget: []
    });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  // Reference to currently playing audio object (if using Audio API - currently commented out)
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const [showConfetti, setShowConfetti] = useState(false); // State to trigger confetti container

  const totalSlides = chapterContent.length;
  // Handle cases where chapterContent might be temporarily empty during loading
  const currentContent = chapterContent[currentSlideIndex] || chapterContent[0] || null;

  // --- Effects ---

  // Read URL parameters on initial load and set content
  useEffect(() => {
    // Ensure this runs only on the client
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
          console.warn("Using default content for Standard 1, Chapter:", chapterParam);
          selectedContent = lessonContent; // Fallback to Chapter 1 content
      }
    }
    // --- Standard 2 Content Loading Logic Removed ---
    // If you add Standard 2 content, define the variables
    // (contentStandard2Chapter1, etc.) and uncomment/add the else if block here.
    /*
    else if (standardParam === '2') {
      // Make sure contentStandard2Chapter1, etc. ARE DEFINED before uncommenting
      switch (chapterParam) {
        case '1':
          selectedContent = contentStandard2Chapter1; // UNDEFINED
          break;
        case '2':
          selectedContent = contentStandard2Chapter2; // UNDEFINED
          break;
        // ... etc
        default:
           console.warn("Using default content for Standard 2, Chapter:", chapterParam);
           selectedContent = contentStandard2Chapter1; // UNDEFINED
      }
    }
    */
    else {
        console.warn(`Unsupported standard: ${standardParam}. Defaulting to Standard 1 content.`);
        selectedContent = lessonContent;
    }


    console.log(`Selected content for Standard ${standardParam}, Chapter ${chapterParam} with ${selectedContent.length} slides.`);
    setChapterContent(selectedContent);
    // Reset to the first slide whenever content changes
    setCurrentSlideIndex(0);
    setProgress(0); // Reset progress as well

  }, []); // Run only once on mount to get URL params


  // Reset state when slide changes
  useEffect(() => {
    // Stop any playing audio/speech
    window.speechSynthesis?.cancel();
    setIsAudioPlaying(false);
    // if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } // If using Audio API

    // Initialize DND state if it's a DND slide
    const currentSlideData = chapterContent[currentSlideIndex]; // Use the correct reference
    if (currentSlideData && currentSlideData.type === 'drag-drop') {
      setDndState({
        // Ensure sourceItems is properly initialized from the slide data
        sourceItems: currentSlideData.items ? [...currentSlideData.items] : [],
        naturalTarget: [],
        manMadeTarget: []
      });
      setDndChecked(false);
      setDndFeedback(null);
      setItemCorrectness({});
      setShowConfetti(false); // Reset confetti
    }
  }, [currentSlideIndex, chapterContent]); // Depend on chapterContent as well


  // Update progress bar
  useEffect(() => {
    if (totalSlides > 0) {
        setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
    } else {
        setProgress(0);
    }
  }, [currentSlideIndex, totalSlides]);


  // Preload images (optional but good practice)
  useEffect(() => {
    if (!chapterContent || chapterContent.length === 0) return;

    chapterContent.forEach(slide => {
      if (slide.type === 'learn') {
        if (slide.imageUrl) { const img = new Image(); img.src = slide.imageUrl; }
        slide.exampleImages?.forEach(imgData => { const img = new Image(); img.src = imgData.src; });
      } else if (slide.type === 'drag-drop') {
        slide.items?.forEach(item => { if (item.imageUrl) { const img = new Image(); img.src = item.imageUrl; }});
      }
    });
  }, [chapterContent]); // Rerun if content array changes


  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      // if (audioRef.current) { audioRef.current.pause(); } // If using Audio API
    };
  }, []);

  // --- Handlers ---

  const handleBackClick = () => {
    // Check if trying to go back from the first slide
    if (currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
        // Show exit confirmation modal only on the first slide
        setShowExitConfirm(true);
    }
  };

  const handleConfirmExit = () => {
      setShowExitConfirm(false); // Close modal
      // Navigate back to a chapter selection or dashboard page
      // Adjust the target route as needed (e.g., '/learn' or `/learn/${standard}`)
      router.push(`/learn/${standard}`);
    };
  const handleCancelExit = () => setShowExitConfirm(false);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // --- Audio Playback ---
  const playSlideAudio = useCallback(() => {
      if (!currentContent) return; // Exit if no current content

      window.speechSynthesis?.cancel();
      // if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }

      if (isAudioPlaying) { // If button clicked while playing, just stop
          setIsAudioPlaying(false);
          return;
      }

      let textToSpeak = currentContent.speakText;
      if (!textToSpeak && currentContent.type === 'learn') {
          textToSpeak = Array.isArray(currentContent.description)
              ? currentContent.description.join(' ')
              : currentContent.description;
      }
       if (!textToSpeak && currentContent.type === 'drag-drop') {
          textToSpeak = currentContent.instruction;
       }


      // Prioritize audio file if available (using SpeechSynthesis as fallback for now)
      if (currentContent.audioSrc) {
          console.warn("Audio file playback (.mp3) not fully implemented. Using SpeechSynthesis fallback.");
          // --- Basic Audio Object Example (Needs better state/ref management for robust control) ---
          // try {
          //   const audio = new Audio(currentContent.audioSrc);
          //   // audioRef.current = audio; // Requires useRef
          //   audio.play();
          //   setIsAudioPlaying(true);
          //   audio.onended = () => { setIsAudioPlaying(false); /* audioRef.current = null; */ };
          //   audio.onerror = (e) => { setIsAudioPlaying(false); /* audioRef.current = null; */ console.error("Error playing audio file:", e); if (textToSpeak) speakText(textToSpeak); }; // Fallback on error
          // } catch (e) {
          //   console.error("Failed to play audio src:", e);
          //   if (textToSpeak) speakText(textToSpeak); // Fallback if Audio fails
          // }
          // --- Using SpeechSynthesis as primary for now ---
           if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
               speakText(textToSpeak);
           } else {
               setIsAudioPlaying(false); // Ensure state is false if nothing can play
           }
      } else if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
         speakText(textToSpeak); // Use speech synthesis if no audio file
      } else {
          console.log("No audio source or text to speak for this slide.");
          setIsAudioPlaying(false); // Cannot play anything
      }
  // Dependencies for useCallback
  }, [currentContent, isAudioPlaying]);

   const speakText = (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
          console.error("SpeechSynthesis API not available.");
          setIsAudioPlaying(false);
          return;
      }
      try {
          const utterance = new SpeechSynthesisUtterance(text);
          // utterance.lang = 'en-US'; // Optional: Set language if needed
          // utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female'); // Example voice selection
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

    // Return if dropped outside a droppable, or if DND is already checked/locked
    if (!destination || dndChecked) return;

    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;

    // Return if dropping in the exact same spot
    if (sourceId === destId && source.index === destination.index) return;

    // Get the source and destination arrays immutably
    const sourceItems = dndState[sourceId] ? [...dndState[sourceId]] : [];
    const destItems = dndState[destId] ? [...dndState[destId]] : [];

    // --- Logic for moving items ---
    if (sourceId === destId) {
      // Reordering within the same list
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: sourceItems
      }));
    } else {
      // Moving between lists (sourceItems to a target, or between targets)
      if (sourceItems.length > source.index) { // Check if source index is valid
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);

          setDndState(prev => ({
            ...prev,
            [sourceId]: sourceItems,
            [destId]: destItems
          }));
      } else {
          console.error("Drag source index out of bounds.");
      }
    }
  };

  // Check Drag and Drop Answers
  const checkDragDrop = () => {
    if (!currentContent || currentContent.type !== 'drag-drop') return;

    let correctCount = 0;
    let incorrectCount = 0;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};

    // Check items in the 'naturalTarget' droppable
    dndState.naturalTarget?.forEach(item => {
        // Check if the item's actual type matches the target's expected type ('natural')
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    // Check items in the 'manMadeTarget' droppable
    dndState.manMadeTarget?.forEach(item => {
         // Check if the item's actual type matches the target's expected type ('man-made')
      const isCorrect = item.type === 'man-made';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true); // Lock dragging

    const totalPlacedInTargets = (dndState.naturalTarget?.length || 0) + (dndState.manMadeTarget?.length || 0);
    const allItemsPlaced = (dndState.sourceItems?.length || 0) === 0;

    if (totalPlacedInTargets === 0) {
      setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else { // All items are placed in targets
      if (incorrectCount === 0) {
        setDndFeedback("Great job! All items are in the correct boxes!");
        // Trigger confetti animation
        setShowConfetti(true); // Set state to show container
        // Create confetti effect DOM elements
        const confettiContainer = document.createElement('div');
        // Assumes .confettiContainer class exists in CSS for positioning/overflow
        confettiContainer.className = styles.confettiContainer;
        document.body.appendChild(confettiContainer); // Append to body

        // Add multiple confetti pieces
        for (let i = 0; i < 50; i++) {
          const piece = createConfetti();
          confettiContainer.appendChild(piece);
          // Remove piece after animation ends
          piece.addEventListener('animationend', () => {
            piece.remove();
          });
        }

        // Remove container after animations likely finished (e.g., 5 seconds)
        setTimeout(() => {
          confettiContainer.remove();
          setShowConfetti(false); // Hide container state (optional)
        }, 5000); // Adjust timeout based on longest confetti animation

      } else {
        setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
        // Decrement hearts only if there were incorrect items *and* all items were placed
        setHearts(prev => Math.max(0, prev - 1));
      }
    }
  };

  // Main Continue Button Logic
  const handleContinue = () => {
    if (!currentContent) return;

    if (currentContent.type === 'drag-drop') {
        if (!dndChecked) {
            // If not checked yet, the button click should trigger the check
            checkDragDrop();
            return; // Don't proceed to next slide yet
        }
         // If checked, check for correctness and hearts
         const allPlaced = (dndState.sourceItems?.length || 0) === 0;
         const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);

         // Prevent continue if DND failed, all items are placed, and out of hearts
         if (hearts <= 0 && anyIncorrect && allPlaced) {
             console.log("Out of hearts / Failed DND - Cannot continue");
             setDndFeedback("Oops! You're out of hearts. Try reviewing the items again or move to the next lesson."); // Provide feedback
             // Maybe disable button visually as well (handled by continueButtonDisabled)
             return;
         }
         // Allow continue if correct, or if incorrect but still have hearts, or if not all items placed yet (user might want to skip)
    }

    // Proceed to next slide or finish
    if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
    }
    else {
        console.log("Lesson Finished! Redirecting to quiz page for Standard/Chapter:", standard, chapter);
        // Navigate to a quiz page, potentially passing standard/chapter
        router.push(`/quiz?standard=${standard}&chapter=${chapter}`); // Pass params to quiz
    }
  };


  // --- Rendering ---
  const renderHearts = () => {
      const heartsArray = [];
      const maxHearts = 3; // Define max hearts
      for (let i = 0; i < maxHearts; i++) {
          heartsArray.push(
            <FontAwesomeIcon
                key={i}
                icon={faHeart}
                className={`${styles.heartIcon} ${i < hearts ? styles.heartIconFull : styles.heartIconEmpty}`}
            />
          );
      }
      // Optional: Add numeric display
      // heartsArray.push(<span key="count" style={{ fontWeight: 'bold', marginLeft: '4px', color: hearts > 0 ? 'var(--text-color)' : 'var(--error-red)' }}>{hearts}</span>);
      return heartsArray;
  };

  // Determine Button State and Style
  let continueButtonText = "Continue";
  let continueButtonDisabled = false;
  let continueButtonClass = `${styles.continueButton}`; // Base class

  if (currentContent && currentContent.type === 'drag-drop') {
    const totalPlaced = (dndState.naturalTarget?.length || 0) + (dndState.manMadeTarget?.length || 0);
    const allPlaced = (dndState.sourceItems?.length || 0) === 0;
    const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);

    if (!dndChecked) {
      continueButtonText = "Check Answers";
      // Disable check button if nothing is placed
      continueButtonDisabled = totalPlaced === 0;
      continueButtonClass += ` ${styles.continueButtonCheck}`; // Blue style for Check
    } else { // DND is checked
      continueButtonText = "Continue";
      // Disable continue button if all placed, incorrect, and no hearts left
      continueButtonDisabled = hearts <= 0 && anyIncorrect && allPlaced;

      if (allPlaced && anyIncorrect) {
           continueButtonClass += ` ${styles.continueButtonIncorrect}`; // Red style for incorrect
      } else if (allPlaced && !anyIncorrect) {
           continueButtonClass += ` ${styles.continueButtonCorrect}`; // Green style for correct
      } else {
           continueButtonClass += ` ${styles.continueButtonCheck}`; // Blue style if checked but not finished/correct
      }
    }
  } else {
      // Default for non-DND slides
      continueButtonClass += ` ${styles.continueButtonCorrect}`; // Green style
  }

  // Change text on the very last slide
  if (currentSlideIndex === totalSlides - 1 && (!currentContent || currentContent.type !== 'drag-drop' || dndChecked)) {
    // Only change to "Start Quiz" if it's the last slide AND (it's not DND OR the DND is checked)
    const allowFinish = currentContent.type !== 'drag-drop' || (dndChecked && !(hearts <= 0 && Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0));
    if (allowFinish) {
        continueButtonText = "Start Quiz";
    }
  }

  // Prevent rendering if content is not yet loaded
   if (!currentContent) {
        return <div className={styles.loadingMessage}>Loading Lesson...</div>; // Or a loading spinner
   }


  // --- JSX ---
  return (
    <div className={styles.learningContainer}>
      {/* Add Confetti Container if needed for specific positioning */}
      {/* {showConfetti && <div className={styles.confettiRootContainer}></div>} */}

      <div className={styles.learningContent}>
        {/* ----- Header ----- */}
        <header className={styles.learningHeader}>
             <div className={styles.headerNavigation}>
                {/* Changed back button to exit confirmation on first slide */}
                <button
                    className={styles.backButton}
                    onClick={handleBackClick}
                    title={currentSlideIndex === 0 ? "Exit Lesson" : "Previous Slide"}
                    aria-label={currentSlideIndex === 0 ? "Exit Lesson" : "Previous Slide"}
                >
                     <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className={styles.progressBarContainer} title={`Progress: ${Math.round(progress)}%`}>
                    <div className={styles.progressFill} style={{width: `${progress}%`}}></div>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.heartsContainer} aria-label={`Hearts remaining: ${hearts}`}>{renderHearts()}</div>
                    {/* Settings button can be implemented later */}
                    <button className={styles.settingsButton} title="Settings (Not Implemented)" aria-label="Settings" disabled>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
            </div>
        </header>

        {/* ----- Main Content ----- */}
        <main className={styles.learningMain}>
          {/* Use motion for title transition */}
          <motion.h1
            key={currentSlideIndex} // Animate when index changes
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.lessonTitle}
          >
              {currentContent.title}
          </motion.h1>

          <div className={styles.learningArea}>
            {/* --- Learning Slide Rendering --- */}
            {currentContent.type === 'learn' && (
                // Use motion for slide transition
                <motion.div
                    key={`learn-${currentSlideIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={styles.learningSlideLayout}
                 >
                    {/* Visual Column */}
                    {(currentContent.imageUrl || currentContent.exampleImages) && (
                        <div className={styles.learningVisualColumn}>
                            {currentContent.imageUrl && (
                                <motion.img
                                    src={currentContent.imageUrl}
                                    alt={currentContent.title || 'Lesson image'} // Add alt text
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className={styles.mainImage} // Add specific class if needed
                                />
                            )}
                            {/* Only show example images here if NO main image exists */}
                            {currentContent.exampleImages && !currentContent.imageUrl && (
                                <div className={`${styles.exampleImageContainer} ${styles.exampleImageGrid}`}>
                                    {currentContent.exampleImages.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            className={styles.tooltipWrapper} // Use for tooltip logic if re-added
                                            // data-tooltip={img.alt} // For CSS tooltips
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <motion.img
                                                src={img.src}
                                                alt={img.alt} // Important for accessibility
                                                title={img.alt} // Tooltip on hover
                                                className={styles.exampleImage}
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotate: Math.random() * 4 - 2, // Slight random rotation
                                                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                                                    transition: { type: "spring", stiffness: 300, damping: 10 }
                                                }}
                                            />
                                        </motion.div>
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
                                        // Use motion for paragraph appearance
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            {formatContentWithEmojis(p)}
                                        </motion.p>
                                    ))
                                    :
                                    <p>{formatContentWithEmojis(currentContent.description)}</p>
                                }
                                {(currentContent.audioSrc || currentContent.speakText) && (
                                    <button
                                        className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                                        onClick={playSlideAudio}
                                        title={isAudioPlaying ? "Stop Audio" : "Listen to Text"}
                                        aria-label={isAudioPlaying ? "Stop Audio" : "Listen to Text"}
                                    >
                                        <FontAwesomeIcon icon={faHeadphones} />
                                        <span className={styles.audioButtonText}>{isAudioPlaying ? "Listening..." : "Listen"}</span>
                                    </button>
                                )}
                            </div>
                            <div className={styles.mascotImageContainer}>
                                <motion.img
                                    src="/images/mascot.png" // Ensure this path is correct
                                    alt="Owlbert Mascot"
                                    className={styles.mascotImage}
                                    initial={{ y: 5 }}
                                    animate={{ y: [0, -8, 0] }} // Subtle floating animation
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            </div>
                        </div>
                        {/* Show examples below text ONLY if a main image ALSO exists */}
                        {currentContent.imageUrl && currentContent.exampleImages && (
                            <div className={styles.exampleImageContainer}>
                                {currentContent.exampleImages.map((img, i) => (
                                     <motion.div
                                        key={i}
                                        className={styles.tooltipWrapper}
                                        // data-tooltip={img.alt}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <motion.img
                                            src={img.src}
                                            alt={img.alt}
                                            title={img.alt}
                                            className={styles.exampleImage}
                                            whileHover={{
                                                scale: 1.05,
                                                rotate: Math.random() * 4 - 2,
                                                boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                                                transition: { type: "spring", stiffness: 300, damping: 10 }
                                            }}
                                        />
                                     </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div> // End motion.div for learn slide
            )}

            {/* --- Drag and Drop Slide Rendering --- */}
            {currentContent.type === 'drag-drop' && (
              <DragDropContext onDragEnd={onDragEnd}>
                 <motion.div
                    key={`dnd-${currentSlideIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={styles.dragDropArea}
                 >
                  <div style={{textAlign: 'center'}}>
                    <p className={styles.dragDropInstruction}>{currentContent.instruction}</p>
                    {(currentContent.audioSrc || currentContent.speakText) && (
                      <button
                        className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`}
                        onClick={playSlideAudio}
                        title={isAudioPlaying ? "Stop Audio" : "Listen to Instruction"}
                        aria-label={isAudioPlaying ? "Stop Audio" : "Listen to Instruction"}
                        style={{marginTop: '-10px', marginBottom: '20px'}}
                      >
                        <FontAwesomeIcon icon={faHeadphones} /> <span className={styles.audioButtonText}>Listen</span>
                      </button>
                    )}
                  </div>

                  {/* Source List (Items to Drag) */}
                  <Droppable droppableId="sourceItems" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.draggableSourceList} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                        // Removed inline styles, prefer CSS classes
                      >
                        {/* Ensure dndState.sourceItems exists before mapping */}
                        {dndState.sourceItems?.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.draggableItem} ${snapshot.isDragging ? styles.draggableItemDragging : ''} ${dndChecked ? styles.disabled : ''}`}
                                style={provided.draggableProps.style} // Keep style for positioning by dnd library
                                aria-roledescription="Draggable item"
                              >
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt="" // Alt text is on the item text itself
                                    className={styles.draggableItemImage}
                                    aria-hidden="true" // Hide from screen readers as decorative
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

                  {/* Target Lists (Drop Zones) */}
                  <div className={styles.dropTargetsContainer}>
                    {/* Ensure currentContent.targets exists before mapping */}
                    {currentContent.targets?.map((target) => (
                      <Droppable key={target.id} droppableId={target.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`${styles.dropTargetColumn}
                              ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''}
                              ${dndChecked && !Object.values(itemCorrectness).some(correct => !correct) && allItemsPlaced ? styles.allCorrect : ''}` // Added allItemsPlaced check
                             }
                             aria-label={`Drop area for ${target.title}`}
                          >
                            <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                              <FontAwesomeIcon icon={target.type === 'natural' ? faLeaf : faWrench} style={{ marginRight: '8px'}} aria-hidden="true"/>
                              {target.title}
                            </h3>
                            <div className={styles.dropTargetList}>
                              {/* Ensure dndState[target.id] exists */}
                              {dndState[target.id]?.map((item, index) => {
                                // Check if all items have been placed before applying correctness styles
                                const allItemsPlaced = (dndState.sourceItems?.length || 0) === 0;
                                const itemStyle = dndChecked && allItemsPlaced
                                    ? (itemCorrectness[item.id] ? styles.itemCorrect : styles.itemIncorrect)
                                    : '';

                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                                    {(provided, snapshot) => (
                                        <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${styles.draggableItem} ${itemStyle} ${dndChecked ? styles.disabled : ''}`}
                                        style={provided.draggableProps.style}
                                        aria-roledescription="Item dropped in target"
                                        >
                                        {item.imageUrl && (
                                            <img
                                            src={item.imageUrl}
                                            alt=""
                                            className={styles.draggableItemImage}
                                            aria-hidden="true"
                                            />
                                        )}
                                        {item.text}
                                        </div>
                                    )}
                                    </Draggable>
                                );
                               })}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>

                  {/* Feedback Message */}
                  {dndFeedback && (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${styles.dragDropFeedback} ${
                             dndChecked &&
                             (dndState.sourceItems?.length || 0) === 0 && // All items placed
                             !Object.values(itemCorrectness).some(c => !c) // No incorrect items
                             ? styles.dragDropFeedbackCorrect
                             : (dndChecked ? styles.dragDropFeedbackIncorrect : '') // Show incorrect style only after checking
                         }`}
                         role="alert" // Announce feedback to screen readers
                      >
                      {dndFeedback}
                     </motion.div>
                  )}
                </motion.div> // End motion.div for drag-drop area
              </DragDropContext>
            )}
          </div> {/* End learningArea */}
        </main>

        {/* ----- Footer ----- */}
        <footer className={styles.learningFooter}>
              <button
                className={styles.previousButton}
                onClick={handlePrevious}
                disabled={currentSlideIndex === 0}
                aria-disabled={currentSlideIndex === 0}
              >
                 <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </button>
              <button
                className={continueButtonClass}
                onClick={handleContinue}
                disabled={continueButtonDisabled}
                aria-disabled={continueButtonDisabled}
              >
                 {continueButtonText} <FontAwesomeIcon icon={faArrowRight} />
               </button>
        </footer>
      </div> {/* End learningContent */}

       {/* --- Exit Modal --- */}
       {showExitConfirm && (
           <div className={styles.modalOverlay} onClick={handleCancelExit} role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
               <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                   <h2 id="exit-modal-title">Exit Lesson?</h2>
                   <p>Your progress on this lesson might not be saved if you exit now.</p>
                   <div className={styles.modalButtons}>
                       <button className={styles.modalCancel} onClick={handleCancelExit}>Cancel</button>
                       <button className={styles.modalConfirm} onClick={handleConfirmExit}>Exit Anyway</button>
               </div>
           </div>
       )}
    </div> // End learningContainer
  );
}
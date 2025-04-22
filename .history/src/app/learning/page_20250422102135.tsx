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

// --- Chapter 2: All About Computers ------
const contentChapter2: LessonContent[] = [ent[] = [
  { 
    type: 'learn', 
    title: 'Introduction to Computers', 
    description: [
      'Hello friends! Today we\'re going to learn all about computers.', computers.',
      'Computers are special machines that help us do many things.',
      'They can help us learn, play games, and talk to people far away.',y lives.'
      'Let\'s discover what computers are and how they work!'
    ],ageUrl: '/images/computer-types.png',
    imageUrl: '/images/computer-intro.png',,
    audioSrc: '/audio/21_intro_computer.mp3',ng to learn about different types of computers. Computers come in many shapes and sizes, from big to small! Let\'s explore the different kinds of computers we use in our daily lives.'
    speakText: 'Hello friends! Today we\'re going to learn all about computers. Computers are special machines that help us do many things. They can help us learn, play games, and talk to people far away. Let\'s discover what computers are and how they work!'
  },
  { type: 'learn', 
    type: 'learn',  Computers', 
    title: 'Parts of a Computer', s are computers that stay in one place, usually on a desk:',
    description: 'A computer has many important parts. These are the main parts of a computer:',
    exampleImages: [s/desktop-computer.png', alt: 'Desktop Computer - Has separate parts like monitor, keyboard, and CPU' },
      { src: '/images/monitor.png', alt: 'Monitor - Shows pictures and words' },in offices' },
      { src: '/images/keyboard.png', alt: 'Keyboard - Used to type letters and numbers' },d mouse' },
      { src: '/images/mouse.png', alt: 'Mouse - Helps you point and click' },rk and playing games' },
      { src: '/images/cpu.png', alt: 'CPU - The brain of the computer' },
    ],dioSrc: '/audio/2-12_desktop.mp3',
    audioSrc: '/audio/22_computer_parts.mp3',rs that stay in one place, usually on a desk. They have separate parts like a monitor, keyboard, and CPU. Desktops are used at home or in offices. They're good for schoolwork and playing games.'
    speakText: 'A computer has many important parts. These are the main parts of a computer: The monitor shows pictures and words. The keyboard is used to type letters and numbers. The mouse helps you point and click. The CPU is the brain of the computer.'
  },
  { type: 'learn',
    type: 'learn', Computers',
    title: 'What Computers Can Do',are portable and can be carried with you:',
    description: 'Computers can do many amazing things to help us:',
    exampleImages: [s/laptop-computer.png', alt: 'Laptop Computer - Folds and can be carried' },
      { src: '/images/learning.png', alt: 'Learning - Computers help us learn new things' },lugged in' },
      { src: '/images/drawing.png', alt: 'Drawing - We can draw pictures on computers' },ng' },
      { src: '/images/watching.png', alt: 'Watching - We can watch videos and cartoons' },orking people' },
      { src: '/images/games.png', alt: 'Games - We can play fun games on computers' },
    ],dioSrc: '/audio/2-13_laptop.mp3',
    audioSrc: '/audio/23_computer_uses.mp3',e and can be carried with you. They fold and can fit in a bag. Laptops have batteries and work even without being plugged in. They can be used while traveling and are great for students and working people.'
    speakText: 'Computers can do many amazing things to help us: Computers help us learn new things. We can draw pictures on computers. We can watch videos and cartoons. We can play fun games on computers.'
  },
  { type: 'drag-drop',
    type: 'drag-drop',ypes Activity',
    title: 'Computer Parts Activity', features into the correct type: Desktop Computer or Laptop Computer',
    instruction: 'Drag each computer part to where it belongs: Hardware (things you can touch) or Software (programs that run on computers)',
    items: ['ct-item-1', text: 'Stays in one place', type: 'man-made', imageUrl: '/images/fixed-small.png' },
      { id: 'cp-item-1', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor-small.png' },l.png' },
      { id: 'cp-item-2', text: 'Video Game', type: 'natural', imageUrl: '/images/game-small.png' },small.png' },
      { id: 'cp-item-3', text: 'Keyboard', type: 'man-made', imageUrl: '/images/keyboard-small.png' }, },
      { id: 'cp-item-4', text: 'Drawing App', type: 'natural', imageUrl: '/images/drawing-app-small.png' },},
      { id: 'cp-item-5', text: 'Mouse', type: 'man-made', imageUrl: '/images/mouse-small.png' },ug-small.png' },
      { id: 'cp-item-6', text: 'Math Program', type: 'natural', imageUrl: '/images/math-app-small.png' },
    ],rgets: [
    targets: [anMadeTarget', title: 'Desktop Computer', type: 'man-made' },
      { id: 'manMadeTarget', title: 'Hardware', type: 'man-made' },al' },
      { id: 'naturalTarget', title: 'Software', type: 'natural' },
    ],dioSrc: '/audio/2-14_sort_computers.mp3',
    audioSrc: '/audio/24_sort_parts.mp3',r features! Drag each feature to the correct type: Desktop Computer or Laptop Computer. Think about which features belong to which type of computer!'
    speakText: 'Let\'s play a sorting game! Drag each computer part to where it belongs. Is it Hardware that you can touch, or Software that runs on the computer? Think about which is which!'
  },
  { type: 'learn', 
    type: 'learn', Computers', 
    title: 'Computer Safety Rules', 
    description: [ another type of computer that is even smaller than laptops!',
      'When using computers, we need to follow some important rules:',
      '• Always wash your hands before using a computer',s to use it.',
      '• Be gentle with the keyboard and mouse',eat for reading books, watching videos, and playing games.'
      '• Don\'t eat or drink near the computer',
      '• Don\'t pull on any wires or cables',
      '• Ask a grown-up for help when needed',
      '• Take breaks to rest your eyes and body'uter that is even smaller than laptops! A tablet is a flat computer with a touchscreen. You can touch the screen directly with your fingers to use it. Tablets are very easy to carry and are great for reading books, watching videos, and playing games.'
    ],
    imageUrl: '/images/computer-safety.png',
    audioSrc: '/audio/25_computer_safety.mp3',
    speakText: 'When using computers, we need to follow some important rules: Always wash your hands before using a computer. Be gentle with the keyboard and mouse. Don\'t eat or drink near the computer. Don\'t pull on any wires or cables. Ask a grown-up for help when needed. Take breaks to rest your eyes and body.'
  }st contentStandard2Chapter2: LessonContent[] = [
];{ 
    type: 'learn', 
// --- Chapter 3: Computer Care and Safety ---
const contentChapter3: LessonContent[] = [
  {   'Hi friends! Today we\'re going to talk about smartphones.',
    type: 'learn', are special phones that work like mini computers.',
    title: 'Taking Care of Computers', calling, taking photos, and playing games.',
    description: [n all about these amazing devices!'
      'Hi there! I\'m Bitsy! Today we\'ll learn how to take good care of computers.',
      'Computers are delicate machines that need proper care to work well.',
      'Taking care of computers helps them last longer and work better.',
      'Let\'s learn some important rules for computer care!' smartphones. Smartphones are special phones that work like mini computers. They let us do many things like calling, taking photos, and playing games. Let\'s learn all about these amazing devices!'
    ],
    imageUrl: '/images/computer-care-intro.png',
    audioSrc: '/audio/31_intro_care.mp3',
    speakText: 'Hi there! I\'m Bitsy! Today we\'ll learn how to take good care of computers. Computers are delicate machines that need proper care to work well. Taking care of computers helps them last longer and work better. Let\'s learn some important rules for computer care!'
  },description: 'A smartphone has many special features that regular phones don\'t have:',
  { exampleImages: [
    type: 'learn', es/touchscreen.png', alt: 'Touchscreen - You can touch the screen to control it' },
    title: 'Keeping Computers Clean', 'Apps - Small programs that do different things' },
    description: 'Keeping computers clean is very important. Here are ways to keep them clean:',
    exampleImages: [s/internet.png', alt: 'Internet - Connects to the internet to search and learn' },
      { src: '/images/clean-hands.png', alt: 'Clean hands - Always wash hands before using a computer' },
      { src: '/images/no-food.png', alt: 'No food or drinks - Keep food and drinks away from computers' },
      { src: '/images/dust-free.png', alt: 'Dust-free - Keep dust away from computers' }, touchscreen that you can touch to control it. Apps, which are small programs that do different things. A camera for taking photos and videos. And it connects to the internet so you can search and learn.'
      { src: '/images/clean-screen.png', alt: 'Clean screen - Keep the screen clean and clear' },
    ],
    audioSrc: '/audio/32_keep_clean.mp3',
    speakText: 'Keeping computers clean is very important. Here are ways to keep them clean: Always wash hands before using a computer. Keep food and drinks away from computers. Keep dust away from computers. Keep the screen clean and clear.'
  },description: 'Smartphones help us do many different tasks:',
  { exampleImages: [
    type: 'learn',ges/calling.png', alt: 'Calling - Talk to friends and family' },
    title: 'Safe Computer Use',.png', alt: 'Messaging - Send text messages and pictures' },
    description: 'Using computers safely keeps you and the computer protected:',},
    exampleImages: [s/mobile-learning.png', alt: 'Learning - Learn new things with educational apps' },
      { src: '/images/good-posture.png', alt: 'Good posture - Sit straight when using a computer' },
      { src: '/images/eye-distance.png', alt: 'Eye distance - Keep your eyes at a safe distance from the screen' },
      { src: '/images/break-time.png', alt: 'Break time - Take breaks to rest your eyes and body' },ly. We can send text messages and pictures. We can play fun games anywhere. And we can learn new things with educational apps.'
      { src: '/images/adult-help.png', alt: 'Adult help - Ask for help when needed' },
    ],
    audioSrc: '/audio/33_safe_use.mp3',
    speakText: 'Using computers safely keeps you and the computer protected: Sit straight when using a computer. Keep your eyes at a safe distance from the screen. Take breaks to rest your eyes and body. Ask for help when needed.'
  },instruction: 'Sort these items into things you CAN do with a smartphone or CANNOT do with a smartphone',
  { items: [
    type: 'drag-drop',', text: 'Take photos', type: 'natural', imageUrl: '/images/take-photo-small.png' },
    title: 'Computer Safety Rules', in the air', type: 'man-made', imageUrl: '/images/fly-small.png' },
    instruction: 'Drag each action to the correct category: Good Computer Habits or Bad Computer Habits',
    items: ['sp-item-4', text: 'Swim underwater', type: 'man-made', imageUrl: '/images/swim-small.png' },
      { id: 'cs-item-1', text: 'Wash hands before use', type: 'natural', imageUrl: '/images/clean-hands-small.png' },
      { id: 'cs-item-2', text: 'Eating near computer', type: 'man-made', imageUrl: '/images/eating-small.png' },
      { id: 'cs-item-3', text: 'Taking short breaks', type: 'natural', imageUrl: '/images/break-small.png' },
      { id: 'cs-item-4', text: 'Pulling on cables', type: 'man-made', imageUrl: '/images/pulling-small.png' },
      { id: 'cs-item-5', text: 'Sitting up straight', type: 'natural', imageUrl: '/images/posture-small.png' },
      { id: 'cs-item-6', text: 'Touching screen with fingers', type: 'man-made', imageUrl: '/images/touching-small.png' },
    ],
    targets: ['/audio/2-24_sort_phone_actions.mp3',
      { id: 'naturalTarget', title: 'Good Computer Habits', type: 'natural' },tegory. Can you do it with a smartphone, or can you not do it with a smartphone? Think carefully!'
      { id: 'manMadeTarget', title: 'Bad Computer Habits', type: 'man-made' },
    ],
    audioSrc: '/audio/34_sort_habits.mp3',
    speakText: 'Let\'s play a sorting game! Drag each action to the correct category: Good Computer Habits or Bad Computer Habits. Think about which actions help keep computers safe and which might harm them!'
  },description: [
  {   'While smartphones are very useful, we need to use them safely:',
    type: 'learn',  a smartphone too much - take breaks',
    title: 'When to Ask for Help', loading apps',
    description: [lk to strangers online',
      'Sometimes we need help with computers. Ask a grown-up when:',
      '• Something stops working',ormation online',
      '• You see an error message',re taking photos of others'
      '• You don\'t know what to do next',
      '• You accidentally click on something unfamiliar',
      '• The computer makes strange sounds',,
      '• You need to plug in or unplug something', we need to use them safely: Don\'t use a smartphone too much - take breaks. Ask a grown-up before downloading apps. Don\'t talk to strangers online. Be careful not to drop or break the phone. Don\'t share personal information online. Always ask permission before taking photos of others.'
    ],
    imageUrl: '/images/ask-for-help.png',
    audioSrc: '/audio/35_ask_help.mp3',
    speakText: 'Sometimes we need help with computers. Ask a grown-up when: Something stops working. You see an error message. You don\'t know what to do next. You accidentally click on something unfamiliar. The computer makes strange sounds. You need to plug in or unplug something.'
  }st contentStandard2Chapter3: LessonContent[] = [
];{ 
    type: 'learn', 
// --- Chapter 4: Keyboard and Mouse Fun ---
const contentChapter4: LessonContent[] = [
  {   'Hello friends! Today we\'re going to learn about Notepad.',
    type: 'learn',  simple program on computers that helps us write and save text.',
    title: 'Using Computer Input Devices', can type our thoughts, stories, or notes.',
    description: [over how to use this helpful program!'
      'Hello, computer explorer! 🖱️',
      'Today we\'ll learn about the keyboard and mouse.',
      'These are special tools that help us tell the computer what to do.',
      'Let\'s discover how to use them the right way!'earn about Notepad. Notepad is a simple program on computers that helps us write and save text. It\'s like a digital paper where we can type our thoughts, stories, or notes. Let\'s discover how to use this helpful program!'
    ],
    imageUrl: '/images/input-devices.png',
    audioSrc: '/audio/41_input_intro.mp3',
    speakText: 'Hello, computer explorer! Today we\'ll learn about the keyboard and mouse. These are special tools that help us tell the computer what to do. Let\'s discover how to use them the right way!'
  },description: 'Let\'s learn how to open Notepad on a computer:',
  { exampleImages: [
    type: 'learn', es/start-menu.png', alt: 'Start Menu - Click the Start button in the corner' },
    title: 'Using the Mouse', otepad.png', alt: 'Search - Type "Notepad" in the search box' },
    description: 'The mouse helps us point and click on things. Here\'s how to use it:', },
    exampleImages: [s/notepad-open.png', alt: 'Notepad Open - Notepad opens with a blank page' },
      { src: '/images/mouse-hold.png', alt: 'Hold the mouse - Hold it gently with your fingertips' },
      { src: '/images/mouse-click.png', alt: 'Click - Press the button to select things' },
      { src: '/images/mouse-double-click.png', alt: 'Double-click - Click twice quickly to open things' },r. Then, type "Notepad" in the search box. Next, click on the Notepad icon. Finally, Notepad opens with a blank page ready for you to type.'
      { src: '/images/mouse-drag.png', alt: 'Drag - Hold the button down while moving to drag things' },
    ],
    audioSrc: '/audio/42_using_mouse.mp3',
    speakText: 'The mouse helps us point and click on things. Here\'s how to use it: Hold it gently with your fingertips. Press the button to select things. Click twice quickly to open things. Hold the button down while moving to drag things.'
  },description: 'Here\'s how to use Notepad to write and save:',
  { exampleImages: [
    type: 'learn',ges/typing.png', alt: 'Typing - Click and start typing your text' },
    title: 'Using the Keyboard',png', alt: 'File Menu - Click on File to save your work' },
    description: 'The keyboard helps us type letters, numbers, and special commands:',},
    exampleImages: [s/name-file.png', alt: 'Name File - Give your file a name and click Save' },
      { src: '/images/letter-keys.png', alt: 'Letter keys - Type words and sentences' },
      { src: '/images/number-keys.png', alt: 'Number keys - Type numbers' },
      { src: '/images/space-bar.png', alt: 'Space bar - Makes spaces between words' },ite area and start typing your text. When you\'re done, click on File to save your work. Choose Save As to name your file. Then give your file a name and click Save.'
      { src: '/images/enter-key.png', alt: 'Enter key - Starts a new line or submits information' },
    ],
    audioSrc: '/audio/43_using_keyboard.mp3',
    speakText: 'The keyboard helps us type letters, numbers, and special commands: Letter keys let you type words and sentences. Number keys let you type numbers. The space bar makes spaces between words. The enter key starts a new line or submits information.'
  },instruction: 'Put these steps in the correct order for using Notepad',
  { items: [
    type: 'drag-drop',', text: 'Click Start menu', type: 'natural', imageUrl: '/images/click-start-small.png' },
    title: 'Match the Input Actions',your text', type: 'natural', imageUrl: '/images/type-text-small.png' },
    instruction: 'Match each action to the correct device: Mouse or Keyboard',: '/images/search-notepad-small.png' },
    items: ['np-item-4', text: 'Save your file', type: 'natural', imageUrl: '/images/save-file-small.png' },
      { id: 'in-item-1', text: 'Click to select', type: 'man-made', imageUrl: '/images/click-small.png' },.png' },
      { id: 'in-item-2', text: 'Type your name', type: 'natural', imageUrl: '/images/type-small.png' },g' },
      { id: 'in-item-3', text: 'Drag and drop', type: 'man-made', imageUrl: '/images/drag-small.png' },
      { id: 'in-item-4', text: 'Press Enter', type: 'natural', imageUrl: '/images/enter-small.png' },
      { id: 'in-item-5', text: 'Double-click icon', type: 'man-made', imageUrl: '/images/double-click-small.png' },
      { id: 'in-item-6', text: 'Press Space bar', type: 'natural', imageUrl: '/images/space-small.png' },
    ],
    targets: ['/audio/2-34_notepad_steps.mp3',
      { id: 'manMadeTarget', title: 'Mouse Actions', type: 'man-made' },three steps to "First Steps" and the last three steps to "Last Steps". Think about what you would do first and what you would do last.'
      { id: 'naturalTarget', title: 'Keyboard Actions', type: 'natural' },
    ],
    audioSrc: '/audio/44_match_actions.mp3',
    speakText: 'Match each action to the correct device: Mouse or Keyboard. Drag the actions to either Mouse Actions or Keyboard Actions based on which device you would use!'
  },description: [
  {   'Notepad is simple but can be used for many things:',
    type: 'learn', ort story about your favorite animal',
    title: 'Practice Makes Perfect',  foods',
    description: [to-do list for your homework',
      'The more you practice using the mouse and keyboard, the better you\'ll get!',
      'Here are some fun ways to practice:',mbers',
      '• Drawing programs to practice mouse control',y'
      '• Typing games to learn keyboard letters',
      '• Simple computer games that use both',
      '• Ask your teacher or parents for computer time to practice',
      '• Remember to take breaks and have fun while learning!'ngs: Write a short story about your favorite animal. Make a list of your favorite foods. Create a to-do list for your homework. Write a thank you note to someone special. Practice typing the alphabet and numbers. Keep a daily journal of what you did each day.'
    ],
    imageUrl: '/images/practice-skills.png',
    audioSrc: '/audio/45_practice.mp3',
    speakText: 'The more you practice using the mouse and keyboard, the better you\'ll get! Here are some fun ways to practice: Drawing programs to practice mouse control. Typing games to learn keyboard letters. Simple computer games that use both. Ask your teacher or parents for computer time to practice. Remember to take breaks and have fun while learning!'
  }st contentStandard2Chapter4: LessonContent[] = [
];{ 
    type: 'learn', 
// --- End Lesson Content ---puters', 
    description: [
// Helper function to reorder listll learn how computers help us learn.',
const reorder = (list: DraggableItemData[], startIndex: number, endIndex: number): DraggableItemData[] => {
  const result = Array.from(list);e, calculate, and explore the world.',
  const [removed] = result.splice(startIndex, 1); and exciting!'
  result.splice(endIndex, 0, removed);
  return result;images/learning-computers.png',
};  audioSrc: '/audio/2-41_learning_intro.mp3',
    speakText: 'Hello explorers! Today we\'ll learn how computers help us learn. Computers can be amazing tools for discovering new things. They can help us read, write, calculate, and explore the world. Let\'s see how computers make learning fun and exciting!'
// Helper function to move item between lists
const move = (
    source: DraggableItemData[], destination: DraggableItemData[], droppableSource: any, droppableDestination: any
): { [key: string]: DraggableItemData[] } => {
  const sourceClone = Array.from(source);programs that help us learn:',
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);lp practice counting and calculations' },
  destClone.splice(droppableDestination.index, 0, removed);rograms - Help learn to read and spell' },
  const result: { [key: string]: DraggableItemData[] } = {};ograms - Show cool experiments and facts' },
  result[droppableSource.droppableId] = sourceClone;ograms - Let us draw and color digitally' },
  result[droppableDestination.droppableId] = destClone;
  return result;audio/2-42_edu_programs.mp3',
};  speakText: 'Computers have special programs that help us learn: Math Programs help practice counting and calculations. Reading Programs help learn to read and spell. Science Programs show cool experiments and facts. Art Programs let us draw and color digitally.'
  },
// Add this helper function at the top level
const getStyle = (style: any, snapshot: any) => {
  if (!snapshot.isDropAnimating) {
    return style;'Special websites on the internet can also help us learn:',
  } exampleImages: [
  return {c: '/images/edu-website1.png', alt: 'Educational Website - Has lessons and activities' },
    ...style,'/images/edu-games.png', alt: 'Learning Games - Fun games that teach different subjects' },
    transitionDuration: `0.001s`,png', alt: 'Educational Videos - Show how things work' },
  }   { src: '/images/edu-quiz.png', alt: 'Online Quizzes - Test what you\'ve learned' },
}   ],
    audioSrc: '/audio/2-43_learning_websites.mp3',
// Add this after the other imports the internet can also help us learn: Educational Websites have lessons and activities. Learning Games are fun games that teach different subjects. Educational Videos show how things work. Online Quizzes test what you\'ve learned.'
const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = styles.confetti;
    title: 'Learning with Computers Activity',
  // Random properties for more natural animationine Computer Activities or Online Computer Activities',
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];ages/calculator-small.png' },
  confetti.style.left = Math.random() * 100 + 'vw';ype: 'natural', imageUrl: '/images/videos-small.png' },
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Between 2-5simages/notepad-small.png' },
  confetti.style.opacity = '1';'Visiting websites', type: 'natural', imageUrl: '/images/website-small.png' },
  confetti.style.animation = `${styles.confettiFall} ${Math.random() * 3 + 2}s linear forwards`;ng' },
      { id: 'lc-item-6', text: 'Playing online games', type: 'natural', imageUrl: '/images/online-game-small.png' },
  return confetti;
};  targets: [
      { id: 'manMadeTarget', title: 'Offline Activities', type: 'man-made' },
export default function LearningPage() {ine Activities', type: 'natural' },
  // --- State ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);ivities! Drag each activity to the correct category: Offline Computer Activities don\'t need the internet. Online Computer Activities need the internet to work. Can you tell which is which?'
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const router = useRouter();Learning Online', 
    description: [
  // Get URL parameters - standard and chapter for content selection
  const [chapterContent, setChapterContent] = useState<LessonContent[]>(lessonContent); // Default to chapter 1
  const [standard, setStandard] = useState<string>('1'); teachers',
  const [chapter, setChapter] = useState<string>('1');me, address, or school',
      '• Tell a grown-up if you see something confusing or scary',
  // Drag-and-Drop State rest your eyes every 20 minutes',
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({ sourceItems: [], naturalTarget: [], manMadeTarget: [] });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});
    speakText: 'When learning online, it\'s important to stay safe: Always ask a grown-up before going online. Only visit websites approved by your parents or teachers. Never share personal information like your name, address, or school. Tell a grown-up if you see something confusing or scary. Take breaks and rest your eyes every 20 minutes. Remember that not everything you read online is true.'
  // Reference to currently playing audio object (if using Audio API)
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalSlides = chapterContent.length;
  const currentContent = chapterContent[currentSlideIndex];
  { 
  // Inside your component, add this new state
  const [showConfetti, setShowConfetti] = useState(false);
    description: [
  // --- Effects ---! Today we\'re going to learn all about computers.',
  // Read URL parameters on initial loadat help us do many things.',
  useEffect(() => {p us learn, play games, and talk to people far away.',
    if (typeof window === 'undefined') return;how they work!'
    ],
    // Parse URL params if availableo.png',
    const searchParams = new URLSearchParams(window.location.search);
    const standardParam = searchParams.get('standard') || '1'; about computers. Computers are special machines that help us do many things. They can help us learn, play games, and talk to people far away. Let\'s discover what computers are and how they work!'
    const chapterParam = searchParams.get('chapter') || '1';
    
    console.log("URL Parameters:", { standard: standardParam, chapter: chapterParam });
    title: 'Parts of a Computer', 
    setStandard(standardParam);s many important parts. These are the main parts of a computer:',
    setChapter(chapterParam);
      { src: '/images/monitor.png', alt: 'Monitor - Shows pictures and words' },
    // Select the appropriate content based on chapter parameterpe letters and numbers' },
    let selectedContent: LessonContent[] = lessonContent; // Default to chapter 1
      { src: '/images/cpu.png', alt: 'CPU - The brain of the computer' },
    if (standardParam === '1') {
      switch (chapterParam) {uter_parts.mp3',
        case '1': computer has many important parts. These are the main parts of a computer: The monitor shows pictures and words. The keyboard is used to type letters and numbers. The mouse helps you point and click. The CPU is the brain of the computer.'
          selectedContent = lessonContent;
          break;
        case '2':,
          selectedContent = contentChapter2;
          break; 'Computers can do many amazing things to help us:',
        case '3':: [
          selectedContent = contentChapter3;earning - Computers help us learn new things' },
          break;mages/drawing.png', alt: 'Drawing - We can draw pictures on computers' },
        case '4':ages/watching.png', alt: 'Watching - We can watch videos and cartoons' },
          selectedContent = contentChapter4;s - We can play fun games on computers' },
          break;
        default:audio/23_computer_uses.mp3',
          console.log("Using default content for chapter:", chapterParam); help us learn new things. We can draw pictures on computers. We can watch videos and cartoons. We can play fun games on computers.'
          selectedContent = lessonContent;
      }
    } else if (standardParam === '2') {ype: 'drag-drop',
      switch (chapterParam) {title: 'Computer Parts Activity',
        case '1':e (programs that run on computers)',
          selectedContent = contentStandard2Chapter1;
          break;  { id: 'cp-item-1', text: 'Monitor', type: 'man-made', imageUrl: '/images/monitor-small.png' },
        case '2':ral', imageUrl: '/images/game-small.png' },
          selectedContent = contentStandard2Chapter2;t: 'Keyboard', type: 'man-made', imageUrl: '/images/keyboard-small.png' },
          break;d: 'cp-item-4', text: 'Drawing App', type: 'natural', imageUrl: '/images/drawing-app-small.png' },
        case '3':      { id: 'cp-item-5', text: 'Mouse', type: 'man-made', imageUrl: '/images/mouse-small.png' },
          selectedContent = contentStandard2Chapter3;h Program', type: 'natural', imageUrl: '/images/math-app-small.png' },
          break;
        case '4':
          selectedContent = contentStandard2Chapter4;itle: 'Hardware', type: 'man-made' },
          break;: 'Software', type: 'natural' },
        default:
          console.log("Using default content for Standard 2, chapter:", chapterParam);oSrc: '/audio/24_sort_parts.mp3',
          selectedContent = contentStandard2Chapter1; game! Drag each computer part to where it belongs. Is it Hardware that you can touch, or Software that runs on the computer? Think about which is which!'
      }
    }  { 
    
    console.log("Selected content for chapter:", chapterParam, "with", selectedContent.length, "slides");
    setChapterContent(selectedContent);
    llow some important rules:',
    // Reset to the first slide whenever content changeshands before using a computer',
    setCurrentSlideIndex(0);he keyboard and mouse',
  }, []);Don\'t eat or drink near the computer',
 wires or cables',
  // Reset state when slide changes help when needed',
  useEffect(() => {your eyes and body'
    // Stop any playing audio/speech,
    // if (audioRef.current) {',
    //   audioRef.current.pause();    audioSrc: '/audio/25_computer_safety.mp3',
    //   audioRef.current = null;ng computers, we need to follow some important rules: Always wash your hands before using a computer. Be gentle with the keyboard and mouse. Don\'t eat or drink near the computer. Don\'t pull on any wires or cables. Ask a grown-up for help when needed. Take breaks to rest your eyes and body.'
    // }
    window.speechSynthesis?.cancel();
    setIsAudioPlaying(false);
// --- Chapter 3: Computer Care and Safety ---
    // Initialize DND state if it's a DND slideontent[] = [
    if (currentContent && currentContent.type === 'drag-drop') {
      setDndState({
        sourceItems: currentContent.items,title: 'Taking Care of Computers', 
        naturalTarget: [],
        manMadeTarget: []we\'ll learn how to take good care of computers.',
      });to work well.',
      setDndChecked(false);
      setDndFeedback(null);omputer care!'
      setItemCorrectness({});
    }geUrl: '/images/computer-care-intro.png',
  }, [currentSlideIndex, currentContent]);ioSrc: '/audio/31_intro_care.mp3',
e! I\'m Bitsy! Today we\'ll learn how to take good care of computers. Computers are delicate machines that need proper care to work well. Taking care of computers helps them last longer and work better. Let\'s learn some important rules for computer care!'
  // Update progress bar  },
  useEffect(() => {
    setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
  }, [currentSlideIndex, totalSlides]);g Computers Clean', 
 Here are ways to keep them clean:',
  // Preload images (optional)
  useEffect(() => {{ src: '/images/clean-hands.png', alt: 'Clean hands - Always wash hands before using a computer' },
    if (!chapterContent) return;rc: '/images/no-food.png', alt: 'No food or drinks - Keep food and drinks away from computers' },
          { src: '/images/dust-free.png', alt: 'Dust-free - Keep dust away from computers' },
    chapterContent.forEach(slide => {      { src: '/images/clean-screen.png', alt: 'Clean screen - Keep the screen clean and clear' },
      if (slide.type === 'learn') {
        if (slide.imageUrl) new Image().src = slide.imageUrl;an.mp3',
        slide.exampleImages?.forEach(img => { new Image().src = img.src; }); keep them clean: Always wash hands before using a computer. Keep food and drinks away from computers. Keep dust away from computers. Keep the screen clean and clear.'
      } else if (slide.type === 'drag-drop') {
        slide.items.forEach(item => { if (item.imageUrl) new Image().src = item.imageUrl; });
      }
    });
  }, [chapterContent]);s safely keeps you and the computer protected:',

  // Cleanup audio on component unmount  { src: '/images/good-posture.png', alt: 'Good posture - Sit straight when using a computer' },
  useEffect(() => {      { src: '/images/eye-distance.png', alt: 'Eye distance - Keep your eyes at a safe distance from the screen' },
    return () => {-time.png', alt: 'Break time - Take breaks to rest your eyes and body' },
      // if (audioRef.current) { audioRef.current.pause(); }.png', alt: 'Adult help - Ask for help when needed' },
      window.speechSynthesis?.cancel();
    };
  }, []);y keeps you and the computer protected: Sit straight when using a computer. Keep your eyes at a safe distance from the screen. Take breaks to rest your eyes and body. Ask for help when needed.'
  },

  // --- Handlers ---
  const handleBackClick = () => {puter Safety Rules',
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);nstruction: 'Drag each action to the correct category: Good Computer Habits or Bad Computer Habits',
    else setShowExitConfirm(true);    items: [
  };re use', type: 'natural', imageUrl: '/images/clean-hands-small.png' },
  const handleConfirmExit = () => router.push(`/learn/${standard}/chapter/${chapter}`);e: 'man-made', imageUrl: '/images/eating-small.png' },
  const handleCancelExit = () => setShowExitConfirm(false);
  const handlePrevious = () => { { id: 'cs-item-4', text: 'Pulling on cables', type: 'man-made', imageUrl: '/images/pulling-small.png' },
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);      { id: 'cs-item-5', text: 'Sitting up straight', type: 'natural', imageUrl: '/images/posture-small.png' },
  };eUrl: '/images/touching-small.png' },

  // --- Audio Playback ---
  const playSlideAudio = () => {
    // Stop current playback if anyMadeTarget', title: 'Bad Computer Habits', type: 'man-made' },
    // if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    window.speechSynthesis?.cancel();
y a sorting game! Drag each action to the correct category: Good Computer Habits or Bad Computer Habits. Think about which actions help keep computers safe and which might harm them!'
    if (isAudioPlaying) { // If button clicked while playing, just stop
        setIsAudioPlaying(false);
        return;
    }for Help', 

    let textToSpeak = currentContent.speakText;
    if (!textToSpeak && currentContent.type === 'learn') {ething stops working',
        textToSpeak = Array.isArray(currentContent.description) ? currentContent.description.join(' ') : currentContent.description;
    }
omething unfamiliar',
    // Prioritize audio file if available (using SpeechSynthesis as fallback for now)uter makes strange sounds',
    if (currentContent.audioSrc) {
        console.warn("Audio file playback (.mp3) requires managing Audio objects. Using SpeechSynthesis as fallback.");
        // --- Basic Audio Object Example (Needs state/ref management for stopping) ---    imageUrl: '/images/ask-for-help.png',
        // try {
        //   const audio = new Audio(currentContent.audioSrc);hen: Something stops working. You see an error message. You don\'t know what to do next. You accidentally click on something unfamiliar. The computer makes strange sounds. You need to plug in or unplug something.'
        //   audioRef.current = audio; // Store reference
        //   audio.play();
        //   setIsAudioPlaying(true);
        //   audio.onended = () => { setIsAudioPlaying(false); audioRef.current = null; };-- Chapter 4: Keyboard and Mouse Fun ---
        //   audio.onerror = () => { setIsAudioPlaying(false); audioRef.current = null; console.error("Error playing audio file"); /* Fallback? */ };const contentChapter4: LessonContent[] = [
        // } catch (e) {
        //   console.error("Failed to play audio src:", e);learn', 
        //   if (textToSpeak) speakText(textToSpeak); // Fallback if Audio fails
        // }
        // --- Using SpeechSynthesis as fallback ---
         if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
             speakText(textToSpeak);      'These are special tools that help us tell the computer what to do.',
         } else { the right way!'
             setIsAudioPlaying(false); // Ensure state is false if nothing can play
         }g',
: '/audio/41_input_intro.mp3',
    } else if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {\'ll learn about the keyboard and mouse. These are special tools that help us tell the computer what to do. Let\'s discover how to use them the right way!'
       speakText(textToSpeak); // Use speech synthesis if no audio file
    } else {
        setIsAudioPlaying(false); // Cannot play anything
    }le: 'Using the Mouse', 
  };escription: 'The mouse helps us point and click on things. Here\'s how to use it:',
    exampleImages: [
   const speakText = (text: string) => {e-hold.png', alt: 'Hold the mouse - Hold it gently with your fingertips' },
      try {'Click - Press the button to select things' },
          const utterance = new SpeechSynthesisUtterance(text);g', alt: 'Double-click - Click twice quickly to open things' },
          // utterance.lang = 'en-US'; // Optional: Set language  { src: '/images/mouse-drag.png', alt: 'Drag - Hold the button down while moving to drag things' },
          utterance.onstart = () => setIsAudioPlaying(true);
          utterance.onend = () => setIsAudioPlaying(false);
    speakText: 'The mouse helps us point and click on things. Here\'s how to use it: Hold it gently with your fingertips. Press the button to select things. Click twice quickly to open things. Hold the button down while moving to drag things.'
          utterance.onerror = (e) => {
              console.error("SpeechSynthesis Error:", e);
              setIsAudioPlaying(false);type: 'learn',
          };
          window.speechSynthesis.speak(utterance); commands:',
      } catch (e) {    exampleImages: [
          console.error("SpeechSynthesis failed:", e);eys.png', alt: 'Letter keys - Type words and sentences' },
          setIsAudioPlaying(false);g', alt: 'Number keys - Type numbers' },
      }ar - Makes spaces between words' },
   };- Starts a new line or submits information' },

  // Drag and Drop Handler    audioSrc: '/audio/43_using_keyboard.mp3',
  const onDragEnd = (result: DropResult) => { helps us type letters, numbers, and special commands: Letter keys let you type words and sentences. Number keys let you type numbers. The space bar makes spaces between words. The enter key starts a new line or submits information.'
    const { source, destination } = result;
    
    // Return if dropped outside or if already checked'drag-drop',
    if (!destination || dndChecked) return;Match the Input Actions',
action to the correct device: Mouse or Keyboard',
    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;e: 'man-made', imageUrl: '/images/click-small.png' },
    ral', imageUrl: '/images/type-small.png' },
    // Return if dropping in same spot'man-made', imageUrl: '/images/drag-small.png' },
    if (sourceId === destId && source.index === destination.index) return;      { id: 'in-item-4', text: 'Press Enter', type: 'natural', imageUrl: '/images/enter-small.png' },
t: 'Double-click icon', type: 'man-made', imageUrl: '/images/double-click-small.png' },
    if (sourceId === destId) {item-6', text: 'Press Space bar', type: 'natural', imageUrl: '/images/space-small.png' },
      // Reordering within same list
      const items = Array.from(dndState[sourceId]);
      const [removed] = items.splice(source.index, 1);: 'manMadeTarget', title: 'Mouse Actions', type: 'man-made' },
      items.splice(destination.index, 0, removed); { id: 'naturalTarget', title: 'Keyboard Actions', type: 'natural' },
],
      setDndState(prev => ({    audioSrc: '/audio/44_match_actions.mp3',
        ...prev,he correct device: Mouse or Keyboard. Drag the actions to either Mouse Actions or Keyboard Actions based on which device you would use!'
        [sourceId]: items
      }));
    } else {
      // Moving between listsPerfect', 
      const sourceItems = Array.from(dndState[sourceId]);
      const destItems = Array.from(dndState[destId]);etter you\'ll get!',
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);      '• Drawing programs to practice mouse control',
ers',
      setDndState(prev => ({
        ...prev,uter time to practice',
        [sourceId]: sourceItems,d have fun while learning!'
        [destId]: destItems
      }));geUrl: '/images/practice-skills.png',
    }audioSrc: '/audio/45_practice.mp3',
  };the mouse and keyboard, the better you\'ll get! Here are some fun ways to practice: Drawing programs to practice mouse control. Typing games to learn keyboard letters. Simple computer games that use both. Ask your teacher or parents for computer time to practice. Remember to take breaks and have fun while learning!'

  // Modify the checkDragDrop function
  const checkDragDrop = () => {
    if (currentContent.type !== 'drag-drop') return;-
    let correctCount = 0;
    let incorrectCount = 0;// Helper function to reorder list
    const totalPlacedInTargets = dndState.naturalTarget.length + dndState.manMadeTarget.length;, startIndex: number, endIndex: number): DraggableItemData[] => {
    const newCorrectnessMap: { [itemId: string]: boolean } = {};rom(list);
    let allItemsPlaced = dndState.sourceItems.length === 0;  const [removed] = result.splice(startIndex, 1);
;
    dndState.naturalTarget.forEach(item => {
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;nction to move item between lists
      else incorrectCount++;
    });bleSource: any, droppableDestination: any
    [] } => {
    dndState.manMadeTarget.forEach(item => {om(source);
      const isCorrect = item.type === 'man-made';stination);
      newCorrectnessMap[item.id] = isCorrect;;
      if(isCorrect) correctCount++;
      else incorrectCount++;} = {};
    });[droppableSource.droppableId] = sourceClone;
Id] = destClone;
    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    if (totalPlacedInTargets === 0) {s helper function at the top level
      setDndFeedback("Drag the items into the boxes first!");ny) => {
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else {
      if (incorrectCount === 0) {{
        setDndFeedback("Great job! All items are in the correct boxes!");tyle,
        // Trigger confetti animation
        setShowConfetti(true);
        // Create confetti effect
        const confettiContainer = document.createElement('div');
        confettiContainer.className = styles.confettiContainer; the other imports
        document.body.appendChild(confettiContainer);nfetti = () => {
        
        // Add multiple confetti pieces
        for (let i = 0; i < 50; i++) {
          const piece = createConfetti();Random properties for more natural animation
          confettiContainer.appendChild(piece);nst colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          // Remove piece after animationndom() * 100 + 'vw';
          piece.addEventListener('animationend', () => {on = (Math.random() * 3 + 2) + 's'; // Between 2-5s
            piece.remove();
          });${Math.random() * 3 + 2}s linear forwards`;
        }
        
        // Remove container after all animations
        setTimeout(() => {
          confettiContainer.remove();
          setShowConfetti(false);
        }, 5000);urrentSlideIndex, setCurrentSlideIndex] = useState(0);
      } else {st [progress, setProgress] = useState(0);
        setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`); useState(false);
        setHearts(prev => Math.max(0, prev - 1));
      }st [isAudioPlaying, setIsAudioPlaying] = useState(false);
    }ter = useRouter();
  };
election
  // Main Continue Button Logicst [chapterContent, setChapterContent] = useState<LessonContent[]>(lessonContent); // Default to chapter 1
  const handleContinue = () => {const [standard, setStandard] = useState<string>('1');
    if (currentContent.type === 'drag-drop') {  const [chapter, setChapter] = useState<string>('1');
        if (!dndChecked) { checkDragDrop(); return; }
         // Optional: Prevent continue if failed and out of hearts
         const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct); string]: DraggableItemData[] }>({ sourceItems: [], naturalTarget: [], manMadeTarget: [] });
         if (hearts <= 0 && anyIncorrect && dndState.sourceItems.length === 0) {
             console.log("Out of hearts / Failed DND");
             // Maybe show a modal or different feedback instead of just blocking setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});
             return;
         }  // Reference to currently playing audio object (if using Audio API)
    }oElement | null>(null);
    if (currentSlideIndex < totalSlides - 1) { 
        setCurrentSlideIndex(currentSlideIndex + 1); length;
    }
    else { 
        console.log("Lesson Finished! Redirecting to quiz"); te
        router.push('/quiz'); // Changed from '/' to '/quiz'
    }
};

  // --- Rendering ---
  const renderHearts = () => {of window === 'undefined') return;
      const heartsArray = []; const maxHearts = 3;
      for (let i = 0; i < maxHearts; i++) heartsArray.push(<FontAwesomeIcon key={i} icon={faHeart} style={{ opacity: i < hearts ? 1 : 0.3 }}/>);
      heartsArray.push(<span key="count" style={{ fontWeight: 'bold', marginLeft: '4px', color: 'var(--error-red)' }}>{hearts}</span>);
      return heartsArray;
  };

  // Determine Button State and Style
  let continueButtonText = "Continue";
  let continueButtonDisabled = false; setStandard(standardParam);
  let continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`; // Green default

  if (currentContent.type === 'drag-drop') {   // Select the appropriate content based on chapter parameter
    const totalPlaced = dndState.naturalTarget.length + dndState.manMadeTarget.length;Content: LessonContent[] = lessonContent; // Default to chapter 1
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
  }dContent = contentChapter4;
  if (currentSlideIndex === totalSlides - 1 && (currentContent.type !== 'drag-drop' || dndChecked)) {           break;
    continueButtonText = "Start Quiz"; // Changed from "Finish Lesson" to "Start Quiz"
}or chapter:", chapterParam);
  // --- JSX ---
  return (      }
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
            {currentContent.type === 'learn' && (edContent.length, "slides");
                <div className={styles.learningSlideLayout}>
                    {/* Visual Column */}
                    {(currentContent.imageUrl || currentContent.exampleImages) && (content changes
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
                                            key={i}e
                                            className={styles.tooltipWrapper}=== 'drag-drop') {
                                            data-tooltip={img.alt}
                                            style={{ '--image-index': i } as any}ems,
                                        >
                                            <motion.img 
                                                src={img.src} 
                                                alt={img.alt}       setDndChecked(false);
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

                    {/* Text Column (Mascot + Speech) */}-drop') {
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
                                        title={isAudioPlaying ? "Stop" : "Listen"}entSlideIndex - 1);
                                    >
                                        <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
                                    </button>ard}/chapter/${chapter}`);
                                )}itConfirm(false);
                            </div>
                            <div className={styles.mascotImageContainer}>ntSlideIndex - 1);
                                <motion.img 
                                    src="/images/mascot.png" 
                                    alt="Owlbert Mascot" 
                                    className={styles.mascotImage}
                                    initial={{ y: 0 }}
                                    animate={{ (); audioRef.current = null; }
                                        y: [-10, 0],
                                        scale: [1, 1.05, 1]
                                    }}t stop
                                    transition={{ 
                                        y: {
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",nt.speakText;
                                            ease: "easeInOut"tent.type === 'learn') {
                                        },Array(currentContent.description) ? currentContent.description.join(' ') : currentContent.description;
                                        scale: {
                                            duration: 0.3
                                        }r now)
                                    }}
                                    whileHover={{ ) requires managing Audio objects. Using SpeechSynthesis as fallback.");
                                        scale: 1.1, stopping) ---
                                        rotate: [-5, 5, -5, 5, 0],
                                        transition: {currentContent.audioSrc);
                                            rotate: {rence
                                                duration: 0.5,
                                                ease: "easeInOut"
                                            }rent = null; };
                                        }e); audioRef.current = null; console.error("Error playing audio file"); /* Fallback? */ };
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                />allback if Audio fails
                            </div>
                        </div>
                        {currentContent.imageUrl && currentContent.exampleImages && ( // Show examples below text if main image exists.speechSynthesis) {
                            <div className={styles.exampleImageContainer}> 
                                {currentContent.exampleImages.map((img, i) => (
                                    <div re state is false if nothing can play
                                        key={i}
                                        className={styles.tooltipWrapper}
                                        data-tooltip={img.alt}f window !== 'undefined' && window.speechSynthesis) {
                                    >Use speech synthesis if no audio file
                                        <motion.img 
                                            src={img.src} false); // Cannot play anything
                                            alt={img.alt} 
                                            className={styles.exampleImage}
                                            title={img.alt}
                                            whileHover={{ 
                                                scale: 1.05,
                                                rotate: 2,nce(text);
                                                transition: {et language
                                                    type: "spring",(true);
                                                    stiffness: 300,
                                                    damping: 10
                                                }(e) => {
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>se);
                </div>
            )}

            {/* --- Drag and Drop Slide Rendering --- */}
            {currentContent.type === 'drag-drop' && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.dragDropArea}>
                  <div style={{textAlign: 'center'}}>hecked
                    <p className={styles.dragDropInstruction}>{currentContent.instruction}</p>
                    {(currentContent.audioSrc || currentContent.speakText) && (
                      <button pableId as keyof typeof dndState;
                        className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
                        onClick={playSlideAudio} 
                        title={isAudioPlaying ? "Stop" : "Listen"} in same spot
                        style={{marginTop: '-10px', marginBottom: '20px'}}stId && source.index === destination.index) return;
                      >
                        <FontAwesomeIcon icon={faHeadphones} /> Listen
                      </button>
                    )}State[sourceId]);
                  </div>

                  {/* Source List */}
                  <Droppable droppableId="sourceItems" direction="horizontal">
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                        className={styles.draggableSourceList}
                        style={{Id]);
                          borderColor: snapshot.isDraggingOver ? 'var(--primary-blue)' : 'var(--border-light)',
                          background: snapshot.isDraggingOver ? 'var(--bg-hover)' : 'var(--bg-light)'splice(source.index, 1);
                        }}.index, 0, removed);
                      >
                        {dndState.sourceItems?.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.draggableItem} ${snapshot.isDragging ? styles.draggableItemDragging : ''}`}
                                style={provided.draggableProps.style}  // Modify the checkDragDrop function
                              >
                                {item.imageUrl && (
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.text} arget.length + dndState.manMadeTarget.length;
                                    style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}[itemId: string]: boolean } = {};
                                  />h === 0;
                                )}
                                {item.text}
                              </div>
                            )}
                          </Draggable>Count++;
                        ))}
                        {provided.placeholder}
                      </div>
                    )}h(item => {
                  </Droppable>

                  {/* Target Lists */}
                  <div className={styles.dropTargetsContainer}>
                    {currentContent.targets.map((target) => (
                      <Droppable key={target.id} droppableId={target.id}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`${styles.dropTargetColumn} into the boxes first!");
                              ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''} 
                              ${dndChecked && !Object.values(itemCorrectness).some(correct => !correct) ? styles.allCorrect : ''}`}e items. ${correctCount} placed correctly so far.`);
                          >
                            <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                              <FontAwesomeIcon icon={target.type === 'natural' ? faLeaf : faWrench} style={{ marginRight: '8px'}}/>
                              {target.title}
                            </h3>
                            <div className={styles.dropTargetList}>
                              {dndState[target.id]?.map((item, index) => (.createElement('div');
                                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked}>= styles.confettiContainer;
                                  {(provided, snapshot) => (ntainer);
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}+) {
                                      {...provided.dragHandleProps}nfetti();
                                      className={`${styles.draggableItem} ${dndChecked ? (itemCorrectness[item.id] ? styles.itemCorrect : styles.itemIncorrect) : ''}`}r.appendChild(piece);
                                      style={provided.draggableProps.style}
                                    >ce after animation
                                      {item.imageUrl && (Listener('animationend', () => {
                                        <img             piece.remove();
                                          src={item.imageUrl} 
                                          alt={item.text} 
                                          style={{height: '30px', marginRight: '8px', pointerEvents: 'none'}}
                                        />ll animations
                                      )}
                                      {item.text}ntainer.remove();
                                    </div>tti(false);
                                  )}
                                </Draggable>
                              ))}ctCount} correct, ${incorrectCount} incorrect. Look closely!`);
                              {provided.placeholder}ts(prev => Math.max(0, prev - 1));
                            </div>      }
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>tinue = () => {
op') {
                  {/* Feedback Message */}        if (!dndChecked) { checkDragDrop(); return; }
                  {dndFeedback && (tinue if failed and out of hearts
                    <div className={`${styles.dragDropFeedback} ${dndChecked && !Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0 ? styles.dragDropFeedbackCorrect : styles.dragDropFeedbackIncorrect}`}>= Object.values(itemCorrectness).some(correct => !correct);
                      {dndFeedback} 0) {
                    </div>
                  )}
                </div>
              </DragDropContext>
            )}
          </div> {/* End learningArea */} < totalSlides - 1) { 
        </main>deIndex(currentSlideIndex + 1); 

        {/* ----- Footer ----- */}{ 
        <footer className={styles.learningFooter}>sole.log("Lesson Finished! Redirecting to quiz"); 
              <button className={styles.previousButton} onClick={handlePrevious} disabled={currentSlideIndex === 0}> <FontAwesomeIcon icon={faArrowLeft} /> Previous </button>    router.push('/quiz'); // Changed from '/' to '/quiz'
              <button className={continueButtonClass} onClick={handleContinue} disabled={continueButtonDisabled}> {continueButtonText} <FontAwesomeIcon icon={faArrowRight} /> </button>   }


















}  );    </div>        )}           </div>               </div>                   </div>                       <button className={styles.modalConfirm} onClick={handleConfirmExit}>Exit Anyway</button>                       <button className={styles.modalCancel} onClick={handleCancelExit}>Cancel</button>                   <div className={styles.modalButtons}>                   <h2>Exit Lesson?</h2> <p>Your progress might not be saved.</p>               <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>           <div className={styles.modalOverlay} onClick={handleCancelExit}>       {showExitConfirm && (       {/* --- Exit Modal --- */}      </div> {/* End learningContent */}        </footer>};

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
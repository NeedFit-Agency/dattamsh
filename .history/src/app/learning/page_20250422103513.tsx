'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faGear,
  faVolumeUp,
  faCheck,
  faTimes,
  faHeart,
  faLeaf,
  faWrench,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

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
  id: string;
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
    imageUrl: '/images/intro-scene.png',
    audioSrc: '/audio/01_intro.mp3',
    speakText: "Hi there! I'm Owlbert! We see so many things around us every day. Some things, like trees and birds, are found in nature. Other things, like chairs and cars, are made by people. Let's learn the difference together!",
  },
  // ...existing code...
];

// --- Chapter 2: All About Computers ---
const contentChapter2: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Introduction to Computers', 
    description: [
      'Hello friends! Today we\'re going to learn all about computers.',
      'Computers are special machines that help us do many things.',
      'They can help us learn, play games, and talk to people far away.',
      'Let\'s discover what computers are and how they work!'
    ],
    imageUrl: '/images/computer-intro.png',
    audioSrc: '/audio/21_intro_computer.mp3',
    speakText: 'Hello friends! Today we\'re going to learn all about computers. Computers are special machines that help us do many things. They can help us learn, play games, and talk to people far away. Let\'s discover what computers are and how they work!'
  },
  // ...existing code...
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
  // ...existing code...
];

// --- Chapter 4: Keyboard and Mouse Fun ---
const contentChapter4: LessonContent[] = [
  {
    type: 'learn',
    title: 'Using Computer Input Devices',
    description: [
      'Hello, computer explorer! 🖱️',
      'Today we\'ll learn about the keyboard and mouse.',
      'These are special tools that help us tell the computer what to do.',
      'Let\'s discover how to use them the right way!'
    ],
    imageUrl: '/images/input-devices.png',
    audioSrc: '/audio/41_input_intro.mp3',
    speakText: 'Hello, computer explorer! Today we\'ll learn about the keyboard and mouse. These are special tools that help us tell the computer what to do. Let\'s discover how to use them the right way!'
  },
  // ...existing code...
];

// --- Standard 2 Chapter 1: More About Computers ---
const contentStandard2Chapter1: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Types of Computers', 
    description: [
      'Hello again! Today we\'re going to learn about different types of computers.',
      'Computers come in many shapes and sizes, from big to small!',
      'Let\'s explore the different kinds of computers we use in our daily lives.'
    ],
    imageUrl: '/images/computer-types.png',
    audioSrc: '/audio/2-11_intro_types.mp3',
    speakText: 'Hello again! Today we\'re going to learn about different types of computers. Computers come in many shapes and sizes, from big to small! Let\'s explore the different kinds of computers we use in our daily lives.'
  },
  // ...existing code...
];

// --- Standard 2 Chapter 2: All About Smartphones ---
const contentStandard2Chapter2: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Introduction to Smartphones', 
    description: [
      'Hi friends! Today we\'re going to talk about smartphones.',
      'Smartphones are special phones that work like mini computers.',
      'They let us do many things like calling, taking photos, and playing games.',
      'Let\'s learn all about these amazing devices!'
    ],
    imageUrl: '/images/smartphone-intro.png',
    audioSrc: '/audio/2-21_intro_smartphone.mp3',
    speakText: 'Hi friends! Today we\'re going to talk about smartphones. Smartphones are special phones that work like mini computers. They let us do many things like calling, taking photos, and playing games. Let\'s learn all about these amazing devices!'
  },
  // ...existing code...
];

// --- Standard 2 Chapter 3: Using Notepad ---
const contentStandard2Chapter3: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Introduction to Notepad', 
    description: [
      'Hello friends! Today we\'re going to learn about Notepad.',
      'Notepad is a simple program on computers that helps us write and save text.',
      'It\'s like a digital paper where we can type our thoughts, stories, or notes.',
      'Let\'s discover how to use this helpful program!'
    ],
    imageUrl: '/images/notepad-intro.png',
    audioSrc: '/audio/2-31_intro_notepad.mp3',
    speakText: 'Hello friends! Today we\'re going to learn about Notepad. Notepad is a simple program on computers that helps us write and save text. It\'s like a digital paper where we can type our thoughts, stories, or notes. Let\'s discover how to use this helpful program!'
  },
  // ...existing code...
];

// --- Standard 2 Chapter 4: Learning with Computers ---
const contentStandard2Chapter4: LessonContent[] = [
  { 
    type: 'learn', 
    title: 'Learning with Computers', 
    description: [
      'Hello explorers! Today we\'ll learn how computers help us learn.',
      'Computers can be amazing tools for discovering new things.',
      'They can help us read, write, calculate, and explore the world.',
      'Let\'s see how computers make learning fun and exciting!'
    ],
    imageUrl: '/images/learning-computers.png',
    audioSrc: '/audio/2-41_learning_intro.mp3',
    speakText: 'Hello explorers! Today we\'ll learn how computers help us learn. Computers can be amazing tools for discovering new things. They can help us read, write, calculate, and explore the world. Let\'s see how computers make learning fun and exciting!'
  },
  // ...existing code...
];

// Helper function to reorder list
const reorder = (list: DraggableItemData[], startIndex: number, endIndex: number): DraggableItemData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move item between lists
const move = (
    source: DraggableItemData[], 
    destination: DraggableItemData[], 
    droppableSource: any, 
    droppableDestination: any
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
};

// Confetti creation function
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
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({ 
    sourceItems: [], 
    naturalTarget: [], 
    manMadeTarget: [] 
  });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  // Inside your component, add this new state
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSlides = chapterContent.length;
  const currentContent = chapterContent[currentSlideIndex];

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
    } else if (standardParam === '2') {
      switch (chapterParam) {
        case '1':
          selectedContent = contentStandard2Chapter1;
          break;
        case '2':
          selectedContent = contentStandard2Chapter2;
          break;
        case '3':
          selectedContent = contentStandard2Chapter3;
          break;
        case '4':
          selectedContent = contentStandard2Chapter4;
          break;
        default:
          console.log("Using default content for Standard 2, chapter:", chapterParam);
          selectedContent = contentStandard2Chapter1;
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

  // Modified checkDragDrop function
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
        if (!dndChecked) { 
          checkDragDrop(); 
          return; 
        }
         
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
    const heartsArray = []; 
    const maxHearts = 3;
    
    for (let i = 0; i < maxHearts; i++) {
      heartsArray.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faHeart} 
          style={{ opacity: i < hearts ? 1 : 0.3 }}
        />
      );
    }
    
    heartsArray.push(
      <span 
        key="count" 
        style={{ 
          fontWeight: 'bold', 
          marginLeft: '4px', 
          color: 'var(--error-red)' 
        }}
      >
        {hearts}
      </span>
    );
    
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
      
      if (allPlaced && anyIncorrect) {
        continueButtonClass = `${styles.continueButton} ${styles.continueButtonIncorrect}`;
      } else if (allPlaced && !anyIncorrect) {
        continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`;
      } else {
        continueButtonClass = styles.continueButton; // Blue if checked but not all placed
      }
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
            <button 
              className={styles.backButton} 
              onClick={handleBackClick} 
              title="Exit Lesson"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.heartsContainer}>
                {renderHearts()}
              </div>
              <button 
                className={styles.settingsButton} 
                title="Settings (Not Implemented)"
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>
        </header>

        {/* ----- Main Content ----- */}
        <main className={styles.learningMain}>
          <h1 className={styles.lessonTitle}>{currentContent.title}</h1>

          <div className={styles.learningArea}>
            {/* --- Learning Slide Rendering --- */}
            {currentContent.type === 'learn' && (
              // ...existing code...
            )}

            {/* --- Drag and Drop Slide Rendering --- */}
            {currentContent.type === 'drag-drop' && (
              // ...existing code...
            )}
          </div> {/* End learningArea */}
        </main>

        {/* ----- Footer ----- */}
        <footer className={styles.learningFooter}>
          <button 
            className={styles.previousButton} 
            onClick={handlePrevious} 
            disabled={currentSlideIndex === 0}
          > 
            <FontAwesomeIcon icon={faArrowLeft} /> Previous 
          </button>
          <button 
            className={continueButtonClass} 
            onClick={handleContinue} 
            disabled={continueButtonDisabled}
          > 
            {continueButtonText} <FontAwesomeIcon icon={faArrowRight} /> 
          </button>
        </footer>
      </div> {/* End learningContent */}

      {/* --- Exit Modal --- */}
      {showExitConfirm && (
        <div className={styles.modalOverlay} onClick={handleCancelExit}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Exit Lesson?</h2> 
            <p>Your progress might not be saved.</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancel} onClick={handleCancelExit}>
                Cancel
              </button>
              <button className={styles.modalConfirm} onClick={handleConfirmExit}>
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div> 
  );
}
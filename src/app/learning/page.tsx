'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  DropResult,
} from '@hello-pangea/dnd';

import styles from './learning.module.css';
import { standards } from '../../data/standardsData';
import ContentRenderer from '../../components/learning/ContentRenderer';


export const formatContentWithEmojis = (text: string): React.ReactNode => {
  const hasEmojis = /[\p{Emoji}]/u.test(text);

  if (hasEmojis) {
    const parts = text.split(/(\p{Emoji}+)/u);
    return parts.map((part, index) => {
      if (/[\p{Emoji}]/u.test(part)) {
        return (
          <span
            key={index}
            className="emoji"
            style={{
              fontSize: '1.4em',
              verticalAlign: 'middle',
              display: 'inline-block',
              margin: '0 2px',
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }

  if (/^\s*(\d+[\.\)]|[•\-\*])\s+/.test(text)) {
    return <strong style={{ fontWeight: 600 }}>{text}</strong>;
  }

  return text;
};


export interface ExampleImage {
  src: string;
  alt: string;
}

interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[];
  imageUrl?: string;
  exampleImages?: { src: string; alt: string }[];
  audioSrc?: string;
  speakText?: string;
}

interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made';
  imageUrl?: string;
}

interface DropTargetData {
  id: 'naturalTarget' | 'manMadeTarget';
  title: string;
  type: 'natural' | 'man-made';
}

interface DragDropSlide {
  type: 'drag-drop';
  title: string;
  instruction: string;
  items: DraggableItemData[];
  targets: DropTargetData[];
  audioSrc?: string;
  speakText?: string;
}

type LessonContent = LearningSlide | DragDropSlide;

interface Chapter {
  id: number;
  title: string;
  lessonContent: LessonContent[];
}

interface Standard {
  [key: string]: Chapter[];
}

const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = styles.confetti;
  const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#2196F3'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  confetti.style.opacity = '1';
  confetti.style.animation = `${styles.confettiFall} ${Math.random() * 3 + 2}s linear forwards`;

  return confetti;
};

export default function LearningPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const router = useRouter();

  const initialLessonContent = standards["1"][0].lessonContent;
  const [chapterContent, setChapterContent] = useState<LessonContent[]>(initialLessonContent);
  const [standard, setStandard] = useState<string>('1');
  const [chapter, setChapter] = useState<string>('1');

  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({
    sourceItems: [],
    naturalTarget: [],
    manMadeTarget: []
  });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [dndFeedback, setDndFeedback] = useState<string | null>(null);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  const [showConfetti, setShowConfetti] = useState(false);

  const totalSlides = chapterContent.length;
  const currentContent = chapterContent[currentSlideIndex] || chapterContent[0] || null;

  const areAllItemsPlaced = useCallback(() => {
    return (dndState.sourceItems?.length || 0) === 0;
  }, [dndState.sourceItems]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const standardParam = searchParams.get('standard') || '1';
    const chapterParam = searchParams.get('chapter') || '1';

    console.log("URL Parameters:", { standard: standardParam, chapter: chapterParam });
    setStandard(standardParam);
    setChapter(chapterParam);

    let selectedContent: LessonContent[] = initialLessonContent;
    const standardChapters = standards[standardParam];
    const chapterIndex = parseInt(chapterParam, 10) - 1;

    if (standardChapters && standardChapters[chapterIndex]) {
      selectedContent = standardChapters[chapterIndex].lessonContent;
    } else {
      console.warn(`Chapter ${chapterParam} not found for Standard ${standardParam}. Defaulting to first chapter.`);
      selectedContent = standardChapters ? standardChapters[0].lessonContent : initialLessonContent;
    }

    console.log(`Selected content for Standard ${standardParam}, Chapter ${chapterParam} with ${selectedContent.length} slides.`);
    setChapterContent(selectedContent);
    setCurrentSlideIndex(0);
    setProgress(0);

  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsAudioPlaying(false);

    const currentSlideData = chapterContent[currentSlideIndex];
    if (currentSlideData && currentSlideData.type === 'drag-drop') {
      setDndState({
        sourceItems: currentSlideData.items ? [...currentSlideData.items] : [],
        naturalTarget: [],
        manMadeTarget: []
      });
      setDndChecked(false);
      setDndFeedback(null);
      setItemCorrectness({});
      setShowConfetti(false);
    }
  }, [currentSlideIndex, chapterContent]);

  useEffect(() => {
    if (totalSlides > 0) {
        setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
    } else {
        setProgress(0);
    }
  }, [currentSlideIndex, totalSlides]);

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
  }, [chapterContent]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleBackClick = () => {
    if (currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
        setShowExitConfirm(true);
    }
  };

  const handleConfirmExit = () => {
      setShowExitConfirm(false);
      router.push(`/standard/${standard}/chapter/${chapter}`);
    };
  const handleCancelExit = () => setShowExitConfirm(false);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const playSlideAudio = useCallback(() => {
      if (!currentContent) return;

      window.speechSynthesis?.cancel();

      if (isAudioPlaying) {
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

      if (currentContent.audioSrc) {
          console.warn("Audio file playback (.mp3) not fully implemented. Using SpeechSynthesis fallback.");
           if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
               speakText(textToSpeak);
           } else {
               setIsAudioPlaying(false);
           }
      } else if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
         speakText(textToSpeak);
      } else {
          console.log("No audio source or text to speak for this slide.");
          setIsAudioPlaying(false);
      }
  }, [currentContent, isAudioPlaying]);

   const speakText = (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
          console.error("SpeechSynthesis API not available.");
          setIsAudioPlaying(false);
          return;
      }
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || dndChecked) return;

    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;

    if (sourceId === destId && source.index === destination.index) return;

    const sourceItems = dndState[sourceId] ? [...dndState[sourceId]] : [];
    const destItems = dndState[destId] ? [...dndState[destId]] : [];

    if (sourceId === destId) {
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);

      setDndState(prev => ({
        ...prev,
        [sourceId]: sourceItems
      }));
    } else {
      if (sourceItems.length > source.index) {
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

  const checkDragDrop = () => {
    if (!currentContent || currentContent.type !== 'drag-drop') return;

    let correctCount = 0;
    let incorrectCount = 0;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};

    dndState.naturalTarget?.forEach(item => {
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    dndState.manMadeTarget?.forEach(item => {
      const isCorrect = item.type === 'man-made';
      newCorrectnessMap[item.id] = isCorrect;
      if(isCorrect) correctCount++;
      else incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    const totalPlacedInTargets = (dndState.naturalTarget?.length || 0) + (dndState.manMadeTarget?.length || 0);
    const allItemsPlaced = areAllItemsPlaced();

    if (totalPlacedInTargets === 0) {
      setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
      setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else {
      if (incorrectCount === 0) {
        setDndFeedback("Great job! All items are in the correct boxes!");
        setShowConfetti(true);
        const confettiContainer = document.createElement('div');
        confettiContainer.className = styles.confettiContainer;
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
          const piece = createConfetti();
          confettiContainer.appendChild(piece);
          piece.addEventListener('animationend', () => {
            piece.remove();
          });
        }

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

  const handleContinue = () => {
    if (!currentContent) return;

    if (currentContent.type === 'drag-drop') {
        if (!dndChecked) {
            checkDragDrop();
            return;
        }
         const allPlaced = areAllItemsPlaced();
         const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);

         if (hearts <= 0 && anyIncorrect && allPlaced) {
             console.log("Out of hearts / Failed DND - Cannot continue");
             setDndFeedback("Oops! You're out of hearts. Try reviewing the items again or move to the next lesson.");
             return;
         }
    }

    if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
    }
    else {
        console.log("Lesson Finished! Redirecting to quiz page for Standard/Chapter:", standard, chapter);
        router.push(`/quiz?standard=${standard}&chapter=${chapter}`);
    }
  };


  let continueButtonText = "Continue";
  let continueButtonDisabled = false;
  let continueButtonClass = `${styles.continueButton}`;

  if (currentContent && currentContent.type === 'drag-drop') {
    const totalPlaced = (dndState.naturalTarget?.length || 0) + (dndState.manMadeTarget?.length || 0);
    const allPlaced = areAllItemsPlaced();
    const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);

    if (!dndChecked) {
      continueButtonText = "Check Answers";
      continueButtonDisabled = totalPlaced === 0;
      continueButtonClass += ` ${styles.continueButtonCheck}`;
    } else {
      continueButtonText = "Continue";
      continueButtonDisabled = hearts <= 0 && anyIncorrect && allPlaced;

      if (allPlaced && anyIncorrect) {
           continueButtonClass += ` ${styles.continueButtonIncorrect}`;
      } else if (allPlaced && !anyIncorrect) {
           continueButtonClass += ` ${styles.continueButtonCorrect}`;
      } else {
           continueButtonClass += ` ${styles.continueButtonCheck}`;
      }
    }
  } else {
      continueButtonClass += ` ${styles.continueButtonCorrect}`;
  }

  if (currentSlideIndex === totalSlides - 1 && (!currentContent || currentContent.type !== 'drag-drop' || dndChecked)) {
    const allowFinish = currentContent.type !== 'drag-drop' || (dndChecked && !(hearts <= 0 && Object.values(itemCorrectness).some(c => !c) && areAllItemsPlaced()));
    if (allowFinish) {
        continueButtonText = "Start Quiz";
    }
  }

   if (!currentContent) {
        return <div className={styles.loadingMessage}>Loading Lesson...</div>;
   }

  return (
    <div>
      <div className={styles.learningContent}>
        <header className={styles.learningHeader}>

        </header>

        <main className={styles.learningMain}>
          <ContentRenderer 
            content={currentContent}
            onBack={handleBackClick}
            onComplete={handleContinue}
            progress={progress}
          />
        </main>

        {currentContent.type !== 'drag-drop' && (
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
        )}
      </div>

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
        </div>
      )}
    </div>
  );
}
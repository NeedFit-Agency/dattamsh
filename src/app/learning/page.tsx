'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './learning.module.css';
import { standards } from '../../data/standardsData';
import ContentRenderer from '../../components/learning/ContentRenderer';
import type { DraggableItemData, LessonContent } from '../../data/standardsData';

export interface ExampleImage {
  src: string;
  alt: string;
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearningPageContent />
    </Suspense>
  );
}

function LearningPageContent() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [chapterContent, setChapterContent] = useState<LessonContent[]>([]);
  const [standard, setStandard] = useState<string>('1');
  const [chapter, setChapter] = useState<string>('1');

  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({
    sourceItems: [],
    naturalTarget: [],
    manMadeTarget: []
  });
  const [dndChecked, setDndChecked] = useState<boolean>(false);
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

  const totalSlides = chapterContent.length;
  const currentContent = chapterContent[currentSlideIndex] || null;
  const isLastSlide = totalSlides > 0 && currentSlideIndex === totalSlides - 1;

  const areAllItemsPlaced = useCallback(() => {
    return (dndState.sourceItems?.length || 0) === 0;
  }, [dndState.sourceItems]);

  useEffect(() => {
    const standardParam = searchParams.get('standard') || '1';
    const chapterParam = searchParams.get('chapter') || '1';
    const lessonParam = searchParams.get('lesson') || '1';

    setStandard(standardParam);
    setChapter(chapterParam);

    let selectedContent: LessonContent[] = [];
    const standardData = standards[standardParam as keyof typeof standards];
    
    if (standardData) {
      // The `lesson` param from the URL corresponds to the chapter `id` in our data.
      const chapterData = standardData.find(
        (ch) => ch.id.toString() === lessonParam
      );

      if (chapterData && chapterData.lessonContent) {
        selectedContent = chapterData.lessonContent;
      }
    }

    if (!selectedContent.length) {
      console.warn(`Content not found for Standard ${standardParam}, Chapter ${chapterParam}, Lesson ${lessonParam}.`);
      // Fallback logic
      const fallbackStandard = standards['1'];
      const fallbackChapter = fallbackStandard ? fallbackStandard[0] : null;
      selectedContent = fallbackChapter ? fallbackChapter.lessonContent : [];
    }
    
    setChapterContent(selectedContent);
    setCurrentSlideIndex(0);
    setProgress(0);
    setHearts(3);
    setDndChecked(false);
    setItemCorrectness({});

  }, [searchParams]);

  useEffect(() => {
    window.speechSynthesis?.cancel();

    const currentSlideData = chapterContent[currentSlideIndex];
    if (currentSlideData && currentSlideData.type === 'drag-drop') {
      setDndState({
        sourceItems: currentSlideData.items ? [...currentSlideData.items] : [],
        naturalTarget: [],
        manMadeTarget: []
      });
      setDndChecked(false);
      setItemCorrectness({});
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
      if ('imageUrl' in slide && typeof slide.imageUrl === 'string' && slide.imageUrl) {
        const img = new Image();
        img.src = slide.imageUrl;
      }
      if ('exampleImages' in slide && Array.isArray(slide.exampleImages)) {
        slide.exampleImages.forEach((imgData: { src: string }) => {
          const img = new Image();
          img.src = imgData.src;
        });
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
    } else {
      router.push(`/standard/${standard}/chapter/${chapter}`);
    }
  };

  const handleActivityComplete = () => {
    if (!isLastSlide) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
    // If it is the last slide, the onComplete prop with href will handle navigation.
  };

  const onCompleteProp = isLastSlide
    ? { href: `/standard/${standard}/chapter/${chapter}` }
    : handleActivityComplete;

  const checkDragDrop = () => {
    if (!currentContent || currentContent.type !== 'drag-drop') return;

    let incorrectCount = 0;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};

    dndState.naturalTarget?.forEach(item => {
      const isCorrect = item.type === 'natural';
      newCorrectnessMap[item.id] = isCorrect;
      if(!isCorrect) incorrectCount++;
    });

    dndState.manMadeTarget?.forEach(item => {
      const isCorrect = item.type === 'man-made';
      newCorrectnessMap[item.id] = isCorrect;
      if(!isCorrect) incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap);
    setDndChecked(true);

    const totalPlacedInTargets = (dndState.naturalTarget?.length || 0) + (dndState.manMadeTarget?.length || 0);
    const allItemsPlaced = areAllItemsPlaced();

    if (totalPlacedInTargets === 0) {
      // setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
      // setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
    } else {
      if (incorrectCount === 0) {
        // setDndFeedback("Great job! All items are in the correct boxes!");
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
        }, 5000);

      } else {
        // setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
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
             // setDndFeedback("Oops! You're out of hearts. Try reviewing the items again or move to the next lesson.");
             return;
         }
    }    if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
    }
    else {
        console.log("Lesson Finished! Redirecting back to chapter page for Standard/Chapter:", standard, chapter);
        router.push(`/standard/${standard}/chapter/${chapter}`);
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
        continueButtonText = "Finish Lesson";
    }
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
            onComplete={onCompleteProp}
            progress={progress}
            isLastLesson={isLastSlide}
          />        </main>
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
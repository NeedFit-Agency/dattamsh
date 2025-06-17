'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
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
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({});

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

  }, [initialLessonContent]);

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
    }
  };

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
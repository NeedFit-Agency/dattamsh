// src/hooks/useLearningState.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { standards, LessonContent } from '@/data/standardsData';

export function useLearningState() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const router = useRouter();

  const initialLessonContent = standards["1"][0].lessonContent;
  const currentContent = initialLessonContent[currentSlideIndex] || null;

  useEffect(() => {
    // Logic to fetch and set chapter content
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
    router.push(`/standard/1`);
  };

  const handleCancelExit = () => setShowExitConfirm(false);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleContinue = () => {
    if (currentSlideIndex < initialLessonContent.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      router.push(`/quiz?standard=1&chapter=1`);
    }
  };

  return {
    currentSlideIndex,
    currentContent,
    handleBackClick,
    handleContinue,
    handlePrevious,
    continueButtonText: "Continue",
    continueButtonDisabled: false,
    continueButtonClass: "continueButtonClass",
    showExitConfirm,
    handleCancelExit,
    handleConfirmExit,
  };
}
/**
 * Custom hook for accessing standards data
 * 
 * This hook provides a consistent interface for components to access standards data
 * using the standardsService implementation.
 */

import { useState, useEffect } from 'react';
import standardsService from '../services/standardsService';
import { Chapter, LessonContent } from '../types/standards';

/**
 * Hook return type
 */
interface UseStandardsReturn {
  // Data
  standardIds: string[];
  currentStandard: string;
  currentChapter: number;
  chapterData: Chapter | undefined;
  lessonContent: LessonContent[];
  totalChapters: number;
  isLoading: boolean;
  error: string | null;
  
  // Methods
  setStandard: (standardId: string) => void;
  setChapter: (chapterId: number) => void;
  goToNextChapter: () => boolean;
  goToPreviousChapter: () => boolean;
}

/**
 * Custom hook for accessing and managing standards data
 * 
 * @param initialStandard - Initial standard ID to load
 * @param initialChapter - Initial chapter ID to load
 * @returns Object with standards data and methods to interact with it
 */
export function useStandards(
  initialStandard: string = '1',
  initialChapter: number = 1
): UseStandardsReturn {
  // Get available standard IDs (using Object.keys since our service doesn't have a direct method)
  const [standardIds] = useState<string[]>(Object.keys(standardsService.getAllStandards()));
  const [currentStandard, setCurrentStandard] = useState<string>(initialStandard);
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [chapterData, setChapterData] = useState<Chapter | undefined>();
  const [lessonContent, setLessonContent] = useState<LessonContent[]>([]);
  const [totalChapters, setTotalChapters] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load chapter data when standard or chapter changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Get chapters for this standard
      const chapters = standardsService.getChaptersByStandard(currentStandard);
      
      // Validate standard exists
      if (!chapters || chapters.length === 0) {
        throw new Error(`Standard ${currentStandard} not found`);
      }

      // Set total chapters for this standard
      setTotalChapters(chapters.length);

      // Validate chapter exists
      const chapterExists = chapters.some(chapter => chapter.id === currentChapter);
      if (!chapterExists) {
        throw new Error(`Chapter ${currentChapter} not found in standard ${currentStandard}`);
      }

      // Load chapter data
      const chapter = standardsService.getChapter(currentStandard, currentChapter.toString());
      setChapterData(chapter as unknown as Chapter); // Type casting to maintain compatibility

      // Load lesson content
      const content = standardsService.getLessonContent(currentStandard, currentChapter.toString());
      setLessonContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error loading standards data');
      console.error('Error loading standards data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentStandard, currentChapter]);

  // Method to set standard
  const setStandard = (standardId: string) => {
    const chapters = standardsService.getChaptersByStandard(standardId);
    if (chapters && chapters.length > 0) {
      setCurrentStandard(standardId);
      setCurrentChapter(1); // Reset to first chapter when standard changes
    } else {
      setError(`Standard ${standardId} not found`);
    }
  };

  // Method to set chapter
  const setChapter = (chapterId: number) => {
    const chapters = standardsService.getChaptersByStandard(currentStandard);
    const chapterExists = chapters.some(chapter => chapter.id === chapterId);
    if (chapterExists) {
      setCurrentChapter(chapterId);
    } else {
      setError(`Chapter ${chapterId} not found in standard ${currentStandard}`);
    }
  };

  // Method to go to next chapter
  const goToNextChapter = (): boolean => {
    const nextChapter = currentChapter + 1;
    const chapters = standardsService.getChaptersByStandard(currentStandard);
    const chapterExists = chapters.some(chapter => chapter.id === nextChapter);
    
    if (chapterExists) {
      setCurrentChapter(nextChapter);
      return true;
    }
    return false;
  };

  // Method to go to previous chapter
  const goToPreviousChapter = (): boolean => {
    const prevChapter = currentChapter - 1;
    const chapters = standardsService.getChaptersByStandard(currentStandard);
    const chapterExists = chapters.some(chapter => chapter.id === prevChapter);
    
    if (chapterExists) {
      setCurrentChapter(prevChapter);
      return true;
    }
    return false;
  };

  return {
    // Data
    standardIds,
    currentStandard,
    currentChapter,
    chapterData,
    lessonContent,
    totalChapters,
    isLoading,
    error,
    
    // Methods
    setStandard,
    setChapter,
    goToNextChapter,
    goToPreviousChapter,
  };
}
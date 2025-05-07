/**
 * Standards Data Service
 * 
 * This service provides methods to access educational standards data
 * in a more efficient and maintainable way.
 */

import { standards, Standard, Chapter, LessonContent } from './standardsData';

/**
 * Service class for handling standards data operations
 */
export class StandardsService {
  /**
   * Get all available standards
   * @returns Array of standard IDs
   */
  static getStandardIds(): string[] {
    return Object.keys(standards);
  }

  /**
   * Get all chapters for a specific standard
   * @param standardId - The standard ID
   * @returns Array of chapters or empty array if standard not found
   */
  static getChaptersByStandard(standardId: string): Chapter[] {
    return standards[standardId] || [];
  }

  /**
   * Get a specific chapter from a standard
   * @param standardId - The standard ID
   * @param chapterId - The chapter ID (1-based index)
   * @returns The chapter or undefined if not found
   */
  static getChapter(standardId: string, chapterId: number): Chapter | undefined {
    const chapters = this.getChaptersByStandard(standardId);
    return chapters.find(chapter => chapter.id === chapterId);
  }

  /**
   * Get lesson content for a specific chapter
   * @param standardId - The standard ID
   * @param chapterId - The chapter ID (1-based index)
   * @returns Array of lesson content or empty array if not found
   */
  static getLessonContent(standardId: string, chapterId: number): LessonContent[] {
    const chapter = this.getChapter(standardId, chapterId);
    return chapter?.lessonContent || [];
  }

  /**
   * Check if a standard exists
   * @param standardId - The standard ID to check
   * @returns Boolean indicating if the standard exists
   */
  static standardExists(standardId: string): boolean {
    return standardId in standards;
  }

  /**
   * Check if a chapter exists within a standard
   * @param standardId - The standard ID
   * @param chapterId - The chapter ID to check
   * @returns Boolean indicating if the chapter exists
   */
  static chapterExists(standardId: string, chapterId: number): boolean {
    return !!this.getChapter(standardId, chapterId);
  }

  /**
   * Get total number of chapters in a standard
   * @param standardId - The standard ID
   * @returns Number of chapters
   */
  static getChapterCount(standardId: string): number {
    return this.getChaptersByStandard(standardId).length;
  }
}
/**
 * Standards Service
 * Provides methods to access and manipulate standards and chapters data
 */

import { 
  ChaptersDataType, 
  StandardTitleType, 
  HeaderThemeType, 
  ChapterDataType,
  ContentItemType,
  Standard,
  Chapter
} from '../types/standards';
import { chapters } from '../data/chaptersData';
import { standards } from '../data/standardsData';

export class StandardsService {
  private static instance: StandardsService;
  private standardTitles: StandardTitleType = {
    "1": "Basic Concepts",
    "2": "Intermediate Learning",
    "3": "Advanced Topics",
    "4": "Expert Level"
  };

  private headerThemes: HeaderThemeType = {
    "1": "themeGreen",
    "2": "themePurple",
    "3": "themeOrange",
    "4": "themeBlue",
    "5": "themeGreen",
    "6": "themePurple",
    "7": "themeOrange",
    "8": "themeBlue",
    "9": "themeGreen",
    "10": "themePurple",
    "11": "themeOrange",
    "12": "themeBlue",
  };

  private constructor() {}

  /**
   * Get the singleton instance of StandardsService
   */
  public static getInstance(): StandardsService {
    if (!StandardsService.instance) {
      StandardsService.instance = new StandardsService();
    }
    return StandardsService.instance;
  }

  /**
   * Get all chapters for a specific standard
   * @param standardId - The ID of the standard
   * @returns Array of chapters or empty array if standard not found
   */
  public getChaptersByStandard(standardId: string): ChaptersDataType[string] {
    if (!this.isValidStandardId(standardId)) {
      console.warn(`Invalid standard ID: ${standardId}`);
      return [];
    }
    
    return chapters[standardId as keyof typeof chapters] || [];
  }

  /**
   * Get a specific chapter by standard ID and chapter ID
   * @param standardId - The ID of the standard
   * @param chapterId - The ID of the chapter
   * @returns The chapter object or undefined if not found
   */
  public getChapter(standardId: string, chapterId: string) {
    if (!this.isValidStandardId(standardId)) {
      console.warn(`Invalid standard ID: ${standardId}`);
      return undefined;
    }

    const standardChapters = this.getChaptersByStandard(standardId);
    return standardChapters.find(chapter => chapter.id.toString() === chapterId);
  }

  /**
   * Get comprehensive chapter data including title, theme, and content
   * @param standardId - The ID of the standard
   * @param chapterId - The ID of the chapter
   * @returns Formatted chapter data with standard title, chapter title, theme, and content
   */
  public getChapterData(standardId: string, chapterId: string): ChapterDataType {
    const chapter = this.getChapter(standardId, chapterId);
    const chapterTitle = chapter?.title || "Unknown Chapter";

    return {
      standardTitle: this.getStandardTitle(standardId),
      chapterTitle,
      headerTheme: this.getHeaderTheme(chapterId),
      content: this.getDefaultChapterContent()
    };
  }

  /**
   * Get the title of a standard
   * @param standardId - The ID of the standard
   * @returns The title of the standard or "Unknown Standard" if not found
   */
  public getStandardTitle(standardId: string): string {
    return this.standardTitles[standardId] || "Unknown Standard";
  }

  /**
   * Get the theme class for a chapter header
   * @param chapterId - The ID of the chapter
   * @returns The theme class name
   */
  public getHeaderTheme(chapterId: string): string {
    return this.headerThemes[chapterId] || "themeGreen";
  }

  /**
   * Get all standards with their learning content
   * @returns The standards object
   */
  public getAllStandards(): Standard {
    return standards;
  }

  /**
   * Get a specific standard with its chapters and learning content
   * @param standardId - The ID of the standard
   * @returns The standard object or undefined if not found
   */
  public getStandard(standardId: string): Chapter[] | undefined {
    if (!this.isValidStandardId(standardId)) {
      console.warn(`Invalid standard ID: ${standardId}`);
      return undefined;
    }
    
    return standards[standardId];
  }

  /**
   * Get lesson content for a specific chapter
   * @param standardId - The ID of the standard
   * @param chapterId - The ID of the chapter
   * @returns The lesson content array or empty array if not found
   */
  public getLessonContent(standardId: string, chapterId: string) {
    const standard = this.getStandard(standardId);
    if (!standard) return [];

    const chapterIndex = parseInt(chapterId, 10) - 1;
    if (chapterIndex < 0 || chapterIndex >= standard.length) {
      console.warn(`Chapter index out of range: ${chapterIndex}`);
      return [];
    }

    return standard[chapterIndex].lessonContent || [];
  }

  /**
   * Check if a standard ID is valid
   * @param standardId - The ID to check
   * @returns True if valid, false otherwise
   */
  private isValidStandardId(standardId: string): boolean {
    return standardId !== undefined && standardId !== null && chapters.hasOwnProperty(standardId);
  }

  /**
   * Get default chapter content items
   * @returns Array of default content items
   */
  private getDefaultChapterContent(): ContentItemType[] {
    return [
      { type: 'level-badge', id: 1, level: 1, completed: true },
      { type: 'level-badge', id: 2, level: 2, completed: false },
      { type: 'level-badge', id: 3, level: 3, completed: true },
      { type: 'level-badge', id: 4, level: 4, completed: true },
      { type: 'chest', id: 5, completed: false },
      { type: 'duo', id: 6, completed: false }
    ];
  }
}

// Export a default instance for easy import
export default StandardsService.getInstance();
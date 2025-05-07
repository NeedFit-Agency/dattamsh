/**
 * StandardsSelector Component
 * 
 * A reusable component that demonstrates how to use the standards data
 * with the custom hook for better data flow.
 */

import React from 'react';
import { useStandards } from '../hooks/useStandards';

interface StandardsSelectorProps {
  onStandardChange?: (standardId: string) => void;
  onChapterChange?: (chapterId: number) => void;
}

/**
 * Component for selecting standards and chapters
 */
export const StandardsSelector: React.FC<StandardsSelectorProps> = ({
  onStandardChange,
  onChapterChange,
}) => {
  // Use the custom hook to access standards data
  const {
    standardIds,
    currentStandard,
    currentChapter,
    totalChapters,
    isLoading,
    error,
    setStandard,
    setChapter,
  } = useStandards();

  // Handle standard change
  const handleStandardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStandard = e.target.value;
    setStandard(newStandard);
    if (onStandardChange) {
      onStandardChange(newStandard);
    }
  };

  // Handle chapter change
  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChapter = parseInt(e.target.value, 10);
    setChapter(newChapter);
    if (onChapterChange) {
      onChapterChange(newChapter);
    }
  };

  if (isLoading) {
    return <div>Loading standards data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="standards-selector">
      <div className="selector-group">
        <label htmlFor="standard-select">Standard:</label>
        <select
          id="standard-select"
          value={currentStandard}
          onChange={handleStandardChange}
        >
          {standardIds.map((id) => (
            <option key={id} value={id}>
              Standard {id}
            </option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="chapter-select">Chapter:</label>
        <select
          id="chapter-select"
          value={currentChapter}
          onChange={handleChapterChange}
        >
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              Chapter {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/**
 * Usage example:
 * 
 * ```tsx
 * import { StandardsSelector } from '../components/StandardsSelector';
 * 
 * const MyPage = () => {
 *   const handleStandardChange = (standardId: string) => {
 *     console.log(`Standard changed to ${standardId}`);
 *   };
 * 
 *   const handleChapterChange = (chapterId: number) => {
 *     console.log(`Chapter changed to ${chapterId}`);
 *   };
 * 
 *   return (
 *     <div>
 *       <h1>Learning Content</h1>
 *       <StandardsSelector 
 *         onStandardChange={handleStandardChange}
 *         onChapterChange={handleChapterChange}
 *       />
 *       {/* Rest of your component *}
 *     </div>
 *   );
 * };
 * ```
 */
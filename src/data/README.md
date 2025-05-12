# Standards Data Structure

## Overview

This document explains the optimized data structure for standards and chapters in the application. The new architecture follows industry best practices with a clear separation of concerns, type safety, and a service-oriented approach.

## Architecture

The data flow has been restructured to follow these principles:

1. **Separation of Concerns**
   - Types are defined in `src/types/standards.ts`
   - Data is stored in `src/data/chaptersData.ts` and `src/data/standardsData.ts`
   - Business logic is in `src/services/standardsService.ts`
   - UI state management is in `src/hooks/useStandards.ts`

2. **Type Safety**
   - All data structures have explicit TypeScript interfaces
   - Consistent typing across the application

3. **Service Layer**
   - Centralized data access through `StandardsService`
   - Validation and error handling
   - Singleton pattern for consistent state

4. **React Hooks**
   - Custom `useStandards` hook for components
   - Manages loading states and errors
   - Provides a consistent interface

## Usage Examples

### In a Component

```tsx
import React from 'react';
import { useStandards } from '../hooks/useStandards';

const ChapterSelector = () => {
  const { 
    standardIds, 
    currentStandard, 
    setStandard,
    isLoading,
    error 
  } = useStandards();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <select 
      value={currentStandard}
      onChange={(e) => setStandard(e.target.value)}
    >
      {standardIds.map(id => (
        <option key={id} value={id}>Standard {id}</option>
      ))}
    </select>
  );
};
```

### Direct Service Access

```tsx
import standardsService from '../services/standardsService';

// Get chapter data
const chapterData = standardsService.getChapterData('1', '2');

// Get lesson content
const lessonContent = standardsService.getLessonContent('1', '2');
```

## Migration Guide

### For Components

1. Replace direct imports from data files with the hook or service:

```diff
- import { chapters } from '@/data/chaptersData';
+ import { useStandards } from '@/hooks/useStandards';

// OR

+ import standardsService from '@/services/standardsService';
```

2. Replace direct data access with service methods:

```diff
- const chapterTitle = chapters[standardId]?.find(chapter => 
-   chapter.id.toString() === chapterId
- )?.title || "Unknown Chapter";

+ const chapterData = standardsService.getChapterData(standardId, chapterId);
+ const chapterTitle = chapterData.chapterTitle;
```

### For New Features

1. Add new types to `src/types/standards.ts`
2. Add new data to the appropriate data file
3. Add new methods to `StandardsService` as needed
4. Update the `useStandards` hook if necessary

## Benefits

- **Maintainability**: Clear separation between types, data, and access logic
- **Reusability**: Consistent data access across components
- **Type Safety**: Strong typing throughout the application
- **Error Handling**: Centralized validation and error reporting
- **Testability**: Service methods and hooks can be easily unit tested
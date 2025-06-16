```md
# DattaMSH - Educational Platform Documentation

## 1. Project Overview

**DattaMSH** is an interactive educational platform designed specifically for children to learn computer literacy and programming concepts. The platform features a playful, gamified interface that makes learning engaging and fun.

### Tech Stack

- **Frontend Framework**: [Next.js](****) v15.2.4  
- **Animation Library**: [Framer Motion](****) v12.12.2  
- **UI Components**: [FontAwesome](****) for icons  
- **Styling**: TailwindCSS with PostCSS  
- **Language**: TypeScript  

---

## 2. Existing Component System

### Component Location

Components are organized in the `src/components` directory, with specialized subdirectories for different component types.

### Key UI Components

1. **DragDrop Component**  
   Path: `src/components/learning/DragDrop/DragDrop.tsx`  
   - Handles drag-and-drop interactions  
   - Includes audio feedback  
   - Responsive design with mobile support  

2. **Choose Component**  
   Path: `src/components/learning/Choose/Choose.tsx`  
   - Current matching game implementation  
   - Uses line-drawing for connections  

3. **ContentRenderer**  
   Path: `src/components/learning/ContentRenderer.tsx`  
   - Dynamic content rendering system  
   - Supports multiple content formats  

### Data Flow

Content is managed through two main data files:

- `standardsData.ts`: Defines learning standards  
- `chaptersData.ts`: Organizes content into chapters  

---

## 3. Change Request Analysis

### Component Updates

1. **Existing DragDrop**:  
   - Maintain as is

2. **New Matching Game**:  
   - Transform from line-drawing to bucket-based system

   #### Design Goals:
   - Intuitive drag-and-drop interface  
   - Visual feedback for correct/incorrect matches  
   - Animated transitions  
   - Clear target zones (buckets)  

---

## 4. Design Philosophy

- Child-friendly interface with large, clear interaction areas  
- Immediate visual and audio feedback  
- Smooth animations for engagement  
- Accessibility features including screen reader support  
- Haptic feedback for mobile devices  

---

## 5. Technical Strategy

### Implementation Plan

1. Create new component structure:
```

src/components/learning/
├── MatchingGame/
│   ├── MatchingGame.tsx
│   ├── MatchingGame.module.css
│   ├── types.ts
│   └── index.ts

```

2. Utilize Framer Motion for animations:
- Drag animations  
- Success/failure feedback  
- Bucket highlighting  

3. State Management:
- Use React's `useState` for local state  
- Implement `useLearningState` (located at `src/hooks/useLearningState.ts`) for shared state  

---

## 6. Folder Structure & Architecture

```

src/
├── components/
│   ├── learning/
│   │   ├── DragDrop/
│   │   ├── Choose/
│   │   └── MatchingGame/  (new)
├── data/
│   ├── standardsData.ts
│   └── chaptersData.ts
├── hooks/
│   └── useLearningState.ts
└── assets/
└── images/

```

---

## 7. Data & User Flow

### Data Flow

- Standards data → Chapter selection  
- Chapter data → Content rendering  
- Content format → Component selection  
- Component → User interaction → State updates  

### User Interaction Flow

1. View question/prompt  
2. Drag items to matching buckets  
3. Receive immediate feedback  
4. Progress to next question  

---

## 8. State Management

- Local component state using `useState`  
- Shared state through custom hooks  
- Progress tracking via URL parameters  
- Audio state for feedback  

---

## 9. Testing & QA Notes

### Test Cases

#### 1. Drag and Drop:
- Touch events on mobile  
- Mouse events on desktop  
- Drag boundaries  
- Drop zone detection  

#### 2. Accessibility:
- Keyboard navigation  
- Screen reader compatibility  
- Color contrast ratios  

#### 3. Responsive Design:
- Mobile portrait/landscape  
- Tablet layouts  
- Desktop views  

---

## 10. Summary & Next Steps

### Completed
- Project structure analysis  
- Component system review  
- Technical strategy definition  
- Implementation plan  

### Next Steps

1. Implement new `MatchingGame` component  
2. Update `ContentRenderer` for new format  
3. Add new game type to `standardsData`  
4. Create test suite  
5. Await designs for Components 3 and 4  

---

## Guidelines for Future Components

- Follow established component structure  
- Maintain consistent styling  
- Implement proper TypeScript interfaces  
- Include comprehensive test coverage  
```

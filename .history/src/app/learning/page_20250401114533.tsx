'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faGear,
  faVolumeUp,
  faCheck,
  faTimes,
  faHeart,
  faLeaf, // Icon for Natural
  faWrench, // Icon for Man-made
} from '@fortawesome/free-solid-svg-icons';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'; // Import DND components

import styles from './learning.module.css';

// --- Define Content Types ---
interface LearningSlide {
  type: 'learn';
  title: string;
  description: string | string[]; // Allow string array for paragraphs
  imageUrl?: string; // For single main image
  exampleImages?: { src: string; alt: string }[]; // For multiple examples
  audioSrc?: string; // Not used in current content, but keep for potential use
}

interface DraggableItemData {
  id: string;
  text: string;
  type: 'natural' | 'man-made'; // Correct category
  imageUrl?: string; // Optional image for the item
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
  audioSrc?: string; // Not used in current content
}

// Extend with Quiz types if you need to mix quiz questions later
// interface QuizQuestion { ... }
// type LessonContent = LearningSlide | DragDropSlide | QuizQuestion;
type LessonContent = LearningSlide | DragDropSlide;


// --- Lesson Content: Introduction to Machines ---
const lessonContent: LessonContent[] = [
  {
    type: 'learn',
    title: 'Introduction to Machines',
    description: [
      'We see so many things around us every day.',
      'Some things are natural and some are man-made.',
      'Let\'s learn about them!',
    ],
    // imageUrl: '/images/intro-scene.png' // Example placeholder path
  },
  {
    type: 'learn',
    title: 'Natural Things',
    description: 'Natural things are those that exist in nature. They are not made by humans.',
    exampleImages: [
      { src: '/images/sun.png', alt: 'Sun' }, // Replace with actual paths
      { src: '/images/water.png', alt: 'Water' },
      { src: '/images/tree.png', alt: 'Tree' },
      { src: '/images/bird.png', alt: 'Bird' },
    ],
  },
  {
    type: 'learn',
    title: 'Man-made Things',
    description: 'The things that are made by human beings are called man-made things.',
    exampleImages: [
      { src: '/images/school-bus.png', alt: 'School Bus' }, // Replace with actual paths
      { src: '/images/cycle.png', alt: 'Cycle' },
      { src: '/images/chair.png', alt: 'Chair' },
      { src: '/images/blackboard.png', alt: 'Blackboard' },
    ],
  },
  {
    type: 'drag-drop',
    title: 'Activity: Natural or Man-made?',
    instruction: 'Drag each item into the correct box: Natural or Man-made.',
    items: [
      { id: 'item-1', text: 'Tree', type: 'natural' /*, imageUrl: '/images/tree-small.png'*/ },
      { id: 'item-2', text: 'Chair', type: 'man-made' /*, imageUrl: '/images/chair-small.png'*/ },
      { id: 'item-3', text: 'Bird', type: 'natural' /*, imageUrl: '/images/bird-small.png'*/ },
      { id: 'item-4', text: 'Cycle', type: 'man-made' /*, imageUrl: '/images/cycle-small.png'*/ },
      { id: 'item-5', text: 'Sun', type: 'natural' /*, imageUrl: '/images/sun-small.png'*/ },
      { id: 'item-6', text: 'Blackboard', type: 'man-made' /*, imageUrl: '/images/blackboard-small.png'*/ },
    ],
    targets: [
      { id: 'naturalTarget', title: 'Natural Things', type: 'natural' },
      { id: 'manMadeTarget', title: 'Man-made Things', type: 'man-made' },
    ],
  },
  {
    type: 'learn',
    title: 'What are Machines?',
    description: 'The man-made things that make our work easy and save our time are called machines.',
    // imageUrl: '/images/tools.png'
  },
  {
    type: 'learn',
    title: 'Examples of Machines',
    description: 'Machines help us in many ways:',
    exampleImages: [ // Using exampleImages to show machines and their use (via alt/title)
        { src: '/images/washing-machine.png', alt: 'Washing Machine - used to wash clothes' },
        { src: '/images/refrigerator.png', alt: 'Refrigerator - used to keep food cold' },
        { src: '/images/scissors.png', alt: 'Scissors - used to cut paper' },
        { src: '/images/sharpener.png', alt: 'Sharpener - used to sharpen pencils' },
        { src: '/images/fan.png', alt: 'Fan - used to move air' }, // Assuming a fan image exists
    ],
  },
];
// --- End Lesson Content ---


// Helper function to reorder list (for drag-within-list)
const reorder = (list: DraggableItemData[], startIndex: number, endIndex: number): DraggableItemData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move item between lists
const move = (
    source: DraggableItemData[],
    destination: DraggableItemData[],
    droppableSource: any, // Comes from DropResult
    droppableDestination: any // Comes from DropResult
): { [key: string]: DraggableItemData[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1); // Get the item being moved

  destClone.splice(droppableDestination.index, 0, removed); // Insert it into destination

  const result: { [key: string]: DraggableItemData[] } = {};
  result[droppableSource.droppableId] = sourceClone; // Updated source list
  result[droppableDestination.droppableId] = destClone; // Updated destination list

  return result;
};


export default function LearningPage() {
  // --- State ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3); // Use hearts if desired, e.g., for DND correctness
  const router = useRouter();

  // Drag-and-Drop State
  const [dndState, setDndState] = useState<{ [key: string]: DraggableItemData[] }>({
    sourceItems: [], // Items available to drag
    naturalTarget: [], // Items dropped in Natural box
    manMadeTarget: [], // Items dropped in Man-made box
  });
  const [dndChecked, setDndChecked] = useState<boolean>(false); // Has the DND been checked?
  const [dndFeedback, setDndFeedback] = useState<string | null>(null); // Feedback message
  const [itemCorrectness, setItemCorrectness] = useState<{ [itemId: string]: boolean }>({}); // Track individual item correctness after check


  const totalSlides = lessonContent.length;
  const currentContent = lessonContent[currentSlideIndex];

  // --- Effects ---

  // Initialize/Reset DND state when a drag-drop slide loads
  useEffect(() => {
    if (currentContent.type === 'drag-drop') {
      // Deep copy items to avoid modifying original lessonContent
      const initialItems = currentContent.items.map(item => ({...item}));
      setDndState({
        sourceItems: initialItems, // Start with all items in source
        naturalTarget: [],
        manMadeTarget: [],
      });
      setDndChecked(false); // Reset checked state
      setDndFeedback(null); // Reset feedback
      setItemCorrectness({}); // Reset item correctness map
    }
    // Optionally reset quiz-specific state here if you mix slide types
    // setSelectedAnswerIndex(null);
    // setShowFeedback(false);
    // setIsCorrect(null);
    // setHasAnswered(false);
  }, [currentSlideIndex, currentContent]); // Re-run if slide index or content definition changes

  // Update progress bar
  useEffect(() => {
    setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
  }, [currentSlideIndex, totalSlides]);

  // Preload images (optional)
  useEffect(() => {
    lessonContent.forEach(slide => {
      if (slide.type === 'learn') {
        if (slide.imageUrl) new Image().src = slide.imageUrl;
        slide.exampleImages?.forEach(img => { new Image().src = img.src; });
      } else if (slide.type === 'drag-drop') {
        slide.items.forEach(item => { if (item.imageUrl) new Image().src = item.imageUrl; });
      }
    });
  }, []);


  // --- Handlers ---
  const handleBackClick = () => {
      if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
      else setShowExitConfirm(true); // Confirm exit if on the first slide
  };
  const handleConfirmExit = () => router.push('/'); // Navigate to home/dashboard
  const handleCancelExit = () => setShowExitConfirm(false);
  const handlePrevious = () => {
      if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  // Drag and Drop Handler
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;

    // 1. Dropped outside any droppable area
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId as keyof typeof dndState;
    const destId = destination.droppableId as keyof typeof dndState;

    // 2. Dropped in the same place it started
    if (sourceId === destId && source.index === destination.index) {
        return;
    }

    // 3. If already checked, prevent further dragging
    if (dndChecked) {
        return;
    }

    // 4. Moving within the same list (only allow reordering within 'sourceItems')
    if (sourceId === destId) {
        if (sourceId === 'sourceItems') {
            const items = reorder(
                dndState[sourceId],
                source.index,
                destination.index
            );
            setDndState(prevState => ({ ...prevState, [sourceId]: items }));
        }
        // Do not allow reordering within target lists in this setup
    }
    // 5. Moving from one list to another
    else {
      const movedResult = move(
        dndState[sourceId], // Get items from the source list
        dndState[destId],   // Get items from the destination list
        source,             // Source droppableId and index
        destination         // Destination droppableId and index
      );
      // Update state with the new arrays for source and destination lists
      setDndState(prevState => ({
        ...prevState,
        [sourceId]: movedResult[sourceId],
        [destId]: movedResult[destId],
      }));
    }
  };

  // Check Drag and Drop Answers
  const checkDragDrop = () => {
    if (currentContent.type !== 'drag-drop') return;

    let correctCount = 0;
    let incorrectCount = 0;
    const totalPlacedInTargets = dndState.naturalTarget.length + dndState.manMadeTarget.length;
    const newCorrectnessMap: { [itemId: string]: boolean } = {};
    let allItemsPlaced = dndState.sourceItems.length === 0;

    // Check items in the 'Natural' target box
    dndState.naturalTarget.forEach(item => {
        const isCorrect = item.type === 'natural';
        newCorrectnessMap[item.id] = isCorrect;
        if(isCorrect) correctCount++; else incorrectCount++;
    });

    // Check items in the 'Man-made' target box
    dndState.manMadeTarget.forEach(item => {
        const isCorrect = item.type === 'man-made';
        newCorrectnessMap[item.id] = isCorrect;
        if(isCorrect) correctCount++; else incorrectCount++;
    });

    setItemCorrectness(newCorrectnessMap); // Update visual feedback state
    setDndChecked(true); // Mark as checked to lock dragging

    // Determine feedback message
    if (totalPlacedInTargets === 0) {
         setDndFeedback("Drag the items into the boxes first!");
    } else if (!allItemsPlaced) {
        // Some items still left in source
        setDndFeedback(`Keep going! Drag all the items. ${correctCount} placed correctly so far.`);
        // Don't penalize hearts yet if not all items are placed
    } else {
        // All items are placed
        if (incorrectCount === 0) {
            setDndFeedback("Great job! All items are in the correct boxes!");
             // Optional: Play success sound
        } else {
            setDndFeedback(`Nice try! ${correctCount} correct, ${incorrectCount} incorrect. Look closely!`);
            setHearts(prev => Math.max(0, prev - 1)); // Lose a heart if any are incorrect after placing all
             // Optional: Play incorrect sound
        }
    }
  };


  // Main Continue Button Logic
  const handleContinue = () => {
    // --- Handle Drag-and-Drop Slide ---
    if (currentContent.type === 'drag-drop') {
      if (!dndChecked) {
        checkDragDrop(); // First click checks the answers
        return; // Stay on the slide, button text will change to Continue
      }
      // If already checked (dndChecked is true), proceed to next slide
      // Allow progress even if wrong, unless hearts are 0? (adjust logic if needed)
      if (hearts <= 0 && !Object.values(itemCorrectness).every(Boolean) && dndState.sourceItems.length === 0) {
          console.log("Out of hearts and incorrect DND");
          // Optionally show a 'Game Over' or 'Try Again' message/modal
          return; // Prevent moving forward if out of hearts and incorrect
      }
    }

    // --- Handle All Other Slides / Advance after DND check ---
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1); // Move to next slide
    } else {
      console.log("Lesson Finished!");
      router.push('/'); // Go home or to results page
    }
  };


  // --- Rendering ---
  const renderHearts = () => {
      const heartsArray = [];
      const maxHearts = 3;
      for (let i = 0; i < maxHearts; i++) {
          heartsArray.push(<FontAwesomeIcon key={i} icon={faHeart} style={{ opacity: i < hearts ? 1 : 0.3 }}/>);
      }
      heartsArray.push(<span key="count" style={{ fontWeight: 'bold', marginLeft: '4px', color: 'var(--error-red)' }}>{hearts}</span>);
      return heartsArray;
  };

  // Determine Button State and Style
  let continueButtonText = "Continue";
  let continueButtonDisabled = false;
  // Default button style (can be overridden)
  let continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`; // Green default

  if (currentContent.type === 'drag-drop') {
    const totalPlaced = dndState.naturalTarget.length + dndState.manMadeTarget.length;
    if (!dndChecked) {
      continueButtonText = "Check Answers";
      // Disable Check if nothing has been dropped yet
      continueButtonDisabled = totalPlaced === 0;
      continueButtonClass = styles.continueButton; // Use primary blue for 'Check'
    } else { // DND has been checked
      continueButtonText = "Continue";
      const allPlaced = dndState.sourceItems.length === 0;
      const anyIncorrect = Object.values(itemCorrectness).some(correct => !correct);
      // Example logic: Disable if out of hearts AND incorrect AND all items placed
      continueButtonDisabled = hearts <= 0 && anyIncorrect && allPlaced;
      // Make button red if checked and incorrect (and all placed)
      if (allPlaced && anyIncorrect) {
        continueButtonClass = `${styles.continueButton} ${styles.continueButtonIncorrect}`;
      } else if (allPlaced && !anyIncorrect) {
          // Keep it green if all correct
          continueButtonClass = `${styles.continueButton} ${styles.continueButtonCorrect}`;
      } else {
           // If not all placed yet, keep it primary blue maybe? Or green?
           continueButtonClass = styles.continueButton; // Back to blue/primary if still checking/placing
      }
    }
  }

  // Adjust text for the final slide
  if (currentSlideIndex === totalSlides - 1 && (currentContent.type !== 'drag-drop' || dndChecked)) {
      continueButtonText = "Finish Lesson";
   }

  // --- JSX Output ---
  return (
    <div className={styles.learningContainer}>
      <div className={styles.learningContent}>
        {/* ----- Header ----- */}
        <header className={styles.learningHeader}>
            <div className={styles.headerNavigation}>
                <button className={styles.backButton} onClick={handleBackClick} title="Exit Lesson">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: `${progress}%`}}></div>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.heartsContainer}>{renderHearts()}</div>
                    <button className={styles.settingsButton} title="Settings (Not Implemented)"><FontAwesomeIcon icon={faGear} /></button>
                </div>
            </div>
        </header>

        {/* ----- Main Content ----- */}
        <main className={styles.learningMain}>
          <h1 className={styles.lessonTitle}>{currentContent.title}</h1>

          <div className={styles.learningArea}>
            {/* --- Learning Slide Content Rendering --- */}
            {currentContent.type === 'learn' && (
              <>
                {Array.isArray(currentContent.description) ? (
                   currentContent.description.map((para, index) => (
                       <p key={index} className={styles.learningDescription}>{para}</p>
                   ))
                ) : (
                    <p className={styles.learningDescription}>{currentContent.description}</p>
                )}

                {currentContent.imageUrl && (
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={currentContent.imageUrl} alt={currentContent.title} style={{ maxWidth: '80%', maxHeight: '300px', borderRadius: '12px', border: '1px solid var(--border-light)' }}/>
                  </div>
                )}
                {currentContent.exampleImages && (
                  <div className={styles.exampleImageContainer}>
                    {currentContent.exampleImages.map((img, index) => (
                      <img key={index} src={img.src} alt={img.alt} className={styles.exampleImage} title={img.alt} />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* --- Drag and Drop Slide Content Rendering --- */}
            {currentContent.type === 'drag-drop' && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.dragDropArea}>
                  <p className={styles.dragDropInstruction}>{currentContent.instruction}</p>

                  {/* Source List (Items Available to Drag) */}
                  <Droppable droppableId="sourceItems" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.draggableSourceList}
                        style={{borderColor: snapshot.isDraggingOver ? 'var(--primary-blue)' : 'var(--border-light)'}} // Highlight border when dragging over source
                      >
                        {dndState.sourceItems?.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={dndChecked} /* Disable after check */>
                            {(providedDraggable, snapshotDraggable) => (
                              <div
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                className={`${styles.draggableItem} ${snapshotDraggable.isDragging ? styles.draggableItemDragging : ''}`}
                                style={{
                                    ...providedDraggable.draggableProps.style, // Important for positioning
                                    cursor: dndChecked ? 'default' : 'grab', // Change cursor after check
                                 }}
                              >
                                {item.text}
                                {/* Optional: Add small image */}
                                {item.imageUrl && <img src={item.imageUrl} alt="" style={{height: '20px', marginLeft: '8px', pointerEvents: 'none'}}/>}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder} {/* Placeholder for empty space during drag */}
                      </div>
                    )}
                  </Droppable>

                  {/* Target Lists (Drop Boxes) */}
                  <div className={styles.dropTargetsContainer}>
                    {currentContent.targets.map(target => (
                      <Droppable key={target.id} droppableId={target.id} isDropDisabled={dndChecked} /* Disable after check */>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`${styles.dropTargetColumn} ${snapshot.isDraggingOver ? styles.dropTargetColumnDraggingOver : ''}`}
                          >
                            <h3 className={`${styles.dropTargetTitle} ${target.type === 'natural' ? styles.dropTargetTitleNatural : styles.dropTargetTitleManMade}`}>
                               <FontAwesomeIcon icon={target.type === 'natural' ? faLeaf : faWrench} style={{ marginRight: '8px'}}/>
                               {target.title}
                            </h3>
                            <div className={styles.dropTargetList}>
                                {dndState[target.id]?.map((item, index) => (
                                  // Render dropped items. Not making them draggable out again.
                                  <div
                                    key={item.id}
                                    className={`${styles.draggableItem} ${dndChecked ? (itemCorrectness[item.id] ? styles.itemCorrect : styles.itemIncorrect) : ''}`}
                                    style={{ cursor: 'default' }} // Not draggable once dropped
                                   >
                                      {item.text}
                                      {item.imageUrl && <img src={item.imageUrl} alt="" style={{height: '20px', marginLeft: '8px', pointerEvents: 'none'}}/>}
                                  </div>
                                ))}
                                {provided.placeholder} {/* Placeholder for space during drag */}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>

                   {/* Feedback Message Area */}
                   {dndFeedback && (
                      <div className={`${styles.dragDropFeedback} ${dndChecked && !Object.values(itemCorrectness).some(c => !c) && dndState.sourceItems?.length === 0 ? styles.dragDropFeedbackCorrect : styles.dragDropFeedbackIncorrect}`}>
                          {dndFeedback}
                      </div>
                   )}

                </div>
              </DragDropContext>
            )}

          </div> {/* End learningArea */}
        </main>

        {/* ----- Footer ----- */}
        <footer className={styles.learningFooter}>
            <button
                className={styles.previousButton}
                onClick={handlePrevious}
                disabled={currentSlideIndex === 0}
            >
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button
                className={continueButtonClass} // Dynamic class based on state
                onClick={handleContinue}
                disabled={continueButtonDisabled} // Dynamic disabled state
            >
                {continueButtonText} <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </footer>

      </div> {/* End learningContent */}

       {/* --- Exit Modal --- */}
       {showExitConfirm && (
           <div className={styles.modalOverlay} onClick={handleCancelExit} /* Close on overlay click */>
               <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */>
                   <h2>Exit Lesson?</h2>
                   <p>Your progress might not be saved.</p>
                   <div className={styles.modalButtons}>
                       <button className={styles.modalCancel} onClick={handleCancelExit}>Cancel</button>
                       <button className={styles.modalConfirm} onClick={handleConfirmExit}>Exit Anyway</button>
                   </div>
               </div>
           </div>
       )}
    </div> // End learningContainer
  );
}
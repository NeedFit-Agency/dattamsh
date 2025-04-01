'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link'; // Keep if you have links
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faGear,
  faVolumeUp, // Use volume icon for sound
  faCheck,    // Correct icon
  faTimes,    // Incorrect icon
  faHeart,
  // Add other icons if used from the original example
} from '@fortawesome/free-solid-svg-icons';
import styles from './learning.module.css';

// Define types for content
interface LearningSlide {
  type: 'learn';
  title: string; // e.g., "Learn Hiragana: A"
  character: string; // e.g., 'あ'
  sound: string;     // e.g., 'a'
  pronunciationHelp: string; // e.g., 'makes the "a" sound as in "father".'
  audioSrc?: string; // Optional path to audio file
}

interface QuizQuestion {
  type: 'quiz';
  title: string; // e.g., "What sound does this character make?"
  character: string;
  options: string[]; // e.g., ['a', 'i', 'u', 'e']
  correctAnswer: string; // e.g., 'a'
  correctIndex: number; // Index of the correct answer in options
  audioSrc?: string; // Optional path to audio file for the character sound
}

type LessonContent = LearningSlide | QuizQuestion;

// --- Sample Content (Replace with your actual lesson data) ---
const lessonContent: LessonContent[] = [
  {
    type: 'learn',
    title: "Learn Hiragana: A",
    character: 'あ',
    sound: 'a',
    pronunciationHelp: 'makes the "a" sound as in "father".',
    // audioSrc: '/audio/a.mp3' // Example path
  },
  {
    type: 'quiz',
    title: "What sound does this character make?",
    character: 'あ',
    options: ['a', 'i', 'u', 'e'],
    correctAnswer: 'a',
    correctIndex: 0,
     // audioSrc: '/audio/a.mp3'
  },
    {
    type: 'learn',
    title: "Learn Hiragana: I",
    character: 'い',
    sound: 'i',
    pronunciationHelp: 'makes the "ee" sound as in "eel".',
    // audioSrc: '/audio/i.mp3'
  },
  {
    type: 'quiz',
    title: "What sound does this character make?",
    character: 'い',
    options: ['o', 'ka', 'i', 'e'],
    correctAnswer: 'i',
    correctIndex: 2,
     // audioSrc: '/audio/i.mp3'
  },
   {
    type: 'quiz',
    title: "Identify the character for 'u'",
    character: 'う', // The sound 'u' is the question implicitly
    options: ['あ', 'い', 'う', 'え'], // User picks the character
    correctAnswer: 'う',
    correctIndex: 2,
     // audioSrc: '/audio/u.mp3' // Sound for the correct answer 'u'
  },
    {
    type: 'learn',
    title: "Learn Hiragana: E",
    character: 'え',
    sound: 'e',
    pronunciationHelp: 'makes the "eh" sound as in "egg".',
    // audioSrc: '/audio/e.mp3'
  },
   {
    type: 'quiz',
    title: "What sound does 'え' make?",
    character: 'え', // Character displayed
    options: ['a', 'i', 'u', 'e'], // Options are sounds
    correctAnswer: 'e',
    correctIndex: 3,
     // audioSrc: '/audio/e.mp3'
  },
];
// --- End Sample Content ---


export default function LearningPage() {
  // State management
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0); // Start at 0
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hearts, setHearts] = useState(3); // Start with 3 hearts like image
  const router = useRouter();

  // Quiz Specific State
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false); // Track if answer submitted for current quiz

  const totalSlides = lessonContent.length;
  const currentContent = lessonContent[currentSlideIndex];

  // Update progress when slide changes
  useEffect(() => {
    setProgress(((currentSlideIndex + 1) / totalSlides) * 100);
    // Reset quiz state when moving to a new slide
    setSelectedAnswerIndex(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setHasAnswered(false);
  }, [currentSlideIndex, totalSlides]);

   // Preload audio files (optional but good for performance)
   useEffect(() => {
     lessonContent.forEach(item => {
       if (item.audioSrc) {
         const audio = new Audio(item.audioSrc);
         audio.preload = 'auto';
       }
     });
   }, []);


  // --- Navigation Handlers ---
  const handleBackClick = () => {
    if (currentSlideIndex > 0) {
      // Option 1: Just go back
      setCurrentSlideIndex(currentSlideIndex - 1);
      // Option 2: Show confirmation
      // setShowExitConfirm(true);
    } else {
      setShowExitConfirm(true); // Confirm exit from first slide
      // router.push('/'); // Or directly go home
    }
  };

  const handleConfirmExit = () => router.push('/'); // Navigate to home/dashboard
  const handleCancelExit = () => setShowExitConfirm(false);

  // --- Main 'Continue' / 'Check' Logic ---
  const handleContinue = () => {
    // If showing feedback, move to the next slide
    if (showFeedback) {
      if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      } else {
        // End of lesson/quiz - navigate to results or next lesson
        console.log("Lesson Finished!");
        // router.push('/results'); // Example results page
        router.push('/'); // Or back home
      }
      return; // Stop execution here after advancing slide
    }

    // If it's a learning slide, just move to the next
    if (currentContent.type === 'learn') {
      if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      } else {
        console.log("Lesson Finished!");
        // router.push('/results');
         router.push('/');
      }
      return; // Stop execution
    }

    // If it's a quiz slide and an answer is selected, check the answer
    if (currentContent.type === 'quiz' && selectedAnswerIndex !== null && !hasAnswered) {
      setHasAnswered(true); // Mark as answered
      const correct = selectedAnswerIndex === currentContent.correctIndex;
      setIsCorrect(correct);
      setShowFeedback(true); // Show the feedback footer

      if (!correct) {
        setHearts(prev => Math.max(0, prev - 1)); // Decrease hearts, minimum 0
        // Optional: Play incorrect sound effect
        // playSoundEffect('incorrect');
        if (hearts - 1 <= 0) {
           console.log("Out of hearts!");
           // Optional: Show game over modal or navigate away
           // setShowGameOverModal(true);
        }
      } else {
         // Optional: Play correct sound effect
        // playSoundEffect('correct');
      }
    }
    // If quiz slide but no answer selected, do nothing (button is disabled)
  };

  const handlePrevious = () => { // Simple previous slide navigation
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // --- Quiz Interaction ---
  const handleSelectAnswer = (index: number) => {
    if (currentContent.type === 'quiz' && !hasAnswered) {
      setSelectedAnswerIndex(index);
      // Optional: play selection sound
    }
  };

  // --- Audio Playback ---
  const playSound = () => {
     let srcToPlay: string | undefined;
     let textToSpeak: string | undefined;

     if (currentContent.audioSrc) {
       srcToPlay = currentContent.audioSrc;
     } else if (currentContent.type === 'learn' || currentContent.type === 'quiz') {
       textToSpeak = currentContent.character; // Speak the character itself as fallback
     }

     if (srcToPlay) {
         try {
             const audio = new Audio(srcToPlay);
             audio.play().catch(e => console.error("Error playing audio:", e));
         } catch (e) {
              console.error("Could not create Audio object:", e);
               // Fallback to speech synthesis if audio fails?
              if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
                speakText(textToSpeak);
              }
         }

     } else if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
        speakText(textToSpeak);
     }
   };

   const speakText = (text: string) => {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'ja-JP'; // Set language for better pronunciation
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(speech);
   };

  // --- Rendering Helpers ---
  const renderHearts = () => {
    const heartsArray = [];
    const maxHearts = 3; // Or 5, depending on your design
    for (let i = 0; i < maxHearts; i++) {
      heartsArray.push(
        <FontAwesomeIcon
          key={i}
          icon={faHeart}
          style={{ opacity: i < hearts ? 1 : 0.3 }} // Dim inactive hearts
        />
      );
    }
    // Optionally add the number next to hearts
    heartsArray.push(<span key="count" style={{ fontWeight: 'bold', marginLeft: '4px', color: 'var(--error-red)' }}>{hearts}</span>);
    return heartsArray;
  };

  // Determine button text and state
  let continueButtonText = "Continue";
  let continueButtonDisabled = false;
  let continueButtonClass = styles.continueButton; // Default blue button

  if (currentContent.type === 'quiz') {
    if (!hasAnswered) {
      continueButtonText = "Check";
      continueButtonDisabled = selectedAnswerIndex === null; // Disable if no answer selected
    } else if (showFeedback) {
      continueButtonText = "Continue";
       // Disable continue if out of hearts? Or let them proceed to results?
      continueButtonDisabled = hearts <= 0 && !isCorrect; // Example: disable if wrong and out of hearts
      // Apply correct/incorrect styling
      continueButtonClass = isCorrect ? `${styles.continueButton} ${styles.continueButtonCorrect}` : `${styles.continueButton} ${styles.continueButtonIncorrect}`;
    }
  } else { // Learning slide
     continueButtonText = "Continue";
     continueButtonDisabled = false;
  }
   if (currentSlideIndex === totalSlides - 1 && showFeedback) {
      continueButtonText = "Finish Lesson"; // Or "Go to Results"
   }


  return (
    <div className={styles.learningContainer}>
      {/* Optional Side Panels */}
      {/* <div className={`${styles.sidePanel} ${styles.leftPanel}`}> ... </div> */}

      <div className={styles.learningContent}>
        {/* ----- Header ----- */}
        <header className={styles.learningHeader}>
          <div className={styles.headerNavigation}>
            <button className={styles.backButton} onClick={handleBackClick} title="Exit Lesson">
              <FontAwesomeIcon icon={faArrowLeft} />
              {/* <span className={styles.backText}>Exit</span> */}
            </button>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{width: `${progress}%`}}></div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.heartsContainer}>
                {renderHearts()}
              </div>
              <button className={styles.settingsButton} title="Settings (Not Implemented)">
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>
        </header>

        {/* ----- Main Content ----- */}
        <main className={styles.learningMain}>
          {/* Display Title */}
          <h1 className={styles.lessonTitle}>{currentContent.title}</h1>

          <div className={styles.learningArea}>
            {/* Character Display Area */}
            <div className={styles.characterDisplay}>
              <div className={styles.mainCharacter}>
                {currentContent.type === 'quiz' && currentContent.title.includes("Identify the character")
                  ? '?' // Show '?' if the task is to identify the character by sound
                  : currentContent.character}
              </div>
               <button className={styles.soundButton} onClick={playSound} title="Play sound">
                  <FontAwesomeIcon icon={faVolumeUp} />
               </button>
            </div>

            {/* Conditional Rendering: Learning vs Quiz */}
            {currentContent.type === 'learn' && (
              <div className={styles.explanationBox} style={{ textAlign: 'center', padding: '20px', background: 'var(--background-medium)', borderRadius: '12px' }}>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-dark)' }}>
                  This character is '<strong>{currentContent.character}</strong>' pronounced '<strong>{currentContent.sound}</strong>'.
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-medium)', marginTop: '10px' }}>
                   It {currentContent.pronunciationHelp}
                </p>
              </div>
            )}

            {currentContent.type === 'quiz' && (
              <div className={styles.quizOptionsGrid}>
                {currentContent.options.map((option, index) => {
                  let optionClass = styles.quizOption;
                  if (hasAnswered) {
                    if (index === currentContent.correctIndex) {
                      optionClass += ` ${styles.quizOptionCorrect}`; // Always highlight correct one green
                    } else if (index === selectedAnswerIndex) {
                       optionClass += ` ${styles.quizOptionIncorrect}`; // Highlight selected wrong one red
                    } else {
                       optionClass += ` ${styles.quizOptionDimmed}`; // Dim others
                    }
                  } else if (index === selectedAnswerIndex) {
                    optionClass += ` ${styles.quizOptionSelected}`; // Highlight selected before check
                  }

                  return (
                    <button
                      key={index}
                      className={optionClass}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={hasAnswered} // Disable after answering
                    >
                      {option}
                      {/* Add check/cross icon after check */}
                      {hasAnswered && index === currentContent.correctIndex && <FontAwesomeIcon icon={faCheck} className={styles.quizOptionIcon} />}
                      {hasAnswered && index === selectedAnswerIndex && index !== currentContent.correctIndex && <FontAwesomeIcon icon={faTimes} className={styles.quizOptionIcon} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div> {/* End learningArea */}
        </main>

        {/* ----- Footer ----- */}
        {/* Show feedback footer if feedback is active */}
        {showFeedback && currentContent.type === 'quiz' ? (
          <footer className={`${styles.feedbackFooter} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}>
            <div className={styles.feedbackContent}>
              {/* Icon is optional based on screen size via CSS */}
              <div className={styles.feedbackIcon}>
                 <FontAwesomeIcon icon={isCorrect ? faCheck : faTimes} className={isCorrect ? styles.feedbackIconCorrect : styles.feedbackIconIncorrect} />
              </div>
              <div className={styles.feedbackTextContainer}>
                 <h3 className={`${styles.feedbackTitle} ${isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect}`}>
                   {isCorrect ? 'Correct!' : 'Not quite.'}
                 </h3>
                 {/* Show correct answer only if incorrect */}
                 {!isCorrect && (
                    <p className={styles.feedbackMessage}>
                       The correct answer is: <strong>{currentContent.correctAnswer}</strong>
                       {/* You could add pronunciationHelp here if relevant */}
                       {/* {` (${currentContent.pronunciationHelp})`} */}
                    </p>
                 )}
              </div>
            </div>
            <div className={styles.feedbackButtonContainer}>
               <button
                 className={continueButtonClass}
                 onClick={handleContinue}
                 disabled={continueButtonDisabled}
               >
                 {continueButtonText}
                 <FontAwesomeIcon icon={faArrowRight} />
               </button>
            </div>
          </footer>
        ) : (
          // Show standard footer otherwise
          <footer className={styles.learningFooter}>
            <button
              className={styles.previousButton}
              onClick={handlePrevious}
              disabled={currentSlideIndex === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Previous
            </button>
            <button
               className={continueButtonClass} // Use dynamic class
               onClick={handleContinue}
               disabled={continueButtonDisabled} // Use dynamic disabled state
            >
              {continueButtonText} {/* Use dynamic text */}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </footer>
        )}
      </div> {/* End learningContent */}

      {/* Optional Side Panels */}
      {/* <div className={`${styles.sidePanel} ${styles.rightPanel}`}> ... </div> */}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className={styles.modalOverlay} onClick={handleCancelExit} /* Close on overlay click */>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */>
            <h2>Exit Lesson?</h2>
            <p>Your progress in this lesson might not be saved.</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancel} onClick={handleCancelExit}>
                Cancel
              </button>
              <button className={styles.modalConfirm} onClick={handleConfirmExit}>
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div> // End learningContainer
  );
}
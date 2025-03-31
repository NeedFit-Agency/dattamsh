'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Import layout components
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';

// Import quiz-specific components
import AnswerOption from '@/app/components/quiz/AnswerOption/AnswerOption';
import CharacterCard from '@/app/components/quiz/CharacterCard/CharacterCard';
import FeedbackFooter from '@/app/components/quiz/FeedbackFooter/FeedbackFooter';

// Define styles (you can create a separate CSS module file later)
const styles = {
  appContainer: 'flex min-h-screen bg-[#f7f7f7]',
  mainAreaWrapper: 'flex-1 flex flex-col',
  topBar: 'bg-white p-4 shadow-sm',
  scrollableContent: 'flex-1 flex overflow-auto',
  contentArea: 'flex-1 p-6 max-w-3xl mx-auto',
  quizHeader: 'flex items-center mb-8',
  backButton: 'mr-4 text-[#1cb0f6] text-xl',
  quizTitle: 'text-2xl font-bold',
  questionContainer: 'mb-8',
  questionText: 'text-xl mb-4',
  characterDisplay: 'flex justify-center mb-8',
  optionsGrid: 'grid grid-cols-1 gap-4',
  buttonContainer: 'mt-8'
};

export default function QuizPage() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson') || '1';
  
  // State for the current quiz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Mock quiz data (in a real app, this would come from an API or database)
  const quizQuestion = {
    character: 'ض',
    question: 'Which sound does this letter make?',
    options: [
      { id: 1, text: 'D (as in "dog")' },
      { id: 2, text: 'Dh (as in "that")' },
      { id: 3, text: 'S (as in "sun")' },
      { id: 4, text: 'Dh (emphatic D)' }
    ],
    correctAnswer: 4
  };
  
  // Handle answer selection
  const handleSelectAnswer = (id: number) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(id);
    }
  };
  
  // Handle checking the answer
  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswerChecked(true);
      setIsCorrect(selectedAnswer === quizQuestion.correctAnswer);
    }
  };
  
  // Handle continuing to next question or completing the lesson
  const handleContinue = () => {
    // In a real app, you would navigate to the next question or complete page
    // For now, we'll just reset the current question
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>
        
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            <div className={styles.quizHeader}>
              <Link href="/learn" className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h1 className={styles.quizTitle}>Lesson {lessonId}</h1>
            </div>
            
            <div className={styles.questionContainer}>
              <h2 className={styles.questionText}>{quizQuestion.question}</h2>
              
              <div className={styles.characterDisplay}>
                <CharacterCard 
                  character={quizQuestion.character} 
                  onSpeakerClick={() => console.log('Play sound')} 
                />
              </div>
              
              <div className={styles.optionsGrid}>
                {quizQuestion.options.map((option) => (
                  <AnswerOption
                    key={option.id}
                    number={option.id}
                    text={option.text}
                    isSelected={selectedAnswer === option.id}
                    isCorrect={isAnswerChecked && option.id === quizQuestion.correctAnswer}
                    isIncorrect={isAnswerChecked && selectedAnswer === option.id && option.id !== quizQuestion.correctAnswer}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={isAnswerChecked}
                  />
                ))}
              </div>
            </div>
            
            <div className={styles.buttonContainer}>
              {!isAnswerChecked ? (
                <button 
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className={`w-full py-3 rounded-xl font-bold ${selectedAnswer === null ? 'bg-gray-300 text-gray-500' : 'bg-[#58cc02] text-white hover:bg-[#46a302]'}`}
                >
                  CHECK
                </button>
              ) : (
                <FeedbackFooter 
                  isCorrect={isCorrect}
                  onContinue={handleContinue}
                  message={isCorrect ? "Great job!" : "Not quite right."}
                />
              )}
            </div>
          </main>
          
          <RightRail />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import styles from './Quiz.module.css';
import AnswerOption from '../AnswerOption/AnswerOption';
import CharacterCard from '../CharacterCard/CharacterCard';
import FeedbackFooter from '../FeedbackFooter/FeedbackFooter';
import LegendaryTrophy from '../LegendaryTrophy/LegendaryTrophy';

interface QuizProps {
  lessonId?: string;
  onComplete?: () => void;
}

interface Question {
  id: number;
  character?: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
}

// Sample questions - in a real app, these would come from an API
const sampleQuestions: Question[] = [
  {
    id: 1,
    character: 'あ',
    prompt: 'What sound does this character make?',
    options: ['a', 'i', 'u', 'e'],
    correctAnswer: 0,
  },
  {
    id: 2,
    character: 'い',
    prompt: 'What sound does this character make?',
    options: ['ka', 'i', 'ta', 'sa'],
    correctAnswer: 1,
  },
  {
    id: 3,
    prompt: 'Which character makes the "u" sound?',
    options: ['あ', 'い', 'う', 'え'],
    correctAnswer: 2,
  },
];

export function Quiz({ lessonId, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isGraded, setIsGraded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions based on lessonId
  useEffect(() => {
    // In a real app, fetch questions from API based on lessonId
    // For now, use sample questions
    setQuestions(sampleQuestions);
  }, [lessonId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isGraded) return;
    setSelectedAnswerIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === null) return;
    
    const isAnswerCorrect = selectedAnswerIndex === currentQuestion?.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setIsGraded(true);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setIsGraded(false);
    } else {
      // Quiz completed
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleSpeaker = () => {
    // In a real app, this would play audio for the character
    console.log("Playing audio for character:", currentQuestion?.character);
  };

  if (!currentQuestion && !completed) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Show completion screen
  if (completed) {
    return (
      <div className={styles.completionContainer}>
        <h2>Congratulations!</h2>
        <LegendaryTrophy />
        <p>You've completed this lesson.</p>
        <button 
          className={styles.continueButton} 
          onClick={() => window.location.href = '/learn'}
        >
          CONTINUE
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.questionArea}>
        {currentQuestion.character && (
          <CharacterCard 
            character={currentQuestion.character}
            onSpeakerClick={handleSpeaker}
          />
        )}
        <h2 className={styles.prompt}>{currentQuestion.prompt}</h2>
      </div>
      
      <div className={styles.answersArea}>
        {currentQuestion.options.map((option, index) => (
          <AnswerOption
            key={index}
            number={index + 1}
            text={option}
            isSelected={selectedAnswerIndex === index}
            isCorrect={isGraded && index === currentQuestion.correctAnswer}
            isIncorrect={isGraded && selectedAnswerIndex === index && index !== currentQuestion.correctAnswer}
            onClick={() => handleAnswerSelect(index)}
            disabled={isGraded}
          />
        ))}
      </div>
      
      {!isGraded ? (
        <div className={styles.checkAnswerContainer}>
          <button
            className={styles.checkButton}
            onClick={handleCheckAnswer}
            disabled={selectedAnswerIndex === null}
          >
            CHECK
          </button>
        </div>
      ) : (
        <FeedbackFooter 
          isCorrect={isCorrect}
          message={isCorrect ? "That's correct!" : "Not quite. The correct answer is " + 
            currentQuestion.options[currentQuestion.correctAnswer]}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
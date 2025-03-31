'use client'; // Needs onClick

import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
  number: number | string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean; // Optional: for showing feedback after selection
  isIncorrect?: boolean; // Optional: for showing feedback after selection
  onClick: () => void;
  disabled?: boolean; // Disable after grading
  className?: string;
}

export default function AnswerOption({
  number,
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onClick,
  disabled = false,
  className
}: AnswerOptionProps) {

  const stateClass = isCorrect ? styles.correct : isIncorrect ? styles.incorrect : isSelected ? styles.selected : '';

  return (
    <button
      className={`${styles.option} ${stateClass} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || isCorrect || isIncorrect} // Disable button based on props
    >
      <span className={styles.optionNumber}>{number}</span>
      <span className={styles.optionText}>{text}</span>
    </button>
  );
}
'use client'; // Needs onClick

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
  number: number;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  number,
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onClick,
  disabled
}) => {
  const optionClasses = [
    styles.answerOption,
    isSelected ? styles.selected : '',
    isCorrect ? styles.correct : '',
    isIncorrect ? styles.incorrect : '',
    disabled && !isSelected ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={optionClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.optionNumber}>{number}</span>
      <span className={styles.optionText}>{text}</span>
      {isCorrect && (
        <span className={styles.feedbackIcon}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
      )}
      {isIncorrect && (
        <span className={styles.feedbackIcon}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      )}
    </button>
  );
};

export default AnswerOption;
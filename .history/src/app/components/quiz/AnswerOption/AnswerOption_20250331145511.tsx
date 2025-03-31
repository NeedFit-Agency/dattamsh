'use client'; // Needs onClick

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
  number: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function AnswerOption({
  number,
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onClick,
  disabled
}: AnswerOptionProps) {
  // Determine the appropriate class
  let optionClass = styles.option;
  if (isSelected) optionClass += ` ${styles.selected}`;
  if (isCorrect) optionClass += ` ${styles.correct}`;
  if (isIncorrect) optionClass += ` ${styles.incorrect}`;
  
  return (
    <motion.button 
      className={optionClass}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      <div className={styles.optionNumber}>{number}</div>
      <div className={styles.optionText}>{text}</div>
    </motion.button>
  );
}
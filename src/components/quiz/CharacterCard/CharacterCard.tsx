'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: string;
  onSpeakerClick: () => void;
}

export default function CharacterCard({ character, onSpeakerClick }: CharacterCardProps) {
  return (
    <motion.div 
      className={styles.characterCard}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.character}>{character}</div>
      <button 
        className={styles.speakerButton}
        onClick={onSpeakerClick}
        aria-label="Hear pronunciation"
        id="speaker-icon"
      >
        <FontAwesomeIcon icon={faVolumeUp} />
      </button>
    </motion.div>
  );
}
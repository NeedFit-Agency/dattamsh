import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: string;
  onSpeakerClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSpeakerClick }) => {
  return (
    <div className={styles.characterCard}>
      <div className={styles.character}>{character}</div>
      {onSpeakerClick && (
        <button 
          className={styles.speakerButton}
          onClick={onSpeakerClick}
          aria-label="Listen to pronunciation"
        >
          <FontAwesomeIcon icon={faVolumeHigh} />
        </button>
      )}
    </div>
  );
};

export default CharacterCard;
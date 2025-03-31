import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: string; // The character or symbol to display
  onSpeakerClick?: () => void; // Optional speaker action
  className?: string;
}

export default function CharacterCard({ character, onSpeakerClick, className }: CharacterCardProps) {
  return (
    <div className={`${styles.characterCard} ${className || ''}`}>
      {onSpeakerClick && (
        <button
          className={styles.speakerButton}
          onClick={onSpeakerClick}
          aria-label="Play sound"
        >
          <FontAwesomeIcon icon={faVolumeHigh} />
        </button>
      )}
      <span className={styles.characterDisplay}>{character}</span>
    </div>
  );
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faFireFlameCurved, faGem, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './StatsBar.module.css';

interface StatsBarProps {
  streak: number;
  gems: number;
  hearts: number;
  streakFreezeActive?: boolean; // Optional prop
}

export default function StatsBar({ streak, gems, hearts, streakFreezeActive = true }: StatsBarProps) {
  return (
    <div className={styles.statsBar}>
      {streakFreezeActive && (
        <div className={`${styles.statItem} ${styles.streakFreeze}`}>
          <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
        </div>
      )}
      <div className={`${styles.statItem} ${styles.streakCount}`}>
        <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} /> {streak}
      </div>
      <div className={`${styles.statItem} ${styles.gems}`}>
        <FontAwesomeIcon icon={faGem} className={styles.icon} /> {gems}
      </div>
      <div className={`${styles.statItem} ${styles.hearts}`}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} /> {hearts}
      </div>
    </div>
  );
}
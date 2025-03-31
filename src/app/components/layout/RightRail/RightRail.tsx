import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './RightRail.module.css';

// Simple Card component (can be moved to ui/Card)
const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return <div className={`${styles.card} ${className || ''}`}>{children}</div>;
}

export default function RightRail() {
  return (
    <aside className={styles.rightRail}>
      {/* Super Card */}
      <Card className={styles.superCard}>
        <div className={styles.superBadge}>SUPER</div>
        <div className={styles.superImagePlaceholder}></div>
        <h3>Try Super for free</h3>
        <p>No ads, personalized practice, and unlimited Legendary!</p>
        <button className={styles.ctaButton}>TRY 2 WEEKS FREE</button>
      </Card>

      {/* Leaderboards Card */}
      <Card className={styles.leaderboardCard}>
        <h4>Unlock Leaderboards!</h4>
        <div className={styles.leaderboardContent}>
          <div className={styles.leaderboardIcon}>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <p>Complete 3 more lessons to start competing</p>
        </div>
      </Card>

      {/* Daily Quests Card */}
      <Card className={styles.questsCard}>
        <div className={styles.questsHeader}>
          <h4>Daily Quests</h4>
          <Link href="#">VIEW ALL</Link> {/* Placeholder link */}
        </div>
        <div className={styles.questItem}>
          <FontAwesomeIcon icon={faStar} className={styles.questIcon} />
          <p>Earn 10 XP</p>
          {/* Progress bar could be added here */}
        </div>
         {/* Add more quests as needed */}
      </Card>
    </aside>
  );
}
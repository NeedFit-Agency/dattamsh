'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Import layout components
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import Confetti from '@/app/components/shared/Confetti/Confetti';

// Define styles (you can create a separate CSS module file later)
const styles = {
  appContainer: 'flex min-h-screen bg-[#f7f7f7]',
  mainAreaWrapper: 'flex-1 flex flex-col',
  topBar: 'bg-white p-4 shadow-sm',
  scrollableContent: 'flex-1 flex overflow-auto',
  contentArea: 'flex-1 p-6 max-w-3xl mx-auto',
  streakHeader: 'flex items-center mb-8',
  backButton: 'mr-4 text-[#1cb0f6] text-xl',
  streakTitle: 'text-2xl font-bold',
  streakContainer: 'flex flex-col items-center justify-center text-center',
  fireContainer: 'mb-8 bg-[#ff9600] w-24 h-24 rounded-full flex items-center justify-center',
  fireIcon: 'text-white text-4xl',
  congratsText: 'text-3xl font-bold mb-4',
  streakValue: 'text-6xl font-bold text-[#ff9600] mb-2',
  streakLabel: 'text-xl mb-8',
  buttonContainer: 'w-full max-w-md',
  continueButton: 'w-full py-3 rounded-xl font-bold bg-[#58cc02] text-white hover:bg-[#46a302]'
};

export default function StreakPage() {
  // Mock streak data
  const streakData = {
    currentStreak: 7,
    isNewRecord: true
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={streakData.currentStreak} gems={234} hearts={2} />
        </div>
        
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* Show confetti for celebration */}
            <Confetti />
            
            <div className={styles.streakHeader}>
              <Link href="/learn" className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h1 className={styles.streakTitle}>Streak Milestone</h1>
            </div>
            
            <div className={styles.streakContainer}>
              <div className={styles.fireContainer}>
                <FontAwesomeIcon icon={faFire} className={styles.fireIcon} />
              </div>
              
              <h2 className={styles.congratsText}>
                {streakData.isNewRecord ? 'New Streak Record!' : 'Streak Milestone!'}
              </h2>
              
              <div className={styles.streakValue}>{streakData.currentStreak}</div>
              <div className={styles.streakLabel}>day streak</div>
              
              <div className={styles.buttonContainer}>
                <Link href="/learn" className={styles.continueButton}>
                  CONTINUE
                </Link>
              </div>
            </div>
          </main>
          
          <RightRail />
        </div>
      </div>
    </div>
  );
}
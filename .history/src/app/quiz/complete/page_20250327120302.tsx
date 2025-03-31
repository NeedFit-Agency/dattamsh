'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  completeHeader: 'flex items-center mb-8',
  backButton: 'mr-4 text-[#1cb0f6] text-xl',
  completeTitle: 'text-2xl font-bold',
  completeContainer: 'flex flex-col items-center justify-center text-center',
  checkmarkContainer: 'mb-8 bg-[#58cc02] w-24 h-24 rounded-full flex items-center justify-center',
  checkmark: 'text-white text-4xl',
  congratsText: 'text-3xl font-bold mb-4',
  statsContainer: 'flex gap-8 mb-8',
  statItem: 'flex flex-col items-center',
  statValue: 'text-2xl font-bold',
  statLabel: 'text-sm text-gray-600',
  buttonContainer: 'w-full max-w-md',
  continueButton: 'w-full py-3 rounded-xl font-bold bg-[#58cc02] text-white hover:bg-[#46a302]'
};

export default function CompletePage() {
  // Mock completion data
  const completionData = {
    xpEarned: 20,
    streak: 7,
    perfectLesson: true
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>
        
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            {/* Show confetti for celebration */}
            <Confetti />
            
            <div className={styles.completeHeader}>
              <Link href="/learn" className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h1 className={styles.completeTitle}>Lesson Complete</h1>
            </div>
            
            <div className={styles.completeContainer}>
              <div className={styles.checkmarkContainer}>
                <FontAwesomeIcon icon={faCheck} className={styles.checkmark} />
              </div>
              
              <h2 className={styles.congratsText}>Great job!</h2>
              
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>+{completionData.xpEarned}</div>
                  <div className={styles.statLabel}>XP</div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{completionData.streak}</div>
                  <div className={styles.statLabel}>Day Streak</div>
                </div>
                
                {completionData.perfectLesson && (
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>100%</div>
                    <div className={styles.statLabel}>Perfect</div>
                  </div>
                )}
              </div>
              
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
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Import layout components
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';
import LegendaryTrophy from '@/app/components/quiz/LegendaryTrophy/LegendaryTrophy';

// Define styles (you can create a separate CSS module file later)
const styles = {
  appContainer: 'flex min-h-screen bg-[#f7f7f7]',
  mainAreaWrapper: 'flex-1 flex flex-col',
  topBar: 'bg-white p-4 shadow-sm',
  scrollableContent: 'flex-1 flex overflow-auto',
  contentArea: 'flex-1 p-6 max-w-3xl mx-auto',
  legendaryHeader: 'flex items-center mb-8',
  backButton: 'mr-4 text-[#1cb0f6] text-xl',
  legendaryTitle: 'text-2xl font-bold',
  legendaryContainer: 'flex flex-col items-center justify-center text-center',
  trophyContainer: 'mb-8',
  congratsText: 'text-3xl font-bold mb-4',
  descriptionText: 'text-xl mb-8',
  buttonContainer: 'w-full max-w-md',
  continueButton: 'w-full py-3 rounded-xl font-bold bg-[#58cc02] text-white hover:bg-[#46a302] mb-4',
  practiceButton: 'w-full py-3 rounded-xl font-bold border-2 border-[#1cb0f6] text-[#1cb0f6] hover:bg-[#e6f4fa]'
};

export default function LegendaryPage() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>
        
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            <div className={styles.legendaryHeader}>
              <Link href="/learn" className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h1 className={styles.legendaryTitle}>Legendary Status</h1>
            </div>
            
            <div className={styles.legendaryContainer}>
              <div className={styles.trophyContainer}>
                <FontAwesomeIcon icon={faTrophy} className="text-[#ffc800] text-8xl" />
              </div>
              
              <h2 className={styles.congratsText}>Congratulations!</h2>
              <p className={styles.descriptionText}>
                You've achieved Legendary status in this skill. Your mastery of these concepts is impressive!
              </p>
              
              <div className={styles.buttonContainer}>
                <Link href="/learn" className={styles.continueButton}>
                  CONTINUE
                </Link>
                <Link href="/quiz?lesson=1" className={styles.practiceButton}>
                  PRACTICE AGAIN
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
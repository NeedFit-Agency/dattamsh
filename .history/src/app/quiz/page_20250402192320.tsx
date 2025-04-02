'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Quiz } from '@/app/components/quiz/Quiz/Quiz';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import styles from './QuizPage.module.css';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson') || '1';
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <div className={styles.navigationControls}>
            <button 
              className={styles.quitButton} 
              onClick={() => setShowQuitConfirm(true)}
              aria-label="Quit lesson"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <div className={styles.lessonIndicator}>
              Lesson {lessonId}
            </div>
          </div>
          <StatsBar streak={1} gems={234} hearts={2} />
        </div>

        <div className={styles.contentArea}>
          <Quiz lessonId={lessonId} />
        </div>

        {showQuitConfirm && (
          <div className={styles.quitConfirmModal}>
            <div className={styles.modalContent}>
              <h3>Are you sure you want to quit?</h3>
              <p>Your progress in this lesson will be lost.</p>
              <div className={styles.modalButtons}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setShowQuitConfirm(false)}
                >
                  CONTINUE LESSON
                </button>
                <Link href={`/learn/${lessonId}`} className={styles.quitConfirmButton}>
                  QUIT
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
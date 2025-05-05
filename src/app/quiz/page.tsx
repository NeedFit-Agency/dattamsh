'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Quiz } from '@/components/quiz/Quiz/Quiz';
import styles from './QuizPage.module.css';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const standardId = searchParams.get('standard') || '1';
  const lessonId = searchParams.get('lesson') || '1';
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Handler to mark chapter as completed in localStorage
  const handleQuizComplete = () => {
    if (typeof window !== 'undefined') {
      const completedChapters = JSON.parse(localStorage.getItem('completedChapters') || '{}');
      completedChapters[`${standardId}-${lessonId}`] = true;
      localStorage.setItem('completedChapters', JSON.stringify(completedChapters));
    }
  };

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
        </div>

        <div className={styles.contentArea}>
          <Quiz lessonId={lessonId} onComplete={handleQuizComplete} />
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
                <Link href={`/standard/${standardId}/chapter/${lessonId}`} className={styles.quitConfirmButton}>
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
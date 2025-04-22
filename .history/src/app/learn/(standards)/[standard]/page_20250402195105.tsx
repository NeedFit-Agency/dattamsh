'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem';
import styles from './page.module.css';

const getStandardData = (standardId: string) => {
  const titles = {
    "1": "Basic Concepts",
    "2": "Intermediate Learning",
    "3": "Advanced Topics",
    "4": "Expert Level"
  };
  
  return {
    title: titles[standardId as keyof typeof titles] || "Unknown Standard",
    chapters: [
      { id: 1, title: "Introduction to machines", completed: false },
      { id: 2, title: "Fundamentals", completed: false },
      { id: 3, title: "Advanced Concepts", completed: false },
      { id: 4, title: "Mastery", completed: false },
    ]
  };
};

export default function StandardPage({ params }: { params: { standard: string } }) {
  const standardData = getStandardData(params.standard);


  return (
    <main className={styles.contentArea}>
      <div className={styles.lessonHeader}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          </Link>
          <div className={styles.headerTitle}>
            Standard {params.standard}
            <h2>{standardData.title}</h2>
          </div>
        </div>
        <button className={styles.guidebookButton}>
          <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
          GUIDEBOOK
        </button>
      </div>

      <div className={styles.chaptersGrid}>
        {standardData.chapters.map((chapter, index) => (
          <Link
            key={chapter.id}
            href={`/learn/${params.standard}/chapter/${chapter.id}`}
            className={styles.chapterLink}
          >
            <LessonPathItem
              type={chapter.completed ? 'checkmark' : 'level-badge'}
              level={chapter.id}
              completed={chapter.completed}
            />
            <div className={styles.chapterInfo}>
              <h3>Chapter {chapter.id}</h3>
              <p>{chapter.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 
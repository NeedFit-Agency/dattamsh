'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LessonPathItem from '@/app/components/learn/LessonPathItem/LessonPathItem';
import styles from './page.module.css';
import { chapters } from '@/data/chaptersData';

const getStandardData = (standardId: string) => {
  const titles = {
    "1": "Basic Concepts",
    "2": "Computer & Mobile Devices"
  };
  
  return {
    title: titles[standardId as keyof typeof titles] || "Unknown Standard",
    chapters: chapters[standardId as keyof typeof chapters] || [
      { id: 1, title: "Unknown Chapter", completed: false },
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
            href={`/standard/${params.standard}/chapter/${chapter.id}`}
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
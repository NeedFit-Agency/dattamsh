'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown, faLaptopCode, faRobot, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LessonPathItem from '@/components/learn/LessonPathItem/LessonPathItem';
import styles from './LearnPage.module.css';
import { chapters } from '@/data/chaptersData';

type ContentItemType = {
  type: 'checkmark' | 'chest' | 'level-badge' | 'duo';
  id: number;
  completed: boolean;
  level?: number;
};

type PageParams = {
  standard: string;
  id: string;
};

const getChapterData = (standardId: string, chapterId: string) => {
  const standardTitles = {
    "1": "Basic Concepts",
    "2": "Intermediate Learning",
    "3": "Advanced Topics",
    "4": "Expert Level"
  };

  const headerThemes = {
    "1": styles.themeGreen,
    "2": styles.themePurple,
    "3": styles.themeOrange,
    "4": styles.themeBlue,
    "5": styles.themeGreen,
    "6": styles.themePurple,
    "7": styles.themeOrange,
    "8": styles.themeBlue,
    "9": styles.themeGreen,
    "10": styles.themePurple,
    "11": styles.themeOrange,
    "12": styles.themeBlue,
  };

  const chapterTitle =
    chapters[standardId as keyof typeof chapters]
      ?.find(
        (chapter: { id: number; title: string; completed: boolean }) =>
          chapter.id.toString() === chapterId
      )?.title || "Unknown Chapter";

  return {
    standardTitle: standardTitles[standardId as keyof typeof standardTitles] || "Unknown Standard",
    chapterTitle,
    headerTheme: headerThemes[chapterId as keyof typeof headerThemes] || styles.themeGreen,
    content: [
      { type: 'level-badge' as const, id: 1, level: 1, completed: true },
      { type: 'level-badge' as const, id: 2, level: 2, completed: false },
      { type: 'level-badge' as const, id: 3, level: 3, completed: true },
      { type: 'level-badge' as const, id: 4, level: 4, completed: true },
      { type: 'duo' as const, id: 6, completed: false }
    ] as ContentItemType[]
  };
};

export default function ChapterPage({ 
  params 
}: { 
  params: Promise<PageParams>
}) {
  const { standard, id } = React.use(params);
  
  const chapterData = getChapterData(standard, id);

  const handleScrollDown = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Positioning Configuration
  const positions: { [key: number]: React.CSSProperties } = {
    1: {
      top: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    2: {
      top: '180px',
      left: '30%',
      transform: 'translateX(-50%)',
    },
    3: {
      top: '310px',
      left: '20%',
      transform: 'translateX(-50%)',
    },
    4: {
      top: '440px',
      left: '40%',
      transform: 'translateX(-50%)',
    },
    5: {
      top: '570px',
      left: '60%',
      transform: 'translateX(-50%)',
    },
    6: {
      top: '280px',
      left: '65%',
      transform: 'translateX(-50%)',
    },
  };

  // Add tech-themed decorative elements
  const decorativeIcons = [
    { icon: faLaptopCode, style: { top: '10%', left: '10%' } },
    { icon: faRobot, style: { top: '30%', right: '15%' } },
    { icon: faMicrochip, style: { bottom: '25%', left: '15%' } },
  ];

  return (
    <main className={styles.contentArea}>
      <div className={`${styles.lessonHeader} ${chapterData.headerTheme}`}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          </Link>
          <div className={styles.headerTitle}>
            STANDARD {standard}, CHAPTER {id}
            <h2>{chapterData.chapterTitle}</h2>
          </div>
        </div>
        <button className={styles.guidebookButton}>
          <FontAwesomeIcon icon={faBookOpen} className={styles.icon} /> 
        </button>
      </div>

      <div className={styles.lessonTitleDivider}>
        <span>{chapterData.standardTitle} - {chapterData.chapterTitle}</span>
      </div>

      <div className={styles.lessonPath}>
        {/* Add decorative tech icons */}
        {decorativeIcons.map((item, index) => (
          <div 
            key={index}
            className={styles.decorativeIcon}
            style={item.style as React.CSSProperties}
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}

        {(() => {
          const nodes: React.ReactNode[] = [];
          chapterData.content.forEach((item, idx) => {
            // Only 'duo' should never be clickable
            const isDuo = item.type === 'duo';
            const isClickable = !isDuo && !(item.type === 'checkmark' && item.completed);
            const itemStyle = positions[item.id] || {};

            const lessonNode = isClickable ? (
              <Link
                key={item.id}
                href={`/learning?standard=${standard}&chapter=${item.id}&lesson=${item.id}`}
                className={styles.lessonLink}
                style={itemStyle}
                aria-label={`Start or practice lesson ${item.id}`}
              >
                <LessonPathItem
                  type={item.type}
                  level={item.type === 'level-badge' ? item.level : undefined}
                  completed={item.completed}
                />
              </Link>
            ) : (
              <div
                key={item.id}
                className={styles.lessonLink}
                style={itemStyle}
                aria-label={`Lesson ${item.id} completed`}
              >
                <LessonPathItem
                  type={item.type}
                  level={item.type === 'level-badge' ? item.level : undefined}
                  completed={item.completed}
                />
              </div>
            );
            nodes.push(lessonNode);
          });
          return nodes;
        })()}
      </div>
    </main>
  );
}
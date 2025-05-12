'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookOpen, faArrowDown, faLaptopCode, faRobot, faMicrochip, faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LessonPathItem from '@/components/learn/LessonPathItem/LessonPathItem';
import styles from './LearnPage.module.css';
import standardsService from '@/services/standardsService';
import { ContentItemType } from '@/types/standards';

// Using imported type from standards.ts

type PageParams = {
  standard: string;
  id: string;
};

/**
 * Get chapter data using the standardsService
 * This function maps the service data to the component's expected format
 */
const getChapterData = (standardId: string, chapterId: string) => {
  // Get chapter data from the service
  const chapterData = standardsService.getChapterData(standardId, chapterId);
  
  // Map the theme string to the actual CSS class
  const themeMap: {[key: string]: string} = {
    "themeGreen": styles.themeGreen,
    "themePurple": styles.themePurple,
    "themeOrange": styles.themeOrange,
    "themeBlue": styles.themeBlue
  };
  
  return {
    ...chapterData,
    headerTheme: themeMap[chapterData.headerTheme] || styles.themeGreen
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
  const itemSize = 80;
  const verticalSpacing = 60;
  const standardHeight = 700;

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
    { icon: faCode, style: { bottom: '15%', right: '10%' } },
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
          GUIDEBOOK
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

        {/* Existing lesson path items - UPDATED to redirect to learning page */}
        {chapterData.content.map((item) => {
          // Only 'duo' should never be clickable
          const isDuo = item.type === 'duo';
          const isClickable = !isDuo && !(item.type === 'checkmark' && item.completed);
          const itemStyle = positions[item.id] || {};

          return isClickable ? (
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
        })}
      </div>

      <button 
        className={styles.scrollDownButton} 
        onClick={handleScrollDown}
        aria-label="Scroll down"
      >
        <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
      </button>
    </main>
  );
}
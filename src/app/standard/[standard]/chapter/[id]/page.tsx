"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookOpen,
  faArrowDown,
  faLaptopCode,
  faRobot,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import LessonPathItem from "@/components/learn/LessonPathItem/LessonPathItem";
import styles from "./LearnPage.module.css";
import { chapters } from "@/data/chaptersData";

type ContentItemType = {
  type: "checkmark" | "chest" | "level-badge" | "robo";
  id: number;
  completed: boolean;
  level?: number;
  chapterName?: string;
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
    "4": "Expert Level",
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
    chapters[standardId as keyof typeof chapters]?.find(
      (chapter: { id: number; title: string; completed: boolean }) =>
        chapter.id.toString() === chapterId
    )?.title || "Unknown Chapter";

  // Get chapter names for lessons
  const standardChapters = chapters[standardId as keyof typeof chapters] || [];
  const lessonChapterNames: { [key: number]: string } = {};

  standardChapters.forEach((chapter, index) => {
    lessonChapterNames[index + 1] = chapter.title;
  });

  return {
    standardTitle:
      standardTitles[standardId as keyof typeof standardTitles] ||
      "Unknown Standard",
    chapterTitle,
    headerTheme:
      headerThemes[chapterId as keyof typeof headerThemes] || styles.themeGreen,
    lessonChapterNames,
    content: [
      { type: "level-badge" as const, id: 1, level: 1, completed: true },
      { type: "level-badge" as const, id: 2, level: 2, completed: false },
      { type: "level-badge" as const, id: 3, level: 3, completed: true },
      { type: "level-badge" as const, id: 4, level: 4, completed: true },
      { type: "robo" as const, id: 6, completed: false },
    ] as ContentItemType[],
  };
};

export default function ChapterPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { standard, id } = React.use(params);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const chapterData = getChapterData(standard, id);

  // Detect mobile device and screen size
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Responsive positioning configuration
  const getPositions = (): { [key: number]: React.CSSProperties } => {
    if (isMobile) {
      // Mobile zigzag positioning - alternating left and right
      return {
        1: {
          top: "40px",
          left: "30%",
          transform: "translateX(-50%)",
        },
        2: {
          top: "180px",
          left: "70%",
          transform: "translateX(-50%)",
        },
        3: {
          top: "360px",
          left: "30%",
          transform: "translateX(-50%)",
        },
        4: {
          top: "520px",
          left: "70%",
          transform: "translateX(-50%)",
        },
        5: {
          top: "680px",
          left: "30%",
          transform: "translateX(-50%)",
        },
        6: {
          top: "280px",
          left: "70%",
          transform: "translateX(-50%)",
        },
      };
    } else {
      // Desktop positioning - alternating layout
      return {
        1: {
          top: "50px",
          left: "45%",
          transform: "translateX(-50%)",
        },
        2: {
          top: "220px",
          left: "25%",
          transform: "translateX(-50%)",
        },
        3: {
          top: "390px",
          left: "60%",
          transform: "translateX(-50%)",
        },
        4: {
          top: "560px",
          left: "35%",
          transform: "translateX(-50%)",
        },
        5: {
          top: "730px",
          left: "65%",
          transform: "translateX(-50%)",
        },
        6: {
          top: "200px",
          left: "75%",
          transform: "translateX(-50%)",
        },
      };
    }
  };

  const positions = getPositions();

  // Responsive decorative elements
  const getDecorativeIcons = () => {
    if (isMobile) {
      // Simplified decorative elements for mobile
      return [
        {
          icon: faLaptopCode,
          style: { top: "5%", left: "5%", fontSize: "1.5rem" },
        },
        {
          icon: faRobot,
          style: { top: "15%", right: "5%", fontSize: "1.5rem" },
        },
      ];
    } else {
      // Full decorative elements for desktop
      return [
        { icon: faLaptopCode, style: { top: "10%", left: "10%" } },
        { icon: faRobot, style: { top: "30%", right: "15%" } },
        { icon: faMicrochip, style: { bottom: "25%", left: "15%" } },
      ];
    }
  };

  const decorativeIcons = getDecorativeIcons();

  // Enhanced touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Add touch feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(0.95)";
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Remove touch feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "";
  };

  return (
    <main className={styles.contentArea}>
      <div className={`${styles.lessonHeader} ${chapterData.headerTheme}`}>
        <div className={styles.headerLeft}>
          <Link href="/home" className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          </Link>
          <div className={styles.headerTitle}>
            <h2>STANDARD {standard} </h2>
          </div>
        </div>
        <button
          className={styles.guidebookButton}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Open guidebook"
        >
          <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
        </button>
      </div>

      <div className={styles.lessonPath}>
        {/* Add responsive decorative tech icons */}
        {decorativeIcons.map((item, index) => (
          <div
            key={index}
            className={styles.decorativeIcon}
            style={item.style as React.CSSProperties}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}

        {(() => {
          const nodes: React.ReactNode[] = [];
          chapterData.content.forEach((item, idx) => {
            // Only 'robo' should never be clickable
            const isrobo = item.type === "robo";
            const isClickable =
              !isrobo && !(item.type === "checkmark" && item.completed);
            const itemStyle = positions[item.id] || {};

            // Get chapter name for the lesson based on level number
            const chapterName =
              item.type === "level-badge" && item.level
                ? chapterData.lessonChapterNames[item.level]
                : undefined;

            // Determine position for chapter name based on zigzag layout
            const getChapterPosition = () => {
              if (isMobile) {
                // For mobile zigzag: left items show names on right, right items show names on left
                const isLeftItem =
                  item.id === 1 || item.id === 3 || item.id === 5;
                // Special handling for mascot (item 6) - always show name on left since it's on the right side
                if (item.id === 6) return "left";
                return isLeftItem ? "right" : "left";
              } else {
                // For desktop: alternating based on level
                return item.level && item.level % 2 === 0 ? "left" : "right";
              }
            };

            const position = getChapterPosition();

            const lessonNode = isClickable ? (
              <Link
                key={item.id}
                href={`/learning?standard=${standard}&chapter=${item.id}`}
                className={styles.lessonLink}
                style={itemStyle}
                aria-label={`Start or practice lesson ${item.id}${
                  chapterName ? `: ${chapterName}` : ""
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <LessonPathItem
                  type={item.type}
                  level={item.type === "level-badge" ? item.level : undefined}
                  completed={item.completed}
                  chapterName={chapterName}
                  position={position}
                />
              </Link>
            ) : (
              <div
                key={item.id}
                className={styles.lessonLink}
                style={itemStyle}
                aria-label={`Lesson ${item.id} completed${
                  chapterName ? `: ${chapterName}` : ""
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <LessonPathItem
                  type={item.type}
                  level={item.type === "level-badge" ? item.level : undefined}
                  completed={item.completed}
                  chapterName={chapterName}
                  position={position}
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

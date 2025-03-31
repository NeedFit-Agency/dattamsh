'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faFire, faGem, faHeart, faStar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

// Import layout components
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import RightRail from '@/app/components/layout/RightRail/RightRail';

// Import UI components
import ProgressBar from '@/app/components/ui/ProgressBar/ProgressBar';
import StatsBox from '@/app/components/ui/StatsBox/StatsBox';
import CalendarBox from '@/app/components/ui/CalendarBox/CalendarBox';

// Import CSS module for consistent styling
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  // Mock user data (in a real app, this would come from an API or database)
  const userData = {
    name: 'User',
    streak: 7,
    gems: 234,
    hearts: 2,
    xp: 1250,
    level: 5,
    achievements: [
      { id: 1, title: 'First Lesson', description: 'Completed your first lesson', icon: faTrophy, completed: true },
      { id: 2, title: '3-Day Streak', description: 'Practiced for 3 days in a row', icon: faFire, completed: true },
      { id: 3, title: 'Perfect Lesson', description: 'Complete a lesson without mistakes', icon: faStar, completed: true },
      { id: 4, title: '7-Day Streak', description: 'Practiced for 7 days in a row', icon: faFire, completed: true },
      { id: 5, title: 'Legendary Status', description: 'Reach Legendary status in a skill', icon: faTrophy, completed: false },
      { id: 6, title: '30-Day Streak', description: 'Practiced for 30 days in a row', icon: faFire, completed: false }
    ],
    streakCalendar: [
      // Last 28 days activity (true = practiced, false = didn't practice)
      false, false, true, true, false, true, true, // Week 1
      true, true, true, false, true, true, true,   // Week 2
      false, false, true, true, true, false, true, // Week 3
      true, true, true, true, true, true, true     // Week 4 (current week)
    ]
  };

  // Calculate XP needed for next level (simple formula)
  const xpForNextLevel = 1000 + (userData.level * 500);
  const xpProgress = (userData.xp / xpForNextLevel) * 100;

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      
      <div className={styles.mainAreaWrapper}>
        <div className={styles.topBar}>
          <StatsBar streak={userData.streak} gems={userData.gems} hearts={userData.hearts} />
        </div>
        
        <div className={styles.scrollableContent}>
          <main className={styles.contentArea}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>
                {userData.name.charAt(0)}
              </div>
              <h1 className={styles.profileName}>{userData.name}</h1>
              
              <div className={styles.profileStats}>
                <StatsBox variant="streak" icon={faFire} value={userData.streak} label="Day Streak" />
                <StatsBox variant="xp" icon={faGem} value={userData.gems} label="Gems" />
                <StatsBox variant="accuracy" icon={faHeart} value={userData.hearts} label="Hearts" />
              </div>
              
              <div className={styles.levelProgress}>
                <div className={styles.levelInfo}>
                  <span>Level {userData.level}</span>
                  <span>{userData.xp}/{xpForNextLevel} XP</span>
                </div>
                <ProgressBar progress={xpProgress} />
              </div>
            </div>
            
            <h2 className={styles.sectionTitle}>Achievements</h2>
            <div className={styles.achievementsGrid}>
              {userData.achievements.map(achievement => (
                <div key={achievement.id} className={`${styles.achievementCard} ${!achievement.completed ? 'opacity-50' : ''}`}>
                  <div className={styles.achievementIcon}>
                    <FontAwesomeIcon icon={achievement.icon} />
                  </div>
                  <div className={styles.achievementInfo}>
                    <div className={styles.achievementTitle}>{achievement.title}</div>
                    <div className={styles.achievementDesc}>{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.streakSection}>
              <div className={styles.streakHeader}>
                <FontAwesomeIcon icon={faCalendarDay} className={styles.streakIcon} />
                <h2 className={styles.streakTitle}>Your Learning Streak</h2>
              </div>
              
              <div className={styles.calendarGrid}>
                {userData.streakCalendar.map((practiced, index) => (
                  <CalendarBox key={index} active={practiced} />
                ))}
              </div>
            </div>
          </main>
          
          <RightRail />
        </div>
      </div>
    </div>
  );
}
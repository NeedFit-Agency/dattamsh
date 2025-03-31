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

// Define styles (you can create a separate CSS module file later)
const styles = {
  appContainer: 'flex min-h-screen bg-[#f7f7f7]',
  mainAreaWrapper: 'flex-1 flex flex-col',
  topBar: 'bg-white p-4 shadow-sm',
  scrollableContent: 'flex-1 flex overflow-auto',
  contentArea: 'flex-1 p-6 max-w-3xl mx-auto',
  profileHeader: 'flex flex-col items-center mb-8',
  profileAvatar: 'w-24 h-24 rounded-full bg-[#1cb0f6] flex items-center justify-center text-white text-3xl font-bold mb-4',
  profileName: 'text-2xl font-bold mb-2',
  profileStats: 'flex gap-4 mb-6',
  sectionTitle: 'text-xl font-bold mb-4',
  achievementsGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-8',
  achievementCard: 'bg-white p-4 rounded-xl shadow-sm flex items-center',
  achievementIcon: 'text-[#1cb0f6] text-2xl mr-4',
  achievementInfo: 'flex-1',
  achievementTitle: 'font-bold',
  achievementDesc: 'text-sm text-gray-600',
  streakSection: 'bg-white p-4 rounded-xl shadow-sm mb-8',
  streakHeader: 'flex items-center mb-4',
  streakIcon: 'text-[#ff9600] text-xl mr-2',
  streakTitle: 'font-bold',
  calendarGrid: 'grid grid-cols-7 gap-2'
};

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
                <StatsBox icon={faFire} value={userData.streak} label="Day Streak" />
                <StatsBox icon={faGem} value={userData.gems} label="Gems" />
                <StatsBox icon={faHeart} value={userData.hearts} label="Hearts" />
              </div>
              
              <div className="w-full max-w-md mb-6">
                <div className="flex justify-between mb-2">
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
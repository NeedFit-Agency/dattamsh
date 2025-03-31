import React, { useEffect, useState } from 'react';
import styles from './LegendaryTrophy.module.css';

const LegendaryTrophy: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.trophyContainer}>
      <div className={`${styles.trophy} ${showAnimation ? styles.animate : ''}`}>
        <div className={styles.trophyTop}>
          <div className={styles.crown}></div>
        </div>
        <div className={styles.trophyBody}>
          <div className={styles.bodyGlow}></div>
        </div>
        <div className={styles.trophyBase}></div>
      </div>
      <div className={`${styles.confettiContainer} ${showAnimation ? styles.showConfetti : ''}`}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className={styles.confetti}></div>
        ))}
      </div>
      <div className={`${styles.legendaryText} ${showAnimation ? styles.showText : ''}`}>
        LEGENDARY!
      </div>
    </div>
  );
};

export default LegendaryTrophy;
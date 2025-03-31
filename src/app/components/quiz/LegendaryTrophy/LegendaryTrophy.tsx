import Image from 'next/image';
import styles from './LegendaryTrophy.module.css';

interface LegendaryTrophyProps {
  className?: string;
}

export default function LegendaryTrophy({ className }: LegendaryTrophyProps) {
  return (
    <div className={`${styles.trophyContainer} ${className || ''}`}>
      {/* Sparkles */}
      <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
      <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>

      {/* Glow */}
      <div className={styles.trophyGlow}></div>

      {/* Trophy Image */}
      <Image
        src="/legendary-trophy.png" // Path in public folder
        alt="Legendary Trophy"
        width={150} // Provide intrinsic or desired width
        height={180} // Provide intrinsic or desired height (adjust aspect ratio)
        className={styles.trophyImage}
        priority // Load image eagerly if it's above the fold
      />
       {/* Fallback can be added here if needed */}
    </div>
  );
}
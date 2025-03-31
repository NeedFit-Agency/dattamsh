import React from 'react';
import styles from './Confetti.module.css';

interface ConfettiProps {
  count?: number; // Number of confetti pieces
}

// Function to generate random number in a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Confetti({ count = 30 }: ConfettiProps) {
  const confettiPieces = React.useMemo(() => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      // Use CSS variables for dynamic styling within the component instance
      style: {
        '--hue': random(0, 360),
        '--x': `${random(0, 100)}%`,
        '--delay': `${random(0, 1.5)}s`, // Stagger the start
        '--duration': `${random(2, 4)}s` // Vary fall duration
      } as React.CSSProperties, // Cast to CSSProperties
    }));
  }, [count]);

  return (
    <div className={styles.confettiContainer} aria-hidden="true">
      {confettiPieces.map((piece) => (
        <div key={piece.id} className={styles.confetti} style={piece.style} />
      ))}
    </div>
  );
}
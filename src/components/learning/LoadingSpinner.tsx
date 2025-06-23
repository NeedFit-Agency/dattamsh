import React from 'react';
import Image from 'next/image';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, fullScreen }) => {
  const containerClasses = `${styles.container} ${fullScreen ? styles.fullScreen : ''}`;

  return (
    <div className={containerClasses}>
      <div className={styles.mascotContainer}>
        <Image
          src="/images/mascot.png"
          alt="Mascot"
          width={100}
          height={100}
          className={styles.mascot}
          priority
        />
        <div className={styles.spinner} />
      </div>

      {message && <div className={styles.message}>{message}</div>}

      <div className={styles.subText}>Get ready for fun learning!</div>

      {fullScreen && (
        <div className={styles.footerText}>
          Preparing your awesome learning adventure...
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner; 
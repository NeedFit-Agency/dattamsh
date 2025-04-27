import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  progress: number;
  className?: string; // Allow passing additional classes
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  const validProgress = Math.max(0, Math.min(100, progress)); // Ensure progress is within 0-100

  return (
    <div className={`${styles.progressBar} ${className || ''}`}>
      <div
        className={styles.progressFill}
        style={{ width: `${validProgress}%` }}
        role="progressbar"
        aria-valuenow={validProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
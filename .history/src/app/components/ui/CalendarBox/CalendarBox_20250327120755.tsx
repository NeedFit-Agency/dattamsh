import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './CalendarBox.module.css';

// Example: Assuming Monday is index 0
const DAYS = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

type DayStatus = 'checked' | 'empty';

interface CalendarBoxProps {
  // Whether this day was practiced
  active: boolean;
  className?: string;
}

export default function CalendarBox({
  currentDayIndex,
  dayStatuses,
  infoText = "Practice each day so your streak won't reset!",
  className
}: CalendarBoxProps) {

  // Ensure arrays have correct length for safety
  const displayDays = DAYS.slice(0, dayStatuses.length);

  return (
    <div className={`${styles.calendarBox} ${className || ''}`}>
      <div className={styles.calendarDays}>
        {displayDays.map((day, index) => (
          <span
            key={day}
            className={`${styles.day} ${index === currentDayIndex ? styles.active : ''}`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className={styles.calendarCircles}>
        {dayStatuses.map((status, index) => (
          <span
            key={index}
            className={`${styles.circle} ${status === 'checked' ? styles.checked : ''}`}
          >
            {status === 'checked' && <FontAwesomeIcon icon={faCheck} />}
          </span>
        ))}
      </div>
      <p className={styles.calendarInfo}>
        {infoText}
      </p>
    </div>
  );
}
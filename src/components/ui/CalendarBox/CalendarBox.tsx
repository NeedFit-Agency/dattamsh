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
  active,
  className
}: CalendarBoxProps) {

  return (
    <div className={`${styles.calendarBox} ${className || ''}`}>
      <div className={`${styles.circle} ${active ? styles.checked : ''}`}>
        {active && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </div>
  );
}
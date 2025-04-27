import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faBolt, faBullseye, faFireFlameCurved, faShieldAlt } from '@fortawesome/free-solid-svg-icons'; // Example icons
import styles from './StatsBox.module.css';

type StatsBoxVariant = 'xp' | 'accuracy' | 'streak' | 'league';

interface StatsBoxProps {
  variant: StatsBoxVariant;
  label?: string; // Optional override
  value: string | number;
  subtext?: string; // e.g., "Day streak", "Total XP"
  icon?: FontAwesomeIconProps['icon']; // Allow passing specific icons
  className?: string;
}

const variantMap: Record<StatsBoxVariant, { defaultLabel: string; defaultIcon: FontAwesomeIconProps['icon']; styleClass: string }> = {
  xp: { defaultLabel: 'TOTAL XP', defaultIcon: faBolt, styleClass: styles.xp },
  accuracy: { defaultLabel: 'GREAT!', defaultIcon: faBullseye, styleClass: styles.accuracy },
  streak: { defaultLabel: '', defaultIcon: faFireFlameCurved, styleClass: styles.streak }, // Label might be integrated
  league: { defaultLabel: '', defaultIcon: faShieldAlt, styleClass: styles.league }, // Label might be integrated
};

export default function StatsBox({ variant, label, value, subtext, icon, className }: StatsBoxProps) {
  const config = variantMap[variant];
  const displayLabel = label ?? config.defaultLabel;
  const displayIcon = icon ?? config.defaultIcon;

  return (
    <div className={`${styles.statBox} ${config.styleClass} ${className || ''}`}>
      {displayLabel && <div className={styles.label}>{displayLabel}</div>}
      <div className={styles.content}>
        {/* Specific rendering for streak/league based on profile */}
        {variant === 'streak' || variant === 'league' ? (
          <>
            {displayIcon && <FontAwesomeIcon icon={displayIcon} className={styles.icon} />}
            <span className={styles.value}>{value}</span>
            {subtext && <span className={styles.subtext}>{subtext}</span>}
          </>
        ) : (
          // Standard rendering for XP/Accuracy
          <>
            {displayIcon && <FontAwesomeIcon icon={displayIcon} className={styles.icon} />}
            <span>{value}{variant === 'accuracy' ? '%' : ''}</span>
             {subtext && <span className={styles.subtext}>{subtext}</span>} {/* Can add subtext here too */}
          </>
        )}
      </div>
    </div>
  );
}
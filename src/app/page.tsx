'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faLock, 
  faLaptopCode, 
  faRobot, 
  faMicrochip, 
  faCode,
  faBrain,
  faGraduationCap,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import styles from './page.module.css';

export default function HomePage() {
  const Standards = [
    {
      id: "1",
      subtitle: "Basic Computer Education",
      title: "1st Standard",
      status: "active",
      progress: "0/4 completed",
      units: "4 Chapters",
      message: "Start your journey into the world of computers!",
      icon: faLaptopCode,
      description: "Learn the basics of computers, coding, and digital thinking."
    },
    {
      id: "2",
      subtitle: "Intermediate Computing",
      title: "2nd Standard",
      status: "locked",
      units: "4 Chapters",
      icon: faCode,
      description: "Dive deeper into programming concepts and problem-solving."
    },
    {
      id: "3",
      subtitle: "Advanced Technology",
      title: "3rd Standard",
      status: "locked",
      units: "4 Chapters",
      icon: faMicrochip,
      description: "Explore advanced computing concepts and artificial intelligence."
    },
    {
      id: "4",
      subtitle: "Expert Level",
      title: "4th Standard",
      status: "locked",
      units: "4 Chapters",
      icon: faRobot,
      description: "Master complex algorithms and machine learning basics."
    }
  ];

  // Add decorative elements
  const decorativeIcons = [
    { icon: faBrain, style: { top: '10%', left: '5%' } },
    { icon: faGraduationCap, style: { top: '20%', right: '8%' } },
    { icon: faAward, style: { bottom: '15%', left: '8%' } },
    { icon: faCode, style: { bottom: '25%', right: '5%' } },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Binary Brains</h1>
          <nav className={styles.nav}>
            <StatsBar streak={1} gems={234} hearts={2} />
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {/* Add decorative icons */}
        {decorativeIcons.map((item, index) => (
          <div 
            key={index}
            className={styles.decorativeIcon}
            style={item.style as React.CSSProperties}
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}

        <div className={styles.heroSection}>
          <h2 className={styles.heroTitle}>Begin Your Learning Journey</h2>
          <p className={styles.heroSubtitle}>
            Welcome to Binary Brains - Where Learning Computers Becomes an Adventure!
          </p>
        </div>
        
        <div className={styles.standardsContainer}>
          <div className={styles.sectionHeader}>
            <h3>Choose Your Learning Path</h3>
            <p>Select your grade level and start exploring the world of technology!</p>
          </div>
          
          <div className={styles.standardList}>
            {Standards.map((Standard) => (
              <div key={Standard.id} className={styles.standardCard}>
                <Link 
                  href={Standard.status === 'active' ? `/learn/${Standard.id}/chapter/1` : '#'} 
                  className={`${styles.standardLink} ${Standard.status === 'locked' ? styles.locked : ''}`}
                >
                  <div className={styles.standardContent}>
                    <div className={styles.standardHeader}>
                      <FontAwesomeIcon icon={Standard.icon} className={styles.standardIcon} />
                      <div className={styles.standardInfo}>
                        <span className={styles.subtitle}>{Standard.subtitle}</span>
                        <h2 className={styles.title}>{Standard.title}</h2>
                      </div>
                      {Standard.status === 'locked' ? (
                        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
                      )}
                    </div>
                    
                    <p className={styles.standardDescription}>{Standard.description}</p>
                    
                    <div className={styles.standardDetails}>
                      {Standard.status === 'active' ? (
                        <div className={styles.progress}>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '0%' }}></div>
                          </div>
                          <span className={styles.progressText}>{Standard.progress}</span>
                        </div>
                      ) : (
                        <div className={styles.units}>{Standard.units}</div>
                      )}
                    </div>

                    {Standard.message && (
                      <p className={styles.message}>{Standard.message}</p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
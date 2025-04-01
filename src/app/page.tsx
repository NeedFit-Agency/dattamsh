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
      description: "Learn all about computers"
    },
    {
      id: "2",
      subtitle: "Basic Computer Education",
      title: "2nd Standard",
      status: "locked",
      units: "4 Chapters",
      progress: "0/4 completed",
      icon: faCode,
      description: "More about computers, smart phones, and Introduction to Notepad"
    },
    {
      id: "3",
      subtitle: "Intermediate Computer Education",
      title: "3rd Standard",
      status: "locked",
      progress: "0/4 completed",
      units: "4 Chapters",
      icon: faMicrochip,
      description: "Surfing the internet, understanding the email, google maps, Microsoft Word"
    },
    {
      id: "4",
      subtitle: "Expert Level",
      title: "4th Standard",
      status: "locked",
      progress: "0/4 completed",
      units: "4 Chapters",
      icon: faRobot,
      description: "Operating Systems, Introduction to Windows, Diﬀerent File Types, Introduction to Microsoft Excel"
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
                      <div className={styles.progress}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{ width: Standard.status === 'active' ? '0%' : '0%' }}
                          />
                        </div>
                        <span className={styles.progressText}>{Standard.progress}</span>
                      </div>
                      <span className={styles.units}>{Standard.units}</span>
                      {Standard.message && (
                        <p className={styles.message}>{Standard.message}</p>
                      )}
                    </div>
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
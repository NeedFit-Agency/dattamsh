'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      units: "4 Chapters",
      message: "Start your journey into the world of computers!",
      icon: faLaptopCode,
      description: "Learn all about computers"
    },
    {
      id: "2",
      subtitle: "Intermediate Computer Education",
      title: "2nd Standard",
      status: "active",
      units: "4 Chapters",
      icon: faCode,
      description: "Explore different types of computers, smartphones, and learn to use Notepad"
    },
    {
      id: "3",
      subtitle: "Intermediate Computer Education",
      title: "3rd Standard",
      status: "active",
      units: "4 Chapters",
      icon: faMicrochip,
      description: "Surfing the internet, understanding the email, google maps, Microsoft Word"
    },
    {
      id: "4",
      subtitle: "Expert Level",
      title: "4th Standard",
      status: "active",
      units: "4 Chapters",
      icon: faRobot,
      description: "Operating Systems, Introduction to Windows, Different File Types, Introduction to Microsoft Excel"
    },
    // Additional standards
    {
      id: "5",
      subtitle: "Advanced Computing",
      title: "5th Standard",
      status: "active",
      units: "4 Chapters",
      icon: faCode,
      description: "Advanced Microsoft Office, Introduction to PowerPoint, Basic Internet Safety"
    },
    {
      id: "6",
      subtitle: "Digital Literacy",
      title: "6th Standard",
      status: "active",
      units: "4 Chapters",
      icon: faBrain,
      description: "Digital Citizenship, Online Research Skills, Introduction to Coding Concepts"
    },
    {
      id: "7",
      subtitle: "Programming Fundamentals",
      title: "7th Standard",
      status: "active",
      units: "4 Chapters",
      icon: faLaptopCode,
      description: "Basic Programming Concepts, Introduction to Scratch, Problem-Solving with Algorithms"
    },
    {
      id: "8",
      subtitle: "Computer Science Principles",
      title: "8th Standard",
      status: "active",
      units: "4 Chapters",
      icon: faMicrochip,
      description: "Web Development Basics, Data Analysis with Spreadsheets, Introduction to Cybersecurity"
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
          <motion.div 
            key={index}
            className={styles.decorativeIcon}
            style={item.style as React.CSSProperties}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FontAwesomeIcon icon={item.icon} />
          </motion.div>
        ))}
        
        <div className={styles.standardsContainer}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Choose Your Learning Path</h3>
            <p>Select your grade level and start exploring the world of technology!</p>
          </motion.div>
          
          <div className={styles.standardList}>
            {Standards.map((Standard, index) => (
              <motion.div 
                key={Standard.id} 
                className={styles.standardCard}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link 
                  href={Standard.status === 'active' ? `/standard/${Standard.id}/chapter/1` : '#'} 
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
                      </div>
                      <span className={styles.units}>{Standard.units}</span>
                      {Standard.message && (
                        <p className={styles.message}>{Standard.message}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

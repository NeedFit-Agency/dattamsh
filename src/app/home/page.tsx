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

  // Accent colors for cards (cycle through for variety)
  const accentColors = [
    '#4FC3F7', // Sky Blue
    '#FFD54F', // Sunny Yellow
    '#81C784', // Mint Green
    '#FF8A65', // Coral Orange
    '#BA68C8', // Lavender
    '#EF5350', // Tomato Red
    '#FFB74D', // Tangerine
    '#4DD0E1', // Aqua
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Mascot or background illustration */}
      <img src="/images/mascot.png" alt="" className={styles.pageMascot} aria-hidden="true" />
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
        
        <div className={styles.sectionHeader}>
          <h3>
            <span role="img" aria-label="robot mascot">🤖</span> Choose Your Learning Path
          </h3>
        </div>
        <div className={styles.ticketGrid}>
          {Standards.map((Standard, index) => (
            <a
              key={Standard.id}
              href={Standard.status === 'active' ? `/standard/${Standard.id}/chapter/1` : '#'}
              className={styles.ticketCard}
              style={{
                '--accent': accentColors[index % accentColors.length],
              } as React.CSSProperties}
              tabIndex={Standard.status === 'active' ? 0 : -1}
              aria-disabled={Standard.status !== 'active'}
              role="button"
            >
              <div className={styles.ticketIconWrapper}>
                <span className={styles.ticketIconBg} />
                <span className={styles.ticketIcon}>
                  <FontAwesomeIcon icon={Standard.icon} />
                </span>
              </div>
              <div className={styles.ticketLabel}>{Standard.title}</div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

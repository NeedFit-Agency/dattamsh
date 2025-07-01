'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/landing" className={styles.logoLink}>
          <div className={styles.logo}>
            <div className={styles.logoIconWrapper}>
              <span className={styles.codeBracket}>{"<"}</span>
              <span className={styles.codeSlash}>/</span>
              <span className={styles.codeBracket}>{">"}</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>Binary</span>
              <span className={styles.logoAccent}>Brains</span>
            </div>
          </div>
        </Link>

        <nav className={styles.nav}>
          {/* <div className={styles.navLinks}>
            <Link href="/learn" className={styles.navLink}>
              <FontAwesomeIcon icon={faGraduationCap} className={styles.navIcon} />
              <span>Learn</span>
            </Link>
          </div> */}
          
          <div className={styles.companyBadge}>
            <div className={styles.badgeContent}>
              <Image 
                src="/images/dattamsh-logo.png" 
                alt="DATTAMSH" 
                width={90} 
                height={20}
                className={styles.badgeLogo}
              />
              <span className={styles.badgeText}>DATTAMSH Software</span>
            </div>
          </div>
        </nav>

        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>

        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {/* <div className={styles.mobileNavLinks}>
            <Link href="/learn" className={styles.mobileNavLink}>
              <FontAwesomeIcon icon={faGraduationCap} className={styles.mobileNavIcon} />
              Learn
            </Link>
          </div> */}
        </div>
      </div>
    </header>
  );
} 
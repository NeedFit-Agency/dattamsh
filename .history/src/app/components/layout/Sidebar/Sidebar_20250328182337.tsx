'use client'; // Needed for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faHouse, // Removing - will use placeholder/image concept
  faDumbbell,
  faTrophy,       // Changed from faShieldHalved - closer to leaderboard icon shape
  faAward,        // Changed from faToolbox - closer to quests chest/award concept
  faStore,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'; // Import Image component for the Learn icon
import styles from './Sidebar.module.css';

// Define menu items - Updated icons and structure
const menuItems = [
  // Using a placeholder for the specific house icon - replace src with your actual path if you have the SVG/PNG
  { href: '/learn', iconImage: '/icons/learn-house.svg', text: 'LEARN', id: 'learn' },
  // Using text span for the Arabic letter placeholder
  { href: '#', iconPlaceholder: 'ض', text: 'LETTERS', id: 'letters', isPlaceholder: true, isSpecialChar: true },
  { href: '#', icon: faDumbbell, text: 'PRACTICE', id: 'practice' },
  { href: '#', icon: faTrophy, text: 'LEADERBOARDS', id: 'leaderboards' }, // Updated icon
  { href: '#', icon: faAward, text: 'QUESTS', id: 'quests' }, // Updated icon (Chest concept)
  { href: '#', icon: faStore, text: 'SHOP', id: 'shop' },
  // Using text span for the profile placeholder with specific class
  { href: '/profile', iconPlaceholder: 'A', text: 'PROFILE', id: 'profile', isPlaceholder: true, isProfile: true },
  { href: '#', icon: faEllipsis, text: 'MORE', id: 'more' },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Determine active page based on pathname
  const getActivePage = () => {
    if (pathname.startsWith('/learn')) return 'learn';
    if (pathname.startsWith('/profile')) return 'profile';
    // Add more conditions for other sections if needed
    // e.g., if (pathname.startsWith('/shop')) return 'shop';
    return ''; // Default no active page
  };
  const activePage = getActivePage();

  return (
    <nav className={styles.sidebar}>
      {/* Use an Image component for the logo if it's an SVG/PNG, otherwise text */}
      {/* <Image src="/logo-duolingo.svg" alt="Duolingo" width={150} height={40} className={styles.logoImage} /> */}
      {/* Or keep as text and style with CSS */}
      <div className={styles.logo}>duolingo</div>

      <ul className={styles.navList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            {/* Apply active class directly to the Link */}
            <Link href={item.href} className={`${styles.navLink} ${activePage === item.id ? styles.active : ''}`}>
              {/* Conditional rendering for different icon types */}
              {item.iconImage && (
                <span className={styles.iconWrapper}>
                  {/* If using Next/Image */}
                  <Image src={item.iconImage} alt="" width={28} height={28} className={styles.iconImage} />
                   {/* If using simple <img>
                   <img src={item.iconImage} alt="" className={styles.iconImage} />
                   */}
                </span>
              )}
              {item.icon && (
                <span className={styles.iconWrapper}>
                  <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                </span>
              )}
              {item.iconPlaceholder && (
                <span className={`${styles.iconWrapper} ${styles.iconPlaceholder} ${item.isProfile ? styles.profileIcon : ''} ${item.isSpecialChar ? styles.lettersIcon : ''}`}>
                  {item.iconPlaceholder}
                </span>
              )}
              <span className={styles.navText}>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
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
import styles from './Sidebar.module.css'; // Correct path to CSS module

// Define menu items - Updated icons and structure
const menuItems = [
  // Using a placeholder for the specific house icon - replace src with your actual path if you have the SVG/PNG
  // IMPORTANT: Make sure '/icons/learn-house.svg' exists in your /public/icons/ folder
  { href: '/learn', iconImage: '/icons/learn-house.svg', text: 'LEARN', id: 'learn' },
  // Using text span for the Arabic letter placeholder
  { href: '#', iconPlaceholder: 'ض', text: 'LETTERS', id: 'letters', isPlaceholder: true, isSpecialChar: true },
  { href: '/practice', icon: faDumbbell, text: 'PRACTICE', id: 'practice' }, // Example link update
  { href: '/leaderboards', icon: faTrophy, text: 'LEADERBOARDS', id: 'leaderboards' }, // Example link update
  { href: '/quests', icon: faAward, text: 'QUESTS', id: 'quests' }, // Example link update
  { href: '/shop', icon: faStore, text: 'SHOP', id: 'shop' }, // Example link update
  // Using text span for the profile placeholder with specific class
  { href: '/profile', iconPlaceholder: 'A', text: 'PROFILE', id: 'profile', isPlaceholder: true, isProfile: true },
  { href: '/more', icon: faEllipsis, text: 'MORE', id: 'more' }, // Example link update
];

export default function Sidebar() {
  const pathname = usePathname();

  // Determine active page based on pathname
  const getActivePage = () => {
    // More robust checks using startsWith
    if (pathname === '/learn' || pathname.startsWith('/learn/')) return 'learn';
    if (pathname === '/profile' || pathname.startsWith('/profile/')) return 'profile';
    if (pathname === '/practice' || pathname.startsWith('/practice/')) return 'practice';
    if (pathname === '/leaderboards' || pathname.startsWith('/leaderboards/')) return 'leaderboards';
    if (pathname === '/quests' || pathname.startsWith('/quests/')) return 'quests';
    if (pathname === '/shop' || pathname.startsWith('/shop/')) return 'shop';
    if (pathname === '/more' || pathname.startsWith('/more/')) return 'more';
    // Add more conditions for other sections like 'letters' if they become actual pages
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
                  {/* Using Next/Image */}
                  {/* Make sure width/height match desired render size */}
                  <Image src={item.iconImage} alt="" width={28} height={28} className={styles.iconImage} priority />
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
      {/* Add Footer/User info section here if needed */}
    </nav>
  );
}
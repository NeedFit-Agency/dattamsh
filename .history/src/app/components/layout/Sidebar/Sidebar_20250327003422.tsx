'use client'; // Needed for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faDumbbell,
  faShieldHalved, // Corrected icon name
  faToolbox,
  faStore,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.css';

// Define menu items
const menuItems = [
  { href: '/learn', icon: faHouse, text: 'LEARN', id: 'learn' },
  { href: '#', iconPlaceholder: 'ض', text: 'LETTERS', id: 'letters', isPlaceholder: true }, // Placeholder link
  { href: '#', icon: faDumbbell, text: 'PRACTICE', id: 'practice' }, // Placeholder link
  { href: '#', icon: faShieldHalved, text: 'LEADERBOARDS', id: 'leaderboards' }, // Placeholder link
  { href: '#', icon: faToolbox, text: 'QUESTS', id: 'quests' }, // Placeholder link
  { href: '#', icon: faStore, text: 'SHOP', id: 'shop' }, // Placeholder link
  { href: '/profile', iconPlaceholder: 'A', text: 'PROFILE', id: 'profile', isProfile: true },
  { href: '#', icon: faEllipsis, text: 'MORE', id: 'more' }, // Placeholder link
];

export default function Sidebar() {
  const pathname = usePathname();

   // Determine active page based on pathname
  const getActivePage = () => {
    if (pathname.startsWith('/learn')) return 'learn';
    if (pathname.startsWith('/profile')) return 'profile';
    // Add more conditions for other sections if needed
    return ''; // Default no active page
  };
  const activePage = getActivePage();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>duolingo</div>
      <ul className={styles.navList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <Link href={item.href} className={activePage === item.id ? styles.active : ''}>
              {item.icon && <FontAwesomeIcon icon={item.icon} className={styles.icon} />}
              {item.iconPlaceholder && !item.isProfile && (
                 <span className={`${styles.iconPlaceholder} ${item.id === 'letters' ? styles.lettersIcon : ''}`}>
                    {item.iconPlaceholder}
                 </span>
              )}
               {item.isProfile && (
                 <span className={`${styles.iconPlaceholder} ${styles.profileIcon}`}>
                    {item.iconPlaceholder}
                 </span>
               )}
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
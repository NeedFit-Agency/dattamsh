'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import StatsBar from '@/app/components/layout/StatsBar/StatsBar';
import styles from './page.module.css';

export default function HomePage() {
  const Standards = [
    {
      id: 1,
      title: '1st Standard',
      subtitle: 'Basic Computer Education',
      status: 'active',
      progress: '0/4',
      message: 'Learn about computers and technology!'
    },
    {
      id: 2,
      title: '2nd Standard',
      subtitle: 'A1 • SEE DETAILS',
      status: 'locked',
      progress: '0/4',
      units: '4 Chapters',
      message: 'Learn about computers and technology!'
    },
    {
      id: 3,
      title: '3rd Standard',
      subtitle: 'A1 • SEE DETAILS',
      status: 'locked',
      progress: '0/4',
      units: '4 Chapters',
      message: 'Learn about computers and technology!'
    },
    {
      id: 4,
      title: '4th Standard',
      subtitle: 'A1 • SEE DETAILS',
      status: 'locked',
      progress: '0/4',
      units: '4 Chapters',
    }
  ];

  return (
    <div className={styles.container}>
      {/* <div className={styles.topBar}>
        <StatsBar streak={1} gems={234} hearts={2} />
      </div> */}
      
      <main className={styles.main}>
        <div className={styles.StandardList}>
          {Standards.map((Standard) => (
            <div key={Standard.id} className={styles.StandardCard}>
              <Link 
                href={Standard.status === 'active' ? `/learn/${Standard.id}/chapter/1` : '#'} 
                className={`${styles.StandardLink} ${Standard.status === 'locked' ? styles.locked : ''}`}
              >
                <div className={styles.StandardHeader}>
                  <div className={styles.StandardInfo}>
                    <div className={styles.subtitle}>{Standard.subtitle}</div>
                    <h2 className={styles.title}>{Standard.title}</h2>
                  </div>
                  {Standard.status === 'locked' && (
                    <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
                  )}
                </div>
                
                <div className={styles.StandardDetails}>
                  {Standard.status === 'active' ? (
                    <div className={styles.progress}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '0%' }}></div>
                      </div>
                      <span>{Standard.progress}</span>
                    </div>
                  ) : (
                    <div className={styles.units}>{Standard.units}</div>
                  )}
                </div>

                <div className={styles.message}>
                  {Standard.message}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { LearningSlide as LearningSlideType } from './types';
import styles from '@/app/learning/learning.module.css';

interface LearningSlideProps {
  content: LearningSlideType;
  isAudioPlaying: boolean;
  onPlayAudio: () => void;
}

export default function LearningSlide({ 
  content, 
  isAudioPlaying, 
  onPlayAudio 
}: LearningSlideProps) {
  return (
    <div className={styles.learningSlideLayout}>
      {/* Visual Column */}
      {(content.imageUrl || content.exampleImages) && (
        <div className={styles.learningVisualColumn}>
          {content.imageUrl && (
            <motion.img
              src={content.imageUrl}
              alt={content.title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          )}
          {content.exampleImages && !content.imageUrl && (
            <div className={styles.exampleImageContainer}>
              {content.exampleImages.map((img, i) => (
                <div
                  key={i}
                  className={styles.tooltipWrapper}
                  data-tooltip={img.alt}
                  style={{ '--image-index': i } as any}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className={styles.exampleImage}
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 10,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Text Column (Mascot + Speech) */}
      <div className={styles.learningTextColumn}>
        <div className={styles.mascotContainer}>
          <div className={styles.mascotSpeechBubble}>
            {Array.isArray(content.description) ? (
              content.description.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{content.description}</p>
            )}
            {(content.audioSrc || content.speakText) && (
              <button
                className={`${styles.audioButton} ${
                  isAudioPlaying ? styles.audioButtonPlaying : ''
                }`}
                onClick={onPlayAudio}
                title={isAudioPlaying ? 'Stop' : 'Listen'}
              >
                <FontAwesomeIcon icon={faHeadphones} />{' '}
                {isAudioPlaying ? 'Listening...' : 'Listen'}
              </button>
            )}
          </div>
          <div className={styles.mascotImageContainer}>
            <motion.img
              src="/images/mascot.png"
              alt="Owlbert Mascot"
              className={styles.mascotImage}
              initial={{ y: 0 }}
              animate={{
                y: [-10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.3,
                },
              }}
              whileHover={{
                scale: 1.1,
                rotate: [-5, 5, -5, 5, 0],
                transition: {
                  rotate: {
                    duration: 0.5,
                    ease: 'easeInOut',
                  },
                },
              }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
        </div>
        {content.imageUrl && content.exampleImages && (
          <div className={styles.exampleImageContainer}>
            {content.exampleImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className={styles.exampleImage}
                title={img.alt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
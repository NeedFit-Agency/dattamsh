'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Flashcard.module.css'

interface FlashcardProps {
  imageUrl: string;
  cardName: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ imageUrl, cardName }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        onClick={() => setFlipped(f => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ perspective: 1000 }}
      >
        <div className={styles.cardInner} style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}>
          <div className={styles.cardFront}>
            <img src={imageUrl} alt="Flashcard" className={styles.image} />
          </div>
          <div className={styles.cardBack}>
            <span className={styles.cardText}>{cardName}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Flashcard
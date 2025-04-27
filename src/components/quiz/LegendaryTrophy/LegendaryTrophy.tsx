'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LegendaryTrophy.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function LegendaryTrophy() {
  return (
    <motion.div 
      className={styles.trophy}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 
      }}
    >
      <div className={styles.trophyIcon}>
        <FontAwesomeIcon icon={faTrophy} size="3x" />
      </div>
      <div className={styles.glow}></div>
      <motion.div 
        className={styles.ray1}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div 
        className={styles.ray2}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      ></motion.div>
    </motion.div>
  );
}
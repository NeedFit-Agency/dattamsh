'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FlappyBird.module.css';

/**
 * Generates a circular cursor as a data URL using HTML5 Canvas.
 * @param {string} fillColor - The fill color of the circle.
 * @param {string} strokeColor - The border color of the circle.
 * @param {number} size - The width and height of the cursor canvas.
 * @returns {string} - The data URL for the generated cursor image.
 */
const generateCircularCursor = (
  fillColor = 'white',
  strokeColor = 'black',
  size = 32
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 2; // Radius with a little padding

  // Draw the cursor circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  return canvas.toDataURL('image/png');
};

const FlappyBird = () => {
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate the custom cursor
    const cursorUrl = generateCircularCursor();
    const hotspot = 16; // Center of the 32x32 canvas

    // Store the original cursor style
    const originalCursor = document.body.style.cursor;

    // Apply the custom cursor to the body
    if (cursorUrl) {
      document.body.style.cursor = `url(${cursorUrl}) ${hotspot} ${hotspot}, auto`;
    }

    const gameCanvas = gameCanvasRef.current;
    if (gameCanvas) {
      const context = gameCanvas.getContext('2d');
      // Placeholder for game logic
      if (context) {
        context.fillStyle = '#87CEEB'; // Sky blue background
        context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        context.fillStyle = 'black';
        context.font = '20px sans-serif';
        context.fillText('Flappy Typing Game Canvas', 50, 50);
      }
    }

    // Cleanup function to restore the original cursor when the component unmounts
    return () => {
      document.body.style.cursor = originalCursor || 'default';
    };
  }, []);

  return (
    <div className={styles.gameContainer}>
      <canvas
        ref={gameCanvasRef}
        width="800"
        height="600"
        className={styles.gameCanvas}
      />
    </div>
  );
};

export default FlappyBird;

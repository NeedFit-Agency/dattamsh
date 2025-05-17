'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInteractionTracking } from '../../hooks/useInteractionTracking';
import styles from './SampleGame.module.css';

interface SampleGameProps {
  gameId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in seconds
}

export const SampleGame: React.FC<SampleGameProps> = ({
  gameId,
  difficulty,
  timeLimit = 60
}) => {
  // Game state
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [gameCompleted, setGameCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playCountRef = useRef(0);
  
  // Initialize tracking for this game module
  const { 
    trackGame, 
    trackError, 
    trackComplete,
    startTimeTracking,
    stopTimeTracking,
    getErrorCount
  } = useInteractionTracking({
    contentId: gameId,
    contentType: 'game_module',
    autoTrackView: true,
    trackTimeSpent: true
  });
  
  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setErrors(0);
    setTimeRemaining(timeLimit);
    setGameCompleted(false);
    playCountRef.current += 1;
    
    // Track game start with metadata
    trackGame({ 
      difficulty, 
      playCount: playCountRef.current,
      timeLimit
    });
    
    // Start time tracking
    startTimeTracking();
    
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // End the game
  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsPlaying(false);
    setGameCompleted(true);
    
    // Track game completion with metadata
    trackComplete({ 
      score, 
      errors, 
      difficulty,
      playCount: playCountRef.current,
      completed: true
    });
    
    // Stop time tracking
    stopTimeTracking();
  };
  
  // Handle correct answer
  const handleCorrectAnswer = () => {
    setScore(prev => prev + 1);
  };
  
  // Handle incorrect answer
  const handleIncorrectAnswer = (errorType: string) => {
    setErrors(prev => prev + 1);
    
    // Track the error with metadata
    trackError(errorType, { 
      score, 
      difficulty,
      timeRemaining
    });
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // If game is still in progress when component unmounts,
      // track the final state
      if (isPlaying) {
        trackComplete({ 
          score, 
          errors, 
          difficulty,
          playCount: playCountRef.current,
          completed: false,
          interrupted: true
        });
        stopTimeTracking();
      }
    };
  }, [isPlaying, score, errors, difficulty, trackComplete, stopTimeTracking]);
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Sample Game</h2>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Errors: {errors}</span>
          <span>Time: {timeRemaining}s</span>
        </div>
      </div>
      
      <div className="game-content">
        {!isPlaying && !gameCompleted && (
          <button onClick={startGame}>Start Game</button>
        )}
        
        {isPlaying && (
          <div className="game-play-area">
            {/* Game content would go here */}
            <button onClick={handleCorrectAnswer}>Correct Answer</button>
            <button onClick={() => handleIncorrectAnswer('wrong_answer')}>Wrong Answer</button>
            <button onClick={() => handleIncorrectAnswer('timeout')}>Simulate Timeout</button>
            <button onClick={endGame}>End Game</button>
          </div>
        )}
        
        {gameCompleted && (
          <div className="game-results">
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
            <p>Errors: {errors}</p>
            <p>Total Error Count: {getErrorCount()}</p>
            <p>Times Played: {playCountRef.current}</p>
            <button onClick={startGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleGame;
import React, { useRef, useState, useEffect } from 'react';
import styles from './Choose.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '../../ui/ProgressBar/ProgressBar';
import CongratulationsScreen from '../../shared/CongratulationsScreen';

interface MatchItem {
  id: string;
  label: string;
  color: string;
}

interface Connection {
  leftId: string;
  rightId: string;
}

const leftItems: MatchItem[] = [
  { id: 'input', label: '🖱️ INPUT', color: '#FF6B6B' },
  { id: 'process', label: '⚙️ PROCESS', color: '#4ECDC4' },
  { id: 'output', label: '📄 OUTPUT', color: '#45B7D1' },
];

const rightItems: MatchItem[] = [
  { id: 'click', label: '🖱️ Click print button', color: '#FF6B6B' },
  { id: 'computer', label: '💻 Computer sends to printer', color: '#4ECDC4' },
  { id: 'paper', label: '📋 Paper comes out', color: '#45B7D1' },
];

const correctMatches: Record<string, string> = {
  'input': 'click',
  'process': 'computer', 
  'output': 'paper',
};

interface KidsMatchingGameProps {
  onBack?: () => void;
  onComplete?: (() => void) | { href: string };
  isLastLesson?: boolean;
}

const KidsMatchingGame: React.FC<KidsMatchingGameProps> = ({ onBack, onComplete, isLastLesson = false }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{id: string, x: number, y: number} | null>(null);
  const [dragEnd, setDragEnd] = useState<{x: number, y: number} | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const rightRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Get box center coordinates
  const getBoxCenter = (element: HTMLDivElement) => {
    if (!element || !containerRef.current) return { x: 0, y: 0 };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    };
  };

  // Handle mouse/touch start on left items
  const handleDragStart = (itemId: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    // Don't allow dragging if already connected
    if (connections.some(conn => conn.leftId === itemId)) return;
    
    const element = leftRefs.current[itemId];
    if (!element) return;
    
    const center = getBoxCenter(element);
    setDragStart({ id: itemId, x: center.x, y: center.y });
    setIsDragging(true);
    setDragEnd(null);
    
    // Add global event listeners
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStart || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragEnd({
      x: clientX - containerRect.left,
      y: clientY - containerRect.top,
    });

    // Check if hovering over a right item
    let hoveredTarget: string | null = null;
    Object.entries(rightRefs.current).forEach(([id, element]) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (
        clientX >= rect.left - 20 &&
        clientX <= rect.right + 20 &&
        clientY >= rect.top - 20 &&
        clientY <= rect.bottom + 20
      ) {
        hoveredTarget = id;
      }
    });
    setDragOverTarget(hoveredTarget);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStart) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;

    // Check if dropped on a right item
    let targetId: string | null = null;
    Object.entries(rightRefs.current).forEach(([id, element]) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (
        clientX >= rect.left - 30 &&
        clientX <= rect.right + 30 &&
        clientY >= rect.top - 30 &&
        clientY <= rect.bottom + 30
      ) {
        targetId = id;
      }
    });

    // Make connection if valid target and not already connected
    if (targetId && !connections.some(conn => conn.rightId === targetId)) {
      const newConnection = { leftId: dragStart.id, rightId: targetId };
      setConnections(prev => [...prev, newConnection]);
      
      // Play success sound effect (if you have audio)
      // new Audio('/success-sound.mp3').play().catch(() => {});
    }

    // Cleanup
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
    setDragOverTarget(null);
    
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
  };

  // Check if game is complete and correct
  const isComplete = connections.length === leftItems.length;
  const isAllCorrect = isComplete && connections.every(conn => 
    correctMatches[conn.leftId] === conn.rightId
  );
  // Show celebration when all correct
  useEffect(() => {
    if (isAllCorrect) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setShowCongratulations(true);
      }, 2000);
    }
  }, [isAllCorrect]);

  useEffect(() => {
    if (isAllCorrect && onComplete) {
      onComplete();
    }
  }, [isAllCorrect, onComplete]);

  const handleReset = () => {
    setConnections([]);
    setShowCelebration(false);
    setShowCongratulations(false);
  };

  const removeConnection = (leftId: string) => {
    setConnections(prev => prev.filter(conn => conn.leftId !== leftId));
  };

  const isConnected = (itemId: string, side: 'left' | 'right') => {
    return connections.some(conn => 
      side === 'left' ? conn.leftId === itemId : conn.rightId === itemId
    );
  };

  const getConnectionColor = (leftId: string) => {
    const leftItem = leftItems.find(item => item.id === leftId);
    return leftItem?.color || '#666';
  };

  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof window !== 'undefined') window.history.back();
  };

  return (
    <div className={styles.chooseBg}>
      <CongratulationsScreen
        isVisible={showCongratulations}
        onButtonClick={onComplete ? onComplete : handleReset}
        onTryAgainClick={handleReset}
        showTryAgain={true}
        buttonText={isLastLesson ? 'Finish Course' : 'Next Lesson'}
        tryAgainText="Play Again"
      />
      <div 
        ref={containerRef}
        className={styles.chooseCard}
        style={{ minHeight: '600px' }}
      >
        {/* Back Button */}
        <button 
          className={styles.chooseBackButton}
          onClick={handleBack}
          aria-label="Go back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className={styles.backText}>Back</span>
        </button>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.titleRow}>
            <span className={styles.chooseTitle}>Match the Computer Steps!</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className={styles.progressBarWrapper}>
          <ProgressBar progress={connections.length / leftItems.length * 100} />
        </div>
        {/* Game area */}
        <div className={styles.chooseColumns}>
          {/* Left column */}
          <div className={styles.chooseColumn}>
            <h2 className={styles.chooseColumnTitle}>
              Options 1
            </h2>
            {leftItems.map((item) => (
              <div
                key={item.id}
                ref={el => { leftRefs.current[item.id] = el; }}
                className={[
                  styles.chooseBox,
                  isConnected(item.id, 'left') && styles['chooseBox--matched'],
                  connections.some(conn => conn.leftId === item.id && correctMatches[conn.leftId] !== conn.rightId) && styles['chooseBox--wrong'],
                ].filter(Boolean).join(' ')}
                style={{ 
                  borderColor: isConnected(item.id, 'left') ? '#4ade80' : item.color,
                  touchAction: 'none'
                }}
                onMouseDown={handleDragStart(item.id)}
                onTouchStart={handleDragStart(item.id)}
              >
                {item.label}
                {isConnected(item.id, 'left') && (
                  <button
                    onClick={() => removeConnection(item.id)}
                    className={styles.chooseRemoveBtn}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className={styles.chooseColumn}>
            <h2 className={styles.chooseColumnTitle} style={{ color: '#2d7a46' }}>
                Options 2
            </h2>
            {rightItems.map((item) => (
              <div
                key={item.id}
                ref={el => { rightRefs.current[item.id] = el; }}
                className={[
                  styles.chooseBox,
                  isConnected(item.id, 'right') && styles['chooseBox--matched'],
                  connections.some(conn => conn.rightId === item.id && correctMatches[conn.leftId] !== conn.rightId) && styles['chooseBox--wrong'],
                  dragOverTarget === item.id && styles['chooseBox--hovered'],
                ].filter(Boolean).join(' ')}
                style={{ 
                  borderColor: isConnected(item.id, 'right') ? '#4ade80' : item.color,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* SVG for connection lines */}
        <svg className={styles.chooseSvg}>
          {/* Existing connections */}
          {connections.map((conn, index) => {
            const leftElement = leftRefs.current[conn.leftId];
            const rightElement = rightRefs.current[conn.rightId];
            
            if (!leftElement || !rightElement) return null;
            
            const leftCenter = getBoxCenter(leftElement);
            const rightCenter = getBoxCenter(rightElement);
            const color = getConnectionColor(conn.leftId);
            const isCorrect = correctMatches[conn.leftId] === conn.rightId;
            
            return (
              <g key={index}>
                <line
                  x1={leftCenter.x}
                  y1={leftCenter.y}
                  x2={rightCenter.x}
                  y2={rightCenter.y}
                  stroke={isCorrect ? '#10b981' : '#ef4444'}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle
                  cx={leftCenter.x}
                  cy={leftCenter.y}
                  r="8"
                  fill={color}
                  stroke="white"
                  strokeWidth="3"
                />
                <circle
                  cx={rightCenter.x}
                  cy={rightCenter.y}
                  r="8"
                  fill={color}
                  stroke="white"
                  strokeWidth="3"
                />
              </g>
            );
          })}
          {/* Active drag line */}
          {isDragging && dragStart && dragEnd && (
            <line
              x1={dragStart.x}
              y1={dragStart.y}
              x2={dragEnd.x}
              y2={dragEnd.y}
              stroke="#6366f1"
              strokeWidth="6"
              strokeDasharray="10 5"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Feedback messages */}
        {isComplete && (
          <div className={isAllCorrect ? styles.chooseFeedbackSuccess : styles.chooseFeedbackError}>
            <div style={{ fontSize: isAllCorrect ? '3rem' : '2rem', marginBottom: '0.5em' }}>{isAllCorrect ? '🎉' : '🤔'}</div>
            <h3>
              {isAllCorrect ? 'Amazing Job!' : 'Almost there!'}
            </h3>
            <p>
              {isAllCorrect
                ? 'You matched all the computer steps perfectly!'
                : 'Some connections need to be fixed. Try again!'}
            </p>
            <button
              onClick={handleReset}
              className={styles.chooseResetButton}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Celebration animation */}
        {showCelebration && (
          <div className={styles.chooseCelebration}>
            <div style={{ fontSize: '6rem' }}>🎊</div>
          </div>
        )}

        {/* Instructions */}
        <div className={styles.chooseInstructions}>
          <p>            <strong>Tip:</strong> Drag from the left boxes to the right boxes to make connections!
          </p>
          <p>
            Click the ✕ button to remove a connection
          </p>        </div>

        <button 
          className={styles.resetButton}
          onClick={handleReset}
        >
          Reset Connections
        </button>
      </div>
    </div>
  );
};

export default KidsMatchingGame;
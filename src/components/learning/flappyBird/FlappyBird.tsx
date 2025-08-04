import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './FlappyBird.module.css';

// --- Game Constants ---
const GRAVITY = 0.10;
const FLAP_POWER = -6;
const ERROR_DROP = 2;
const BIRD_SPEED = 1;
const PIPE_WIDTH = 80;
const PIPE_GAP = 180;
const BIRD_RADIUS = 20;
const GROUND_HEIGHT = 60;
const SKY_COLOR = '#87CEEB';
const PIPE_COLOR = '#4fc3f7';
const PIPE_BORDER = '#222';
const BIRD_COLOR = '#fff';
const BIRD_STROKE = '#e04848';
const FONT_FAMILY = 'Arial, sans-serif';

// 2-letter combinations
const LETTER_PAIRS = [
  'ab', 'ac', 'ad', 'ag', 'al', 'am', 'an', 'ap', 'ar', 'as', 'at', 'ax', 'ay',
  'ba', 'be', 'bi', 'bo', 'by', 'ca', 'co', 'da', 'de', 'do', 'ed', 'el', 'em',
  'en', 'er', 'es', 'et', 'ex', 'fa', 'go', 'ha', 'he', 'hi', 'ho', 'id', 'if',
  'in', 'is', 'it', 'la', 'lo', 'ma', 'me', 'my', 'no', 'of', 'oh', 'ok', 'on',
  'or', 'ox', 'pa', 're', 'so', 'to', 'up', 'us', 'we', 'yo'
];

type Pipe = {
  x: number;
  gapY: number;
  letters: string;
  completed: boolean;
};

type Bird = {
  x: number;
  y: number;
  velocity: number;
};

function getRandomLetters() {
  return LETTER_PAIRS[Math.floor(Math.random() * LETTER_PAIRS.length)];
}

function getRandomGapY(canvasHeight: number): number {
  const min = 100;
  const max = canvasHeight - GROUND_HEIGHT - PIPE_GAP - 100;
  return Math.floor(Math.random() * (max - min)) + min;
}

const GAME_STATES = {
  START: 'start',
  READY: 'ready', // Bird is still, waiting for first key
  PLAYING: 'playing',
  GAMEOVER: 'gameover',
  COMPLETE: 'complete', // 10 pipes cleared
};

const FlappyBird = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [score, setScore] = useState(0);
  const [typed, setTyped] = useState('');
  const [currentTarget, setCurrentTarget] = useState('');
  const [inputError, setInputError] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 520 });
  const [nextMilestone, setNextMilestone] = useState(10);
  
  // Game objects
  const bird = useRef<Bird>({ x: 100, y: 260, velocity: 0 });
  const pipes = useRef<Pipe[]>([]);
  const animationRef = useRef<number | null>(null);
  const gameRunning = useRef(false);
  const lastPipeX = useRef(0);

  // Preload bird image
  const birdImgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/flying.png';
    birdImgRef.current = img;
  }, []);

  // Responsive canvas
  useEffect(() => {
    function handleResize() {
      const w = Math.min(window.innerWidth - 32, 800);
      const h = Math.min(window.innerHeight - 120, 520);
      setCanvasSize({ width: w, height: h });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start/restart game
  const startGame = useCallback(() => {
    setScore(0);
    setTyped('');
    setInputError(false);
    bird.current = { x: 100, y: canvasSize.height / 2, velocity: 0 };
    lastPipeX.current = 0;
    
    // Create initial pipes
    pipes.current = [];
    for (let i = 0; i < 5; i++) {
      const x = 400 + (i * 250);
      pipes.current.push({
        x: x,
        gapY: getRandomGapY(canvasSize.height),
        letters: getRandomLetters(),
        completed: false,
      });
    }
    
    // Set first target
    setCurrentTarget(pipes.current[0]?.letters || '');
    gameRunning.current = false;
    setGameState(GAME_STATES.READY);
  }, [canvasSize.height]);

  // Get next pipe that needs to be completed
  const getNextPipe = useCallback(() => {
    return pipes.current.find(pipe => 
      !pipe.completed && pipe.x > bird.current.x - 50
    );
  }, []);

  // Draw the current frame (bird, pipes, etc.) without updating physics
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Draw ---
    // Clear and draw sky
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Camera offset (bird fixed at 150px)
    const cameraOffset = bird.current.x - 150;

    // Draw pipes (with camera offset)
    pipes.current.forEach(pipe => {
      const screenX = pipe.x - cameraOffset;
      if (screenX > -PIPE_WIDTH && screenX < canvasSize.width + PIPE_WIDTH) {
        // Top pipe
        ctx.fillStyle = pipe.completed ? '#90EE90' : PIPE_COLOR;
        ctx.strokeStyle = PIPE_BORDER;
        ctx.lineWidth = 3;
        ctx.fillRect(screenX, 0, PIPE_WIDTH, pipe.gapY);
        ctx.strokeRect(screenX, 0, PIPE_WIDTH, pipe.gapY);
        // Bottom pipe
        const bottomPipeY = pipe.gapY + PIPE_GAP;
        const bottomPipeHeight = canvasSize.height - bottomPipeY - GROUND_HEIGHT;
        ctx.fillRect(screenX, bottomPipeY, PIPE_WIDTH, bottomPipeHeight);
        ctx.strokeRect(screenX, bottomPipeY, PIPE_WIDTH, bottomPipeHeight);
        // Letters on pipe
        ctx.font = 'bold 24px ' + FONT_FAMILY;
        ctx.fillStyle = pipe.completed ? '#006400' : '#222';
        ctx.textAlign = 'center';
        ctx.fillText(pipe.letters, screenX + PIPE_WIDTH / 2, Math.max(pipe.gapY - 15, 30));
      }
    });

    // Draw bird image (always at fixed screen position)
    const birdScreenX = 150;
    const birdImg = birdImgRef.current;
    if (birdImg && birdImg.complete) {
      ctx.save();
      ctx.translate(birdScreenX, bird.current.y);
      ctx.drawImage(
        birdImg,
        -BIRD_RADIUS,
        -BIRD_RADIUS,
        BIRD_RADIUS * 2,
        BIRD_RADIUS * 2
      );
      ctx.restore();
    } else {
      // fallback: draw a circle if image not loaded
      ctx.save();
      ctx.translate(birdScreenX, bird.current.y);
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = BIRD_COLOR;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = BIRD_STROKE;
      ctx.stroke();
      ctx.restore();
    }

    // Draw ground (scrolling)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvasSize.height - GROUND_HEIGHT, canvasSize.width, GROUND_HEIGHT);

    // Draw typed letters above bird (should be empty in READY)
    if (typed) {
      ctx.font = 'bold 28px ' + FONT_FAMILY;
      ctx.textAlign = 'center';
      ctx.fillStyle = inputError ? '#ff0000' : '#00ff00';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText(typed, birdScreenX, bird.current.y - BIRD_RADIUS - 25);
      ctx.fillText(typed, birdScreenX, bird.current.y - BIRD_RADIUS - 25);
    }

    // Draw current target at top
    if (currentTarget) {
      ctx.font = 'bold 36px ' + FONT_FAMILY;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.strokeText(`Type: ${currentTarget}`, canvasSize.width / 2, 50);
      ctx.fillText(`Type: ${currentTarget}`, canvasSize.width / 2, 50);
    }

    // Draw score
    ctx.font = 'bold 24px ' + FONT_FAMILY;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.textAlign = 'right';
    ctx.strokeText(`Score: ${score}`, canvasSize.width - 20, 90);
    ctx.fillText(`Score: ${score}`, canvasSize.width - 20, 90);

    // Draw distance traveled
    const distance = Math.floor(bird.current.x / 10);
    ctx.textAlign = 'left';
    ctx.strokeText(`Distance: ${distance}m`, 20, 90);
    ctx.fillText(`Distance: ${distance}m`, 20, 90);
  }, [canvasSize, score, typed, inputError, currentTarget]);

  // Main game loop
  const gameLoop = useCallback(() => {
    if (!gameRunning.current) return;

    // --- Update Physics ---
    // Bird moves horizontally automatically
    bird.current.x += BIRD_SPEED;

    // Apply gravity and velocity
    bird.current.velocity += GRAVITY;
    bird.current.y += bird.current.velocity;

    // Move world relative to bird (camera follow)
    const cameraOffset = bird.current.x - 150;

    // Add new pipes as needed
    const rightmostPipe = pipes.current.reduce((max, pipe) =>
      pipe.x > max ? pipe.x : max, 0
    );

    if (rightmostPipe < bird.current.x + 800) {
      pipes.current.push({
        x: rightmostPipe + 250,
        gapY: getRandomGapY(canvasSize.height),
        letters: getRandomLetters(),
        completed: false,
      });
    }

    // Remove pipes that are far behind
    pipes.current = pipes.current.filter(pipe =>
      pipe.x > bird.current.x - 200
    );

    // Update current target
    const nextPipe = getNextPipe();
    if (nextPipe && nextPipe.letters !== currentTarget) {
      setCurrentTarget(nextPipe.letters);
      setTyped(''); // Reset typing when switching to new pipe
    }

    // --- Collision Detection ---
    let hit = false;

    // Ground/ceiling collision
    if (bird.current.y + BIRD_RADIUS > canvasSize.height - GROUND_HEIGHT ||
        bird.current.y - BIRD_RADIUS < 0) {
      hit = true;
    }

    // Pipe collision
    for (const pipe of pipes.current) {
      if (pipe.completed) continue;

      const birdLeft = bird.current.x - BIRD_RADIUS;
      const birdRight = bird.current.x + BIRD_RADIUS;
      const birdTop = bird.current.y - BIRD_RADIUS;
      const birdBottom = bird.current.y + BIRD_RADIUS;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      // Check horizontal overlap
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check vertical collision (top or bottom pipe)
        if (birdTop < pipe.gapY || birdBottom > pipe.gapY + PIPE_GAP) {
          hit = true;
          break;
        }
      }
    }

    if (hit) {
      gameRunning.current = false;
      setGameState(GAME_STATES.GAMEOVER);
      return;
    }

    drawFrame();
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [canvasSize, score, typed, inputError, currentTarget, getNextPipe, drawFrame]);

  // Game loop effect
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      gameLoop();
      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [gameState, gameLoop]);

  // Typing input handler
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle letter keys
      if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) return;
      
      const inputKey = e.key.toLowerCase();
      const targetIndex = typed.length;
      
      if (targetIndex >= currentTarget.length) return;
      
      const expectedChar = currentTarget[targetIndex];

      if (inputKey === expectedChar) {
        // Correct key - flap
        bird.current.velocity = FLAP_POWER;
        const newTyped = typed + inputKey;
        setTyped(newTyped);
        setInputError(false);

        // Check if 2-letter combination is complete
        if (newTyped === currentTarget) {
          // Mark current pipe as completed
          const nextPipe = getNextPipe();
          if (nextPipe) {
            nextPipe.completed = true;
            setScore(s => {
              const newScore = s + 1;
              if (newScore >= nextMilestone) {
                gameRunning.current = false;
                setGameState(GAME_STATES.COMPLETE);
              }
              return newScore;
            });
          }
          // Big flap for completion
          bird.current.velocity = FLAP_POWER * 1;
          setTyped('');
        }
      } else {
        // Wrong key - fall faster
        bird.current.velocity += ERROR_DROP;
        setInputError(true);
        setTimeout(() => setInputError(false), 300);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, typed, currentTarget, getNextPipe]);

  // READY state: wait for first valid key
  useEffect(() => {
    if (gameState !== GAME_STATES.READY) return;
    const handleFirstKey = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        gameRunning.current = true;
        setGameState(GAME_STATES.PLAYING);
      }
    };
    window.addEventListener('keydown', handleFirstKey);
    return () => window.removeEventListener('keydown', handleFirstKey);
  }, [gameState]);

  // In READY state, draw the initial frame so the bird and pipes are visible
  useEffect(() => {
    if (gameState === GAME_STATES.READY) {
      drawFrame();
    }
  }, [gameState, drawFrame]);

  // Handler for continuing the game after 10 pipes
  const handleContinue = useCallback(() => {
    setNextMilestone(m => m + 10);
    gameRunning.current = true;
    setGameState(GAME_STATES.PLAYING);
  }, []);

  // Handler for exiting to start screen
  const handleExit = useCallback(() => {
    setScore(0);
    setTyped('');
    setInputError(false);
    bird.current = { x: 100, y: canvasSize.height / 2, velocity: 0 };
    lastPipeX.current = 0;
    pipes.current = [];
    setCurrentTarget('');
    setNextMilestone(10);
    gameRunning.current = false;
    setGameState(GAME_STATES.START);
  }, [canvasSize.height]);

  // --- UI Screens ---
  if (gameState === GAME_STATES.START) {
    return (
      <div className={styles.overlay}>
        <div className={styles.title}>
          🐦 TYPEFLIGHT
        </div>
        <button className={styles.button} onClick={startGame}>
          START FLYING
        </button>
        <div className={styles.instruction}>
          Your bird flies forward automatically but falls due to gravity!<br/>
          Type the 2-letter combinations shown on pipes to flap and stay airborne.<br/>
          Correct letters = flap up • Wrong letters = fall faster<br/>
          Complete the pair before hitting the pipe!
        </div>
      </div>
    );
  }

  if (gameState === GAME_STATES.GAMEOVER) {
    const distance = Math.floor(bird.current.x / 10);
    return (
      <div className={styles.overlay}>
        <div className={styles.gameOverIcon} aria-label="Crashed Bird" role="img">🪶</div>
        <div className={styles.gameOverTitle}>CRASHED!</div>
        <div className={styles.gameOverStats}>Pipes Cleared: {score}</div>
        <div className={styles.gameOverDistance}>Distance: {distance}m</div>
        <button className={styles.gameOverButton} onClick={startGame}>
          FLY AGAIN
        </button>
      </div>
    );
  }

  if (gameState === GAME_STATES.COMPLETE) {
    const distance = Math.floor(bird.current.x / 10);
    return (
      <div className={styles.overlay}>
        <div className={styles.title} style={{ color: '#4fc3f7' }}>
          🎉 Congratulations
        </div>
        <div style={{ fontSize: '28px', color: '#222', margin: '10px' }}>
          You cleared {nextMilestone} pipes!
        </div>
        <div style={{ fontSize: '24px', color: '#222', margin: '10px' }}>
          Distance: {distance}m
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
          <button className={styles.button} onClick={handleContinue}>
            CONTINUE GAME
          </button>
          <button className={styles.button} onClick={handleExit}>
            EXIT
          </button>
        </div>
      </div>
    );
  }

  // READY state: render the main game screen (canvas, etc.) exactly as in PLAYING, with no overlay or message
  if (gameState === GAME_STATES.READY) {
    return (
      <div className={styles.gameContainer}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className={styles.gameCanvas}
          tabIndex={0}
        />
      </div>
    );
  }

  // Main game screen
  return (
    <div className={styles.gameContainer}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={styles.gameCanvas}
        tabIndex={0}
      />
    </div>
  );
};

export default FlappyBird;
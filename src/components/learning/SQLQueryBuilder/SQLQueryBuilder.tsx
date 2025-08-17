'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SQLQueryBuilder.module.css';
import { SQLQueryBuilderProps, SQLCommand } from './types';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import WrongAnswerDialog from './WrongAnswerDialog';

interface PuzzlePiece {
  id: string;
  content: string;
  category: string;
  color: string;
  icon: string;
  description: string;
  order: number;
  isPlaced: boolean;
}

const SQLQueryBuilder: React.FC<SQLQueryBuilderProps> = ({
  title = "🧩 SQL Table Puzzle Builder",
  instruction,
  items = [],
  correctOrder = [],
  onComplete,
  onIncorrectAttempt,
  isLastLesson = false,
  audioSrc,
  speakText,
  standard,
  isFourthChapter = false,
}) => {
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<PuzzlePiece[]>([]);
  const [showCongratulations, setShowCongratulations] = useState<boolean>(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Initialize puzzle pieces with CREATE TABLE steps
  useEffect(() => {
    const createTablePieces: PuzzlePiece[] = [
      {
        id: 'create',
        content: 'CREATE TABLE',
        category: 'START',
        color: '#3B82F6',
        icon: '🏗️',
        description: 'Start building your table',
        order: 1,
        isPlaced: false
      },
      {
        id: 'tableName',
        content: 'students',
        category: 'NAME',
        color: '#10B981',
        icon: '📝',
        description: 'Give your table a name',
        order: 2,
        isPlaced: false
      },
      {
        id: 'columns',
        content: '(id, name, age)',
        category: 'COLUMNS',
        color: '#F59E0B',
        icon: '📊',
        description: 'List the columns you want',
        order: 3,
        isPlaced: false
      },
      {
        id: 'dataTypes',
        content: 'INT, VARCHAR(50), INT',
        category: 'TYPES',
        color: '#8B5CF6',
        icon: '🔢',
        description: 'Choose data types',
        order: 4,
        isPlaced: false
      },
      {
        id: 'constraints',
        content: 'PRIMARY KEY, NOT NULL',
        category: 'RULES',
        color: '#EF4444',
        icon: '🔒',
        description: 'Add special rules',
        order: 5,
        isPlaced: false
      },
      {
        id: 'end',
        content: ');',
        category: 'FINISH',
        color: '#6B7280',
        icon: '✅',
        description: 'Finish your table',
        order: 6,
        isPlaced: false
      }
    ];
    setPuzzlePieces(createTablePieces);
  }, []);

  // Check if the current order is correct
  const checkAnswer = (): boolean => {
    if (placedPieces.length !== 6) return false;
    
    const correctOrder = ['create', 'tableName', 'columns', 'dataTypes', 'constraints', 'end'];
    const currentOrder = placedPieces
      .sort((a, b) => a.order - b.order)
      .map(piece => piece.id);
    
    return correctOrder.every((id, index) => id === currentOrder[index]);
  };

  // Handle piece drop
  const handlePieceDrop = (e: React.DragEvent, targetOrder: number) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('pieceId');
    const piece = puzzlePieces.find(p => p.id === pieceId);
    
    if (piece && !piece.isPlaced) {
      // Remove piece from its current position if it exists
      setPlacedPieces(prev => prev.filter(p => p.id !== pieceId));
      
      // Add piece to new position
      const updatedPiece = { ...piece, order: targetOrder + 1, isPlaced: true };
      setPlacedPieces(prev => [...prev, updatedPiece]);
      
      // Update puzzle pieces to mark as placed
      setPuzzlePieces(prev => 
        prev.map(p => p.id === pieceId ? { ...p, isPlaced: true } : p)
      );
    }
  };

  // Handle piece removal
  const handleRemovePiece = (piece: PuzzlePiece) => {
    setPlacedPieces(prev => prev.filter(p => p.id !== piece.id));
    setPuzzlePieces(prev => 
      prev.map(p => p.id === piece.id ? { ...p, isPlaced: false } : p)
    );
  };

  // Handle drag events
  const handlePieceDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    e.dataTransfer.setData('pieceId', piece.id);
  };

  const handlePieceDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };



  // Handle solution check
  const handleCheckSolution = () => {
    if (placedPieces.length !== 6) return;
    
    if (checkAnswer()) {
      setShowCongratulations(true);
      if (typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      setShowWrongAnswer(true);
      if (onIncorrectAttempt) {
        onIncorrectAttempt();
      }
    }
  };

  // Handle wrong answer dialog close
  const handleWrongAnswerClose = () => {
    setShowWrongAnswer(false);
  };

  // Handle try again from wrong answer dialog
  const handleTryAgain = () => {
    setShowWrongAnswer(false);
    // Reset the puzzle state
    setPlacedPieces([]);
    setPuzzlePieces(prev => prev.map(p => ({ ...p, isPlaced: false })));
    setShowHint(false);
  };



  if (showCongratulations) {
    return (
      <CongratulationsScreen
        isVisible={showCongratulations}
        message="Congratulations! You've built the SQL table correctly!"
        buttonText="Continue"
        onButtonClick={onComplete}
        isLastActivity={isLastLesson}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* Wrong Answer Dialog */}
      <WrongAnswerDialog
        isVisible={showWrongAnswer}
        onClose={handleWrongAnswerClose}
        onTryAgain={handleTryAgain}
        message="That's not quite right! Let's review the correct order."
        explanation="Remember the logical flow: Start with CREATE TABLE, add the table name, specify columns, define data types, add constraints, and finish with a semicolon."
      />

      {/* Puzzle Board */}
      <div className={styles.worksheetCard}>
        {/* Title inside the card */}
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>{title}</h1>
        </div>

        {/* Instructions */}
        <div className={styles.instructionBox}>
          <div className={styles.instruction}>
            {instruction || "Drag the puzzle pieces to build your CREATE TABLE statement in the correct order!"}
          </div>
        </div>
        {/* SQL Preview at Top */}
        <div className={styles.sqlPreviewTop}>
          <div className={styles.sqlCode}>
            {placedPieces.length === 0 ? (
              <div className={styles.emptySqlPreview}>
                <p>Start building your table by dragging pieces below!</p>
              </div>
            ) : (
              placedPieces
                .sort((a, b) => a.order - b.order)
                .map((piece, index) => (
                  <div key={piece.id} className={styles.sqlLine}>
                    <span className={styles.lineNumber}>{index + 1}</span>
                    <span className={styles.sqlText}>{piece.content}</span>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Main Puzzle Area - Full Width */}
        <div className={styles.puzzleArea}>
          {/* Sequence Area */}
          <div className={styles.sequenceArea}>
            <h3>🎯 Build Your SQL Table</h3>
            <div className={styles.sequenceSlots}>
              {Array.from({ length: 6 }, (_, index) => {
                const placedPiece = placedPieces.find(p => p.order === index + 1);
                return (
                  <div 
                    key={index}
                    className={`${styles.sequenceSlot} ${placedPiece ? styles.filled : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handlePieceDrop(e, index)}
                  >
                    {placedPiece ? (
                      <div className={styles.placedPiece}>
                        <div className={styles.pieceContent}>
                          <span className={styles.pieceIcon}>{placedPiece.icon}</span>
                          <span className={styles.pieceText}>{placedPiece.content}</span>
                        </div>
                        <button 
                          className={styles.removeButton}
                          onClick={() => handleRemovePiece(placedPiece)}
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      <div className={styles.emptySlot}>
                        <span className={styles.stepNumber}>Step {index + 1}</span>
                        <span className={styles.dropHint}>Drop piece here</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Pieces */}
          <div className={styles.availablePieces}>
            <h3>🧩 Available Puzzle Pieces</h3>
            <div className={styles.piecesContainer}>
              {puzzlePieces.map((piece) => (
                <div
                  key={piece.id}
                  className={`${styles.puzzlePiece} ${piece.isPlaced ? styles.placed : ''}`}
                  draggable={!piece.isPlaced}
                  onDragStart={(e) => handlePieceDragStart(e, piece)}
                  onDragEnd={handlePieceDragEnd}
                  style={{
                    '--piece-color': piece.color
                  } as React.CSSProperties}
                >
                  <div className={styles.pieceHeader}>
                    <span className={styles.pieceIcon}>{piece.icon}</span>
                    <span className={styles.pieceCategory}>{piece.category}</span>
                  </div>
                  <div className={styles.pieceBody}>
                    <span className={styles.pieceContent}>{piece.content}</span>
                  </div>
                  <div className={styles.pieceDescription}>
                    {piece.description}
                  </div>
                  <div className={styles.pieceConnectors}>
                    <div className={styles.connectorTop}></div>
                    <div className={styles.connectorBottom}></div>
                    <div className={styles.connectorLeft}></div>
                    <div className={styles.connectorRight}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.buttonGroup}>
          <button 
            className={styles.hintButton}
            onClick={() => setShowHint(!showHint)}
          >
            💡 Show Hint
          </button>
          <button 
            className={styles.checkButton}
            disabled={placedPieces.length !== 6}
            onClick={handleCheckSolution}
          >
            Check Solution
          </button>
        </div>
        
        {/* Hint Panel */}
        {showHint && (
          <div className={styles.hintPanel}>
            <h3>💡 Puzzle Tips</h3>
            <ul>
              <li>Start with <strong>CREATE TABLE</strong> 🏗️</li>
              <li>Add the table name <strong>students</strong> 📝</li>
              <li>List the columns <strong>(id, name, age)</strong> 📊</li>
              <li>Choose data types <strong>INT, VARCHAR(50), INT</strong> 🔢</li>
              <li>Add constraints <strong>PRIMARY KEY, NOT NULL</strong> 🔒</li>
              <li>Finish with <strong>);</strong> ✅</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SQLQueryBuilder;

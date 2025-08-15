'use client';

import React, { useState, useRef } from 'react';
import styles from './SQLQueryBuilder.module.css';
import { SQLQueryBuilderProps, SQLCommand } from './types';
import CongratulationsScreen from '../../shared/CongratulationsScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faCheckCircle, 
  faTimesCircle, 
  faUndo,
  faTable,
  faEye,
  faEdit,
  faTrash,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const SQLQueryBuilder: React.FC<SQLQueryBuilderProps> = ({
  title = "SQL Database Query Builder",
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

  const [placedCommands, setPlacedCommands] = useState<{
    [zoneIndex: number]: SQLCommand;
  }>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showCongratulations, setShowCongratulations] = useState<boolean>(false);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');
  
  const draggedElementRef = useRef<HTMLElement | null>(null);
  const dropZonesContainerRef = useRef<HTMLDivElement | null>(null);

  // Get available commands that haven't been placed
  const availableCommands = items.filter(
    (item) => !Object.values(placedCommands).some(
      (placedItem) => placedItem.id === item.id
    )
  );

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, command: SQLCommand) => {
    draggedElementRef.current = e.currentTarget as HTMLElement;
    e.dataTransfer.setData('text/plain', command.id);
    e.dataTransfer.effectAllowed = 'move';
    
    // Visual feedback
    (e.currentTarget as HTMLElement).style.opacity = '0.6';
    (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)';
    
    // Auto-scroll to drop zones immediately
    if (dropZonesContainerRef.current) {
      dropZonesContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget) {
      (e.currentTarget as HTMLElement).style.opacity = '1';
      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
    }
    draggedElementRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const dropZone = e.currentTarget as HTMLElement;
    dropZone.classList.add(styles.dragOver);
    
    // Real-time scrolling during drag
    if (dropZonesContainerRef.current) {
      const container = dropZonesContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const dropZoneRect = dropZone.getBoundingClientRect();
      const mouseY = e.clientY;
      
      // Calculate scroll speed based on mouse position
      const scrollThreshold = 50; // pixels from edge to trigger scroll
      const scrollSpeed = 15;
      
      // Scroll down if mouse is near bottom
      if (containerRect.bottom - mouseY < scrollThreshold) {
        container.scrollTop += scrollSpeed;
      }
      // Scroll up if mouse is near top
      else if (mouseY - containerRect.top < scrollThreshold) {
        container.scrollTop -= scrollSpeed;
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove(styles.dragOver);
  };

  const handleDrop = (e: React.DragEvent, zoneIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragOver);
    
    const commandId = e.dataTransfer.getData('text/plain');
    const command = items.find(item => item.id === commandId);
    
    if (command) {
      setPlacedCommands(prev => ({
        ...prev,
        [zoneIndex]: command
      }));
      
      // Add to query history
      setQueryHistory(prev => [...prev, `Step ${zoneIndex + 1}: ${command.content}`]);
      
      // Enhanced auto-scroll to next empty zone with better positioning
      setTimeout(() => {
        if (dropZonesContainerRef.current) {
          const nextEmptyZone = Array.from({ length: correctOrder.length }, (_, index) => index)
            .find(index => !placedCommands[index]);
          
          if (nextEmptyZone !== undefined) {
            const dropZones = dropZonesContainerRef.current.querySelectorAll(`.${styles.dropZone}`);
            if (dropZones[nextEmptyZone]) {
              // Scroll with better positioning
              dropZones[nextEmptyZone].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              });
              
              // Add a subtle highlight to the next zone
              dropZones[nextEmptyZone].classList.add(styles.nextZone);
              setTimeout(() => {
                dropZones[nextEmptyZone].classList.remove(styles.nextZone);
              }, 2000);
            }
          }
        }
      }, 300);
    }
  };

  const handleRemoveCommand = (zoneIndex: number) => {
    const removedCommand = placedCommands[zoneIndex];
    setPlacedCommands(prev => {
      const newPlaced = { ...prev };
      delete newPlaced[zoneIndex];
      return newPlaced;
    });
    
    // Remove from query history
    setQueryHistory(prev => prev.filter((_, index) => index !== zoneIndex));
  };

  const handleCheckAnswer = () => {
    // Don't check if no commands are placed
    if (Object.keys(placedCommands).length === 0) {
      return;
    }
    
    // Check if all commands are placed and in correct order
    const placedArray = Object.entries(placedCommands)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([, command]) => command);

    if (placedArray.length !== correctOrder.length) {
      onIncorrectAttempt?.();
      return;
    }

    const allCorrect = placedArray.every((command, index) => 
      command.id === correctOrder[index]
    );
    
    if (allCorrect) {
      setShowCongratulations(true);
      if (typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      onIncorrectAttempt?.();
    }
  };

  const handleReset = () => {
    setPlacedCommands({});
    setQueryHistory([]);
    setShowCongratulations(false); // Reset congratulations screen
  };

  const handleBackToBuilder = () => {
    setShowCongratulations(false);
    setPlacedCommands({});
    setQueryHistory([]);
  };

  const getCommandType = (content: string): string => {
    if (content.includes('CREATE TABLE')) return 'DDL';
    if (content.includes('INSERT INTO')) return 'DML';
    if (content.includes('UPDATE')) return 'DML';
    if (content.includes('DELETE FROM')) return 'DML';
    if (content.includes('SELECT')) return 'DQL';
    return 'SQL';
  };

  const getCommandIcon = (content: string) => {
    if (content.includes('CREATE TABLE')) return faTable;
    if (content.includes('INSERT INTO')) return faEdit;
    if (content.includes('UPDATE')) return faEdit;
    if (content.includes('DELETE FROM')) return faTrash;
    if (content.includes('SELECT')) return faSearch;
    return faCode;
  };

  const getCommandColor = (content: string): string => {
    if (content.includes('CREATE TABLE')) return '#3B82F6'; // Blue
    if (content.includes('INSERT INTO')) return '#10B981'; // Green
    if (content.includes('UPDATE')) return '#F59E0B'; // Yellow
    if (content.includes('DELETE FROM')) return '#EF4444'; // Red
    if (content.includes('SELECT')) return '#8B5CF6'; // Purple
    return '#6B7280'; // Gray
  };

  const renderQueryPreview = () => {
    const placedArray = Object.entries(placedCommands)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([, command]) => command);

    return (
      <div className={styles.queryPreview}>
        <h3>Generated SQL Query</h3>
        <div className={styles.queryCode}>
          {placedArray.length === 0 ? (
            <div className={styles.emptyQuery}>
              <FontAwesomeIcon icon={faCode} />
              <p>Drag and drop SQL commands to build your query</p>
            </div>
          ) : (
            placedArray.map((command, index) => (
              <div key={index} className={styles.queryLine}>
                <span className={styles.lineNumber}>{index + 1}</span>
                <span className={styles.queryText}>{command.content}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  if (showCongratulations) {
    return (
      <CongratulationsScreen
        isVisible={true}
        message="Great job! You've mastered SQL fundamentals."
        onButtonClick={onComplete}
        isLastActivity={isLastLesson}
      />
    );
  }

  return (
    <div className={styles.container}>
      {showHint && (
        <div className={styles.hintPanel}>
          <h3> SQL Query Building Tips</h3>
          <ul>
            <li>Always start with <strong>CREATE TABLE</strong> to define your database structure</li>
            <li>Use <strong>INSERT INTO</strong> to add data to your tables</li>
            <li><strong>UPDATE</strong> modifies existing records based on conditions</li>
            <li><strong>DELETE FROM</strong> removes records that match specific criteria</li>
            <li>End with <strong>SELECT</strong> to retrieve and display your results</li>
          </ul>
        </div>
      )}

      <div className={styles.mainContent}>
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'builder' ? styles.active : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <FontAwesomeIcon icon={faCode} />
            Query Builder
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'preview' ? styles.active : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <FontAwesomeIcon icon={faEye} />
            Query Preview
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'builder' && (
            <div className={styles.builderTab}>
              <div className={styles.instruction}>
                <p>{instruction}</p>
              </div>

              <div className={styles.workspace}>
                <div className={styles.dropZonesContainer} ref={dropZonesContainerRef}>
                  <h3>Query Sequence</h3>
                  <div className={styles.dropZones}>
                    {Array.from({ length: correctOrder.length }, (_, index) => (
                      <div
                        key={index}
                        className={`${styles.dropZone} ${
                          placedCommands[index] ? styles.filled : ''
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        {placedCommands[index] ? (
                          <div className={styles.placedCommand}>
                            <div className={styles.commandHeader}>
                              <span className={styles.stepNumber}>Step {index + 1}</span>
                              <button
                                className={styles.removeButton}
                                onClick={() => handleRemoveCommand(index)}
                                title="Remove command"
                              >
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                            </div>
                            <div className={styles.commandContent}>
                              <FontAwesomeIcon 
                                icon={getCommandIcon(placedCommands[index].content)}
                                style={{ color: getCommandColor(placedCommands[index].content) }}
                              />
                              <span className={styles.commandText}>
                                {placedCommands[index].content}
                              </span>
                            </div>
                            <div className={styles.commandType}>
                              {getCommandType(placedCommands[index].content)}
                            </div>
                          </div>
                        ) : (
                          <div className={styles.emptyZone}>
                            <span className={styles.stepNumber}>Step {index + 1}</span>
                            <span className={styles.dropHint}>Drop SQL command here</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.commandsPanel}>
                  <h3>Available SQL Commands</h3>
                  <div className={styles.availableCommands}>
                    {availableCommands.map((command, index) => {
                      const isPlaced = Object.values(placedCommands).some(
                        (placedItem) => placedItem.id === command.id
                      );
                      
                      return (
                        <div
                          key={command.id}
                          className={`${styles.commandItem} ${isPlaced ? styles.placed : ''}`}
                          draggable={!isPlaced}
                          data-id={command.id}
                          onDragStart={!isPlaced ? (e) => handleDragStart(e, command) : undefined}
                          onDragEnd={!isPlaced ? handleDragEnd : undefined}
                          style={{ 
                            '--item-index': index,
                            '--command-color': getCommandColor(command.content)
                          } as React.CSSProperties}
                        >
                          <div className={styles.commandHeader}>
                            <FontAwesomeIcon 
                              icon={getCommandIcon(command.content)}
                              className={styles.commandIcon}
                            />
                            <span className={styles.commandType}>
                              {getCommandType(command.content)}
                            </span>
                            {isPlaced && (
                              <span className={styles.placedIndicator}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                                Placed
                              </span>
                            )}
                          </div>
                          <div className={styles.commandContent}>
                            {command.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className={styles.previewTab}>
              {renderQueryPreview()}
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.actionButtons}>
          <button
            className={styles.resetButton}
            onClick={handleReset}
            title="Reset all commands"
          >
            <FontAwesomeIcon icon={faUndo} />
            Reset Query
          </button>
          <button
            className={`${styles.checkButton} ${
              Object.keys(placedCommands).length === correctOrder.length ? styles.active : ''
            }`}
            onClick={handleCheckAnswer}
            disabled={Object.keys(placedCommands).length !== correctOrder.length}
            title="Validate your SQL query sequence"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SQLQueryBuilder;

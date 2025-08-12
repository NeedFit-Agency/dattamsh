'use client';

import React, { useState, useCallback, useRef, useMemo } from 'react';
import styles from './CodeAnalysis.module.css';

interface DraggableItem {
  id: string;
  text: string;
  type: 'highlight-class' | 'inside-div';
  isPlaced: boolean;
  placedInBucket?: string;
}

interface Bucket {
  id: string;
  title: string;
  type: 'highlight-class' | 'inside-div';
  color: string;
  items: DraggableItem[];
}

interface CodeAnalysisProps {
  className?: string;
  title?: string;
  instruction?: string;
  items?: DraggableItem[];
  buckets?: Bucket[];
}

export const CodeAnalysis: React.FC<CodeAnalysisProps> = ({ 
  className, 
  title = 'Categorize HTML and CSS Elements',
  instruction = 'Observe the code below and categorize the elements based on whether they are inside the <div> element and whether they have the highlight class applied.',
  items: initialItems,
  buckets: initialBuckets
}) => {
  // Initialize with default data if none provided - using useMemo to prevent unnecessary re-renders
  const defaultItems: DraggableItem[] = useMemo(() => initialItems || [
    { id: 'color', text: 'color: red', type: 'highlight-class', isPlaced: false },
    { id: 'background-color', text: 'background-color: yellow', type: 'highlight-class', isPlaced: false },
    { id: 'font-size', text: 'font-size: 20px', type: 'highlight-class', isPlaced: false },
    { id: 'paragraph', text: '<p> – Paragraph', type: 'inside-div', isPlaced: false },
    { id: 'heading', text: '<h3> – Heading level 3', type: 'inside-div', isPlaced: false },
    { id: 'ordered-list', text: '<ol> – Ordered list (with <li>)', type: 'inside-div', isPlaced: false }
  ], [initialItems]);

  const defaultBuckets: Bucket[] = useMemo(() => initialBuckets || [
    {
      id: 'bucket-highlight-class',
      title: 'Elements inside class highlight',
      type: 'highlight-class',
      color: '#FF6B6B',
      items: []
    },
    {
      id: 'bucket-inside-div',
      title: 'Elements inside div',
      type: 'inside-div',
      color: '#4ECDC4',
      items: []
    }
  ], [initialBuckets]);

  const [items, setItems] = useState<DraggableItem[]>(defaultItems);
  const [buckets, setBuckets] = useState<Bucket[]>(defaultBuckets);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [dragOverBucket, setDragOverBucket] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');

  const dragRef = useRef<HTMLDivElement>(null);

  // Calculate progress
  const calculateProgress = useCallback(() => {
    const placedCount = items.filter(item => item.isPlaced).length;
    const totalCount = items.length;
    const percentage = Math.round((placedCount / totalCount) * 100);
    setProgress(percentage);
    
    if (placedCount === totalCount) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [items]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, item: DraggableItem) => {
    if (item.isPlaced) return;
    
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', item.id);
    
    if (dragRef.current) {
      dragRef.current.style.opacity = '0.5';
    }
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverBucket(null);
    if (dragRef.current) {
      dragRef.current.style.opacity = '1';
    }
  }, []);

  // Handle drag over bucket
  const handleDragOver = useCallback((e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const targetBucket = buckets.find(b => b.id === bucketId);
    if (!targetBucket) return;
    
    // Check if this would be a correct drop
    const isCorrect = draggedItem.type === targetBucket.type;
    
    // Set drop effect based on correctness
    e.dataTransfer.dropEffect = isCorrect ? 'move' : 'none';
    setDragOverBucket(bucketId);
  }, [draggedItem, buckets]);

  // Handle drop on bucket
  const handleDrop = useCallback((e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const targetBucket = buckets.find(b => b.id === bucketId);
    if (!targetBucket) return;

    // Check if drop is correct
    const isCorrect = draggedItem.type === targetBucket.type;
    
    if (isCorrect) {
      // Only allow placement if it's correct
      // Update items
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === draggedItem.id 
            ? { ...item, isPlaced: true, placedInBucket: bucketId }
            : item
        )
      );

      // Update buckets
      setBuckets(prevBuckets => 
        prevBuckets.map(bucket => 
          bucket.id === bucketId
            ? { ...bucket, items: [...bucket.items, { ...draggedItem, isPlaced: true, placedInBucket: bucketId }] }
            : bucket
        )
      );

      // Add correct visual feedback
      const bucketElement = e.currentTarget as HTMLElement;
      bucketElement.classList.add(styles.correctDrop);
      setTimeout(() => bucketElement.classList.remove(styles.correctDrop), 1000);
      
      showFeedback('Correct! Well done!', 'success');
      calculateProgress();
    } else {
      // Show incorrect feedback and return item to original position
      const bucketElement = e.currentTarget as HTMLElement;
      bucketElement.classList.add(styles.incorrectDrop);
      setTimeout(() => bucketElement.classList.remove(styles.incorrectDrop), 1000);
      
      showFeedback('That\'s not the right category. Try again!', 'error');
      // Don't update progress for incorrect placements
      // The item remains unplaced and can be dragged again
    }
  }, [draggedItem, buckets, calculateProgress]);

  // Show feedback message
  const showFeedback = useCallback((message: string, type: 'success' | 'error') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, 2000);
  }, []);

  // Reset game
  const handleReset = useCallback(() => {
    setItems(defaultItems);
    setBuckets(defaultBuckets);
    setProgress(0);
    setShowSuccess(false);
    setFeedbackMessage('');
    setFeedbackType('');
  }, [defaultItems, defaultBuckets]);

  // Get icon for item type
  const getItemIcon = (type: string) => {
    return type === 'highlight-class' ? '🎨' : '🏷️';
  };

  return (
    <main className={`${styles.codeContainer} ${className || ''}`}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.instruction}>{instruction}</p>
        
        {/* Progress Tracker */}
        <div className={styles.progressTracker}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {items.filter(item => item.isPlaced).length}/{items.length} items placed correctly
          </span>
        </div>
      </header>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className={`${styles.feedbackMessage} ${styles[feedbackType === 'success' ? 'correctFeedback' : 'incorrectFeedback']}`}>
          {feedbackMessage}
        </div>
      )}

      {/* Main Content - Two Column Grid */}
      <section className={styles.mainContent}>
        {/* Left Column - Code Display */}
        <article className={styles.codeSection}>
          <h2 className={styles.sectionTitle}>Code Analysis</h2>
          <div className={styles.codeBlock}>
            <div className={styles.lineNumbers}>
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i} className={styles.lineNumber}>{i + 1}</div>
              ))}
            </div>
            <div className={styles.codeContent}>
              <div className={styles.codeLine}>
                <span className={styles.doctype}>&lt;!DOCTYPE html&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;html&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;head&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;style&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.selector}>.highlight</span> <span className={styles.brace}>{'{'}</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;<span className={styles.property}>color:</span> <span className={styles.value}>red;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;<span className={styles.property}>background-color:</span> <span className={styles.value}>yellow;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;<span className={styles.property}>font-size:</span> <span className={styles.value}>20px;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.brace}>{'}'}</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;/style&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;/head&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;body&gt;</span>
              </div>
              <div className={styles.codeLine}></div>
              <div className={styles.codeLine}></div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;<span className={styles.tag}>&lt;div</span> <span className={styles.attribute}>class</span>=<span className={styles.attributeValue}>&quot;highlight&quot;</span><span className={styles.tag}>&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;p&gt;</span><span className={styles.text}>This is highlighted text.</span><span className={styles.tag}>&lt;/p&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;h3&gt;</span><span className={styles.text}>Highlighted heading.</span><span className={styles.tag}>&lt;/h3&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;ol&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;li&gt;</span><span className={styles.text}>First</span><span className={styles.tag}>&lt;/li&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;li&gt;</span><span className={styles.text}>Second</span><span className={styles.tag}>&lt;/li&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tag}>&lt;/ol&gt;</span>
              </div>
              <div className={styles.codeLine}>
                &nbsp;&nbsp;<span className={styles.tag}>&lt;/div&gt;</span>
              </div>
              <div className={styles.codeLine}></div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;/body&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.tag}>&lt;/html&gt;</span>
              </div>
            </div>
          </div>
        </article>

        {/* Right Column - Interactive Elements */}
        <aside className={styles.rightSection}>
          {/* Draggable Items */}
          <section className={styles.draggableItems}>
            <h3 className={styles.sectionTitle}>Elements to Categorize</h3>
            <div className={styles.itemsGrid}>
              {items.map((item) => (
                <div
                  key={item.id}
                  ref={item.id === draggedItem?.id ? dragRef : null}
                  className={`${styles.draggableItem} ${item.isPlaced ? styles.placed : ''}`}
                  draggable={!item.isPlaced}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  aria-label={`Drag '${item.text}' to appropriate bucket`}
                  role="button"
                  tabIndex={item.isPlaced ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                >
                  <span className={styles.itemIcon}>{getItemIcon(item.type)}</span>
                  <span className={styles.itemText}>{item.text}</span>
                  {item.isPlaced && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Drop Zone Buckets */}
          <section className={styles.dropZones}>
            <h3 className={styles.sectionTitle}>Categorize Here</h3>
            <div className={styles.bucketsGrid}>
              {buckets.map((bucket) => (
                <div
                  key={bucket.id}
                  className={`${styles.bucket} ${dragOverBucket === bucket.id ? styles.dragOver : ''}`}
                  style={{ '--bucket-color': bucket.color } as React.CSSProperties}
                  onDragOver={(e) => handleDragOver(e, bucket.id)}
                  onDrop={(e) => handleDrop(e, bucket.id)}
                  onDragLeave={() => setDragOverBucket(null)}
                  aria-label={`Drop zone for ${bucket.title}`}
                  role="region"
                  data-correct-drop={draggedItem && draggedItem.type === bucket.type}
                >
                  <h4 className={styles.bucketTitle}>{bucket.title}</h4>
                  <div className={styles.bucketItems}>
                    {bucket.items.map((item) => (
                      <div key={item.id} className={styles.bucketItem}>
                        <span className={styles.bucketItemIcon}>{getItemIcon(item.type)}</span>
                        <span className={styles.bucketItemText}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reset Button */}
          <button 
            className={styles.resetButton}
            onClick={handleReset}
            aria-label="Reset the categorization game"
          >
            Reset Game
          </button>
        </aside>
      </section>

      {/* Success Animation */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successContent}>
            <span className={styles.successIcon}>🎉</span>
            <h2>Excellent Work!</h2>
            <p>All elements have been categorized correctly!</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default CodeAnalysis;

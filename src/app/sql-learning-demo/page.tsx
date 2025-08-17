'use client';

import React from 'react';
import SQLQueryBuilder from '../../components/learning/SQLQueryBuilder';

const SQLLearningDemo: React.FC = () => {
  const handleComplete = () => {
    console.log('Puzzle completed!');
    alert('🎉 Congratulations! You completed the SQL table puzzle!');
  };

  const handleIncorrectAttempt = () => {
    console.log('Incorrect attempt made');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <SQLQueryBuilder
        title="🧩 SQL Table Puzzle Builder"
        instruction="Drag the puzzle pieces to build your CREATE TABLE statement in the correct order! Each piece represents a part of the SQL command."
        items={[]}
        correctOrder={[]}
        onComplete={handleComplete}
        onIncorrectAttempt={handleIncorrectAttempt}
        isLastLesson={false}
      />
    </div>
  );
};

export default SQLLearningDemo; 
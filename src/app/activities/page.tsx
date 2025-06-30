'use client';
import React from 'react';
import FlappyBird from '@/components/learning/flappyBird/FlappyBird';

const ActivitiesPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fffff0',
    }}>
      <FlappyBird />
    </div>
  );
};

export default ActivitiesPage;

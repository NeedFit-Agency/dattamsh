import React from 'react';
import { CodeAnalysis } from '@/components/learning/CodeAnalysis';

export default function CodeAnalysisDemoPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        CodeAnalysis Component Demo
      </h1>
      <CodeAnalysis />
    </div>
  );
}

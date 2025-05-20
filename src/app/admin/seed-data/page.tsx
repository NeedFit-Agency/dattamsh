'use client';

import React, { useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, addDoc, writeBatch } from 'firebase/firestore';

// Sample data for seeding the database
const sampleData = {
  institutions: [
    { name: 'Delhi Public School' },
    { name: 'Kendriya Vidyalaya' },
    { name: 'Ryan International School' },
    { name: 'DAV Public School' }
  ],
  // For each institution, we'll create grades
  grades: [
    { name: 'Grade 1' },
    { name: 'Grade 2' },
    { name: 'Grade 3' },
    { name: 'Grade 4' },
    { name: 'Grade 5' }
  ],
  // For each grade, we'll create classes
  classes: [
    { name: 'Section A' },
    { name: 'Section B' },
    { name: 'Section C' }
  ]
};

export default function SeedDataPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingComplete, setSeedingComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  
  const addLogEntry = (message: string) => {
    setLog((prevLog) => [...prevLog, message]);
  };
  
  const seedDatabase = async () => {
    try {
      setIsSeeding(true);
      setError(null);
      setSeedingComplete(false);
      setLog([]);
      
      addLogEntry('Starting database seeding...');
      
      // Add institutions first
      addLogEntry('Adding institutions...');
      const institutionsMap = new Map(); // To store institution IDs
      
      for (const institution of sampleData.institutions) {
        const docRef = await addDoc(collection(db, 'institutions'), {
          name: institution.name
        });
        institutionsMap.set(institution.name, docRef.id);
        addLogEntry(`Added institution: ${institution.name}`);
      }
      
      // Add grades for each institution
      addLogEntry('Adding grades...');
      const gradesMap = new Map(); // To store grade IDs
      
      for (const [institutionName, institutionId] of institutionsMap.entries()) {
        for (const grade of sampleData.grades) {
          const gradeData = {
            name: grade.name,
            institution_id: institutionId
          };
          
          const docRef = await addDoc(collection(db, 'grades'), gradeData);
          const mapKey = `${institutionName}-${grade.name}`;
          gradesMap.set(mapKey, docRef.id);
          addLogEntry(`Added grade: ${grade.name} for ${institutionName}`);
        }
      }
      
      // Add classes for each grade
      addLogEntry('Adding classes...');
      
      for (const [gradeKey, gradeId] of gradesMap.entries()) {
        for (const cls of sampleData.classes) {
          const classData = {
            name: cls.name,
            grade_id: gradeId
          };
          
          await addDoc(collection(db, 'classes'), classData);
          addLogEntry(`Added class: ${cls.name} for ${gradeKey}`);
        }
      }
      
      addLogEntry('Database seeding complete!');
      setSeedingComplete(true);
    } catch (err: any) {
      console.error('Error seeding database:', err);
      setError(err.message || 'An error occurred while seeding the database');
      addLogEntry(`ERROR: ${err.message}`);
    } finally {
      setIsSeeding(false);
    }
  };
  
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1AA2FF', marginBottom: '1.5rem' }}>Seed Database</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <p>
          This utility will populate your Firebase database with sample institutions, grades, and classes
          for testing purposes. Click the button below to start the process.
        </p>
        
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={seedDatabase}
            disabled={isSeeding}
            style={{
              backgroundColor: isSeeding ? '#ccc' : '#1AA2FF',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: isSeeding ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isSeeding ? 'Seeding...' : 'Seed Database'}
          </button>
        </div>
      </div>
      
      {error && (
        <div style={{ 
          backgroundColor: '#FFEBEE', 
          color: '#C62828', 
          padding: '1rem', 
          borderRadius: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {seedingComplete && !error && (
        <div style={{ 
          backgroundColor: '#E8F5E9', 
          color: '#2E7D32', 
          padding: '1rem', 
          borderRadius: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <strong>Success!</strong> Database has been seeded with sample data.
        </div>
      )}
      
      {log.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Log</h2>
          
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem',
            borderRadius: '0.25rem',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap'
          }}>
            {log.map((entry, index) => (
              <div key={index} style={{ marginBottom: '0.25rem' }}>
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

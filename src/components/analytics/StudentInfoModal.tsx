'use client';

import React, { useState, useEffect } from 'react';
import { 
  fetchInstitutions, 
  fetchGrades, 
  fetchClasses,
  createSession
} from '@/utils/firebase';
import AnalyticsService, { 
  setInstitutionalContext, 
  generateSessionId,
} from '@/utils/analyticsService';

// CSS for the modal
const styles = {
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
    color: '#1AA2FF', // Brand blue color
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#1AA2FF', // Brand blue color
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.25rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
  loadingText: {
    color: '#666',
    textAlign: 'center' as const,
  },
  description: {
    marginBottom: '1.5rem',
    color: '#555',
  }
};

interface Institution {
  id: string;
  name: string;
}

interface Grade {
  id: string;
  name: string;
  institutionId: string;
}

interface Class {
  id: string;
  name: string;
  gradeId: string;
}

interface StudentInfoModalProps {
  onComplete: () => void;
}

export default function StudentInfoModal({ onComplete }: StudentInfoModalProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Load institutions when component mounts
  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const institutionsData = await fetchInstitutions();
        setInstitutions(institutionsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading institutions:', error);
        setError('Failed to load institutions. Please try again.');
        setIsLoading(false);
      }
    };
    
    loadInstitutions();
  }, []);
  
  // Load grades when institution changes
  useEffect(() => {
    if (!selectedInstitution) {
      setGrades([]);
      return;
    }
    
    const loadGrades = async () => {
      try {
        const gradesData = await fetchGrades(selectedInstitution);
        setGrades(gradesData);
        setSelectedGrade('');
        setClasses([]);
      } catch (error) {
        console.error('Error loading grades:', error);
        setError('Failed to load grades. Please try again.');
      }
    };
    
    loadGrades();
  }, [selectedInstitution]);
  
  // Load classes when grade changes
  useEffect(() => {
    if (!selectedGrade) {
      setClasses([]);
      return;
    }
    
    const loadClasses = async () => {
      try {
        const classesData = await fetchClasses(selectedGrade);
        setClasses(classesData);
        setSelectedClass('');
      } catch (error) {
        console.error('Error loading classes:', error);
        setError('Failed to load classes. Please try again.');
      }
    };
    
    loadClasses();
  }, [selectedGrade]);    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!selectedInstitution || !selectedGrade || !selectedClass) {
      setError('Please select all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Get the names for logging
      const institutionName = institutions.find(i => i.id === selectedInstitution)?.name || 'Unknown';
      const gradeName = grades.find(g => g.id === selectedGrade)?.name || 'Unknown';
      const className = classes.find(c => c.id === selectedClass)?.name || 'Unknown';
      
      console.log(`Selected institution: ${institutionName} (${selectedInstitution})`);
      console.log(`Selected grade: ${gradeName} (${selectedGrade})`);
      console.log(`Selected class: ${className} (${selectedClass})`);
      
      // Generate a unique session ID using our service
      const sessionId = generateSessionId();
      console.log(`Generated session ID: ${sessionId}`);
      
      // Start a new analytics session - this will create the session in Firestore
      // and store the context in localStorage
      const sessionCreated = await AnalyticsService.createInstitutionalSession(
        selectedInstitution,
        selectedGrade,
        selectedClass
      );
      
      if (!sessionCreated) {
        throw new Error('Failed to create institutional session');
      }
      
      console.log('Session created successfully with ID:', sessionId);
      
      // Log individual selection events for analytics
      AnalyticsService.logEvent('institution_selected', { 
        institution_id: selectedInstitution,
        institution_name: institutionName
      });
      
      AnalyticsService.logEvent('grade_selected', { 
        grade_id: selectedGrade,
        grade_name: gradeName,
        institution_id: selectedInstitution
      });
      
      AnalyticsService.logEvent('class_selected', { 
        class_id: selectedClass,
        class_name: className,
        grade_id: selectedGrade,
        institution_id: selectedInstitution
      });
      
      // Initialize session start time
      localStorage.setItem('sessionStartTime', Date.now().toString());
      localStorage.setItem('lastActivityTime', Date.now().toString());
      
      // Notify parent component
      onComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Prevent form submission when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.header}>Welcome to Binary Brains!</h2>
        
        <p style={styles.description}>
          Please tell us about your school to help us customize your learning experience. 
          No personal information is collected.
        </p>
        
        {isLoading ? (
          <p style={styles.loadingText}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="institution">
                Institution:
              </label>
              <select
                id="institution"
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Select Institution</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="grade">
                Grade/Standard:
              </label>
              <select
                id="grade"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                style={styles.select}
                disabled={!selectedInstitution}
                required
              >
                <option value="">Select Grade/Standard</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="class">
                Class/Division:
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={styles.select}
                disabled={!selectedGrade}
                required
              >
                <option value="">Select Class/Division</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            
            {error && <p style={styles.error}>{error}</p>}
            
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isSubmitting || !selectedInstitution || !selectedGrade || !selectedClass
                  ? styles.disabledButton
                  : {})
              }}
              disabled={isSubmitting || !selectedInstitution || !selectedGrade || !selectedClass}
            >
              {isSubmitting ? 'Submitting...' : 'Start Learning!'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

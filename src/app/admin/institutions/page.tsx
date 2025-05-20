'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

interface Institution {
  id: string;
  name: string;
}

interface Grade {
  id: string;
  name: string;
  institution_id: string;
  institutionName?: string;
}

interface Class {
  id: string;
  name: string;
  grade_id: string;
  gradeName?: string;
}

export default function InstitutionsManager() {
  // States for each entity type
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  
  // Form states for adding new entities
  const [newInstitutionName, setNewInstitutionName] = useState('');
  const [newGradeName, setNewGradeName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Active tab
  const [activeTab, setActiveTab] = useState('institutions');
  
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchInstitutions();
        await fetchGrades();
        await fetchClasses();
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Fetch institutions
  const fetchInstitutions = async () => {
    const snapshot = await getDocs(query(collection(db, 'institutions'), orderBy('name')));
    const institutionsData = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));
    setInstitutions(institutionsData);
    return institutionsData;
  };
  
  // Fetch grades
  const fetchGrades = async () => {
    const snapshot = await getDocs(query(collection(db, 'grades'), orderBy('name')));
    const gradesData = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      institution_id: doc.data().institution_id
    }));
    
    // Add institution names
    const enrichedGrades = await Promise.all(
      gradesData.map(async grade => {
        try {
          const institutionDoc = await getDocs(
            query(collection(db, 'institutions'), where('__name__', '==', grade.institution_id))
          );
          
          if (!institutionDoc.empty) {
            return {
              ...grade,
              institutionName: institutionDoc.docs[0].data().name
            };
          }
          return {
            ...grade,
            institutionName: 'Unknown'
          };
        } catch (err) {
          console.error('Error fetching institution for grade:', err);
          return {
            ...grade,
            institutionName: 'Error'
          };
        }
      })
    );
    
    setGrades(enrichedGrades);
    return enrichedGrades;
  };
  
  // Fetch classes
  const fetchClasses = async () => {
    const snapshot = await getDocs(query(collection(db, 'classes'), orderBy('name')));
    const classesData = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      grade_id: doc.data().grade_id
    }));
    
    // Add grade names
    const enrichedClasses = await Promise.all(
      classesData.map(async cls => {
        try {
          const gradeDoc = await getDocs(
            query(collection(db, 'grades'), where('__name__', '==', cls.grade_id))
          );
          
          if (!gradeDoc.empty) {
            return {
              ...cls,
              gradeName: gradeDoc.docs[0].data().name
            };
          }
          return {
            ...cls,
            gradeName: 'Unknown'
          };
        } catch (err) {
          console.error('Error fetching grade for class:', err);
          return {
            ...cls,
            gradeName: 'Error'
          };
        }
      })
    );
    
    setClasses(enrichedClasses);
    return enrichedClasses;
  };
  
  // Add a new institution
  const addInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstitutionName.trim()) {
      alert('Please enter an institution name');
      return;
    }
    
    try {
      await addDoc(collection(db, 'institutions'), {
        name: newInstitutionName.trim()
      });
      setNewInstitutionName('');
      await fetchInstitutions();
    } catch (err) {
      console.error('Error adding institution:', err);
      alert('Failed to add institution');
    }
  };
  
  // Add a new grade
  const addGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeName.trim() || !selectedInstitutionId) {
      alert('Please enter a grade name and select an institution');
      return;
    }
    
    try {
      await addDoc(collection(db, 'grades'), {
        name: newGradeName.trim(),
        institution_id: selectedInstitutionId
      });
      setNewGradeName('');
      await fetchGrades();
    } catch (err) {
      console.error('Error adding grade:', err);
      alert('Failed to add grade');
    }
  };
  
  // Add a new class
  const addClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !selectedGradeId) {
      alert('Please enter a class name and select a grade');
      return;
    }
    
    try {
      await addDoc(collection(db, 'classes'), {
        name: newClassName.trim(),
        grade_id: selectedGradeId
      });
      setNewClassName('');
      await fetchClasses();
    } catch (err) {
      console.error('Error adding class:', err);
      alert('Failed to add class');
    }
  };
  
  // Delete an institution
  const deleteInstitution = async (id: string) => {
    if (!confirm('Are you sure? This will also delete all associated grades and classes.')) {
      return;
    }
    
    try {
      // Find all grades for this institution
      const gradeSnapshot = await getDocs(
        query(collection(db, 'grades'), where('institution_id', '==', id))
      );
      
      // For each grade, find and delete its classes
      for (const gradeDoc of gradeSnapshot.docs) {
        const gradeId = gradeDoc.id;
        
        const classSnapshot = await getDocs(
          query(collection(db, 'classes'), where('grade_id', '==', gradeId))
        );
        
        // Delete all classes for this grade
        for (const classDoc of classSnapshot.docs) {
          await deleteDoc(doc(db, 'classes', classDoc.id));
        }
        
        // Delete the grade
        await deleteDoc(doc(db, 'grades', gradeId));
      }
      
      // Finally delete the institution
      await deleteDoc(doc(db, 'institutions', id));
      
      // Refresh all data
      await fetchInstitutions();
      await fetchGrades();
      await fetchClasses();
    } catch (err) {
      console.error('Error deleting institution:', err);
      alert('Failed to delete institution');
    }
  };
  
  // Delete a grade
  const deleteGrade = async (id: string) => {
    if (!confirm('Are you sure? This will also delete all associated classes.')) {
      return;
    }
    
    try {
      // Find and delete all classes for this grade
      const classSnapshot = await getDocs(
        query(collection(db, 'classes'), where('grade_id', '==', id))
      );
      
      for (const classDoc of classSnapshot.docs) {
        await deleteDoc(doc(db, 'classes', classDoc.id));
      }
      
      // Delete the grade
      await deleteDoc(doc(db, 'grades', id));
      
      // Refresh data
      await fetchGrades();
      await fetchClasses();
    } catch (err) {
      console.error('Error deleting grade:', err);
      alert('Failed to delete grade');
    }
  };
  
  // Delete a class
  const deleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'classes', id));
      await fetchClasses();
    } catch (err) {
      console.error('Error deleting class:', err);
      alert('Failed to delete class');
    }
  };
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1AA2FF', marginBottom: '2rem' }}>Manage Institutional Data</h1>
      
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
            <button
              onClick={() => setActiveTab('institutions')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'institutions' ? '#1AA2FF' : 'transparent',
                color: activeTab === 'institutions' ? 'white' : '#333',
                border: 'none',
                borderRadius: '0.25rem 0.25rem 0 0',
                cursor: 'pointer'
              }}
            >
              Institutions
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'grades' ? '#1AA2FF' : 'transparent',
                color: activeTab === 'grades' ? 'white' : '#333',
                border: 'none',
                borderRadius: '0.25rem 0.25rem 0 0',
                cursor: 'pointer'
              }}
            >
              Grades
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'classes' ? '#1AA2FF' : 'transparent',
                color: activeTab === 'classes' ? 'white' : '#333',
                border: 'none',
                borderRadius: '0.25rem 0.25rem 0 0',
                cursor: 'pointer'
              }}
            >
              Classes
            </button>
          </div>
          
          {/* Institutions Tab */}
          {activeTab === 'institutions' && (
            <div>
              <h2>Institutions</h2>
              
              <form onSubmit={addInstitution} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  value={newInstitutionName}
                  onChange={(e) => setNewInstitutionName(e.target.value)}
                  placeholder="Institution Name"
                  style={{ padding: '0.5rem', flex: 1 }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1AA2FF',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Add Institution
                </button>
              </form>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Name</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map(institution => (
                    <tr key={institution.id}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{institution.name}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                        <button
                          onClick={() => deleteInstitution(institution.id)}
                          style={{
                            backgroundColor: '#ff5555',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {institutions.length === 0 && (
                    <tr>
                      <td colSpan={2} style={{ padding: '0.75rem', textAlign: 'center' }}>
                        No institutions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div>
              <h2>Grades</h2>
              
              <form onSubmit={addGrade} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <select
                  value={selectedInstitutionId}
                  onChange={(e) => setSelectedInstitutionId(e.target.value)}
                  style={{ padding: '0.5rem' }}
                  required
                >
                  <option value="">Select Institution</option>
                  {institutions.map(institution => (
                    <option key={institution.id} value={institution.id}>
                      {institution.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newGradeName}
                  onChange={(e) => setNewGradeName(e.target.value)}
                  placeholder="Grade Name (e.g. Grade 5, Standard 10)"
                  style={{ padding: '0.5rem', flex: 1 }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1AA2FF',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Add Grade
                </button>
              </form>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Institution</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map(grade => (
                    <tr key={grade.id}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{grade.name}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{grade.institutionName}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                        <button
                          onClick={() => deleteGrade(grade.id)}
                          style={{
                            backgroundColor: '#ff5555',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {grades.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ padding: '0.75rem', textAlign: 'center' }}>
                        No grades found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <h2>Classes</h2>
              
              <form onSubmit={addClass} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <select
                  value={selectedGradeId}
                  onChange={(e) => setSelectedGradeId(e.target.value)}
                  style={{ padding: '0.5rem' }}
                  required
                >
                  <option value="">Select Grade</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name} ({grade.institutionName})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Class Name (e.g. Section A, Division B)"
                  style={{ padding: '0.5rem', flex: 1 }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1AA2FF',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Add Class
                </button>
              </form>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Grade</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{cls.name}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>{cls.gradeName}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                        <button
                          onClick={() => deleteClass(cls.id)}
                          style={{
                            backgroundColor: '#ff5555',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {classes.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ padding: '0.75rem', textAlign: 'center' }}>
                        No classes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

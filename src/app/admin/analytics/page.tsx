'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { DashboardStats, ModuleActivityBarChart, AverageScoresPieChart, TimeSpentLineChart } from '@/components/analytics/AnalyticsCharts';

interface Session {
  id: string;
  institution_id: string;
  grade_id: string;
  class_id: string;
  start_timestamp: any;
  is_active: boolean;
  institutionName?: string;
  gradeName?: string;
  className?: string;
  eventCount?: number;
  moduleActivities?: {
    modules: number;
    averageScore: number;
    totalTimeSpent: number;
    errorRate: number;
  };
}

export default function AdminDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        
        // Get recent sessions, ordered by start timestamp
        const q = query(
          collection(db, 'sessions'),
          orderBy('start_timestamp', 'desc'),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const sessionsData: Session[] = [];
        
        // Process each session
        for (const docSnapshot of querySnapshot.docs) {
          const sessionData = docSnapshot.data() as Session;
          const sessionId = docSnapshot.id;
          
          // Get institution, grade, and class names
          let institutionName = 'Unknown';
          let gradeName = 'Unknown';
          let className = 'Unknown';
          
          try {
            if (sessionData.institution_id) {
              const institutionDoc = await getDoc(doc(db, 'institutions', sessionData.institution_id));
              if (institutionDoc.exists()) {
                institutionName = institutionDoc.data().name;
              }
            }
            
            if (sessionData.grade_id) {
              const gradeDoc = await getDoc(doc(db, 'grades', sessionData.grade_id));
              if (gradeDoc.exists()) {
                gradeName = gradeDoc.data().name;
              }
            }
            
            if (sessionData.class_id) {
              const classDoc = await getDoc(doc(db, 'classes', sessionData.class_id));
              if (classDoc.exists()) {
                className = classDoc.data().name;
              }
            }
          } catch (err) {
            console.error('Error fetching related data:', err);
          }
          
          // Count events
          let eventCount = 0;
          try {
            const eventsSnapshot = await getDocs(collection(db, 'sessions', sessionId, 'events'));
            eventCount = eventsSnapshot.size;
          } catch (err) {
            console.error('Error counting events:', err);
          }
          
          // Get module activities
          let moduleActivities = {
            modules: 0,
            averageScore: 0,
            totalTimeSpent: 0,
            errorRate: 0
          };
          
          try {
            const moduleLogsSnapshot = await getDocs(
              collection(db, 'sessions', sessionId, 'moduleLogs')
            );
            
            const moduleActivitiesData = moduleLogsSnapshot.docs.map(doc => doc.data());
            const completedModules = moduleActivitiesData.filter(
              activity => activity.completion_status === 'completed'
            );
            
            if (completedModules.length > 0) {
              moduleActivities = {
                modules: completedModules.length,
                averageScore: completedModules.reduce((sum, activity) => sum + (activity.score || 0), 0) / completedModules.length,
                totalTimeSpent: moduleActivitiesData.reduce((sum, activity) => sum + (activity.time_spent_ms || 0), 0),
                errorRate: completedModules.reduce((sum, activity) => sum + (activity.errors || 0), 0) / completedModules.length
              };
            }
          } catch (err) {
            console.error('Error getting module activities:', err);
          }
          
          sessionsData.push({
            ...sessionData,
            institutionName,
            gradeName,
            className,
            eventCount,
            moduleActivities
          });
        }
        
        setSessions(sessionsData);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessions();
  }, []);
  
  // Format timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (err) {
      return 'Invalid date';
    }
  };
  
  // Format duration in ms to a readable string
  const formatDuration = (ms: number) => {
    if (!ms) return '0s';
    
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  };
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1AA2FF', marginBottom: '2rem' }}>Analytics Dashboard</h1>
      
      {loading ? (
        <p>Loading sessions data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p style={{ marginBottom: '1rem' }}>Showing {sessions.length} most recent sessions</p>
          <DashboardStats data={sessions} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <ModuleActivityBarChart data={sessions} />
            <AverageScoresPieChart data={sessions} />
          </div>
          <TimeSpentLineChart data={sessions} />
          <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Session ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Institution</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Grade</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Class</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Start Time</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Events</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Modules</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Avg Score</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.id.slice(0, 8)}...</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.institutionName}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.gradeName}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.className}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{formatDate(session.start_timestamp)}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.eventCount || 0}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{session.moduleActivities?.modules || 0}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      {session.moduleActivities?.averageScore ? `${Math.round(session.moduleActivities.averageScore)}%` : 'N/A'}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      {formatDuration(session.moduleActivities?.totalTimeSpent || 0)}
                    </td>
                  </tr>
                ))}
                
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '1rem', textAlign: 'center' }}>
                      No sessions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

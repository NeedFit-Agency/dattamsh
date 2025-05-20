'use client';

import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PointElement, 
  LineElement 
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartContainerProps {
  children: React.ReactNode;
  title: string;
}

// Reusable chart container with consistent styling
const ChartContainer: React.FC<ChartContainerProps> = ({ children, title }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  }}>
    <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>{title}</h3>
    {children}
  </div>
);

// Module Activity By Institution Bar Chart
export const ModuleActivityBarChart = ({ data }: { data: any[] }) => {
  // Process the data for the chart
  const institutions = [...new Set(data.map(item => item.institutionName))].slice(0, 10);
  
  const moduleCountData = institutions.map(institutionName => {
    const filteredData = data.filter(item => item.institutionName === institutionName);
    // Sum up all module activities for this institution
    return filteredData.reduce((sum, session) => sum + (session.moduleActivities?.modules || 0), 0);
  });
  
  const chartData = {
    labels: institutions,
    datasets: [
      {
        label: 'Modules Completed',
        data: moduleCountData,
        backgroundColor: 'rgba(26, 162, 255, 0.6)',
        borderColor: 'rgba(26, 162, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Module Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Institution'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      },
    },
  };
  
  return (
    <ChartContainer title="Module Activity by Institution">
      <div style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

// Average Scores Pie Chart
export const AverageScoresPieChart = ({ data }: { data: any[] }) => {
  // Create score ranges
  const scoreRanges = [
    { label: '0-25%', min: 0, max: 25, color: 'rgba(255, 99, 132, 0.6)' },
    { label: '26-50%', min: 25, max: 50, color: 'rgba(255, 159, 64, 0.6)' },
    { label: '51-75%', min: 50, max: 75, color: 'rgba(255, 205, 86, 0.6)' },
    { label: '76-100%', min: 75, max: 100, color: 'rgba(75, 192, 192, 0.6)' },
  ];
  
  // Count sessions in each score range
  const rangeCounts = scoreRanges.map(range => {
    return data.filter(session => {
      const avgScore = session.moduleActivities?.averageScore || 0;
      return avgScore > range.min && avgScore <= range.max;
    }).length;
  });
  
  const chartData = {
    labels: scoreRanges.map(r => r.label),
    datasets: [
      {
        data: rangeCounts,
        backgroundColor: scoreRanges.map(r => r.color),
        borderColor: scoreRanges.map(r => r.color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false
      },
    },
  };
  
  return (
    <ChartContainer title="Average Score Distribution">
      <div style={{ height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

// Time Spent Line Chart - Shows trend over time
export const TimeSpentLineChart = ({ data }: { data: any[] }) => {
  // Sort sessions by timestamp
  const sortedData = [...data].sort((a, b) => 
    a.start_timestamp?.toDate().getTime() - b.start_timestamp?.toDate().getTime()
  );
  
  // Group by day (up to 14 days)
  const dateMap = new Map();
  const now = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(now.getDate() - 14);
  
  // Initialize the last 14 days
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const dateKey = date.toISOString().slice(0, 10);
    dateMap.set(dateKey, { date: dateKey, totalTime: 0, sessions: 0 });
  }
  
  // Aggregate data by day
  sortedData.forEach(session => {
    if (!session.start_timestamp) return;
    
    const timestamp = session.start_timestamp.toDate();
    if (timestamp < twoWeeksAgo) return;
    
    const dateKey = timestamp.toISOString().slice(0, 10);
    if (dateMap.has(dateKey)) {
      const entry = dateMap.get(dateKey);
      entry.totalTime += session.moduleActivities?.totalTimeSpent || 0;
      entry.sessions += 1;
    }
  });
  
  // Convert to arrays for the chart
  const dateKeys = Array.from(dateMap.keys()).sort();
  const timeSpentData = dateKeys.map(key => {
    const entry = dateMap.get(key);
    // Convert ms to minutes
    return Math.round(entry.totalTime / 1000 / 60);
  });
  
  const chartData = {
    labels: dateKeys.map(date => date.slice(5)), // Format as MM-DD
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: timeSpentData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date (MM-DD)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      },
    },
  };
  
  return (
    <ChartContainer title="Daily Learning Time (Last 14 Days)">
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

// Dashboard Stats - Summary boxes
export const DashboardStats = ({ data }: { data: any[] }) => {
  // Calculate overall stats
  const totalSessions = data.length;
  
  const totalModules = data.reduce((sum, session) => 
    sum + (session.moduleActivities?.modules || 0), 0);
    
  const totalTimeSpent = data.reduce((sum, session) => 
    sum + (session.moduleActivities?.totalTimeSpent || 0), 0);
    
  // Format total time spent (ms to hours/minutes)
  const hours = Math.floor(totalTimeSpent / 1000 / 60 / 60);
  const minutes = Math.floor((totalTimeSpent / 1000 / 60) % 60);
  const timeSpentFormatted = `${hours}h ${minutes}m`;
  
  // Average score (only from sessions with scores)
  const sessionsWithScores = data.filter(session => 
    session.moduleActivities?.averageScore !== undefined && 
    session.moduleActivities?.averageScore > 0);
    
  const avgScore = sessionsWithScores.length > 0 
    ? sessionsWithScores.reduce((sum, session) => sum + session.moduleActivities.averageScore, 0) / sessionsWithScores.length
    : 0;
  
  const statBoxStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
  };
  
  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    color: '#1AA2FF',
    marginBottom: '0.5rem',
  };
  
  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#666',
  };
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
      <div style={statBoxStyle}>
        <div style={statNumberStyle}>{totalSessions}</div>
        <div style={statLabelStyle}>Total Sessions</div>
      </div>
      
      <div style={statBoxStyle}>
        <div style={statNumberStyle}>{totalModules}</div>
        <div style={statLabelStyle}>Modules Completed</div>
      </div>
      
      <div style={statBoxStyle}>
        <div style={statNumberStyle}>{timeSpentFormatted}</div>
        <div style={statLabelStyle}>Total Learning Time</div>
      </div>
      
      <div style={statBoxStyle}>
        <div style={statNumberStyle}>{Math.round(avgScore)}%</div>
        <div style={statLabelStyle}>Average Score</div>
      </div>
    </div>
  );
};

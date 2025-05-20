'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1AA2FF', marginBottom: '2rem' }}>Binary Brains Admin Dashboard</h1>
        <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '3rem' 
      }}>
        <DashboardCard 
          title="Analytics Dashboard" 
          description="View analytics data and session information for all users"
          linkHref="/admin/analytics"
          icon="📊"
        />
        
        <DashboardCard 
          title="Manage Institutions" 
          description="Add, edit, and delete institutions, grades, and classes"
          linkHref="/admin/institutions"
          icon="🏫"
        />
        
        <DashboardCard 
          title="Seed Database" 
          description="Populate the database with sample institution data for testing"
          linkHref="/admin/seed-data"
          icon="🌱"
        />
        
        <DashboardCard 
          title="Test Analytics" 
          description="Test page to verify analytics implementation"
          linkHref="/analytics-test"
          icon="🧪"
        />
        
        <DashboardCard 
          title="Go to App" 
          description="Return to the main Binary Brains application"
          linkHref="/"
          icon="🏠"
        />
      </div>
      
      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '0.5rem' }}>
        <h2 style={{ color: '#1AA2FF', marginBottom: '1rem' }}>Analytics Implementation Summary</h2>
        <ul style={{ lineHeight: 1.6 }}>
          <li><strong>Institutional Context:</strong> All analytics events include institution, grade, and class information</li>
          <li><strong>Anonymous Session IDs:</strong> Using UUID to track sessions without personal identifiers</li>
          <li><strong>Firebase Analytics:</strong> All events are logged to Firebase Analytics</li>
          <li><strong>Firestore Logging:</strong> Detailed event information is stored in Firestore collections</li>
          <li><strong>Module Activity Tracking:</strong> Tracking time spent, errors, and completion status for each learning module</li>
          <li><strong>Quiz Performance:</strong> Tracking scores, completion times, and error rates for quizzes</li>
          <li><strong>Privacy Conscious:</strong> All data is anonymized with no personal identifiers</li>
        </ul>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  linkHref: string;
  icon: string;
}

function DashboardCard({ title, description, linkHref, icon }: DashboardCardProps) {
  return (
    <Link href={linkHref} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          {icon}
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1AA2FF' }}>{title}</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{description}</p>
        <div style={{ 
          backgroundColor: '#e9f7ff', 
          color: '#1AA2FF', 
          padding: '0.5rem', 
          borderRadius: '0.25rem', 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          Open
        </div>
      </div>
    </Link>
  );
}

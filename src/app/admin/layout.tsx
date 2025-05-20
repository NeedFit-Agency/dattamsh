'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple admin layout with basic auth check
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // In a real app, you would check the user's auth status properly
  // This is just a simple demo
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthorized(true);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo password - in a real app use proper auth
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };
  
  if (!isAuthorized) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem'
      }}>
        <div style={{ 
          maxWidth: '400px', 
          width: '100%',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#1AA2FF', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
          
          {error && (
            <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>
          )}
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
                placeholder="Enter admin password"
                required
              />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#666' }}>
                For demo: use "admin123"
              </p>
            </div>
            
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1AA2FF',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
          </form>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/" style={{ color: '#1AA2FF', textDecoration: 'none' }}>
              Return to Binary Brains
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <nav style={{ 
        backgroundColor: '#1AA2FF',
        padding: '1rem',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Binary Brains Admin</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/admin" style={{ color: 'white', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <Link href="/admin/analytics" style={{ color: 'white', textDecoration: 'none' }}>
              Analytics
            </Link>
            <Link href="/admin/institutions" style={{ color: 'white', textDecoration: 'none' }}>
              Institutions
            </Link>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Back to App
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('adminAuth');
                setIsAuthorized(false);
              }}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '1rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

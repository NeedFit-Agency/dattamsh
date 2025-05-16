import React from 'react';

const spinnerStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  border: '6px solid #e0e0e0',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
  gap: '16px',
};

const messageStyle: React.CSSProperties = {
  color: '#3498db',
  fontWeight: 500,
  fontSize: '1.1rem',
  textAlign: 'center',
};

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div style={containerStyle}>
    <style>{spinnerKeyframes}</style>
    <div style={spinnerStyle} />
    {message && <div style={messageStyle}>{message}</div>}
  </div>
);

export default LoadingSpinner; 
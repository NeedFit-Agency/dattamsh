import React from 'react';

const spinnerStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  border: '8px solid #e0e0e0',
  borderTop: '8px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
};

const getContainerStyle = (fullScreen?: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: fullScreen ? '100vh' : '250px',
  width: fullScreen ? '100%' : '100%',
  padding: '20px',
  gap: '24px',
  backgroundColor: fullScreen ? 'transparent' : '#f8f9fa',
  borderRadius: fullScreen ? '0' : '12px',
  boxShadow: fullScreen ? 'none' : '0 6px 24px rgba(0, 0, 0, 0.1)',
});

const messageStyle: React.CSSProperties = {
  color: '#2980b9',
  fontWeight: 600,
  fontSize: '1.3rem',
  textAlign: 'center',
  maxWidth: '80%',
};

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const animations = `
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(0deg); }
  40% { transform: translateY(-20px) rotate(-5deg); }
  60% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
`;

const mascotStyle: React.CSSProperties = {
  fontSize: '70px',
  animation: 'bounce 2s infinite',
  marginBottom: '20px',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
};

const progressBarContainerStyle: React.CSSProperties = {
  width: '80%',
  height: '10px',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  overflow: 'hidden',
  marginTop: '15px',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
};

const progressBarStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#2ecc71',
  borderRadius: '10px',
  animation: 'progress 2s ease-in-out forwards',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, fullScreen }) => (
  <div style={getContainerStyle(fullScreen)}>
    <style>{spinnerKeyframes + animations}</style>
    
    <div style={{
      ...mascotStyle,
      animation: fullScreen ? 'bounce 2s infinite, fadeInUp 0.6s ease-out' : 'bounce 2s infinite'
    }}>
      {fullScreen ? '🦸‍♂️' : '🤖'}
    </div>
    
    <div style={spinnerStyle} />
    
    {message && (
      <div style={{
        ...messageStyle,
        animation: 'fadeInUp 0.8s ease-out',
      }}>
        {message}
      </div>
    )}
    
    <div style={{ 
      fontSize: '18px', 
      color: '#555', 
      marginTop: '15px',
      animation: 'fadeInUp 1s ease-out',
      fontWeight: 600
    }}>
      Get ready for fun learning!
    </div>
    
    <div style={progressBarContainerStyle}>
      <div style={progressBarStyle}></div>
    </div>
    
    {fullScreen && (
      <div style={{ 
        position: 'absolute', 
        bottom: '20px',
        fontSize: '14px',
        color: '#777',
        animation: 'fadeInUp 1.2s ease-out',
      }}>
        Preparing your awesome learning adventure...
      </div>
    )}
  </div>
);

export default LoadingSpinner; 
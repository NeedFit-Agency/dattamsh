// src/utils/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj2L7u4Y8Vob7rS66Evc3YA1LrOhYUw4U",
  authDomain: "dattamsh.firebaseapp.com",
  projectId: "dattamsh",
  storageBucket: "dattamsh.firebasestorage.app",
  messagingSenderId: "509339661640",
  appId: "1:509339661640:web:d679c62f1f9a628247af7d",
  measurementId: "G-0L76XHH3VX"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics instance
let analytics: any = null;

// Initialize analytics on client side only
export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const isAnalyticsSupported = await isSupported();
    if (isAnalyticsSupported) {
      analytics = getAnalytics(firebase_app);
      return analytics;
    }
  }
  return null;
};

// Log analytics events with anonymized data
export const logAnalyticsEvent = async (eventName: string, eventParams: any = {}) => {
  try {
    if (!analytics) {
      analytics = await initializeAnalytics();
    }
    
    if (analytics) {
      // Ensure we're not logging any PII
      const safeParams = sanitizeEventParams(eventParams);
      logEvent(analytics, eventName, safeParams);
    }
  } catch (error) {
    // Silent fail in production, log in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Analytics error:', error);
    }
  }
};

// Sanitize event parameters to avoid logging PII
const sanitizeEventParams = (params: any) => {
  // List of fields that should never be logged
  const forbiddenFields = [
    'name', 'email', 'phone', 'address', 'password', 'userName',
    'userId', 'token', 'auth', 'ip', 'deviceId'
  ];
  
  const safeParams = { ...params };
  
  // Remove any potentially sensitive fields
  forbiddenFields.forEach(field => {
    if (field in safeParams) {
      delete safeParams[field];
    }
  });
  
  return safeParams;
};

export default firebase_app;

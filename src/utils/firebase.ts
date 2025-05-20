// src/utils/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { getFirestore, collection, doc, setDoc, addDoc, query, where, getDocs, Timestamp, getDoc } from 'firebase/firestore';

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

// Initialize Firestore
export const db = getFirestore(firebase_app);

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

// Get institutional context from localStorage
function getContext() {
  if (typeof window !== 'undefined') {
    try {
      const contextStr = localStorage.getItem('institutionalContext');
      if (contextStr) {
        return JSON.parse(contextStr);
      }
    } catch (error) {
      console.error("Error parsing institutional context from localStorage:", error);
      return null;
    }
  }
  return null;
}

// Log analytics events with anonymized data
export const logAnalyticsEvent = async (eventName: string, eventParams: any = {}) => {
  try {
    if (!analytics) {
      analytics = await initializeAnalytics();
    }
    
    // Get institutional context
    const institutionalContext = getContext();
    
    // Merge with event params
    const enrichedParams = {
      ...eventParams,
      ...(institutionalContext || {})
    };
    
    if (analytics) {
      // Ensure we're not logging any PII
      const safeParams = sanitizeEventParams(enrichedParams);
      logEvent(analytics, eventName, safeParams);
      
      // Also log to Firestore for more detailed analytics if we have a session ID
      if (institutionalContext?.session_id) {
        await logEventToFirestore(eventName, safeParams, institutionalContext.session_id);
      }
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

// Log event to Firestore
export const logEventToFirestore = async (eventName: string, eventParams: any, sessionId: string) => {
  try {
    // Validate session existence before logging
    const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
    
    if (!sessionDoc.exists()) {
      console.error(`Cannot log event: Session ${sessionId} doesn't exist`);
      return false;
    }
    
    // Add to events subcollection under the session
    await addDoc(collection(db, 'sessions', sessionId, 'events'), {
      event_name: eventName,
      params: eventParams,
      timestamp: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error logging to Firestore:', error);
    return false;
  }
};

// Validate institutional context references
export const validateReferences = async (institutionId: string, gradeId: string, classId: string) => {
  try {
    // Check if institution exists
    const institutionDoc = await getDoc(doc(db, 'institutions', institutionId));
    if (!institutionDoc.exists()) {
      return { valid: false, error: 'Institution not found' };
    }
    
    // Check if grade exists and belongs to the institution
    const gradeDoc = await getDoc(doc(db, 'grades', gradeId));
    if (!gradeDoc.exists()) {
      return { valid: false, error: 'Grade not found' };
    }
    
    const gradeData = gradeDoc.data();
    if (gradeData.institution_id !== institutionId) {
      return { valid: false, error: 'Grade does not belong to this institution' };
    }
    
    // Check if class exists and belongs to the grade
    const classDoc = await getDoc(doc(db, 'classes', classId));
    if (!classDoc.exists()) {
      return { valid: false, error: 'Class not found' };
    }
    
    const classData = classDoc.data();
    if (classData.grade_id !== gradeId) {
      return { valid: false, error: 'Class does not belong to this grade' };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('Error validating references:', error);
    return { valid: false, error: 'Validation error' };
  }
};

// Create a new session in Firestore
export const createSession = async (
  sessionId: string, 
  institutionId: string, 
  gradeId: string, 
  classId: string
) => {
  try {
    // Validate references first
    const validationResult = await validateReferences(institutionId, gradeId, classId);
    if (!validationResult.valid) {
      console.error('Validation failed:', validationResult.error);
      return false;
    }
    
    // Check if a session with this ID already exists
    const existingSession = await getDoc(doc(db, 'sessions', sessionId));
    if (existingSession.exists()) {
      console.warn(`Session ${sessionId} already exists, updating instead of creating`);
      
      // Update the session instead
      await setDoc(doc(db, 'sessions', sessionId), {
        last_active: Timestamp.now(),
        is_active: true
      }, { merge: true });
      
      return true;
    }
    
    // Create new session
    await setDoc(doc(db, 'sessions', sessionId), {
      start_timestamp: Timestamp.now(),
      institution_id: institutionId,
      grade_id: gradeId,
      class_id: classId,
      is_active: true
    });
    
    console.log(`Created new session ${sessionId} with institution=${institutionId}, grade=${gradeId}, class=${classId}`);
    return true;
  } catch (error) {
    console.error('Error creating session:', error);
    return false;
  }
};

// Log module activity
export const logModuleActivity = async (
  sessionId: string,
  moduleId: string,
  timeSpentMs: number,
  errorCount: number,
  completionStatus: 'started' | 'completed' | 'quit',
  score?: number
) => {
  try {
    // Validate session exists
    const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
    if (!sessionDoc.exists()) {
      console.error(`Cannot log module activity: Session ${sessionId} doesn't exist`);
      return false;
    }
    
    // Update session's last_active timestamp
    await setDoc(doc(db, 'sessions', sessionId), {
      last_active: Timestamp.now(),
      is_active: true
    }, { merge: true });
    
    // Add activity to moduleLogs subcollection
    await addDoc(collection(db, 'sessions', sessionId, 'moduleLogs'), {
      module_id: moduleId,
      time_spent_ms: timeSpentMs,
      errors: errorCount,
      completion_status: completionStatus,
      score: score || 0,
      timestamp: Timestamp.now()
    });
    
    return true;
  } catch (error) {
    console.error('Error logging module activity:', error);
    return false;
  }
};

// Fetch all institutions
export const fetchInstitutions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'institutions'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return [];
  }
};

// Fetch grades for an institution
export const fetchGrades = async (institutionId: string) => {
  try {
    const q = query(
      collection(db, 'grades'), 
      where('institution_id', '==', institutionId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      institutionId: doc.data().institution_id
    }));
  } catch (error) {
    console.error('Error fetching grades:', error);
    return [];
  }
};

// Fetch classes for a grade
export const fetchClasses = async (gradeId: string) => {
  try {
    const q = query(
      collection(db, 'classes'),
      where('grade_id', '==', gradeId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      gradeId: doc.data().grade_id
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};

// End a session (mark as inactive)
export const endSession = async (sessionId: string, timeSpentMs: number) => {
  try {
    await setDoc(doc(db, 'sessions', sessionId), {
      end_timestamp: Timestamp.now(),
      duration_ms: timeSpentMs,
      is_active: false
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error ending session:', error);
    return false;
  }
};

export default firebase_app;

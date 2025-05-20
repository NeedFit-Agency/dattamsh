Okay, I've reviewed the detailed Change Request (CR) for implementing Institutional Analytics. The existing code in layout.tsx provides a good starting point by including the `StudentInfoModal` and basic analytics service calls.

Here's an analysis of what's partially implemented and what's missing based on the CR:

**Partially Implemented/Good Foundation:**

* **Modal Display Logic:** layout.tsx conditionally renders `StudentInfoModal` based on `showInfoModal`, which is determined by `hasInstitutionalContext()` (presumably checking `localStorage`).
* **Analytics Service:** analyticsService.ts exists and is used for `trackUserVisit`, `trackSessionStart`, and `trackSessionEnd`. This is the right place to expand analytics functionality.
* **`localStorage` for Session Timing:** `sessionStartTime` is stored in `localStorage`.

**Key Missing Frontend Implementations from CR:**

1. **`StudentInfoModal` Detailed Functionality:**
   * Dependent dropdowns (Institution -> Grade -> Class) populated from a backend.
   * Client-side validation for the three fields.
   * Saving selected `institution_id`, `grade_id`, `class_id`, and a completion flag to `localStorage` upon successful submission.
   * Specific Dattamsh branding and responsiveness for the modal.
2. **Session and Identity Handling:**
   * Generation of a unique, anonymous `session_id` (UUID) upon app load/game start.
   * Storing this `session_id` (e.g., in memory or `sessionStorage`).
   * Linking this `session_id` and the stored institutional context (`institution_id`, `grade_id`, `class_id`) in a `sessions` record sent to the backend.
3. **Real-Time Gameplay Logging:**
   * Functions in `analyticsService.ts` to log specific gameplay events (module start/completion, time spent, errors, score).
   * Integration of these logging functions into the actual game modules/components. Each log must be associated with the active `session_id`.
4. **Backend Interaction:**
   * API calls to fetch data for dependent dropdowns.
   * API calls to send session context and gameplay logs to the backend (Firestore/Supabase).

Here's a detailed plan to implement the frontend aspects of this Change Request:

**Phase 0: Setup**

1. **Install `uuid` Package:**
   This package will be used for generating unique session IDs.
   The existing code in layout.tsx already implements some parts of the "Student Info Pop-up (UI)" and "LocalStorage Persistence" sections of your change request.

Here's a breakdown of what's implemented, what's missing, and a plan to implement the remaining features:

**Implemented:**

* **Modal Dialog on First Load:** The `StudentInfoModal` component is conditionally rendered based on `showInfoModal`.
* **LocalStorage Persistence:** The `useEffect` hook checks `hasInstitutionalContext()` (which presumably checks `localStorage`) and sets `showInfoModal` accordingly. This ensures the modal is shown only if the context is not already set.
* **Analytics Tracking:** Basic session start/end and user visit tracking is implemented in analyticsService.ts.

**Missing:**

* **Dependent Dropdowns:** The `StudentInfoModal` currently doesn't have the cascading dropdowns for Institution, Grade/Standard, and Class/Division.
* **Validation:** Client-side validation for the modal fields is not explicitly mentioned.
* **Branding and Responsiveness:** While the overall app has styling, the modal's specific styling and responsiveness as per the CR need to be ensured.
* **Anonymous Session ID:** Generation and usage of a UUID-based `session_id` are not implemented.
* **Linking Context:** While institutional context is checked, explicitly linking it with a `session_id` and including it in all gameplay logs needs to be done.
* **Data Storage Design:** The backend schema (Firestore/Supabase) and the logic to write session context and gameplay logs are not implemented. This includes master data tables and referential integrity.
* **Deduplication and Data Integrity:** Backend validation and unique constraints are not implemented.
* **Real-Time Logging:** Instrumenting game modules to log events to the backend is not implemented.
* **Unit and Integration Testing:** Tests for the new functionality are not implemented.

**Implementation Plan:**

**Phase 1: Frontend - Student Info Modal & Session Handling (Client-Side)**

1. **Update `StudentInfoModal.tsx` (StudentInfoModal.tsx):**

   * **UI:** Implement three dropdowns (Institution, Grade/Standard, Class/Division).
   * **API Integration:**
     * Fetch the list of institutions for the first dropdown.
     * On selecting an institution, fetch the corresponding grades.
     * On selecting a grade, fetch the corresponding classes.
     * (These API endpoints will be created in the backend phase).
   * **State Management:** Use React state to manage the selected values for the dropdowns.
   * **Validation:**
     * Disable the submit button until all three fields are selected.
     * Show error messages if any field is not selected upon trying to submit.
   * **Submission:** On submit:
     * Call a function in `analyticsService.ts` to store the selected `institution_id`, `grade_id`, and `class_id` in `localStorage`.
     * Set a flag in `localStorage` (e.g., `studentInfoCompleted: true`) to prevent the modal from showing again.
     * Call the `onComplete` prop.
   * **Styling:** Apply Dattamsh branding (colors, fonts) and ensure mobile responsiveness.
2. **Update `analyticsService.ts` (analyticsService.ts):**

   * **Session ID Generation:**
     * Add a function `generateSessionId()` that uses the `uuid` library to create a v4 UUID.
     * Store this `session_id` in memory (e.g., a module-level variable or a React context if needed across many components). This ID should be generated when a new session starts (e.g., after the student info modal is completed for the first time, or on app load if info is already present).
   * **Store Institutional Context:**
     * Create a function `setInstitutionalContext(institutionId, gradeId, classId)` that saves these to `localStorage`.
     * Modify `hasInstitutionalContext()` to check for these specific keys.
   * **Retrieve Institutional Context:**
     * Create a function `getInstitutionalContext()` that returns an object `{ institution_id, grade_id, class_id }` from `localStorage`.
   * **Retrieve Session ID:**
     * Create a function `getSessionId()` to return the current session ID.
3. **Update layout.tsx (layout.tsx):**

   * **Session ID Initialization:**
     * In the main `useEffect` (or a new one), after checking/setting `showInfoModal`, if the modal is *not* to be shown (meaning context exists or is just completed), call `analyticsService.generateSessionId()`.
     * If the modal *is* shown, the session ID can be generated after the modal is successfully submitted.
   * **Modify `StudentInfoModal` props:**
     * Pass a callback to `StudentInfoModal` that, upon successful submission, also triggers the generation of the `session_id` if it hasn't been generated yet.

**Phase 2: Backend - Data Storage & Validation (Firestore/Supabase)**

*(Assuming Firestore for this example, adapt for Supabase if that's the choice)*

1. **Setup Firestore:**

   * Ensure Firebase is initialized in the project (firebase.ts).
   * Define Firestore security rules.
2. **Define Collections in Firestore:**

   * `institutions`: Documents with fields like `name`, `createdAt`. (Document ID can be auto-generated or a custom unique ID).
   * `grades`: Documents with fields like `institution_id` (reference to `institutions`), `name` (e.g., "Grade 10"), `createdAt`.
   * `classes`: Documents with fields like `grade_id` (reference to `grades`), `name` (e.g., "Section A"), `createdAt`.
   * `sessions`: Documents where the Document ID is the `session_id` (UUID). Fields: `institution_id`, `grade_id`, `class_id`, `start_timestamp`.
   * `moduleLogs`: This will be a subcollection under each session document (e.g., `sessions/{session_id}/moduleLogs/{log_id}`). Fields: `module_id`, `time_spent`, `errors`, `completion_status`, `score`, `timestamp`.
3. **Create API Endpoints (e.g., Next.js API Routes or Firebase Functions):**

   * `GET /api/institutions`: Fetches all institutions.
   * `GET /api/grades?institutionId=<id>`: Fetches grades for a given institution.
   * `GET /api/classes?gradeId=<id>`: Fetches classes for a given grade.
   * These will be used by the `StudentInfoModal`.
4. **Update `analyticsService.ts` (analyticsService.ts):**

   * **`trackUserVisit()` / `trackSessionStart()` modification:**
     * When a session starts (after institutional info is confirmed and `session_id` is generated), write a new document to the `sessions` collection in Firestore.
     * The document ID will be the `session_id`.
     * The document data will include `institution_id`, `grade_id`, `class_id` (from `localStorage`) and `start_timestamp: serverTimestamp()`.
   * **`logGameplayEvent(module_id, eventData)` function:**
     * This function will take `module_id` and an object `eventData` (containing `time_spent`, `errors`, `completion_status`, `score`).
     * It will retrieve the current `session_id` and institutional context.
     * It will write a new document to the `sessions/{session_id}/moduleLogs` subcollection in Firestore.
     * Include `timestamp: serverTimestamp()`.
5. **Backend Validation (Firebase Cloud Functions):**

   * **`sessions` collection onCreate trigger:**
     * When a new session document is created, validate that `institution_id`, `grade_id`, and `class_id` reference existing documents in their respective master collections (`institutions`, `grades`, `classes`).
     * If validation fails, either delete the session document or move it to an "errors" collection.
   * **`moduleLogs` subcollection onCreate trigger:**
     * Ensure the parent `session_id` document exists.
     * Validate `module_id` if you have a master list of modules.
   * **Preventing Duplicate Master Data:**
     * For `institutions`, `grades`, and `classes`, when creating new entries (via an admin panel - future phase), use Firebase Functions with transactions or batched writes to check for uniqueness based on names/compound keys before writing. For example, to ensure unique institution names, a function could try to create a document in an `institutionNames/{name}` collection. If it fails (document already exists), the name is not unique.

**Phase 3: Integrating Gameplay Logging**

1. **Identify Game Modules:** Determine all the game modules/activities that need to be tracked (e.g., `src/components/learning/**`, `src/components/quiz/**`).
2. **Instrument Modules:**
   * In each relevant game module component, import and use `analyticsService.logGameplayEvent()`.
   * Call this function at appropriate times:
     * Module start (perhaps to log an "attempted" status).
     * Module completion (with `time_spent`, `score`, `errors`, `completion_status: 'completed'`).
     * User quitting/exiting a module (`completion_status: 'quit'`).
     * Specific errors or interactions within a module.
   * Ensure `time_spent` is calculated accurately.

**Phase 4: Testing**

1. **Unit Tests (e.g., using Jest/React Testing Library):**
   * `StudentInfoModal`: Test rendering, dropdown population (mock APIs), validation logic, and `localStorage` interaction on submit.
   * `analyticsService`: Test `session_id` generation (is it a valid UUID?), `localStorage` functions, and mocking Firestore writes to ensure correct data is being sent.
2. **Integration Tests:**
   * Test the end-to-end flow:
     * First visit: Modal appears, user fills it, data saved to `localStorage` and `sessions` collection in Firestore.
     * Subsequent visits: Modal is skipped.
     * Gameplay: `moduleLogs` are correctly written under the active session in Firestore.
   * Test API endpoints for fetching institutions, grades, classes.
3. **Manual Testing:**
   * Test on different browsers and device sizes (for responsiveness).
   * Verify data in Firestore.
   * Check `localStorage` in the browser's developer tools.

**Detailed File Changes (Illustrative for Key Parts):**

* **StudentInfoModal.tsx:**

  * Add state for dropdowns: `selectedInstitution`, `selectedGrade`, `selectedClass`.
  * Add state for dropdown options: `institutions`, `grades`, `classes`.
  * `useEffect` hooks to fetch data for dropdowns based on selections.
  * JSX for three `<select>` elements and a submit button.
  * `handleSubmit` function to validate, save to `localStorage` via `analyticsService`, and call `onComplete`.

  ```tsx
  // src/components/analytics/StudentInfoModal.tsx
  import React, { useState, useEffect } from 'react';
  import { v4 as uuidv4 } from 'uuid'; // Import uuid
  import AnalyticsService from '@/utils/analyticsService'; // Assuming this will be expanded

  interface StudentInfoModalProps {
    onComplete: () => void;
  }

  // Mock API functions - replace with actual API calls
  const fetchInstitutions = async () => Promise.resolve([{ id: 'inst1', name: 'Institution A' }, { id: 'inst2', name: 'Institution B' }]);
  const fetchGrades = async (institutionId: string) => {
    if (institutionId === 'inst1') return Promise.resolve([{ id: 'g1', name: 'Grade 10' }, { id: 'g2', name: 'Grade 11' }]);
    return Promise.resolve([]);
  };
  const fetchClasses = async (gradeId: string) => {
    if (gradeId === 'g1') return Promise.resolve([{ id: 'c1', name: 'Section A' }, { id: 'c2', name: 'Section B' }]);
    return Promise.resolve([]);
  };


  const StudentInfoModal: React.FC<StudentInfoModalProps> = ({ onComplete }) => {
    const [institutions, setInstitutions] = useState<{ id: string; name: string }[]>([]);
    const [grades, setGrades] = useState<{ id: string; name: string }[]>([]);
    const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);

    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      const loadInstitutions = async () => {
        // In a real app, fetch from your API: GET /api/institutions
        const fetchedInstitutions = await fetchInstitutions(); // Replace with actual API call
        setInstitutions(fetchedInstitutions);
      };
      loadInstitutions();
    }, []);

    useEffect(() => {
      if (selectedInstitution) {
        const loadGrades = async () => {
          // GET /api/grades?institutionId=selectedInstitution
          const fetchedGrades = await fetchGrades(selectedInstitution); // Replace
          setGrades(fetchedGrades);
          setSelectedGrade(''); // Reset subsequent selections
          setClasses([]);
          setSelectedClass('');
        };
        loadGrades();
      } else {
        setGrades([]);
        setSelectedGrade('');
        setClasses([]);
        setSelectedClass('');
      }
    }, [selectedInstitution]);

    useEffect(() => {
      if (selectedGrade) {
        const loadClasses = async () => {
          // GET /api/classes?gradeId=selectedGrade
          const fetchedClasses = await fetchClasses(selectedGrade); // Replace
          setClasses(fetchedClasses);
          setSelectedClass(''); // Reset class selection
        };
        loadClasses();
      } else {
        setClasses([]);
        setSelectedClass('');
      }
    }, [selectedGrade]);

    const handleSubmit = async () => {
      if (!selectedInstitution || !selectedGrade || !selectedClass) {
        setError('All fields are required.');
        return;
      }
      setError('');
      // Save to localStorage via analyticsService
      AnalyticsService.setInstitutionalContext(selectedInstitution, selectedGrade, selectedClass);
      localStorage.setItem('studentInfoCompleted', 'true'); // Set completion flag

      // It's good practice to generate session ID after context is set
      // Or ensure it's generated on app load if context already exists
      if (!AnalyticsService.getSessionId()) {
          const newSessionId = AnalyticsService.generateSessionId(); // This should store it internally
          console.log('New session ID generated:', newSessionId); // For debugging
      }
      await AnalyticsService.trackSessionStart(); // Now track session start with context

      onComplete();
    };

    // Basic styling, replace with your actual CSS classes and structure
    const modalStyle: React.CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      width: 'clamp(300px, 80vw, 500px)', // Responsive width
      color: '#333', // Text color for readability
    };

    const selectStyle: React.CSSProperties = {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    };

    const buttonStyle: React.CSSProperties = {
      padding: '10px 20px',
      backgroundColor: '#1AA2FF', // Dattamsh blue
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
    };
     const titleStyle: React.CSSProperties = {
      color: '#1AA2FF', // Dattamsh blue
      textAlign: 'center',
      marginBottom: '20px',
    };

    return (
      <div style={modalStyle}>
        <h2 style={titleStyle}>Tell us about your institution</h2>
        <div>
          <label htmlFor="institution">Institution:</label>
          <select id="institution" value={selectedInstitution} onChange={(e) => setSelectedInstitution(e.target.value)} style={selectStyle}>
            <option value="">Select Institution</option>
            {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="grade">Grade/Standard:</label>
          <select id="grade" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} style={selectStyle} disabled={!selectedInstitution}>
            <option value="">Select Grade</option>
            {grades.map(grade => <option key={grade.id} value={grade.id}>{grade.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="class">Class/Division:</label>
          <select id="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={selectStyle} disabled={!selectedGrade}>
            <option value="">Select Class</option>
            {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
      </div>
    );
  };

  export default StudentInfoModal;
  ```
* **analyticsService.ts:**

  * Add `uuid` import.
  * Add `currentSessionId` variable.
  * Implement `generateSessionId`, `getSessionId`, `setInstitutionalContext`, `getInstitutionalContext`.
  * Update `trackSessionStart` to use `currentSessionId` and context.
  * Implement `logGameplayEvent`.

  ```typescript
  // src/utils/analyticsService.ts
  import { db } from './firebase'; // Assuming firebase is setup
  import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
  import { v4 as uuidv4 } from 'uuid';

  let currentSessionId: string | null = null;

  const AnalyticsService = {
    generateSessionId: (): string => {
      currentSessionId = uuidv4();
      localStorage.setItem('sessionId', currentSessionId); // Persist for resilience across hard reloads within a "session"
      return currentSessionId;
    },

    getSessionId: (): string | null => {
      if (!currentSessionId) {
          currentSessionId = localStorage.getItem('sessionId');
      }
      return currentSessionId;
    },

    setInstitutionalContext: (institutionId: string, gradeId: string, classId: string): void => {
      localStorage.setItem('institution_id', institutionId);
      localStorage.setItem('grade_id', gradeId);
      localStorage.setItem('class_id', classId);
      localStorage.setItem('studentInfoCompleted', 'true');
    },

    getInstitutionalContext: (): { institution_id: string; grade_id: string; class_id: string } | null => {
      const institution_id = localStorage.getItem('institution_id');
      const grade_id = localStorage.getItem('grade_id');
      const class_id = localStorage.getItem('class_id');
      if (institution_id && grade_id && class_id) {
        return { institution_id, grade_id, class_id };
      }
      return null;
    },

    hasInstitutionalContext: (): boolean => {
      return !!localStorage.getItem('studentInfoCompleted') && !!localStorage.getItem('institution_id');
    },

    trackUserVisit: () => {
      console.log('User visit tracked.');
      // Potentially log to a simple 'visits' collection if needed, separate from sessions
    },

    trackSessionStart: async () => {
      const sessionId = AnalyticsService.getSessionId();
      const context = AnalyticsService.getInstitutionalContext();

      if (sessionId && context) {
        try {
          await setDoc(doc(db, 'sessions', sessionId), {
            ...context,
            start_timestamp: serverTimestamp(),
            // userAgent: navigator.userAgent, // Optional: for basic device info
          });
          localStorage.setItem('sessionStartTime', Date.now().toString());
          console.log(`Session ${sessionId} started with context:`, context);
        } catch (error) {
          console.error("Error starting session:", error);
        }
      } else {
          if (!sessionId) console.warn("Session ID not available for trackSessionStart");
          if (!context) console.warn("Institutional context not available for trackSessionStart");
      }
    },

    trackSessionEnd: (timeSpentMs: number) => {
      const sessionId = AnalyticsService.getSessionId();
      if (sessionId) {
        console.log(`Session ${sessionId} ended. Time spent: ${timeSpentMs}ms`);
        // Optionally update the session document with an end_timestamp and duration
        // For example:
        // updateDoc(doc(db, 'sessions', sessionId), {
        //   end_timestamp: serverTimestamp(),
        //   duration_ms: timeSpentMs,
        // });
        localStorage.removeItem('sessionStartTime');
        localStorage.removeItem('sessionId'); // Clear session ID on explicit end
        currentSessionId = null;
      }
    },

    logGameplayEvent: async (module_id: string, eventData: { time_spent: number; errors: number; completion_status: string; score: number }) => {
      const sessionId = AnalyticsService.getSessionId();
      if (!sessionId) {
        console.error('Cannot log gameplay event: Session ID is missing.');
        return;
      }
      // Context is implicitly linked via the session_id, no need to re-add it to each log if using subcollections
      try {
        const sessionDocRef = doc(db, 'sessions', sessionId);
        const moduleLogsCollectionRef = collection(sessionDocRef, 'moduleLogs');
        await addDoc(moduleLogsCollectionRef, {
          module_id,
          ...eventData,
          timestamp: serverTimestamp(),
        });
        console.log(`Gameplay event for module ${module_id} logged to session ${sessionId}:`, eventData);
      } catch (error) {
        console.error("Error logging gameplay event:", error);
      }
    },
  };

  export default AnalyticsService;

  // Helper to be called early in app lifecycle, e.g., in layout.tsx
  export const initializeSession = () => {
      let sid = AnalyticsService.getSessionId();
      if (!sid && AnalyticsService.hasInstitutionalContext()) { // Context exists, but no session ID (e.g. fresh load after modal)
          sid = AnalyticsService.generateSessionId();
          AnalyticsService.trackSessionStart(); // Start session if context is present
      } else if (sid && AnalyticsService.hasInstitutionalContext() && !localStorage.getItem('sessionStartTime')) {
          // Session ID and context exist, but sessionStartTime is missing (e.g. tab was closed and reopened)
          // Treat as a new session continuation or start, depending on policy
          AnalyticsService.trackSessionStart();
      }

  ```

Similar code found with 1 license type

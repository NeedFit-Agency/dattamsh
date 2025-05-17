import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getOrCreateAnonymousUser } from '../lib/supabase';

/**
 * Hook to manage anonymous authentication with Supabase
 * Automatically creates an anonymous session if one doesn't exist
 */
export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initialize by getting or creating an anonymous user
    const initializeAuth = async () => {
      try {
        const user = await getOrCreateAnonymousUser();
        setUser(user);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize auth'));
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}
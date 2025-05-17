import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to get or create an anonymous user session
export const getOrCreateAnonymousUser = async () => {
  // Check if we already have a session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    return session.user;
  }
  
  // If no session exists, sign in anonymously
  const { data, error } = await supabase.auth.signInAnonymously();
  
  if (error) {
    console.error('Error creating anonymous user:', error);
    return null;
  }
  
  return data.user;
};

// Function to log user interactions
export const logInteraction = async ({
  action,
  contentId,
  contentType,
  metadata = {}
}: {
  action: string;
  contentId: string;
  contentType: string;
  metadata?: Record<string, any>;
}) => {
  try {
    const user = await getOrCreateAnonymousUser();
    
    if (!user) {
      console.error('Failed to get or create anonymous user');
      return { error: 'Authentication failed' };
    }
    
    const { error } = await supabase
      .from('user_interactions')
      .insert({
        user_id: user.id,
        action,
        content_id: contentId,
        content_type: contentType,
        metadata,
        timestamp: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error logging interaction:', error);
      return { error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error logging interaction:', error);
    return { error: 'Unexpected error occurred' };
  }
};
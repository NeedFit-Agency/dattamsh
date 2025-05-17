-- Create user_interactions table for tracking anonymous user behavior
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_interactions(user_id);

-- Create index for faster queries by content_id
CREATE INDEX IF NOT EXISTS idx_user_interactions_content_id ON user_interactions(content_id);

-- Create index for faster queries by content_type
CREATE INDEX IF NOT EXISTS idx_user_interactions_content_type ON user_interactions(content_type);

-- Create index for faster queries by action
CREATE INDEX IF NOT EXISTS idx_user_interactions_action ON user_interactions(action);

-- Enable Row Level Security
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own interactions
CREATE POLICY "Users can insert their own interactions" 
  ON user_interactions 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to view only their own interactions
CREATE POLICY "Users can view their own interactions" 
  ON user_interactions 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policy to allow service role to access all interactions
CREATE POLICY "Service role can access all interactions" 
  ON user_interactions 
  FOR ALL 
  TO service_role 
  USING (true);
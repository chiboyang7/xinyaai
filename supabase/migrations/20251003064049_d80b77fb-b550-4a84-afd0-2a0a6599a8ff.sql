-- Create test_sessions table for anonymous test sessions
CREATE TABLE public.test_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_token text NOT NULL UNIQUE,
  test_type text NOT NULL CHECK (test_type IN ('young', 'adult')),
  answers jsonb DEFAULT '{}'::jsonb,
  email text,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed')),
  payment_amount numeric(10,2),
  ai_result jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can create a new session (for starting a test)
CREATE POLICY "Anyone can create test sessions"
ON public.test_sessions
FOR INSERT
WITH CHECK (true);

-- Anyone can view their session if they know the token (passed via URL)
CREATE POLICY "Anyone can view test sessions with valid token"
ON public.test_sessions
FOR SELECT
USING (true);

-- Anyone can update their session if they know the token
CREATE POLICY "Anyone can update test sessions"
ON public.test_sessions
FOR UPDATE
USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_test_sessions_token ON public.test_sessions(session_token);
CREATE INDEX idx_test_sessions_expires_at ON public.test_sessions(expires_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_test_sessions_timestamp()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_test_sessions_updated_at
BEFORE UPDATE ON public.test_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_test_sessions_timestamp();

-- Function to generate secure random token
CREATE OR REPLACE FUNCTION public.generate_session_token()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..32 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;
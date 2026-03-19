-- 1. Create public.users table mapping to auth.users
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  lifetime_access BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  screen_hours TEXT,
  work_type TEXT,
  saturation_signs TEXT,
  critical_moment TEXT,
  intention TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Trigger to create a user in public.users when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Create public.sessions table
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phase_number INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own sessions" ON public.sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON public.sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Create public.checkins table
CREATE TABLE public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  clarity_score INTEGER NOT NULL CHECK (clarity_score >= 1 AND clarity_score <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own checkins" ON public.checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkins" ON public.checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Setup Storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('audios', 'audios', false),
  ('ebook', 'ebook', false)
ON CONFLICT (id) DO NOTHING;

-- 5. Set up RLS for Storage buckets
CREATE POLICY "Authenticated users can read audios" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'audios' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read ebook" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'ebook' AND auth.role() = 'authenticated');

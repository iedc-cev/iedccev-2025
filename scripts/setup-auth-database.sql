-- Create users table for IEDC members
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER NOT NULL,
  contact_no TEXT NOT NULL,
  member_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Create policy for inserting new users (during registration)
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = email);

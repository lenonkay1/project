/*
  # Initial schema for JSC Asset Management System

  1. New Tables
    - `profiles` - User profiles with role and department information
    - `categories` - Asset categories
    - `departments` - Departments within the organization
    - `assets` - Main assets table with all asset information
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table to store user data
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text DEFAULT 'user',
  department_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  location text,
  contact_person text,
  contact_email text,
  contact_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  asset_code text NOT NULL UNIQUE,
  description text,
  category_id uuid REFERENCES categories(id),
  status text DEFAULT 'available',
  acquisition_date date,
  acquisition_cost decimal(10,2),
  location text,
  department_id uuid REFERENCES departments(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key from profiles to departments
ALTER TABLE profiles
ADD CONSTRAINT fk_profiles_departments
FOREIGN KEY (department_id) REFERENCES departments(id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for categories
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for departments
CREATE POLICY "Anyone can view departments"
  ON departments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create departments"
  ON departments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update departments"
  ON departments
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can delete departments"
  ON departments
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for assets
CREATE POLICY "Anyone can view assets"
  ON assets
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update assets"
  ON assets
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can delete assets"
  ON assets
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
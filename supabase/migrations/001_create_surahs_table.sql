-- Create surahs table
-- This table stores metadata for all 114 Surahs of the Quran

CREATE TABLE IF NOT EXISTS public.surahs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 114),
    name VARCHAR(100) NOT NULL, -- Arabic name
    english_name VARCHAR(100) NOT NULL,
    english_translation VARCHAR(200) NOT NULL,
    ayah_count INTEGER NOT NULL CHECK (ayah_count > 0),
    revelation_type VARCHAR(10) NOT NULL CHECK (revelation_type IN ('Meccan', 'Medinan')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_surahs_number ON public.surahs(number);
CREATE INDEX IF NOT EXISTS idx_surahs_revelation_type ON public.surahs(revelation_type);
CREATE INDEX IF NOT EXISTS idx_surahs_english_name ON public.surahs(english_name);

-- Enable Row Level Security (RLS)
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to surahs" ON public.surahs
    FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.surahs TO anon;
GRANT SELECT ON public.surahs TO authenticated;

-- Grant full access to authenticated users for potential admin operations
GRANT ALL ON public.surahs TO authenticated;

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_surahs_updated_at
    BEFORE UPDATE ON public.surahs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for the first few Surahs
INSERT INTO public.surahs (number, name, english_name, english_translation, ayah_count, revelation_type) VALUES
(1, 'الفاتحة', 'Al-Fatihah', 'The Opening', 7, 'Meccan'),
(2, 'البقرة', 'Al-Baqarah', 'The Cow', 286, 'Medinan'),
(3, 'آل عمران', 'Ali Imran', 'The Family of Imran', 200, 'Medinan'),
(4, 'النساء', 'An-Nisa', 'The Women', 176, 'Medinan'),
(5, 'المائدة', 'Al-Maidah', 'The Table Spread', 120, 'Medinan')
ON CONFLICT (number) DO NOTHING;
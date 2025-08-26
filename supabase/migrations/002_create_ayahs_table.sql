-- Create ayahs table
-- This table stores individual verses (ayahs) of the Quran with their translations and tafseer

CREATE TABLE IF NOT EXISTS public.ayahs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    surah_id UUID NOT NULL,
    number INTEGER NOT NULL CHECK (number > 0),
    arabic_text TEXT NOT NULL,
    translation TEXT,
    tafseer_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint (logical relationship)
    CONSTRAINT fk_ayahs_surah_id 
        FOREIGN KEY (surah_id) 
        REFERENCES public.surahs(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint to ensure no duplicate ayah numbers within a surah
    CONSTRAINT unique_surah_ayah UNIQUE (surah_id, number)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ayahs_surah_id ON public.ayahs(surah_id);
CREATE INDEX IF NOT EXISTS idx_ayahs_number ON public.ayahs(number);
CREATE INDEX IF NOT EXISTS idx_ayahs_surah_number ON public.ayahs(surah_id, number);
CREATE INDEX IF NOT EXISTS idx_ayahs_arabic_text ON public.ayahs USING gin(to_tsvector('arabic', arabic_text));
CREATE INDEX IF NOT EXISTS idx_ayahs_translation ON public.ayahs USING gin(to_tsvector('english', translation));

-- Enable Row Level Security (RLS)
ALTER TABLE public.ayahs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to ayahs" ON public.ayahs
    FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.ayahs TO anon;
GRANT SELECT ON public.ayahs TO authenticated;

-- Grant full access to authenticated users for potential admin operations
GRANT ALL ON public.ayahs TO authenticated;

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_ayahs_updated_at
    BEFORE UPDATE ON public.ayahs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample ayahs for Al-Fatihah (Surah 1)
-- Note: This assumes the surahs table has been populated
INSERT INTO public.ayahs (surah_id, number, arabic_text, translation, tafseer_text)
SELECT 
    s.id,
    1,
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    'This is the opening verse of the Quran, known as the Basmala. It begins with seeking Allah''s blessing and invoking His mercy.'
FROM public.surahs s WHERE s.number = 1
ON CONFLICT (surah_id, number) DO NOTHING;

INSERT INTO public.ayahs (surah_id, number, arabic_text, translation, tafseer_text)
SELECT 
    s.id,
    2,
    'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    'All praise is due to Allah, Lord of the worlds.',
    'This verse establishes the fundamental principle of praising Allah as the Lord and Sustainer of all creation.'
FROM public.surahs s WHERE s.number = 1
ON CONFLICT (surah_id, number) DO NOTHING;

INSERT INTO public.ayahs (surah_id, number, arabic_text, translation, tafseer_text)
SELECT 
    s.id,
    3,
    'الرَّحْمَٰنِ الرَّحِيمِ',
    'The Entirely Merciful, the Especially Merciful.',
    'This verse emphasizes Allah''s mercy, using two different forms to highlight the comprehensive nature of His compassion.'
FROM public.surahs s WHERE s.number = 1
ON CONFLICT (surah_id, number) DO NOTHING;

INSERT INTO public.ayahs (surah_id, number, arabic_text, translation, tafseer_text)
SELECT 
    s.id,
    4,
    'مَالِكِ يَوْمِ الدِّينِ',
    'Sovereign of the Day of Recompense.',
    'This verse declares Allah as the ultimate judge and ruler of the Day of Judgment, when all will be held accountable.'
FROM public.surahs s WHERE s.number = 1
ON CONFLICT (surah_id, number) DO NOTHING;

INSERT INTO public.ayahs (surah_id, number, arabic_text, translation, tafseer_text)
SELECT 
    s.id,
    5,
    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    'It is You we worship and You we ask for help.',
    'This verse represents the core of Islamic monotheism - exclusive worship of Allah and seeking His assistance alone.'
FROM public.surahs s WHERE s.number = 1
ON CONFLICT (surah_id, number) DO NOTHING;
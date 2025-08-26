-- Create tafseer_sources table
-- This table stores information about different Tafseer (commentary) sources and their authors

CREATE TABLE IF NOT EXISTS public.tafseer_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    author VARCHAR(200) NOT NULL,
    language VARCHAR(50) NOT NULL DEFAULT 'Arabic',
    description TEXT,
    publication_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combination of name and author
    CONSTRAINT unique_tafseer_name_author UNIQUE (name, author)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tafseer_sources_name ON public.tafseer_sources(name);
CREATE INDEX IF NOT EXISTS idx_tafseer_sources_author ON public.tafseer_sources(author);
CREATE INDEX IF NOT EXISTS idx_tafseer_sources_language ON public.tafseer_sources(language);
CREATE INDEX IF NOT EXISTS idx_tafseer_sources_active ON public.tafseer_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_tafseer_sources_description ON public.tafseer_sources USING gin(to_tsvector('english', description));

-- Enable Row Level Security (RLS)
ALTER TABLE public.tafseer_sources ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to tafseer_sources" ON public.tafseer_sources
    FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.tafseer_sources TO anon;
GRANT SELECT ON public.tafseer_sources TO authenticated;

-- Grant full access to authenticated users for potential admin operations
GRANT ALL ON public.tafseer_sources TO authenticated;

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_tafseer_sources_updated_at
    BEFORE UPDATE ON public.tafseer_sources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample tafseer sources
INSERT INTO public.tafseer_sources (name, author, language, description, publication_year) VALUES
('Tafsir Ibn Kathir', 'Ibn Kathir', 'Arabic', 'One of the most famous and widely used commentaries of the Quran, known for its comprehensive approach using Quran, Hadith, and scholarly opinions.', 1365),
('Tafsir al-Jalalayn', 'Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti', 'Arabic', 'A classical Sunni tafsir written by two Jalals (hence the name), known for its concise and accessible style.', 1505),
('Tafsir al-Tabari', 'Muhammad ibn Jarir al-Tabari', 'Arabic', 'One of the earliest and most comprehensive commentaries, combining historical, linguistic, and jurisprudential approaches.', 923),
('Tafsir al-Qurtubi', 'Al-Qurtubi', 'Arabic', 'A comprehensive commentary focusing on legal rulings and jurisprudential aspects derived from Quranic verses.', 1273),
('The Study Quran', 'Seyyed Hossein Nasr (Editor)', 'English', 'A modern English commentary providing comprehensive notes and commentary from classical Islamic scholarship.', 2015),
('Tafsir Maariful Quran', 'Mufti Muhammad Shafi', 'Urdu', 'A comprehensive modern commentary originally written in Urdu, widely respected for its scholarly approach and clarity.', 1970)
ON CONFLICT (name, author) DO NOTHING;

-- Create a junction table for linking ayahs to their tafseer sources
-- This allows multiple tafseer sources for each ayah
CREATE TABLE IF NOT EXISTS public.ayah_tafseer_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ayah_id UUID NOT NULL,
    tafseer_source_id UUID NOT NULL,
    tafseer_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraints
    CONSTRAINT fk_ayah_tafseer_ayah_id 
        FOREIGN KEY (ayah_id) 
        REFERENCES public.ayahs(id) 
        ON DELETE CASCADE,
    
    CONSTRAINT fk_ayah_tafseer_source_id 
        FOREIGN KEY (tafseer_source_id) 
        REFERENCES public.tafseer_sources(id) 
        ON DELETE CASCADE,
    
    -- Ensure unique combination of ayah and tafseer source
    CONSTRAINT unique_ayah_tafseer_source UNIQUE (ayah_id, tafseer_source_id)
);

-- Create indexes for the junction table
CREATE INDEX IF NOT EXISTS idx_ayah_tafseer_ayah_id ON public.ayah_tafseer_sources(ayah_id);
CREATE INDEX IF NOT EXISTS idx_ayah_tafseer_source_id ON public.ayah_tafseer_sources(tafseer_source_id);
CREATE INDEX IF NOT EXISTS idx_ayah_tafseer_text ON public.ayah_tafseer_sources USING gin(to_tsvector('english', tafseer_text));

-- Enable RLS for junction table
ALTER TABLE public.ayah_tafseer_sources ENABLE ROW LEVEL SECURITY;

-- Create policies for junction table
CREATE POLICY "Allow public read access to ayah_tafseer_sources" ON public.ayah_tafseer_sources
    FOR SELECT USING (true);

-- Grant permissions for junction table
GRANT SELECT ON public.ayah_tafseer_sources TO anon;
GRANT SELECT ON public.ayah_tafseer_sources TO authenticated;
GRANT ALL ON public.ayah_tafseer_sources TO authenticated;

-- Create trigger for junction table updated_at
CREATE TRIGGER update_ayah_tafseer_sources_updated_at
    BEFORE UPDATE ON public.ayah_tafseer_sources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
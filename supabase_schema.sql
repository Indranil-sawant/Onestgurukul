-- ============================================================================
-- ONEST GURUKUL - SUPABASE DATABASE & STORAGE SCHEMA
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PROFILES TABLE (User Roles & Accounts)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile record when new user signs up in Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', 'CMS User'), 'admin')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. NOTICES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    pinned BOOLEAN NOT NULL DEFAULT FALSE,
    pdf_url TEXT DEFAULT '#',
    expires_at DATE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for public queries
CREATE INDEX IF NOT EXISTS idx_notices_status_pinned ON public.notices (status, pinned DESC, created_at DESC);

-- ----------------------------------------------------------------------------
-- 3. EVENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    category TEXT DEFAULT 'Activity',
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_status_date ON public.events (status, date ASC);

-- ----------------------------------------------------------------------------
-- 4. GALLERY & ACHIEVEMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    awardee TEXT,
    category TEXT,
    year TEXT,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    alt_text TEXT,
    description TEXT,
    sort_order INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_status_sort ON public.gallery_items (status, sort_order ASC, created_at DESC);

-- ----------------------------------------------------------------------------
-- 5. DOCUMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    download_url TEXT NOT NULL,
    updated_date DATE DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents (status, category);

-- ----------------------------------------------------------------------------
-- 6. SITE CONTENT TABLE (Settings & Homepage Content)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Site Settings if not present
INSERT INTO public.site_content (key, content)
VALUES (
    'settings',
    '{
        "emergencyBannerActive": false,
        "emergencyBannerText": "ADMISSION NOTICE: Registrations for Academic Year 2026-27 are now open.",
        "emergencyBannerPriority": "warning",
        "analyticsEnabled": true,
        "language": "en"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- --- PROFILES POLICIES ---
-- Users can view their own profile; Authenticated users can view profiles
CREATE POLICY "Public profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- --- NOTICES POLICIES ---
-- Anonymous / Public users can ONLY read published notices
CREATE POLICY "Public can view published notices" 
ON public.notices FOR SELECT USING (status = 'published');

-- Authenticated admins/editors can view all notices (draft, published, archived)
CREATE POLICY "Authenticated users can view all notices" 
ON public.notices FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can insert notices
CREATE POLICY "Authenticated users can create notices" 
ON public.notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update notices
CREATE POLICY "Authenticated users can update notices" 
ON public.notices FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can delete notices
CREATE POLICY "Authenticated users can delete notices" 
ON public.notices FOR DELETE USING (auth.role() = 'authenticated');

-- --- EVENTS POLICIES ---
CREATE POLICY "Public can view published events" 
ON public.events FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage events" 
ON public.events FOR ALL USING (auth.role() = 'authenticated');

-- --- GALLERY POLICIES ---
CREATE POLICY "Public can view published gallery" 
ON public.gallery_items FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage gallery" 
ON public.gallery_items FOR ALL USING (auth.role() = 'authenticated');

-- --- DOCUMENTS POLICIES ---
CREATE POLICY "Public can view published documents" 
ON public.documents FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage documents" 
ON public.documents FOR ALL USING (auth.role() = 'authenticated');

-- --- SITE CONTENT POLICIES ---
CREATE POLICY "Public can view site content" 
ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update site content" 
ON public.site_content FOR ALL USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- 8. STORAGE BUCKET CONFIGURATION (site-assets)
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'site-assets',
    'site-assets',
    true,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS: Public Read Access
CREATE POLICY "Public Access for Site Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Storage RLS: Authenticated Users Upload Access
CREATE POLICY "Authenticated Upload for Site Assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

-- Storage RLS: Authenticated Users Update/Delete Access
CREATE POLICY "Authenticated Manage for Site Assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete for Site Assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

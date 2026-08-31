-- STEP 2: GALLERY, DOCUMENTS & SITE CONTENT - Max 30 lines
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    awardee TEXT,
    category TEXT,
    year TEXT,
    image_url TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    download_url TEXT NOT NULL,
    updated_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.site_content (key, content)
VALUES ('settings', '{"emergencyBannerActive": false, "emergencyBannerText": "Admissions Open", "emergencyBannerPriority": "warning"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

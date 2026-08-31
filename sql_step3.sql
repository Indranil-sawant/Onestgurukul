-- STEP 3: RLS POLICIES - Max 25 lines
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read notices" ON public.notices FOR SELECT USING (status = 'published');
CREATE POLICY "Auth manage notices" ON public.notices FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read events" ON public.events FOR SELECT USING (status = 'published');
CREATE POLICY "Auth manage events" ON public.events FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read gallery" ON public.gallery_items FOR SELECT USING (status = 'published');
CREATE POLICY "Auth manage gallery" ON public.gallery_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read docs" ON public.documents FOR SELECT USING (status = 'published');
CREATE POLICY "Auth manage docs" ON public.documents FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Auth manage site_content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');

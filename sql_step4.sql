-- STEP 4: STORAGE BUCKET & POLICIES - Max 20 lines
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public storage read" ON storage.objects
FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Auth storage insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Auth storage update" ON storage.objects
FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Auth storage delete" ON storage.objects
FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

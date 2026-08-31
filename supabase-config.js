/* ==========================================================================
   ONEST GURUKUL - SUPABASE CLIENT CONFIGURATION
   File: supabase-config.js
   
   Configures public Supabase client for static GitHub Pages.
   Uses ONLY the public anonymous (anon) key.
   NEVER expose service_role keys or secrets here.
   ========================================================================== */

(function (global) {
  'use strict';

  // Live Supabase credentials configured for project: lcuboeldhaafahttihvi
  const SUPABASE_URL = global.SUPABASE_URL || 'https://lcuboeldhaafahttihvi.supabase.co';
  const SUPABASE_ANON_KEY = global.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdWJvZWxkaGFhZmFodHRpaHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNjI1MjYsImV4cCI6MjEwMzczODUyNn0.afT3OavTuTIuSZOwmwVqOCSK2oZU5CDHFDnLnBYqHAY';

  let client = null;

  // Check if Supabase SDK is loaded and credentials are valid
  const isConfigured = function () {
    return (
      typeof global.supabase !== 'undefined' &&
      SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes('YOUR_SUPABASE_PROJECT_ID') &&
      !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
    );
  };

  if (typeof global.supabase !== 'undefined' && isConfigured()) {
    try {
      client = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      console.log("Supabase Client initialized successfully.");
    } catch (err) {
      console.warn("Supabase Client initialization error:", err.message);
    }
  } else {
    console.info("Supabase credentials pending setup. Running with default fallback data.");
  }

  global.OnestSupabase = {
    client: client,
    isConfigured: isConfigured,
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    getClient: function () {
      if (!client && typeof global.supabase !== 'undefined' && isConfigured()) {
        try {
          client = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (e) {
          return null;
        }
      }
      return client;
    }
  };
})(window);

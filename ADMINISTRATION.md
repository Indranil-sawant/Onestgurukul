# O'NEST GURUKUL — ADMINISTRATION & SCALING GUIDE

> **Official Administration Reference File**  
> **Project:** O'NEST Gurukul School Website & Content Management System  
> **Location:** `C:\Users\indranil sawant\OneDrive\Desktop\Onestgurukul`  
> **Updated:** October 2026  

---

## 1. Administrative Portals & Dashboards

### 1.1 Content Management System (CMS)
* **Local File:** [`admin.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/admin.html)
* **Production Route:** `https://<your-domain>/admin.html`
* **Authentication:** Supabase email & password authentication (Strict Login).

---

### 1.2 Supabase Cloud Backend Links
The CMS is powered by a serverless Supabase PostgreSQL backend. Use these direct console links to manage users, tables, and media assets:

| Resource | Direct Link | Purpose |
| :--- | :--- | :--- |
| **Project Overview** | [Supabase Project Dashboard](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi) | Monitor database requests, active connections, and project health. |
| **User & Auth Management** | [Supabase Authentication > Users](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi/auth/users) | Create admin accounts, invite editors, or trigger password reset emails. |
| **SQL Editor** | [Supabase SQL Editor](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi/sql) | Run database schema scripts ([`supabase_schema.sql`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase_schema.sql)) and custom queries. |
| **Table Editor** | [Supabase Table Editor](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi/editor) | Directly view, edit, or export records for `notices`, `events`, `gallery_items`, and `documents`. |
| **Media Storage** | [Supabase Storage > site-assets](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi/storage/buckets/site-assets) | View uploaded photos, circular PDFs, and prospectus files. |
| **API & Keys Settings** | [Supabase Settings > API](https://supabase.com/dashboard/project/lcuboeldhaafahttihvi/settings/api) | Retrieve the Project URL and public Anonymous (`anon`) key. |

---

## 2. Inquiries, Leads & Contact Integrations

### 2.1 Google Apps Script Form Webhook
Form submissions from [`contact.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/contact.html) and [`index.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/index.html) route to a serverless Google Apps Script:
* **Active Webhook Endpoint:**  
  `https://script.google.com/macros/s/AKfycbzy_XYVQhZevOoWxX4p5l0OnnHImOgBR-obzac23We2-5Zx4VIyyjgW25Xgie3fPG-v/exec`
* **Destination:** The linked Google Sheet captures parent names, phone numbers, student grades, and messages in real time.
* **To Update the Destination Sheet:** Open your Google Apps Script project &rarr; Update script &rarr; Deploy as Web App &rarr; Replace URL in [`contact.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/contact.html).

### 2.2 Instant Communication & Helpline Channels
* **WhatsApp Admission Desk (Primary):** [https://wa.me/917888056699](https://wa.me/917888056699)
* **WhatsApp Transport Helpline:** [https://wa.me/918767672478](https://wa.me/918767672478)
* **Official Admission Email:** [mailto:onestgurukulprimary@gmail.com](mailto:onestgurukulprimary@gmail.com)
* **Campus Google Maps Navigation:** [https://maps.google.com/?q=O'NEST+Gurukul+Ratnagiri](https://maps.google.com/?q=O'NEST+Gurukul+Ratnagiri)

---

## 3. Public Website Sitemap & Core Files

All pages feature responsive mobile optimization and the branded school preloader:

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/index.html) | Main school showcase, verified stats (2.5+ Acres, 200+ Students), hero carousel. |
| **About Us** | [`about.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/about.html) | School vision, leadership philosophy, faculty credentials, values timeline. |
| **Pre-Primary** | [`preprimary.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/preprimary.html) | Early childhood wing (Playgroup, Nursery, LKG, UKG), sensory play methodology. |
| **Curriculum** | [`students-life.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/students-life.html) | Proposed CBSE syllabus, student life timeline, 4 authentic achievement awards. |
| **Campus** | [`campus-facilities.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/campus-facilities.html) | Biophilic infrastructure, Karwanchiwadi saved banyan tree story, 360° virtual tour. |
| **Admissions** | [`admissions.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/admissions.html) | Multi-step interactive application form, fee schedules, eligibility criteria. |
| **Contact** | [`contact.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/contact.html) | Interactive Google Map embed, direct phone desks, parent inquiry form. |
| **Admin CMS** | [`admin.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/admin.html) | Content management for notices, calendar events, documents, and settings. |
| **404 Page** | [`404.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/404.html) | Branded error recovery page with full mobile navigation drawer. |

---

## 4. Key Configuration, SEO & Scaling Files

| File | Purpose | When to Edit |
| :--- | :--- | :--- |
| [`sitemap.xml`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/sitemap.xml) | Google/Bing XML sitemap with image metadata. | When adding new public pages or major site sections. |
| [`robots.txt`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/robots.txt) | Search engine & AI crawler permissions (GPTBot, ClaudeBot, PerplexityBot). | When updating crawl rules or blocking sensitive internal directories. |
| [`llms.txt`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/llms.txt) | Standardized AEO (Answer Engine Optimization) markdown knowledge base for AI agents. | When updating key facts, phone numbers, or academic offerings. |
| [`ai.txt`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/ai.txt) | Machine intelligence pointer map for automated AI search indexing. | When domain, sitemap, or contact email changes. |
| [`supabase-config.js`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase-config.js) | Stores Supabase URL and public Anonymous API Key. | When switching Supabase projects or moving to custom production database. |
| [`db.js`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/db.js) | Client database layer, offline data fallbacks, and storage caching. | When updating initial fallback circulars, awards, or default notices. |
| [`onest-global.js`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/onest-global.js) | Controls floating Apply Now CTA, AI chat assistant, and emergency banner. | When modifying floating action buttons, phone numbers, or banner behavior. |
| [`assets/css/theme-base.css`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/assets/css/theme-base.css) | Global brand design tokens, preloader styling, and fluid responsive clamps. | When adjusting brand colors, typography, or global layout spacing. |
| [`supabase_schema.sql`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase_schema.sql) | Complete database DDL script with tables, RLS security policies, and triggers. | When initializing a new Supabase environment or running database migrations. |

---

## 5. Step-by-Step Guide to Scale the Website

### 5.1 Connecting a New or Dedicated Supabase Instance
1. Create a free account at [Supabase.com](https://supabase.com).
2. Create a new project (e.g. `onest-gurukul-production`).
3. Open the **SQL Editor** in your Supabase dashboard.
4. Copy and paste the entire contents of [`supabase_schema.sql`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase_schema.sql) and click **Run**.
5. Go to **Project Settings &rarr; API** and copy:
   * **Project URL**
   * **Project API Keys (`anon` / `public`)**
6. Open [`supabase-config.js`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase-config.js) and replace lines 14–15:
   ```javascript
   const SUPABASE_URL = 'https://YOUR_NEW_PROJECT_ID.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR_NEW_ANON_KEY';
   ```
7. Go to **Authentication &rarr; Users** in Supabase and click **Add User &rarr; Create User** with:
   * **Email:** `admin@onestgurukul.edu.in`
   * **Password:** *(Choose a strong administrative password)*

---

### 5.2 Scaling Academic Grades (Expanding to Classes 7–10)
When O'NEST Gurukul expands its offerings to higher grades:
1. **Admissions Dropdown:** In [`admissions.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/admissions.html) around line 375, add the new `<option>` tags (`Class 7`, `Class 8`, etc.).
2. **Contact Form Dropdown:** In [`contact.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/contact.html) around line 305, add the new grade options.
3. **Hero Badge:** Update the hero badge on [`index.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/index.html) and [`campus-facilities.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/campus-facilities.html) from `Playgroup to Standard 6` to the updated grade span.

---

### 5.3 Deploying to GitHub Pages or Custom Domain
1. **Repository Settings:** Push the repository to GitHub.
2. In GitHub repository &rarr; **Settings** &rarr; **Pages**:
   * Set Source: **Deploy from a branch**
   * Branch: `main` / Folder: `/ (root)`
3. **Custom Domain:**
   * Enter custom domain (e.g. `www.onestgurukul.edu.in`) in the **Custom domain** field.
   * Add a DNS `CNAME` record in your domain registrar pointing `www` to `<your-username>.github.io`.
   * Check **Enforce HTTPS** once the SSL certificate completes provisioning.

---

### 5.4 Integrating Online Payment Gateway (Razorpay / UPI)
When enabling online admission fee payments:
1. Register for a merchant account at [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Create payment link buttons or use the Razorpay Standard Checkout SDK script:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
3. Connect the success callback in Step 4 of [`admissions.html`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/admissions.html) to store transaction IDs directly in Supabase or display the confirmed fee receipt.

---

## 6. Security & Credential Rules

* **Public Anonymous Key (`anon`):** Safe to include in frontend JavaScript ([`supabase-config.js`](file:///C:/Users/indranil%20sawant/OneDrive/Desktop/Onestgurukul/supabase-config.js)) because Row Level Security (RLS) protects the database.
* **Service Role Key (`service_role`):** **NEVER** expose in frontend code or commit to GitHub. This key bypasses all security rules and belongs only in secure server environments.
* **Admin Passwords:** Never hardcode passwords into HTML, JavaScript, or JSON. Always authenticate administrators via Supabase Auth.

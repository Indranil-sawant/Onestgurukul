# O'Nest Gurukul - Premium Features Integration Plan (Self-Contained in 'New_features' Folder)

This document outlines the detailed architectural and technical implementation plan to integrate 27 premium school features into the **O'Nest Gurukul** website.

To ensure 100% safety, zero regression on your existing functional website, and easy comparison, we will build all extended pages and features inside a dedicated **`New_features/`** folder at the root of the project.

This directory will contain:
- **`New_features/db.js`**: The local-first client-side database.
- **`New_features/onest-global.js`**: The global components injector (Floating buttons, search, announcements, analytics, chatbot).
- **`New_features/admin.html`**: The dynamic administrative console to manage all data.
- **`New_features/index.html`**, **`New_features/admissions.html`**, **`New_features/students-life.html`**, **`New_features/campus-facilities.html`**, **`New_features/about.html`**: Updated pages with features fully integrated.
- All styles, images, and vendor assets will continue to resolve correctly relative to the parent directories.

---

## User Review Required

> [!IMPORTANT]
> - **Self-Contained Delivery**: By organizing the new features inside the `New_features/` folder, your live site remains untouched. You can test the new experience side-by-side by running the files inside `New_features/` (e.g. opening `New_features/index.html` in your browser).
> - **Local-First Persistence**: Since this is a static HTML/JS site, the database is simulated in the client browser using `localStorage` and `sessionStorage`. An administrative dashboard (`admin.html`) is provided to let you perform full CRUD operations (add notices, delete notices, approve admissions, create calendar events, view visit bookings, adjust emergency banner, etc.) that sync in real-time.
> - **Aesthetics & Theme**: All new features perfectly match the typography (Libre Caslon Text + Hanken Grotesk) and the color palette (warm vanilla, deep gold, royal blue) defined in the original theme files.

---

## Proposed Changes in `New_features/`

### 1. Database & Core Scripts

#### [NEW] [db.js](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/db.js)
A robust data management layer (`OnestDB`) containing:
- Pre-seeded realistic school data for all components (FAQs, Faculty, Notices, Documents, Events, Statistics, Testimonials, Transport routes).
- Storage wrappers for `localStorage` (`onest_db_*`) to store dynamically added Notices, Events, Campus Visit Bookings, Job Applications, and Admission form submissions.
- CRUD helper functions like `getNotices()`, `addNotice()`, `deleteNotice()`, `getEvents()`, `addEvent()`, `addAdmission()`, etc.

#### [NEW] [onest-global.js](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/onest-global.js)
A global script that dynamically inserts common page elements and binds events:
- **Emergency Announcement Banner**: Reads settings from DB. Shows a dismissible, colored strip at the top of the body (Info/Yellow, Warning/Orange, Critical/Red).
- **Sticky Floating Apply Button**: Bottom-right on mobile, sticky side card on desktop. Links to `admissions.html` and auto-hides near the footer.
- **WhatsApp Support Action**: Sits as a floating chat bubble, pre-filled with an enquiry message.
- **AI Admission Assistant Placeholder**: Clicking the chatbot icon opens a beautiful slide-up chat drawer. It supports clicking pre-defined questions (e.g., about fees, curriculum, etc.) and provides interactive, simulated AI answers.
- **Global Search Modal**: Opens on pressing `Ctrl+K` or `/`. Indexes all pages, FAQs, faculty, events, documents, and notices, with instant matching and search results.
- **Analytics Ready Hooks**: Simulates events for Google Analytics 4 / Meta Pixel, printing events in the console when forms are submitted, chatbot is opened, or prospectus is downloaded.

---

### 2. Page Integrations (Copied and Extended)

#### [NEW] [index.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/index.html)
- **Official ERP Portal Section**: Grid cards for Student Portal, Parent Portal, Teacher Portal, and Admin Portal.
- **Dynamic Notice Board**: Ticker/bulletin board connected to `OnestDB`.
- **Dynamic FAQ Section**: Interactive accordion with category selectors and query search. Generates automated JSON-LD SEO schema.
- **Testimonials Carousel**: Renders parents, student, and alumni testimonials from DB.
- **School Statistics**: Stats section driven by variables from the DB, with count-up animations on scroll.

#### [NEW] [admissions.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/admissions.html)
- **Multi-Step Admission Form**: Responsive 4-step wizard (Student info -> Parent info -> Selection & Scholarships -> Uploads & Mock CAPTCHA). Saves progress in `sessionStorage` and submits to `OnestDB` on completion.
- **Campus Visit Booking**: Interactive scheduler with date-picker and available time-slots. Saves bookings to DB.
- **Download Prospectus**: Captures lead information (Name, Phone, Email) in a premium lightbox before triggering the download.
- **Scholarship Section**: Visual details on eligibility, benefits, and the application process.

#### [NEW] [students-life.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/students-life.html)
- **Interactive Event Calendar**: A calendar grid showing school events (holidays, exams, sports days) with monthly/agenda filters and a "Sync to Google Calendar" button.
- **Faculty Directory**: Filterable directory (by name or department) with profile cards showing qualifications and experience.
- **Achievement Showcase**: Beautiful interactive timeline/carousel displaying sports achievements, Olympiads, and accolades.

#### [NEW] [campus-facilities.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/campus-facilities.html)
- **Document Download Hub**: Document repository (CBSE disclosures, NOC, calendar, prospectus, book lists) with category filters and search.
- **Virtual Campus Tour**: Media section with 360-degree panoramic view mock and tour video list.
- **Transport Information**: Bus routes, stops, schedules, and GPS mock.

#### [NEW] [about.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/about.html)
- **Careers Section**: Open jobs listing, dynamic details, and modal job application form with resume attachment.

#### [NEW] [admin.html](file:///wsl$/Ubuntu/home/neon/onest_school/Onestgurukul/New_features/admin.html)
- Fully functional administration center using the O'Nest Gurukul design system. Let's admin manage Notices, Events, Admissions, Bookings, Careers, and Announcement settings.

---

## Verification Plan

### Manual Verification
1. **Side-by-Side Review**: Open `New_features/index.html` in your browser. Verify navigation links redirect correctly within the `New_features/` directory.
2. **Dynamic Flow Check**: Go to `New_features/admin.html`, add a new notice, and see it display immediately on `New_features/index.html`.
3. **Multi-Step Form**: Fill out the admission form. Ensure fields validate, attachments upload (mock), progress is saved on refresh, and the entry appears in the admin panel.
4. **Calendar & Directory**: Verify you can search/filter faculty and filter monthly events inside `students-life.html`.
5. **Aesthetics & Contrast**: Confirm that all elements meet accessibility guidelines and adapt gracefully to dark/light theme switching.

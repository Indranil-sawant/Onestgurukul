/* ==========================================================================
   ONEST GURUKUL - LOCAL DATABASE SYSTEM (db.js)
   File: New_features/db.js
   A local-first simulated database persisting to localStorage, loaded with
   realistic default school data.
   ========================================================================== */

(function (global) {
    'use strict';

    const DB_PREFIX = 'onest_db_';

    // Helper to read from LocalStorage
    function readTable(tableName) {
        try {
            const data = localStorage.getItem(DB_PREFIX + tableName);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`Error reading database table: ${tableName}`, e);
            return null;
        }
    }

    // Helper to write to LocalStorage
    function writeTable(tableName, data) {
        try {
            localStorage.setItem(DB_PREFIX + tableName, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error(`Error writing database table: ${tableName}`, e);
            return false;
        }
    }

    // Seed Data Definitions
    const SEED_DATA = {
        notices: [
            {
                id: "n-1",
                title: "Admissions Open for Academic Year 2026-27",
                content: "Registrations for grades Nursery to Class 10 are now open. Parents can submit the online application form or visit the school office.",
                category: "Admission",
                pinned: true,
                createdAt: "2026-07-15",
                expiresAt: "2026-10-31",
                pdfUrl: "#"
            },
            {
                id: "n-2",
                title: "Parent-Teacher Meeting (PTM) - Term 1",
                content: "The first PTM of the academic year is scheduled for next Saturday, August 1st. Report cards will be shared and student progress discussed.",
                category: "Academic",
                pinned: true,
                createdAt: "2026-07-20",
                expiresAt: "2026-08-02",
                pdfUrl: "#"
            },
            {
                id: "n-3",
                title: "Annual Sports Meet 2026 Schedule",
                content: "Our Annual Sports Meet selections will begin on August 5th. All students interested in track, football, and badminton events should register with the sports coordinator.",
                category: "Sports",
                pinned: false,
                createdAt: "2026-07-18",
                expiresAt: "2026-08-15",
                pdfUrl: "#"
            },
            {
                id: "n-4",
                title: "CBSE Mandatory Disclosure Updated",
                content: "The official CBSE mandatory disclosure docs for the year 2026 have been updated in the document hub as per guidelines.",
                category: "General",
                pinned: false,
                createdAt: "2026-07-10",
                expiresAt: "",
                pdfUrl: "#"
            }
        ],
        events: [
            { id: "e-1", title: "School Reopens - Term I", date: "2026-06-15", category: "Academic", description: "Classes begin for all students." },
            { id: "e-2", title: "Independence Day Celebration", date: "2026-08-15", category: "Activity", description: "Flag hoisting ceremony, cultural parade, and music performances by students." },
            { id: "e-3", title: "First Mid-Term Examinations", date: "2026-09-07", category: "Exam", description: "Syllabus details have been distributed in class." },
            { id: "e-4", title: "Ganesh Chaturthi Holiday", date: "2026-09-14", category: "Holiday", description: "School closed for Ganesh festival celebrations." },
            { id: "e-5", title: "Parent Teacher Meeting (PTM)", date: "2026-08-01", category: "PTM", description: "Timing: 9:00 AM to 1:00 PM." },
            { id: "e-6", title: "Science & Art Exhibition", date: "2026-10-10", category: "Activity", description: "Annual display of science experiments, robotics, and fine arts created by students." },
            { id: "e-7", title: "Diwali Vacation Commences", date: "2026-11-05", category: "Holiday", description: "Vacation from November 5th to November 20th." }
        ],
        documents: [
            { id: "d-1", title: "CBSE Mandatory Public Disclosure", category: "CBSE", updatedDate: "2026-06-30", downloadUrl: "#" },
            { id: "d-2", title: "School Recognition Certificate (Form II)", category: "Recognition Certificate", updatedDate: "2026-04-15", downloadUrl: "#" },
            { id: "d-3", title: "No Objection Certificate (NOC)", category: "NOC", updatedDate: "2025-05-12", downloadUrl: "#" },
            { id: "d-4", title: "CBSE Affiliation Extension Letter", category: "Affiliation Letter", updatedDate: "2026-01-20", downloadUrl: "#" },
            { id: "d-5", title: "RTE Admission Guidelines & Approvals", category: "RTE Documents", updatedDate: "2026-03-01", downloadUrl: "#" },
            { id: "d-6", title: "School Prospectus (Academic Year 2026-27)", category: "School Prospectus", updatedDate: "2026-07-01", downloadUrl: "#" },
            { id: "d-7", title: "Academic Calendar 2026-27", category: "Academic Calendar", updatedDate: "2026-06-01", downloadUrl: "#" },
            { id: "d-8", title: "Official Textbooks & Stationery List", category: "Book List", updatedDate: "2026-05-20", downloadUrl: "#" },
            { id: "d-9", title: "Annual Holiday List 2026-27", category: "Holiday List", updatedDate: "2026-06-01", downloadUrl: "#" }
        ],
        faqs: [
            { id: "f-1", question: "What is the admission procedure at O'Nest Gurukul?", answer: "The admission process involves submitting the online application form, attending a friendly interaction/assessment with our panel, verifying documents, and completing the registration fee payment.", category: "Admission" },
            { id: "f-2", question: "Is O'Nest Gurukul affiliated with CBSE?", answer: "Yes, O'Nest Gurukul is a co-educational school proposed for CBSE curriculum implementation, delivering high-concept, value-based modern education.", category: "Curriculum" },
            { id: "f-3", question: "What is the school fee structure?", answer: "Our fees are structured transparently and are payable in installments. For detailed class-wise fee schedules, please visit the admission office or download our Fee Details PDF in the portal.", category: "Fees" },
            { id: "f-4", question: "Does the school provide transport facilities?", answer: "Yes, the school runs a fleet of safe GPS-equipped buses covering Ratnagiri and surrounding pickup points. Speed governors and experienced drivers are on duty.", category: "Transport" },
            { id: "f-5", question: "What co-curricular activities are offered?", answer: "We offer sports (football, cricket, badminton, table tennis), creative arts (fine arts, clay modeling), performing arts (music, dance), and digital clubs (coding, STEM experiments).", category: "Activities" },
            { id: "f-6", question: "Do you offer hostel or residential boarding facilities?", answer: "O'Nest Gurukul is currently a day school. We do not provide hostel or residential boarding facilities on campus.", category: "Hostel" },
            { id: "f-7", question: "What is the policy regarding school uniforms?", answer: "Students are required to wear the standard school uniform on Mondays, Tuesdays, Thursdays, and Fridays. The special white house uniform is worn on Wednesdays and Saturdays for assembly and sports.", category: "Uniform" }
        ],
        faculty: [
            { id: "fac-1", name: "Mrs. Savita Wadekar", role: "Principal & Academic Director", qualification: "M.A., M.Ed., Ph.D. (Edu)", experience: "20 Years", photo: "assets/img/education/parent (1).jpg", department: "Administration" },
            { id: "fac-2", name: "Mr. Prasad Joshi", role: "Senior STEM Instructor", qualification: "M.Sc. (Physics), B.Ed.", experience: "12 Years", photo: "assets/img/education/open (1).jpg", department: "Secondary" },
            { id: "fac-3", name: "Mrs. Anjali Sawant", role: "Primary English Coordinator", qualification: "M.A. (English Literature), B.Ed.", experience: "10 Years", photo: "assets/img/education/open (2).jpg", department: "Primary" },
            { id: "fac-4", name: "Mr. Sandeep Patil", role: "Physical Education HOD", qualification: "B.P.Ed., M.P.Ed.", experience: "15 Years", photo: "assets/img/education/open (3).jpg", department: "Sports" },
            { id: "fac-5", name: "Ms. Neha Ranade", role: "Fine Arts & Clay Work Specialist", qualification: "B.F.A. (Bachelor of Fine Arts)", experience: "8 Years", photo: "assets/img/education/open (4).jpg", department: "Arts" },
            { id: "fac-6", name: "Mrs. Pallavi Rane", role: "Primary Mathematics Teacher", qualification: "B.Sc. (Maths), D.Ed.", experience: "7 Years", photo: "assets/img/education/open (5).jpg", department: "Primary" }
        ],
        achievements: [
            { id: "a-1", title: "State Environmental Excellence Award", awardee: "O'Nest Gurukul Eco Club", category: "Academics", year: "2025-26", description: "Conferred by TV9 Marathi & Maharashtra Pollution Control Board for campus green initiatives.", image: "assets/ONEST/IMG-20251029-WA0472.jpg.jpeg" },
            { id: "a-2", title: "1st Rank All India Classical Dance", awardee: "Vidmayee Jayant Mane", category: "Arts", year: "2026", description: "Clinched the 1st prize trophy at 'Nritya Anubhuti' National Cultural Dance Contest.", image: "assets/ONEST/IMG-20260810-WA0439.jpg.jpeg" },
            { id: "a-3", title: "Inter-School Championship Trophy", awardee: "O'Nest Gurukul Student Team", category: "Academics", year: "2026", description: "Awarded top trophy in inter-school academic, cultural, and quiz competitions.", image: "assets/ONEST/IMG-20260808-WA0384.jpg.jpeg" },
            { id: "a-4", title: "Science Olympiad Foundation (SOF) Merits", awardee: "Primary & Middle School Scholars", category: "Olympiads", year: "2026", description: "Outstanding performance and gold merit certificates in SOF National Olympiads.", image: "assets/ONEST/WhatsApp Image 2026-08-04 at 12.37.32 PM.jpeg" },
            { id: "a-5", title: "State Martial Arts & Karate Champions", awardee: "O'Nest Karate Squad", category: "Sports", year: "2026", description: "Won gold and silver medals in state-level Karate & self-defense championships.", image: "assets/ONEST/WhatsApp Image 2026-08-04 at 12.36.28 PM.jpeg" }
        ],
        testimonials: [
            { id: "t-1", name: "Mr. Rajesh Shirke", role: "Parent", text: "O'Nest Gurukul has transformed my daughter's attitude towards learning. The classrooms are modern, but the values taught are traditional and deep.", photo: "assets/img/education/parent (2).jpg" },
            { id: "t-2", name: "Mrs. Meera Gokhale", role: "Parent", text: "We shifted from Pune to Ratnagiri, and O'Nest Gurukul made the transition seamless for our son. The STEM focus and individual attention are highly impressive.", photo: "assets/img/education/parent (1).jpg" },
            { id: "t-3", name: "Mast. Rohan Joshi", role: "Alumni (Class of 2024)", text: "The foundation I got at Gurukul in computer coding and mathematics helped me clear my competitive examinations with ease. I will always cherish my time here.", photo: "assets/img/education/open (1).jpg" }
        ],
        admissions: [],
        bookings: [],
        careers: [],
        career_applications: [],
        settings: {
            emergencyBannerActive: false,
            emergencyBannerText: "ADMISSION NOTICE: The last date for online application submission for Term 1 has been extended to August 15th, 2026.",
            emergencyBannerPriority: "warning", // info, warning, critical
            analyticsEnabled: true,
            language: "en",
            googleSheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbzy_XYVQhZevOoWxX4p5l0OnnHImOgBR-obzac23We2-5Zx4VIyyjgW25Xgie3fPG-v/exec"
        }
    };

    // Database Initialization
    function initDatabase() {
        // Enforce cleanup to load latest authentic school data
        localStorage.removeItem('onest_db_careers');
        localStorage.removeItem('onest_db_career_applications');
        localStorage.removeItem('onest_db_achievements');

        Object.keys(SEED_DATA).forEach(table => {
            if (readTable(table) === null) {
                writeTable(table, SEED_DATA[table]);
            }
        });
    }

    // Run Initialization
    initDatabase();

    // Database Interface Object
    const OnestDB = {
        // --- Generic CRUD helpers ---
        getTable: function (table) {
            return readTable(table) || [];
        },
        saveTable: function (table, data) {
            return writeTable(table, data);
        },

        // --- Specific getters & operations ---
        getNotices: function () {
            // Sort: Pinned first, then by date descending
            return this.getTable('notices').sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        },
        addNotice: function (notice) {
            const table = this.getTable('notices');
            notice.id = 'notice_' + Date.now();
            notice.createdAt = new Date().toISOString().split('T')[0];
            table.push(notice);
            this.saveTable('notices', table);
            return notice;
        },
        deleteNotice: function (id) {
            let table = this.getTable('notices');
            table = table.filter(n => n.id !== id);
            return this.saveTable('notices', table);
        },
        togglePinNotice: function (id) {
            const table = this.getTable('notices');
            const notice = table.find(n => n.id === id);
            if (notice) {
                notice.pinned = !notice.pinned;
                this.saveTable('notices', table);
            }
            return notice;
        },

        getEvents: function () {
            return this.getTable('events').sort((a, b) => new Date(a.date) - new Date(b.date));
        },
        addEvent: function (event) {
            const table = this.getTable('events');
            event.id = 'event_' + Date.now();
            table.push(event);
            this.saveTable('events', table);
            return event;
        },
        deleteEvent: function (id) {
            let table = this.getTable('events');
            table = table.filter(e => e.id !== id);
            return this.saveTable('events', table);
        },

        getDocuments: function () {
            return this.getTable('documents');
        },
        addDocument: function (doc) {
            const table = this.getTable('documents');
            doc.id = 'doc_' + Date.now();
            doc.updatedDate = new Date().toISOString().split('T')[0];
            table.push(doc);
            this.saveTable('documents', table);
            return doc;
        },
        deleteDocument: function (id) {
            let table = this.getTable('documents');
            table = table.filter(d => d.id !== id);
            return this.saveTable('documents', table);
        },

        getFaqs: function () {
            return this.getTable('faqs');
        },
        getFaculty: function () {
            return this.getTable('faculty');
        },
        getAchievements: function () {
            return this.getTable('achievements');
        },
        getTestimonials: function () {
            return this.getTable('testimonials');
        },

        // --- Submissions ---
        getAdmissions: function () {
            return this.getTable('admissions').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        addAdmission: function (application) {
            const table = this.getTable('admissions');
            application.id = 'adm_' + Date.now();
            application.status = 'Submitted';
            application.createdAt = new Date().toISOString().split('T')[0];
            table.push(application);
            this.saveTable('admissions', table);
            return application;
        },
        updateAdmissionStatus: function (id, status) {
            const table = this.getTable('admissions');
            const app = table.find(a => a.id === id);
            if (app) {
                app.status = status;
                app.updatedAt = new Date().toISOString().split('T')[0];
                this.saveTable('admissions', table);
            }
            return app;
        },
        deleteAdmission: function (id) {
            let table = this.getTable('admissions');
            table = table.filter(a => a.id !== id);
            return this.saveTable('admissions', table);
        },

        getBookings: function () {
            return this.getTable('bookings').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        addBooking: function (booking) {
            const table = this.getTable('bookings');
            booking.id = 'book_' + Date.now();
            booking.status = 'Confirmed';
            booking.createdAt = new Date().toISOString().split('T')[0];
            table.push(booking);
            this.saveTable('bookings', table);
            return booking;
        },
        deleteBooking: function (id) {
            let table = this.getTable('bookings');
            table = table.filter(b => b.id !== id);
            return this.saveTable('bookings', table);
        },

        getCareers: function () {
            return this.getTable('careers');
        },
        getCareerApplications: function () {
            return this.getTable('career_applications').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        addCareerApplication: function (app) {
            const table = this.getTable('career_applications');
            app.id = 'capp_' + Date.now();
            app.createdAt = new Date().toISOString().split('T')[0];
            table.push(app);
            this.saveTable('career_applications', table);
            return app;
        },
        deleteCareerApplication: function (id) {
            let table = this.getTable('career_applications');
            table = table.filter(c => c.id !== id);
            return this.saveTable('career_applications', table);
        },

        // --- Settings ---
        getSettings: function () {
            return this.getTable('settings');
        },
        saveSettings: function (newSettings) {
            const settings = this.getSettings();
            const merged = Object.assign({}, settings, newSettings);
            return this.saveTable('settings', merged);
        },

        // --- Search Utility ---
        globalSearch: function (query) {
            if (!query || query.trim() === '') return [];
            const q = query.toLowerCase().trim();
            const results = [];

            // 1. Search Notices
            this.getNotices().forEach(n => {
                if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
                    results.push({ type: 'Notice', title: n.title, desc: n.content, link: 'index.html#notices-board' });
                }
            });

            // 2. Search Events
            this.getEvents().forEach(e => {
                if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) {
                    results.push({ type: 'Event', title: `${e.date} - ${e.title}`, desc: e.description, link: 'students-life.html#calendar' });
                }
            });

            // 3. Search FAQs
            this.getFaqs().forEach(f => {
                if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
                    results.push({ type: 'FAQ', title: f.question, desc: f.answer, link: 'index.html#faq' });
                }
            });

            // 4. Search Faculty
            this.getFaculty().forEach(fac => {
                if (fac.name.toLowerCase().includes(q) || fac.role.toLowerCase().includes(q) || fac.department.toLowerCase().includes(q)) {
                    results.push({ type: 'Faculty', title: fac.name, desc: `${fac.role} (${fac.qualification}) - ${fac.experience} Exp.`, link: 'students-life.html#faculty' });
                }
            });

            // 5. Search Documents
            this.getDocuments().forEach(d => {
                if (d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)) {
                    results.push({ type: 'Document', title: d.title, desc: `Category: ${d.category} - Updated: ${d.updatedDate}`, link: 'campus-facilities.html#download-hub' });
                }
            });

            // 6. Search Achievements
            this.getAchievements().forEach(a => {
                if (a.title.toLowerCase().includes(q) || a.awardee.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) {
                    results.push({ type: 'Achievement', title: a.title, desc: `${a.awardee} (${a.year}) - ${a.description}`, link: 'students-life.html#achievements' });
                }
            });

            // 7. Core Pages
            const pages = [
                { title: 'Home Page', desc: 'Welcome to O\'Nest Gurukul. Academic Excellence and Holistic Care.', link: 'index.html' },
                { title: 'About Us', desc: 'Our history, vision, mission, and leadership.', link: 'about.html' },
                { title: '⭐ Pre-Primary', desc: 'Nursery, LKG, UKG early childhood programs.', link: 'preprimary.html' },
                { title: 'Curriculum & Student Life', desc: 'Detailed academic stages, extra-curricular clubs, and events.', link: 'students-life.html' },
                { title: 'Campus & Facilities', desc: 'Smart classrooms, labs, sports complex, and school transport details.', link: 'campus-facilities.html' },
                { title: 'Online Admission Portal', desc: 'Apply online, check criteria, schedule campus visits, and view scholarships.', link: 'admissions.html' },
                { title: 'Contact Us', desc: 'Get in touch, view Google Maps, phone, email, and office address.', link: 'contact.html' }
            ];
            pages.forEach(p => {
                if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
                    results.push({ type: 'Page', title: p.title, desc: p.desc, link: p.link });
                }
            });

            return results;
        },

        // --- Config Export/Import ---
        exportDatabase: function () {
            const dump = {};
            Object.keys(SEED_DATA).forEach(table => {
                dump[table] = this.getTable(table);
            });
            return JSON.stringify(dump, null, 2);
        },
        importDatabase: function (jsonString) {
            try {
                const dump = JSON.parse(jsonString);
                Object.keys(dump).forEach(table => {
                    this.saveTable(table, dump[table]);
                });
                return true;
            } catch (e) {
                console.error("Failed to import database JSON", e);
                return false;
            }
        }
    };

    // Expose DB globally
    global.OnestDB = OnestDB;

})(window);

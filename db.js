/* ==========================================================================
   ONEST GURUKUL - CONTENT DATABASE & SUPABASE ADAPTER (db.js)
   Integrates Supabase dynamic database & storage with static fallback defaults.
   ========================================================================== */

(function (global) {
    'use strict';

    // Static default content fallback
    const DEFAULT_CONTENT = {
        notices: [
            {
                id: "n-1",
                title: "Admissions Open for Academic Year 2026-27",
                content: "Registrations for grades Nursery to Class 10 are now open. Parents can submit the online application form or visit the school office.",
                category: "Admission",
                pinned: true,
                createdAt: "2026-07-15",
                expiresAt: "2026-10-31",
                pdfUrl: "#",
                status: "published"
            },
            {
                id: "n-2",
                title: "Parent-Teacher Meeting (PTM) - Term 1",
                content: "The first PTM of the academic year is scheduled for next Saturday, August 1st. Report cards will be shared and student progress discussed.",
                category: "Academic",
                pinned: true,
                createdAt: "2026-07-20",
                expiresAt: "2026-08-02",
                pdfUrl: "#",
                status: "published"
            },
            {
                id: "n-3",
                title: "Annual Sports Meet 2026 Schedule",
                content: "Our Annual Sports Meet selections will begin on August 5th. All students interested in track, football, and badminton events should register with the sports coordinator.",
                category: "Sports",
                pinned: false,
                createdAt: "2026-07-18",
                expiresAt: "2026-08-15",
                pdfUrl: "#",
                status: "published"
            },
            {
                id: "n-4",
                title: "CBSE Mandatory Disclosure Updated",
                content: "The official CBSE mandatory disclosure docs for the year 2026 have been updated in the document hub as per guidelines.",
                category: "General",
                pinned: false,
                createdAt: "2026-07-10",
                expiresAt: "",
                pdfUrl: "#",
                status: "published"
            }
        ],
        events: [
            { id: "e-1", title: "School Reopens - Term I", date: "2026-06-15", category: "Academic", description: "Classes begin for all students.", status: "published" },
            { id: "e-2", title: "Independence Day Celebration", date: "2026-08-15", category: "Activity", description: "Flag hoisting ceremony, cultural parade, and music performances by students.", status: "published" },
            { id: "e-3", title: "First Mid-Term Examinations", date: "2026-09-07", category: "Exam", description: "Syllabus details have been distributed in class.", status: "published" },
            { id: "e-4", title: "Ganesh Chaturthi Holiday", date: "2026-09-14", category: "Holiday", description: "School closed for Ganesh festival celebrations.", status: "published" },
            { id: "e-5", title: "Parent Teacher Meeting (PTM)", date: "2026-08-01", category: "PTM", description: "Timing: 9:00 AM to 1:00 PM.", status: "published" }
        ],
        documents: [
            { id: "d-1", title: "CBSE Mandatory Public Disclosure", category: "CBSE", updatedDate: "2026-06-30", downloadUrl: "#", status: "published" },
            { id: "d-2", title: "School Recognition Certificate (Form II)", category: "Recognition Certificate", updatedDate: "2026-04-15", downloadUrl: "#", status: "published" },
            { id: "d-3", title: "No Objection Certificate (NOC)", category: "NOC", updatedDate: "2025-05-12", downloadUrl: "#", status: "published" },
            { id: "d-4", title: "CBSE Affiliation Extension Letter", category: "Affiliation Letter", updatedDate: "2026-01-20", downloadUrl: "#", status: "published" }
        ],
        faqs: [
            { id: "f-1", question: "What is the admission procedure at O'Nest Gurukul?", answer: "The admission process involves submitting the online application form, attending a friendly interaction/assessment with our panel, verifying documents, and completing the registration fee payment.", category: "Admission" },
            { id: "f-2", question: "Is O'Nest Gurukul affiliated with CBSE?", answer: "Yes, O'Nest Gurukul is a co-educational school proposed for CBSE curriculum implementation, delivering high-concept, value-based modern education.", category: "Curriculum" }
        ],
        faculty: [
            { id: "fac-1", name: "Mrs. Savita Wadekar", role: "Principal & Academic Director", qualification: "M.A., M.Ed., Ph.D. (Edu)", experience: "20 Years", photo: "assets/img/education/parent (1).jpg", department: "Administration" },
            { id: "fac-2", name: "Mr. Prasad Joshi", role: "Senior STEM Instructor", qualification: "M.Sc. (Physics), B.Ed.", experience: "12 Years", photo: "assets/img/education/open (1).jpg", department: "Secondary" }
        ],
        achievements: [
            { id: "a-1", title: "State Environmental Excellence Award", awardee: "O'Nest Gurukul Eco Club", category: "Academics", year: "2025-26", description: "Conferred by TV9 Marathi & Maharashtra Pollution Control Board for campus green initiatives.", image: "assets/ONEST/IMG-20251029-WA0472.jpg.jpeg", status: "published" },
            { id: "a-2", title: "1st Rank All India Classical Dance", awardee: "Vidmayee Jayant Mane", category: "Arts", year: "2026", description: "Clinched the 1st prize trophy at 'Nritya Anubhuti' National Cultural Dance Contest.", image: "assets/ONEST/IMG-20260810-WA0439.jpg.jpeg", status: "published" }
        ],
        testimonials: [
            { id: "t-1", name: "Mr. Rajesh Shirke", role: "Parent", text: "O'Nest Gurukul has transformed my daughter's attitude towards learning. The classrooms are modern, but the values taught are traditional and deep.", photo: "assets/img/education/parent (2).jpg" }
        ],
        settings: {
            emergencyBannerActive: false,
            emergencyBannerText: "ADMISSION NOTICE: Registrations for Academic Year 2026-27 are now open.",
            emergencyBannerPriority: "warning",
            analyticsEnabled: true,
            language: "en"
        }
    };

    // Helper to get active Supabase client
    function getSupaClient() {
        if (global.OnestSupabase && typeof global.OnestSupabase.getClient === 'function') {
            return global.OnestSupabase.getClient();
        }
        return null;
    }

    const OnestDB = {
        // --- 1. NOTICES API ---
        getNotices: async function (includeAllStatus = false) {
            const client = getSupaClient();
            if (client) {
                try {
                    let query = client.from('notices').select('*');
                    if (!includeAllStatus) {
                        query = query.eq('status', 'published');
                    }
                    query = query.order('pinned', { ascending: false }).order('created_at', { ascending: false });

                    const { data, error } = await query;
                    if (!error && data) {
                        return data.map(item => ({
                            id: item.id,
                            title: item.title,
                            content: item.content,
                            category: item.category,
                            pinned: item.pinned,
                            createdAt: item.created_at ? item.created_at.split('T')[0] : '',
                            expiresAt: item.expires_at || '',
                            pdfUrl: item.pdf_url || '#',
                            status: item.status
                        }));
                    }
                } catch (err) {
                    console.warn("Supabase fetch notices failed, fallback to static defaults:", err);
                }
            }
            // Fallback
            return DEFAULT_CONTENT.notices.filter(n => includeAllStatus || n.status === 'published');
        },

        addNotice: async function (notice) {
            const client = getSupaClient();
            if (client) {
                const payload = {
                    title: notice.title,
                    content: notice.content,
                    category: notice.category || 'General',
                    pinned: !!notice.pinned,
                    pdf_url: notice.pdfUrl || '#',
                    status: notice.status || 'published',
                    expires_at: notice.expiresAt || null
                };
                const { data, error } = await client.from('notices').insert([payload]).select();
                if (error) throw new Error(error.message);
                return data[0];
            }
            // Offline local fallback
            notice.id = 'n_' + Date.now();
            DEFAULT_CONTENT.notices.unshift(notice);
            return notice;
        },

        updateNotice: async function (id, notice) {
            const client = getSupaClient();
            if (client) {
                const payload = {
                    title: notice.title,
                    content: notice.content,
                    category: notice.category,
                    pinned: !!notice.pinned,
                    pdf_url: notice.pdfUrl,
                    status: notice.status,
                    expires_at: notice.expiresAt || null,
                    updated_at: new Date().toISOString()
                };
                const { data, error } = await client.from('notices').update(payload).eq('id', id).select();
                if (error) throw new Error(error.message);
                return data[0];
            }
            const idx = DEFAULT_CONTENT.notices.findIndex(n => n.id === id);
            if (idx !== -1) {
                DEFAULT_CONTENT.notices[idx] = Object.assign(DEFAULT_CONTENT.notices[idx], notice);
            }
            return notice;
        },

        archiveNotice: async function (id) {
            return this.updateNotice(id, { status: 'archived' });
        },

        deleteNotice: async function (id) {
            const client = getSupaClient();
            if (client) {
                const { error } = await client.from('notices').delete().eq('id', id);
                if (error) throw new Error(error.message);
                return true;
            }
            DEFAULT_CONTENT.notices = DEFAULT_CONTENT.notices.filter(n => n.id !== id);
            return true;
        },

        // --- 2. EVENTS API ---
        getEvents: async function (includeAllStatus = false) {
            const client = getSupaClient();
            if (client) {
                try {
                    let query = client.from('events').select('*');
                    if (!includeAllStatus) {
                        query = query.eq('status', 'published');
                    }
                    query = query.order('date', { ascending: true });

                    const { data, error } = await query;
                    if (!error && data) {
                        return data.map(e => ({
                            id: e.id,
                            title: e.title,
                            description: e.description,
                            date: e.date,
                            category: e.category,
                            imageUrl: e.image_url,
                            status: e.status
                        }));
                    }
                } catch (err) {
                    console.warn("Supabase fetch events failed:", err);
                }
            }
            return DEFAULT_CONTENT.events.filter(e => includeAllStatus || e.status === 'published');
        },

        addEvent: async function (event) {
            const client = getSupaClient();
            if (client) {
                const payload = {
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    category: event.category || 'Activity',
                    image_url: event.imageUrl || null,
                    status: event.status || 'published'
                };
                const { data, error } = await client.from('events').insert([payload]).select();
                if (error) throw new Error(error.message);
                return data[0];
            }
            event.id = 'e_' + Date.now();
            DEFAULT_CONTENT.events.push(event);
            return event;
        },

        deleteEvent: async function (id) {
            const client = getSupaClient();
            if (client) {
                const { error } = await client.from('events').delete().eq('id', id);
                if (error) throw new Error(error.message);
                return true;
            }
            DEFAULT_CONTENT.events = DEFAULT_CONTENT.events.filter(e => e.id !== id);
            return true;
        },

        // --- 3. DOCUMENTS API ---
        getDocuments: async function (includeAllStatus = false) {
            const client = getSupaClient();
            if (client) {
                try {
                    let query = client.from('documents').select('*');
                    if (!includeAllStatus) {
                        query = query.eq('status', 'published');
                    }
                    query = query.order('created_at', { ascending: false });

                    const { data, error } = await query;
                    if (!error && data) {
                        return data.map(d => ({
                            id: d.id,
                            title: d.title,
                            category: d.category,
                            downloadUrl: d.download_url,
                            updatedDate: d.updated_date,
                            status: d.status
                        }));
                    }
                } catch (err) {
                    console.warn("Supabase fetch documents failed:", err);
                }
            }
            return DEFAULT_CONTENT.documents.filter(d => includeAllStatus || d.status === 'published');
        },

        addDocument: async function (doc) {
            const client = getSupaClient();
            if (client) {
                const payload = {
                    title: doc.title,
                    category: doc.category,
                    download_url: doc.downloadUrl,
                    updated_date: doc.updatedDate || new Date().toISOString().split('T')[0],
                    status: doc.status || 'published'
                };
                const { data, error } = await client.from('documents').insert([payload]).select();
                if (error) throw new Error(error.message);
                return data[0];
            }
            doc.id = 'd_' + Date.now();
            DEFAULT_CONTENT.documents.push(doc);
            return doc;
        },

        deleteDocument: async function (id) {
            const client = getSupaClient();
            if (client) {
                const { error } = await client.from('documents').delete().eq('id', id);
                if (error) throw new Error(error.message);
                return true;
            }
            DEFAULT_CONTENT.documents = DEFAULT_CONTENT.documents.filter(d => d.id !== id);
            return true;
        },

        // --- 4. ACHIEVEMENTS & GALLERY API ---
        getAchievements: async function (includeAllStatus = false) {
            const client = getSupaClient();
            if (client) {
                try {
                    let query = client.from('gallery_items').select('*');
                    if (!includeAllStatus) {
                        query = query.eq('status', 'published');
                    }
                    query = query.order('sort_order', { ascending: true }).order('created_at', { ascending: false });

                    const { data, error } = await query;
                    if (!error && data) {
                        return data.map(g => ({
                            id: g.id,
                            title: g.title,
                            awardee: g.awardee,
                            category: g.category,
                            year: g.year,
                            image: g.image_url,
                            storagePath: g.storage_path,
                            description: g.description,
                            status: g.status
                        }));
                    }
                } catch (err) {
                    console.warn("Supabase fetch gallery failed:", err);
                }
            }
            return DEFAULT_CONTENT.achievements.filter(a => includeAllStatus || a.status === 'published');
        },

        addAchievement: async function (item) {
            const client = getSupaClient();
            if (client) {
                const payload = {
                    title: item.title,
                    awardee: item.awardee,
                    category: item.category,
                    year: item.year,
                    image_url: item.image,
                    storage_path: item.storagePath || null,
                    description: item.description,
                    status: item.status || 'published'
                };
                const { data, error } = await client.from('gallery_items').insert([payload]).select();
                if (error) throw new Error(error.message);
                return data[0];
            }
            item.id = 'a_' + Date.now();
            DEFAULT_CONTENT.achievements.push(item);
            return item;
        },

        deleteAchievement: async function (id) {
            const client = getSupaClient();
            if (client) {
                const { error } = await client.from('gallery_items').delete().eq('id', id);
                if (error) throw new Error(error.message);
                return true;
            }
            DEFAULT_CONTENT.achievements = DEFAULT_CONTENT.achievements.filter(a => a.id !== id);
            return true;
        },

        // --- 5. FAQS & FACULTY (STATIC / SYNC READS) ---
        getFaqs: function () {
            return DEFAULT_CONTENT.faqs;
        },
        getFaculty: function () {
            return DEFAULT_CONTENT.faculty;
        },
        getTestimonials: function () {
            return DEFAULT_CONTENT.testimonials;
        },

        // --- 6. SETTINGS & SITE CONTENT API ---
        getSettings: async function () {
            const client = getSupaClient();
            if (client) {
                try {
                    const { data, error } = await client.from('site_content').select('content').eq('key', 'settings').single();
                    if (!error && data && data.content) {
                        return data.content;
                    }
                } catch (err) {
                    console.warn("Supabase fetch settings failed:", err);
                }
            }
            return DEFAULT_CONTENT.settings;
        },

        saveSettings: async function (newSettings) {
            const client = getSupaClient();
            const current = await this.getSettings();
            const merged = Object.assign({}, current, newSettings);

            if (client) {
                const { error } = await client.from('site_content').upsert({
                    key: 'settings',
                    content: merged,
                    updated_at: new Date().toISOString()
                });
                if (error) throw new Error(error.message);
                return merged;
            }
            DEFAULT_CONTENT.settings = merged;
            return merged;
        },

        // --- 7. STORAGE IMAGE & FILE UPLOADER ---
        uploadAsset: async function (file, bucket = 'site-assets') {
            const client = getSupaClient();
            if (!client) {
                throw new Error("Supabase client is not initialized. Please configure Supabase credentials.");
            }

            // Validate file size (<5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("File size exceeds the 5MB maximum limit.");
            }

            const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const filePath = `${Date.now()}_${cleanFileName}`;

            const { data, error } = await client.storage.from(bucket).upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

            if (error) {
                throw new Error("Upload failed: " + error.message);
            }

            // Get Public URL
            const { data: urlData } = client.storage.from(bucket).getPublicUrl(filePath);
            return {
                publicUrl: urlData.publicUrl,
                path: filePath
            };
        },

        // Export data helper
        exportDatabase: function () {
            return JSON.stringify(DEFAULT_CONTENT, null, 2);
        }
    };

    // Expose global object
    global.OnestDB = OnestDB;

})(window);

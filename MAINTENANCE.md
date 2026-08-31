# O'Nest Gurukul — Maintenance Guide

This document describes how to update notices, circulars, calendar events, FAQs, faculty profiles, and school configuration details using the static database.

---

## 🛠️ Content Architecture (`db.js`)

Because this website operates without a server database (to ensure simple static hosting), all dynamic content is stored inside the `db.js` script in the root directory.
This script exposes a global `OnestDB` database object containing arrays of content:
- `notices`: Displayed on the Home Page notice board.
- `events`: Used in the Academic Calendar.
- `documents`: Regulatory disclosure files and bookstore forms.
- `faqs`: Help and tuition guides.
- `faculty`: Profiles in the staff directory.
- `achievements`: Sports and educational awards.
- `testimonials`: Parent feedback slides.
- `settings`: Webhook URL and emergency banner configuration.

---

## 🖥️ Using the Admin CMS Panel (`admin.html`)

O'Nest Gurukul features a **secured offline CMS sandbox** (`admin.html`) that allows the administration desk to edit school data without editing script code files manually.

### Step-by-Step Update Procedure:

1. **Launch the Panel**:
   Open the file `admin.html` in your web browser. (This can be run locally on the school administration computer).
2. **Modify Content**:
   - Select a content category from the sidebar (e.g. *Announcements & Notices* or *Calendar Events*).
   - To **Add** an entry: Click **Add New Item**, fill out the input fields, and submit.
   - To **Edit**: Click the edit button on any row, adjust details, and submit.
   - To **Delete**: Click the delete icon.
3. **Configure Settings (Alert Banner / Webhooks)**:
   - Select the **Banner & Webhooks** tab from the sidebar.
   - You can toggle the **Emergency Banner** to display alerts at the top of all pages, configure its urgency level (warning, critical, info), and write customized alert copy.
   - You can update the **Google Sheets Webhook URL** if the receiving spreadsheet changes.
4. **Save Changes**:
   - Click the prominent golden button in the top header: **Save & Download db.js**.
   - Your browser will generate and download an updated `db.js` file.
5. **Publish Changes**:
   - Move the downloaded `db.js` file from your downloads folder into the website root directory, **overwriting the old db.js**.
   - Commit and push the changes to GitHub (or upload via your host's files dashboard). The live site will instantly load the new entries!

---

## 💾 Backup & Recovery Strategy

Since all data lives in `db.js`, backing up the database is simple:
- **Local File Backup**: Keep a copy of your `db.js` file in a secure backup folder. Reverting to a previous backup is as simple as copying that older `db.js` file back into the website directory.
- **Git Version History**: If the site is tracked via Git, every commit of `db.js` acts as an automatic backup. You can restore data from any previous day using standard Git revision actions.
- **Export Schema**: You can extract the JSON database content from `admin.html` under settings by copying the database content payload.

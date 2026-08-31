# STATIC GITHUB PAGES + SUPABASE CMS — MASTER IMPLEMENTATION PROMPT

## Goal
Upgrade the existing school website into a static-first CMS architecture:
- Public website stays on GitHub Pages.
- No GitHub Actions is required for CMS content updates.
- Supabase provides secure admin authentication, database content, and image storage.
- Admin can manage notices, events, gallery, homepage content, and images.
- Preserve all existing pages, styling, forms, navigation, and working functionality.

## NON-NEGOTIABLE RULES

1. Inspect the entire existing repository before changing anything.
2. Do not rebuild or redesign the website unnecessarily.
3. Do not delete existing pages, assets, forms, or content automatically.
4. Do not use localStorage as the shared CMS database.
5. Do not put GitHub tokens, Supabase service-role keys, passwords, or secrets in frontend code.
6. Never implement fake authentication such as `if (password === "...")`.
7. Use Supabase Auth for real administrator authentication.
8. Use Supabase Row Level Security (RLS) for authorization.
9. Use Supabase Storage for CMS-managed images.
10. GitHub Pages remains the static hosting layer.
11. CMS content changes must update Supabase directly; they must NOT require GitHub Actions or a GitHub redeployment.
12. Make changes in small phases and test after every phase.
13. Preserve a known-good rollback point before major migration.
14. If something cannot be tested, explicitly report `NOT TESTED`.
15. Never claim a feature works unless it was actually tested.

## PHASE 1 — AUDIT ONLY

Do not modify files yet.

Inspect:
- repository structure
- all pages
- CSS/JS
- existing CMS/admin
- existing login
- notice board
- gallery
- homepage
- Campus Facilities
- forms
- JSON/data files
- localStorage/sessionStorage
- image handling
- GitHub Pages setup
- build/deployment configuration
- external services

Determine exactly:
- where notices are stored
- how notices are created/edited/deleted
- whether localStorage is being used
- how images are stored/referenced
- whether current authentication is secure
- whether any credentials/tokens are exposed
- which pages depend on current CMS behavior

Produce:
SAFE TO CHANGE
NEEDS CARE
DO NOT TOUCH

Do not proceed until the audit is understood.

## PHASE 2 — TARGET ARCHITECTURE

Use:

    GitHub Pages
        +
    Existing static HTML/CSS/JS
        +
    Supabase Auth
        +
    Supabase Postgres
        +
    Supabase Storage
        +
    RLS

Architecture:

    PUBLIC WEBSITE
    GitHub Pages
          |
          | reads public CMS content
          v
    SUPABASE
      |-- Auth
      |-- Database
      |-- Storage
      |-- RLS
          ^
          |
    ADMIN CMS
      |-- Login
      |-- Notices
      |-- Events
      |-- Gallery
      |-- Homepage
      |-- Campus Facilities
      |-- Documents
      |-- Settings

The website remains static. CMS-managed content is dynamic.

A CMS change should flow:

    Admin
      -> Supabase
      -> Public website fetches latest content

No GitHub Actions.

## PHASE 3 — SUPABASE SETUP

Check whether Supabase is already configured.

Do not create duplicate projects/tables.

Required:
- Supabase Auth
- Postgres
- Storage
- RLS

Frontend may use only the public/anon/publishable key intended for browser use.

NEVER expose:
- service-role key
- database password
- private keys
- secret API keys

Use environment/configuration appropriate to the existing project and ensure secrets are gitignored.

## PHASE 4 — DATABASE

Use simple structured tables. Suggested minimum:

    profiles
    notices
    events
    gallery_items
    site_content

Adapt to existing architecture if equivalent structures already exist.

### profiles
- id
- user_id
- name
- role
- created_at
- updated_at

Roles:
- admin
- editor

### notices
- id (UUID/stable ID)
- title
- description
- date
- category
- status
- attachment_url
- created_by
- created_at
- updated_at

Statuses:
- draft
- published
- archived

Public website shows only published notices.

### events
- id
- title
- description
- start_date
- end_date
- location
- image_url
- status
- created_by
- created_at
- updated_at

### gallery_items
- id
- title
- image_url
- storage_path
- alt_text
- caption
- sort_order
- status
- created_by
- created_at
- updated_at

### site_content
Store only content that genuinely needs CMS management, such as homepage hero content or selected editable sections.

Do not move every static element into the database.

## PHASE 5 — ROW LEVEL SECURITY

Enable RLS on every CMS table.

Public/anonymous users:
- may read only intentionally public published content.

Editors:
- may create/edit/publish/archive content only as allowed.

Admins:
- may perform administrative operations and user management.

Anonymous users must NOT be able to:
- create notices
- edit notices
- delete notices
- upload CMS content
- modify site settings

Do not disable RLS to solve development problems.

Test every policy.

## PHASE 6 — STORAGE

Create controlled buckets as needed, e.g.:

    site-images
    gallery
    documents

Public images may be public-read only when intentionally public.

Write/upload/delete operations must be authenticated and authorized.

Validate:
- MIME type
- extension
- file size
- filename/path

Preferred image formats:
- JPG/JPEG
- PNG
- WebP

Reject executable or unrelated file types.

Do not make sensitive documents public.

## PHASE 7 — SECURE ADMIN LOGIN

Use Supabase Auth.

Provide:
- email/password login
- session persistence
- logout
- session expiration handling
- password reset if appropriate
- protected admin routes
- role checking

Do not rely only on hiding the admin page. Database and storage permissions must enforce authorization.

Do not store passwords in:
- HTML
- JavaScript
- JSON
- localStorage
- GitHub

## PHASE 8 — ADMIN DASHBOARD

Preserve the existing CMS design where practical.

Provide applicable sections:

    Dashboard
    Notices
    Events
    Gallery
    Homepage
    Campus Facilities
    Documents
    Settings
    Admin Users
    Logout

Do not add unnecessary complexity.

## PHASE 9 — NOTICE MANAGEMENT

Admin/editor should be able to:
- create
- edit
- preview
- save draft
- publish
- unpublish
- archive
- permanently delete with confirmation
- search/filter where useful

Normal removal should be ARCHIVE rather than immediate destruction.

Handle:
- loading
- empty state
- network error
- session expiry
- database error

Never silently fail.

## PHASE 10 — PUBLIC NOTICE BOARD

Refactor the existing public notice board to read published notices from Supabase.

Do NOT use localStorage as the shared source.

Query only published notices and order appropriately.

Handle:
- loading
- no notices
- request failure
- invalid data

A CMS request failure must not crash the entire website.

Provide a graceful fallback where practical.

## PHASE 11 — IMAGE MANAGEMENT

Admin/editor can:
- upload
- preview
- replace
- edit alt text
- edit caption
- reorder gallery
- publish/hide
- archive/delete

Replacement workflow:
1. Upload new image.
2. Verify successful upload.
3. Update database metadata.
4. Confirm new path/URL.
5. Only then remove old image if appropriate.
6. Never leave a broken reference.

## PHASE 12 — HOMEPAGE AND FACILITIES IMAGES

Allow CMS replacement of existing CMS-controlled images such as:
- hero image
- school building image
- principal image
- facility images
- gallery images

Preserve the existing visual design.

The CMS should change the content/image source, not redesign the page.

## PHASE 13 — CAMPUS FACILITIES PROTECTION

This page is sensitive.

Before modifying it:
- preserve a known-good commit
- inspect HTML/CSS/JS
- document current layout/images/responsive behavior

Do not redesign it.

After CMS integration verify:
- layout unchanged
- spacing unchanged
- typography unchanged
- images correct
- responsive behavior unchanged

## PHASE 14 — EXISTING FORMS

Do not rewrite unrelated forms.

Verify they still work after CMS changes:
- validation
- submission
- success/error states
- mobile behavior
- integrations

## PHASE 15 — PERFORMANCE

Keep the public website lightweight.

- fetch only required content
- lazy-load gallery images
- optimize large images
- use reasonable image sizes
- avoid unnecessary database requests
- cache public content appropriately

Do not turn the whole website into a heavy SPA unless already structured that way.

## PHASE 16 — SEO

Preserve and verify:
- titles
- meta descriptions
- canonical URLs
- robots.txt
- sitemap.xml
- Open Graph
- structured data where applicable
- image alt text
- existing URLs

Do not change URLs unnecessarily.

## PHASE 17 — ERROR HANDLING

Show useful messages for:
- login failure
- expired session
- unauthorized action
- database failure
- upload failure
- invalid image
- oversized image
- notice save failure
- publish failure

Never expose secrets or raw sensitive backend errors.

Sanitize/escape user-generated content to prevent XSS.

## PHASE 18 — SECURITY AUDIT

Check for:
- exposed passwords
- service-role keys
- GitHub tokens
- API secrets
- frontend-only authentication
- missing RLS
- unrestricted storage
- unrestricted database writes
- unsafe uploads
- XSS
- unsafe HTML rendering
- insecure redirects

## PHASE 19 — TESTING

### Authentication
1. Open admin logged out: access denied.
2. Log in: access granted.
3. Logout: access denied again.
4. Test invalid/expired session.

### Notices
1. Create TEST NOTICE A as draft.
2. Verify it is not public.
3. Publish it.
4. Verify it is public.
5. Edit it.
6. Verify updated content.
7. Archive it.
8. Verify it disappears publicly.
9. Permanently delete it.
10. Verify it is gone.

### Cross-device
Verify published changes from:
- desktop
- private/incognito browser
- mobile
- another device where possible

No shared content may depend on localStorage.

### Images
1. Upload TEST IMAGE A.
2. Verify CMS preview.
3. Publish.
4. Verify public display.
5. Replace with TEST IMAGE B.
6. Verify replacement publicly.
7. Archive/delete.
8. Verify no broken public reference.

### Security
Attempt unauthorized:
- database write
- notice update
- notice delete
- storage upload
- admin access

All must fail safely.

## PHASE 20 — DEPLOYMENT

Website code:

    GitHub
       ->
    GitHub Pages

CMS content:

    Admin
       ->
    Supabase
       ->
    Public website fetches latest content

Do NOT require GitHub Actions for CMS updates.

A content change must not require a GitHub commit or website redeployment.

## PHASE 21 — BACKUP/ROLLBACK

Before migration:
- preserve current known-good Git commit
- back up notices
- preserve image paths
- preserve existing assets
- preserve CMS data

If something breaks:
STOP.
Identify the exact change.
Restore the affected functionality.
Do not stack unrelated fixes onto a broken state.

## PHASE 22 — FINAL ACCEPTANCE

Confirm:

[ ] Existing pages work
[ ] Navigation works
[ ] Forms work
[ ] Campus Facilities remains intact
[ ] GitHub Pages works
[ ] Supabase works
[ ] Admin authentication works
[ ] Unauthorized access is blocked
[ ] RLS is enabled and tested
[ ] Public users can read intended published content
[ ] Admin can create/edit/publish/archive/delete notices
[ ] Public notice board reads Supabase
[ ] Notice changes propagate across devices
[ ] Admin can upload/replace images
[ ] Gallery management works
[ ] Image validation works
[ ] No secrets are exposed
[ ] No GitHub Actions are required for CMS updates
[ ] No GitHub token is exposed
[ ] No service-role key is exposed
[ ] localStorage is not the shared CMS source
[ ] Error handling works
[ ] Mobile works
[ ] Production works
[ ] Rollback is documented

## FINAL REPORT

Provide:
1. Existing architecture discovered
2. Architecture implemented
3. Files changed
4. Files created
5. Files intentionally untouched
6. Supabase tables
7. RLS policies
8. Storage buckets/policies
9. Authentication method
10. Admin roles
11. Notice workflow
12. Image workflow
13. Public data flow
14. Security controls
15. Tests performed
16. Tests passed
17. Tests not performed
18. Remaining risks
19. Deployment instructions
20. Rollback instructions

Most important:
PRESERVE THE EXISTING WEBSITE.
INSPECT FIRST.
BACK UP FIRST.
IMPLEMENT ONE PHASE AT A TIME.
TEST EVERY PHASE.
NEVER EXPOSE SECRETS.
NEVER DESTROY PRODUCTION CONTENT.
NEVER USE FAKE FRONTEND AUTHENTICATION.
NEVER USE LOCALSTORAGE AS THE SHARED SOURCE OF TRUTH.
NEVER REQUIRE GITHUB ACTIONS FOR CMS CONTENT UPDATES.

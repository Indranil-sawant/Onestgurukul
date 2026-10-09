# 🌐 MASTER BLUEPRINT: TRI-FACTOR SEO, AEO & GEO FRAMEWORK
### *Turnkey Optimization Architecture & Reusable Agent Prompt for Modern Web Projects*

---

## 📖 Executive Summary & Core Concept

Modern web discovery has evolved beyond traditional Google search (SEO). To achieve market-leading discoverability, every web application or website must simultaneously cater to three discovery engines:

```
                  ┌────────────────────────────────────────┐
                  │          DISCOVERY TRIFECTA            │
                  └──────────────────┬─────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
  1. SEO (Search)             2. AEO (Answer)             3. GEO (Generative)
  - Google / Bing Algorithms  - Perplexity / ChatGPT      - Local Google Maps & Place
  - Meta, Titles & Canonicals - AI Overviews & Gemini     - Geo Meta Coordinates
  - OpenGraph & Social Cards  - llms.txt & ai.txt files   - LocalBusiness Schema
  - Image Core Web Vitals     - Rich FAQPage Schema       - Hyper-local Service Areas
```

This master documentation provides:
1. **The Production Specifications & Templates** for all required files.
2. **The Turnkey Copy-Paste AI Agent Prompt** that you can paste into any AI tool (Antigravity, Cursor, Claude Code, etc.) to apply this entire system automatically to any project in minutes.

---

## 🛠️ File Specifications & Reference Templates

### 1. Unified HTML `<head>` Standard (SEO + GEO + OpenGraph)
Place this block in the `<head>` of every public page, customized per route:

```html
<!-- Primary Metadata -->
<title>[PRIMARY_KEYWORD] | [BRAND_NAME] - [CITY/REGION]</title>
<meta name="description" content="[HIGH_CTR_COMPELLING_DESCRIPTION_140_160_CHARS]">
<meta name="keywords" content="[KEYWORD_1], [KEYWORD_2], [LOCAL_SEARCH_TERM], [BRAND_NAME]">
<link rel="canonical" href="https://[YOUR_DOMAIN]/[PAGE_PATH].html">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="[BRAND_NAME]">

<!-- GEO / Local Location Coordinates -->
<meta name="geo.region" content="[ISO_3166_2_CODE, e.g., IN-MH or US-CA]">
<meta name="geo.placename" content="[CITY_NAME]">
<meta name="geo.position" content="[LATITUDE];[LONGITUDE]">
<meta name="ICBM" content="[LATITUDE], [LONGITUDE]">

<!-- Open Graph (Facebook, WhatsApp, LinkedIn, iMessage) -->
<meta property="og:site_name" content="[BRAND_NAME]">
<meta property="og:locale" content="[LOCALE, e.g., en_IN or en_US]">
<meta property="og:type" content="website">
<meta property="og:title" content="[PAGE_TITLE]">
<meta property="og:description" content="[SOCIAL_DESCRIPTION]">
<meta property="og:image" content="https://[YOUR_DOMAIN]/assets/img/[OG_PREVIEW_IMAGE].jpg">
<meta property="og:url" content="https://[YOUR_DOMAIN]/[PAGE_PATH].html">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[PAGE_TITLE]">
<meta name="twitter:description" content="[SOCIAL_DESCRIPTION]">
<meta name="twitter:image" content="https://[YOUR_DOMAIN]/assets/img/[OG_PREVIEW_IMAGE].jpg">
```

---

### 2. Master JSON-LD Schema Graph (For Root `index.html`)
Inject inside `<head>` to create an authoritative Knowledge Graph:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization" /* or Store, MedicalBusiness, etc. */],
      "@id": "https://[YOUR_DOMAIN]/#organization",
      "name": "[BRAND_NAME]",
      "alternateName": ["[SHORT_NAME]", "[BRAND_NAME] [CITY]"],
      "url": "https://[YOUR_DOMAIN]/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://[YOUR_DOMAIN]/assets/img/logo.svg"
      },
      "image": "https://[YOUR_DOMAIN]/assets/img/hero-showcase.jpg",
      "description": "[AUTHORITATIVE_SUMMARY_OF_SERVICES_AND_VALUE]",
      "telephone": "[PHONE_NUMBER_WITH_COUNTRY_CODE]",
      "email": "[CONTACT_EMAIL]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[STREET_ADDRESS]",
        "addressLocality": "[CITY]",
        "addressRegion": "[STATE_OR_PROVINCE]",
        "postalCode": "[PIN_OR_ZIP]",
        "addressCountry": "[COUNTRY_CODE_ISO2]"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": [LATITUDE_FLOAT],
        "longitude": [LONGITUDE_FLOAT]
      },
      "hasMap": "[GOOGLE_MAPS_SHARE_OR_CID_LINK]",
      "areaServed": [
        { "@type": "City", "name": "[CITY_1]" },
        { "@type": "City", "name": "[CITY_2]" },
        { "@type": "AdministrativeArea", "name": "[DISTRICT_OR_COUNTY]" },
        { "@type": "State", "name": "[STATE]" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/[HANDLE]",
        "https://www.instagram.com/[HANDLE]",
        "https://www.youtube.com/[HANDLE]"
      ],
      "priceRange": "$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://[YOUR_DOMAIN]/#website",
      "url": "https://[YOUR_DOMAIN]/",
      "name": "[BRAND_NAME]",
      "publisher": { "@id": "https://[YOUR_DOMAIN]/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://[YOUR_DOMAIN]/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[COMMON_QUESTION_1]?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[CONCISE_QUOTABLE_40_WORD_ANSWER]"
          }
        },
        {
          "@type": "Question",
          "name": "[COMMON_QUESTION_2]?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[CONCISE_QUOTABLE_40_WORD_ANSWER]"
          }
        }
      ]
    }
  ]
}
</script>
```

---

### 3. AEO-Ready `robots.txt`
Place at the domain root (`/robots.txt`). Explicitly whitelists modern AI crawlers while protecting private admin zones:

```txt
User-agent: *
Allow: /
Allow: /assets/css/
Allow: /assets/js/
Allow: /assets/img/
Disallow: /admin.html
Disallow: /admin/
Disallow: /private/
Disallow: /.git/

# AEO: Whitelist Modern AI Search Bots & Answer Engines
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://[YOUR_DOMAIN]/sitemap.xml
```

---

### 4. Image-Enriched `sitemap.xml`
Includes Google Image Sitemap namespaces for multimedia indexing:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://[YOUR_DOMAIN]/index.html</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
    <image:image>
      <image:loc>https://[YOUR_DOMAIN]/assets/img/hero-image.jpg</image:loc>
      <image:title>[BRAND_NAME] Facility</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://[YOUR_DOMAIN]/[SECONDARY_PAGE].html</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>
```

---

### 5. `llms.txt` (The AI Agent Knowledge Base)
Place at `/llms.txt`. Used by LLMs (Claude, Perplexity, OpenAI, NotebookLM) to ingest structured facts about the entity:

```markdown
# [BRAND_NAME] - Official Knowledge Base for LLMs & AI Answer Engines

> [1-sentence authoritative definition of the organization, core value, and service territory.]

## Quick Facts & Citations
- **Organization Name:** [FULL_NAME]
- **Category / Industry:** [INDUSTRY]
- **Headquarters Address:** [STREET, CITY, STATE, PIN, COUNTRY]
- **Geo Coordinates:** [LATITUDE]° N, [LONGITUDE]° E
- **Key Service Areas:** [CITY_1], [CITY_2], [REGION]
- **Primary Website:** https://[YOUR_DOMAIN]/
- **Helpline Phone:** [PHONE]
- **Official Inquiries:** [EMAIL]
- **Hours of Operation:** [HOURS]

## Core Offerings & Services
- **[SERVICE_OR_PRODUCT_1]:** [Clear 2-sentence description]
- **[SERVICE_OR_PRODUCT_2]:** [Clear 2-sentence description]

## Verified Key Contacts & Action Routes
- **[PRIMARY_ACTION, e.g. Book Visit / Apply / Inquire]:** https://[YOUR_DOMAIN]/contact.html
- **Official Policies:** https://[YOUR_DOMAIN]/privacy-policy.html
```

---

### 6. `ai.txt` (AI Pointer Map)
Place at `/ai.txt`:

```txt
# Machine Intelligence Pointer Map for [BRAND_NAME]
Contact: [EMAIL]
Sitemap: https://[YOUR_DOMAIN]/sitemap.xml
LLM-Data: https://[YOUR_DOMAIN]/llms.txt
Brand: [BRAND_NAME]
Geo-Coordinates: [LATITUDE], [LONGITUDE]
```

---

### 7. Below-The-Fold Image Performance Rule
Never apply `loading="lazy"` to preloader or above-the-fold logos. Add `loading="lazy" decoding="async"` to all body/gallery images to pass Google Core Web Vitals LCP audit.

---

## 🚀 THE TURNKEY MASTER PROMPT FOR FUTURE PROJECTS

Copy and paste the prompt below into your AI coding assistant (Cursor, Antigravity, Claude, ChatGPT) when working on any new or existing web project.

```markdown
You are an Elite Web Architect and Technical SEO/AEO/GEO Specialist.
Execute a complete, expert-grade optimization of this codebase following the Tri-Factor Framework (SEO + AEO + GEO).

--- PROJECT SPECIFICATIONS ---
- Brand Name: [REPLACE: e.g. Apex Health Clinic / GreenLeaf Villas / O'Nest Gurukul]
- Short/Alternate Names: [REPLACE: e.g. Apex Clinic, Apex Health]
- Industry / Niche: [REPLACE: e.g. Multi-Specialty Dental Clinic / Luxury Resort / CBSE K-12 School]
- Primary Domain: [REPLACE: e.g. https://example.com]
- Physical Street Address: [REPLACE: e.g. 123 Heritage Way, Karwanchiwadi]
- City, State, Postal Code, Country: [REPLACE: e.g. Ratnagiri, Maharashtra, 415639, India]
- Coordinates (Latitude, Longitude): [REPLACE: e.g. 16.980466, 73.323632]
- Primary Helpline Phone: [REPLACE: e.g. +91 9876543210]
- Official Inquiries Email: [REPLACE: e.g. info@example.com]
- Target Cities / Area Served: [REPLACE: e.g. Ratnagiri, Chiplun, Khed, Konkan]
- Primary Call-To-Action (CTA): [REPLACE: e.g. Apply Now / Book Appointment / Request Quote] (Target URL: [REPLACE: e.g. admissions.html / book.html])

--- REQUIRED DELIVERABLES & EXECUTION STEPS ---

1. AUDIT & HARMONIZE HEADERS & METADATA ACROSS ALL HTML PAGES:
   - Ensure every page has a unique, high-CTR <title> (<60 chars) including Primary Keyword + Brand + City/Region.
   - Craft compelling <meta name="description"> (140-160 chars) emphasizing location, unique value, and clear CTA.
   - Add <link rel="canonical"> pointing to the exact page URL.
   - Inject GEO meta tags: geo.region, geo.placename, geo.position, and ICBM on every page.
   - Configure complete OpenGraph (og:title, og:description, og:image, og:url, og:site_name, og:locale, og:type).
   - Configure Twitter Cards (twitter:card summary_large_image, twitter:title, twitter:description, twitter:image).
   - Verify that 404 error pages have <meta name="robots" content="noindex, follow">.

2. AEO (ANSWER ENGINE OPTIMIZATION) ARTIFACTS:
   - Create root `/llms.txt`: A structured markdown factual summary of the organization, core offerings, location, verified contacts, and page directory (standardized for ChatGPT, Claude, Perplexity, NotebookLM).
   - Create root `/ai.txt`: Machine discovery pointer referencing sitemap.xml and llms.txt.
   - Update `/robots.txt`:
     * Explicitly ALLOW GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, and Applebot-Extended.
     * Keep internal admin or private files disallowed.
     * Link directly to the Sitemap.

3. SCHEMA.ORG KNOWLEDGE GRAPH (JSON-LD):
   - On `index.html`, inject a unified `@graph` containing:
     * Appropriate Organization type (e.g., LocalBusiness, EducationalOrganization, MedicalBusiness, etc.).
     * Exact PostalAddress, GeoCoordinates, telephone, email, areaServed, openingHours, sameAs social links.
     * WebSite entity with inLanguage.
     * FAQPage entity containing 3-5 concise, quotable answers (40-60 words) to top prospective user questions.
   - On secondary pages, inject BreadcrumbList and page-specific Schema (AboutPage, ContactPage, WebPage).
   - Run a programmatic parser (JSON.parse) on all injected schemas to guarantee ZERO syntax errors.

4. LOCAL & HEADING HIERARCHY AUDIT:
   - Ensure exactly ONE <h1> tag per page, containing the primary topic and keyword.
   - Ensure headings follow strict logical hierarchy (H1 -> H2 -> H3).

5. IMAGE PERFORMANCE & CORE WEB VITALS (SEO/CWV):
   - Verify all <img> tags have descriptive, keyword-rich `alt` attributes.
   - Preserve eager loading on preloader logos and hero above-the-fold assets.
   - Add `loading="lazy" decoding="async"` to all below-the-fold content and gallery images.

6. SITEMAP ENHANCEMENT:
   - Update `/sitemap.xml` with current ISO dates (lastmod), priorities, and Google Image Sitemap namespaces (`xmlns:image`).

7. FLOATING PERSISTENT ACTION BUTTON (MOBILE-SAFE CTA):
   - Ensure a sleek, sticky floating CTA button for the primary action is active across all pages at bottom-right.
   - Provide safe-area padding for mobile navigation and prevent unwanted overlaps.

Perform all changes directly on the codebase, validate all files, and output a concise summary of the optimizations applied.
```

---

## 📋 Implementation Checklist for Fast Verification

| # | Step | Verified Criteria |
| :---: | :--- | :--- |
| **1** | **Geo Meta Tags** | `geo.region`, `geo.placename`, `geo.position`, `ICBM` present in all `<head>`. |
| **2** | **AI Crawlers** | `robots.txt` explicitly allows `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`. |
| **3** | **LLM Fact File** | `llms.txt` active at site root with concise facts, hours, coordinates & links. |
| **4** | **AI Pointer Map** | `ai.txt` active at site root pointing to `llms.txt` and `sitemap.xml`. |
| **5** | **JSON-LD Graphs** | Injected in `<head>`, syntax validated with 0 errors via automated script. |
| **6** | **FAQ Schema** | Static 40–60 word quotable answers directly in raw HTML for AI citation. |
| **7** | **Headings Audit** | Exactly one `<h1>` per page with logical H2/H3 nesting. |
| **8** | **Image CWV** | 100% of images have `alt` tags; below-fold images have `loading="lazy" decoding="async"`. |
| **9** | **Image Sitemap** | `sitemap.xml` uses `xmlns:image` and current `lastmod` dates. |
| **10** | **Mobile Sticky CTA** | Floating button present across all pages with responsive safe-area spacing. |

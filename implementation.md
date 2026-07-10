# ONEST GURUKUL - VISUAL REDESIGN IMPLEMENTATION PLAN (STATIC THEME SKINNING)

This document outlines our master strategy to visually redesign the **O'Nest Gurukul** website. As instructed, **no HTML content, text, images, forms, or scripts will be deleted or replaced**. We are using the templates in `assets/newcode/` **only as visual inspiration** to build a premium styling skin using CSS refactoring.

---

## 🎨 Global Design Inspiration Summary
After analyzing the files in `assets/newcode/`, here are the core design principles that make them feel premium:
- **Typography Scale**: High-contrast pairing of serif headings (`Libre Caslon Text`) and clean, modern sans-serif body text (`Hanken Grotesk`).
- **Color System**: Warm Vanilla (`#FFF9D9`) for background fills in dark mode, off-black charcoal (`#111111`) for structural content blocks, and clean cream surfaces (`#FFF3B0`).
- **Visual Elements**: Clean cards with `16px` border-radius, soft shadows (`0 10px 15px -3px rgba(0, 0, 0, 0.05)`), and smooth micro-animations.
- **Header & Navigation**: Glassmorphic blur-backdrops with thin border separators.

---

## 🛠️ Redesign Strategy: CSS-Only Visual Refactoring

To guarantee that **zero content is lost** and **zero functionality is broken**, we will perform all visual upgrades inside the stylesheets:
1. **Link Fonts & Global Styles**: Import the Google Fonts inside `theme-base.css` and map all headings (`h1` through `h6`) and body elements to the caslon/hanken scales.
2. **Refactor Page CSS**: Update the card selectors, form input paddings, borders, button hover states, and container alignments inside the page stylesheets:
   * `assets/css/onest-home.css`
   * `assets/css/onest-about.css`
   * `assets/css/onest-student-life.css`
   * `assets/css/onest-campus.css`
   * `assets/css/onest-admissions.css`
   * `assets/css/onest-preprimary.css`
   * `assets/css/onest-contact.css`

No text or DOM structures will be altered, ensuring 100% preservation of all existing admissions data, principal messages, maps, SEO headers, and script toggles.

---

## 📅 Page-by-Page Migration Plan

### 1. Homepage (`index.html`)
*   **What Will Change**: Header backdrop blur, hero slider overlay gradients, and the card layout of values and sections will use soft rounded margins and premium shadows.
*   **What Will Remain**: All carousel images, headings text, CTA button links, contact Google script forms, and hidden target frames.

### 2. About Us (`about.html`)
*   **What Will Change**: The timeline list elements will be styled as clean offset cards with unified padding and spacing inspired by the About template.
*   **What Will Remain**: Staff details, pictures, historic milestones, and layout structure.

### 3. Student Life / Curriculum (`students-life.html`)
*   **What Will Change**: The club grid cards will be styled with rounded borders and rose/gold badge borders.
*   **What Will Remain**: All club titles, group counts, gallery image links, and custom lightbox script bindings.

### 4. Campus Facilities (`campus-facilities.html`)
*   **What Will Change**: Facilities grid list boxes will have clean borders and transition scales on hover.
*   **What Will Remain**: Descriptions, facility list, and page structure.

### 5. Admissions (`admissions.html`)
*   **What Will Change**: Step badges and inquiry forms will receive modern focus states and unified input margins.
*   **What Will Remain**: All fields, hidden inputs, form methods, and Google Sheets endpoints.

### 6. Pre-Primary (`preprimary.html`)
*   **What Will Change**: Soft bubble corner styles, custom golden vanilla dark colors, and pastel hover effects.
*   **What Will Remain**: All cute content elements and structural tags.

### 7. Contact (`contact.html`)
*   **What Will Change**: Form element borders, layout spacings, and iframe Google map borders.
*   **What Will Remain**: Map frame, phone/email text, forms actions, and target mappings.

---

## 🧪 Verification Plan
*   **Visual Checking**: Verify that Caslon and Hanken Grotesk typography render correctly.
*   **Functional Verification**: Submit the contact form on `index.html` and `contact.html` to confirm submissions work with no JavaScript console exceptions.
*   **Routing Check**: Confirm all header and mobile navbar links navigate to their correct pages.

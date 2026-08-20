# Audit Report & Scorecard

## 🏆 Project Scorecard

| Category | Score | Grade | Status |
| :--- | :--- | :--- | :--- |
| **Structure & Django Compatibility** | 75/100 | C | Needs refactoring into modular directories |
| **Code Duplication & Redundancy** | 60/100 | D | Direct copy-paste of navigation, mobile menus, and footers |
| **CSS Architecture & Consistency** | 68/100 | D | Lack of global design system or shared theme variables |
| **Accessibility (WCAG 2.2)** | 82/100 | B | Missing input label matching, minor missing image alt attributes |
| **Asset Optimization** | 88/100 | B | Images compressed but broken references found |

**Overall Score: 74.6 / 100 (Needs Attention)**

---

## 📂 Detailed Findings

### 1. Structural Audits
*   All assets are flatly distributed under `assets/`.
*   To integrate into a Django framework:
    *   HTML pages should be converted into Django templates (using `{% extends 'base.html' %}`).
    *   Boilerplate like headers and footers should be moved to dynamic snippets.
    *   Static references must use `{% static 'path' %}` instead of hardcoded paths.

### 2. Code Duplication
*   **Header Navigation**: Duplicated completely across all 7 pages. Any update (e.g. adding a new link) requires manual editing in 7 files.
*   **Footer**: Duplicated completely across all 7 pages.
*   **Theme Toggle Scripts**: The dark/light mode toggle JS is inline or repeated across scripts.

### 3. CSS Audit
*   Variables are declared page-by-page (e.g., `--onest-home-primary`, `--onest-about-primary`).
*   No central `variables.css` or `theme.css` file.
*   Total CSS size is **~190KB** across 7 files, with over **40%** rule redundancy.

### 4. Accessibility Violations

#### [index.html](file:///home/neon/onest_school/Onestgurukul/index.html)
- **Line 502**: Missing form label pairing or input ID for `<input type='text'> (missing ID for label assoc)`
- **Line 505**: Missing form label pairing or input ID for `<input type='email'> (missing ID for label assoc)`
- **Line 508**: Missing form label pairing or input ID for `<input type='date'> (missing ID for label assoc)`
- **Line 511**: Missing form label pairing or input ID for `<textarea type='text'> (missing ID for label assoc)`

#### [students-life.html](file:///home/neon/onest_school/Onestgurukul/students-life.html)
- **Line 521**: Missing `alt` tag on `<img>` (`unknown`)

#### [campus-facilities.html](file:///home/neon/onest_school/Onestgurukul/campus-facilities.html)
- **Line 486**: Missing `alt` tag on `<img>` (`unknown`)

#### [contact.html](file:///home/neon/onest_school/Onestgurukul/contact.html)
- **Line 155**: Missing form label pairing or input ID for `<input type='text'> (missing ID for label assoc)`
- **Line 159**: Missing form label pairing or input ID for `<input type='email'> (missing ID for label assoc)`
- **Line 163**: Missing form label pairing or input ID for `<input type='text'> (missing ID for label assoc)`
- **Line 167**: Missing form label pairing or input ID for `<input type='date'> (missing ID for label assoc)`
- **Line 171**: Missing form label pairing or input ID for `<textarea type='text'> (missing ID for label assoc)`

#### [admissions.html](file:///home/neon/onest_school/Onestgurukul/admissions.html)
- **Line 223**: Missing form label pairing or input ID for `<input type='text'> (missing ID for label assoc)`
- **Line 227**: Missing form label pairing or input ID for `<input type='date'> (missing ID for label assoc)`
- **Line 234**: Missing form label pairing or input ID for `<input type='text'> (missing ID for label assoc)`
- **Line 238**: Missing form label pairing or input ID for `<input type='email'> (missing ID for label assoc)`
- **Line 245**: Missing form label pairing or input ID for `<input type='tel'> (missing ID for label assoc)`
- **Line 249**: Missing form label pairing or input ID for `<select type='text'> (missing ID for label assoc)`
- **Line 270**: Missing form label pairing or input ID for `<textarea type='text'> (missing ID for label assoc)`

--- Report Generated. ---

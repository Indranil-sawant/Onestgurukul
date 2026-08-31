# O'Nest Gurukul — Production Deployment Checklist

Use this checklist to track tasks during the DNS propagation and hosting migration window.

---

## 🌐 1. Domain & DNS Configuration
- [ ] **Domain Verification**: Confirm domain registration for `onestgurukul.in` is active and renewal dates are tracked.
- [ ] **A Records**: Set DNS `A` records to point to the production host IP addresses (e.g. GitHub Pages IPs or Netlify load balancers).
- [ ] **CNAME Setup**: Add CNAME records for `www.onestgurukul.in` redirecting to the canonical domain.
- [ ] **Transactional Email (MX)**: Check that MX records for school mailbox hosting (Google Workspace/Zoho) are configured.
- [ ] **Security TXT Records**: Add SPF, DKIM, and DMARC text records to block email spoofing on the school's domain.

---

## 🔒 2. SSL/HTTPS & Web Security
- [ ] **HTTPS Redirection**: Verify that the host enforces secure SSL redirects (redirecting `http://` to `https://`).
- [ ] **TLS Certificate**: Check that a valid SSL certificate (e.g., from Let's Encrypt or Cloudflare) is successfully bound.
- [ ] **Security Headers**: Ensure that frames, MIME sniffing protection, and clickjacking restrictions are set (where supported by host).

---

## 📄 3. Legal Compliance & CBSE Mandates
- [ ] **CBSE Mandates**: Verify that the **CBSE Mandatory Disclosure** document download links point to the official, verified PDF files in the download hub on `campus-facilities.html`.
- [ ] **Footer Legal Linking**: Confirm that every page includes links in the footer bottom to:
  - Privacy Policy (`legal/privacy-policy.html`)
  - Terms & Conditions (`legal/terms-and-conditions.html`)
  - Developer Disclaimer (`legal/disclaimer.html`)
  - Accessibility Statement (`legal/accessibility.html`)
  - Copyright Notice (`legal/copyright.html`)
- [ ] **Placeholder Audit**: Confirm all bracketed templates (e.g. `[ SCHOOL LEGAL NAME ]`) have been populated or verified by the school.

---

## 📝 4. Forms, Captcha, & Webhooks
- [ ] **Webhook Validation**: Submit a test entry on all forms:
  - Homepage Enquiry (`index.html`)
  - Contact Us message (`contact.html`)
  - Multistep Admission form (`admissions.html`)
  - Visit Booking Form (`admissions.html`)
  - Prospectus Download popup (`admissions.html`)
- [ ] **Sheets Log Verification**: Open the connected Google Sheet to verify that the webhook has appended data correctly (with name, phone, email, and dates).
- [ ] **Spam Protection**: Check that the **honeypot** trap functions correctly by submitting data with the honeypot field filled (it should fail/discard).
- [ ] **Math Challenge**: Check that the admissions captcha updates on reload and blocks incorrect math calculations.

---

## 🔍 5. Search Engine Optimization (SEO)
- [ ] **Sitemap Submission**: Submit `https://onestgurukul.in/sitemap.xml` inside Google Search Console and Bing Webmaster Tools.
- [ ] **Robots.txt Location**: Ensure `robots.txt` exists in the root folder and points to the correct sitemap location.
- [ ] **Canonical URL Tags**: Check that `<link rel="canonical" ...>` exists in the `<head>` of all pages, matching the production domain.
- [ ] **Unique Metadata**: Verify each page has a unique `<title>` and `<meta name="description">` that matches local Ratnagiri keywords.

---

## ♿ 6. Accessibility & Responsiveness
- [ ] **Keyboard Navigation**: Check that a user can tab through header links, buttons, and form inputs with visible focus rings.
- [ ] **Screen Readers**: Test the form structures to make sure input labels are announced correctly.
- [ ] **Alt Tags**: Check that all images (excluding decorative shapes) have descriptive alternative attributes.
- [ ] **Mobile Overflows**: Check that pages scale down to 320px with no horizontal scroll overflows or text wrapping overlaps.

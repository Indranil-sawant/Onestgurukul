# O'Nest Gurukul — Security Documentation

This document describes the security architecture, form protection mechanisms, and deployment configurations recommended to secure the O'Nest Gurukul school website.

---

## 🔒 Security Architecture

The website is deployed as a static application:
- **No Backend Server**: The site has no server-side execution environment (e.g. PHP, Node, Python server) and no public database endpoints. This design automatically eliminates a large category of web vulnerabilities, such as SQL Injection (SQLi), server-side Remote Code Execution (RCE), and database credential thefts.
- **Client-Side Storage**: Dynamic content is seeded from `db.js`, which contains public school records (notices, circulars). No confidential parent, teacher, or student credentials reside in this database.

---

## 📝 Form Security & Spam Protection

We have implemented standard security measures to protect enquiry and admission forms:

### 1. Honeypot Spam Protection
- To prevent automated spambots from flooding the school's Google Sheet webhook, we have integrated a hidden input field into all forms:
  ```html
  <div style="display:none;">
    <input type="text" name="honeypot" id="bk-honeypot" tabindex="-1" autocomplete="off">
  </div>
  ```
- **How it works**: Spambots inspect the raw HTML structure and blindly fill out all input fields, including hidden ones. Real parents using the visual browser cannot see or interact with this field. If the honeypot field is filled during form submission, the script flags it as spam and immediately discards the submission without posting to the Google Sheets webhook.

### 2. Client-Side Input Sanitization
- Form scripts dynamically sanitize inputs before submission:
  - Email addresses are matched against strict email formats.
  - Telephone fields are validated to restrict character inputs.
  - Text fields are stripped of HTML tags to prevent basic Cross-Site Scripting (XSS) injections in the admin board.

---

## ☁️ Recommended Production Security Headers

If hosting the site on a platform supporting security header definitions (such as Vercel, Netlify, or a custom Nginx/Apache configuration), we recommend setting up the following headers in your configuration files:

### 1. Content Security Policy (CSP)
Prevents malicious scripts from running in the visitor's browser:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: https:; frame-src 'self' https://www.google.com; connect-src 'self' https://script.google.com https://script.googleusercontent.com;
```

### 2. Frame Protection (X-Frame-Options)
Prevents Clickjacking attacks by restricting other domains from embedding the school site in an iframe:
```http
X-Frame-Options: SAMEORIGIN
```

### 3. Content Type Sniffing Protection
Forces browsers to respect the declared Content-Type, preventing MIME-sniffing exploits:
```http
X-Content-Type-Options: nosniff
```

### 4. Referrer Policy
Controls how much referrer information is sent along with requests:
```http
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🌐 Webhook Secret Management

Currently, form submissions route directly via client-side scripts to a Google Apps Script deployment URL.
- **Current Setup**: The webhook URL is exposed in `db.js` and HTML actions. This is normal for static sites, as the Google Script endpoint acts as a public submission collector.
- **Future Hardening**: If the school migrates to serverless hosting (e.g. Netlify, Vercel, Cloudflare Pages), we recommend setting up a serverless function (e.g., `/api/submit-form.js`) to intercept form submissions. The serverless function will read the webhook URL from a secure environment variable (kept secret on the host panel) and post the data server-to-server, completely removing the Apps Script URL from public client scripts.

---

## 🚨 Reporting Vulnerabilities

If you discover a security issue on this website, please report it immediately to the school's technical administration desk:
- **Email**: onestgurukulprimary@gmail.com
- **Technical Contact**: Principal Savita Wadekar / Webmaster
Please do not expose vulnerabilities publicly prior to reporting, allowing time for remediation.

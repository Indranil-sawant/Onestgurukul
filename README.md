# O'Nest Gurukul

Static school website for [GitHub Pages](https://pages.github.com/). There is no server, Firebase, or admin CMS. You change the site by editing files and pushing to GitHub.

## Pages

- `index.html` — Home
- `about.html` — About
- `preprimary.html` — Pre-primary
- `students-life.html` — Curriculum & student life
- `campus-facilities.html` — Campus
- `admissions.html` — Admissions
- `contact.html` — Contact

## How to update content

| What | Where |
| --- | --- |
| Notices, FAQs, events, faculty, achievements, testimonials, emergency banner | `db.js` |
| Page copy, photos, layout | The matching `.html` file |
| Apply / WhatsApp / search widgets | `onest-global.js` |

After you save, commit and push. GitHub Pages serves the new files.

## Enquiry forms

GitHub Pages cannot receive form posts. Contact and admission forms send to a **Google Apps Script** webhook (the URL is in the HTML `action` and in `db.js` settings). Responses land in the linked Google Sheet, not in this repo.

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo **Settings → Pages → Source**: Deploy from branch `main`, folder `/` (root).
3. Site URL will be `https://<username>.github.io/<repo>/`.

The `.nojekyll` file is required so GitHub does not ignore folders that start with `_` and so paths stay as written.

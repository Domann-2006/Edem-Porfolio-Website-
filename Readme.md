# Solace Paul Edem — Website Setup Guide

**Version:** 1.0  
**Stack:** HTML · CSS · Vanilla JavaScript  
**Files:** `index.html` · `style.css` · `script.js`

---

## Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [Replacing Images](#2-replacing-images)
3. [Replacing the CV File](#3-replacing-the-cv-file)
4. [Updating Contact Details](#4-updating-contact-details)
5. [Updating Text Content](#5-updating-text-content)
6. [Chatbot Knowledge Base](#6-chatbot-knowledge-base)
7. [Dark / Light Theme](#7-dark--light-theme)
8. [Launching the Website](#8-launching-the-website)
9. [Going Live (Hosting)](#9-going-live-hosting)
10. [Quick Checklist](#10-quick-checklist)

---

## 1. Folder Structure

Place all files in the **same folder** like this:

```
solace-paul-edem/
│
├── index.html          ← Main website file
├── style.css           ← All styling
├── script.js           ← All JavaScript & chatbot
├── README.md           ← This guide
│
├── hero-image.jpg      ← Your hero/profile photo  ← ADD THIS
├── event1.jpg          ← Gallery photo 1          ← ADD THIS
├── event2.jpg          ← Gallery photo 2          ← ADD THIS
├── event3.jpg          ← Gallery photo 3          ← ADD THIS
├── event4.jpg          ← Gallery photo 4          ← ADD THIS
├── featured1.jpg       ← Featured gallery photo 1 ← ADD THIS
├── featured2.jpg       ← Featured gallery photo 2 ← ADD THIS
└── cv.pdf              ← Your CV document         ← ADD THIS
```

> **Important:** All image and PDF files must be in the **same folder** as `index.html`. Do not place them in subfolders unless you update the file paths in the HTML.

---

## 2. Replacing Images

### Hero / Profile Photo

**File name expected:** `hero-image.jpg`

This is the large portrait photo displayed on the right side of the Hero section.

**Steps:**
1. Get a high-quality photo of Solace Paul Edem (portrait orientation recommended).
2. Rename it exactly to `hero-image.jpg`.
3. Place it in the same folder as `index.html`.

**Recommended specs:**
- Orientation: Portrait (taller than wide)
- Minimum size: 800 × 1000 px
- Format: `.jpg` or `.webp`
- File size: Under 500 KB (compress at [squoosh.app](https://squoosh.app) if needed)

**If you want to use a different filename:**  
Open `index.html`, find this line and change the filename:

```html
<img src="hero-image.jpg" alt="Solace Paul Edem – Diction Coach and Public Speaker" ...
```

Change `hero-image.jpg` to your actual filename, e.g. `solace-photo.jpg`:

```html
<img src="solace-photo.jpg" alt="Solace Paul Edem – Diction Coach and Public Speaker" ...
```

---

### Gallery Photos (Events)

There are **4 event photos** and **2 featured photos** — 6 images total.

| Expected Filename | Section         | Description                        |
|-------------------|-----------------|------------------------------------|
| `event1.jpg`      | Gallery Grid    | Public speaking event photo        |
| `event2.jpg`      | Gallery Grid    | Diction training session photo     |
| `event3.jpg`      | Gallery Grid    | MC at awards ceremony photo        |
| `event4.jpg`      | Gallery Grid    | Etiquette training photo           |
| `featured1.jpg`   | Featured Row    | Any highlight event photo          |
| `featured2.jpg`   | Featured Row    | Any highlight event photo          |

**Steps:**
1. Collect your event photos.
2. Rename each photo to match the filenames in the table above exactly.
3. Place all of them in the same folder as `index.html`.

**Recommended specs:**
- Orientation: Landscape (wider than tall) works best for gallery
- Minimum size: 800 × 500 px
- Format: `.jpg` or `.webp`
- File size: Under 400 KB each

**To use different filenames:**  
Open `index.html` and search for `event1.jpg` (and so on). Replace each filename with your actual photo name. Example:

```html
<!-- Before -->
<img src="event1.jpg" alt="Solace Paul Edem at a public speaking event" ...

<!-- After (if your file is named speaking-lagos.jpg) -->
<img src="speaking-lagos.jpg" alt="Solace Paul Edem at a public speaking event" ...
```

Also update the caption text inside `<figcaption>` to describe the actual event:

```html
<!-- Before -->
<figcaption>Public Speaking Event</figcaption>

<!-- After -->
<figcaption>Public Speaking Event – Lagos, 2024</figcaption>
```

**What happens if an image is missing?**  
The website is coded with a graceful fallback. If an image file is not found, it will automatically show a gold placeholder box with an icon — the page will not break.

---

## 3. Replacing the CV File

**File name expected:** `cv.pdf`

The "Download CV" button in the About section is linked to this file.

**Steps:**
1. Save your CV as a PDF file.
2. Rename it to `cv.pdf`.
3. Place it in the same folder as `index.html`.

**If you want to use a different filename:**  
Open `index.html`, find this line:

```html
<a href="cv.pdf" download="Solace_Paul_Edem_CV.pdf" class="btn btn-primary cv-btn" ...>
```

- Change `cv.pdf` to your actual filename (e.g. `solace-edem-resume.pdf`).
- The `download="Solace_Paul_Edem_CV.pdf"` part controls what name the visitor's browser saves the file as — you can update this too.

```html
<!-- Example with custom filename -->
<a href="solace-edem-resume.pdf" download="Solace_Paul_Edem_CV_2025.pdf" ...>
```

> **Note:** The button uses the `download` attribute so the file downloads directly — it does not open in a new tab.

---

## 4. Updating Contact Details

All contact information is in `index.html` inside the **Contact Section** (search for `id="contact"`).

### Email Addresses

Find these lines and replace with your actual email addresses:

```html
<a href="mailto:Crystarpaul@gmail.com" ...>
  <p>Crystarpaul@gmail.com</p>
</a>

<a href="mailto:Solacepaul@yahoo.com" ...>
  <p>Solacepaul@yahoo.com</p>
</a>
```

### Phone Number

```html
<a href="tel:09066433450" ...>
  <p>09066433450</p>
</a>
```

Replace `09066433450` in **both** the `href` and the `<p>` tag.

### WhatsApp Number

The WhatsApp number appears in **three places** in `index.html`:

1. The contact card
2. The floating WhatsApp button (bottom right)
3. The chatbot knowledge base responses (inside `script.js`)

**In `index.html`**, search for `wa.me/2347068788090` and replace `2347068788090` with your number in international format (no `+`, no spaces). Nigerian numbers: remove the leading `0` and add `234`. So `07068788090` becomes `2347068788090`.

```html
<!-- Before -->
<a href="https://wa.me/2347068788090" ...>

<!-- After (example with a different number: 08012345678) -->
<a href="https://wa.me/2348012345678" ...>
```

Also update the display text:
```html
<p>07068788090</p>
<!-- Change to your display number -->
```

**In `script.js`**, search for `07068788090` and update the number in the chatbot responses where it appears.

---

## 5. Updating Text Content

### Name & Title

The name **Solace Paul Edem** and title **Diction Coach & Public Speaker** appear throughout `index.html`. Use your text editor's **Find & Replace** (Ctrl+H / Cmd+H) to update them if needed.

### Tagline

Search for this line in `index.html` to update the main tagline:

```html
<p class="hero-tagline">"Speaking Right… The Soul of Good Communication."</p>
```

### About / Bio Text

The bio is inside the `<section id="about">` block. Find the `<div class="about-bio">` section and edit the paragraph text directly.

### Testimonials

Testimonials are inside `<section id="testimonials">`. Each testimonial follows this pattern — edit the name, location, service, and quote text:

```html
<blockquote class="testimonial-card glass-card reveal-up">
  <p class="testi-text">"Your testimonial text here..."</p>
  <footer class="testi-author">
    <div class="testi-avatar">XX</div>  ← Change to initials
    <div>
      <strong>Full Name</strong>
      <span>Role, City</span>
      <span class="testi-service">Service Name</span>
    </div>
  </footer>
</blockquote>
```

### Services

Each service card is an `<article class="service-card">` inside `<section id="services">`. Edit the `<h3>` title, `<p class="service-tagline">`, and `<li>` items as needed.

---

## 6. Chatbot Knowledge Base

The chatbot's responses are stored in `script.js` inside the `CHATBOT_KB` array. Each entry looks like this:

```javascript
{
  keywords: ['book', 'booking', 'schedule', 'how to book'],
  response:
    '📅 Here is how to book a session...\n\n' +
    '• Step one\n• Step two'
},
```

### To edit an existing response:
1. Open `script.js`.
2. Find the entry by its keywords (e.g. search for `'price'` to find the pricing response).
3. Edit the `response` string.

### To add a new topic:
Copy an existing entry and add it to the array:

```javascript
{
  keywords: ['your keyword', 'another phrase', 'trigger word'],
  response: 'Your bot reply here. Use \\n for new lines.'
},
```

### To update the WhatsApp number in bot responses:
Search `script.js` for `07068788090` and replace with your actual WhatsApp number.

### Formatting tips for responses:
- Use `\n` for a new line (it becomes `<br>` in the chat window)
- Use `\n\n` for a blank line between paragraphs
- Use `<strong>text</strong>` for bold
- Use emojis freely — they display well in the chat

---

## 7. Dark / Light Theme

The website ships with both a **light theme** (default) and a **dark theme**.

- Visitors can toggle using the **moon/sun icon** in the top navigation bar.
- Their preference is saved in `localStorage` so it persists across visits.

**To change the default theme to dark:**  
In `index.html`, find the opening `<html>` tag and change `data-theme="light"` to `data-theme="dark"`:

```html
<!-- Before -->
<html lang="en" data-theme="light">

<!-- After -->
<html lang="en" data-theme="dark">
```

---

## 8. Launching the Website

### Local preview (no internet needed):
1. Put all files (`index.html`, `style.css`, `script.js`, images, `cv.pdf`) in one folder.
2. Double-click `index.html` — it opens in your browser.
3. All features work locally except form submissions (which need a backend or service like Formspree).

### Setting up form submissions (optional):
The booking and quote forms currently simulate submission. To make them send real emails, sign up free at [Formspree.io](https://formspree.io), get your form endpoint, and update the form's `action` attribute and the fetch call in `script.js`.

---

## 9. Going Live (Hosting)

Upload all files to any web host. Recommended free/affordable options:

| Host | Cost | Notes |
|------|------|-------|
| [Netlify](https://netlify.com) | Free | Drag-and-drop folder upload. Fastest setup. |
| [GitHub Pages](https://pages.github.com) | Free | Requires a GitHub account. |
| [Render](https://render.com) | Free tier | Good for static sites. |
| cPanel Hosting | Paid | Upload via File Manager to `public_html`. |

**Netlify quickstart (easiest):**
1. Go to [netlify.com](https://netlify.com) and create a free account.
2. Click **"Add new site" → "Deploy manually"**.
3. Drag your entire project folder onto the page.
4. Your site goes live instantly with a `.netlify.app` URL.
5. You can connect a custom domain (e.g. `solacepaulEdem.com`) in the settings.

---

## 10. Quick Checklist

Use this before going live:

- [ ] `hero-image.jpg` added and displays correctly
- [ ] `event1.jpg` through `event4.jpg` added
- [ ] `featured1.jpg` and `featured2.jpg` added
- [ ] `cv.pdf` added and download button tested
- [ ] Email addresses verified and correct
- [ ] Phone number verified and correct
- [ ] WhatsApp number updated in all 3 places
- [ ] Chatbot tested with common questions
- [ ] All gallery captions updated with real event names/dates
- [ ] Testimonials reviewed and approved
- [ ] Website previewed on mobile (use browser DevTools or a phone)
- [ ] Dark mode tested and looks good
- [ ] CV downloads correctly (not opening in browser tab)
- [ ] Booking form date validation works (try a date less than 2 weeks away)

---

*For technical questions or customisation requests, contact your web developer.*

# Muhammad Asim Amin — Personal Portfolio

**Live site:** [https://isthatasim.github.io/masimamin/](https://isthatasim.github.io/masimamin/)

A premium academic and research portfolio for **Muhammad Asim Amin**, PhD Researcher in AI-Driven Power Systems & Smart Grids at the University of Genova (MSCA CLOE Project, Horizon Europe).

---

## Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Framework   | React 18 + TypeScript                   |
| Build       | Vite 5                                  |
| Styling     | Tailwind CSS 3                          |
| Animation   | Framer Motion 11                        |
| Icons       | Lucide React                            |
| Deployment  | GitHub Pages via GitHub Actions         |
| Fonts       | Space Grotesk · Inter · JetBrains Mono  |

---

## Local Development

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/isthatasim/masimamin.git
cd masimamin

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will be available at `http://localhost:5173/masimamin/`

### Build for Production

```bash
npm run build
```

Output goes to `./dist/`. Preview locally:

```bash
npm run preview
```

---

## Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: initial portfolio deployment"
git push origin main
```

### Step 2 — Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/isthatasim/masimamin`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

### Step 3 — Verify Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers automatically on every push to `main`.

To check the deployment status:
1. Go to **Actions** tab in your repository
2. Look for the "Deploy Portfolio to GitHub Pages" workflow
3. Wait for the ✅ green checkmark
4. Visit: `https://isthatasim.github.io/masimamin/`

You can also trigger a manual deployment from the Actions tab using **Run workflow**.

---

## Adding Your CV PDF

1. Create a folder: `public/cv/`
2. Place your CV file there as `MAsimAmin_CV.pdf`
3. The "Download CV" buttons throughout the site will link to `/masimamin/cv/MAsimAmin_CV.pdf`

```bash
mkdir -p public/cv
cp /path/to/your/cv.pdf public/cv/MAsimAmin_CV.pdf
git add public/cv/
git commit -m "add: CV PDF for download"
git push origin main
```

---

## Updating Content

All site content lives in **one file** — easy to maintain:

```
src/data/content.ts
```

This file contains:
- Personal info & social links
- Statistics (journal count, IF, etc.)
- Research focus descriptions
- Work experience timeline
- Education entries
- Full publications list (journals, conferences, book chapters)
- Project descriptions
- Skills & tools
- Awards & grants
- Professional development

### Update a publication:

Open `src/data/content.ts`, find the `publications` object, and add/edit entries. Each entry follows this structure:

```typescript
{
  id: 'J8',
  authors: 'M. Asim Amin, ...',
  title: 'Your Paper Title.',
  venue: 'IEEE Transactions on ...',
  year: 2026,
  status: 'Published',
  doi: '10.xxxx/xxxxx',
}
```

### Update social links or personal info:

Edit the `personal` object at the top of `content.ts`:

```typescript
export const personal = {
  scholar: 'https://scholar.google.com/citations?user=YOUR_ID',
  // ...
};
```

---

## Changing the Repository Name (Base Path)

If you rename the repo or move to a different GitHub Pages setup, update the `base` in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-new-repo-name/',  // ← change this
  // ...
})
```

For a **user/organization site** (`username.github.io` repo), set:

```typescript
base: '/',
```

Also update `index.html` link tags accordingly.

---

## Adding a Custom Domain

1. Create a file `public/CNAME` with your domain:
   ```
   www.yourdomain.com
   ```
2. In your domain registrar, add a CNAME DNS record:
   ```
   CNAME  www  isthatasim.github.io
   ```
3. In GitHub Settings → Pages, enter your custom domain
4. In `vite.config.ts`, update `base` to `'/'`
5. Push and wait for DNS propagation (~24 hours)

---

## Project Structure

```
masimamin/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions deployment
├── public/
│   ├── favicon.svg             ← SVG favicon (energy grid icon)
│   └── cv/
│       └── MAsimAmin_CV.pdf    ← [ADD YOUR CV HERE]
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedSection.tsx   ← Scroll-triggered fade-in + stagger
│   │   │   ├── SectionTitle.tsx      ← Reusable section header
│   │   │   └── GridBackground.tsx    ← Subtle animated grid backdrop
│   │   ├── Navbar.tsx                ← Sticky nav with active section tracking
│   │   ├── Hero.tsx                  ← Animated smart-grid SVG + hero text
│   │   ├── About.tsx                 ← Professional summary + highlights
│   │   ├── ResearchFocus.tsx         ← 7-domain research cards
│   │   ├── Experience.tsx            ← Expandable career timeline
│   │   ├── Education.tsx             ← Degree cards
│   │   ├── Publications.tsx          ← Tabbed publication viewer
│   │   ├── Projects.tsx              ← Expandable project cards
│   │   ├── Skills.tsx                ← Skill bars + domain tags
│   │   ├── Awards.tsx                ← Awards, grants, dev training
│   │   ├── Contact.tsx               ← Links + collaboration message
│   │   └── Footer.tsx                ← Minimal footer with quick links
│   ├── data/
│   │   └── content.ts               ← ⭐ All site content (edit this)
│   ├── App.tsx                       ← Root component
│   ├── main.tsx                      ← Entry point
│   └── index.css                     ← Tailwind + custom styles
├── index.html                         ← SEO metadata, fonts, structured data
├── package.json
├── vite.config.ts                     ← Base path for GitHub Pages
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Design System

| Token          | Value                    | Usage                       |
|----------------|--------------------------|-----------------------------|
| Background     | `#020817` (navy-950)     | Page background             |
| Surface        | `#0f172a` (slate-900)    | Card backgrounds            |
| Accent Cyan    | `#06b6d4` (cyan-500)     | Primary accent, links       |
| Accent Indigo  | `#818cf8` (indigo-400)   | Secondary accent            |
| Accent Emerald | `#34d399` (emerald-400)  | Success, published status   |
| Text Primary   | `#f1f5f9` (slate-100)    | Body text                   |
| Text Muted     | `#94a3b8` (slate-400)    | Secondary text              |
| Font Display   | Space Grotesk            | Headings, titles            |
| Font Body      | Inter                    | Body copy                   |
| Font Mono      | JetBrains Mono           | Code, tags, labels          |

---

## License

© 2024–2026 Muhammad Asim Amin. All rights reserved.

The source code structure (excluding personal content) may be adapted for personal portfolio use.

# Bright Future – Primary School ERP

A React 18 + Vite single-page app for primary-school administration (Admin & Teacher portals).
Data is persisted in the browser (localStorage) – no backend required.

## Project structure
```
primary-school-erp/
├── index.html                 # Vite entry HTML
├── package.json
├── vite.config.js
├── vercel.json / netlify.toml # one-click deploy configs
├── .github/workflows/         # GitHub Pages CI deploy
└── src/
    ├── main.jsx               # React bootstrap
    ├── App.jsx                # Shell: sidebar, header, routing (renderPage), shared state
    ├── components/ui.jsx      # Modal, Stat, Card, Activity, Task, TimeRows, PageTools
    ├── data/seed.js           # Demo accounts, students, teachers, navs, timetable, etc.
    ├── utils/
    │   ├── storage.js         # load / save (localStorage)
    │   └── format.js          # fmt (₹), todayISO, daysBetween
    ├── styles/global.css
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── Students.jsx  Teachers.jsx  Classes.jsx  Timetable.jsx
        ├── Attendance.jsx         # Biometric attendance + secured synced logs
        ├── Homework.jsx  Marks.jsx  ProgressTracker.jsx
        ├── Textbooks.jsx  DigitalLibrary.jsx  LibraryPage.jsx
        ├── fees/
        │   ├── Fees.jsx           # Fees & Admission (tabs), enquiry +/-, smart follow-up
        │   ├── StudentFees.jsx    # Student-wise paid / pending structure
        │   ├── SmartPay.jsx       # Auto sibling concession, online & walk-in
        │   ├── FeeHeads.jsx       # Customisable fee heads & categories
        │   └── FeeReports.jsx     # Tailored fee reports + CSV export
        ├── Finance.jsx            # 24/7 income/expense form, EB bill tracker, +/- view
        ├── Payroll.jsx            # Staff management, monthly payroll, payslips
        ├── Transport.jsx          # Live bus tracking
        ├── Notices.jsx  Calendar.jsx  Chat.jsx  StaffRequests.jsx
        └── Misc.jsx               # Users, Reports, Settings, Leave, Profile
```

## Getting started
```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build
```bash
npm run build      # outputs static site to dist/
npm run preview    # serve dist/ locally
```

## Demo logins
| Portal  | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@school.demo   | admin123   |
| Teacher | priya@school.demo   | teacher123 |

## Deploy
- **Vercel** – Import the repo → framework *Vite* → Deploy (`vercel.json` handles SPA routing).
- **Netlify** – Import the repo; build `npm run build`, publish `dist` (`netlify.toml` included).
- **GitHub Pages** – Settings → Pages → Source *GitHub Actions*; `.github/workflows/deploy-pages.yml` deploys on push to `main`.
- **Any static host / cPanel** – `npm run build`, upload the contents of `dist/`.

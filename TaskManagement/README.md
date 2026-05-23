# ServicePro — Service Management Web Application

A complete, production-ready service management system for assigning and tracking technician jobs.

---

## 📁 File Structure

```
service-mgmt-app/
├── index.html          ← Login page (entry point)
├── admin.html          ← Admin dashboard
├── technician.html     ← Technician dashboard
├── style.css           ← Global stylesheet (dark/light theme)
├── app.js              ← Shared utilities (Auth, Toast, Theme, etc.)
├── api.js              ← API layer (Google Sheets or demo mode)
├── sw.js               ← Service Worker (PWA / offline support)
├── manifest.json       ← PWA manifest
└── README.md           ← This file
```

---

## 🚀 Quick Start

### Option 1 — Demo Mode (No setup required)
1. Open `index.html` in a browser
2. Use the **Quick Login** buttons or enter credentials manually:
   - **Admin:** `admin` / `admin123`
   - **Technician 1:** `rahul` / `tech123`
   - **Technician 2:** `priya` / `tech123`

> Demo mode uses in-memory mock data. All changes reset on page refresh.

### Option 2 — Google Sheets Backend

#### Step 1: Set up Google Sheets
Create a Google Spreadsheet with two sheets:

**Sheet 1 — `Users`**
| id | username | password | role | technicianName | mobile |
|----|----------|----------|------|----------------|--------|
| U001 | admin | admin123 | admin | Admin User | 9000000000 |
| U002 | rahul | tech123 | technician | Rahul Sharma | 9111111111 |

**Sheet 2 — `Tasks`**
| id | customerName | customerMobile | location | serviceDate | brand | appliance | problem | technician | technicianMobile | priority | status | remarks | image | createdAt | completedAt |

#### Step 2: Deploy Google Apps Script
1. In your Spreadsheet, go to **Extensions → Apps Script**
2. Paste the Apps Script code from the comment block at the bottom of `api.js`
3. Click **Deploy → New deployment**
4. Select type: **Web app**
5. Set **Execute as**: Me, **Who has access**: Anyone
6. Copy the deployment URL

#### Step 3: Connect the frontend
1. Open `api.js`
2. Replace `YOUR_DEPLOYMENT_ID` in `APPS_SCRIPT_URL`
3. Set `DEMO_MODE = false`
4. Open `admin.html → Settings → Data & API` and paste the URL

---

## ✨ Features

### Login Page
- Animated gradient background with floating particles
- Show/hide password toggle
- Remember me (localStorage) vs session
- Role-based redirect (Admin → admin.html, Technician → technician.html)
- Dark/light mode toggle
- PWA install prompt
- Offline detection bar
- Demo quick-login buttons

### Admin Dashboard
- **Stats:** Total, Pending, In Progress, Completed jobs + Active Technicians
- **Week Chart:** Animated bar chart of daily job counts
- **Status Donut:** Visual completion percentage
- **Assign Work Form:** Full form with customer details, appliance, technician assignment, photo upload
- **Work List Table:** Searchable, filterable, sortable with pagination and CSV export
- **Completed Work:** Card-grid view of all finished jobs
- **Technician Management:** Add/Edit/Delete/Toggle status with skills tags
- **Reports:** Performance bars per technician, export options
- **Settings:** Theme toggle, notification prefs, API URL config

### Technician Dashboard
- **My Tasks:** Cards with priority color coding, status step indicator
  - Accept Job / Start Work / Complete Work buttons
  - Call Customer button (tel: link)
  - Open Google Maps button
- **Complete Work Modal:** Remarks, photo upload, customer feedback, signature placeholder
- **Completed Tasks:** History of finished jobs
- **Profile:** Stats, completion rate bar, recent activity
- **Settings:** Theme, notification preferences

### UI/UX
- Dark mode (default) + Light mode with smooth transition
- Glassmorphism-inspired card design with subtle glows
- Collapsible sidebar (desktop) with animated active states
- Mobile bottom navigation bar
- Toast notifications (success / error / warning / info)
- Confirm modal for destructive actions
- Skeleton loaders for data fetching states
- Empty state illustrations
- Drag-and-drop image upload with preview
- Animated stat counters
- Real-time clock in header
- Notification panel with badge dot

### PWA
- Service worker with network-first caching
- Offline fallback with bar notification
- Install prompt popup
- manifest.json with shortcuts

---

## 🎨 Design System

### Colors (Dark Mode)
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-base` | `#080d14` | Page background |
| `--bg-card` | `#111d2e` | Cards, modals |
| `--accent` | `#0ea5e9` | Primary actions, links |
| `--success` | `#10b981` | Completed, positive |
| `--warning` | `#f59e0b` | Pending, medium priority |
| `--danger` | `#ef4444` | High priority, delete |

### Fonts
- **Display (headings):** Syne (Google Fonts)
- **Body (UI text):** DM Sans (Google Fonts)

---

## 📱 Responsive Breakpoints
- `< 480px` — Compact mobile: 2-column stat grid
- `< 768px` — Mobile: bottom nav, stacked cards, simplified tables
- `< 992px` — Tablet: collapsible sidebar, overlay
- `≥ 992px` — Desktop: full sidebar, multi-column layouts

---

## 🔒 Security Notes

> **For production use:**
- Hash passwords before storing in Google Sheets (use CryptoJS or bcrypt in Apps Script)
- Validate all inputs server-side in Apps Script
- Add rate limiting to the Apps Script `doPost` handler
- Use HTTPS for all deployments
- Consider adding a proper authentication token/session system instead of storing plain credentials

---

## 📝 Customization

### Adding new appliance brands
Edit the `<select id="brand">` options in `admin.html`.

### Changing the accent color
Update `--accent` and `--accent-2` in `:root` inside `style.css`.

### Adding new sections
1. Add a `.nav-item[data-section="mysection"]` in the sidebar
2. Add a `<div class="section-view" id="mysection">` in the page content
3. Add to the `SECTIONS` array in `admin.html` JavaScript

---

*Built with Bootstrap 5, Bootstrap Icons, Google Fonts (Syne + DM Sans)*
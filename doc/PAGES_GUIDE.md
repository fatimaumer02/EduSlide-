# EduSlide AI - Pages Guide

## Overview

This document provides a comprehensive guide to all the pages and features implemented in EduSlide AI.

---

## Public Pages

### 1. Home Page (`/`)
- **Purpose:** Landing page showcasing EduSlide AI features
- **Features:**
  - Hero section with CTA buttons
  - Statistics showcase (10K+ presentations, 95% time saved, 4.9★ rating)
  - Feature highlights (Multiple Formats, Lightning Fast, AI-Powered)
  - Benefits list with icons
  - "How It Works" section (3-step process)
  - Testimonials from educators
  - Footer with links

### 2. About Page (`/about`)
- **Purpose:** Information about the platform and team
- **Features:**
  - Mission and vision
  - Team information
  - Values and principles

### 3. Contact Page (`/contact`)
- **Purpose:** Contact form and support information
- **Features:**
  - Contact form
  - FAQ section
  - Support information

### 4. Upload Page (`/upload`)
- **Purpose:** Create new presentations
- **Features:**
  - File upload (PDF, DOCX, EPUB)
  - Drag-and-drop interface
  - Topic input alternative
  - Generate slides button
  - Processing time estimates

### 5. Preview Page (`/preview`)
- **Purpose:** Preview generated slides
- **Features:**
  - Slide navigation (previous/next)
  - Thumbnail grid view
  - Full-screen slide display
  - Download PowerPoint button
  - Slide counter

---

## Authentication Pages

### 6. Login Page (`/login`)
- **Purpose:** Educator/admin authentication
- **Features:**
  - Username and password fields
  - Show/hide password toggle
  - Demo credentials display
  - Error message handling
  - "Forgot password" link
  - Back to home link

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

---

## Dashboard Pages (Protected)

### 7. Main Dashboard (`/dashboard`)
- **Purpose:** Central hub for educators
- **Features:**
  - Statistics cards (Total Presentations, Topics, Files, Downloads)
  - Tabbed navigation:
    - **Overview:** Recent presentations table with search/filter
    - **Presentations:** Link to presentations management
    - **Topics:** Link to topics management
    - **Analytics:** Link to analytics page
  - Quick actions (New Presentation, Profile)
  - Recent presentations table with:
    - Title, Topic, Slides count
    - Status (Completed, Processing, Failed)
    - Date created
    - Actions (View, Download, More)

### 8. Presentations Management (`/dashboard/presentations`)
- **Purpose:** Manage all generated presentations
- **Features:**
  - Statistics overview (Total, Completed, Processing, Failed)
  - Search functionality
  - Filter by status (All, Completed, Processing, Failed)
  - Presentations table with:
    - Title and file size
    - Topic category
    - Slide count
    - Status indicator
    - Views and downloads stats
    - Date created
    - Actions (View, Download, Delete)
  - Empty state with CTA
  - Create new presentation button

### 9. Topics Management (`/dashboard/topics`)
- **Purpose:** Organize teaching topics
- **Features:**
  - Add new topic button
  - Search topics
  - Topics grid display with:
    - Topic name and icon
    - Category tag
    - Description
    - Presentation count
    - Creation date
    - Edit and delete actions
  - Add/Edit modal with form:
    - Topic name
    - Category
    - Description
  - Empty state with CTA

### 10. Analytics & Reports (`/dashboard/analytics`)
- **Purpose:** Track performance and usage
- **Features:**
  - Time range selector (7 days, 30 days, 90 days)
  - Statistics cards:
    - Total Views
    - Downloads
    - Presentations
    - Active Users
  - Weekly Activity Chart:
    - Bar chart showing daily activity
    - Presentations and downloads tracking
  - Category Distribution:
    - Pie chart visualization
    - Percentage breakdown by category
  - Top Performing Presentations:
    - Ranked table
    - Views and downloads
    - Engagement rate calculation

### 11. Profile & Settings (`/dashboard/profile`)
- **Purpose:** Manage account settings
- **Features:**
  - Sidebar navigation:
    - Profile
    - Notifications
    - Security
    - Preferences
    - Logout
  - **Profile Tab:**
    - Avatar upload
    - Personal information form
    - Institution and department
    - Contact details
  - **Notifications Tab:**
    - Email notifications toggle
    - Slide generation alerts
    - Weekly reports
    - System updates
  - **Security Tab:**
    - Change password
    - Two-factor authentication
  - **Preferences Tab:**
    - Default slide count
    - Presentation theme selection

---

## Navigation Structure

```
Home (/)
├── About (/about)
├── Contact (/contact)
├── Upload (/upload)
│   └── Preview (/preview)
├── Login (/login)
└── Dashboard (/dashboard) [Protected]
    ├── Presentations (/dashboard/presentations)
    ├── Topics (/dashboard/topics)
    ├── Analytics (/dashboard/analytics)
    └── Profile (/dashboard/profile)
```

---

## User Flows

### Flow 1: Create Presentation
1. Navigate to Upload page (`/upload`)
2. Upload file OR enter topic
3. Click "Generate Slides"
4. Redirected to Preview page (`/preview`)
5. Review slides
6. Download PowerPoint

### Flow 2: Manage Topics
1. Login (`/login`)
2. Navigate to Dashboard (`/dashboard`)
3. Click "Topics" tab or go to `/dashboard/topics`
4. Click "Add Topic"
5. Fill in topic details
6. Save topic
7. Use topic for future presentations

### Flow 3: View Analytics
1. Login (`/login`)
2. Navigate to Dashboard (`/dashboard`)
3. Click "Analytics" tab or go to `/dashboard/analytics`
4. Select time range
5. View statistics and charts
6. Analyze top performing presentations

### Flow 4: Update Profile
1. Login (`/login`)
2. Navigate to Dashboard (`/dashboard`)
3. Click "Profile" button or go to `/dashboard/profile`
4. Update information in desired tab
5. Save changes
6. Logout when done

---

## Protected Routes

All dashboard pages require authentication. If a user tries to access these pages without logging in, they will be redirected to the login page.

**Protected Pages:**
- `/dashboard`
- `/dashboard/presentations`
- `/dashboard/topics`
- `/dashboard/analytics`
- `/dashboard/profile`

**Authentication Check:**
- Uses `localStorage.getItem("authToken")`
- Redirects to `/login` if no token found
- Shows loading spinner during check

---

## Status Indicators

### Presentation Status
- **Completed** (Green): Slides generated successfully
- **Processing** (Amber): AI is generating slides
- **Failed** (Red): Generation failed, needs retry

### Notification States
- **Enabled** (Blue toggle): Notifications active
- **Disabled** (Gray toggle): Notifications inactive

---

## Demo Data

The application currently uses demo/mock data for:
- Presentations list
- Topics list
- Analytics statistics
- User profile information

**Note:** Backend integration with ChatGPT API is required for production deployment.

---

## Responsive Design

All pages are fully responsive and work on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

---

## Color Scheme

- **Primary:** Indigo (#4F46E5)
- **Success:** Green (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)
- **Background:** Slate gradients
- **Text:** Slate shades

---

## Icons

All icons are from **Lucide React** library:
- Sparkles (AI/Magic)
- FileText (Documents)
- Upload (File upload)
- Download (Download)
- User (Profile)
- BookOpen (Topics)
- TrendingUp (Analytics)
- And more...

---

## Next Steps for Development

1. **Backend Integration:**
   - Connect to ChatGPT API
   - Implement real file processing
   - Set up database (SQLite/MySQL)

2. **Authentication:**
   - Implement JWT tokens
   - Add password reset
   - Enable 2FA

3. **Features:**
   - Real-time slide generation
   - Template selection
   - Collaboration features
   - Export to multiple formats

4. **Deployment:**
   - Set up production environment
   - Configure API keys
   - Deploy to cloud platform

---

**Last Updated:** February 8, 2026  
**Version:** 1.0.0  
**Team:** Team Zeppelin

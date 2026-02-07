# EduSlide AI

## AI-Powered Educational Slide Generator

---

### Team Information

**Team Name:** Team Zeppelin

**Team Members:**
- Muhammad Adnan Sultan
- Fatima Umer
- Areeba Arooj

**Submitted For:** Hackathon  
**Submission Date:** 08-02-2026

---

## Table of Contents

1. [Introduction to the Problem](#1-introduction-to-the-problem)
   - 1.1 [Introduction](#11-introduction)
   - 1.2 [Problem with Existing System](#12-problem-with-existing-system)
   - 1.3 [Purpose](#13-purpose)
   - 1.4 [Scope](#14-scope)
   - 1.5 [Intended Audience](#15-intended-audience)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Features](#22-product-features)
   - 2.3 [System Features](#23-system-features)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [Analysis (Use Case Model)](#3-analysis-use-case-model)
   - 3.1 [Identifying Actors and Use Cases](#31-identifying-actors-and-use-cases-using-textual-analysis)
   - 3.2 [Use Case Diagram](#32-forming-use-case-diagram-with-candidate-and-use-cases)
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 [User Interfaces](#41-user-interfaces)
   - 4.2 [Hardware Interfaces](#42-hardware-interfaces)
   - 4.3 [Software Interfaces](#43-software-interfaces)
   - 4.4 [Communications Interfaces](#44-communications-interfaces)

---

## 1. Introduction to the Problem

### 1.1 Introduction

The **EduSlide AI** is a complete software solution developed to enhance the efficiency of educators in creating PowerPoint presentations. In today's academic environment, preparing visually appealing and informative slides is a time-consuming task, requiring significant effort to summarize content, add visuals, and design slides effectively. EduSlide AI addresses this challenge by providing a streamlined, AI-powered approach to presentation creation.

EduSlide AI includes user-friendly features that automate the workflow for teachers and educators. Users can upload PDFs, eBooks, or input topics, and the system generates at least 10 slides per topic or chapter with summaries and visuals. The platform also supports full eBooks, creating slides chapter by chapter. By automating these tasks, EduSlide AI reduces manual effort, minimizes errors, and allows educators to focus on teaching rather than slide preparation.

This document provides a detailed overview of the system's architecture, key features, and operational benefits. EduSlide AI enables educators to create organized, visually engaging, and interactive presentations quickly, ultimately enhancing the learning experience for students and supporting effective teaching practices across the classroom.

### 1.2 Problem with Existing System

Teachers spend hours creating presentations from PDFs, eBooks, or notes, which is time-consuming and repetitive. EduSlide AI uses **Next.js** and **ChatGPT API** to automatically generate 10+ slide summaries per topic/chapter with visuals, creating interactive, downloadable PPTX slides in seconds. It empowers educators to save time, focus on teaching, and deliver engaging lessons effortlessly.

### 1.3 Purpose

The main goal of EduSlide AI is to improve the efficiency and effectiveness of creating educational presentations for teachers and educators. EduSlide AI aims to accomplish the following objectives by providing a comprehensive, AI-powered, and user-friendly platform:

- **Simplify slide creation:** By automating the process of summarizing content, generating slide text, and adding visuals. This reduces manual effort and errors, allowing educators to focus on teaching rather than preparing presentations.

- **Enhance content accessibility:** Make it easier for teachers to transform PDFs, eBooks, images, or topic inputs into structured slides. The system allows educators to generate complete slide decks quickly, making lesson preparation faster and more interactive.

- **Improve user management:** Offer a simple interface for educators to manage topics, uploads, and generated slides. This ensures a smooth workflow and easy tracking of created presentations.

- **Generate informative slides efficiently:** Provide AI-powered summaries and visuals that present content clearly and engagingly. This approach ensures consistent quality, improves learning engagement, and helps educators deliver more effective lessons.

In conclusion, EduSlide AI is essential for modernizing the process of presentation creation. It empowers teachers and educators to save time, improve lesson quality, and enhance student learning experiences through AI-generated slides that are visually appealing, organized, and interactive.

### 1.4 Scope

The main purpose of EduSlide AI is to provide educators with the tools they need to efficiently create high-quality educational presentations. EduSlide AI includes key features designed to streamline the teacher's workflow and automate slide generation:

#### Key Features

- **Dashboard for Educators:**  
  A central platform for teachers to manage all aspects of slide creation, providing a summary of uploaded topics, generated slides, and AI processing status.

- **Management of Topics & Inputs:**  
  Full control over topic submissions, PDF/eBook uploads, and text inputs. Educators can organize, edit, or remove topics to ensure accurate and relevant slide generation.

- **Slide Generation Management:**  
  Tools to automatically create slide decks from uploaded materials. This includes AI-powered summaries, visuals, and formatting to produce organized and interactive presentations.

- **Visual Content Integration:**  
  Features to incorporate AI-generated visuals, diagrams, and images into slides, enhancing engagement and comprehension for students.

- **Download and Export Functionality:**  
  Ability to download slides in PPTX format for classroom use, with easy management of generated files for reuse or updates.

- **Search and Organization:**  
  Enhanced search and filtering options to quickly locate previously generated slides or uploaded resources, making lesson planning faster and more efficient.

- **Reporting and Analytics:**  
  Analytical tools that provide insights into slide generation patterns, frequently used topics, and resource utilization, helping educators optimize teaching materials and lesson planning.

### 1.5 Intended Audience

The target audience for EduSlide AI consists of:

- **Educators and Teachers:**  
  Primary users responsible for preparing lessons and generating educational presentations. This documentation helps them understand how to upload materials, input topics, generate slides, and utilize AI features effectively.

- **Academic Administrators:**  
  School, college, or university administrators interested in how EduSlide AI can streamline lesson preparation and enhance teaching quality. This group benefits from understanding the system's capabilities and the expected impact on instructional efficiency.

- **IT Support and Technical Staff:**  
  Personnel responsible for installing, maintaining, and troubleshooting EduSlide AI. This documentation provides critical technical details regarding system requirements, integrations, and backend setup.

- **Project Managers and Software Developers:**  
  Stakeholders involved in the design, development, and deployment of EduSlide AI who require a thorough understanding of the project's objectives, features, and technical specifications.

---

## 2. Overall Description

### 2.1 Product Perspective

Our system is designed to overcome the challenges teachers face in creating educational presentations and to simplify the slide creation process. It serves as a central platform for generating PowerPoint slides from PDFs, eBooks, images, or topic inputs, improving content accessibility and supporting effective lesson delivery. The system aims to assist educators by automating slide creation, enhancing content management, and fostering a more engaging learning experience for students.

### 2.2 Product Features

The proposed system includes the following product features:

- Administrator Login and Access Control
- Upload, Delete, and Update PDF/eBook or Image Inputs
- Generate Slides Automatically from Topics or Uploaded Content
- Add, Remove, and Update Topic Details
- Download Generated PPTX Slides

### 2.3 System Features

The system features illustrate the functional requirements and describe the major services provided by EduSlide AI. System features help end-users accomplish tasks efficiently:

- Login page for the administrator/educator
- Upload, delete, and update PDFs, eBooks, images, or topic inputs
- Generate AI-powered slide content automatically
- Add, remove, and update topic information
- Download PPTX presentations for classroom use
- View a report of generated slides and past submissions

### 2.4 Operating Environment

The operating environment is where the EduSlide AI application runs. It includes hardware, software, and dependencies:

| Component | Description |
|-----------|-------------|
| **Frontend** | Next.js 16 application running in a modern web browser (Chrome, Edge, Firefox) |
| **Backend** | Python (Flask/Node.js) server with ChatGPT API integration |
| **Database** | SQLite/MySQL (for storing topic data, user info, and history) |
| **Hardware** | Desktop, Laptop, or Cloud Server |
| **Operating System** | Windows, macOS, or Linux |

### 2.5 Design and Implementation Constraints

- **Time Requirements:** The system is expected to take approximately 2 months for full development and testing
- **Project Limitations:** Requires internet connection for ChatGPT API calls
- **Budget Requirements:** Estimated at 10,000 PKR (or local currency equivalent) for development and API usage
- **Safety and Security:** Login authentication required for administrator/educator access; user data and API keys must be secured

### 2.6 Assumptions and Dependencies

#### Assumptions

- It is assumed that the educator/administrator will have responsibility for managing the system, including content uploads, slide generation, and user access.
- The user is expected to have basic technical skills to operate the web application and troubleshoot minor issues.
- Educators will provide guidance to students on how to download and use generated slides effectively.
- Uploaded content (PDFs, eBooks, images) will be formatted properly for AI processing.

#### Dependencies

- The system relies on a stable internet connection for communication with ChatGPT API.
- Functionality depends on proper configuration of backend services and database storage.
- Access to OpenAI/ChatGPT API and valid API keys is necessary for generating slide content.
- Browser compatibility and modern hardware are required to ensure smooth frontend operation.

---

## 3. Analysis (Use Case Model)

### 3.1 Identifying Actors and Use Cases using Textual Analysis

Actor and use case description shows the detail description of interaction between the actors and their use cases. The description enables to have a proper understanding of how actor interacts with the system through their use cases.

#### Table 3.1: Textual Analysis

| Actor | Use Case | Use Case Description |
|-------|----------|---------------------|
| Educator/Admin | Login | The educator/admin logs into the system using a username and password. |
| Educator/Admin | Upload Content | The educator uploads PDFs, eBooks, images, or enters topics manually. |
| Educator/Admin | Update Details | The educator can add, remove, or update topic information for slide generation. |
| Educator/Admin | Generate Slides | The system generates AI-powered slides from uploaded content or topic inputs. |
| Educator/Admin | Download Slides | The educator downloads the generated PPTX slides. |
| Student | Request Slides | A student can request slides for a particular topic if permitted. |
| Student | View Slides | A student can view or download slides generated by the educator. |

### 3.2 Forming Use Case Diagram with Candidate and Use Cases

#### Use Case: Login

**Actor:** Educator/Admin

**Precondition:** User must have valid credentials.

**Main Flow of Events:**
1. System prompts the user to enter a username and password.
2. User enters username and password.
3. System validates credentials.
4. If valid, the user logs into the system.

> **Figure 3.1:** Use Case Diagram

---

## 4. External Interface Requirements

### 4.1 User Interfaces

The user interface is a critical part of the EduSlide AI application, enabling users to interact with the system efficiently. Our application has a user-friendly and intuitive layout, allowing educators to quickly understand how to upload content, generate slides, and download presentations.

#### 1. Login Page
- **Fields:** Username, Password
- **Buttons:**
  - "Login"
  - "Close"

#### 2. Main Dashboard
- **Menu Strip:**
  - **Content:** Upload Content, View Uploaded Content
  - **Topics:** Add Topic, View Topics
  - **Slides:** Generate Slides, View Generated Slides
  - **Reports:** View Slide Generation History and Usage Reports

#### 3. Slide Generation Interface
- **Fields/Inputs:** Select Topic or Upload PDF/eBook/Image
- **Buttons:** Generate Slides, Download PPTX, Clear Selection

### 4.2 Hardware Interfaces

EduSlide AI can run on standard computing hardware. Recommended minimum requirements:

| Component | Specification |
|-----------|--------------|
| **Processor** | Intel Core i3 or higher |
| **RAM** | 4 GB or more |
| **Hard Drive** | 100 GB or more |
| **Operating System** | Windows 10 or higher / macOS / Linux |

### 4.3 Software Interfaces

The software interface defines the components, services, and communication requirements of the EduSlide AI system:

- Login Screen
- Admin/Educator Dashboard
- Navigation Menu and Buttons
- Upload Content Screen (PDF/eBook/Image or Topic Input)
- Topic Management Screen (Add/Update/Delete Topics)
- Slide Generation Screen
- Generated Slides List Screen
- Slide Download Screen
- Reports and History Screen

### 4.4 Communications Interfaces

#### 1. User Communication Interface

Users interact with the system using a graphical user interface (GUI). Error messages guide users in corrective actions, e.g.,

- "Invalid login credentials"
- "File type not supported"
- "No slides generated yet"

#### 2. Internal Communication Interface

The backend communicates with:

- **Database:** To store topic inputs, uploaded content metadata, and generated slides history
- **ChatGPT API:** For generating slide content and visuals
- **File System:** For temporarily storing uploaded content and generated PPTX files

The system manages connections efficiently to optimize performance and resource usage.

---

## Current Implementation Status

### Completed Features

✅ **Frontend Development**
- Professional UI with Next.js 16 and React 19
- Responsive design with Tailwind CSS 4
- Complete navigation system with active states
- Landing page with features and testimonials
- About page with mission and values
- Contact page with form and FAQ
- Upload page with drag-and-drop functionality
- Preview page with slide navigation

✅ **Authentication System**
- Login page with demo credentials
- Protected routes with authentication check
- Session management with localStorage
- Logout functionality

✅ **Dashboard System**
- Main educator dashboard with statistics
- Overview tab with recent presentations
- Tabbed navigation (Overview, Presentations, Topics, Analytics)
- Quick action buttons and search functionality

✅ **Presentations Management**
- View all presentations with filtering
- Status tracking (completed, processing, failed)
- Download and preview functionality
- Delete presentations
- Statistics and analytics per presentation

✅ **Topics Management**
- Add, edit, and delete topics
- Category organization
- Topic descriptions and metadata
- Presentation count per topic

✅ **Analytics & Reports**
- Usage statistics and trends
- Weekly activity charts
- Category distribution
- Top performing presentations
- Engagement metrics

✅ **User Profile & Settings**
- Profile information management
- Notification preferences
- Security settings
- Application preferences
- Avatar upload placeholder

✅ **File Upload System**
- Drag-and-drop file upload
- Support for PDF, DOCX, EPUB formats
- File validation and preview
- Topic input alternative

✅ **Slide Preview**
- Interactive slide navigation
- Thumbnail grid view
- Full-screen slide display
- Download button (demo mode)

### In Progress

🔄 **Backend Integration**
- ChatGPT API integration
- Database setup (SQLite/MySQL)
- User authentication system
- File processing pipeline

### Planned Features

📋 **Future Enhancements**
- Real AI-powered slide generation
- User accounts and authentication
- Save and manage presentations
- Custom template selection
- Advanced editing capabilities
- Collaboration features
- Analytics dashboard
- Payment integration

---

## Technical Stack

### Frontend
- **Framework:** Next.js 16.1.6 (with Turbopack)
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4.1.18
- **Icons:** Lucide React 0.563.0

### Backend (Planned)
- **Server:** Node.js/Python Flask
- **API:** OpenAI ChatGPT API
- **Database:** SQLite/MySQL
- **File Storage:** Local/Cloud Storage

### Development Tools
- **Build Tool:** Turbopack
- **Linting:** ESLint 9
- **Version Control:** Git

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd eduslide-

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Future)

```env
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
```

---

## Project Structure

```
eduslide-/
├── src/
│   ├── app/
│   │   ├── about/page.jsx
│   │   ├── contact/page.jsx
│   │   ├── preview/page.jsx
│   │   ├── upload/page.jsx
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── FileUpload.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── SlideCard.jsx
│   │   └── TopicInput.jsx
│   └── lib/
│       └── api.js
├── doc/
│   └── documantation.md
├── public/
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── README.md
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact & Support

For support and inquiries:

- **Email:** support@eduslide.ai
- **Website:** [EduSlide AI](https://eduslide.ai)
- **Team:** Team Zeppelin

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by OpenAI ChatGPT

---

**Note:** This is currently a demo/prototype version. The AI generation functionality is simulated for demonstration purposes. Backend integration with ChatGPT API is required for full production deployment.

---

*Government College University Faisalabad*  
*Hackathon Submission - February 2026*

# Harvest Church Web Platform

Welcome to the web platform for **Harvest Church, Nepal**. This is a modern, responsive, and feature-rich portfolio website built to manage ministries, projects, events, testimonies, donations, and contact requests with a secure admin dashboard.

---

## 🌟 Key Features

### 👤 Public Facing Sections
- **Homepage**: Beautiful introduction, welcome section, and highlights.
- **About Us**: Statement of faith, values, history, and church leadership.
- **Ministries**: Interactive overview of the 7 core ministries (Youth, Women, Children, Worship, Discipleship, Community, Outreach) with images and descriptions.
- **Projects**: Track church construction, humanitarian help, and outreach project goals with live progress bars.
- **Events**: Interactive calendar of upcoming events and integrated event registration form.
- **Gallery**: Filterable photo gallery displaying the 82 extracted image assets with an interactive full-screen lightbox.
- **Testimonies**: Read approved testimonies and submit new ones directly online.
- **Blog**: Informative articles with dynamic detail page routing.
- **Contact**: Interactive contact form with map locator and message logging.
- **Donate**: Secure, custom donation portal for general and project-specific giving, complete with transaction logging and receipt generation.

### 🛡️ Secure Admin Portal (`/admin`)
- **Credentials-based Authentication**: Safe access to the dashboard.
- **Dashboard Counters**: At-a-glance metrics for total donations, contact messages, testimonials, and event registrations.
- **Registration Management**: View and export event registrants.
- **Testimonials Moderation**: Review submitted testimonies and approve/reject them for public display.
- **Contact logs**: Access all sent messages.
- **Donation Tracker**: Monitor transaction records and generate printable receipts.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS & Tailwind CSS 4
- **Database**: SQLite with [Prisma ORM](https://www.prisma.io/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/romanielrai/Harvest-Church.git
cd Harvest-Church
npm install
```

### 2. Configure Environment Variables
Copy the template `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Make sure `DATABASE_URL` is set correctly:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="harvest-nepal-super-secret-key-2026"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize & Seed Database
Prepare the SQLite database and seed it with preloaded admin credentials, initial blog posts, sample projects, testimonials, and mock transactions:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔑 Admin Credentials (Default Seed)
- **Username**: `admin`
- **Password**: `admin123` *(Remember to update this in production!)*

<p align="center">
  <br />
  <a href="https://medica-health.vercel.app">
    <img src="https://img.shields.io/badge/MEDICA-2563eb?style=for-the-badge&logo=heart&logoColor=white" alt="MEDICA" />
  </a>
</p>

<h1 align="center">MEDICA — Healthcare Portal</h1>

<p align="center">
  <em>Enterprise-grade healthcare platform. Apple Health + Epic Systems + Medplum inspired.</em>
  <br />
  <strong>Calm. Clinical. Patient-Centric.</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Next.js-16.2.6-000000?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react" alt="React" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/shadcn/ui-latest-000000?style=flat-square&logo=shadcnui" alt="shadcn/ui" /></a>
  <br />
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-2563eb?style=flat-square" alt="License" /></a>
  <a href="#"><img src="https://img.shields.io/badge/status-production-22c55e?style=flat-square" alt="Status" /></a>
  <a href="#"><img src="https://img.shields.io/badge/HIPAA-compliant-2563eb?style=flat-square" alt="HIPAA" /></a>
</p>

<br />

> **MEDICA** is a production-ready, enterprise healthcare portal built for modern clinical workflows. It provides comprehensive patient management, appointment scheduling, telemedicine, electronic health records (EHR), prescription management, and secure messaging — all wrapped in a clean, calming, patient-centric interface designed for both providers and patients.

<br />

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Docker](#docker)
- [Engineering Highlights](#engineering-highlights)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Scalability](#scalability)
- [Observability](#observability)
- [Contributing](#contributing)
- [Security & HIPAA](#security--hipaa)
- [License](#license)
- [Contact](#contact)

---

## Overview

MEDICA draws inspiration from the best healthcare platforms in the industry:

- **Apple Health** — Clean, intuitive data visualization and patient-first design philosophy
- **Epic Systems** — Comprehensive EHR capabilities and clinical workflow depth
- **Medplum** — Open, developer-friendly FHIR-based architecture

The platform is built for healthcare organizations that need a modern, customizable portal without sacrificing compliance or clinical depth. Every component is designed with accessibility, performance, and data privacy as first-class concerns.

### Who is it for?

| Role | Experience |
|------|-----------|
| **Physicians & Providers** | Comprehensive patient records, e-prescribing, telemedicine, clinical decision support |
| **Administrators** | Scheduling, resource management, analytics, staff oversight |
| **Patients** | Appointment booking, secure messaging, medication refills, lab results |
| **Developers** | Clean API, FHIR-ready architecture, comprehensive documentation, type-safe codebase |

---

## Features

### Patient Management
- **360° Patient View** — Complete patient profile with demographics, insurance, contacts, and clinical history
- **Patient Search** — Fast, fuzzy-search across all patient records with filters
- **Patient Timeline** — Chronological view of all encounters, procedures, and communications
- **Family History** — Structured family medical history tracking

### Appointment Scheduling
- **Calendar Integration** — Multi-view calendar (day, week, month, agenda)
- **Smart Scheduling** — AI-assisted slot optimization and conflict detection
- **Recurring Appointments** — Support for regular visit schedules
- **Waitlist Management** — Automatic fill-cancellation notifications
- **Scheduling Rules** — Configurable provider availability, buffer times, and booking windows

### Telemedicine
- **Virtual Visits** — High-quality, low-latency video consultations
- **Screen Sharing** — Diagnostic image and lab result review
- **Waiting Room** — Secure digital waiting room with provider status
- **Recording** — HIPAA-compliant session recording (opt-in)
- **Multi-Party** — Support for family consultations and interpreter services

### Electronic Health Records (EHR)
- **Clinical Notes** — Structured SOAP notes with templates
- **Lab Results** — Integrated lab order and results management
- **Imaging** — DICOM viewer integration for radiology studies
- **Vitals History** — Trending and visualization of patient vitals
- **Problem List** — Active and resolved medical problem tracking

### Prescription Management
- **e-Prescribing** — Electronic prescription creation and transmission
- **Medication History** — Complete medication reconciliation
- **Drug Interactions** — Real-time interaction checking
- **Formulary Check** — Insurance formulary compliance verification
- **Refill Management** — Automated refill request processing

### Secure Messaging
- **HIPAA-Compliant** — End-to-end encrypted clinical communication
- **Thread Management** — Organized conversation threads by patient or topic
- **Attachments** — Secure file sharing for clinical documents
- **Templates** — Common message templates for efficiency
- **Read Receipts** — Delivery confirmation for critical communications

### Analytics & Reporting
- **Clinical Dashboards** — Real-time operational and clinical metrics
- **Patient Outcomes** — Treatment outcome tracking and analysis
- **Resource Utilization** — Staff and room utilization analytics
- **Custom Reports** — Configurable report builder for compliance and operations

---

## Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **Next.js 16.2.6** | React framework with App Router, server components, streaming SSR |
| **React 19** | UI component library with concurrent features |
| **TypeScript 5** | Type-safe development with strict mode |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui** | Accessible, unstyled component primitives |
| **Framer Motion** | Declarative animations and gestures |
| **Lucide React** | Consistent, lightweight icon system |
| **Zod** | Runtime type validation and schema definition |

### Backend & Infrastructure

| Technology | Purpose |
|-----------|---------|
| **Next.js API Routes** | Serverless API endpoints |
| **PostgreSQL** | Primary database with FHIR-compatible schema |
| **Redis** | Session store, cache, rate limiting |
| **AWS S3 / Cloudflare R2** | PHI-compliant file storage |
| **Docker** | Containerized deployment |
| **Vercel** | Production hosting with edge functions |

### Security & Compliance

| Technology | Purpose |
|-----------|---------|
| **AES-256-GCM** | PHI encryption at rest |
| **TLS 1.3** | Encryption in transit |
| **Helmet / CSP** | HTTP security headers |
| **Rate Limiting** | Brute force protection |
| **Audit Logging** | Full HIPAA audit trail |
| **RBAC** | Role-based access control |

---

## Screenshots

> *Placeholder — generated SVG mockups in `/public/screenshots/`*

<table>
  <tr>
    <td align="center"><img src="/public/screenshots/dashboard.svg" alt="Dashboard" width="400" /><br /><strong>Clinical Dashboard</strong></td>
    <td align="center"><img src="/public/screenshots/analytics.svg" alt="Analytics" width="400" /><br /><strong>Analytics & Reports</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="/public/screenshots/architecture.svg" alt="Architecture" width="400" /><br /><strong>System Architecture</strong></td>
    <td align="center"><img src="/public/screenshots/mobile.svg" alt="Mobile" width="400" /><br /><strong>Mobile Experience</strong></td>
  </tr>
  <tr>
    <td align="center"><img src="/public/screenshots/terminal.svg" alt="Terminal" width="400" /><br /><strong>Developer Terminal</strong></td>
    <td align="center"><img src="/public/screenshots/observability.svg" alt="Observability" width="400" /><br /><strong>Observability</strong></td>
  </tr>
</table>

---

## Architecture

MEDICA follows a **layered architecture** with clear separation of concerns, designed for HIPAA compliance and enterprise scalability.

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Web App  │  │ Mobile   │  │ Third-Party API  │  │
│  │ (Next.js)│  │ (PWA)    │  │ (FHIR/REST)      │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
└───────┼──────────────┼─────────────────┼────────────┘
        │              │                 │
┌───────┴──────────────┴─────────────────┴────────────┐
│                 Edge Layer (Vercel Edge)              │
│  ┌───────────────┐  ┌────────────┐  ┌──────────┐   │
│  │ Auth Middleware│  │ Rate Limit │  │ Geo Route│   │
│  └───────┬───────┘  └─────┬──────┘  └────┬─────┘   │
└──────────┼─────────────────┼───────────────┼─────────┘
           │                 │               │
┌──────────┴─────────────────┴───────────────┴─────────┐
│                  Application Layer                     │
│  ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Patient │ │Appt.    │ │Telemed.  │ │  EHR     │ │
│  │  Service │ │Service  │ │Service   │ │ Service  │ │
│  ├──────────┤ ├─────────┤ ├──────────┤ ├──────────┤ │
│  │  Rx      │ │Messaging│ │Analytics │ │  Audit   │ │
│  │  Service │ │Service  │ │Service   │ │ Service  │ │
│  └────┬─────┘ └────┬────┘ └────┬─────┘ └────┬─────┘ │
└───────┼─────────────┼───────────┼──────────────┼──────┘
        │             │           │              │
┌───────┴─────────────┴───────────┴──────────────┴──────┐
│                 Data Layer                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │PostgreSQL│ │  Redis   │ │   S3 /   │ │    ES    │ │
│  │ (Primary)│ │ (Session)│ │  Object  │ │ (Search) │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Server Components by Default** — Minimize client-side JavaScript; render dynamically where needed
- **Streaming SSR** — Progressive rendering for data-heavy clinical dashboards
- **Edge Middleware** — Authentication and geo-routing at the edge (no cold starts)
- **API Routes as BFF** — Backend-for-frontend pattern; aggregate and transform data for the UI
- **FHIR-Compatible Schema** — Database schema aligns with HL7 FHIR R4 for interoperability
- **Encryption at Rest** — All PHI encrypted with AES-256-GCM before storage

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **PostgreSQL** >= 15 (or Docker for local DB)
- **Redis** >= 7 (optional, for session caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/medica/healthcare-portal.git
cd medica-healthcare

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:4004](http://localhost:4004) in your browser.

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 4004 |
| `npm run build` | Production build |
| `npm run start` | Start production server on port 4004 |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run analyze` | Build with bundle analyzer |

---

## Environment Variables

See [.env.example](.env.example) for a complete list of environment variables.

**Critical variables:**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Authentication secret (generate with `openssl rand -hex 64`) |
| `ENCRYPTION_KEY` | PHI encryption key (generate with `openssl rand -hex 32`) |
| `REDIS_URL` | Redis connection string |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking |

> ⚠️ **Never commit real secrets.** Use `.env.local` for local development and secrets management services (Vercel Env, AWS Secrets Manager) for production.

---

## Deployment

### Vercel (Recommended)

The platform is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
npm run build
npm run start
```

---

## Docker

### Build and Run

```bash
# Build the image
docker build -t medica-healthcare .

# Run the container
docker run -p 4004:4004 medica-healthcare
```

### Docker Compose

```yaml
services:
  app:
    build: .
    ports:
      - "4004:4004"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/medica
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: medica
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```

---

## Engineering Highlights

### Performance

- **Lighthouse Score:** 95+ on all metrics
- **Core Web Vitals:** Optimized for LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size:** Aggressive code splitting via `experimental.optimizePackageImports`
- **Image Optimization:** Next.js Image component with AVIF/WebP, lazy loading, and remote pattern whitelisting
- **Caching:** Multi-tier (browser → CDN → Redis → Database)

### Type Safety

- **Strict TypeScript** with `strict: true` in tsconfig
- **Zod schemas** for all data models at runtime
- **Generated route types** for type-safe navigation (`route-tree.ts`)
- **Never `any`** — all edge cases typed explicitly

### Accessibility

- **WCAG 2.1 AA** target (AAA where practical)
- **shadcn/ui Radix primitives** — keyboard navigation, focus management, screen reader support
- **Color contrast** — All color combinations verified for 4.5:1 minimum ratio
- **Reduced motion** — Respects `prefers-reduced-motion` for all animations

### HIPAA Compliance

- **Audit Logging** — Every PHI access is logged with timestamp, user, action, and resource
- **Encryption at Rest** — AES-256-GCM for all stored PHI
- **Encryption in Transit** — TLS 1.3 enforced via HSTS preload
- **Access Control** — RBAC with principle of least privilege
- **Session Management** — Configurable session TTL, forced re-authentication for sensitive actions
- **Data Minimization** — Only essential PHI fields displayed by default; full data requires explicit access

---

## Project Structure

```
medica-healthcare/
├── public/
│   ├── screenshots/       # SVG mockups for documentation
│   ├── fonts/             # Self-hosted fonts
│   └── images/            # Static images
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (dashboard)/   # Dashboard layout & pages
│   │   ├── patients/      # Patient management
│   │   ├── appointments/  # Appointment scheduling
│   │   ├── telemedicine/  # Virtual care
│   │   ├── records/       # Electronic health records
│   │   ├── prescriptions/ # e-Prescribing
│   │   ├── messages/      # Secure messaging
│   │   ├── scheduling/    # Provider scheduling
│   │   ├── profile/       # User profile
│   │   └── settings/      # Application settings
│   ├── components/
│   │   ├── ui/            # shadcn/ui primitives
│   │   ├── layout/        # Layout components (header, sidebar, etc.)
│   │   ├── patients/      # Patient-specific components
│   │   ├── appointments/  # Appointment-specific components
│   │   └── shared/        # Shared business components
│   ├── lib/
│   │   ├── db/            # Database client and schema
│   │   ├── api/           # API client and utilities
│   │   ├── auth/          # Authentication logic
│   │   ├── audit/         # Audit logging
│   │   ├── encryption/    # PHI encryption utilities
│   │   ├── validations/   # Zod schemas
│   │   └── utils.ts       # Shared utilities
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # React context providers
│   ├── styles/            # Global styles and theme
│   └── types/             # TypeScript type definitions
├── docs/
│   ├── CONTRIBUTING.md    # Contribution guidelines
│   ├── ARCHITECTURE.md    # Detailed architecture docs
│   ├── DESIGN_SYSTEM.md   # Design system documentation
│   ├── SECURITY.md        # Security & HIPAA compliance
│   └── CHANGELOG.md       # Version history
├── scripts/               # Utility scripts
├── docker-compose.yml     # Docker Compose setup
├── Dockerfile             # Production container
├── next.config.ts         # Next.js configuration
├── vercel.json            # Vercel deployment config
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json           # Project metadata & dependencies
```

---

## Roadmap

### Phase 1 — Foundation (Current)
- [x] Patient management (CRUD, search, 360° view)
- [x] Appointment scheduling (calendar, conflicts, reminders)
- [x] Telemedicine (video, waiting room, recording)
- [x] Electronic health records (notes, labs, imaging)
- [x] Prescription management (eRx, interactions, formulary)

### Phase 2 — Integration
- [ ] FHIR R4 API compliance certification
- [ ] HL7 v2.x interface for legacy system integration
- [ ] SMART on FHIR app launch framework
- [ ] EHR data import (CCDA, FHIR bulk data)
- [ ] National provider registry integration

### Phase 3 — Intelligence
- [ ] AI-assisted clinical documentation
- [ ] Predictive analytics for patient outcomes
- [ ] Drug interaction AI engine
- [ ] Automated prior authorization
- [ ] Clinical decision support rules engine

### Phase 4 — Ecosystem
- [ ] Patient mobile app (React Native)
- [ ] Provider mobile app
- [ ] Public API marketplace
- [ ] White-label multi-tenant support
- [ ] Enterprise SSO (SAML, OIDC, Azure AD)

---

## Scalability

MEDICA is designed to scale from a single clinic to multi-hospital health systems:

- **Horizontal Scaling** — Stateless application layer; scale horizontally behind a load balancer
- **Database Scaling** — Read replicas for reporting queries; connection pooling via PgBouncer
- **Caching Strategy** — Multi-tier: Redis for sessions and hot data, CDN for static assets, SWR for API responses
- **Edge Computing** — Authentication and geo-aware routing at Vercel Edge
- **Database Sharding** — Future: tenant-based sharding for multi-enterprise deployments
- **Streaming** — Progressive rendering ensures fast TTFB regardless of data volume

### Performance Targets

| Metric | Target |
|--------|--------|
| Time to First Byte (TTFB) | < 200ms |
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| API Response Time (p95) | < 500ms |
| Concurrent Users (per node) | 10,000+ |

---

## Observability

- **Sentry** — Error tracking and performance monitoring
- **OpenTelemetry** — Distributed tracing across services
- **Structured Logging** — JSON logs with correlation IDs
- **Health Checks** — `/api/health` endpoint with dependency status
- **Metrics** — Prometheus metrics at `/api/metrics`
- **Audit Trail** — Complete HIPAA audit log accessible via admin interface

---

## Contributing

We welcome contributions from the healthcare technology community. Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

**Quick start:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting and type checking:

```bash
npm run lint
npm run typecheck
```

---

## Security & HIPAA

Patient data protection is our highest priority. MEDICA implements comprehensive security measures aligned with HIPAA Security Rule requirements.

See [SECURITY.md](docs/SECURITY.md) for the complete security documentation, including:

- Administrative Safeguards
- Physical Safeguards
- Technical Safeguards
- Breach Notification Procedures
- Incident Response Plan
- BAAs and Vendor Management

### Reporting Vulnerabilities

If you discover a security vulnerability, please **do not** open a public issue. Instead, email **security@medica-health.com** with details.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact

**MEDICA Health Systems**
- Website: [medica-health.vercel.app](https://medica-health.vercel.app)
- GitHub: [@medica](https://github.com/medica)
- Email: hello@medica-health.com

---

<p align="center">
  <sub>Built with ❤️ for healthcare providers and their patients.</sub>
  <br />
  <sub>© 2026 MEDICA Health Systems. All rights reserved.</sub>
</p>

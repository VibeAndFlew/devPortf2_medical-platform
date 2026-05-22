# MEDICA — Architecture

> Enterprise healthcare platform architecture — HIPAA-compliant, FHIR-ready, horizontally scalable.

## Table of Contents

- [Architecture Philosophy](#architecture-philosophy)
- [Layered Architecture](#layered-architecture)
- [Data Flow](#data-flow)
- [Security Architecture](#security-architecture)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [API Design](#api-design)
- [Database Schema](#database-schema)
- [Caching Strategy](#caching-strategy)
- [Deployment Architecture](#deployment-architecture)

---

## Architecture Philosophy

MEDICA follows four guiding principles:

1. **Patient Data First** — Every architectural decision prioritizes the security, privacy, and accessibility of patient health information (PHI).
2. **Compliance by Design** — HIPAA, HITECH, and GDPR requirements are baked into the architecture, not bolted on.
3. **Clinical Workflow Depth** — The architecture mirrors real clinical workflows, not arbitrary technical abstractions.
4. **Scale Out, Not Up** — Horizontal scalability from day one; the platform handles 10 to 10,000+ concurrent users.

---

## Layered Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                    │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────────┐  │
│  │ Next.js Web App │  │   Mobile PWA     │  │  Third-Party Clients   │  │
│  │ (React 19, SSR) │  │ (React Native)   │  │  (FHIR, REST, HL7)    │  │
│  └────────┬────────┘  └────────┬─────────┘  └───────────┬────────────┘  │
└───────────┼────────────────────┼────────────────────────┼───────────────┘
            │                    │                        │
┌───────────┼────────────────────┼────────────────────────┼───────────────┐
│           │          EDGE LAYER (Vercel Edge Network)    │               │
│  ┌────────┴────────┐  ┌───────┴────────┐  ┌─────────────┴──────────┐   │
│  │  Auth Middleware │  │  Rate Limiting │  │  Geo-Routing / CDN    │   │
│  │  (JWT Verify)   │  │  (Token Bucket)│  │  (Static Assets)      │   │
│  └────────┬────────┘  └───────┬────────┘  └─────────────┬──────────┘   │
└───────────┼────────────────────┼────────────────────────┼───────────────┘
            │                    │                        │
┌───────────┼────────────────────┼────────────────────────┼───────────────┐
│           │         APPLICATION LAYER (Next.js API / Server Components)  │
│           │                                                              │
│  ┌────────┴─────────────────────────────────────────────────────────┐   │
│  │                       API Gateway / BFF                         │   │
│  │          (Backend for Frontend — aggregates, transforms)         │   │
│  └────────┬──────────┬──────────┬──────────┬──────────┬───────────┘   │
│           │          │          │          │          │               │
│  ┌────────┴──┐ ┌─────┴─────┐ ┌─┴────────┐ ┌┴────────┐ ┌┴──────────┐  │
│  │  Patient  │ │Appointment│ │Telemed.  │ │   EHR   │ │Prescript. │  │
│  │  Service  │ │ Service   │ │ Service   │ │ Service │ │ Service   │  │
│  ├───────────┤ ├───────────┤ ├──────────┤ ├─────────┤ ├───────────┤  │
│  │ Messaging │ │Audit      │ │Analytics │ │ Notif.  │ │  Auth     │  │
│  │ Service   │ │ Service   │ │ Service   │ │ Service │ │  Service  │  │
│  └─────┬─────┘ └─────┬─────┘ └─────┬────┘ └────┬────┘ └─────┬─────┘  │
└────────┼───────────────┼──────────────┼──────────┼──────────────┼──────┘
         │               │              │          │              │
┌────────┴───────────────┴──────────────┴──────────┴──────────────┴──────┐
│                            DATA LAYER                                    │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐  │
│  │     PostgreSQL    │  │      Redis       │  │   Object Storage     │  │
│  │  - Patient Data   │  │  - Session Store │  │   - PHI Documents    │  │
│  │  - Clinical Data  │  │  - Cache Layer   │  │   - Lab Results      │  │
│  │  - Audit Logs     │  │  - Rate Limits   │  │   - Medical Images   │  │
│  │  - FHIR Resources │  │  - Pub/Sub       │  │   - Backups          │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                     Elasticsearch (Optional)                      │   │
│  │            Full-text search across clinical records               │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Patient Visit Lifecycle

```
Patient Check-in
       │
       ▼
┌──────────────┐
│   Identity   │──→ Audit: "Patient viewed by Dr. Smith at 09:32"
│  Verification│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Vitals    │──→ EHR: Store BP, HR, temp, O2, weight
│   Capture    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    SOAP      │──→ EHR: Store structured clinical note
│   Note       │
└──────┬───────┘
       │
       ├───────→ Prescription Service → Surescripts (eRx)
       ├───────→ Lab Orders → LabCorp/Quest interface
       ├───────→ Imaging → DICOM gateway
       │
       ▼
┌──────────────┐
│  Follow-up   │──→ Notification Service
│  Scheduling  │──→ Appointment Service (slot reservation)
└──────────────┘
       │
       ▼
     Audit: "Encounter #1234 completed. Duration: 18 minutes."
```

### Telemedicine Session Flow

```
Provider initiates call
       │
       ▼
┌──────────────────┐
│  Video SDK Init  │──→ Generate room token (JWT, TTL=60 min)
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   Waiting Room   │──→ Patient joins → Provider notified
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Active Session  │──→ Bidirectional video/audio
│                  │──→ Screen share (diagnostic review)
│                  │──→ Chat (side channel)
│                  │──→ Recording (opt-in, HIPAA-compliant)
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Session End     │──→ Generate summary
│                  │──→ Link to patient encounter
│                  │──→ Audit: "Telemedicine session #5678 completed"
└──────────────────┘
```

---

## Security Architecture

### PHI Protection Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHYSICAL SECURITY                             │
│  Vercel / AWS data centers — SOC 2 Type II, HITRUST certified  │
├─────────────────────────────────────────────────────────────────┤
│                    NETWORK SECURITY                              │
│  VPC, private subnets, security groups, WAF, DDoS protection   │
├─────────────────────────────────────────────────────────────────┤
│                    TRANSPORT SECURITY                            │
│  TLS 1.3, HSTS preload, certificate pinning                     │
├─────────────────────────────────────────────────────────────────┤
│                    APPLICATION SECURITY                          │
│  RBAC, MFA, session management, rate limiting, input validation │
├─────────────────────────────────────────────────────────────────┤
│                    DATA SECURITY                                 │
│  AES-256-GCM at rest, column-level encryption, key rotation     │
├─────────────────────────────────────────────────────────────────┤
│                    AUDIT & MONITORING                            │
│  Full audit trail, anomaly detection, SIEM integration          │
└─────────────────────────────────────────────────────────────────┘
```

### Encryption Strategy

| Data State | Method | Key Management |
|-----------|--------|---------------|
| **At Rest (Database)** | AES-256-GCM column encryption | AWS KMS / HashiCorp Vault |
| **At Rest (Files)** | Server-side encryption (S3 SSE-KMS) | AWS KMS with automatic rotation |
| **In Transit** | TLS 1.3 | Let's Encrypt / ACM |
| **Application Secrets** | Environment variables | Vercel Encrypted Env / AWS Secrets Manager |
| **Session Tokens** | JWT with RS256 | Rotated weekly |

---

## Component Architecture

### React Component Tree

```
<AppProviders>
  <SessionProvider>
    <ThemeProvider>
      <TooltipProvider>
        <ToastProvider>
          <AppShell>
            <Sidebar />
            <Header>
              <SearchBar />
              <UserMenu />
              <Notifications />
            </Header>
            <Main>
              {children}  ← Page content (Server Components by default)
            </Main>
          </AppShell>
        </ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  </SessionProvider>
</AppProviders>
```

### Component Hierarchy Guidelines

- **Page Components** — Top-level route components; compose page-specific layouts
- **Layout Components** — Shared shell (sidebar, header, main); accept `children`
- **Feature Components** — Encapsulate business logic (PatientCard, AppointmentCalendar, etc.)
- **UI Components** — shadcn/ui primitives (Button, Dialog, Card, etc.)
- **Utility Components** — Generic helpers (LoadingState, ErrorBoundary, EmptyState)

---

## State Management

| State Type | Solution | When to Use |
|-----------|----------|-------------|
| **Server State** | React Server Components | Default for all data fetching |
| **URL State** | `useSearchParams`, `useParams` | Filters, pagination, search queries |
| **Form State** | React `useActionState` (Server Actions) | Forms with server validation |
| **UI State** | React `useState` / `useReducer` | Local UI state (open/close, selections) |
| **Global Client State** | React Context + `useOptimistic` | Auth session, notifications, sidebar |
| **Persisted State** | `localStorage` via custom hook | Preferences, theme, recent patients |
| **Cache** | Next.js `unstable_cache` / `fetch` cache | API response caching |

---

## API Design

### Internal API (BFF)

```
GET    /api/patients           → List patients (paginated, filterable)
GET    /api/patients/:id       → Patient 360° view
POST   /api/patients           → Create patient
PUT    /api/patients/:id       → Update patient
DELETE /api/patients/:id       → Soft-delete patient

GET    /api/appointments       → List appointments
POST   /api/appointments       → Create appointment
PUT    /api/appointments/:id   → Reschedule
DELETE /api/appointments/:id   → Cancel

GET    /api/telemedicine/room  → Get/create video room
POST   /api/telemedicine/start → Start session
POST   /api/telemedicine/end   → End session

GET    /api/records/:patientId → Get patient records
POST   /api/records/:patientId → Add record entry

GET    /api/prescriptions      → List prescriptions
POST   /api/prescriptions      → Create prescription
PUT    /api/prescriptions/:id  → Update/refill

GET    /api/messages           → List conversations
POST   /api/messages           → Send message
```

### External API (FHIR R4)

```
GET    /fhir/Patient           → FHIR Patient search
GET    /fhir/Patient/:id       → FHIR Patient read
GET    /fhir/Encounter         → FHIR Encounter search
GET    /fhir/Observation       → FHIR Observation (vitals, labs)
GET    /fhir/MedicationRequest → FHIR MedicationRequest
GET    /fhir/Coverage          → FHIR Coverage (insurance)
```

---

## Database Schema

### Core Tables

```
patients
├── id (UUID, PK)
├── mrn (Medical Record Number, unique)
├── first_name, last_name
├── date_of_birth
├── gender
├── ssn_encrypted (AES-256-GCM)
├── phone, email
├── address (JSONB)
├── insurance (JSONB)
├── emergency_contact (JSONB)
├── status (active, inactive, deceased)
├── created_at, updated_at
└── deleted_at (soft delete)

appointments
├── id (UUID, PK)
├── patient_id (FK → patients)
├── provider_id (FK → providers)
├── start_time, end_time
├── status (scheduled, confirmed, in-progress, completed, cancelled)
├── type (in-person, telemedicine, phone)
├── reason
├── notes
├── created_by (FK → users)
└── cancelled_at, cancel_reason

encounters
├── id (UUID, PK)
├── patient_id (FK → patients)
├── appointment_id (FK → appointments, nullable)
├── provider_id (FK → providers)
├── encounter_type (office, telemed, phone, lab)
├── started_at, ended_at
├── diagnosis (JSONB — ICD-10 codes)
├── billing_code (CPT)
└── notes

clinical_notes
├── id (UUID, PK)
├── encounter_id (FK → encounters)
├── note_type (soap, progress, consult, discharge)
├── subjective (text, encrypted)
├── objective (text, encrypted)
├── assessment (text, encrypted)
├── plan (text, encrypted)
├── created_by (FK → users)
└── signed_at

prescriptions
├── id (UUID, PK)
├── patient_id (FK → patients)
├── provider_id (FK → providers)
├── medication_code (RxNorm)
├── medication_name
├── dosage, route, frequency, duration
├── quantity, refills
├── status (active, dispensed, discontinued, expired)
├── pharmacy_id (FK → pharmacies)
├── written_at, expires_at
└── sig (human-readable instructions)

audit_logs
├── id (UUID, PK)
├── timestamp
├── user_id (FK → users)
├── action (view, create, update, delete, export)
├── resource_type (patient, appointment, record, etc.)
├── resource_id
├── ip_address
├── user_agent
├── phi_accessed (boolean)
└── details (JSONB)
```

---

## Caching Strategy

```
┌──────────────────────────────────────────────────┐
│                  Browser Cache                     │
│  ┌──────────────┐  ┌───────────────────────────┐ │
│  │ SWR (stale   │  │  next/image (AVIF/WebP)   │ │
│  │ while reval.)│  │  30-day immutable cache   │ │
│  └──────┬───────┘  └─────────────┬─────────────┘ │
└─────────┼────────────────────────┼────────────────┘
          │                        │
┌─────────┼────────────────────────┼────────────────┐
│         │     CDN (Vercel Edge)   │                │
│  ┌──────┴───────┐  ┌─────────────┴─────────────┐  │
│  │ Static Assets │  │  API Responses            │  │
│  │ (immutable)   │  │  (vary on auth)           │  │
│  └──────────────┘  └─────────────┬─────────────┘  │
└──────────────────────────────────┼─────────────────┘
                                   │
┌──────────────────────────────────┼─────────────────┐
│                    Application Layer                │
│  ┌───────────────────────────────┴──────────────┐  │
│  │           React Cache / fetch cache           │  │
│  │   (deduplication, revalidation tags)         │  │
│  └───────────────────────────────┬──────────────┘  │
└──────────────────────────────────┼─────────────────┘
                                   │
┌──────────────────────────────────┼─────────────────┐
│                    Redis Cache Layer                │
│  ┌──────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ Session Store│  │ Data Cache │  │ Rate Lim.  │ │
│  │ (TTL: 24h)   │  │ (TTL: 5m)  │  │ (window)   │ │
│  └──────────────┘  └────────────┘  └────────────┘ │
└──────────────────────────────────┼─────────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │     PostgreSQL       │
                        │  (source of truth)  │
                        └─────────────────────┘
```

---

## Deployment Architecture

### Production (Vercel)

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Vercel   │───▶│ Vercel   │───▶│ Vercel   │
│ Edge     │    │ Server   │    │ Server   │
│ (middle) │    │ (API)    │    │ (SSR)    │
└──────────┘    └────┬─────┘    └────┬─────┘
                     │               │
                     ▼               ▼
              ┌────────────┐  ┌────────────┐
              │  PostgreSQL │  │   Redis    │
              │  (RDS)     │  │  (Elasti)  │
              └────────────┘  └────────────┘
```

### Docker / Self-Hosted

```
┌──────────────┐
│   NGINX      │──▶ app:4004 (container 1)
│  (reverse    │──▶ app:4004 (container 2)
│   proxy)     │──▶ app:4004 (container 3)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   PostgreSQL │────▶ Read Replica 1
│   (primary)  │────▶ Read Replica 2
└──────────────┘
       │
       ▼
┌──────────────┐
│    Redis     │
│   (cluster)  │
└──────────────┘
```

---

## Observability Architecture

```
┌────────────────────────────────────────────────────────┐
│                     Application                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐ │
│  │ Structured │  │ OpenTelemetry│  │   Health Check   │ │
│  │ Logging    │  │ Tracing    │  │   (/api/health)  │ │
│  └──────┬─────┘  └──────┬─────┘  └────────┬─────────┘ │
└─────────┼────────────────┼──────────────────┼───────────┘
          │                │                  │
┌─────────┴────────────────┴──────────────────┴───────────┐
│                   Collection Layer                        │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │  Sentry    │  │    OTel    │  │  Prometheus       │  │
│  │  SDK       │  │ Collector  │  │  (metrics)        │  │
│  └──────┬─────┘  └──────┬─────┘  └────────┬─────────┘  │
└─────────┼────────────────┼──────────────────┼───────────┘
          │                │                  │
┌─────────┴────────────────┴──────────────────┴───────────┐
│                   Visualization Layer                     │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │  Sentry.io │  │   Grafana  │  │   Datadog        │  │
│  │  (errors)  │  │  (traces)  │  │  (metrics+dash)  │  │
│  └────────────┘  └────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

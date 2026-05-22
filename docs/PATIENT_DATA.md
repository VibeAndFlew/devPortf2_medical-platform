# Patient Data Management

> Data lifecycle, privacy controls, and clinical data standards in MEDICA.

## Data Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Capture  │───▶│  Store   │───▶│  Access  │───▶│  Archive │───▶│  Destroy │
│ (input)  │    │ (encrypt)│    │ (auth+z) │    │ (retain) │    │ (secure) │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### 1. Capture
- All patient data entered via validated forms (Zod schemas)
- File uploads scanned for malware and metadata PHI
- API integrations validated against FHIR R4 profiles
- Audit log entry created on data creation

### 2. Storage
- PHI encrypted with AES-256-GCM before database write
- Encryption keys managed by AWS KMS / HashiCorp Vault
- Database at rest encryption (RDS encryption)
- Object storage encryption (S3 SSE-KMS)

### 3. Access
- RBAC enforced at middleware and application layers
- Patient-provider relationship check
- Consent check (patient-authorized access only)
- All access logged in tamper-evident audit trail

### 4. Archive
- Active data in primary database (indefinite)
- Cold data archived to S3 Glacier after configurable period
- Archive encrypted with separate key
- Archive index maintained for search

### 5. Destruction
- Soft delete (marked as deleted, retained per policy)
- Hard delete after retention period expires
- Secure deletion (overwrite + verify)
- Certificate of destruction generated

## Patient Data Model

### Demographic Information
- Name, DOB, gender, contact information
- Encrypted at rest
- Masked by default in UI (full data requires explicit action)

### Clinical Data
- Medical history, diagnoses, medications, allergies
- Laboratory results, imaging reports
- Clinical notes (SOAP, progress, consult)
- Immunization records
- Vital signs with trend data

### Insurance & Billing
- Insurance carrier, policy ID, group number
- Coverage verification data
- Claims history
- All insurance fields encrypted at rest

### Consent & Preferences
- Treatment consent documents
- Data sharing authorizations
- Communication preferences
- Advance directives

## Data Minimization

MEDICA implements data minimization principles:

- Default views show only essential clinical information
- Full PHI disclosure requires explicit action and is logged
- "Just-in-time" PHI access — data fetched when needed, not pre-loaded
- Configurable field-level masking for different roles

## Patient Data Export

Patients have the right to request their data in machine-readable format:

- **Format:** FHIR JSON, CCDA XML, or PDF summary
- **Scope:** All PHI or specific data categories
- **Timeline:** Within 30 days (per HIPAA)
- **Method:** Secure download portal (expiring link)
- **Cost:** First request free per 12-month period

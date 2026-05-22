# HIPAA Compliance Guide

> MEDICA's implementation of HIPAA Privacy, Security, and Breach Notification Rules.

## Applicable Regulations

- **HIPAA Privacy Rule** (45 CFR §164.500-534) — Protected Health Information (PHI) use and disclosure
- **HIPAA Security Rule** (45 CFR §164.302-318) — Administrative, physical, technical safeguards
- **HIPAA Breach Notification Rule** (45 CFR §164.400-414) — Notification requirements following breach
- **HITECH Act** — Enhanced enforcement, breach notification, and business associate liability

## PHI Identification and Classification

### 18 HIPAA Identifiers

MEDICA identifies and protects all 18 PHI identifiers:

| # | Identifier | Protection Method |
|---|-----------|------------------|
| 1 | Names | AES-256-GCM encryption at rest |
| 2 | Geographic subdivisions | Field-level encryption |
| 3 | Dates (DOB, admission, discharge, death) | Field-level encryption |
| 4 | Telephone numbers | AES-256-GCM encryption |
| 5 | Fax numbers | AES-256-GCM encryption |
| 6 | Email addresses | AES-256-GCM encryption |
| 7 | SSN | AES-256-GCM encryption, access restricted |
| 8 | Medical record numbers | HMAC-hashed for internal use |
| 9 | Health plan beneficiary numbers | AES-256-GCM encryption |
| 10 | Account numbers | Field-level encryption |
| 11 | Certificate/license numbers | Field-level encryption |
| 12 | Vehicle identifiers | Field-level encryption |
| 13 | Device identifiers | Field-level encryption |
| 14 | Web URLs | TLS 1.3 in transit |
| 15 | IP addresses | Truncated/anonymized in logs |
| 16 | Biometric identifiers | Not stored |
| 17 | Facial images | Encrypted object storage |
| 18 | Any other unique identifying characteristic | Contextual detection |

## Required Policies

MEDICA includes configurable enforcement for:

1. **Minimum Necessary Rule** — Only the minimum PHI necessary for the intended purpose is accessed
2. **Notice of Privacy Practices** — Configurable patient-facing notice
3. **Patient Rights** — Access, amendment, accounting of disclosures, restriction requests
4. **Authorization** — Patient authorization for non-treatment PHI uses
5. **Marketing Prohibitions** — No PHI use for marketing without authorization
6. **Sale Prohibition** — No sale of PHI

## Audit Log Requirements

HIPAA §164.312(b) requires audit controls. MEDICA logs:

- **Who** accessed PHI (user ID, role)
- **What** was accessed (resource type, specific fields)
- **When** (timestamp with millisecond precision)
- **Where** (IP address, location if available)
- **Why** (purpose of use — treatment, payment, operations)
- **How** (device, browser, API endpoint)

Retention: Minimum 6 years (HIPAA requirement), configurable up to 10 years.

## Breach Notification

MEDICA supports automated breach detection and notification workflows:

- **Risk Assessment** — Four-factor risk assessment (nature, unauthorized person, acquisition, mitigation)
- **Notification Timelines** — 60 days for all breaches; 24 hours for emergency
- **Notification Content** — Description, types of PHI involved, steps to protect, contact information
- **HHS Notification** — Annual log for < 500; immediate for >= 500

---

## Compliance Checklist

- [x] PHI access controls with unique user IDs
- [x] Automatic logoff (configurable timeout)
- [x] Encryption at rest (AES-256-GCM)
- [x] Encryption in transit (TLS 1.3)
- [x] Comprehensive audit logging
- [x] Emergency access procedure (break-glass)
- [x] Integrity controls (checksums, versioning)
- [x] Person/entity authentication (MFA support)
- [x] Contingency plan (backups, DR)
- [x] Security incident procedures
- [x] Workforce training materials
- [x] BAA management

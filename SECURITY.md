# MEDICA — Security & HIPAA Compliance

> Protecting patient health information (PHI) is the foundation of MEDICA's architecture.

## Table of Contents

- [HIPAA Compliance Overview](#hipaa-compliance-overview)
- [Administrative Safeguards](#administrative-safeguards)
- [Physical Safeguards](#physical-safeguards)
- [Technical Safeguards](#technical-safeguards)
- [PHI Data Flow & Protection](#phi-data-flow--protection)
- [Encryption Strategy](#encryption-strategy)
- [Access Control](#access-control)
- [Audit Controls](#audit-controls)
- [Integrity Controls](#integrity-controls)
- [Transmission Security](#transmission-security)
- [Breach Notification](#breach-notification)
- [Incident Response Plan](#incident-response-plan)
- [Business Associate Agreements](#business-associate-agreements)
- [Security Checklist](#security-checklist)
- [Reporting Vulnerabilities](#reporting-vulnerabilities)

---

## HIPAA Compliance Overview

MEDICA is designed to support covered entities and business associates in meeting the requirements of the **HIPAA Security Rule** (45 CFR Part 160 and Part 164, Subparts A and C) and the **HIPAA Privacy Rule** (45 CFR Part 160 and Part 164, Subparts A and E).

### Security Rule Standards Addressed

| Standard | Implementation Specification | MEDICA Implementation |
|----------|---------------------------|----------------------|
| **§164.308(a)(1)** Security Management Process | Risk Analysis, Risk Management | Audit logging, access controls, encryption |
| **§164.308(a)(2)** Assigned Security Responsibility | Security Officer | Configurable role assignment |
| **§164.308(a)(3)** Workforce Security | Authorization, Supervision, Termination | RBAC with granular permissions |
| **§164.308(a)(4)** Information Access Management | Access Authorization, Access Establishment | Role-based access control |
| **§164.308(a)(5)** Security Awareness and Training | Security Reminders, Protection from Malware, Login Monitoring | Session tracking, rate limiting |
| **§164.308(a)(6)** Security Incident Procedures | Response and Reporting | Incident response module |
| **§164.308(a)(7)** Contingency Plan | Data Backup, Disaster Recovery, Emergency Mode | Automated backups, multi-region deployment |
| **§164.308(a)(8)** Evaluation | Periodic technical evaluation | Built-in compliance reporting |
| **§164.310(a)(1)** Facility Access Controls | Contingency Operations, Facility Security, Access Control | Vercel/AWS SOC 2 infrastructure |
| **§164.310(b)** Workstation Use | Proper workstation use | Documented in security policies |
| **§164.310(c)** Workstation Security | Physical safeguards | Infrastructure-level controls |
| **§164.310(d)(1)** Device and Media Controls | Disposal, Media Re-use, Accountability | Secure deletion policies |
| **§164.312(a)(1)** Access Control | Unique User ID, Emergency Access, Automatic Logoff, Encryption | JWT auth, session timeout, AES-256 |
| **§164.312(b)** Audit Controls | Record and examine activity | Comprehensive audit trail |
| **§164.312(c)(1)** Integrity Controls | Mechanism to authenticate PHI | Checksums, audit logging |
| **§164.312(d)** Person or Entity Authentication | Authentication | MFA, passwordless options |
| **§164.312(e)(1)** Transmission Security | Integrity Controls, Encryption | TLS 1.3, message-level encryption |

---

## Administrative Safeguards

### Security Management Process

- Regular risk assessments (quarterly minimum)
- Documented risk management plan
- Sanction policy for workforce violations
- Information system activity review (daily audit log review)

### Assigned Security Responsibility

- Named Security Officer in organization configuration
- Delegated security administration via RBAC
- Separation of duties for security-sensitive operations

### Workforce Security

- Background checks for all personnel with PHI access
- Role-based access provisioning
- Immediate access revocation on termination
- Periodic access review (monthly)

### Information Access Management

- Role-based access control (RBAC) with principle of least privilege
- Patient-provider relationship-based access
- Break-glass emergency access with audit notification
- Authorized user lists maintained per patient

### Security Awareness and Training

- Annual HIPAA training for all personnel
- Security reminders displayed on login
- Phishing simulation program
- Protected from malware via CSP and input sanitization

### Security Incident Procedures

- Automated incident detection (anomaly-based)
- Severity classification (Low, Medium, High, Critical)
- Documented response procedures
- Post-incident analysis and remediation

### Contingency Plan

- Automated database backups (hourly)
- Point-in-time recovery (7-day window)
- Multi-region failover capability
- Disaster recovery testing (quarterly)
- Emergency mode operation procedures

---

## Physical Safeguards

MEDICA leverages Vercel's and AWS's infrastructure for physical security:

- **Data Centers:** SOC 2 Type II, HITRUST, ISO 27001 certified
- **Access Control:** Biometric + multi-factor access
- **Video Surveillance:** 24/7 monitoring
- **Environmental Controls:** Redundant power, HVAC, fire suppression
- **Media Disposal:** NIST SP 800-88 compliant destruction

---

## Technical Safeguards

### Access Control

#### Unique User Identification
- Every user has a unique identifier (UUID)
- No shared accounts permitted
- System-level operations use service accounts with restricted scope

#### Emergency Access Procedure
- Break-glass mechanism for emergency PHI access
- Automatic notification to Security Officer
- Requires justification documentation within 24 hours
- Full audit trail captured

#### Automatic Logoff
- Configurable session timeout (default: 30 minutes)
- Idle session detection with warning
- Forced re-authentication for sensitive operations

#### Encryption and Decryption
- AES-256-GCM for PHI at rest
- TLS 1.3 for data in transit
- Key management via AWS KMS / HashiCorp Vault

#### Multi-Factor Authentication
- TOTP-based MFA support
- Hardware key support (WebAuthn/FIDO2)
- Optional biometric authentication
- MFA enforced for remote access

### Audit Controls

#### Audit Log Contents
Every audit event captures:

```json
{
  "id": "uuid",
  "timestamp": "2026-01-15T09:32:15.123Z",
  "user_id": "user-uuid",
  "user_role": "physician",
  "action": "view",
  "resource_type": "patient_record",
  "resource_id": "patient-uuid",
  "phi_accessed": true,
  "phi_fields": ["diagnosis", "medications"],
  "ip_address": "203.0.113.1",
  "user_agent": "Mozilla/5.0...",
  "session_id": "session-uuid",
  "correlation_id": "correlation-uuid",
  "duration_ms": 234,
  "result": "success",
  "details": {
    "reason": "scheduled_appointment",
    "patient_consent": true
  }
}
```

#### Audit Events Captured
- All PHI access (view, create, update, delete)
- Authentication events (login, logout, failed attempts)
- Authorization changes
- Configuration changes
- Data export/download
- Emergency access
- Session management

#### Audit Log Protection
- Write-once, append-only log storage
- Tamper-evident with SHA-256 hash chain
- Encrypted at rest and in transit
- Retained for minimum 6 years (HIPAA requirement)
- Access restricted to Security Officer and authorized auditors

### Integrity Controls

- **Checksums:** SHA-256 hash verification for all PHI records
- **Digital Signatures:** Signed clinical notes and prescriptions
- **Version Control:** Full revision history for all clinical documents
- **Validation:** Zod schema validation for all data input
- **Backup Verification:** Automated restore testing (weekly)

### Transmission Security

- **TLS 1.3 enforced** for all client-server communication
- **HSTS preload** with `max-age=63072000`
- **Certificate pinning** for API communications
- **Message-level encryption** for sensitive fields
- **VPN required** for database and Redis connections

---

## PHI Data Flow & Protection

### PHI Detection and Classification

```
Data Entry Point
       │
       ▼
┌──────────────────┐
│  Input Detection │──→ Auto-classify: PHI / non-PHI
└──────┬───────────┘
       │
       ├── Non-PHI → Standard processing
       │
       ▼
   ┌───┴───┐
   │  PHI  │
   └───┬───┘
       │
       ▼
┌──────────────────┐
│   Encryption     │──→ Encrypt with AES-256-GCM
│   at ingress     │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   Audit Log      │──→ Record: WHO, WHAT, WHEN, WHY
│   Immediately    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Store in DB     │──→ Encrypted column / encrypted file
│  or Object Store │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   Access Control │──→ Verify RBAC, patient-provider
│   on Retrieval   │     relationship, consent
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   Decrypt on     │──→ Decrypt only for authorized
│   authorized     │     users in authorized contexts
│   display        │
└──────────────────┘
```

### PHI Fields Requiring Encryption

| Field | Encryption | Justification |
|-------|-----------|---------------|
| Social Security Number | AES-256-GCM | Direct identifier |
| Medical Record Number | HMAC + DB hashing | Quasi-identifier |
| Date of Birth | AES-256-GCM | Direct identifier when combined |
| Full Name | AES-256-GCM | Direct identifier |
| Address | AES-256-GCM | Direct identifier |
| Phone Number | AES-256-GCM | Direct identifier |
| Email | AES-256-GCM | Direct identifier |
| Clinical Notes (free text) | AES-256-GCM | May contain any PHI |
| Insurance ID | AES-256-GCM | Direct identifier |
| Lab Results | AES-256-GCM | Clinical data |

---

## Encryption Strategy

### Key Hierarchy

```
Master Key (AWS KMS / Vault)
       │
       ▼
┌──────────────────┐
│  Data Encryption │──→ Used to encrypt data keys
│  Key (DEK)       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  PHI Encryption │──→ Generated per field/file
│  Keys (PEK)     │     Encrypted with DEK
└──────┬───────────┘
       │
       ▼
   ┌───┴───┐
   │ PHI   │──→ AES-256-GCM encrypted
   │ Data  │     Nonce + ciphertext + auth tag
   └───────┘
```

### Key Rotation
- Master Key: Automatic (AWS KMS managed)
- DEK: Every 90 days
- PEK: Every 30 days

---

## Access Control

### Role-Based Access Control (RBAC)

| Role | PHI Access | Actions |
|------|-----------|---------|
| **Super Admin** | All patients | Full system access, configuration |
| **Physician** | Assigned patients only | Full clinical read/write |
| **Nurse** | Assigned patients only | Vitals, notes (read/write), limited prescribing |
| **Administrator** | Scheduling data | Appointment management, reporting |
| **Patient** | Self only | View own records, messaging, scheduling |
| **Read-Only Auditor** | All patients (audit context) | Read-only, logged access |
| **Emergency Access** | All patients | Time-limited, auto-notified |

### Access Control Enforcement

```
Request → Edge Middleware (JWT verify)
              │
              ▼
         ┌──────────┐
         │  RBAC    │──→ Role check (can access this resource type?)
         │  Check   │
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │  Patient │──→ Patient-provider relationship check
         │  Access  │     (can access THIS patient?)
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │  Consent │──→ Patient consent check
         │  Check   │     (has patient authorized this use?)
         └────┬─────┘
              │
              ▼
         ┌──────────┐
         │  Audit   │──→ Log the access attempt
         │  Log     │
         └────┬─────┘
              │
         ┌────┴────┐
         │  Grant  │  Deny
         └────┬────┘
              │
              ▼
          Decrypt & Return PHI
```

---

## Breach Notification

### Notification Timeline

| Breach Type | Notification Deadline | Parties Notified |
|------------|----------------------|------------------|
| < 500 patients | 60 days from discovery | Affected individuals, HHS |
| >= 500 patients | 60 days from discovery | Affected individuals, HHS, media |
| Emergency | 24 hours | Security Officer, legal counsel |

### Breach Response Procedure

1. **Detection** — Automated alert or manual report
2. **Containment** — Isolate affected systems
3. **Investigation** — Determine scope and cause
4. **Notification** — Legal obligation determination
5. **Remediation** — Fix vulnerability
6. **Documentation** — Full incident report
7. **Review** — Post-incident analysis and policy update

---

## Incident Response Plan

### Severity Levels

| Level | Definition | Response Time |
|-------|-----------|---------------|
| **L1 - Critical** | Confirmed PHI exposure, system compromise | < 1 hour |
| **L2 - High** | Suspected PHI exposure, active attack | < 4 hours |
| **L3 - Medium** | Policy violation, attempted breach | < 24 hours |
| **L4 - Low** | Suspicious activity, minor policy violation | < 72 hours |

### Incident Response Team Roles

- **Incident Commander** — Coordinates response
- **Security Analyst** — Technical investigation
- **Legal Counsel** — Regulatory compliance
- **Communications Lead** — Internal/external notifications
- **Engineering Lead** — Technical remediation

---

## Business Associate Agreements

MEDICA requires BAAs with all subcontractors handling PHI:

- Vercel (hosting)
- AWS (infrastructure)
- Sentry (error monitoring — PHI scrubbed)
- Video SDK provider (telemedicine vendor)
- Email service provider (HIPAA-compliant)

Each BAA includes:
- Permitted uses and disclosures
- Safeguards requirements
- Breach notification obligations
- Data return/destruction requirements
- Audit rights
- Liability and indemnification

---

## Security Checklist

### Pre-Deployment

- [ ] All default credentials changed
- [ ] TLS 1.3 configured and verified
- [ ] CSP headers enabled and tested
- [ ] Rate limiting configured
- [ ] Audit logging verified
- [ ] Encryption keys generated and stored in vault
- [ ] Database access restricted to private network
- [ ] MFA enabled for all admin accounts
- [ ] Backup configuration verified
- [ ] Incident response plan documented

### Weekly

- [ ] Review access logs for anomalies
- [ ] Verify backup integrity
- [ ] Check failed authentication attempts
- [ ] Review emergency access logs

### Monthly

- [ ] User access review
- [ ] Vulnerability scan
- [ ] Key rotation (if applicable)
- [ ] Staff training completion check

### Quarterly

- [ ] Penetration test
- [ ] Risk assessment
- [ ] Disaster recovery drill
- [ ] BAA review

### Annually

- [ ] HIPAA compliance audit
- [ ] Third-party security assessment
- [ ] Security policy review and update

---

## Reporting Vulnerabilities

If you discover a security vulnerability in MEDICA, please report it responsibly:

1. **Do not** open a public GitHub issue
2. **Email:** security@medica-health.com
3. **PGP Key:** Available at https://medica-health.com/security/pgp
4. **Response Time:** We will acknowledge receipt within 24 hours

We follow **coordinated disclosure** and will work with you to verify and remediate the issue before public disclosure.

### Bug Bounty

We operate a private bug bounty program for verified healthcare security researchers. Contact security@medica-health.com for details.

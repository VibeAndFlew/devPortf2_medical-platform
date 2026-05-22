# Clinical Workflows

> Designed for clinical efficiency — mirroring real-world healthcare processes.

## Core Clinical Workflows

### 1. Patient Check-In

```
Patient arrives
      │
      ▼
┌──────────────┐
│ Identity     │   Verify name, DOB, MRN
│ Verification │   → Check-in kiosk or front desk
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Insurance    │   Verify active coverage
│ Verification │   → Real-time eligibility check
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Consent      │   Treatment consent, privacy notice
│ & Forms      │   → Electronic signature capture
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Vitals       │   BP, HR, temp, O2, weight, height
│ Capture      │   → Auto-populated into EHR
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Wait         │   → Provider notified of ready status
│ for Provider │   → Estimated wait time displayed
└──────────────┘
```

### 2. Clinical Encounter

```
┌──────────────┐
│ Subjective   │   Chief complaint, HPI, ROS
│              │   → Patient-reported symptoms
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Objective    │   Vital signs, physical exam
│              │   → Structured exam template
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Assessment   │   Diagnosis, differential
│              │   → ICD-10 coding, problem list update
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Plan         │   Medications, labs, imaging,
│              │   referrals, follow-up
│              │   → Orders, prescriptions, scheduling
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Summary      │   After-visit summary
│ & Close      │   → Patient portal update
│              │   → Billing codes generated
└──────────────┘
```

### 3. Telemedicine Visit

```
┌──────────────┐
│ Pre-Visit    │   Patient joins waiting room
│              │   → Device check, consent
└──────┬───────┘
      │
┌──────┴──────┐
│  Provider   │   → Notified of patient arrival
│  Join       │   → Session started
└──────┬───────┘
      │
┌──────┴──────┐
│  Active     │   Video/audio consultation
│  Visit      │   Screen sharing for diagnostics
│             │   Side-channel chat (if needed)
└──────┬───────┘
      │
┌──────┴──────┐
│  Post-      │   Encounter documentation
│  Visit      │   Prescription sent electronically
│             │   Follow-up scheduled
└─────────────┘
```

### 4. Prescription Workflow

```
┌──────────────┐
│ Medication   │   Select from RxNorm database
│ Selection    │   → Search by brand/generic name
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Dosage &     │   Dose, route, frequency, duration
│ Instructions │   → SIG (human-readable) auto-generated
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Interaction  │   Drug-drug, drug-allergy check
│ Check        │   → Alerts displayed to provider
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Formulary    │   Insurance formulary check
│ Check        │   → Alternative suggestions if needed
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Electronic   │   Transmit to pharmacy
│ Transmission │   → Surescripts / Direct messaging
│              │   → Status tracking
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ Refill       │   Auto-refill processing
│ Management   │   → Patient request → Provider approval
└──────────────┘
```

## Workflow Configuration

Each workflow supports:

- **Configurable steps** — Enable/disable based on organizational policy
- **Role-based step access** — Different roles see different workflow steps
- **Timeout handling** — Incomplete workflows flag after configured period
- **Override procedures** — Emergency bypass with audit notification
- **Template support** — Saved workflow configurations by specialty/clinic

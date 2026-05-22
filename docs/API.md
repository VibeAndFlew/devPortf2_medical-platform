# MEDICA API Reference

> Internal, FHIR, and third-party API documentation.

## API Overview

MEDICA exposes three API surfaces:

| API | Base Path | Auth | Audience |
|-----|-----------|------|----------|
| **Internal (BFF)** | `/api/*` | Session cookie + JWT | Web application |
| **FHIR R4** | `/fhir/*` | OAuth 2.0 / JWT | Third-party integrations |
| **Admin** | `/api/admin/*` | API key + JWT | System administrators |

## Authentication

### Internal API

- JWT tokens via HTTP-only cookies
- CSRF protection via SameSite=Strict cookies
- Token refresh handled transparently

### FHIR API

- OAuth 2.0 (SMART on FHIR compatible)
- Bearer token in Authorization header
- Token introspection for validation

## Rate Limiting

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Public endpoints | 100 requests | 1 minute |
| Authenticated API | 1,000 requests | 1 minute |
| FHIR bulk data | 10 requests | 1 minute |

## Error Responses

All errors follow a consistent format:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Patient with ID 12345 not found",
    "details": {
      "resourceType": "Patient",
      "resourceId": "12345"
    },
    "requestId": "req_abc123"
  }
}
```

## Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Items per page (default: 20, max: 100) |
| `sort` | string | Sort field (prefixed with `-` for desc) |
| `search` | string | Full-text search query |
| `fields` | string | Comma-separated field list |

## Internal API Endpoints

### Patients

```
GET    /api/patients            — List patients
GET    /api/patients/:id        — Get patient
POST   /api/patients            — Create patient
PUT    /api/patients/:id        — Update patient
DELETE /api/patients/:id        — Soft delete patient
```

### Appointments

```
GET    /api/appointments        — List appointments
POST   /api/appointments        — Create appointment
PUT    /api/appointments/:id    — Update appointment
DELETE /api/appointments/:id    — Cancel appointment
```

### Telemedicine

```
POST   /api/telemedicine/room   — Create room
POST   /api/telemedicine/start  — Start session
POST   /api/telemedicine/end    — End session
```

### Records

```
GET    /api/records/:patientId  — Get patient records
POST   /api/records/:patientId  — Add record
```

### Prescriptions

```
GET    /api/prescriptions       — List prescriptions
POST   /api/prescriptions       — Create prescription
PUT    /api/prescriptions/:id   — Update prescription
```

### Messaging

```
GET    /api/messages            — List conversations
POST   /api/messages            — Send message
```

## FHIR Endpoints

```
GET    /fhir/Patient
GET    /fhir/Patient/:id
GET    /fhir/Encounter
GET    /fhir/Observation
GET    /fhir/MedicationRequest
GET    /fhir/Coverage
```

All FHIR endpoints support `_search`, `_include`, and `_revinclude` parameters per specification.

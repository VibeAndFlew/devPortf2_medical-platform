# Monitoring & Observability

> Clinical system monitoring, alerting, and observability infrastructure.

## Monitoring Architecture

```
┌──────────────────────────────────────────────┐
│              Application Layer                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Health   │ │ Metrics  │ │ Structured   │ │
│  │ Checks   │ │ (Prom.)  │ │ Logging      │ │
│  └────┬─────┘ └────┬─────┘ └──────┬───────┘ │
└───────┼────────────┼───────────────┼──────────┘
        │            │               │
┌───────┼────────────┼───────────────┼──────────┐
│       │            │               │          │
│  ┌────┴────┐ ┌─────┴─────┐ ┌──────┴──────┐  │
│  │ Sentry  │ │ OpenTele- │ │ CloudWatch  │  │
│  │ (errors)│ │ metry     │ │ (logs)      │  │
│  └─────────┘ │ Collector │ └─────────────┘  │
│              └─────┬─────┘                   │
│                    │                         │
│  ┌─────────────────┴────────────────────┐    │
│  │            Grafana                    │    │
│  │   Dashboards · Alerts · Tracing      │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

## Health Check Endpoint

```
GET /api/health

Response:
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 3600,
  "dependencies": {
    "database": { "status": "healthy", "latency_ms": 5 },
    "redis": { "status": "healthy", "latency_ms": 2 },
    "storage": { "status": "healthy", "latency_ms": 15 }
  }
}
```

## Key Metrics

### Application Metrics
- HTTP request rate, duration, error rate (by endpoint)
- Active user sessions
- Server component render duration
- API response time (p50, p95, p99)

### Clinical Metrics
- Appointments created/hour
- Telemedicine session duration
- Prescriptions transmitted
- Patient records accessed

### Infrastructure Metrics
- Memory, CPU, disk usage
- Database connection pool utilization
- Cache hit ratio
- TLS certificate expiry

## Alerting Rules

| Alert | Condition | Severity | Response Time |
|-------|-----------|----------|--------------|
| API Error Rate > 1% | 5-min average | Critical | 5 min |
| P95 Latency > 1s | 5-min average | Warning | 15 min |
| Database Connectivity | Connection failure | Critical | Immediate |
| Disk Usage > 80% | Current value | Warning | 1 hour |
| TLS Expiry < 30 days | Days remaining | Warning | 1 week |
| PHI Access Spike | > 3σ from baseline | Critical | Immediate |

## Logging Standards

```json
{
  "timestamp": "2026-05-22T10:30:00.123Z",
  "level": "info",
  "service": "medica-healthcare",
  "correlation_id": "corr_abc123",
  "request_id": "req_xyz789",
  "message": "Patient record accessed",
  "details": {
    "action": "view",
    "resource": "patient",
    "resource_id": "pt_001",
    "user_id": "usr_042",
    "duration_ms": 45
  }
}
```

### Log Levels
- **ERROR** — System failures, data corruption, security events
- **WARN** — Degraded performance, retry attempts, threshold warnings
- **INFO** — PHI access, state changes, API calls
- **DEBUG** — Detailed operational data (disabled in production)

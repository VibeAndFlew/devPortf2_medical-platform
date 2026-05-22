# Contributing to MEDICA Healthcare Portal

> First, thank you for considering contributing to MEDICA. Healthcare technology impacts lives, and every contribution matters.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Commit Conventions](#commit-conventions)
- [Documentation](#documentation)
- [Security](#security)
- [Questions?](#questions)

---

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@medica-health.com.

**Our pledge:** Foster an open, welcoming, diverse, inclusive, and healthy community where everyone can contribute to improving healthcare technology.

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git** >= 2.40
- **PostgreSQL** >= 15 (or Docker)
- **Redis** >= 7 (optional, for session caching)

### Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/healthcare-portal.git
cd medica-healthcare

# Add upstream remote
git remote add upstream https://github.com/medica/healthcare-portal.git

# Install dependencies
npm install --legacy-peer-deps

# Copy environment file
cp .env.example .env.local

# Start development
npm run dev
```

---

## Development Workflow

### Branch Strategy

```
main ─── production-ready, protected
  └── develop ─── integration branch
       ├── feat/patient-search
       ├── fix/appointment-timezone
       ├── docs/api-fhir
       └── chore/deps-update
```

- `main` — Production releases only. Protected, no direct commits.
- `develop` — Integration branch for features and fixes.
- `feat/<name>` — New features. Branch from `develop`.
- `fix/<name>` — Bug fixes. Branch from `develop`.
- `docs/<name>` — Documentation changes. Branch from `develop`.
- `chore/<name>` — Maintenance, dependencies, config. Branch from `develop`.

### Workflow

```bash
# Sync develop
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feat/amazing-feature

# Make changes, commit, push
git add .
git commit -m "feat: add amazing feature"
git push origin feat/amazing-feature

# Open pull request → develop
```

---

## Coding Standards

### TypeScript & React

- **Strict TypeScript** — No `any`, no `@ts-ignore`, no `as` casts unless unavoidable
- **Server Components first** — Only use `"use client"` when interactivity is required
- **Zod schemas** — Every data model needs a runtime validation schema
- **Named exports** — Prefer named exports over default exports
- **Functional components** — Always functional, never class components
- **Hooks** — Custom hooks for reusable stateful logic

### Component Structure

```typescript
// Good: Props typed, ref forwarded, cn utility
interface PatientCardProps {
  patient: Patient;
  variant?: "compact" | "detailed";
  onSelect?: (id: string) => void;
}

function PatientCard({ patient, variant = "compact", onSelect }: PatientCardProps) {
  // ... implementation
}
```

### Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `PatientCard`, `AppointmentCalendar` |
| Hooks | camelCase, `use` prefix | `usePatients`, `useAuth` |
| Utilities | camelCase | `formatDate`, `cn` |
| Types/Interfaces | PascalCase | `PatientRecord`, `AppointmentStatus` |
| Files | kebab-case | `patient-card.tsx`, `api-client.ts` |
| Constants | UPPER_SNAKE_CASE | `SESSION_TTL`, `MAX_FILE_SIZE` |
| CSS classes | kebab-case | `patient-card`, `btn-primary` |

### File Organization

```
src/
  components/
    patients/
      patient-card.tsx       # Component file
      patient-card.test.tsx  # Tests co-located
      patient-card.stories.tsx # Storybook stories
    ui/
      button.tsx
```

### CSS Guidelines

- **Tailwind CSS utility classes** preferred for all styling
- **Custom CSS** only for complex animations or component-specific overrides
- **No CSS modules** — Tailwind + inline styles for dynamic values
- **Responsive** — Mobile-first approach with Tailwind breakpoints

### Performance Rules

1. **No `useEffect` for data fetching** — Use Server Components or React Query
2. **Minimize `"use client"`** — Only when absolutely needed (interactivity, browser APIs)
3. **Lazy load** — `dynamic(() => import(...))` for heavy components
4. **Optimize images** — Use `next/image` with explicit width/height
5. **Memoization** — `useMemo`/`useCallback` only for expensive computations

---

## Testing

### Philosophy

- **Test behavior, not implementation**
- **Every component has a story** — Loading, empty, error, edge cases
- **Tests live next to their source** — Co-located for discoverability

### Test Types

| Type | Tool | Location |
|------|------|----------|
| Unit tests | Vitest | Co-located with source |
| Component tests | Testing Library | `*.test.tsx` |
| Integration tests | Playwright | `e2e/` |
| Accessibility tests | axe-core | Component tests |
| API tests | Vitest + MSW | `src/lib/api/__tests__/` |

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npx playwright test
```

### Writing Tests

```typescript
import { render, screen } from "@testing-library/react";
import { PatientCard } from "./patient-card";

const mockPatient = {
  id: "1",
  name: "Jane Doe",
  mrn: "MRN-001",
  dateOfBirth: "1990-01-15",
};

describe("PatientCard", () => {
  it("renders patient name and MRN", () => {
    render(<PatientCard patient={mockPatient} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("MRN-001")).toBeInTheDocument();
  });

  it("renders compact variant by default", () => {
    const { container } = render(<PatientCard patient={mockPatient} />);
    expect(container.firstChild).toHaveClass("compact");
  });

  it("renders detailed variant when specified", () => {
    render(<PatientCard patient={mockPatient} variant="detailed" />);
    expect(screen.getByText("01/15/1990")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(<PatientCard patient={mockPatient} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith("1");
  });
});
```

---

## Pull Request Process

### Before Submitting

1. **Sync with `develop`** — Rebase or merge latest changes
2. **Run all checks** — `npm run lint`, `npm run typecheck`, `npm test`
3. **Self-review** — Check your diff for unnecessary changes, debug code, TODOs
4. **Update docs** — If your change affects API, components, or architecture
5. **Add tests** — New features and bug fixes need test coverage

### PR Title Convention

```
<type>: <description>

feat: add FHIR patient search endpoint
fix: correct appointment timezone conversion
docs: update API documentation
chore: upgrade next.js to 16.2.6
refactor: extract patient validation logic
test: add appointment service unit tests
```

### PR Description Template

```markdown
## Description
Brief description of changes.

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Dependencies

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass

## Screenshots (if applicable)
```

### Review Process

1. **Automatic checks** — CI must pass (lint, typecheck, test)
2. **At least one approval** from a maintainer
3. **No merge conflicts** with target branch
4. **Squash merge** into `develop` (clean history)
5. **Branch deleted** after merge

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes nor adds |
| `test` | Adding or updating tests |
| `chore` | Build, deps, config |
| `perf` | Performance improvement |
| `security` | Security fix |

### Examples

```
feat(patients): add FHIR R4 patient search endpoint
fix(appointments): correct timezone offset calculation
docs(api): document telemedicine session endpoints
chore(deps): update next.js to 16.2.6
security(auth): rotate session signing keys
```

---

## Documentation

### When to Document

- New components, hooks, or utilities
- API endpoint changes
- Configuration or environment variable changes
- Architecture decisions (why, not just what)
- Breaking changes (with migration guide)

### Where to Document

| Content | Location |
|---------|----------|
| Component API | JSDoc above component |
| Architecture decisions | `docs/ARCHITECTURE.md` |
| Design system | `docs/DESIGN_SYSTEM.md` |
| Security | `docs/SECURITY.md` |
| API reference | `docs/api/` |
| Runbook | `docs/runbook/` |
| Changelog | `docs/CHANGELOG.md` |

---

## Security

See [SECURITY.md](SECURITY.md) for full details.

**Key points for contributors:**

- Never commit secrets, keys, or credentials
- Never log PHI or PII
- Always use parameterized queries (never string interpolation)
- Always validate input with Zod schemas
- Always use `cn()` utility for className merging
- Report security vulnerabilities via email, not GitHub issues

---

## Questions?

- **GitHub Discussions:** [github.com/medica/healthcare-portal/discussions](https://github.com/medica/healthcare-portal/discussions)
- **Community Slack:** Join our healthcare dev community (link in repo)
- **Office Hours:** Every other Friday, 2pm EST — schedule via Discussions

---

<p align="center">
  <sub>Made with ❤️ by the MEDICA team and contributors worldwide.</sub>
</p>

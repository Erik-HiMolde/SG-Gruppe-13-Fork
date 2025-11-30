# Test Design: Epic 1 - Foundational End-to-End Chat

**Date:** mandag 24. november 2025
**Author:** BIP
**Status:** Draft / Approved

---

## Executive Summary

**Scope:** full test design for Epic 1

**Risk Summary:**

- Total risks identified: 6
- High-priority risks (≥6): 4
- Critical categories: OPS, TECH, PERF, BUS

**Coverage Summary:**

- P0 scenarios: 5 (10 hours)
- P1 scenarios: 2 (2 hours)
- P2/P3 scenarios: 1 (0.5 hours)
- **Total effort**: 12.5 hours (~1.5 days)

---

## Risk Assessment

### High-Priority Risks (Score ≥6)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner | Timeline |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ---------- | ----- | -------- |
| R-E1.1-001 | OPS | Deployment/Connectivity Failure | 2 | 3 | 6 | Automated CI/CD pipeline health checks, clear deployment logs | QA/DevOps | Sprint 1 |
| R-E1.3-001 | TECH | Gemini API Integration Failure | 2 | 3 | 6 | Unit/Integration tests for API client, clear error handling | Dev | Sprint 1 |
| R-E1.3-002 | PERF | AI Response Latency | 2 | 3 | 6 | Performance testing for API endpoint, implement loading indicators | QA/Dev | Sprint 1 |
| R-E1.3-003 | BUS | Incorrect/Irrelevant AI Response | 3 | 3 | 9 | Implement knowledge base grounding (Epic 2), prompt engineering, human review process | Product/Dev/QA | Ongoing |

### Medium-Priority Risks (Score 3-4)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ---------- | ----- |
| R-E1.1-002 | TECH | Database Integration Issues | 2 | 2 | 4 | Connection tests in CI, clear error messages if connection fails | Dev |
| R-E1.2-001 | BUS | UI/UX Unresponsiveness | 2 | 2 | 4 | Component tests for UI elements, E2E test for basic interaction | Dev/QA |

### Low-Priority Risks (Score 1-2)

| Risk ID | Category | Description | Probability | Impact | Score | Action |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ------ |
| R-005   | OPS      | {description} | 1           | 2      | 2     | Monitor |
| R-006   | BUS      | {description} | 1           | 1      | 1     | Monitor |

### Risk Category Legend

- **TECH**: Technical/Architecture (flaws, integration, scalability)
- **SEC**: Security (access controls, auth, data exposure)
- **PERF**: Performance (SLA violations, degradation, resource limits)
- **DATA**: Data Integrity (loss, corruption, inconsistency)
- **BUS**: Business Impact (UX harm, logic errors, revenue)
- **OPS**: Operations (deployment, config, monitoring)

---

## Test Coverage Plan

### P0 (Critical) - Run on every commit

**Criteria**: Blocks core journey + High risk (≥6) + No workaround

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| AC 1.1.1: Frontend/Backend deployed | E2E | R-E1.1-001 | 1 | QA/DevOps | CI/CD pipeline status check |
| AC 1.1.2: "Hello World" visible | E2E | R-E1.1-001 | 1 | QA | Basic deployment check |
| AC 1.3.1: Send question, receive AI response | E2E | R-E1.3-001, R-E1.3-003 | 1 | QA | Core chatbot functionality |
| AC 1.3.2: AI response within 5 seconds | Perf (E2E/API) | R-E1.3-002 | 1 | QA | Latency check for core AI interaction |
| AC 1.3.1: Backend calls Gemini API successfully | Integration | R-E1.3-001 | 1 | Dev | Backend API client test |

**Total P0**: 5 tests, 10 hours

### P1 (High) - Run on PR to main

**Criteria**: Important features + Medium risk (3-4) + Common workflows

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| AC 1.1.3: Backend connects to Supabase | Integration | R-E1.1-002 | 1 | Dev | Database connection test |
| AC 1.2.1: Chat input + static response | E2E | R-E1.2-001 | 1 | QA | Basic UI interaction |

**Total P1**: 2 tests, 2 hours

### P2 (Medium) - Run nightly/weekly

**Criteria**: Secondary features + Low risk (1-2) + Edge cases

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| AC 1.2.1: Chat input field interactive | Component | - | 1 | Dev | UI element functionality |

**Total P2**: 1 tests, 0.5 hours

### P3 (Low) - Run on-demand

**Criteria**: Nice-to-have + Exploratory + Performance benchmarks

| Requirement   | Test Level | Test Count | Owner | Notes   |
| ------------- | ---------- | ---------- | ----- | ------- |
| {requirement} | E2E        | 2          | QA    | {notes} |
| {requirement} | Unit       | 8          | DEV   | {notes} |

**Total P3**: 0 tests, 0 hours

---

## Execution Order

### Smoke Tests (<5 min)

**Purpose**: Fast feedback, catch build-breaking issues

- [X] AC 1.1.1: Successful deployment of frontend and backend (E2E)
- [X] AC 1.1.2: User navigates to root URL and sees "Hello World" (E2E)
- [X] AC 1.3.1: User sends question and receives AI-generated response (E2E)
- [X] AC 1.3.2: AI response displayed within 5 seconds (Perf/E2E)

**Total**: 4 scenarios

### P0 Tests (<10 min)

**Purpose**: Critical path validation

- [X] AC 1.1.1: Successful deployment of frontend and backend (E2E)
- [X] AC 1.1.2: User navigates to root URL and sees "Hello World" (E2E)
- [X] AC 1.3.1: User sends question and receives AI-generated response (E2E)
- [X] AC 1.3.2: AI response displayed within 5 seconds (Perf/E2E)
- [X] AC 1.3.1: Backend calls Gemini API successfully (Integration)

**Total**: 5 scenarios

### P1 Tests (<30 min)

**Purpose**: Important feature coverage

- [X] AC 1.1.3: Backend connects to Supabase (Integration)
- [X] AC 1.2.1: Chat input + static response (E2E)

**Total**: 2 scenarios

### P2/P3 Tests (<60 min)

**Purpose**: Full regression coverage

- [X] AC 1.2.1: Chat input field interactive (Component)

**Total**: 1 scenarios

---

## Resource Estimates

### Test Development Effort

| Priority | Count | Hours/Test | Total Hours | Notes |
| -------- | ----- | ---------- | ----------- | ------- |
| P0 | 5 | 2.0 | 10 | Complex setup, security |
| P1 | 2 | 1.0 | 2 | Standard coverage |
| P2 | 1 | 0.5 | 0.5 | Simple scenarios |
| P3 | 0 | 0.25 | 0 | Exploratory |
| **Total** | **8** | **-** | **12.5** | **~1.5 days** |

### Prerequisites

**Test Data:**

- Static test prompts and expected (mocked) AI responses for Story 1.3.
- Test user credentials for deployment checks.
- Clean database state for integration tests.

**Tooling:**

- Playwright (E2E, Component, API/Integration)
- Vitest (Unit)
- k6 (Performance)
- CI/CD platform (GitHub Actions)

**Environment:**

- Deployed frontend and backend for E2E tests.
- Local development environment for Unit/Component/Integration tests.
- Mocking infrastructure for Gemini and Supabase during certain integration tests.

---

## Quality Gate Criteria

### Pass/Fail Thresholds

- **P0 pass rate**: 100% (no exceptions)
- **P1 pass rate**: ≥95% (waivers required for failures)
- **P2/P3 pass rate**: ≥90% (informational)
- **High-risk mitigations**: 100% complete or approved waivers

### Coverage Targets

- **Critical paths**: ≥80%
- **Security scenarios**: 100% (none directly in Epic 1, but foundational for Epic 4)
- **Business logic**: ≥70%
- **Edge cases**: ≥50%

### Non-Negotiable Requirements

- [X] All P0 tests pass
- [X] No high-risk (≥6) items unmitigated (R-E1.3-003 is highest, mitigation strategy defined)
- [ ] Security tests (SEC category) pass 100% (No explicit SEC tests in Epic 1)
- [X] Performance targets met (PERF category) (AC 1.3.2)

---

## Mitigation Plans

### R-E1.1-001: Deployment/Connectivity Failure (Score: 6)

**Mitigation Strategy:** Implement automated CI/CD pipeline health checks to verify successful deployment and connectivity between frontend and backend. Ensure deployment logs are clear and easily accessible for quick troubleshooting.
**Owner:** QA/DevOps
**Timeline:** Sprint 1
**Status:** Planned
**Verification:** Successful execution of deployment health checks in CI.

### R-E1.3-001: Gemini API Integration Failure (Score: 6)

**Mitigation Strategy:** Develop comprehensive Unit and Integration tests for the backend API client that interacts with Google Gemini. Ensure robust error handling and logging for API calls to identify and diagnose integration failures quickly.
**Owner:** Dev
**Timeline:** Sprint 1
**Status:** Planned
**Verification:** All Gemini API client tests pass, error handling logs correct issues.

### R-E1.3-002: AI Response Latency (Score: 6)

**Mitigation Strategy:** Incorporate performance testing for the chat API endpoint, specifically measuring the round-trip time to Google Gemini. Implement loading indicators in the UI to manage user expectations during AI processing. Explore options for streaming AI responses if available to improve perceived performance.
**Owner:** QA/Dev
**Timeline:** Sprint 1
**Status:** Planned
**Verification:** Performance tests show chat response within 5 seconds, UI displays loading states.

### R-E1.3-003: Incorrect/Irrelevant AI Response (Score: 9)

**Mitigation Strategy:** This is a critical risk. While Epic 1 focuses on initial integration, the primary mitigation strategy relies heavily on Epic 2's knowledge base grounding. For Epic 1, implement basic prompt engineering to guide Gemini's responses. Establish a preliminary human review process for early AI responses to catch critical issues.
**Owner:** Product/Dev/QA
**Timeline:** Ongoing (initial actions in Sprint 1)
**Status:** Planned
**Verification:** Human review identifies and addresses inappropriate responses; Epic 2 implementation will provide further automated grounding.

---

## Assumptions and Dependencies

### Assumptions

1.  Google Gemini API will provide stable and performant responses for initial integration.
2.  Supabase provisioning and access will be straightforward.
3.  Vercel deployment for React/Node.js serverless functions will be reliable.

### Dependencies

1.  Working Google Gemini API key for development and testing. - Required by Start of Sprint 1
2.  Supabase project setup and credentials. - Required by Start of Sprint 1

### Risks to Plan

- **Risk**: Unforeseen complexities in Vercel/Supabase/Gemini integration.
  - **Impact**: Delays in establishing foundational infrastructure, pushing back Epic 1 completion.
  - **Contingency**: Allocate buffer time in Sprint 1 for initial setup; prioritize rapid prototyping and early integration testing.

---

## Approval

**Test Design Approved By:**

- [ ] Product Manager: {name} Date: {date}
- [ ] Tech Lead: {name} Date: {date}
- [ ] QA Lead: {name} Date: {date}

**Comments:**

---

---

---

## Appendix

### Knowledge Base References

- `risk-governance.md` - Risk classification framework
- `probability-impact.md` - Risk scoring methodology
- `test-levels-framework.md` - Test level selection
- `test-priorities-matrix.md` - P0-P3 prioritization

### Related Documents

- PRD: docs/fase-2-plan/PRD.md
- Epic: docs/fase-2-plan/epics.md
- Architecture: docs/architecture.md
- Tech Spec:

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `.bmad/bmm/workflows/testarch/test-design`
**Version**: 4.0 (BMad v6)
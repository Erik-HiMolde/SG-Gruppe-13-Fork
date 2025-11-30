# System-Level Test Design: Sentiabot

**Date:** mandag 24. november 2025
**Author:** BIP
**Status:** Draft

---

## Executive Summary

**Scope:** System-level test design and testability review for the Sentiabot application.

**Testability Assessment:**

- **Controllability:** PASS
- **Observability:** CONCERNS (due to MVP console logging)
- **Reliability:** PASS

**Key Testability Concerns Identified:**

1.  **Observability Maturity:** MVP's basic console logging might hinder deep NFR validation.
2.  **AI Response Quality:** Subjectivity and complexity of validating AI output for relevance, age-appropriateness, and pedagogical quality.
3.  **Multilingual Testing:** Increased complexity for test data and AI response validation across Norwegian and English.

---

## Testability Assessment

- **Controllability:** PASS
    - The chosen technologies (React, Node.js, Supabase, Gemini API) support clear separation of concerns, enabling effective mocking of external dependencies (Gemini, Supabase) and direct API-based data seeding for testing. Test users can be created for authentication flows.

- **Observability:** CONCERNS
    - While the architecture supports future integration of robust logging and monitoring, the MVP plan for "Console logging" may limit the depth of NFR validation. Lack of structured logging, metrics, and tracing beyond the console could make diagnosing complex distributed issues challenging.

- **Reliability:** PASS
    - The architectural choices promote loosely coupled components (Frontend/Backend split, REST API), which inherently supports test isolation. The emphasis on avoiding non-deterministic elements and providing specific guidance on test cleanup (from `test-quality.md` fragment) ensures test reproducibility and parallel execution safety.

---

## Architecturally Significant Requirements (ASRs)

The following ASRs are critical and significantly influence the testing strategy:

1.  **AI Response Quality & Knowledge Base Adherence (FR003, FR007):** Ensure AI responses are accurate, relevant, age-appropriate, and strictly grounded in the `pgvector` knowledge base to prevent hallucinations.
    *   **Impact:** Critical to educational value and trustworthiness.
    *   **Testability:** High complexity due to subjective nature of AI output and need for content validation.

2.  **Secure Admin Functionality (FR010, FR011):** Guarantee secure access and robust CRUD operations for knowledge base management and system prompt modification via Supabase Auth.
    *   **Impact:** Critical for data integrity, system configuration, and preventing unauthorized access.
    *   **Testability:** Requires thorough security testing for authentication, authorization, and data integrity.

3.  **Chatbot Response Time (Performance Metric 5):** Achieve sub-10-second response times for typical user queries, involving interaction with Google Gemini and `pgvector` retrieval.
    *   **Impact:** Direct impact on user experience and usability.
    *   **Testability:** Requires specialized performance testing (load, stress) for API endpoints and integrated services.

4.  **Multilingual Support (FR008):** Provide accurate and fluent responses in both Norwegian and English.
    *   **Impact:** Broadens user base and ensures accessibility.
    *   **Testability:** Adds complexity for language-specific data, localization, and AI response quality validation.

---

## Test Levels Strategy

Based on the Sentiabot architecture and the `test-levels-framework.md` fragment, a balanced approach is recommended:

-   **Unit Tests (Vitest):**
    -   **Focus:** Pure functions, business logic (e.g., `calculateDiscount`, data formatting), utility functions, isolated React hook logic.
    -   **Rationale:** Provides fast feedback for core logic, isolates defects early. High coverage (80%+) for critical code paths.

-   **Component Tests (Playwright Component Testing / Cypress Component Testing):**
    -   **Focus:** Isolated UI component behavior, rendering with different props, user interactions within single components (e.g., `GradeSelector`, `ChatWindow`), visual regression for key UI elements.
    -   **Rationale:** Ensures UI elements function correctly and consistently, faster than E2E for UI changes.

-   **Integration Tests (Playwright API / Backend Framework):**
    -   **Focus:** Backend API endpoint contracts (`POST /api/chat`, admin CRUD), service-to-service communication (Backend ↔ Gemini, Backend ↔ Supabase), database operations (Supabase `pgvector` search, admin data persistence), authentication flows.
    -   **Rationale:** Verifies interactions between backend components and external services without UI overhead, crucial for data flow and system behavior.

-   **End-to-End (E2E) Tests (Playwright):**
    -   **Focus:** Critical user journeys (student chat, admin knowledge base update), cross-system workflows (full stack integration), security-critical paths (admin login), overall application health.
    -   **Rationale:** Highest confidence in system functionality from a user perspective, validates the complete deployed system. Focus on critical happy paths and key error scenarios.

---

## NFR Testing Approach

Integrating NFR validation into the pipeline, as guided by `nfr-criteria.md`:

-   **Security Testing:**
    -   **Tooling:** Playwright E2E tests (auth/authz for admin, OWASP Top 10 checks), npm audit (dependency scanning).
    -   **Focus:** Admin login and access control, data protection, input validation (SQLi, XSS), secure configuration of Supabase.
    -   **Gate Criteria:** 100% pass rate for security tests, no critical/high vulnerabilities from scans.

-   **Performance Testing:**
    -   **Tooling:** k6 (load, stress, spike testing), potentially Playwright for Core Web Vitals.
    -   **Focus:** `POST /api/chat` response time, `pgvector` search performance under load, overall API latency.
    -   **Gate Criteria:** Chatbot response time p95 < 10s under expected load, error rate < 1%, no significant resource exhaustion.

-   **Reliability Testing:**
    -   **Tooling:** Playwright E2E/API tests (mocking external services for failure simulation).
    -   **Focus:** Graceful degradation on Gemini/Supabase API failures (500s, network issues), user-friendly error messages, retry mechanisms (if implemented), health check endpoint (`/api/health`).
    -   **Gate Criteria:** Application remains functional and provides clear feedback during simulated service outages.

-   **Maintainability Testing:**
    -   **Tooling:** CI/CD pipelines (GitHub Actions), Vitest coverage reports, jscpd (code duplication), Playwright (for observability validation).
    -   **Focus:** Code coverage (>80%), code duplication (<5%), absence of critical vulnerabilities, functional error reporting (e.g., Sentry integration), structured logging (via headers/telemetry).
    -   **Gate Criteria:** Adherence to code quality metrics, effective observability for issue diagnosis.

---

## Testability Concerns

1.  **Observability Maturity (MVP Console Logging):**
    *   **Concern:** The current MVP's "Console logging" will be insufficient for effectively validating NFRs (performance, reliability) and diagnosing complex issues in a distributed system (Frontend ↔ Backend ↔ Gemini ↔ Supabase). Critical errors or performance bottlenecks may be missed.
    *   **Recommendation:** Post-MVP, prioritize integrating a centralized structured logging solution (e.g., Elastic Stack, CloudWatch Logs) and an Application Performance Monitoring (APM) tool (e.g., Sentry, Datadog) to provide necessary telemetry for robust NFR validation and operational insights.

2.  **AI Response Quality Validation:**
    *   **Concern:** Validating the subjective quality of AI responses (e.g., relevance, age-appropriateness for elementary students, conciseness) is challenging to automate fully. There's a risk of "silent failures" where AI generates technically correct but unsuitable content.
    *   **Recommendation:** Implement a human-in-the-loop review process for AI-generated responses (e.g., content experts, target users) alongside automated checks that verify grounding in the `pgvector` knowledge base. Investigate prompt engineering testing techniques.

3.  **Multilingual Testing Complexity (Norwegian/English):**
    *   **Concern:** Supporting two languages (Norwegian and English) significantly increases the test matrix for data setup, UI localization, and AI response quality/relevance validation.
    *   **Recommendation:** Ensure test data is available in both languages. Implement automated checks for language consistency and consider using linguistic testing tools or services for quality assurance on AI translations and localized content.

---

## Recommendations for Sprint 0

To establish a strong quality foundation for Sentiabot, the following actions are recommended for Sprint 0:

1.  **Framework Setup (Leverage `*framework` workflow):**
    *   Initialize a production-ready test framework for Unit (Vitest), Component (Playwright CT), Integration (Playwright API), and E2E (Playwright) tests.
    *   Integrate test data factories (`faker`) and API seeding strategies for isolated and parallel-safe testing.

2.  **CI/CD Pipeline Scaffold (Leverage `*ci` workflow):**
    *   Set up a basic CI pipeline (GitHub Actions) to run Unit tests on every commit.
    *   Include initial steps for code quality checks (linting, basic coverage reporting).

3.  **Basic Observability Implementation:**
    *   Start planning for structured logging beyond console output, even if initial implementation is minimal. Focus on critical error logging and context.

4.  **Proof-of-Concept for AI Response Validation:**
    *   Develop a small PoC for automatically checking if AI responses are grounded in the knowledge base, potentially using vector similarity or keyword extraction.

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `.bmad/bmm/workflows/testarch/test-design`
**Version**: 4.0 (BMad v6)

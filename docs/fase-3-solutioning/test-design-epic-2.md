# Epic 2: Knowledge-Driven, Contextual Chat - Test Design

## Epic Goal

Enhance the chatbot by connecting it to a dedicated knowledge base and allowing users to specify their context, ensuring answers are relevant and accurate.

## Risk Assessment for Epic 2

| Risk ID | Category | Description | Probability | Impact | Score | Priority | Mitigation / Test Approach |
| :------ | :------- | :---------- | :---------- | :----- | :---- | :------- | :------------------------- |
| R-TD-001 | BUS, DATA | Inaccurate/irrelevant AI responses from knowledge base (hallucinations). | 3 | 3 | 9 | P0 | Implement robust prompt engineering, AI response grounding (RAG with `pgvector`), and extensive integration/E2E testing with a diverse set of curriculum-relevant questions and expected answers. Automated content validation rules. |
| R-TD-002 | BUS | Incorrect context application (subject category, grade level) by AI. | 2 | 2 | 4 | P2 | Dedicated integration and E2E tests to verify AI responses are tailored to selected subject category and grade level. Careful prompt engineering. |
| R-TD-003 | PERF, TECH | `pgvector` database search performance degrades with growing knowledge base. | 2 | 2 | 4 | P2 | Performance testing with `k6` specifically targeting `pgvector` search endpoint. Monitor query times and optimize indexing/configuration. |
| R-TD-004 | DATA, OPS | Knowledge base data ingestion/update issues leading to stale/missing information. | 1 | 2 | 2 | P3 | Basic integration tests for Supabase CRUD operations on the knowledge base. Monitoring of data sync processes. |

---

## Test Coverage Design

### Story 2.1: Use dedicated knowledge base

**Goal:** As a student, I want the chatbot to use a dedicated knowledge base for its answers, so that I receive trustworthy information instead of made-up answers.

| Scenario ID | Description | Test Level | Priority | Risk Link |
| :---------- | :---------- | :--------- | :------- | :-------- |
| S2.1-INT-001 | Verify vector database is accessible and contains sample data. | Integration | P0 | R-TD-001 |
| S2.1-E2E-001 | User asks a question directly related to knowledge base content, and AI responds grounded in that content. | E2E | P0 | R-TD-001 |
| S2.1-E2E-002 | User asks a question unrelated to knowledge base content, and AI responds appropriately (e.g., "I don't know" or redirects). | E2E | P0 | R-TD-001 |
| S2.1-INT-002 | Backend API call successfully triggers `pgvector` search with relevant query. | Integration | P0 | R-TD-001, R-TD-003 |
| S2.1-INT-003 | AI's generated response (from mocked Gemini) for a given prompt (including KB context) is as expected. | Integration | P0 | R-TD-001 |
| S2.1-INT-004 | Verify knowledge base can be populated and updated via API (admin functionality). | Integration | P3 | R-TD-004 |

### Story 2.2: Choose subject category

**Goal:** As a student, I want to choose a subject category before chatting, so that the answers I get are more relevant to what I'm studying.

| Scenario ID | Description | Test Level | Priority | Risk Link |
| :---------- | :---------- | :--------- | :------- | :-------- |
| S2.2-E2E-001 | Subject category options ("Biology", "Geology") are visible on the home page. | E2E | P2 | R-TD-002 |
| S2.2-E2E-002 | Selecting a subject category correctly updates the application state/user preferences. | E2E | P2 | R-TD-002 |
| S2.2-INT-001 | Backend API call receives the selected subject category as part of the AI request context. | Integration | P2 | R-TD-002 |
| S2.2-E2E-003 | AI response is noticeably tailored and relevant to the selected "Biology" category. | E2E | P2 | R-TD-002 |
| S2.2-E2E-004 | AI response is noticeably tailored and relevant to the selected "Geology" category. | E2E | P2 | R-TD-002 |

### Story 2.3: Select grade level

**Goal:** As a student, I want to select my grade level, so the chatbot can use language that is easy for me to understand.

| Scenario ID | Description | Test Level | Priority | Risk Link |
| :---------- | :---------- | :--------- | :------- | :-------- |
| S2.3-E2E-001 | Grade level options (e.g., 1-6) are visible on the home page. | E2E | P2 | R-TD-002 |
| S2.3-E2E-002 | Selecting a grade level correctly updates the application state/user preferences. | E2E | P2 | R-TD-002 |
| S2.3-INT-001 | Backend API call receives the selected grade level as part of the AI request context. | Integration | P2 | R-TD-002 |
| S2.3-E2E-003 | AI response uses language appropriate for a selected grade (e.g., simple for Grade 1, more complex for Grade 6). | E2E | P2 | R-TD-002 |

---

## Test Execution Order

### Smoke Tests (subset of P0)

*   S2.1-E2E-001: User asks a question directly related to knowledge base content, and AI responds grounded in that content. (Basic happy path for core epic functionality)

### P0 Tests (Critical Paths - ~15-20 min)

*   All S2.1-E2E scenarios (AI grounding and behavior).
*   All S2.1-INT scenarios (DB accessibility, search, prompt construction).
    *(Focus on ensuring the AI uses the knowledge base correctly and does not hallucinate)*

### P2 Tests (Important Features - ~30-40 min)

*   All S2.2-E2E/INT scenarios (Subject Category context application).
*   All S2.3-E2E/INT scenarios (Grade Level context application).
*   `k6` performance tests for `pgvector` search and `/api/chat` endpoint.
    *(Focus on user experience and proper context handling)*

### P3 Tests (Lower Priority / Best Effort)

*   S2.1-INT-004: Verify knowledge base can be populated and updated via API (admin functionality).
    *(Basic functional check, can be run less frequently)*

---

## Test Effort Estimates

-   **P0 scenarios**: 5 tests × 3 hours = 15 hours
-   **P2 scenarios**: 9 tests × 1.5 hours = 13.5 hours
-   **P3 scenarios**: 1 test × 0.5 hour = 0.5 hours
-   **Performance Testing**: 1 test suite × 8 hours = 8 hours
-   **Total effort**: 37 hours (~5 days)

## Quality Gate Criteria

-   **All P0 tests pass (100%)**
-   **P2 tests pass rate ≥95%**
-   **No high-risk (Score ≥6) items unmitigated** (R-TD-001 must be fully addressed by passing tests)
-   **Chatbot Accuracy**: Evidence of AI responses being consistently grounded in KB content.
-   **Performance**: `pgvector` search and `/api/chat` response time within defined SLOs (e.g., under 10 seconds for 95% of requests).

---

## Output Summary

**Epic**: 2 (Knowledge-Driven, Contextual Chat)
**Scope**: Epic-level

**Risk Assessment**:

-   Total risks identified: 4
-   High-priority risks (Score ≥6): 1 (R-TD-001)
-   Categories: BUS, DATA, PERF, TECH, OPS

**Coverage Plan**:

-   P0 scenarios: 5 tests (15 hours)
-   P2 scenarios: 9 tests (13.5 hours)
-   P3 scenarios: 1 test (0.5 hours)
-   Performance Testing: 1 suite (8 hours)
-   **Total effort**: 37 hours (~5 days)

**Test Levels**:

-   Unit: Core logic (prompt generation, data parsing)
-   Integration: Backend API calls, `pgvector` interaction, AI prompt construction
-   E2E: Full user journeys for KB grounding and context application

**Quality Gate Criteria**:

-   P0 pass rate: 100%
-   P2 pass rate: ≥95%
-   High-risk mitigations: 100% (R-TD-001 addressed)
-   Chatbot Accuracy: Verified grounding
-   Performance: Within SLOs

**Output File**: `D:\Programming-With-AI\SG-Gruppe-13/docs/test-design-epic-2.md`

**Next Steps**:

1.  Review test design and risk assessment with the team.
2.  Prioritize mitigation for R-TD-001 (AI grounding) with development team.
3.  Run `atdd` workflow to generate failing tests for P0 scenarios of Epic 2.
4.  Allocate resources per effort estimates.
5.  Set up test data (sample KB documents, diverse questions).
6.  Implement mocks/stubs for Google Gemini for faster integration testing.
# Epic Technical Specification: {{epic_title}}

Date: 2025-11-30
Author: BIP
Epic ID: 1
Status: Draft

---

## Overview

Sentiabot is an AI-powered educational tool designed to provide elementary school students (ages 6-12) with safe, reliable, and easy-to-understand answers for their schoolwork, initially focusing on the science curriculum (Biology & Geology). The core experience revolves around an interactive chat with an AI chatbot, where the chat window itself is the most critical element. The goal is to create a trustworthy, engaging, and minimalist web application that makes students feel efficient, productive, and curious. The design draws inspiration from successful AI chat applications, prioritizing a simple, conversation-focused UI with effortless input, clear presentation of information sources, and consistent interactions. The application will be accessible on desktops, laptops, and tablets, minimizing UI 'chrome' to prevent distraction.

## Objectives and Scope

**Objectives:**
- To provide elementary school students (ages 6-12) with safe, reliable, and easy-to-understand answers for schoolwork.
- To initially focus on the science curriculum (Biology & Geology).
- To create a trustworthy, engaging, and minimalist web application.
- To make students feel efficient, productive, and curious.

**In-Scope:**
- Interactive chat with an AI chatbot.
- Conversation-focused UI inspired by existing successful AI chat applications.
- Effortless input mechanisms for questions.
- Clear presentation of information sources (e.g., source links).
- Consistent and predictable user interactions.
- Accessibility on desktops, laptops, and tablets.
- Minimal UI 'chrome' to prevent distraction.
- Shadcn UI as the chosen design system.
- WCAG 2.1 Level AA accessibility compliance.

**Out-of-Scope (for initial release, implicit):**
- Complex UI features beyond a minimalist chat interface.
- Support for mobile phones (explicitly stated desktops, laptops, tablets).
- Advanced customization options beyond grade level and subject selection.
- Curriculum beyond science (Biology & Geology) in the initial release.

## System Architecture Alignment

The UX design for Sentiabot aligns with a system architecture that prioritizes a modern web stack (Next.js, Tailwind CSS) by explicitly adopting **Shadcn UI**. This decision ensures that frontend development leverages a flexible, accessible, and composable component library that integrates seamlessly with Tailwind CSS. The design principles of minimalism, responsiveness, and accessibility (WCAG 2.1 Level AA) are directly supported by Shadcn UI's foundation on Radix UI primitives, facilitating precise customization and maintaining a unique, unconstrained user experience without dictating a rigid component structure. This alignment allows for efficient implementation of the conversation-focused UI and the various UX patterns defined in the specification.

## Detailed Design

### Services and Modules

The frontend application will be structured around key UI components and their underlying logic, leveraging the Shadcn UI ecosystem for standard elements and custom components for domain-specific interactions.

*   **ChatModule:** Manages the core chat interface, including rendering `ChatHistory` and `ChatBubble` components.
    *   **Responsibilities:** Orchestrates the display of conversational content, handles user input for sending messages, and integrates with the AI interaction service.
    *   **Input:** User questions, AI responses, source information.
    *   **Output:** Rendered chat bubbles, user input.
    *   **Owner (Implicit):** Frontend Development Team.

*   **AuthModule (Implicit):** Manages user authentication, particularly for the initial "Welcome / Selection Screen" where a user might confirm their identity or preferences.
    *   **Responsibilities:** Handles user login/session management (if applicable), and stores user preferences (grade level, subject).
    *   **Input:** User selections (grade, subject).
    *   **Output:** Authenticated session, user preferences.
    *   **Owner (Implicit):** Frontend/Backend Development Team.

*   **UISettingsModule (Implicit):** Manages UI-related settings accessible via the "Options" menu.
    *   **Responsibilities:** Handles language selection, chat history download functionality.
    *   **Input:** User selected options.
    *   **Output:** Updated language, downloaded file.
    *   **Owner (Implicit):** Frontend Development Team.

*   **AIInteractionService (Conceptual):** While primarily a backend service, the frontend will interact with it to send questions and receive AI-generated responses.
    *   **Responsibilities:** Sends user queries to the backend/AI model, receives and formats AI responses, handles streaming or loading indicators.
    *   **Input:** User question, selected subject/grade level.
    *   **Output:** AI response, typing indicator status.
    *   **Owner (Implicit):** Frontend/Backend Integration Team.

**Key Components:**
*   **`ChatBubble`:** (Custom) Displays a single message, handles user/bot variants, integrated source links, and copy actions.
*   **`ChatHistory`:** (Custom) Scrollable container for `ChatBubble` components.
*   **`WelcomeScreen`:** (Custom) Initial screen for subject/grade selection and starting chat.
*   **`TypingIndicator`:** (Custom) Visual feedback for AI processing.
*   **`SourcedLink`:** (Custom) Component for displaying clickable source URLs within chat bubbles.
*   **Shadcn UI Standard Components:** Button, Input, Card, Select/Dropdown Menu, Dialog/Modal, Scroll Area, Avatar, Tooltip.

### Data Models and Contracts

**1. Chat Message:**
*   `id`: Unique identifier for the message (UUID).
*   `sender`: 'user' or 'bot'.
*   `content`: String, the text of the message.
*   `timestamp`: Date/Time, when the message was sent.
*   `source_link`: (Optional) String, URL to the source document for bot messages.

**2. User Preferences:**
*   `user_id`: Unique identifier for the user (UUID, derived from authentication).
*   `subject`: String, e.g., 'Science', 'Biology', 'Geology'.
*   `grade_level`: Integer, e.g., 1, 2, ..., 7.

**3. Conversation Context:**
*   `conversation_id`: Unique identifier for a chat session.
*   `user_preferences`: (Reference to User Preferences).
*   `messages`: Array of Chat Message objects, representing the history of the conversation.

**4. Backend AI Request Payload (Conceptual):**
*   `conversation_id`: Current conversation ID.
*   `user_id`: Current user ID.
*   `question`: String, the user's current query.
*   `subject`: String, selected subject category.
*   `grade_level`: Integer, selected grade level.
*   `chat_history`: (Optional) Array of previous Chat Message objects (or simplified version) for context.

### APIs and Interfaces

**1. Frontend -> Backend API (Conceptual `chat` endpoint):**
*   **Endpoint:** `/api/chat`
*   **Method:** `POST`
*   **Request Body (JSON):**
    ```json
    {
      "conversation_id": "string",  // UUID of the current conversation
      "user_id": "string",          // UUID of the authenticated user
      "question": "string",         // The user's query
      "subject": "string",          // e.g., "Science"
      "grade_level": "integer",     // e.g., 3
      "chat_history": [             // Optional: Array of previous messages for context
        {
          "sender": "user" | "bot",
          "content": "string",
          "timestamp": "ISO-8601 string",
          "source_link": "string"   // Only for bot messages
        }
      ]
    }
    ```
*   **Response Body (JSON):**
    ```json
    {
      "conversation_id": "string",
      "message": {
        "id": "string",
        "sender": "bot",
        "content": "string",
        "timestamp": "ISO-8601 string",
        "source_link": "string"
      },
      "status": "success" | "error",
      "error_message": "string" // Present if status is "error"
    }
    ```
*   **Error Codes:**
    *   `400 Bad Request`: Invalid input or missing required fields.
    *   `500 Internal Server Error`: Backend processing failure (e.g., AI model error, database error).
    *   `503 Service Unavailable`: AI service is down or unresponsive.

**2. Frontend -> Backend API (Conceptual `user-preferences` endpoint):**
*   **Endpoint:** `/api/user-preferences`
*   **Method:** `POST` / `PUT`
*   **Request Body (JSON):**
    ```json
    {
      "user_id": "string",
      "subject": "string",
      "grade_level": "integer"
    }
    ```
*   **Response Body:** `200 OK` on success.

**3. Frontend -> Backend API (Conceptual `chat-history-download` endpoint):**
*   **Endpoint:** `/api/chat-history/download`
*   **Method:** `GET`
*   **Query Parameters:**
    *   `conversation_id`: "string" (UUID of the conversation to download)
    *   `format`: "txt" (future: "pdf", "json")
*   **Response:** File download (`text/plain` for TXT).

**4. External AI Service Interface (Conceptual Backend -> Gemini API):**
*   The backend will interface with the Google Gemini API.
*   **Method:** `POST` to Gemini's chat completion endpoint.
*   **Request Payload:** User query, system prompt incorporating selected `subject` and `grade_level`, and relevant `chat_history`.
*   **Response:** AI-generated text, potentially with metadata for source identification (if the Gemini API provides such capabilities or if RAG is implemented).

**5. Database Interface (Conceptual Backend -> Supabase):**
*   **Client:** Supabase client library.
*   **Operations:**
    *   Store and retrieve chat messages.
    *   Store and retrieve user preferences (subject, grade level).
    *   Store and retrieve knowledge base content (for source linking).
    *   Manage user authentication sessions.

### Workflows and Sequencing

The primary user journey, "Asking a Science Question," involves the following sequence:

1.  **Welcome / Selection Screen (Frontend):**
    *   User loads the application.
    *   `WelcomeScreen` component renders.
    *   User selects `grade_level` (e.g., 3) via a `Select` component.
    *   User (implicitly) confirms `subject` (default "Science").
    *   User clicks "Start Chatting" `Button`.
    *   Frontend transitions to the Chat Screen, initiating a new conversation.

2.  **Chat Screen - Initial Load (Frontend):**
    *   `ChatHistory` component renders.
    *   An initial welcoming `ChatBubble` from Sentiabot appears.
    *   `Input` component for user questions is displayed, ready for input.
    *   Header displays current context (`subject`, `grade_level`) and "Options" `Button`.

3.  **User Asks a Question (Frontend -> Backend -> AI -> Backend -> Frontend):**
    *   User types a `question` into the `Input` field.
    *   User clicks "Send" `Button` or presses Enter.
    *   Frontend displays the user's `ChatBubble`.
    *   Frontend displays a `TypingIndicator` from Sentiabot.
    *   Frontend sends a `POST` request to `/api/chat` with `conversation_id`, `user_id`, `question`, `subject`, `grade_level`, and `chat_history`.
    *   Backend receives the request.
    *   Backend constructs a prompt for the Google Gemini API, including the user's question, system prompt (based on `subject`, `grade_level`), and contextual `chat_history`.
    *   Backend calls the Google Gemini API.
    *   Google Gemini API processes the request and returns an AI-generated `content`.
    *   Backend receives the AI `content`, identifies relevant sources (if RAG is implemented via a separate knowledge base lookup), and formats the response message.
    *   Backend saves the user's question and the bot's response to the database (Supabase).
    *   Backend sends a `JSON` response back to the frontend.
    *   Frontend receives the response.
    *   Frontend removes the `TypingIndicator`.
    *   Frontend renders Sentiabot's `ChatBubble` with the AI-generated `content` and integrated `source_link` (if available).

4.  **Managing Options (Frontend):**
    *   User clicks the "Options" `Button` in the header.
    *   A `Dialog` (modal) component appears, overlaying the chat interface.
    *   User can select options like "Download Chat History".
    *   If "Download Chat History" is selected:
        *   Frontend sends a `GET` request to `/api/chat-history/download` with `conversation_id` and `format`.
        *   Backend retrieves chat history from the database.
        *   Backend formats history into a `.txt` file.
        *   Backend sends the `.txt` file as a response.
        *   Frontend initiates download of the file.

## Non-Functional Requirements

### Performance

**Speed & Responsiveness:**
*   **Latency:** AI responses should be displayed to the user promptly, ideally within 3-5 seconds for typical queries. Perceived performance will be enhanced by `TypingIndicator` components.
*   **Throughput:** The system should be able to handle a concurrent load of users appropriate for an educational application, ensuring consistent response times under typical usage.
*   **UI Responsiveness:** The user interface should respond fluidly to user actions across all supported devices (desktops, laptops, tablets), maintaining a smooth 60fps where possible.

**Scalability:**
*   The backend infrastructure should be designed to scale horizontally to accommodate growth in user base and query volume. Leveraging cloud-native services (e.g., serverless functions, managed databases) is recommended.

**Resource Utilization:**
*   Client-side resource usage (CPU, memory) should be optimized to ensure a smooth experience on moderately spec'd devices commonly available to elementary students.

### Security

**Data Privacy and Protection:**
*   All user data, especially chat history and preferences, must be handled in compliance with relevant data privacy regulations (e.g., GDPR, CCPA, COPPA due to target audience).
*   Sensitive data will be encrypted both in transit (TLS/SSL) and at rest (database encryption).

**Authentication and Authorization:**
*   User authentication for content management (if any) or user-specific features must be secure. (Implicit: Supabase Auth will be used).
*   Access to administrative functions will be restricted to authorized personnel only.

**Content Filtering:**
*   The AI model's responses must be filtered for age-appropriateness and to prevent the generation of harmful, biased, or irrelevant content, aligning with the "safe, reliable" objective. This is a critical aspect of ensuring the educational tool's trustworthiness.

**Source Integrity:**
*   Mechanisms must be in place to ensure the integrity and reliability of the knowledge base sources used by the AI to prevent misinformation or hallucinations.

**Secure Development Practices:**
*   Adherence to OWASP Top 10 guidelines and secure coding practices for both frontend and backend development.
*   Regular security audits and penetration testing will be performed.

### Reliability/Availability

**Availability:**
*   The application should aim for high availability (e.g., 99.9% uptime) during planned operating hours to ensure continuous access for students.
*   Planned maintenance windows should be clearly communicated and minimized.

**Fault Tolerance:**
*   The system should be resilient to individual component failures. For instance, if an external AI service becomes temporarily unavailable, the system should gracefully handle the error (e.g., display a friendly error message as per UX spec) rather than crashing.
*   Database replication and backup strategies will be implemented to prevent data loss.

**Recoverability:**
*   In the event of a system failure, data recovery mechanisms should ensure restoration to a consistent state within defined Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO).

### Observability

**Logging:**
*   Comprehensive logging for application errors, critical events, and user interactions to facilitate debugging and auditing.
*   Logs will be centralized and easily accessible for monitoring and analysis.

**Monitoring:**
*   Key system metrics (e.g., API response times, database query performance, AI service uptime, error rates) will be continuously monitored.
*   Alerts will be configured for deviations from normal operating parameters.

**Tracing:**
*   Distributed tracing will be implemented to track requests across different services (frontend, backend, AI service, database) to aid in performance bottleneck identification and root cause analysis.

## Dependencies and Integrations

**Frontend Dependencies:**
*   **Next.js (React Framework):** For building the frontend application, server-side rendering, and API routes.
*   **Shadcn UI:** Component library built on Radix UI and Tailwind CSS.
*   **Radix UI:** Low-level UI primitives used by Shadcn UI for accessibility and behavior.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **JavaScript/TypeScript:** Primary programming languages for frontend development.

**Backend Dependencies:**
*   **Google Gemini API:** External AI service for generating conversational responses.
*   **Supabase:** Backend-as-a-Service providing:
    *   **PostgreSQL Database:** For storing chat history, user preferences, and knowledge base content.
    *   **Supabase Auth:** For user authentication and authorization.
    *   **Edge Functions (Optional):** For backend logic if a serverless approach is chosen.
*   **Node.js (or similar runtime):** For executing backend API routes/functions.

**Integrations:**
*   **Frontend-Backend API:** RESTful or GraphQL API for communication between the UI and backend services (e.g., `/api/chat`, `/api/user-preferences`, `/api/chat-history/download`).
*   **Backend-AI Service:** Direct integration with Google Gemini API for AI response generation.
*   **Backend-Database:** Integration with Supabase PostgreSQL for data persistence and retrieval.

## Acceptance Criteria (Authoritative)

**Functional Acceptance Criteria:**

1.  **Welcome Screen Interaction:**
    *   AC 1.1: Given the user is on the Welcome Screen, when they select a valid Grade Level (e.g., 3) and click 'Start Chatting', then the system navigates to the Chat Screen.
    *   AC 1.2: Given the user is on the Welcome Screen, when they have not selected a Grade Level, then the 'Start Chatting' button remains disabled.

2.  **Chat Screen Display:**
    *   AC 2.1: Given the user is on the Chat Screen, then an initial welcoming `ChatBubble` from Sentiabot is displayed.
    *   AC 2.2: Given the user is on the Chat Screen, then a prominent and always visible text input field is present for asking questions.
    *   AC 2.3: Given the user is on the Chat Screen, then the header displays the current context (e.g., 'Science - Grade 3') and an 'Options' button.

3.  **Asking a Question & Receiving Answer:**
    *   AC 3.1: Given the user is on the Chat Screen, when they type a question into the input field and click 'Send' or press Enter, then their question appears in a `ChatBubble` on the right.
    *   AC 3.2: Given the user has sent a question, then a `TypingIndicator` appears from Sentiabot while processing the response.
    *   AC 3.3: Given Sentiabot is processing a question, when an AI-generated answer is received, then the `TypingIndicator` is replaced by a Sentiabot `ChatBubble` (left-aligned) containing the answer.
    *   AC 3.4: Given a Sentiabot `ChatBubble` is displayed with an answer, when the answer is derived from the knowledge base, then a clearly labeled and clickable `SourcedLink` is integrated within the bubble.

4.  **Options Menu & Chat History Download:**
    *   AC 4.1: Given the user is on the Chat Screen, when they click the 'Options' button in the header, then a modal `Dialog` appears overlaying the chat interface.
    *   AC 4.2: Given the 'Options' modal is open, when the user clicks 'Download Chat History', then a `.txt` file containing the full chat log is downloaded to their device.

**Non-Functional Acceptance Criteria:**

5.  **Performance:**
    *   AC 5.1: The AI response is displayed within 5 seconds for typical queries.
    *   AC 5.2: The UI responds fluidly to user actions on desktop, laptop, and tablet devices.

6.  **Accessibility:**
    *   AC 6.1: All interactive elements are keyboard navigable and operable.
    *   AC 6.2: Text and critical UI elements adhere to WCAG 2.1 Level AA color contrast ratios.
    *   AC 6.3: Users can resize text up to 200% without loss of content or functionality.

## Traceability Mapping

| AC ID | Spec Section(s) | Component(s)/API(s) | Test Idea |
| :---- | :-------------- | :------------------ | :-------- |
| AC 1.1 | 5.1 Flow Steps (Screen 1) | `WelcomeScreen`, `Select`, `Button` | E2E: Verify successful transition after valid selections. |
| AC 1.2 | 7.1 Form Patterns | `WelcomeScreen`, `Button` | E2E: Verify 'Start Chatting' button disabled until selections are made. |
| AC 2.1 | 5.1 Flow Steps (Screen 2) | `ChatHistory`, `ChatBubble` | E2E: Verify initial welcome message on Chat Screen. |
| AC 2.2 | 5.1 Flow Steps (Screen 2) | `Input` | E2E: Verify chat input field is visible and interactive. |
| AC 2.3 | 4.1 Design Direction | Header Component, `Button` | E2E: Verify header displays context and 'Options' button. |
| AC 3.1 | 5.1 Flow Steps (User Asks) | `Input`, `Button`, `ChatBubble` | E2E: Verify user message appears correctly in chat. |
| AC 3.2 | 7.1 Feedback Patterns | `TypingIndicator` | E2E: Verify typing indicator appears after sending message. |
| AC 3.3 | 5.1 Flow Steps (Answer Display) | `TypingIndicator`, `ChatBubble` | E2E: Verify AI response replaces typing indicator with bot `ChatBubble`. |
| AC 3.4 | 6. Component Library (ChatBubble) | `ChatBubble`, `SourcedLink` | E2E: Verify sourced link presence and clickability for KB-based answers. |
| AC 4.1 | 7.1 Modal Patterns | Header Component, `Button`, `Dialog` | E2E: Verify 'Options' button opens modal `Dialog`. |
| AC 4.2 | 7.1 Modal Patterns | `Dialog`, Download API | E2E/Integration: Verify chat history `.txt` file downloads correctly. |
| AC 5.1 | NFR Performance | Backend API, `TypingIndicator` | Performance Test: Measure AI response time for typical queries. |
| AC 5.2 | NFR Performance | Frontend Components | E2E/Responsive Test: Verify UI fluidity across devices. |
| AC 6.1 | 8.2 Accessibility Strategy | All Interactive Components | Accessibility Test (Manual/Automated): Verify keyboard navigation. |
| AC 6.2 | 8.2 Accessibility Strategy | All UI Elements | Accessibility Test (Automated): Verify color contrast ratios. |
| AC 6.3 | 8.2 Accessibility Strategy | Text Elements | Accessibility Test (Manual): Verify text resizing without layout issues. |

## Risks, Assumptions, Open Questions

**Risks:**
*   **R1: AI Model Accuracy & Bias:** Risk of AI providing incorrect, biased, or inappropriate answers despite content filtering, leading to a loss of trust and undermining educational value. (Mitigation: Robust content filtering, continuous monitoring, human review, RAG implementation for grounding).
*   **R2: Source Link Integrity:** Risk of source links becoming broken, irrelevant, or malicious over time, leading to a poor user experience and security vulnerabilities. (Mitigation: Automated link validation, curated knowledge base management).
*   **R3: Performance Degradation:** Risk of AI response latency or UI unresponsiveness impacting user experience and engagement, especially during peak usage. (Mitigation: Performance testing, backend optimization, efficient frontend rendering).
*   **R4: Data Privacy Non-Compliance:** Risk of failing to comply with data privacy regulations (e.g., COPPA for children's data), leading to legal and reputational damage. (Mitigation: Strict data handling policies, security audits, legal review).

**Assumptions:**
*   **A1: Reliable External AI Service:** Assuming Google Gemini API provides stable, performant, and age-appropriate responses for elementary school queries.
*   **A2: Effective Content Filtering:** Assuming the implemented content filtering mechanisms (both AI and explicit rules) are sufficient to prevent inappropriate content for the target age group.
*   **A3: Sufficient Knowledge Base:** Assuming a comprehensive and relevant knowledge base is available or can be built to ground AI responses and provide accurate sources.
*   **A4: Moderate Concurrent Users:** Assuming the initial user load will be within manageable limits for the chosen technology stack, allowing for iterative scaling.
*   **A5: User Familiarity with Chat UIs:** Assuming elementary school students have a basic understanding of chat interfaces, reducing the need for extensive onboarding beyond the Welcome Screen.

**Open Questions:**
*   **Q1: Multi-language Support (Norwegian/English):** How will the system explicitly support and switch between Norwegian and English responses, and what are the implications for content filtering and AI model training/prompting? (Note: Epic 3 mentions this explicitly, but it is an open question from the UX spec perspective).
*   **Q2: Admin Interface for KB/Prompt Management:** What are the requirements for an administrative interface to manage the knowledge base content and modify the chatbot's system prompt? (Note: Epic 4 mentions this explicitly, but it is an open question from the UX spec perspective).
*   **Q3: User Data Persistence:** How long will chat history and user preferences be stored, and what are the user's options for managing or deleting their data?
*   **Q4: Gamification/Engagement Beyond Chat:** Are there future plans for gamification or other interactive elements to enhance engagement beyond the core chat experience, and how might this impact the current minimalist design?

## Test Strategy Summary

The test strategy will encompass multiple levels to ensure the quality, reliability, and usability of Sentiabot, with a strong emphasis on user experience and the educational mission.

**1. Unit Testing:**
*   **Scope:** Individual functions, components (e.g., `ChatBubble` rendering logic, input validation).
*   **Frameworks:** Jest, React Testing Library (for isolated component testing).

**2. Component Testing:**
*   **Scope:** UI components in isolation (e.g., `WelcomeScreen`, `ChatHistory`, `Input` field behavior, `Button` states).
*   **Frameworks:** Storybook (for visual testing and component interaction), Playwright (for component-level interaction tests).

**3. Integration Testing:**
*   **Scope:** Interactions between frontend and backend services (e.g., API calls to `/api/chat`, `/api/user-preferences`), backend integration with Google Gemini API, database interactions with Supabase.
*   **Frameworks:** Jest, Supertest (for API testing).

**4. End-to-End (E2E) Testing:**
*   **Scope:** Critical user journeys (e.g., "Asking a Science Question" flow, "Download Chat History"). Full system validation from UI to backend and AI.
*   **Frameworks:** Playwright.
*   **Key Scenarios:**
    *   AC 1.1, AC 1.2: Welcome Screen functionality.
    *   AC 2.1, AC 2.2, AC 2.3: Chat Screen display.
    *   AC 3.1, AC 3.2, AC 3.3, AC 3.4: Asking questions and receiving sourced answers.
    *   AC 4.1, AC 4.2: Options menu and download chat history.

**5. Performance Testing:**
*   **Scope:** Backend API latency (AC 5.1), UI responsiveness (AC 5.2), system throughput under load.
*   **Frameworks:** K6, Lighthouse (for client-side performance).

**6. Accessibility Testing (WCAG 2.1 Level AA):**
*   **Scope:** All interactive elements and content display.
*   **Methods:**
    *   **Automated:** Lighthouse, `axe DevTools` for continuous checks (AC 6.2).
    *   **Manual:** Keyboard-only navigation (AC 6.1), screen reader verification, color contrast checks, text resizing (AC 6.3).

**7. Security Testing:**
*   **Scope:** Authentication, authorization, data handling, input sanitization, content filtering.
*   **Methods:** Penetration testing, vulnerability scanning, security code reviews.

**8. Linguistic Testing (for future multi-language support):**
*   **Scope:** AI responses and UI text in all supported languages.
*   **Methods:** Manual linguistic review by native speakers, automated translation quality checks.

**Test Data:**
*   Pre-defined test questions for science topics (Biology & Geology) with expected AI responses and associated source links.
*   Test user accounts for different roles (student, admin).

**Traceability:**
*   Test cases will be directly traceable to the Acceptance Criteria (as per `Traceability Mapping` table) and the UX Design Specification sections.

## Post-Review Follow-ups (AI)

- [ ] [Medium] Implement unit/integration tests for `/api/hello` endpoint to verify it returns `"{ "message": "Hello World" }"` as expected. (AC #2) [file: sentiabot/app/api/hello/route.ts] (Reference Story 1.1)
- [ ] [Medium] Implement unit/integration tests for `supabase.ts` client to verify successful connection to Supabase. (AC #3) [file: sentiabot/lib/supabase.ts] (Reference Story 1.1)
- Note: Consider the lifecycle and exposure of `sentiabot/app/api/check-db/route.ts`. Ensure it's not exposed in production, or integrate its testing functionality more formally into a test suite and remove the direct API route. (Reference Story 1.1)

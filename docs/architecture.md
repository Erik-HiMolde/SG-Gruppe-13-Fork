# Architecture

## Executive Summary

Core functionality is an AI chatbot for elementary school students.
Focus on educational content, age-appropriate language, and source attribution.
Includes features for contextualization (subject, grade level), multilingual support (Norwegian/English), and chatlog download.
Administrative interfaces for knowledge base updates and system prompt modification.
Project emphasizes user-friendly UI, responsiveness, and accessibility (WCAG 2.1 Level AA).

## Project Initialization

Project initialization using `npx create-next-app@latest sentiabot --typescript --tailwind --eslint --app` should be the first implementation story.

This establishes the base architecture with these decisions:
- Language/TypeScript: Provided by starter
- Styling solution: Provided by starter (Tailwind CSS)
- Linting/Formatting: Provided by starter (ESLint)
- Build tooling: Provided by starter (Next.js)
- Project structure: Provided by starter (Next.js standard)

## Decisions to be Made

Here are the architectural decisions we need to make, categorized by priority:

### CRITICAL (blocks everything):


### IMPORTANT (shapes architecture):


### NICE-TO-HAVE (can defer):


## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |

| Data Persistence | Supabase with PostgreSQL | Latest (Managed) | All Epics | Handles regular & AI vector data, reliable, managed service, includes auth & storage. |
| API Pattern | REST | N/A | All Epics | Common, well-understood, fits clear actions, easy with Next.js API Routes. |
| Authentication | Supabase Auth | Latest (Managed) | All Epics | Integrated with Supabase, secure user management, supports Row Level Security. |
| AI Integration Strategy | RAG with Google Gemini, Prompt Engineering, pgvector | Latest | All Epics | Ensures accurate, age-appropriate, sourced, and multilingual AI responses. |
| Deployment Target | Local Development Environment Only | N/A | All Epics | User requirement; simplifies infrastructure and removes need for cloud hosting. |
| File Storage | Supabase Storage (for non-chatlog assets); Local Download for Chatlogs | Latest (Managed) | Admin/UX Epics | Supabase integration for other assets; chatlogs stored locally as per user requirement. |
| Background Jobs | Direct async processing via Next.js API Routes with Supabase | Latest | FR014, FR016 | Leverages existing stack, simple for current needs, avoids new dependencies. |
| Real-time Capabilities | Supabase Realtime | Latest (Managed) | All Epics | Seamless integration with Supabase, instant updates for fluid chat experience. |
| Email Service | Not needed for MVP; deferred. | N/A | N/A | Reduces initial complexity and external dependencies. Admin communication handled via direct interface. |

## Project Structure

```
sentiabot/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── styles/
│       └── globals.css
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml (or yarn.lock, package-lock.json)
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Epic to Architecture Mapping

## Epic to Architecture Mapping

| Epic | Architectural Components / Boundaries |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Epic 1: Foundational End-to-End Chat** | Frontend UI (Next.js components), Next.js API Routes (chat endpoint), Google Gemini API integration. |
| **Epic 2: Knowledge-Driven, Contextual Chat** | Supabase PostgreSQL (with `pgvector` extension), Next.js API Routes (knowledge base interaction, prompt generation), Google Gemini API (contextual prompts), Supabase Realtime (for dynamic updates). |
| **Epic 3: Enhanced User Experience and Features** | Frontend UI (Next.js components with Shadcn UI/Tailwind CSS), Local file system interaction (for chatlog download), Next.js API Routes (for any backend support for UI features). |
| **Epic 4: Administration and System Management** | Supabase Auth (for admin login), Next.js API Routes (admin API endpoints), Supabase PostgreSQL (for KB and system prompt storage), Frontend Admin UI (Next.js components). |

## Technology Stack Details

### Core Technologies

### Core Technologies

- **Frontend Framework:** Next.js (latest)
- **Programming Language:** TypeScript (latest)
- **Styling:** Tailwind CSS (latest)
- **UI Component Library:** Shadcn UI (latest)
- **Database:** PostgreSQL (managed by Supabase, including `pgvector` extension)
- **Backend-as-a-Service (BaaS):** Supabase (Auth, Storage, Realtime, PostgreSQL)
- **Large Language Model (LLM):** Google Gemini API (latest)
- **API Pattern:** REST
- **Deployment:** Local Development Environment Only

### Integration Points

### Integration Points

**Frontend to Backend (Next.js API Routes):**
- **Communication Style:** RESTful API calls (HTTP GET, POST, PUT, DELETE) from Next.js client-side components or server components/actions to Next.js API Routes.
- **API Boundaries:**
    - `/api/chat`: For sending user questions and receiving AI responses.
    - `/api/knowledgebase`: For administrative CRUD operations on the knowledge base.
    - `/api/auth`: For authentication-related actions (e.g., login, logout, user management if not handled directly by Supabase client).
- **Data Format:** JSON for request and response bodies.

**Backend (Next.js API Routes) to Supabase:**
- **Services Used:** PostgreSQL (via Supabase client library), Supabase Auth, Supabase Storage, Supabase Realtime.
- **Communication:** Direct client library calls from API Routes to Supabase services.
- **Authentication/Authorization:** Supabase client uses JWT tokens from Supabase Auth to authorize database and storage operations via Row Level Security (RLS) in PostgreSQL.

**Backend (Next.js API Routes) to Google Gemini API:**
- **Service Used:** Google Gemini API.
- **Communication:** Direct HTTP POST requests to the Gemini API endpoint.
- **Context/Payload:** Request body will include user prompt, system prompt (with context from knowledge base), and configuration parameters (e.g., temperature, max tokens). Responses will be parsed for AI-generated text and metadata.

## Novel Pattern Designs

Note: All architectural patterns identified for this project have established solutions or are unique applications of existing patterns. Proceeding with standard architectural patterns.

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

These patterns ensure consistent implementation across all AI agents:

### Component-Based Development (React/Next.js)
**Principle:** Build user interfaces from encapsulated, reusable components.
**Details:** Components should adhere to single responsibility principle, be testable, and promote reusability across the application. Utilize Next.js features like Server Components for performance optimization where appropriate.

### Atomic Design Principles (Shadcn UI/Tailwind CSS)
**Principle:** Structure UI components from smallest (atoms) to largest (pages/templates).
**Details:** Leverage Shadcn UI components as foundational "atoms" and "molecules," customizing with Tailwind CSS. Combine these into "organisms" and then into "templates" and "pages" to build the complete UI.

### Data Fetching Strategies (Next.js)
**Principle:** Optimize data fetching for performance and user experience.
**Details:** Employ Next.js's built-in data fetching mechanisms:
-   **Server-Side Rendering (SSR):** For pages requiring fresh data on each request (e.g., dynamic chat content).
-   **Static Site Generation (SSG):</strong&gt; For static content or pages that can be pre-rendered at build time (e.g., static admin dashboards).
-   **Client-Side Fetching (CSR):** For highly interactive components that fetch data after initial page load.

### Supabase Client Integration
**Principle:** Standardized interaction with Supabase services.
**Details:** Create a centralized Supabase client instance (`src/lib/supabase.ts`) for all interactions with PostgreSQL, Auth, Storage, and Realtime. Encapsulate database queries and mutations within dedicated service functions or hooks for consistency and testability. Utilize Row Level Security (RLS) for data access control.

### Type-Safe Development (TypeScript)
**Principle:** Enforce strict typing throughout the codebase to enhance reliability and maintainability.
**Details:** Define clear interfaces and types for data models, API payloads, component props, and state. Leverage TypeScript's inference capabilities and implement type guards where necessary.

## Consistency Rules

### Naming Conventions

**Principle:** Consistency and clarity for all named entities within the project.

**Details:**
- **REST API Endpoints:** Plural, lowercase, kebab-case (e.g., `/api/users`, `/api/knowledge-bases`).
- **Database Tables & Columns:** Snake_case (e.g., `users`, `user_id`, `knowledge_base_entries`).
- **React Components:** PascalCase (e.g., `ChatWindow`, `AdminDashboard`, `UserCard`).
- **Component Files:** PascalCase for the component file itself (e.g., `ChatWindow.tsx`), kebab-case for directories (e.g., `components/chat/ChatWindow.tsx`).
- **General Files/Folders:** Kebab-case (e.g., `utils/date-helpers.ts`, `styles/globals.css`).
- **TypeScript Interfaces/Types:** PascalCase (e.g., `ChatMessage`, `KnowledgeBaseEntry`).
- **Environment Variables:** SCREAMING_SNAKE_CASE. Client-side accessible variables *must* be prefixed with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `GEMINI_API_KEY`).

### Code Organization

**Principle:** Intuitive grouping of code for discoverability and maintainability.

**Details:**
- **Feature-based Component Organization:** Components related to a specific feature will be grouped within a folder named after that feature under `src/components/` (e.g., `src/components/chat`, `src/components/admin`).
- **Shared UI Components:** Generic or widely reusable UI components (e.g., buttons, inputs, cards from Shadcn UI) will reside in `src/components/ui/` or `src/components/common/`.
- **Pages and Layouts:** Organized by Next.js App Router conventions in `src/app/`. Use route groups `(groupname)/` for related pages without affecting URL paths.
- **API Routes:** Grouped logically under `src/app/api/` (e.g., `src/app/api/chat`, `src/app/api/knowledgebase`, `src/app/api/auth`).
- **Utility Functions:** Pure, reusable functions and helpers will be located in `src/lib/` or `src/utils/` (e.g., `src/lib/supabase`, `src/lib/gemini`).
- **Type Definitions:** Global or shared TypeScript type definitions will be in `src/types/` or co-located with their respective modules if highly specific.
- **Test Files:** Co-located with the source code they test, using the `*.test.ts` or `*.spec.ts` naming convention.

### Error Handling

**Strategy:** Standardized Error Response format for API errors, combined with contextual error handling on the frontend.

**Details:**
- **Backend (API):** All API errors will return a consistent JSON structure, including at least an `errorCode` (internal, programmatic code) and `message` (human-readable, but generic). HTTP status codes will be used appropriately (e.g., 400 for bad request, 401 for unauthorized, 500 for server errors). Sensitive details will be omitted from production error messages.
- **Frontend:** The frontend will interpret the standardized API error responses. It will display user-friendly messages based on the `errorCode` or `message`, and handle specific error states (e.g., showing a retry button for transient network issues).
- **Global Catch:** A global error boundary or mechanism will ensure that unhandled errors do not crash the application but are logged (see Logging Strategy) and display a generic fallback message to the user.

### Logging Strategy

**Strategy:** Structured Logging to local files during local operation, supplemented by console logging for active development.

**Details:**
- **Local Files:** For persistent logging, events will be written to structured log files (e.g., JSON format) on the local disk. This allows for post-mortem analysis and debugging.
- **Console Logging:** During active development, informative messages, warnings, and errors will be output to the developer console for immediate feedback.
- **Log Content:** Logs will include timestamps, severity levels (e.g., INFO, WARN, ERROR), source component, and relevant context (e.g., user ID, request ID).
- **Tooling:** Developers can use standard text editors or command-line tools (e.g., `grep`, `jq`) to view and filter log files.
- **Future Consideration:** If the application is ever deployed to a cloud environment, this strategy will be re-evaluated to integrate with a centralized cloud logging service (e.g., Vercel Logs, AWS CloudWatch) for better aggregation, monitoring, and alerting capabilities.

### Date/time Handling

**Strategy:** All date/time logic and formatting will be handled exclusively on the server-side. Frontend will receive pre-formatted date/time strings for display.

**Details:**
- **Storage:** Dates and times will be stored in the database in a consistent format (e.g., UTC timestamp or ISO 8601 string), handled by the database itself.
- **Server-side Processing:** All conversions, formatting, and time zone adjustments (if any are needed for specific display requirements) will occur on the backend (Next.js API Routes).
- **Frontend Display:** The frontend will receive ready-to-display date/time strings from the API, eliminating the need for client-side date manipulation libraries or complex logic.
- **Benefits:** Simplifies frontend development, ensures consistency in display formats, reduces client-side bundle size.
- **Considerations:** If highly dynamic or interactive date/time displays are needed in the future (e.g., real-time countdowns), this strategy may need re-evaluation.

## Data Architecture

## Data Architecture

### Data Models and Relationships

The Sentiabot application will leverage PostgreSQL within Supabase to manage its data, including a specialized knowledge base with vector embeddings.

#### 1. `users` Table (Supabase Auth)
-   **Purpose:** Stores user authentication information, managed by Supabase Auth.
-   **Fields:** `id` (UUID, PK), `email` (text, unique), `created_at` (timestamp), `role` (text, e.g., 'admin', 'student' - for RLS).
-   **Relationships:** One-to-many with `chat_sessions` (a user can have multiple chat sessions).

#### 2. `knowledge_base_entries` Table
-   **Purpose:** Stores curated educational content used for RAG.
-   **Fields:** `id` (UUID, PK), `title` (text), `content` (text), `embedding` (vector, for `pgvector`), `subject` (text), `grade_level` (text), `source_url` (text), `created_at` (timestamp), `updated_at` (timestamp).
-   **Relationships:** No direct foreign key relationships with other tables, but conceptually linked to `chat_sessions` through the RAG process.

#### 3. `chat_sessions` Table
-   **Purpose:** Stores metadata for each chat conversation.
-   **Fields:** `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `started_at` (timestamp), `ended_at` (timestamp, nullable), `subject` (text, from context), `grade_level` (text, from context), `language` (text, e.g., 'en', 'no').
-   **Relationships:** One-to-many with `chat_messages` (a session contains multiple messages).

#### 4. `chat_messages` Table
-   **Purpose:** Stores individual messages within a chat session.
-   **Fields:** `id` (UUID, PK), `session_id` (UUID, FK to `chat_sessions.id`), `sender` (text, e.g., 'user', 'ai'), `content` (text), `timestamp` (timestamp), `source_references` (text array, nullable, referencing `knowledge_base_entries.source_url`).
-   **Relationships:** Many-to-one with `chat_sessions`.

#### 5. `system_prompts` Table (for admin configuration)
-   **Purpose:** Stores configurable system prompts for the AI.
-   **Fields:** `id` (UUID, PK), `name` (text, e.g., 'base_prompt', 'safety_prompt'), `prompt_text` (text), `description` (text, nullable), `created_at` (timestamp), `updated_at` (timestamp).
-   **Relationships:** None.

---

## API Contracts

## API Contracts

### API Specifications

The Sentiabot application will expose RESTful API endpoints via Next.js API Routes. All requests and responses will utilize JSON format.

#### 1. Chat API (`/api/chat`)
-   **Purpose:** Handles user chat interactions with the AI.
-   **Endpoint:** `/api/chat`
-   **Method:** `POST`
-   **Request Body:**
    ```json
    {
      "sessionId": "string", // Optional, for continuing a conversation
      "message": "string",   // User's message
      "context": {           // Optional, for providing additional context
        "subject": "string",
        "gradeLevel": "string",
        "language": "string"
      }
    }
    ```
-   **Response Body (Success - 200 OK):**
    ```json
    {
      "sessionId": "string",
      "aiResponse": "string",
      "sourceReferences": ["string"] // URLs from knowledge base
    }
    ```
-   **Response Body (Error - 400 Bad Request, 500 Internal Server Error):**
    ```json
    {
      "errorCode": "string",
      "message": "string"
    }
    ```

#### 2. Knowledge Base API (`/api/knowledgebase`)
-   **Purpose:** Provides administrative endpoints for managing knowledge base entries.
-   **Endpoints & Methods:**
    -   `GET /api/knowledgebase`: Retrieve all entries (admin only).
    -   `GET /api/knowledgebase/{id}`: Retrieve a single entry by ID (admin only).
    -   `POST /api/knowledgebase`: Create a new entry (admin only).
        -   **Request Body:**
            ```json
            {
              "title": "string",
              "content": "string",
              "subject": "string",
              "gradeLevel": "string",
              "sourceUrl": "string"
            }
            ```
    -   `PUT /api/knowledgebase/{id}`: Update an existing entry (admin only).
        -   **Request Body:** (same as POST, include ID in path)
    -   `DELETE /api/knowledgebase/{id}`: Delete an entry (admin only).
-   **Response Bodies:**
    -   **Success (200 OK, 201 Created):** Varies based on operation (e.g., list of entries, single entry object, success message).
    -   **Error (400, 401, 403, 404, 500):** Consistent error format as Chat API.

#### 3. System Prompts API (`/api/system-prompts`)
-   **Purpose:** Provides administrative endpoints for managing system prompts.
-   **Endpoints & Methods:**
    -   `GET /api/system-prompts`: Retrieve all system prompts (admin only).
    -   `GET /api/system-prompts/{id}`: Retrieve a single prompt by ID (admin only).
    -   `PUT /api/system-prompts/{id}`: Update an existing system prompt (admin only).
        -   **Request Body:**
            ```json
            {
              "name": "string",
              "promptText": "string",
              "description": "string"
            }
            ```
-   **Response Bodies:**
    -   **Success (200 OK):** Varies based on operation.
    -   **Error (400, 401, 403, 404, 500):** Consistent error format.

#### Authentication
-   All administrative APIs (`/api/knowledgebase`, `/api/system-prompts`) will require authenticated users with appropriate roles (e.g., 'admin'). Supabase Auth will be used for token verification.

## Security Architecture

## Security Architecture

### Security Approach

The security architecture for Sentiabot is built around leveraging the robust features provided by Supabase, Next.js, and standard web security practices.

#### 1. Authentication and Authorization
-   **Supabase Auth:** Primary mechanism for user authentication. It handles user registration, login, and session management.
-   **JSON Web Tokens (JWTs):** Supabase Auth issues JWTs upon successful authentication. These tokens are automatically managed by the Supabase client library and sent with API requests to identify the authenticated user.
-   **Role-Based Access Control (RBAC):** Users will be assigned roles (e.g., 'admin'). Authorization checks will occur on Next.js API Routes and within Supabase using Row Level Security (RLS) to enforce access control based on these roles.

#### 2. Row Level Security (RLS) in PostgreSQL
-   **Fine-Grained Access:** RLS policies will be applied to critical database tables (e.g., `knowledge_base_entries`, `system_prompts`, potentially `chat_sessions`) to ensure that users can only access or modify data they are authorized to. For instance, only 'admin' users can modify knowledge base entries.
-   **Default Deny:** RLS policies will adopt a "default deny" posture, meaning access is forbidden unless explicitly granted by a policy.

#### 3. API Security
-   **HTTPS/TLS:** All communication between the frontend, Next.js API Routes, Supabase, and Google Gemini will occur over HTTPS/TLS to ensure data in transit is encrypted and secure.
-   **Input Validation:** All incoming data to Next.js API Routes will undergo strict validation to prevent common vulnerabilities like SQL injection, cross-site scripting (XSS), and buffer overflows.
-   **Environment Variables:** Sensitive information (API keys, database credentials) will be stored securely as environment variables and never committed to version control. Only necessary variables will be exposed to the client-side, prefixed with `NEXT_PUBLIC_`.
-   **Rate Limiting:** (Future Consideration) Implement rate limiting on API endpoints to prevent abuse and denial-of-service attacks.

#### 4. Frontend Security
-   **Content Security Policy (CSP):** (Future Consideration) Implement a strict CSP to mitigate XSS and data injection attacks by controlling which resources the browser is allowed to load.
-   **Secure Cookie Handling:** Supabase handles secure storage and transmission of authentication tokens (typically in HttpOnly, Secure cookies).
-   **No Sensitive Data in Client:** Avoid storing sensitive user or application data directly in the browser's local storage or session storage.

#### 5. Data Encryption
-   **Encryption at Rest:** Supabase ensures that data stored in PostgreSQL is encrypted at rest.
-   **Encryption in Transit:** As mentioned, all network communication is encrypted using TLS.

#### 6. Auditing and Logging
-   Audit logs for administrative actions (e.g., knowledge base modifications, system prompt changes) will be implemented to track who performed what actions and when. These logs will be stored securely and be accessible for review.

## Performance Considerations

## Performance Considerations

### Performance Strategies

Given that Sentiabot is currently scoped for a local development environment, performance strategies will focus on optimizing responsiveness, efficient resource utilization, and minimizing latency in AI interactions.

#### 1. Optimized Data Retrieval and Storage
-   **Database Indexing:** Implement appropriate indexes on frequently queried columns in PostgreSQL (e.g., `knowledge_base_entries.subject`, `grade_level`, `chat_sessions.user_id`, `chat_messages.session_id`) to speed up data retrieval.
-   **Efficient Supabase Queries:** Utilize Supabase client library efficiently, fetching only necessary data and leveraging features like `select` and `filter` to reduce payload size.
-   **`pgvector` Optimization:** Ensure `pgvector` indexes (e.g., `ivfflat`) are correctly configured for fast similarity searches within the knowledge base.

#### 2. AI Interaction Optimization
-   **Prompt Engineering Efficiency:** Craft concise and effective prompts for Google Gemini to minimize token usage and processing time.
-   **Context Management:** Strategically manage the chat history sent to the LLM to provide sufficient context without exceeding token limits or introducing unnecessary overhead.
-   **Asynchronous Processing:** Handle AI calls asynchronously to avoid blocking the main thread and maintain a responsive user interface.

#### 3. Frontend Rendering Performance
-   **Component Memoization:** Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders of React components, especially for complex UI elements or lists.
-   **Virtualization/Windowing:** For long lists of chat messages or knowledge base entries, implement virtualization to render only visible items, improving scroll performance.
-   **Image Optimization:** Optimize any static assets or images used in the UI for faster loading, even in a local context.
-   **Bundle Size Reduction:** Monitor and minimize the JavaScript bundle size through code splitting (Next.js handles this by default) and lazy loading components that are not immediately needed.

#### 4. Real-time Efficiency
-   **Supabase Realtime Filters:** Apply precise filters to Supabase Realtime subscriptions to only receive relevant updates, reducing network traffic and client-side processing.

#### 5. Local Environment Specifics
-   **Resource Monitoring:** During local development, developers should monitor CPU, memory, and network usage to identify bottlenecks.
-   **Avoid Over-fetching:** Even locally, avoid fetching excessive data that isn't immediately displayed to prevent UI sluggishness.

## Deployment Architecture

## Deployment Architecture

### Deployment Approach

As per ADR 005, the Sentiabot application is currently scoped for deployment and operation solely within a local development environment. This approach simplifies infrastructure, development workflow, and eliminates cloud hosting considerations for the current phase.

#### Local Development Environment Deployment
1.  **Prerequisites:** Ensure all development prerequisites are installed and configured on the local machine (see "Development Environment - Prerequisites" section).
2.  **Environment Variables:** Create a `.env.local` file in the project root based on a provided template (e.g., `.env.example`) and populate it with necessary API keys and Supabase connection details.
3.  **Dependency Installation:** Install project dependencies using `pnpm install`, `npm install`, or `yarn install` as specified in `package.json`.
4.  **Database Setup:** Configure and run the local Supabase instance (if applicable) or connect to a remote Supabase project. Ensure PostgreSQL migrations are applied.
5.  **Application Start:** Start the Next.js development server using `npm run dev` (or `pnpm dev`, `yarn dev`). The application will then be accessible via a local URL (e.g., `http://localhost:3000`).
6.  **Local Supabase Setup (Optional but Recommended):**
    - If using Supabase locally, ensure the Supabase CLI is installed.
    - Start Supabase services: `supabase start`
    - Apply database migrations: `supabase db push`
    - Link to your Supabase project: `supabase link --project-ref <your-project-ref>`

#### Future Considerations (if cloud deployment becomes necessary)
While not in scope for the current phase, a production deployment would involve:
-   **Cloud Hosting:** Utilizing a platform like Vercel (for Next.js) or a custom server setup on AWS, GCP, or Azure.
-   **CI/CD Pipeline:** Implementing automated build, test, and deployment workflows.
-   **Scalability:** Configuring load balancers, auto-scaling groups, and potentially serverless functions for API routes.
-   **Monitoring and Alerting:** Setting up comprehensive logging, monitoring, and alerting solutions.

## Development Environment

### Prerequisites

### Prerequisites

To set up the Sentiabot development environment, the following software and tools are required:

1.  **Node.js:**
    -   **Version:** Latest LTS (Long Term Support) version recommended (e.g., 20.x or higher).
    -   **Installation:** Download from [nodejs.org](https://nodejs.org/en/download) or use a version manager like `nvm` (Node Version Manager).
2.  **npm (Node Package Manager) or pnpm or Yarn:**
    -   **Installation:** npm is bundled with Node.js. pnpm or Yarn can be installed globally via npm (`npm install -g pnpm` or `npm install -g yarn`).
3.  **Git:**
    -   **Purpose:** Version control system for managing the codebase.
    -   **Installation:** Download from [git-scm.com](https://git-scm.com/downloads).
4.  **Supabase CLI (Command Line Interface):**
    -   **Purpose:** For local Supabase development, managing migrations, and linking to remote projects.
    -   **Installation:** Follow instructions on [Supabase CLI GitHub](https://github.com/supabase/cli).
5.  **Code Editor:**
    -   **Recommendation:** Visual Studio Code (VS Code) is highly recommended due to its excellent TypeScript support, extensions for React, Next.js, Tailwind CSS, and Git integration.
6.  **Web Browser:**
    -   **Recommendation:** Chrome, Firefox, Edge, or Safari for testing the web application.
7.  **Google Cloud Project (for Gemini API):**
    -   **Purpose:** Access to the Google Gemini API.
    -   **Setup:** Create a Google Cloud project and enable the Gemini API. Obtain an API key.

### Setup Commands

```bash
### Setup Commands

Follow these steps to set up and run the Sentiabot application locally:

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd sentiabot
    ```
    (Replace `<repository_url>` with the actual repository URL)

2.  **Install Dependencies:**
    ```bash
    pnpm install # Or npm install, or yarn install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env.local` file in the project root with the following (replace placeholders with your actual values):
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
    # Add any other necessary environment variables
    ```
    *Note: Ensure your Supabase project is set up and you have obtained your Supabase URL and Anon Key. For the Gemini API Key, ensure you have a Google Cloud Project with the Gemini API enabled.*

4.  **Supabase Local Setup (Optional, if using local Supabase):**
    If you intend to run Supabase locally, ensure the Supabase CLI is installed and configured.
    ```bash
    supabase start
    supabase db push # To apply database migrations
    # If linking to a remote project:
    # supabase link --project-ref your-project-ref
    ```

5.  **Run the Development Server:**
    ```bash
    pnpm dev # Or npm run dev, or yarn dev
    ```

6.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).
```

## Architecture Decision Records (ADRs)

### ADR 001: Data Persistence Solution

**Decision:** Adopt Supabase with PostgreSQL as the primary data persistence solution.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
The Sentiabot application requires robust data persistence for various components, including:
-   A dedicated knowledge base with AI vector embeddings (FR001, FR007).
-   User data (e.g., student/admin profiles, if implemented).
-   Chat logs (FR009).
-   Admin settings (e.g., knowledge base updates FR010, system prompt modification FR011).

The solution needs to be scalable, reliable, and integrate well with the chosen Next.js frontend.

**Options Considered:**
-   Relational Databases (e.g., standalone PostgreSQL)
-   NoSQL Databases (e.g., MongoDB)
-   Managed Backend-as-a-Service (BaaS) platforms (e.g., Supabase, Firebase)

**Decision:**
Supabase was chosen for its managed PostgreSQL service, which includes built-in support for `pgvector` (essential for AI vector embeddings). Additionally, Supabase provides integrated authentication and storage solutions, which align with the project's requirements for admin interfaces and chatlog downloads.

**Consequences:**
-   **Positive:** Simplified backend development and operations due to managed service. Native support for AI vector embeddings. Faster development cycles due to integrated features (Auth, Storage).
-   **Negative:** Potential vendor lock-in with Supabase. Cost implications of a managed service.

---
### ADR 002: API Pattern - REST

**Decision:** Adopt REST (Representational State Transfer) as the primary API pattern for communication between the frontend and backend.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
The Sentiabot application requires clear and well-defined communication between its Next.js frontend and backend services for:
-   Chatbot interactions (sending questions, receiving answers).
-   Administrative functions (updating knowledge base, modifying system prompts).
-   User-related actions (e.g., chatlog download, future parent/student interfaces).

**Options Considered:**
-   **REST:** A widely adopted, stateless, client-server architectural style using standard HTTP methods.
-   **GraphQL:** A query language for APIs and a runtime for fulfilling those queries with existing data.
-   **tRPC:** A type-safe API layer that enables end-to-end type safety between frontend and backend in TypeScript projects.

**Decision:**
REST was chosen due to its widespread adoption, ease of understanding, and suitability for the clear, distinct actions required by Sentiabot. Next.js's API Routes provide a straightforward way to implement RESTful endpoints, leveraging familiar web standards.

**Consequences:**
-   **Positive:** High developer familiarity, robust tooling ecosystem, clear separation of concerns, and ease of integration with external services if needed. Simplified implementation with Next.js API Routes.
-   **Negative:** Can sometimes lead to over-fetching or under-fetching of data compared to GraphQL, though this is less critical for Sentiabot's current scope. Less strict type-safety enforcement at the API boundary compared to tRPC.

---
### ADR 003: Authentication - Supabase Auth

**Decision:** Utilize Supabase Auth for user authentication and authorization.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
Sentiabot requires an authentication system to secure administrative interfaces (FR010, FR011) and potentially future student/parent portals (FR017). This system needs to be reliable, easy to integrate, and capable of handling different user roles.

**Options Considered:**
-   **Custom Authentication:** Building a bespoke authentication system.
-   **Third-party Providers:** Services like Auth0, Clerk, or libraries like NextAuth.js.
-   **Backend-as-a-Service (BaaS) Integrated Auth:** Supabase Auth or Firebase Auth.

**Decision:**
Supabase Auth was selected due to its seamless integration with the chosen Supabase PostgreSQL database. It offers secure, managed authentication capabilities, including email/password, magic links, and social logins (if expanded later), and critically supports Row Level Security (RLS) in PostgreSQL, which is vital for fine-grained access control to data.

**Consequences:**
-   **Positive:** Simplified authentication implementation, leverages existing Supabase integration, robust security features out-of-the-box, easy role management via RLS.
-   **Negative:** Vendor lock-in to Supabase's authentication service, potential limitations in highly custom authentication flows (though unlikely for Sentiabot's needs).

---
### ADR 004: AI Integration Strategy - RAG with Google Gemini, Prompt Engineering, and pgvector

**Decision:** Implement a Retrieval-Augmented Generation (RAG) approach for AI responses, utilizing Google Gemini as the Large Language Model (LLM), combined with precise prompt engineering and `pgvector` in PostgreSQL for the knowledge base.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
Sentiabot's core functionality relies on providing accurate, age-appropriate, and sourced answers to elementary school students (FR001, FR003, FR007). This requires integrating an LLM effectively while mitigating the risk of "hallucinations" and ensuring contextual relevance (FR004, FR005) and multilingual support (FR008).

**Options Considered:**
-   **Direct LLM Call:** Sending user questions directly to the LLM.
-   **LLM with External Tools/Plugins:** Using LLM alongside external tools for information retrieval.
-   **Retrieval-Augmented Generation (RAG):** Grounding the LLM's responses in a specific knowledge base.

**Decision:**
A RAG approach was chosen as the optimal strategy. Google Gemini provides powerful LLM capabilities, and its integration will be enhanced by:
-   **Prompt Engineering:** Crafting specific instructions to guide Gemini's language adaptation (grade level, FR005) and multilingual responses (FR008).
-   **`pgvector` for Knowledge Base:** Storing the curated educational content as vector embeddings in PostgreSQL (using `pgvector`), allowing for efficient semantic search and retrieval of relevant information to "ground" Gemini's answers. This ensures accuracy (FR001, FR007) and facilitates source attribution (FR006).

**Consequences:**
-   **Positive:** Highly accurate and contextually relevant responses; reduced "hallucinations"; ability to provide sources; adaptable language and multilingual support; leverages robust PostgreSQL capabilities for vector storage.
-   **Negative:** Increased complexity in prompt management and RAG pipeline development; requires ongoing management of the knowledge base and embeddings; potential for higher computational costs for embeddings.

---
### ADR 005: Deployment Target - Local Development Environment Only

**Decision:** The application will be deployed and run exclusively within a local development environment. Cloud deployment is not required for the current scope.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
The user has specified that the Sentiabot application only needs to function locally. This simplifies the infrastructure requirements and removes the immediate need for a cloud hosting provider.

**Options Considered:**
-   **Vercel:** Optimized for Next.js applications, offering automatic scaling and serverless functions.
-   **AWS (Amazon Web Services):** Provides comprehensive cloud infrastructure with high control.
-   **Railway/Fly.io:** Flexible platforms for deploying various application types.
-   **Local Development Environment Only:** Running the application solely on a local machine.

**Decision:**
The decision is to limit the deployment target to a local development environment only, based on explicit user requirements. This approach significantly reduces initial complexity, operational overhead, and eliminates cloud hosting costs for the current project phase.

**Consequences:**
-   **Positive:** Minimal infrastructure setup, no cloud hosting costs, simplified development workflow, faster iteration cycles for local testing.
-   **Negative:** Application is not accessible to external users, requires local setup on each machine where it needs to run, scalability and production readiness concerns are deferred. This implies that testing and access will be limited to local environments.

---
### ADR 006: Real-time Capabilities - Supabase Realtime

**Decision:** Utilize Supabase Realtime for managing interactive chat experiences and potential future live updates.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
Sentiabot's core interaction is a chatbot, which inherently benefits from real-time communication to provide an instant and fluid user experience. Future enhancements might involve other live features.

**Options Considered:**
-   **Polling:** Periodically requesting updates from the server.
-   **WebSockets:** Establishing a persistent, bidirectional communication channel.
-   **BaaS Real-time Features:** Services like Supabase Realtime or Firebase Realtime Database.

**Decision:**
Supabase Realtime was chosen for its seamless integration with the existing Supabase PostgreSQL database and authentication system. It allows for instant updates to the frontend as data changes in the database, which is ideal for a responsive chat interface.

**Consequences:**
-   **Positive:** Provides a fluid, instant chat experience; simplifies real-time feature development; leverages existing Supabase integration, reducing complexity.
-   **Negative:** Relies on Supabase infrastructure for real-time capabilities; potential vendor lock-in for this specific feature.

---
### ADR 007: Email Service - Deferred

**Decision:** No dedicated email service will be implemented for the Minimum Viable Product (MVP). The decision is deferred to a later stage.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
The current functional requirements for Sentiabot do not explicitly mandate an email service for core operations. Administrative communications are expected to be handled through the application's admin interface.

**Options Considered:**
-   **Dedicated Email Services:** Resend, SendGrid, Postmark.
-   **Cloud Provider Email Services:** AWS SES.
-   **No Dedicated Service:** Defer implementation.

**Decision:**
To reduce initial complexity, development time, and external dependencies, the implementation of a dedicated email service is deferred. All essential administrative communications can be managed directly within the application's UI.

**Consequences:**
-   **Positive:** Faster MVP development, lower initial operational overhead, reduced external service costs.
-   **Negative:** Lack of automated email notifications (e.g., password resets, admin alerts), requires manual intervention for any external communication needs.

---
### ADR 008: Text-to-Speech (TTS) Integration - Deferred

**Decision:** Text-to-Speech (TTS) integration will not be implemented for the Minimum Viable Product (MVP). The decision is deferred to a later stage.

**Date:** 2025-11-30
**Status:** Accepted

**Context:**
Text-to-Speech (TTS) could enhance accessibility and engagement for younger students (FR015). However, it is not a core requirement for the MVP to deliver the primary learning experience.

**Options Considered:**
-   **Browser-Native TTS:** Leveraging built-in browser capabilities.
-   **Dedicated TTS APIs:** Services like Google Cloud Text-to-Speech or AWS Polly.
-   **No TTS Integration:** Defer implementation.

**Decision:**
To maintain focus on core MVP features and reduce initial complexity and dependencies, TTS integration is deferred. This feature can be revisited in future development phases based on user feedback and resource availability.

**Consequences:**
-   **Positive:** Faster MVP development, lower initial complexity, avoids adding external APIs until a clear need is established.
-   **Negative:** Reduced accessibility for visually impaired users or those with reading difficulties, potentially less engaging for some very young users.



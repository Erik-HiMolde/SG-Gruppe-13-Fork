# Architecture

## Executive Summary

This document outlines the architectural decisions for Sentiabot, an educational chatbot for elementary school students. The primary goal is to create a trustworthy and user-friendly tool that provides curriculum-relevant answers with easily accessible sources. The architecture prioritizes simplicity, maintainability, and alignment with modern web development practices, leveraging a React frontend, a Node.js backend (serverless functions), Google Gemini for AI, and Supabase for data persistence and authentication.

## Project Initialization

The first implementation story will involve initializing the project using the following command:

```bash
npm create vite@7.2.4 sentiabot-frontend -- --template react-ts
```

This establishes the base architecture with these decisions:

*   **Language/TypeScript:** Provided (TypeScript)
*   **Build Tool:** Provided (Vite)
*   **Project Structure:** Provided (Standard React project structure)

## Decision Summary

| Category                | Decision                  | Version                        | Affects FR Categories                           | Rationale                                                                        |
| :---------------------- | :------------------------ | :----------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------------- |
| AI Application          | Google Gemini             | Gemini 2.5 Pro                   | Chatbot Core Functionality, Knowledge Base      | User preference, powerful, and capable model.                                    |
| Data Persistence        | pgvector (on Supabase)    | 0.8.0                          | Knowledge Base, Data Management/Persistence     | User preference, good integration with existing Supabase usage, open-source.     |
| Authentication          | Supabase Auth             | Supabase managed service       | Admin Functionality                             | User preference, existing Supabase integration, secures admin interfaces.        |
| API Pattern             | REST                      | Standard HTTP/JSON             | Chatbot Core Functionality, Admin Functionality | User preference, simplicity, widespread adoption, and ease of understanding.     |
| Deployment Target       | Local                     | N/A                            | All (application availability)                  | User preference, full control over environment, ease of local development and debugging. |
| Styling Solution        | Shadcn UI        | 3.5.0                        | User Interface/Interaction                      | User preference, provides pre-built, accessible components, consistent UI.       |
| State Management        | Zustand                   | 5.0.8                          | User Interface/Interaction, Chatbot Core Functionality | User acceptance, simplicity, ease of learning, good fit for Vite/React.          |
| Cross-Cutting (Error Handling) | Standardized API error responses | N/A                            | All                                             | Simplicity, clarity, consistent user experience.                                 |
| Cross-Cutting (Logging) | Console logging           | N/A                            | All                                             | Simplicity for MVP, ease of debugging.                                           |
| Cross-Cutting (API Response Format) | Standard JSON (`data` / `error`) | N/A                            | All                                             | Consistency, ease of frontend consumption.                                       |
| Cross-Cutting (Testing) | Unit Tests (Vitest)       | N/A                            | All                                             | Ensures code quality for core logic, good fit with Vite setup.                   |

## Project Structure

```
/sentiabot-app
├── frontend/         # The Vite/React user interface
│   ├── src/
│   │   ├── api/      # Code for talking to our backend (REST API client)
│   │   ├── components/ # Reusable UI pieces (buttons, chat bubbles, MUI-based)
│   │   ├── hooks/    # Custom React hooks (e.g., useChat, useAdmin)
│   │   ├── pages/    # Main screens (ChatPage, AdminPage)
│   │   ├── store/    # Zustand "memory" stores (e.g., chatStore, adminStore)
│   │   └── styles/   # MUI theme and global styles
│   │   ├── App.tsx   # Main application component
│   │   └── main.tsx  # Entry point
│   └── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   ├── tsconfig.json # TypeScript configuration
│   └── vite.config.ts # Vite configuration
└── api/              # Our Node.js backend functions
    ├── chat.ts       # API endpoint for handling chat requests (Gemini + Supabase KB)
    └── admin/
        ├── knowledge-base.ts # API for managing the knowledge base (Supabase CRUD)
        └── system-prompt.ts  # API for updating the system prompt (Supabase)
    └── _lib/         # Shared backend utilities (e.g., Supabase client, Gemini client)
    └── package.json  # Backend dependencies (e.g., Supabase, Google AI SDK)
    └── tsconfig.json # TypeScript configuration for backend
```

## FR Category to Architecture Mapping

*   **Chatbot Core Functionality (FR003, FR006-FR008):**
    *   Frontend: `frontend/src/pages/ChatPage.tsx`, `frontend/src/components/ChatWindow.tsx`, `frontend/src/store/chatStore.ts`
    *   Backend: `api/chat.ts` (interacts with Google Gemini and Supabase pgvector)
*   **User Interface/Interaction (FR002, FR004, FR005):**
    *   Frontend: `frontend/src/components/GradeSelector.tsx`, `frontend/src/components/SubjectSelector.tsx`, `frontend/src/styles/theme.ts` (Shadcn UI styling)
    *   State Management: `frontend/src/store/userSettingsStore.ts`
*   **Data Management/Persistence (FR009 - Download Chatlog):**
    *   Frontend: Handled by client-side logic within `frontend/src/components/ChatWindow.tsx` or similar.
*   **Admin Functionality (FR010, FR011):**
    *   Frontend: `frontend/src/pages/AdminPage.tsx`, `frontend/src/components/admin/KnowledgeBaseEditor.tsx`, `frontend/src/components/admin/SystemPromptEditor.tsx`
    *   Backend: `api/admin/knowledge-base.ts`, `api/admin/system-prompt.ts`
    *   Authentication: Supabase Auth

*   **Knowledge Base (FR001, FR007):**
    *   Database: Supabase PostgreSQL with `pgvector` extension.
    *   Backend Interaction: `api/_lib/supabaseClient.ts` used by `api/chat.ts` and `api/admin/knowledge-base.ts`.

## Technology Stack Details

### Core Technologies

*   **Frontend Framework:** React (with Vite for bundling)
*   **Language:** TypeScript
*   **UI Library:** Shadcn UI
*   **State Management:** Zustand
*   **Backend Runtime:** Node.js (Local Server)
*   **AI Model:** Google Gemini (version 2.5 Pro)
*   **Database:** Supabase (PostgreSQL with `pgvector` extension)
*   **Authentication:** Supabase Auth

### Integration Points

*   **Frontend ↔ Backend:** REST API calls over HTTP/HTTPS, handled by Vercel serverless functions.
*   **Backend ↔ Google Gemini:** Utilizes the official Google AI SDK for TypeScript/JavaScript.
*   **Backend ↔ Supabase:** Utilizes the official Supabase client library for Node.js.
*   **Supabase Authentication:** Integrated for admin access control.

## Novel Pattern Designs

No novel architectural patterns are required for the MVP of this project. The architecture will be composed of established, reliable solutions and common integration patterns, tailored to meet the specific requirements of the Sentiabot application.

## Implementation Patterns

These patterns ensure consistent implementation across all development efforts:

### Naming Conventions
*   **React Components:** `PascalCase` (e.g., `ChatPage`, `UserAvatar`).
*   **Files (non-component):** `kebab-case` (e.g., `chat-api.ts`, `auth-store.ts`).
*   **Variables & Functions:** Standard `camelCase` (e.g., `userName`, `getChatHistory`).
*   **API Endpoints:** Use `kebab-case` for paths (e.g., `/api/knowledge-base`, `/api/system-prompt`).
*   **Database Tables:** `snake_case` and `plural` (e.g., `knowledge_bases`, `users`).
*   **Database Columns:** `snake_case` (e.g., `user_id`, `created_at`).

### Structure Patterns
*   The project will adhere to the defined `frontend/` and `api/` folder structure.
*   Within `frontend/src`, components, pages, stores, and API clients will reside in their dedicated directories.

### Format Patterns
*   **API Data:** All API requests and responses will use JSON. Dates will be represented as `ISO 8601` strings.
*   **Code Style:** Consistent code formatting will be enforced using Prettier.

### Communication Patterns
*   **Frontend to Backend:** REST API calls.
*   **Backend to Supabase:** Supabase client library.
*   **Backend to Google Gemini:** Google AI SDK.

### Lifecycle Patterns
*   **Loading/Pending States:** Clear loading indicators will be displayed in the UI during asynchronous operations.
*   **Error Recovery:** User-friendly error messages will be shown in the UI, with options for retry where applicable.

### Location Patterns
*   **Environment Variables:** Managed via `.env` files locally and Vercel environment variables in production.

### Consistency Patterns
*   **Date/Time Handling:** A consistent library (e.g., `date-fns` or `dayjs`) will be used on the frontend for date formatting. Dates will be stored as UTC in the database.
*   **Error Messaging:** User-facing error messages will be consistent in tone and helpfulness.

## Data Architecture

The Sentiabot will utilize **Supabase PostgreSQL** as its primary database. Key aspects include:
*   **Knowledge Base Storage:** The `pgvector` extension will be used to store vector embeddings of the curriculum knowledge, enabling semantic search and retrieval for the Gemini model.
*   **Admin Data:** User information for administrators and settings for system prompts will also be stored in PostgreSQL.
*   **Schema:** Table and column naming will follow `snake_case` conventions.

## API Contracts

The application will expose a **RESTful API** through Vercel serverless functions.
*   **Request/Response Format:** JSON.
*   **Endpoints:**
    *   `POST /api/chat`: For student chat interactions, sending questions and receiving AI responses.
    *   `GET /api/admin/knowledge-base`: Retrieve knowledge base entries.
    *   `POST /api/admin/knowledge-base`: Add new knowledge base entries.
    *   `PUT /api/admin/knowledge-base/{id}`: Update existing knowledge base entries.
    *   `DELETE /api/admin/knowledge-base/{id}`: Delete knowledge base entries.
    *   `GET /api/admin/system-prompt`: Retrieve current system prompt.
    *   `PUT /api/admin/system-prompt`: Update system prompt.
*   **Error Handling:** Standardized JSON error objects (`{ "error": { "message": "..." } }`).

## Security Architecture

*   **Authentication:** **Supabase Auth** will be used to secure access to the admin interfaces (FR010, FR011).
*   **Authorization:** Role-based access control can be implemented within Supabase policies if different levels of admin access are required in the future.
*   **Data Protection:** Supabase handles data encryption at rest and in transit.
*   **API Security:** All API endpoints will be protected as appropriate, with admin endpoints requiring authentication.

## Performance Considerations

*   **Chatbot Response Time:** Google Gemini's performance will be a primary factor. Backend optimizations will focus on efficient knowledge base retrieval (pgvector).
*   **Frontend Responsiveness:** Vite and React provide a fast, responsive UI. Shadcn UI is optimized for performance.
*   **Database Queries:** `pgvector` is optimized for vector similarity search. Proper indexing on PostgreSQL will be crucial.

## Deployment Architecture

The Sentiabot application will be deployed on **Vercel**.
*   **Frontend:** The React application will be deployed as a static site.
*   **Backend:** The Node.js API will be deployed as Vercel Serverless Functions.
*   **Environment Variables:** Managed securely through Vercel's platform.
*   **Supabase:** The database and authentication services will be hosted and managed by Supabase.

## Development Environment

### Prerequisites

*   Node.js (LTS version)
*   npm or yarn (npm recommended for consistency with `npm create vite`)
*   Git
*   Text Editor (e.g., VS Code)

### Setup Commands

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd sentiabot-app
    ```
2.  **Initialize Frontend:**
    ```bash
    cd frontend
    npm install
    # (or npm create vite@latest . -- --template react-ts if starting from scratch within frontend folder)
    ```
3.  **Initialize Backend (API):**
    ```bash
    cd api
    npm install
    ```
4.  **Configure Environment Variables:** Create `.env` files in `frontend/` and `api/` as required (e.g., Supabase URL, Supabase Anon Key, Gemini API Key).
5.  **Run Development Servers:**
    ```bash
    # In frontend directory
    npm run dev

    # Backend API development will be handled by Vercel CLI or local testing against deployed functions.
    ```

## Architecture Decision Records (ADRs)

*   **AI Model:** Google Gemini (2.5 Pro) - chosen for its capabilities and user preference. This forms the core intelligence of the chatbot.
*   **Vector Database:** pgvector on Supabase - chosen for seamless integration with existing Supabase usage and its ability to power semantic search for the knowledge base.
*   **Authentication:** Supabase Auth - chosen for securing admin interfaces, leveraging existing Supabase ecosystem for ease of development and management.
*   **API Pattern:** REST - chosen for its simplicity, widespread understanding, and efficiency for the MVP, allowing for quick development.
*   **Deployment Target:** Vercel - chosen for its excellent developer experience, optimized deployment for modern web apps, and ability to host both frontend and serverless API.
*   **Styling Solution:** Shadcn UI - chosen to quickly achieve a professional, consistent, and user-friendly interface that aligns with the PRD's design goals.
*   **State Management:** Zustand - chosen for its lightweight nature, simplicity, and excellent developer experience, suitable for managing frontend application state efficiently.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-21_
_For: BIP_
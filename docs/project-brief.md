### Project Brief: Sentiabot

**1. Project Overview**

*   **Project Name:** Sentiabot
*   **Problem Statement:** Elementary school students (ages 6-12) need a safe, reliable, and easy-to-understand source for curriculum-related information. They often struggle to find age-appropriate content and evaluate the credibility of online sources.
*   **Proposed Solution:** A web application featuring an AI chatbot that answers curriculum-relevant questions in a simple and concise manner. The chatbot will be grounded in a curated knowledge base, provide sources for its answers, and adapt its language to the student's grade level.

**2. Project Goals & Objectives**

*   **Primary Goal:** To create a trustworthy and user-friendly educational tool that helps elementary school students with their schoolwork.
*   **Key Objectives:**
    *   Develop a chatbot that accurately answers questions related to the science curriculum (initially Biology & Geology).
    *   Ensure responses are easy to understand for children aged 6-12.
    *   Provide reliable sources for all information given by the chatbot.
    *   Create a simple, minimalistic, and engaging user interface.
    *   Prevent the chatbot from fabricating information ("hallucinating") by using a dedicated knowledge base.

**3. Scope**

*   **In Scope (MVP):**
    *   A web application accessible on desktops, laptops, and tablets.
    *   Chatbot functionality for the "Science" subject (Biology & Geology).
    *   Users can select their grade level (1-7) to adapt language complexity.
    *   Users can select the language (Norwegian or English).
    *   The chatbot must provide sources for its answers.
    *   Knowledge sourced from a Supabase Vector Database.
    *   Ability for students to download their chat history.
    *   A separate admin interface for managing the knowledge base and system prompts.
*   **Out of Scope (Post-MVP):**
    *   Expansion to other subjects.
    *   Displaying images or diagrams.
    *   Text-to-speech functionality.
    *   Separate interfaces for parents.
    *   Resuming conversations by uploading chat logs.
    *   User feedback mechanism for rating answers.

**4. Target Audience**

*   **Primary Users:** Elementary school students, ages 6-12.
*   **Secondary Users:** Administrators who will maintain the knowledge base.

**5. Key Features & Functionality (MVP)**

*   **Subject Selection:** Users choose a subject before starting a chat.
*   **Grade Level Adaptation:** Users select their grade to tailor the chatbot's language.
*   **Bilingual Chat:** Users can switch between Norwegian and English.
*   **Sourced Answers:** The chatbot provides links to its information sources.
*   **Grounded Responses:** The chatbot uses a dedicated knowledge base to ensure factual accuracy.
*   **Chatlog Download:** Users can save a local copy of their conversation.
*   **Admin Panel:** A secure interface for managing the knowledge base and system prompts.

**6. Technical Stack**

*   **Frontend:** Next.js, TypeScript, Tailwind CSS, Shadcn UI
*   **Backend:** FastAPI (Python)
*   **Database:** Supabase (Postgres Vector Database)
*   **AI:** Google Gemini 2.5 Pro
*   **Authentication:** Supabase Auth
*   **Deployment:** run locally

**7. Success Metrics**

*   **Accuracy:** 95% accuracy on curriculum-related questions.
*   **Performance:** Chatbot response time of less than 10 seconds.
*   **Reliability:** The chatbot consistently uses the knowledge base and provides accurate sources.
*   **Usability:** The interface is intuitive and easy for a 6-year-old to navigate.
*   **Educational Value:** Students can successfully use the chatbot as a learning tool for science.

**8. High-Level Timeline**

*   **Week 1:** Analysis & Planning
*   **Weeks 2-3:** Solution Architecture
*   **Weeks 4-5:** Implementation
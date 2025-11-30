## Case Title
Sentiabot

## Background
Elementary school students need a place to gather information that is easy for them to understand. The chatbot also helps students find good sources, as younger students might not be critical enough with their choice of source. 

## Purpose
Create a web application capable of answering any curriculum relevant questions in an understandable and concise manner, while providing easily accessible sources to its information.

## Target Users
Children from 6 to 12 years old. Primarily elementary school students. 

## Core Functionality
Research report: Read research: @/docs/research-2025-10-30-mvp-nice-to-have.md
### Must Have (MVP)
- Feature 1: Relevant and accurate knowledge base.
- Feature 2: User friendly interface. Must be minimalistic, clear & easy to navigate with colorful design. 
- Feature 3: Working chatbot that can answer questions asked by students.
- Feature 4: Make the user choose a category within science (Biology & Geology) - to help make the context smaller for the AI.
- Feature 5: The user is able to choose what class they’re taking, so the chatbot can adapt its language to the student’s reading level.
- Feature 6: The chatbot provides sources for the answers it gives the students. 
- Feature 7: The chatbot uses the knowledgebase instead of hallucinating. The knowledgebase is hosted as a Supabase vector database. 
- Feature 8: The ability to answer questions in both Norwegian and English.
- Feature 9: The ability for students to download their chatlog locally.
- Feature 10: A separate site for admins to update the knowledgebase.
- Feature 11: System prompt in its own database field, so that an admin can debug it.

### Nice to Have (Optional Extensions)
- Feature 12: Expand the amount of subjects.
- Feature 13: Ability to show users images. These would be curriculum diagrams.
- Feature 14: Ability to log unanswered questions to a text file.
- Feature 15: Text-to-speech for younger students.
- Feature 16: Expand logging anonymized questions to find common patterns in unanswered questions for knowledgebase expansion.
- Feature 17: Separate interface for parents and students.
- Feature 18: The ability for students to upload their previous chatlogs into the chatbot to resume previous conversation.
- Feature 19: The ability for parents to give feedback on whether an answer was good or not.

## Data Requirements
- Data entity 1: An AI capable of answering relevant questions about Science from grade 1-7.
- Data entity 2: Log of questions that the chatbot was unable to answer, anonymized. This means no identifiable chat logs, no personal data collection. 


## User Flow
Research report: @/docs/research-2025-10-30-userflow.md
### Flow 1: Student using the chatbot
**Entry Point**: Student lands on homepage
1. **Landing Page**
  - Student is shown one button for each available subject. 
  - They click on the subject they want to ask questions about. 
2. **Chatbot interface**
  - Student sees the text field where they can ask the chatbot question
  - They also see a dropdown near the text field, where they can choose their grade level
  - There is also a flag nearby, which represents what language the chatbot will use. If they click the flag, they can 
    change the language.
  - If the Chatbot is unable to provide an answer, it will provide the user with alternate questions they can ask that it may be able to answer.
3. **Exit point**
  - They click on a "Home button" to return to landing page.
  - The home button will be located in the upper left corner. It has an icon of a house.
  - If they click on the icon, they will get a pop-up, warning them that the chat will be deleted. 




## Technical Specifications

### Frontend Specification
research report: @/docs/research-technical-2025-10-30-frontend.md
- **Framework**: Next.js 14+ with App Router for server-side rendering and optimal performance
- **Language**: TypeScript for type safety and better AI-assisted development
- **Styling**: Tailwind CSS for rapid, responsive UI development
- **Shadcn UI**: Shadcn UI for rapid, responsive UI development
- **Authentication UI**: Supabase Auth UI components + custom styling
- **API Communication**: Axios with interceptors for authenticated requests
- **Deployment**: Local serving for development and testing


### Backend Specification
research report: @/docs/research-technical-2025-10-30-backend.md
- **Framework**: FastAPI (Python) for high-performance RESTful API development
- **Language**: Python for AI integration compatibility and rapid development
- **Database**: Supabase (Postgres Vector database) for a managed database of curriculum 
- **Authentication**: Supabase Auth for built-in user management, JWT tokens
- **Authorization**: Row Level Security (RLS) policies in Supabase + role-based middleware (student/teacher/admin roles)
- **Database Migrations**: Alembic for version-controlled schema changes
- **AI Integration**:
  - GOOGLE Gemini 2.5 Pro API for AI chatbot
  - Custom prompt engineering for consistent AI behavior
  - Fallback logic for API failures
- **API Documentation**: FastAPI automatic OpenAPI/Swagger documentation
- **Testing**: Pytest for unit and integration tests
- **Build Tool**: UV for fast Python package management
- **Deployment**: Local serving for development and testing

**API Architecture**: RESTful API design with versioning (/api/v1/) and clear resource-oriented endpoints. Supabase Realtime for live chat instead of WebSockets.

### Database Specification
research report: @/docs/research-technical-2025-10-30-database.md
- **Database Type**: Supabase (Postgres Vector database) for a managed database of curriculum
- **Migrations**: Alembic for database schema version control
- **Hosting**: Supabase managed cloud (includes automatic backups, scaling, and monitoring)

**Schema Design**:
- Unique identifiers to track each knowledge item,
- Content fields for storing the main text or source reference,
- Vector embeddings to enable similarity search and contextual retrieval,
- Metadata attributes (e.g., topic, category, source) for filtering and organization,
- Timestamps for versioning and updates.

Function and Structure:
- The schema supports:
- Semantic search, allowing the chatbot to find relevant responses based on meaning, not just exact words.
- Contextual filtering, enabling retrieval by topic, intent, or domain.
- Scalability, so new data sources and knowledge domains can be integrated over time.
- Flexibility, accommodating multiple content types such as documents or FAQs..

### AI Integration Specification
Research report: @/docs/research-technical-2025-10-30-ai-integration.md
**AI Use Cases**:
1. **AI Chatbot**: answer user’s questions using the Supabase vector database. 

**Implementation**:
- **Model**: Gemini 2.5 pro
- **Prompt Design**:
  - Chatbot user selects their grade level, and language. These are included in the system prompt.
  - The backend then adds relevant information from the vector database to the system prompt. 
- **Rate Limiting**: Implement request queuing and caching for cost optimization
- **Cost Management**: Budget monitoring and usage alerts

**API Integration Architecture**:
- Separate service layer for AI calls
- Retry logic with exponential backoff
- Response validation and sanitization
- Caching for repeated similar scenarios

### Platform Type
**Primary Platform**: Web application (browser-based)

**Target Devices**:
- Desktop computers (primary): Windows, macOS, Linux
- Laptops (primary): All operating systems
- Tablets (secondary): iPad, Android tablets (landscape orientation recommended)
- Mobile phones (future): iOS and Android via responsive design or dedicated apps

**Browser Compatibility**:
- Chrome 90+ (primary testing target)
- Firefox 88+
- Safari 14+
- Edge 90+

**Responsive Breakpoints**:
- Desktop: 1280px+ (optimal experience)
- Laptop: 1024px-1279px (full features)
- Tablet: 768px-1023px (adapted layout)
- Mobile: 375px-767px (future phase - simplified UI)


## Timeline
Week 1: Analysis & planning.
Week 2-3: Solutions-Architecture.
Week 4-5: Implementation.

## Success Criteria
- Criterion 1: Students can learn about Science through the chatbot.
- Criterion 2: The chatbot uses the knowledgebase instead of hallucinating.
- Criterion 3: The chatbot is able to provide accurate sources to its answers. These should be provided alongside its answer in the form of a link.
- Criterion 4: Chatbot answers with 95% accuracy on curriculum related questions.
- Criterion 5: Response time of less than 10 seconds.
- Criterion 6: User friendly interface. Must be minimalistic, clear & easy to navigate with colorful design. 
- Criterion 7: The user is able to choose what class they’re taking, so the chatbot can adapt its language to the student’s reading level.
- Criterion 8: Must be able to answer students in either Norwegian or English.

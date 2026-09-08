/**
 * prompts-01.js
 * Prompt data file #1 — IDs 1-50.
 * Exposes a single global array: promptData01
 * app.js merges this with any promptData02 / promptData03 / ... that are
 * also loaded, so this file never needs to change when new batches arrive.
 *
 * IMPORTANT: declared with `var`, not `const`/`let`. A top-level `var` in a
 * classic (non-module) <script> attaches to `window`, which is how app.js
 * discovers it as `window.promptData01`. Any future prompts-02.js,
 * prompts-03.js, etc. must follow the same `var promptDataNN = [...]`
 * pattern so app.js's auto-discovery loop picks them up.
 */

var promptData01 = [

  // ================= A. LEARNING & EDUCATION (1-10) =================
  {
    id: 1,
    category: "Learning & Education",
    title: "Learn Any Subject, Beginner to Advanced",
    difficulty: "Beginner",
    promptType: "Long Prompt",
    tags: ["learning", "education", "roadmap"],
    prompt: `Role:
Act as a patient, expert tutor in [SUBJECT].

Context:
I am a [CURRENT_LEVEL] learner (e.g. complete beginner, some experience) and I want to reach a [TARGET_LEVEL] understanding of [SUBJECT] within [TIME_AVAILABLE].

Objective:
Build me a structured learning path from first principles to advanced application.

Requirements:
- Break the subject into ordered stages, each with 2-4 concrete sub-topics.
- For every stage, explain why it matters before teaching it.
- Include one small exercise or thought experiment per stage so I can check my understanding.
- Flag common misconceptions beginners have at each stage.
- Recommend how much time to spend on each stage given [TIME_AVAILABLE].

Expected Output:
A numbered stage-by-stage roadmap in a table, followed by a short explanation of stage 1 so I can start immediately.

Quality Check:
Ask me one clarifying question first if [SUBJECT] is too broad to plan against.`
  },
  {
    id: 2,
    category: "Learning & Education",
    title: "Explain a Difficult Concept Simply",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["learning", "explanation", "concept"],
    prompt: `Explain [CONCEPT] to me as if I were a smart [AUDIENCE, e.g. high-school student / new hire / non-technical manager]. Use one real-world analogy, then walk through the actual mechanism in plain language, then give one example where getting this wrong causes a real problem. Avoid jargon unless you define it immediately.`
  },
  {
    id: 3,
    category: "Learning & Education",
    title: "Understand Difficult / Abstract Concepts",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "concept", "deep-dive"],
    prompt: `Role:
Act as an expert educator who specializes in making abstract ideas concrete.

Context:
I keep struggling to build intuition for [CONCEPT] in the field of [FIELD]. I understand the definition but not why it works or when to use it.

Task:
1. Give the simplest correct mental model for [CONCEPT].
2. Show the model breaking down at the edges (where the simplification lies).
3. Give the more precise/technical version once the intuition is set.
4. Provide one worked example and one "spot the mistake" example.

Expected Output:
A short structured explanation (model → limits → precise version → examples), no more than what's needed to build real intuition.`
  },
  {
    id: 4,
    category: "Learning & Education",
    title: "Learn a Programming Language or Framework",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["learning", "programming", "roadmap"],
    prompt: `Role:
Act as a senior developer and mentor in [LANGUAGE_OR_FRAMEWORK].

Context:
Background: [YOUR_BACKGROUND, e.g. "know PHP, new to JavaScript"].
Goal: [GOAL, e.g. "build REST APIs", "build a small web app"].

Requirements:
- Plan a learning path of core concepts in the order they should be learned, not alphabetically.
- For each concept, give one minimal code example.
- Point out the top 3 mistakes people with my background typically make in [LANGUAGE_OR_FRAMEWORK].
- Suggest one small project to build after each major milestone to cement the concept.

Expected Output:
A milestone-based learning plan with code snippets and a final "build this" project idea.`
  },
  {
    id: 5,
    category: "Learning & Education",
    title: "Teach a Concept Using Real-World Examples",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["learning", "examples", "real-world"],
    prompt: `Teach me [CONCEPT] using only real-world, everyday examples from [DOMAIN, e.g. cooking, sports, business] — no textbook definitions first. Build the definition up from the examples, then state the formal definition last so I can see how it maps back to what I already understood.`
  },
  {
    id: 6,
    category: "Learning & Education",
    title: "Create a Personalized Study Plan",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["learning", "study-plan", "schedule"],
    prompt: `Role:
Act as a study coach and curriculum designer.

Context:
Goal: [GOAL, e.g. "pass AWS Solutions Architect exam", "learn data structures"].
Time available: [HOURS_PER_WEEK] hours/week for [TOTAL_WEEKS] weeks.
Current level: [CURRENT_LEVEL].
Constraints: [CONSTRAINTS, e.g. "no paid courses", "must fit around a full-time job"].

Objective:
Design a week-by-week study plan that fits the time and constraints above.

Requirements:
- Break the plan into weekly blocks with specific topics, not vague themes.
- Include short review/spaced-repetition checkpoints every 2 weeks.
- Include one practice test or applied exercise near the end of each major topic.
- Build in buffer weeks for catch-up.
- Recommend free or low-cost resources by name where relevant.

Expected Output:
A week-by-week table (Week | Topics | Practice | Checkpoint) covering the full [TOTAL_WEEKS] weeks.

Quality Check:
If [HOURS_PER_WEEK] is clearly too low for the goal, say so honestly and suggest a realistic timeline instead.`
  },
  {
    id: 7,
    category: "Learning & Education",
    title: "Exam Preparation Plan",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "exam", "revision"],
    prompt: `Role:
Act as an exam-preparation coach for [EXAM_NAME].

Context:
Exam date: [EXAM_DATE]. Weak areas so far: [WEAK_TOPICS]. Strong areas: [STRONG_TOPICS].

Task:
- Build a revision timetable that weights time toward weak areas without ignoring strong ones.
- Suggest 3 realistic mock-test checkpoints between now and the exam date.
- List common exam traps or high-frequency question types for [EXAM_NAME].
- Give a final "week before the exam" checklist.

Expected Output:
A revision timetable plus the exam-day checklist, formatted for quick daily reference.`
  },
  {
    id: 8,
    category: "Learning & Education",
    title: "Technical Interview Preparation",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["learning", "interview", "career"],
    prompt: `Role:
Act as a hiring manager and interview coach for [ROLE, e.g. "Backend PHP Developer"] positions at [COMPANY_TYPE, e.g. "mid-size product company"].

Context:
Experience level: [YEARS] years. Target role: [ROLE]. Tech stack: [TECH_STACK].

Objective:
Prepare me thoroughly for the interview loop.

Requirements:
- List the likely interview stages for this role (e.g. screening, technical, system design, behavioral).
- Generate 8-10 realistic technical questions specific to [TECH_STACK], ranging from fundamentals to scenario-based.
- Generate 3 system-design or architecture questions appropriate to [YEARS] years of experience.
- Generate 3 behavioral questions and outline what a strong STAR-format answer looks like.
- Point out 3 red flags interviewers commonly probe for at this level.

Expected Output:
A structured interview-prep guide organized by stage, with sample questions and what a strong answer demonstrates (not full scripted answers).`
  },
  {
    id: 9,
    category: "Learning & Education",
    title: "Learn by Building a Project",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "project-based", "practice"],
    prompt: `Role:
Act as a project-based learning mentor.

Context:
I want to learn [SKILL_OR_TECH] by building something real, not by following tutorials passively.

Task:
- Propose one project of appropriate difficulty for [CURRENT_LEVEL] that naturally forces me to use the core concepts of [SKILL_OR_TECH].
- Break the project into milestones, each teaching a specific concept.
- For each milestone, tell me what to research before attempting it, not how to code it directly.
- Suggest 2 stretch features for after the core project works.

Expected Output:
A milestone list (not full code) so I build understanding through struggle, with stretch goals at the end.`
  },
  {
    id: 10,
    category: "Learning & Education",
    title: "Teacher / Tutor Mode (Socratic)",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["learning", "tutor", "socratic"],
    prompt: `Role:
You are my personal tutor for [SUBJECT]. Use the Socratic method.

Rules:
- Do not give me the answer directly. Ask guiding questions that lead me to discover it myself.
- After I answer, tell me if I'm right or wrong and why, then ask the next guiding question.
- If I'm stuck twice in a row on the same point, give a small hint before the next question.
- Keep each turn short — one idea, one question.

Start by asking me a diagnostic question about [SUBJECT] to gauge my current understanding, then begin the lesson on [TOPIC].`
  },

  // ================= B. SOFTWARE ENGINEERING (11-25) =================
  {
    id: 11,
    category: "Software Development",
    title: "Design Software Architecture",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["architecture", "system-design", "backend"],
    prompt: `Role:
Act as a senior software architect with 10+ years of experience designing production systems.

Context:
Project: [PROJECT_NAME]
Purpose: [PROJECT_PURPOSE]
Expected scale: [EXPECTED_USERS_OR_LOAD]
Backend: [BACKEND, e.g. Laravel / CodeIgniter / Node.js]
Database: [DATABASE, e.g. MySQL / PostgreSQL]
Frontend: [FRONTEND, e.g. Bootstrap / React / Vue]
Constraints: [CONSTRAINTS, e.g. budget, timeline, existing legacy system]

Objective:
Design a production-ready architecture for [PROJECT_NAME].

Requirements:
- Propose a high-level architecture (monolith / modular monolith / microservices) with justification for this scale.
- Define core modules/services and their responsibilities.
- Define the data flow between the frontend, backend, and database.
- Address authentication, authorization, and caching strategy.
- Address how the system will scale if load grows 10x.
- List key architectural risks and how to mitigate them.

Expected Output:
A structured architecture document with a component diagram described in text/ASCII, module breakdown, and a risk table.

Quality Check:
Flag any requirement that contradicts the stated scale or constraints instead of silently over- or under-engineering.`
  },
  {
    id: 12,
    category: "Documentation",
    title: "Requirements Analysis & Specification",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["requirements", "business-analysis", "specification"],
    prompt: `Role:
Act as a senior business analyst and technical requirements engineer.

Context:
Client request (raw, informal): [RAW_CLIENT_REQUEST]
Business type: [BUSINESS_TYPE]
Target users: [TARGET_USERS]

Objective:
Turn this raw request into a clear, unambiguous requirements specification a development team can build from.

Requirements:
- Extract and list functional requirements, grouped by module/feature.
- Extract non-functional requirements (performance, security, scalability, compliance) implied by the context.
- Identify any requirements that are missing, contradictory, or ambiguous, and list clarifying questions for the client.
- Define acceptance criteria for each functional requirement.
- Estimate relative complexity (Low/Medium/High) per feature.

Expected Output:
A requirements document: Functional Requirements | Non-Functional Requirements | Open Questions | Acceptance Criteria | Complexity, in that order.`
  },
  {
    id: 13,
    category: "Software Development",
    title: "PHP Feature Development",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["php", "backend", "development"],
    prompt: `Role:
Act as a senior PHP developer.

Context:
Framework: [FRAMEWORK, e.g. Laravel / CodeIgniter 4 / Core PHP]
PHP version: [PHP_VERSION]
Feature to build: [FEATURE_DESCRIPTION]
Existing conventions: [CODING_CONVENTIONS, e.g. PSR-12, repository pattern]

Task:
Implement [FEATURE_DESCRIPTION] following [FRAMEWORK] best practices.

Requirements:
- Follow [CODING_CONVENTIONS] and PHP's PSR standards.
- Validate all inputs and handle errors explicitly (no silent failures).
- Use prepared statements / the framework's query builder — never raw concatenated SQL.
- Keep controllers thin; put business logic in services or models.
- Add short comments only where the logic isn't self-explanatory.

Expected Output:
Complete, runnable code for the feature, followed by a short note on how to test it manually.`
  },
  {
    id: 14,
    category: "Software Development",
    title: "CodeIgniter 4 Module Development",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["codeigniter", "php", "backend"],
    prompt: `Role:
Act as a senior CodeIgniter 4 developer.

Context:
Module: [MODULE_NAME] (e.g. "Customer Management")
Database: [DATABASE, e.g. MySQL]
Requirements: [FEATURE_LIST]

Task:
Build the [MODULE_NAME] module using CodeIgniter 4 conventions: Controller, Model, Migration, and Validation rules.

Requirements:
- Use CI4's Query Builder, not raw SQL.
- Use CI4's built-in validation library with clear rule sets.
- Follow RESTful routing conventions for CRUD actions.
- Include a migration file for the required table(s).
- Handle empty/duplicate/invalid input cases explicitly.

Expected Output:
The Controller, Model, Migration, and route definitions, followed by a one-line description of each file's responsibility.`
  },
  {
    id: 15,
    category: "Software Development",
    title: "Laravel Feature Development",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "php", "backend"],
    prompt: `Role:
Act as a senior Laravel developer.

Context:
Laravel version: [LARAVEL_VERSION]
Feature: [FEATURE_DESCRIPTION]
Database: [DATABASE]
Auth: [AUTH_METHOD, e.g. Sanctum / Breeze / custom]

Task:
Implement [FEATURE_DESCRIPTION] using Laravel best practices.

Requirements:
- Use Eloquent models and relationships correctly; avoid N+1 queries (use eager loading).
- Use Form Request classes for validation.
- Use Resource classes for API responses if this is an API feature.
- Use migrations for schema changes and seeders for sample data if relevant.
- Wrap multi-step writes in database transactions.

Expected Output:
Migration, Model, Form Request, Controller, and route entry, with a short note on any Laravel-specific gotchas relevant to this feature.`
  },
  {
    id: 16,
    category: "Software Development",
    title: "Core PHP Development (No Framework)",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["core-php", "backend", "vanilla"],
    prompt: `Role:
Act as a senior PHP developer who specializes in clean, framework-free (core) PHP.

Context:
Feature: [FEATURE_DESCRIPTION]
Database: [DATABASE, e.g. MySQL via PDO]
Constraints: [CONSTRAINTS, e.g. shared hosting, no Composer]

Task:
Build [FEATURE_DESCRIPTION] in plain PHP without a framework.

Requirements:
- Use PDO with prepared statements exclusively — no mysqli, no raw string interpolation in queries.
- Separate concerns manually: a simple router/controller layer, a data-access layer, and presentation.
- Sanitize and validate all user input before use.
- Use sessions securely (regenerate session ID on login, set secure/httponly cookies where relevant).
- Keep the folder structure organized even without a framework enforcing it.

Expected Output:
The relevant PHP files with clear separation of concerns, plus the SQL for any required tables.`
  },
  {
    id: 17,
    category: "Database Design",
    title: "MySQL Database Schema Design",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["mysql", "database", "schema"],
    prompt: `Role:
Act as a senior database architect specializing in MySQL.

Context:
System: [SYSTEM_NAME]
Core entities: [LIST_OF_ENTITIES, e.g. "users, orders, products, invoices"]
Expected scale: [EXPECTED_SCALE]
Key business rules: [BUSINESS_RULES]

Objective:
Design a normalized MySQL schema for [SYSTEM_NAME].

Requirements:
- Design tables with appropriate primary/foreign keys and data types.
- Normalize to at least 3NF, and note any deliberate denormalization with justification.
- Define indexes for the most likely query patterns.
- Handle soft deletes, timestamps, and audit fields consistently.
- Note any constraints (unique, not-null, check) needed to enforce [BUSINESS_RULES] at the database level.

Expected Output:
CREATE TABLE statements for all core entities, an entity-relationship summary in text form, and an index recommendation list.`
  },
  {
    id: 18,
    category: "Database Design",
    title: "PostgreSQL Database Schema Design",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["postgresql", "database", "schema"],
    prompt: `Role:
Act as a senior database architect specializing in PostgreSQL.

Context:
System: [SYSTEM_NAME]
Core entities: [LIST_OF_ENTITIES]
Special requirements: [SPECIAL_REQUIREMENTS, e.g. JSONB fields, full-text search, multi-tenancy]

Objective:
Design a PostgreSQL schema that takes advantage of Postgres-specific features where appropriate.

Requirements:
- Design normalized tables with correct types (use JSONB, ENUM, ARRAY types only where genuinely justified).
- Propose a multi-tenancy strategy if [SPECIAL_REQUIREMENTS] requires it (schema-per-tenant vs. shared-table with tenant_id).
- Define indexes, including partial and GIN indexes where relevant.
- Define constraints and triggers needed to enforce data integrity.
- Note where Postgres behavior differs meaningfully from MySQL for this schema.

Expected Output:
CREATE TABLE statements, index definitions, and a short section explaining the multi-tenancy or special-feature decisions made.`
  },
  {
    id: 19,
    category: "API Development",
    title: "REST API Development",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["api", "rest", "backend"],
    prompt: `Role:
Act as a senior backend engineer specializing in REST API design.

Context:
Framework: [FRAMEWORK, e.g. Laravel / CodeIgniter 4 / Node.js]
Resource(s): [RESOURCE_NAME, e.g. "products", "orders"]
Auth method: [AUTH_METHOD, e.g. token-based / Sanctum / JWT]
Consumers: [CONSUMERS, e.g. mobile app, third-party partners]

Objective:
Design and implement a REST API for [RESOURCE_NAME].

Requirements:
- Define RESTful endpoints (method + path) with correct HTTP verbs and status codes.
- Define request/response JSON structures, including pagination and error formats.
- Implement input validation and consistent error handling.
- Implement [AUTH_METHOD] and note how permissions are enforced per endpoint.
- Consider rate limiting and versioning strategy (e.g. /api/v1/).

Expected Output:
An endpoint table (Method | Path | Purpose | Auth), example request/response JSON, and the controller code for the core endpoints.`
  },
  {
    id: 20,
    category: "API Development",
    title: "Write API Documentation",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["api", "documentation"],
    prompt: `Role:
Act as a technical writer who specializes in developer-facing API documentation.

Context:
API: [API_NAME]
Endpoints to document: [ENDPOINT_LIST]
Audience: [AUDIENCE, e.g. internal team, external partners]

Task:
Write clear API documentation for the endpoints above.

Requirements:
- For each endpoint: method, path, purpose, auth requirements, request parameters (with types and whether required), and a realistic example request/response.
- Document all possible error responses with status codes and what causes them.
- Include a short "Getting Started" section (auth flow, base URL, rate limits) at the top.
- Use consistent terminology throughout — the same field name means the same thing everywhere.

Expected Output:
A documentation page in Markdown, structured as: Getting Started → Endpoint Reference → Error Codes.`
  },
  {
    id: 21,
    category: "Software Development",
    title: "Code Review",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["code-review", "quality"],
    prompt: `Role:
Act as a senior engineer performing a thorough, constructive code review.

Context:
Language/Framework: [LANGUAGE_OR_FRAMEWORK]
Code to review:
[PASTE_CODE_HERE]

Task:
Review this code for correctness, security, performance, readability, and adherence to [LANGUAGE_OR_FRAMEWORK] conventions.

Requirements:
- Point out actual bugs or edge cases that will break in production, not just style nitpicks.
- Flag any security issues (injection, unvalidated input, exposed secrets, broken auth checks).
- Suggest specific refactors with a short "before/after" where it materially improves the code.
- Separate "must fix" issues from "nice to have" suggestions.
- Acknowledge what's already done well — don't only list problems.

Expected Output:
A review organized as: Must Fix | Should Fix | Nice to Have | What's Good, with line references.`
  },
  {
    id: 22,
    category: "Software Development",
    title: "Debug an Error or Unexpected Behavior",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["debugging", "troubleshooting"],
    prompt: `Role:
Act as a senior debugger who reasons systematically rather than guessing.

Context:
Language/Framework: [LANGUAGE_OR_FRAMEWORK]
Expected behavior: [EXPECTED_BEHAVIOR]
Actual behavior: [ACTUAL_BEHAVIOR]
Error message / stack trace: [ERROR_MESSAGE]
Relevant code:
[PASTE_CODE_HERE]

Task:
Diagnose the root cause of this bug.

Requirements:
- State your top 2-3 hypotheses for the root cause, ranked by likelihood, with reasoning for each.
- Identify the single most likely cause and explain exactly why the code produces [ACTUAL_BEHAVIOR] instead of [EXPECTED_BEHAVIOR].
- Provide the corrected code.
- Suggest one test or log statement that would confirm this diagnosis if I'm unsure.

Expected Output:
Diagnosis → Root cause → Fixed code → Verification step.`
  },
  {
    id: 23,
    category: "Software Development",
    title: "Application Security Audit",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["security", "audit", "backend"],
    prompt: `Role:
Act as a senior application security auditor.

Context:
Application type: [APP_TYPE, e.g. "PHP/Laravel e-commerce site"]
Code or architecture to review:
[PASTE_CODE_OR_DESCRIBE_ARCHITECTURE]

Objective:
Identify security vulnerabilities before this reaches production.

Requirements:
- Check specifically for: SQL injection, XSS, CSRF, broken authentication/session handling, insecure direct object references, mass assignment, and exposed secrets/config.
- Rate each finding by severity (Critical / High / Medium / Low) and likely exploitability.
- Explain the exact attack scenario for each Critical/High finding.
- Provide a concrete remediation for each finding, not just "sanitize input."
- Note any missing security headers or transport-level issues (HTTPS, cookie flags).

Expected Output:
A findings table (Severity | Issue | Attack Scenario | Fix), ordered from most to least severe.`
  },
  {
    id: 24,
    category: "Testing & QA",
    title: "Write Unit Tests",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["testing", "unit-tests", "qa"],
    prompt: `Role:
Act as a senior engineer who writes thorough, maintainable tests.

Context:
Language/Framework/Testing tool: [TESTING_STACK, e.g. PHPUnit / Pest / Jest]
Function or class to test:
[PASTE_CODE_HERE]

Task:
Write unit tests that give real confidence in this code, not just coverage.

Requirements:
- Cover the happy path, boundary conditions, and at least 2 realistic failure/edge cases.
- Mock external dependencies (database, API calls, file system) rather than hitting them directly.
- Use clear, descriptive test names that state the expected behavior.
- Avoid testing implementation details that would break on harmless refactors.

Expected Output:
Complete test file(s) using [TESTING_STACK], plus a one-line summary of what each test verifies.`
  },
  {
    id: 25,
    category: "Software Development",
    title: "Performance Optimization",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["performance", "optimization", "backend"],
    prompt: `Role:
Act as a senior performance engineer.

Context:
Stack: [TECH_STACK]
Symptom: [PERFORMANCE_SYMPTOM, e.g. "page takes 4s to load", "API times out under load"]
Relevant code / query / profiling data:
[PASTE_CODE_OR_METRICS]

Objective:
Diagnose and fix the performance bottleneck.

Requirements:
- Identify the most likely bottleneck layer (database query, N+1 queries, missing index, unoptimized loop, network call, rendering) with reasoning.
- Provide the optimized version of the code/query.
- Explain the expected performance impact of the fix (why it's faster, not just that it is).
- Suggest one monitoring/metric to track so this regression is caught earlier next time.
- Note any trade-offs the optimization introduces (e.g. added complexity, cache staleness).

Expected Output:
Bottleneck diagnosis → Optimized code → Expected impact → Trade-offs → Monitoring suggestion.`
  },

  // ================= C. ERP / BUSINESS SOFTWARE (26-35) =================
  {
    id: 26,
    category: "ERP Software",
    title: "Design an ERP System",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["erp", "architecture", "business-software"],
    prompt: `Role:
Act as a senior software architect and business analyst specializing in ERP systems.

Context:
Business type: [BUSINESS_TYPE]
Modules needed: [MODULE_LIST, e.g. "Inventory, Sales, Purchase, Accounting, HR"]
Number of users: [USER_COUNT]
Backend: [BACKEND] | Database: [DATABASE] | Frontend: [FRONTEND]

Objective:
Design a modular ERP architecture for [BUSINESS_TYPE].

Requirements:
- Define each module's core responsibilities and how modules share data (e.g. Sales creates a transaction that Accounting must post).
- Design role-based access control (who can see/edit what across modules).
- Address multi-branch or multi-location support if relevant to [BUSINESS_TYPE].
- Define the core database entities shared across modules (e.g. a central "party" table for both customers and vendors).
- Identify integration points (payment gateway, SMS/email, accounting export).

Expected Output:
A module map, a shared-entity schema outline, and an access-control matrix (Role x Module: view/edit/approve).`
  },
  {
    id: 27,
    category: "HRMS Software",
    title: "Design an HRMS System",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["hrms", "architecture", "business-software"],
    prompt: `Role:
Act as a senior software architect specializing in HR software.

Context:
Company size: [EMPLOYEE_COUNT]
Modules needed: [MODULE_LIST, e.g. "Attendance, Payroll, Leave, Recruitment, Performance"]
Backend: [BACKEND] | Database: [DATABASE]

Objective:
Design a multi-module HRMS for a company of this size.

Requirements:
- Define the core entities: employee, department, designation, shift, salary structure.
- Design how Attendance feeds into Payroll calculation, including overtime and deductions.
- Design Leave module rules: leave types, accrual, approval hierarchy, carry-forward.
- Define role-based access (HR admin, manager, employee self-service).
- Address statutory/compliance fields relevant to [COMPANY_TYPE_OR_COUNTRY] if specified.

Expected Output:
Module breakdown, core entity schema, and the Attendance → Payroll data flow explained step by step.`
  },
  {
    id: 28,
    category: "School Management Software",
    title: "Design a School Management System",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["school-erp", "education-software", "architecture"],
    prompt: `Role:
Act as a senior software architect specializing in education-sector software.

Context:
Type: [SCHOOL_TYPE, e.g. K-12 private school, multi-branch chain]
Modules needed: [MODULE_LIST, e.g. "Admissions, Attendance, Fees, Exams, Timetable, Parent Portal"]
Multi-tenant: [YES_OR_NO — single school vs SaaS for many schools]

Objective:
Design the system architecture and core data model.

Requirements:
- Define core entities: student, class/section, subject, teacher, guardian, academic year.
- Design the Fees module: fee structure, installments, discounts/scholarships, receipts.
- Design the Exams module: grading scheme, report cards, term-wise results.
- If multi-tenant, define the tenant-isolation strategy at the database level.
- Define role-based portals: admin, teacher, student, parent.

Expected Output:
Core entity schema, module responsibilities, and a note on the multi-tenancy approach if applicable.`
  },
  {
    id: 29,
    category: "College Management Software",
    title: "Design a College Management System",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["college-erp", "education-software", "architecture"],
    prompt: `Role:
Act as a senior software architect specializing in higher-education software.

Context:
Type: [COLLEGE_TYPE, e.g. multi-department engineering college]
Modules needed: [MODULE_LIST, e.g. "Admissions, Course Registration, Attendance, Exams, Library, Hostel"]

Objective:
Design the system architecture and core data model for [COLLEGE_TYPE].

Requirements:
- Model the credit-based course/semester structure (courses, electives, prerequisites).
- Design course registration rules (seat limits, prerequisite checks, add/drop windows).
- Design the Exams module for a credit/GPA system distinct from a simple pass/fail school model.
- Define role-based portals: admin, HOD, faculty, student.
- Note where this data model must differ from a simple K-12 school ERP.

Expected Output:
Core entity schema, module responsibilities, and the course registration workflow explained step by step.`
  },
  {
    id: 30,
    category: "ERP Software",
    title: "Inventory Management System Design",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["inventory", "erp", "warehouse"],
    prompt: `Role:
Act as a senior software architect specializing in inventory and warehouse systems.

Context:
Business type: [BUSINESS_TYPE]
Number of warehouses/locations: [LOCATION_COUNT]
Needs: [NEEDS, e.g. "batch/expiry tracking", "barcode scanning", "multi-unit conversion"]

Objective:
Design an inventory management data model and core workflows.

Requirements:
- Define entities: product, category, unit of measure, warehouse/location, stock ledger.
- Design stock movement types (purchase-in, sale-out, transfer, adjustment, return) and how each affects the stock ledger.
- Address [NEEDS] specifically (e.g. FIFO/expiry-based stock deduction if batch tracking is needed).
- Define low-stock alerting and reorder-point logic.
- Ensure the stock ledger design supports an accurate point-in-time stock report (no double-counting).

Expected Output:
Core entity schema, the stock-movement-to-ledger mapping table, and the reorder logic explained.`
  },
  {
    id: 31,
    category: "ERP Software",
    title: "Accounting / Business Workflow Design",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["accounting", "erp", "workflow"],
    prompt: `Role:
Act as a senior software architect and functional accounting consultant.

Context:
Business type: [BUSINESS_TYPE]
Accounting needs: [NEEDS, e.g. "double-entry ledger", "GST/VAT compliant invoicing", "multi-currency"]

Task:
Design the core accounting data model and posting workflow.

Requirements:
- Define chart-of-accounts structure and core entities (ledger, voucher, journal entry).
- Design how a sales invoice automatically generates the correct double-entry postings.
- Address tax handling per [NEEDS] (e.g. GST breakdown, rounding rules).
- Define an audit trail so no posted entry can be silently altered.

Expected Output:
Core entity schema, and a worked example showing exactly which ledger entries a single sales invoice creates.`
  },
  {
    id: 32,
    category: "HRMS Software",
    title: "Employee Attendance System Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["attendance", "hrms", "workflow"],
    prompt: `Role:
Act as a senior software architect specializing in workforce systems.

Context:
Attendance capture method: [METHOD, e.g. biometric, mobile GPS check-in, web portal]
Shift types: [SHIFT_TYPES, e.g. fixed, rotating, flexible]

Task:
Design the attendance module's data model and rules engine.

Requirements:
- Define entities: shift, employee-shift assignment, attendance log, regularization request.
- Design how late-arrival, early-leave, half-day, and overtime are calculated from raw check-in/check-out times.
- Design the manager-approval workflow for attendance regularization requests.
- Address how this module hands off clean data to payroll at month-end.

Expected Output:
Core entity schema and the calculation rules explained as pseudocode or a decision table.`
  },
  {
    id: 33,
    category: "HRMS Software",
    title: "Leave Management System Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["leave-management", "hrms", "workflow"],
    prompt: `Role:
Act as a senior software architect specializing in HR systems.

Context:
Leave types: [LEAVE_TYPES, e.g. casual, sick, earned/annual, unpaid]
Policy notes: [POLICY_NOTES, e.g. "earned leave accrues monthly, max carry-forward 15 days"]

Task:
Design the leave management data model and approval workflow.

Requirements:
- Define entities: leave type, leave balance, leave request, approval chain.
- Model accrual logic per [POLICY_NOTES] and how carry-forward/expiry is handled at year-end.
- Design a multi-level approval workflow (e.g. manager → HR) with reject/return-for-correction states.
- Ensure the design prevents a rejected or cancelled request from ever double-counting against the balance.

Expected Output:
Core entity schema, the accrual/carry-forward logic, and the approval state machine (states + transitions).`
  },
  {
    id: 34,
    category: "AI Automation",
    title: "Design a Multi-Level Approval Workflow",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["workflow", "approval", "automation"],
    prompt: `Role:
Act as a senior business process architect.

Context:
Process needing approval: [PROCESS_NAME, e.g. "purchase order", "expense reimbursement"]
Approval hierarchy: [HIERARCHY, e.g. "requester → manager → finance, with a higher threshold escalating to director"]

Task:
Design a generic, reusable approval-workflow engine for [PROCESS_NAME].

Requirements:
- Model it as a state machine: draft → submitted → in-review (per level) → approved/rejected → (optional) escalated.
- Support conditional routing (e.g. amount-based escalation) without hardcoding rules into application code.
- Define what happens on rejection (return to requester with comments vs. terminate).
- Include a notification point at each state transition.

Expected Output:
The state machine (states + transitions + conditions) and the core "approval_step" entity schema that makes it reusable across different process types.`
  },
  {
    id: 35,
    category: "AI Automation",
    title: "Identify Business Process Automation Opportunities",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["automation", "business-process", "efficiency"],
    prompt: `Role:
Act as a senior business automation consultant.

Context:
Business: [BUSINESS_TYPE]
Current process (described step by step): [CURRENT_PROCESS_DESCRIPTION]
Current pain points: [CURRENT_PROBLEM]

Objective:
Identify where this process can be automated and propose a solution.

Requirements:
- Break the described process into discrete steps and mark each as: fully manual, partially automatable, or already automated.
- For each automatable step, name the specific automation approach (e.g. scheduled job, workflow trigger, form + rules engine, notification automation) — avoid vague "use AI" suggestions.
- Estimate the relative effort (Low/Medium/High) and impact (Low/Medium/High) of automating each step.
- Recommend the order to tackle them (highest impact-to-effort ratio first).
- Flag any step that should stay manual due to risk, compliance, or judgment needs.

Expected Output:
A table (Step | Current State | Automation Approach | Effort | Impact | Priority) followed by a short implementation roadmap.`
  },

  // ================= D. E-COMMERCE (36-40) =================
  {
    id: 36,
    category: "E-commerce",
    title: "Design an E-commerce Platform",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ecommerce", "architecture", "platform"],
    prompt: `Role:
Act as a senior software architect specializing in e-commerce platforms.

Context:
Business type: [BUSINESS_TYPE, e.g. "fashion retail D2C"]
Expected scale: [EXPECTED_SCALE]
Backend: [BACKEND] | Database: [DATABASE] | Frontend: [FRONTEND]
Payment/shipping needs: [PAYMENT_SHIPPING_NEEDS]

Objective:
Design the core architecture for an e-commerce platform for [BUSINESS_TYPE].

Requirements:
- Define core modules: catalog, cart, checkout, order management, inventory, customer accounts.
- Design the catalog data model to support variants (size/color) and pricing rules (sale price, bulk discount).
- Design the cart-to-order flow including stock reservation to prevent overselling.
- Address [PAYMENT_SHIPPING_NEEDS] integration points.
- Note caching strategy for high-traffic pages (product listing, product detail).

Expected Output:
Module map, catalog/order core schema, and the cart-to-order flow explained step by step.`
  },
  {
    id: 37,
    category: "Multi-Vendor E-commerce",
    title: "Design a Multi-Vendor Marketplace",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["marketplace", "multi-vendor", "ecommerce"],
    prompt: `Role:
Act as a senior software architect specializing in multi-vendor marketplaces.

Context:
Marketplace type: [MARKETPLACE_TYPE, e.g. "handmade goods", "electronics"]
Vendor onboarding needs: [ONBOARDING_NEEDS, e.g. KYC, commission agreement]
Commission model: [COMMISSION_MODEL]

Objective:
Design the core marketplace architecture distinct from a single-seller store.

Requirements:
- Define vendor, vendor-store, and product-ownership entities (a product belongs to exactly one vendor).
- Design order-splitting: a single customer order containing items from multiple vendors must split into per-vendor sub-orders for fulfillment.
- Design the commission/payout model per [COMMISSION_MODEL] and when payouts are triggered (on delivery, on a schedule, etc.).
- Design vendor-facing permissions (a vendor sees only their own products/orders).
- Address returns/refunds when items came from different vendors in one order.

Expected Output:
Core entity schema, the order-splitting logic, and the payout calculation explained with a worked example.`
  },
  {
    id: 38,
    category: "E-commerce",
    title: "Product Catalog System Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["catalog", "ecommerce", "database"],
    prompt: `Role:
Act as a senior backend engineer specializing in e-commerce catalogs.

Context:
Product types: [PRODUCT_TYPES, e.g. "simple products and variant products (size/color)"]
Attributes needed: [ATTRIBUTE_LIST, e.g. brand, material, size]

Task:
Design a flexible product catalog schema.

Requirements:
- Support both simple and variant products without duplicating shared data.
- Support category hierarchy (category with subcategories, arbitrary depth).
- Support flexible attributes (EAV pattern or JSON attributes) without over-engineering for [ATTRIBUTE_LIST]'s actual scope.
- Design indexes for the most common storefront queries (filter by category + attribute, search by name).

Expected Output:
CREATE TABLE statements for the catalog schema and one example query showing how a filtered product listing would be fetched.`
  },
  {
    id: 39,
    category: "E-commerce",
    title: "Order, Payment & Shipping Workflow",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["order-management", "payment", "shipping"],
    prompt: `Role:
Act as a senior backend engineer specializing in order-management systems.

Context:
Payment gateway: [PAYMENT_GATEWAY]
Shipping method: [SHIPPING_METHOD, e.g. own delivery, third-party courier API]

Task:
Design the order lifecycle from checkout to delivery.

Requirements:
- Model the order status state machine (e.g. pending → paid → processing → shipped → delivered → returned/cancelled).
- Design how a webhook from [PAYMENT_GATEWAY] updates order status reliably (handle out-of-order or duplicate webhook delivery).
- Design how a shipping status update from [SHIPPING_METHOD] flows back into the order record.
- Define what triggers customer notifications at each state change.
- Address partial shipments/refunds if the order has multiple items.

Expected Output:
The order state machine (states + transitions + triggers) and the webhook-handling logic for both payment and shipping updates.`
  },
  {
    id: 40,
    category: "Business Growth",
    title: "E-commerce Business Growth Plan",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ecommerce", "growth", "strategy"],
    prompt: `Role:
Act as a senior e-commerce growth consultant.

Context:
Store type: [STORE_TYPE]
Current monthly traffic: [TRAFFIC]
Current conversion rate: [CONVERSION_RATE]
Main growth challenge: [CURRENT_PROBLEM]

Task:
Propose a focused growth plan addressing [CURRENT_PROBLEM].

Requirements:
- Diagnose whether the core issue is traffic, conversion, retention, or average order value, based on the numbers given.
- Propose 3-5 specific, testable initiatives (not generic "improve SEO" advice) tied to the diagnosed issue.
- For each initiative, state the expected impact and how you'd measure success.
- Sequence the initiatives by expected ROI and implementation effort.

Expected Output:
Diagnosis paragraph, then an initiative table (Initiative | Target Metric | Expected Impact | Effort | Priority).`
  },

  // ============ E. BUSINESS GROWTH & ANALYSIS (41-45) ============
  {
    id: 41,
    category: "Business Analysis",
    title: "Business Situation Analysis",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["business-analysis", "diagnosis"],
    prompt: `Role:
Act as a senior business analyst.

Context:
Business type: [BUSINESS_TYPE]
Current situation: [CURRENT_SITUATION_DESCRIPTION]
Specific concern: [CURRENT_PROBLEM]

Task:
Analyze this situation and identify the real underlying issue, not just the symptom.

Requirements:
- Ask clarifying questions only if the numbers/context given are insufficient to reason about [CURRENT_PROBLEM].
- Use a simple framework (e.g. SWOT, or root-cause "5 whys") explicitly, don't just narrate opinions.
- Distinguish between the symptom described and the likely root cause.
- Propose 2-3 concrete next steps, each with what evidence would confirm or rule it out.

Expected Output:
Framework applied → root-cause hypothesis → recommended next steps with validation method for each.`
  },
  {
    id: 42,
    category: "Business Growth",
    title: "Business Growth Strategy",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["growth", "strategy", "business"],
    prompt: `Role:
Act as a senior business growth strategist.

Context:
Business: [BUSINESS_TYPE]
Current revenue stage: [REVENUE_STAGE]
Target: [GROWTH_TARGET] within [TIMEFRAME]
Constraints: [CONSTRAINTS, e.g. budget, team size]

Objective:
Propose a realistic growth strategy to reach [GROWTH_TARGET] within [TIMEFRAME].

Requirements:
- Identify the 2-3 highest-leverage growth levers for this specific business type and stage (not a generic list of every possible channel).
- For each lever, describe the specific action, expected timeline to see results, and rough cost/effort.
- Flag which levers depend on each other (e.g. can't scale ads before conversion rate is fixed).
- Note the biggest risk to hitting [GROWTH_TARGET] and how to mitigate it.
- Be explicit if [GROWTH_TARGET] in [TIMEFRAME] looks unrealistic given [CONSTRAINTS], and propose an adjusted target.

Expected Output:
A prioritized lever list with rationale, a rough timeline, and an honest feasibility assessment.`
  },
  {
    id: 43,
    category: "Business Ideas",
    title: "Generate & Validate Business Ideas",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["business-ideas", "validation", "startup"],
    prompt: `Role:
Act as a startup advisor and market analyst.

Context:
My background/skills: [YOUR_BACKGROUND]
Interests/industries: [INTERESTS]
Resources available: [RESOURCES, e.g. budget, time, existing network]

Task:
Generate business ideas that genuinely fit my background and resources, then stress-test them.

Requirements:
- Propose 3-5 ideas that specifically leverage [YOUR_BACKGROUND], not generic trending ideas.
- For each idea, state the target customer, the core problem it solves, and how it would make money.
- Identify the single biggest reason each idea could fail (market, execution, capital).
- Rank the ideas by how quickly one could validate demand with minimal spend.

Expected Output:
An idea table (Idea | Target Customer | Revenue Model | Biggest Risk | Validation Speed), with the top recommendation explained.`
  },
  {
    id: 44,
    category: "AI Automation",
    title: "Find Automation Opportunities Across the Business",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["automation", "efficiency", "ai"],
    prompt: `Role:
Act as a business automation consultant with strong AI-tooling knowledge.

Context:
Business: [BUSINESS_TYPE]
Team size: [TEAM_SIZE]
Departments/functions: [DEPARTMENT_LIST, e.g. "sales, support, operations, finance"]

Task:
Scan across the listed departments and identify realistic automation opportunities.

Requirements:
- For each department, name one recurring, repetitive task that consumes real time today.
- Propose a specific automation approach for each (workflow tool, scheduled script, AI-assisted drafting, rules-based routing) — no vague "use AI for everything."
- Note the data or system prerequisite each automation needs to actually work.
- Rank all opportunities by estimated hours saved per week versus setup effort.

Expected Output:
A department-by-department table (Department | Repetitive Task | Automation Approach | Prerequisite | Est. Hours Saved/Week).`
  },
  {
    id: 45,
    category: "Business Analysis",
    title: "ROI Analysis for a Business Decision",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["roi", "business-analysis", "finance"],
    prompt: `Role:
Act as a senior business analyst specializing in ROI and investment decisions.

Context:
Decision being considered: [DECISION_DESCRIPTION, e.g. "hire 2 more sales reps", "build vs. buy a CRM"]
Estimated cost: [ESTIMATED_COST]
Expected benefit: [EXPECTED_BENEFIT]
Time horizon: [TIME_HORIZON]

Task:
Analyze whether this decision is worth making.

Requirements:
- Lay out the full cost side, including hidden/ongoing costs, not just the headline number.
- Lay out the benefit side with explicit assumptions stated (don't hide assumptions inside a single number).
- Calculate a simple payback period and/or ROI% using the numbers given.
- State the 2 assumptions the conclusion is most sensitive to, and what happens if they're wrong.
- Give a clear go / no-go / "needs more data" recommendation.

Expected Output:
Cost breakdown → benefit breakdown → payback/ROI calculation → sensitivity note → recommendation.`
  },

  // ======= F. CREATIVE / GRAPHIC / AI GENERATION (46-50) =======
  {
    id: 46,
    category: "UI/UX Design",
    title: "UI/UX Design Review & Direction",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ui-ux", "design", "review"],
    prompt: `Role:
Act as a senior UI/UX designer.

Context:
Product: [PRODUCT_NAME]
Screen/flow to design or review: [SCREEN_OR_FLOW_DESCRIPTION]
Target users: [TARGET_USERS]
Platform: [PLATFORM, e.g. web dashboard, mobile app]

Task:
[Design / Review] the [SCREEN_OR_FLOW_DESCRIPTION] for [TARGET_USERS].

Requirements:
- Identify the single primary action this screen should make effortless, and everything that competes with it.
- Recommend an information hierarchy (what's seen first, second, third) and why.
- Flag any usability issue a first-time user would hit (unclear labels, hidden actions, ambiguous states).
- Recommend a layout structure in plain language or ASCII wireframe, not visual styling.
- Note one accessibility consideration relevant to this screen.

Expected Output:
Primary-action analysis → hierarchy recommendation → usability flags → wireframe sketch (ASCII/text).`
  },
  {
    id: 47,
    category: "Image Generation",
    title: "AI Image Generation Prompt Builder",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["image-generation", "ai-art", "prompt"],
    prompt: `Write an image-generation prompt for: [IMAGE_SUBJECT]. Include: subject and pose, setting/background, lighting (e.g. golden hour, studio softbox), camera/lens feel (e.g. 35mm, shallow depth of field) or art style (e.g. flat vector, watercolor), color palette, and mood in one word. Keep it to a single dense paragraph, no more than 60 words, with no contradictory instructions.`
  },
  {
    id: 48,
    category: "Video Generation",
    title: "AI Video Generation Prompt Builder",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["video-generation", "ai-video", "prompt"],
    prompt: `Role:
Act as a prompt engineer for AI video-generation tools.

Context:
Video concept: [VIDEO_CONCEPT]
Desired length: [LENGTH_SECONDS] seconds
Style: [STYLE, e.g. cinematic, product ad, animated explainer]

Task:
Write a structured video-generation prompt.

Requirements:
- Describe the opening shot precisely (subject, framing, camera movement).
- Describe how the shot evolves over [LENGTH_SECONDS] seconds (camera motion, subject action, any transition).
- Specify lighting, color grade, and pacing (slow/deliberate vs. fast-cut).
- State what must NOT appear (text overlays, watermarks, extra people) if relevant.
- Keep the whole prompt as one coherent paragraph the tool can parse without contradictions.

Expected Output:
A single ready-to-use video-generation prompt following the structure above.`
  },
  {
    id: 49,
    category: "Poster Design",
    title: "Poster / Brochure Design Brief",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["poster", "brochure", "design-brief"],
    prompt: `Role:
Act as a senior graphic designer writing a design brief.

Context:
Item: [POSTER_OR_BROCHURE]
Purpose: [PURPOSE, e.g. "product launch", "college fest"]
Audience: [TARGET_AUDIENCE]
Key info to include: [KEY_INFO, e.g. event name, date, venue, offer]

Task:
Write a complete design brief for this [POSTER_OR_BROCHURE].

Requirements:
- Define the single most important element that should draw the eye first.
- Specify a layout hierarchy for the remaining text/info in [KEY_INFO].
- Suggest a color and typography direction that fits [PURPOSE] and [TARGET_AUDIENCE] specifically, not a generic default look.
- List all mandatory elements (logo, disclaimer, contact info) that must not be omitted.
- Note the required size/orientation and print vs. digital use.

Expected Output:
A design brief a designer could execute directly, structured as: Focal Point → Layout Hierarchy → Color/Type Direction → Mandatory Elements → Format Specs.`
  },
  {
    id: 50,
    category: "Social Media Posts",
    title: "Social Media Marketing Post",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["social-media", "marketing", "copywriting"],
    prompt: `Role:
Act as a senior social media copywriter.

Context:
Platform: [PLATFORM, e.g. Instagram, LinkedIn]
Product/topic: [PRODUCT_OR_TOPIC]
Goal: [GOAL, e.g. drive signups, build awareness]
Brand tone: [BRAND_TONE, e.g. playful, professional, bold]

Task:
Write a social media post for [PLATFORM] promoting [PRODUCT_OR_TOPIC].

Requirements:
- Open with a hook relevant to the actual audience pain point, not a generic attention-grab.
- Keep the tone consistent with [BRAND_TONE] throughout.
- Include one clear call-to-action that matches [GOAL].
- Match the length and format conventions of [PLATFORM] (e.g. short and punchy for X, slightly longer and structured for LinkedIn).
- Suggest 3-5 relevant hashtags only if appropriate for [PLATFORM].

Expected Output:
The finished post copy, formatted exactly as it would be published, with hashtags listed separately at the end.`
  }

];

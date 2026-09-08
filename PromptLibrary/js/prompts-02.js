/**
 * prompts-02.js
 * Prompt data file #2 — IDs 51-100.
 * Focus: deeper coverage of categories already introduced in
 * prompts-01.js — more PHP/Laravel/CodeIgniter/Core PHP scenarios,
 * more ERP/HRMS/School/College module variety — rather than new
 * top-level categories.
 *
 * IMPORTANT: declared with `var`, matching prompts-01.js, so it
 * attaches to `window.promptData02` and app.js's auto-discovery
 * loop picks it up automatically. No other file needs to change —
 * index.html just needs <script src="js/prompts-02.js"></script>
 * added before <script src="js/app.js"></script>.
 */

var promptData02 = [

  // ============= A. LEARNING & EDUCATION (51-55) =============
  {
    id: 51,
    category: "Learning & Education",
    title: "Compare Two Technologies Before Choosing",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "decision-making", "technology"],
    prompt: `Role:
Act as a senior engineer who has shipped production systems with both options.

Context:
Choosing between: [OPTION_A] vs [OPTION_B] (e.g. "Laravel vs CodeIgniter 4", "MySQL vs PostgreSQL")
Project context: [PROJECT_CONTEXT, e.g. team size, timeline, existing skills, expected scale]

Task:
Help me choose based on my actual context, not a generic feature comparison.

Requirements:
- Identify the 3-4 factors that actually matter for [PROJECT_CONTEXT] (not every possible dimension).
- Score both options honestly on those factors, including where each is genuinely weaker.
- State which option you'd pick for this specific context and why.
- Note the one scenario where the opposite choice would actually be correct.

Expected Output:
A short factor-by-factor comparison table, followed by a direct recommendation with reasoning.`
  },
  {
    id: 52,
    category: "Learning & Education",
    title: "Learn From a Failed or Struggling Project (Post-Mortem)",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "post-mortem", "reflection"],
    prompt: `Role:
Act as a senior engineering lead conducting a blameless post-mortem.

Context:
Project: [PROJECT_NAME]
What went wrong: [WHAT_WENT_WRONG]
Timeline/deadline pressure: [TIMELINE_CONTEXT]

Task:
Help me extract real, reusable lessons from this — not vague regret.

Requirements:
- Separate what was a process failure, a technical failure, and a communication failure.
- For each failure, identify the earliest point it could have been caught.
- Turn each lesson into one specific, concrete habit or checklist item I can apply next time (not "be more careful").
- Avoid assigning blame to any individual — focus on the system that allowed the failure.

Expected Output:
Failure breakdown (process / technical / communication) → earliest catch point for each → one concrete habit per lesson.`
  },
  {
    id: 53,
    category: "Learning & Education",
    title: "Career Switch / Growth Roadmap",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["learning", "career", "roadmap"],
    prompt: `Role:
Act as a career mentor for software professionals.

Context:
Current role: [CURRENT_ROLE], [YEARS] years of experience, stack: [CURRENT_STACK]
Target role: [TARGET_ROLE, e.g. "Full-stack lead", "DevOps engineer", "Solutions architect"]
Timeframe: [TIMEFRAME]
Constraints: [CONSTRAINTS, e.g. still working full-time, limited budget for courses]

Objective:
Build a realistic roadmap from [CURRENT_ROLE] to [TARGET_ROLE].

Requirements:
- Identify the specific skill gaps between [CURRENT_STACK]/[CURRENT_ROLE] and [TARGET_ROLE] — be concrete, not generic ("learn cloud" is not concrete; "get hands-on with AWS ECS + Terraform" is).
- Sequence the gaps by dependency (what must be learned before what).
- Suggest how to gain visible proof of each skill (a project, a contribution, a certification) given [CONSTRAINTS].
- Flag which skill gap is the single biggest blocker and why.
- Give an honest opinion on whether [TIMEFRAME] is realistic.

Expected Output:
A phased roadmap (Phase | Skill Gap | How to Prove It | Est. Time) plus an honest feasibility note on the timeframe.`
  },
  {
    id: 54,
    category: "Learning & Education",
    title: "Certification Exam Readiness Plan",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["learning", "certification", "exam"],
    prompt: `Role:
Act as a certification exam coach for [CERTIFICATION_NAME].

Context:
Current familiarity: [CURRENT_FAMILIARITY]
Exam date target: [TARGET_DATE]
Hours available per week: [HOURS_PER_WEEK]

Task:
Assess whether I'm on track and build the remaining study plan.

Requirements:
- List the exam's major domains and their approximate weight in the exam.
- Based on [CURRENT_FAMILIARITY], flag which domains are highest-risk for me.
- Build a study plan for the remaining time that weights effort toward the highest-risk, highest-weight domains first.
- Suggest how to simulate exam conditions before the real attempt.

Expected Output:
Domain-by-domain risk assessment, then a prioritized study plan for the time remaining.`
  },
  {
    id: 55,
    category: "Learning & Education",
    title: "Teach What You Just Learned (Feynman Technique)",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["learning", "feynman-technique", "retention"],
    prompt: `I just learned [CONCEPT_OR_FEATURE, e.g. "Laravel service containers"]. Here's my explanation of it in my own words: [YOUR_EXPLANATION]. Act as a strict but fair reviewer: point out exactly where my explanation is vague, wrong, or hand-waving over something I don't actually understand yet, then help me tighten it into a version I could teach to a junior developer in two minutes.`
  },

  // ===== B. SOFTWARE DEVELOPMENT — PHP / LARAVEL / CODEIGNITER / CORE PHP, DB, API, TESTING, DOCS (56-77) =====
  {
    id: 56,
    category: "Software Development",
    title: "Laravel Eloquent Relationships & Query Optimization",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "eloquent", "performance"],
    prompt: `Role:
Act as a senior Laravel developer specializing in Eloquent performance.

Context:
Models involved: [MODEL_LIST, e.g. "User, Order, OrderItem, Product"]
Relationship shape: [RELATIONSHIP_DESCRIPTION, e.g. "User hasMany Orders, Order hasMany OrderItems"]
Symptom: [SYMPTOM, e.g. "listing page is slow", "N+1 warnings in debugbar"]

Task:
Diagnose and fix the Eloquent usage.

Requirements:
- Identify likely N+1 query patterns given [RELATIONSHIP_DESCRIPTION] and show the eager-loading fix (with()/load()).
- Recommend when to use a relationship method vs. a dedicated query scope vs. a raw query for this case.
- Show how to select only needed columns to avoid over-fetching.
- Note if a database index is likely missing given the query pattern.

Expected Output:
The problematic query pattern, the corrected Eloquent code, and a one-line explanation of why it's faster.`
  },
  {
    id: 57,
    category: "Software Development",
    title: "Laravel Queues & Background Jobs Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "queues", "jobs"],
    prompt: `Role:
Act as a senior Laravel developer specializing in asynchronous processing.

Context:
Task to move to background: [TASK_DESCRIPTION, e.g. "sending invoice emails with PDF generation"]
Queue driver: [QUEUE_DRIVER, e.g. Redis, database, SQS]
Volume: [EXPECTED_VOLUME]

Task:
Design the job(s) needed to move [TASK_DESCRIPTION] off the request cycle.

Requirements:
- Define the Job class structure, including what data it needs serialized (avoid passing whole Eloquent models where a lightweight ID is enough).
- Define retry behavior: max attempts, backoff strategy, and what happens on final failure.
- Decide if this needs one job or should be split into smaller chained/batched jobs.
- Note how to monitor failed jobs in production.

Expected Output:
The Job class code, queue configuration notes, and the retry/failure-handling strategy explained.`
  },
  {
    id: 58,
    category: "Software Development",
    title: "Laravel Multi-Tenancy Architecture",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["laravel", "multi-tenancy", "saas"],
    prompt: `Role:
Act as a senior Laravel architect specializing in multi-tenant SaaS applications.

Context:
Product: [PRODUCT_NAME]
Expected tenant count: [TENANT_COUNT]
Isolation requirement: [ISOLATION_REQUIREMENT, e.g. "strict data isolation for compliance" vs "cost efficiency is more important"]

Objective:
Design the multi-tenancy strategy for [PRODUCT_NAME] in Laravel.

Requirements:
- Compare the three common approaches (single database with tenant_id, database-per-tenant, schema-per-tenant) specifically against [ISOLATION_REQUIREMENT] and [TENANT_COUNT], and recommend one.
- Design how tenant context is resolved per request (subdomain, header, or authenticated user) and where that resolution happens in the request lifecycle.
- Show how Eloquent global scopes or a package-based approach enforces tenant isolation automatically, so a developer can't accidentally leak cross-tenant data.
- Address how migrations and queued jobs behave correctly under the chosen approach.

Expected Output:
The recommended approach with justification, the tenant-resolution flow, and the Eloquent isolation mechanism explained with a code example.`
  },
  {
    id: 59,
    category: "API Development",
    title: "Laravel API Resource & Versioning Strategy",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "api", "versioning"],
    prompt: `Role:
Act as a senior Laravel developer specializing in API design.

Context:
API consumers: [CONSUMERS, e.g. "mobile app + 2 external partners"]
Current API state: [CURRENT_STATE, e.g. "v1 already live and cannot break"]
Upcoming change: [UPCOMING_CHANGE, e.g. "restructuring the order response shape"]

Task:
Design how to ship [UPCOMING_CHANGE] without breaking existing consumers.

Requirements:
- Recommend a versioning strategy (URL-based, header-based, or resource-based) appropriate for [CONSUMERS] and justify it.
- Show how Laravel API Resources can serve different shapes per version without duplicating business logic.
- Define a deprecation policy for the old version (how long it stays supported, how consumers are notified).
- Note what must be documented so consumers can migrate smoothly.

Expected Output:
The versioning approach, an example API Resource class per version, and a short deprecation policy.`
  },
  {
    id: 60,
    category: "Testing & QA",
    title: "Laravel Feature Testing with Pest",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "pest", "testing"],
    prompt: `Role:
Act as a senior Laravel developer who writes thorough Pest test suites.

Context:
Feature to test: [FEATURE_DESCRIPTION, e.g. "order checkout endpoint"]
Auth requirement: [AUTH_REQUIREMENT]
Relevant code:
[PASTE_CONTROLLER_OR_ROUTE_CODE]

Task:
Write Pest feature tests that give real confidence in this endpoint.

Requirements:
- Cover: successful request, validation failures, unauthorized access, and at least one business-rule edge case specific to [FEATURE_DESCRIPTION].
- Use Laravel's model factories for test data instead of hand-built arrays.
- Assert on both the HTTP response (status, JSON shape) and the resulting database state where relevant.
- Keep tests independent — no test should depend on another test's side effects.

Expected Output:
A complete Pest test file for this feature, with each test named to state exactly what it verifies.`
  },
  {
    id: 61,
    category: "Software Development",
    title: "Laravel Caching Strategy",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["laravel", "caching", "redis", "performance"],
    prompt: `Role:
Act as a senior Laravel developer specializing in performance and caching.

Context:
Data to cache: [DATA_DESCRIPTION, e.g. "category tree", "dashboard summary stats"]
Cache driver: [CACHE_DRIVER, e.g. Redis]
Update frequency: [UPDATE_FREQUENCY, e.g. "changes rarely", "changes every few minutes"]

Task:
Design a caching strategy for [DATA_DESCRIPTION].

Requirements:
- Choose an appropriate TTL or cache-invalidation trigger based on [UPDATE_FREQUENCY] — don't just pick an arbitrary TTL.
- Decide between cache-aside, write-through, or event-based invalidation, and justify the choice.
- Show how to prevent a cache stampede if this data is requested very frequently right when it expires.
- Note what happens if the cache driver is temporarily unavailable (graceful degradation vs. hard failure).

Expected Output:
The caching approach with code (cache key naming, TTL/invalidation logic) and the stampede/failure-handling notes.`
  },
  {
    id: 62,
    category: "Software Development",
    title: "Laravel Package / Service Provider Design",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["laravel", "package", "service-provider"],
    prompt: `Role:
Act as a senior Laravel developer who builds reusable internal packages.

Context:
Functionality to extract: [FUNCTIONALITY_DESCRIPTION, e.g. "shared audit-logging used across 3 internal apps"]
Consuming apps: [CONSUMING_APPS_COUNT]

Task:
Design this as a proper installable Laravel package rather than copy-pasted code.

Requirements:
- Define the package structure (Service Provider, config file, migrations if needed, facade if it genuinely improves ergonomics).
- Show how the Service Provider registers bindings and publishes config so each consuming app can override defaults.
- Keep the public API (what consuming apps actually call) minimal and stable.
- Note how this package would be versioned and updated across [CONSUMING_APPS_COUNT] apps without breaking them.

Expected Output:
The package folder structure, the Service Provider code, and a short usage example from a consuming app.`
  },
  {
    id: 63,
    category: "API Development",
    title: "CodeIgniter 4 REST API with Token Authentication",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["codeigniter", "api", "authentication"],
    prompt: `Role:
Act as a senior CodeIgniter 4 developer specializing in API authentication.

Context:
Resource(s): [RESOURCE_NAME]
Token approach: [TOKEN_APPROACH, e.g. "personal access tokens", "JWT"]
Client type: [CLIENT_TYPE, e.g. mobile app, SPA]

Task:
Build token-based authentication for the [RESOURCE_NAME] API in CodeIgniter 4.

Requirements:
- Design the token issuance flow (login endpoint → token generation → token returned to client).
- Implement a filter/middleware that validates the token on protected routes and rejects invalid/expired tokens with the correct status code.
- Define token storage (hashed, never plaintext) and revocation (logout invalidates the token).
- Address rate-limiting login attempts to reduce brute-force risk.

Expected Output:
The auth Controller, the validation Filter, and the relevant migration for token storage.`
  },
  {
    id: 64,
    category: "Software Development",
    title: "CodeIgniter 4 Custom Library / Helper Development",
    difficulty: "Intermediate",
    promptType: "Short Prompt",
    tags: ["codeigniter", "library", "helper"],
    prompt: `Act as a senior CodeIgniter 4 developer. I need a reusable [LIBRARY_OR_HELPER_PURPOSE, e.g. "currency formatting", "PDF invoice generation"] utility. Build it as a proper CI4 library (not a global function dump): class in app/Libraries, autoloaded correctly, with clear public methods and no framework anti-patterns (no direct superglobal access, no hidden static state unless justified). Show how to call it from a controller.`
  },
  {
    id: 65,
    category: "Software Development",
    title: "CodeIgniter 4 to Laravel Migration Plan",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["codeigniter", "laravel", "migration"],
    prompt: `Role:
Act as a senior PHP architect who has led framework migrations.

Context:
Current app: [APP_DESCRIPTION] built in CodeIgniter 4
Size: [APP_SIZE, e.g. "40 controllers, 25 tables"]
Reason for migrating: [REASON, e.g. "team hiring is easier for Laravel", "need Laravel's ecosystem"]
Constraint: [CONSTRAINT, e.g. "must stay live and usable throughout the migration"]

Objective:
Plan a safe migration from CodeIgniter 4 to Laravel given [CONSTRAINT].

Requirements:
- Recommend a migration strategy: full rewrite vs. incremental (strangler-fig) migration, justified against [APP_SIZE] and [CONSTRAINT].
- If incremental, define how both frameworks would coexist temporarily (routing split, shared database, session handling).
- Map CI4 concepts to their Laravel equivalents (Model → Eloquent Model, Filter → Middleware, Services → Service Container) so the team has a mental map.
- Identify the riskiest part of the migration (e.g. shared session/auth) and how to de-risk it first.
- Propose a rough phase order (which modules migrate first and why).

Expected Output:
Migration strategy recommendation, the CI4-to-Laravel concept map, and a phased migration order with the highest-risk item addressed first.`
  },
  {
    id: 66,
    category: "Software Development",
    title: "Core PHP Secure File Upload Handling",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["core-php", "file-upload", "security"],
    prompt: `Role:
Act as a senior PHP developer specializing in application security.

Context:
Upload purpose: [UPLOAD_PURPOSE, e.g. "profile photos", "document attachments"]
Storage location: [STORAGE_LOCATION, e.g. local disk, S3-compatible bucket]
Allowed file types: [ALLOWED_TYPES]

Task:
Implement secure file upload handling in core PHP for [UPLOAD_PURPOSE].

Requirements:
- Validate file type by actual content (MIME sniffing / magic bytes), not just the file extension or client-supplied MIME type.
- Enforce a maximum file size and reject oversized uploads before they consume much memory.
- Generate a non-guessable stored filename and store uploads outside the web root (or with execution disabled) so an uploaded file can never be executed as a script.
- Handle and log upload errors from PHP's $_FILES array explicitly instead of assuming success.

Expected Output:
The complete upload-handling PHP code with inline comments explaining each security check.`
  },
  {
    id: 67,
    category: "Software Development",
    title: "Core PHP Session & Cookie Security Hardening",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["core-php", "sessions", "security"],
    prompt: `Role:
Act as a senior PHP developer specializing in session security.

Context:
Application type: [APP_TYPE]
Current session setup: [CURRENT_SETUP_DESCRIPTION, e.g. "default PHP sessions, nothing customized"]

Task:
Harden session and cookie handling for [APP_TYPE].

Requirements:
- Set secure cookie flags correctly (HttpOnly, Secure, SameSite) and explain what each protects against.
- Regenerate the session ID on login and on privilege change to prevent session fixation.
- Implement an idle-timeout and an absolute session lifetime, not just PHP's default garbage collection.
- Address where session data should NOT be trusted blindly (e.g. re-checking permissions server-side even if a role is cached in session).

Expected Output:
The session configuration and login-handling code with each hardening measure labeled and explained.`
  },
  {
    id: 68,
    category: "Software Development",
    title: "Choose the Right PHP Design Pattern",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["php", "design-patterns", "architecture"],
    prompt: `Role:
Act as a senior PHP architect who picks patterns pragmatically, not for their own sake.

Context:
Problem: [PROBLEM_DESCRIPTION, e.g. "need to support 4 different payment gateways with the same interface"]
Current code smell: [CODE_SMELL, e.g. "a giant if/else chain checking gateway type"]

Task:
Recommend the right design pattern (if any) for [PROBLEM_DESCRIPTION].

Requirements:
- Name the pattern that fits best (e.g. Strategy, Factory, Repository, Decorator, Observer) and explain specifically why it fits this problem, not a textbook definition.
- Show a minimal PHP implementation of the pattern applied to [PROBLEM_DESCRIPTION].
- Note the complexity cost this pattern adds, and state plainly if a simpler solution (e.g. a plain match/switch) would actually be good enough here.

Expected Output:
Pattern recommendation with reasoning, a minimal code example, and an honest complexity-vs-benefit note.`
  },
  {
    id: 69,
    category: "Software Development",
    title: "PHP Dependency Injection & Container Design",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["php", "dependency-injection", "architecture"],
    prompt: `Role:
Act as a senior PHP architect specializing in decoupled, testable code.

Context:
Class/module with tightly-coupled dependencies:
[PASTE_CODE_OR_DESCRIBE_CLASS]
Framework: [FRAMEWORK_OR_NONE]

Task:
Refactor this to use proper dependency injection.

Requirements:
- Identify every hard-coded dependency (e.g. a "new SomeClass()" call inside a method) that should be injected instead.
- Show the refactored class using constructor injection against interfaces, not concrete classes, where it genuinely improves testability.
- If a DI container is available ([FRAMEWORK_OR_NONE]), show how it would be bound/resolved; if not, show simple manual/factory-based wiring.
- Explain how this refactor makes the class easier to unit test.

Expected Output:
Before/after code comparison and a short note on the specific testability gain.`
  },
  {
    id: 70,
    category: "Software Development",
    title: "Legacy PHP Codebase Refactoring Plan",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["php", "legacy-code", "refactoring"],
    prompt: `Role:
Act as a senior PHP engineer who specializes in safely modernizing legacy code.

Context:
Codebase: [CODEBASE_DESCRIPTION, e.g. "10-year-old procedural PHP, no tests, mixed with HTML"]
Constraint: [CONSTRAINT, e.g. "must keep running in production throughout"]
Pain point driving this: [PAIN_POINT, e.g. "every change risks breaking something unrelated"]

Objective:
Create a realistic, incremental refactoring plan — not a rewrite.

Requirements:
- Propose how to introduce a safety net first (characterization tests around current behavior) before changing any logic.
- Identify the highest-risk, most-changed area of the code as the first refactoring target (highest ROI).
- Define a strangler pattern for gradually extracting logic into clean, testable units without a big-bang rewrite.
- Set boundaries: what NOT to refactor yet, and why leaving it alone is the right call for now.

Expected Output:
A phased plan (Phase | Goal | Risk Addressed) starting with the safety net, not the exciting rewrite work.`
  },
  {
    id: 71,
    category: "API Development",
    title: "Webhook Receiver Design (Idempotent & Secure)",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["webhooks", "api", "idempotency"],
    prompt: `Role:
Act as a senior backend engineer specializing in webhook integrations.

Context:
Webhook source: [WEBHOOK_SOURCE, e.g. "payment gateway", "shipping provider"]
Payload example: [PAYLOAD_EXAMPLE_OR_DESCRIPTION]

Task:
Design a webhook receiver endpoint for [WEBHOOK_SOURCE].

Requirements:
- Verify the webhook's signature/secret before processing anything, and reject unverified requests immediately.
- Make processing idempotent — the same event delivered twice (a common webhook behavior) must not double-apply its effect.
- Respond quickly (2xx) and do the actual processing asynchronously via a queued job, rather than blocking the webhook response.
- Log and handle malformed or unexpected payloads without crashing the endpoint.

Expected Output:
The endpoint code (signature verification → idempotency check → queue dispatch) and the idempotency-key strategy explained.`
  },
  {
    id: 72,
    category: "API Development",
    title: "API Rate Limiting & Throttling Strategy",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["api", "rate-limiting", "throttling"],
    prompt: `Role:
Act as a senior backend engineer specializing in API reliability.

Context:
API: [API_NAME]
Consumer types: [CONSUMER_TYPES, e.g. "free tier, paid tier, internal services"]
Abuse concern: [ABUSE_CONCERN, e.g. "one client hammering the search endpoint"]

Task:
Design a rate-limiting strategy for [API_NAME].

Requirements:
- Recommend a rate-limiting algorithm (fixed window, sliding window, token bucket) and justify it for this use case.
- Define different limits per [CONSUMER_TYPES] and how the limit key is derived (API key, IP, user ID).
- Define the response when a client is throttled (status code, retry-after header, body format).
- Note where this is best enforced (application middleware vs. gateway/proxy layer) and why.

Expected Output:
The chosen algorithm with reasoning, the per-tier limit table, and example middleware/response code.`
  },
  {
    id: 73,
    category: "Software Development",
    title: "Background Job Failure Handling & Retry Strategy",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["background-jobs", "reliability", "retries"],
    prompt: `Role:
Act as a senior backend engineer specializing in reliable asynchronous systems.

Context:
Job: [JOB_DESCRIPTION, e.g. "generate and email a monthly report"]
Failure modes seen: [FAILURE_MODES, e.g. "third-party API timeout", "PDF generation OOM on large reports"]

Task:
Design a robust failure-handling strategy for [JOB_DESCRIPTION].

Requirements:
- Classify [FAILURE_MODES] as transient (worth retrying) vs. permanent (should not retry) and handle each differently.
- Define a backoff strategy for transient failures (exponential backoff, max attempts) so retries don't hammer a struggling dependency.
- Define what happens after final failure: dead-letter handling, alerting, and whether the user/system needs to be notified.
- Ensure retries don't cause duplicate side effects (e.g. sending the report email twice).

Expected Output:
A failure-classification table, the retry/backoff logic, and the dead-letter/notification handling explained.`
  },
  {
    id: 74,
    category: "Database Design",
    title: "Diagnose and Fix a Slow Query",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["database", "performance", "sql"],
    prompt: `Role:
Act as a senior database engineer specializing in query performance.

Context:
Database: [DATABASE, e.g. MySQL / PostgreSQL]
Slow query:
[PASTE_QUERY]
EXPLAIN output (if available): [PASTE_EXPLAIN_OUTPUT]
Approximate row counts of tables involved: [ROW_COUNTS]

Task:
Diagnose why this query is slow and fix it.

Requirements:
- Read the EXPLAIN output (or reason about the likely plan if not provided) and identify the specific bottleneck (missing index, full table scan, bad join order, unnecessary sorting).
- Propose the specific index(es) or query rewrite needed, not a generic "add indexes" suggestion.
- Show the corrected query.
- Note any trade-off the new index introduces (write-performance cost, storage).

Expected Output:
Bottleneck diagnosis → recommended index/rewrite → corrected query → trade-off note.`
  },
  {
    id: 75,
    category: "Database Design",
    title: "Zero-Downtime Database Migration Strategy",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["database", "migration", "zero-downtime"],
    prompt: `Role:
Act as a senior database engineer specializing in safe schema changes.

Context:
Change needed: [SCHEMA_CHANGE, e.g. "rename a column", "split a table", "add a NOT NULL column to a large table"]
Table size: [TABLE_SIZE]
Constraint: [CONSTRAINT, e.g. "app must stay online and serving traffic during the change"]

Task:
Plan this schema change with zero downtime.

Requirements:
- Break the change into safe, backward-compatible steps (e.g. add new column nullable → backfill in batches → make app write to both → switch reads → drop old column later) rather than one blocking migration.
- Identify the step most likely to lock the table or degrade performance at [TABLE_SIZE], and how to mitigate it (batching, off-peak timing, online schema-change tooling).
- Define how the application code changes in lockstep with each migration step.
- Define a rollback point at each step.

Expected Output:
A step-by-step migration plan, each step marked with its risk level and rollback approach.`
  },
  {
    id: 76,
    category: "Testing & QA",
    title: "Integration / End-to-End Test Plan",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["testing", "integration", "e2e"],
    prompt: `Role:
Act as a senior QA engineer specializing in integration and end-to-end testing.

Context:
Flow to test: [FLOW_DESCRIPTION, e.g. "user registration through email verification to first login"]
Systems involved: [SYSTEMS_INVOLVED, e.g. "app, database, email provider, third-party SMS"]

Task:
Design an integration/E2E test plan for [FLOW_DESCRIPTION].

Requirements:
- Map out each step of the flow and what could realistically fail at each step.
- Decide which external systems ([SYSTEMS_INVOLVED]) should be mocked/stubbed in the test environment vs. genuinely exercised, and why.
- Define the test data setup and teardown needed so tests are repeatable and don't pollute shared environments.
- Identify the 2-3 highest-value test cases if only limited time is available (not exhaustive coverage).

Expected Output:
A flow-step table (Step | Failure Risk | Mock or Real | Priority) and the top 2-3 test cases written out in Given/When/Then form.`
  },
  {
    id: 77,
    category: "Documentation",
    title: "Write a Technical README & Onboarding Guide",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["documentation", "readme", "onboarding"],
    prompt: `Role:
Act as a technical writer who specializes in developer onboarding docs.

Context:
Project: [PROJECT_NAME]
Stack: [TECH_STACK]
Setup steps (rough notes): [ROUGH_SETUP_NOTES]

Task:
Turn this into a clear README that gets a new developer running locally with no hand-holding.

Requirements:
- Structure as: Overview → Prerequisites → Setup Steps → Running the App → Running Tests → Common Issues.
- Turn [ROUGH_SETUP_NOTES] into exact, ordered, copy-pasteable commands — no ambiguous steps like "configure the database" without saying how.
- Include a "Common Issues" section anticipating the mistakes a new developer is likely to make with this stack.
- Keep the tone plain and instructional, not marketing-flavored.

Expected Output:
A complete README.md in Markdown, ready to commit.`
  },

  // ===== C. ERP / HRMS / SCHOOL / COLLEGE — DEEPER MODULE VARIETY (78-90) =====
  {
    id: 78,
    category: "HRMS Software",
    title: "Payroll Calculation Engine Design",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["payroll", "hrms", "calculation-engine"],
    prompt: `Role:
Act as a senior software architect specializing in payroll systems.

Context:
Pay structure: [PAY_STRUCTURE, e.g. "basic + HRA + allowances, with statutory deductions"]
Inputs feeding payroll: [INPUT_SOURCES, e.g. "attendance, leave, overtime, loans/advances"]
Pay cycle: [PAY_CYCLE, e.g. monthly]

Objective:
Design a payroll calculation engine that takes [INPUT_SOURCES] and produces an auditable payslip.

Requirements:
- Define the calculation order (gross pay → statutory deductions → voluntary deductions → net pay) as an explicit pipeline, not an opaque formula.
- Show how each input source ([INPUT_SOURCES]) maps to a specific line item in the calculation.
- Design for correction/reprocessing: if attendance data is corrected after payroll runs, how is that handled without corrupting already-issued payslips?
- Ensure every calculated payslip is fully auditable — every number traceable back to its source data.

Expected Output:
The calculation pipeline (as ordered steps), the core entity schema (payslip, payslip_line_item), and the correction/reprocessing approach.`
  },
  {
    id: 79,
    category: "HRMS Software",
    title: "HRMS Performance Appraisal Module",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["hrms", "performance-appraisal", "workflow"],
    prompt: `Role:
Act as a senior software architect specializing in HR systems.

Context:
Appraisal cycle: [CYCLE, e.g. annual, half-yearly]
Appraisal style: [STYLE, e.g. "self-review + manager review + goal tracking"]

Task:
Design the performance appraisal module.

Requirements:
- Define entities: appraisal cycle, goal/KPI, self-review, manager-review, final rating.
- Design the workflow states (e.g. goal-setting → self-review submitted → manager-review submitted → calibration → finalized) with who can act at each state.
- Address how mid-cycle goal changes are handled without losing the original goal's history.
- Define what becomes visible to the employee vs. only to HR/management at each stage.

Expected Output:
Core entity schema and the appraisal workflow state machine.`
  },
  {
    id: 80,
    category: "HRMS Software",
    title: "HRMS Recruitment / ATS Module",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["hrms", "recruitment", "ats"],
    prompt: `Role:
Act as a senior software architect specializing in recruitment systems.

Context:
Hiring volume: [HIRING_VOLUME]
Pipeline stages: [PIPELINE_STAGES, e.g. "applied → screening → interview → offer → hired"]

Task:
Design an applicant-tracking module.

Requirements:
- Define entities: job requisition, candidate, application, interview, offer.
- Model the pipeline as a stage-based flow where a candidate's application moves through [PIPELINE_STAGES], with the ability to reject at any stage with a reason.
- Design interview scheduling with multiple interviewers and consolidated feedback per candidate.
- Address duplicate-candidate detection (same person applying to multiple roles).

Expected Output:
Core entity schema and the application pipeline state machine.`
  },
  {
    id: 81,
    category: "ERP Software",
    title: "Multi-Branch ERP Data Synchronization Strategy",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["erp", "multi-branch", "data-sync"],
    prompt: `Role:
Act as a senior software architect specializing in distributed ERP systems.

Context:
Number of branches: [BRANCH_COUNT]
Connectivity: [CONNECTIVITY, e.g. "branches sometimes lose internet", "always online"]
Data that must sync: [DATA_TO_SYNC, e.g. "inventory levels, sales transactions, customer records"]

Objective:
Design how data stays consistent across [BRANCH_COUNT] branches given [CONNECTIVITY].

Requirements:
- Decide between a centralized (all branches hit one central database) vs. distributed-with-sync (each branch has local data that syncs) architecture, justified against [CONNECTIVITY].
- If distributed, define the sync mechanism (event queue, periodic batch sync) and how conflicts are resolved (e.g. two branches editing the same customer record).
- Define which data must be strongly consistent (e.g. stock deduction on sale) vs. can tolerate eventual consistency (e.g. reporting dashboards).
- Address what happens to a branch's operations during an extended connectivity outage.

Expected Output:
Architecture recommendation with justification, the conflict-resolution approach, and the consistency classification for [DATA_TO_SYNC].`
  },
  {
    id: 82,
    category: "ERP Software",
    title: "Vendor / Supplier Management Module",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["erp", "vendor-management", "procurement"],
    prompt: `Role:
Act as a senior software architect specializing in procurement systems.

Context:
Business type: [BUSINESS_TYPE]
Vendor evaluation needs: [EVALUATION_NEEDS, e.g. "track pricing history, delivery reliability, quality issues"]

Task:
Design a vendor management module.

Requirements:
- Define entities: vendor, vendor-product catalog (what each vendor supplies and at what price), vendor performance record.
- Design how vendor pricing history is preserved so past purchase orders keep their original pricing even if the vendor's price list later changes.
- Design a simple vendor scorecard based on [EVALUATION_NEEDS] (on-time delivery %, quality issue count) computed from actual transaction data, not manual entry alone.
- Address multi-vendor sourcing for the same product (comparing vendors at purchase-order time).

Expected Output:
Core entity schema and the vendor scorecard calculation logic.`
  },
  {
    id: 83,
    category: "ERP Software",
    title: "Purchase Order & Procurement Workflow",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["erp", "purchase-order", "procurement", "workflow"],
    prompt: `Role:
Act as a senior software architect specializing in procurement workflows.

Context:
Approval requirement: [APPROVAL_REQUIREMENT, e.g. "POs over a threshold need manager approval"]
Receiving process: [RECEIVING_PROCESS, e.g. "partial deliveries are common"]

Task:
Design the purchase-order-to-receipt workflow.

Requirements:
- Model the PO lifecycle: draft → pending approval → approved → sent to vendor → partially received → fully received → closed.
- Handle [RECEIVING_PROCESS] correctly — a PO must accurately track partial receipts against the original ordered quantity without losing the record of what's still outstanding.
- Design how a received quantity mismatch (vendor sends more/less than ordered) is flagged and resolved.
- Show how a fully received PO connects to accounts payable (what's owed to the vendor).

Expected Output:
The PO state machine, the partial-receipt tracking logic, and the mismatch-handling flow.`
  },
  {
    id: 84,
    category: "ERP Software",
    title: "GST-Compliant E-Invoicing Module",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["erp", "gst", "invoicing", "compliance"],
    prompt: `Role:
Act as a senior software architect with functional knowledge of GST-compliant invoicing (India).

Context:
Business type: [BUSINESS_TYPE]
Transaction types: [TRANSACTION_TYPES, e.g. "B2B, B2C, exports"]
Invoice volume: [VOLUME]

Task:
Design an e-invoicing module that generates GST-compliant invoices.

Requirements:
- Define the required invoice fields for GST compliance (GSTIN, HSN/SAC codes, tax breakdown by rate, place of supply) and how each is derived from the underlying sales transaction.
- Handle correct tax calculation logic for [TRANSACTION_TYPES] (e.g. CGST+SGST for intra-state vs. IGST for inter-state).
- Design how invoice numbering stays sequential and gap-free per the compliance requirement, even under concurrent invoice creation.
- Note where an integration point (e.g. IRN generation via a government API) would sit in this flow, without assuming a specific vendor.

Expected Output:
The invoice entity schema with required fields, the tax-calculation logic explained, and the sequential-numbering approach.`
  },
  {
    id: 85,
    category: "School Management Software",
    title: "School Transport & Route Management",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["school-erp", "transport", "logistics"],
    prompt: `Role:
Act as a senior software architect specializing in school operations software.

Context:
Fleet size: [FLEET_SIZE]
Tracking needs: [TRACKING_NEEDS, e.g. "live GPS tracking", "just route/stop assignment, no live tracking"]

Task:
Design a transport management module.

Requirements:
- Define entities: vehicle, route, stop, student-route assignment, driver.
- Design how a route's stops are ordered and how estimated timing per stop is derived.
- If [TRACKING_NEEDS] includes live tracking, define how location updates are ingested and how parents/admins view them without overwhelming the system with high-frequency writes.
- Address how transport fee is linked to route/distance for billing purposes.

Expected Output:
Core entity schema and the route/stop assignment logic, plus the live-tracking data flow if applicable.`
  },
  {
    id: 86,
    category: "School Management Software",
    title: "School Online Exam / Assessment Module",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["school-erp", "exams", "assessment"],
    prompt: `Role:
Act as a senior software architect specializing in education assessment systems.

Context:
Exam types: [EXAM_TYPES, e.g. "MCQ auto-graded", "subjective, teacher-graded"]
Scale: [STUDENT_COUNT] students

Task:
Design an online exam/assessment module.

Requirements:
- Define entities: exam, question bank, question, student attempt, answer, grade.
- Design question randomization/shuffling per student to reduce copying, while still allowing consistent grading against an answer key.
- Handle auto-grading for objective questions and a grading queue/workflow for subjective ones.
- Address exam integrity basics (time limits, single active attempt, tab-switch/focus-loss logging) without assuming specific proctoring hardware.

Expected Output:
Core entity schema, the attempt/grading flow, and the exam-integrity measures explained.`
  },
  {
    id: 87,
    category: "College Management Software",
    title: "College Hostel & Room Allocation Management",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["college-erp", "hostel", "allocation"],
    prompt: `Role:
Act as a senior software architect specializing in campus operations software.

Context:
Hostel capacity: [CAPACITY]
Allocation rules: [ALLOCATION_RULES, e.g. "seniority-based, or first-come-first-served, room-sharing preferences"]

Task:
Design a hostel and room allocation module.

Requirements:
- Define entities: hostel block, room, bed/seat, student allocation, allocation request.
- Design the allocation logic honoring [ALLOCATION_RULES] while preventing double-booking of the same bed.
- Handle mid-term changes: room swap requests, vacancy after a student leaves, waitlist management.
- Address how hostel fees connect to the allocation record for billing.

Expected Output:
Core entity schema and the allocation algorithm explained as a clear decision process.`
  },
  {
    id: 88,
    category: "College Management Software",
    title: "College Library Management Module",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["college-erp", "library", "inventory"],
    prompt: `Role:
Act as a senior software architect specializing in campus systems.

Context:
Catalog size: [CATALOG_SIZE]
Needs: [NEEDS, e.g. "barcode-based checkout", "fine calculation for late returns"]

Task:
Design a library management module.

Requirements:
- Define entities: book/title, copy (individual physical item with its own barcode), member, checkout/return record.
- Design checkout and return logic, including due-date calculation and multi-copy availability tracking.
- Design fine calculation for late returns per [NEEDS], including how fines are waived/adjusted with an audit trail.
- Address reservation/hold requests when all copies of a title are checked out.

Expected Output:
Core entity schema and the checkout/return/fine calculation logic.`
  },
  {
    id: 89,
    category: "AI Automation",
    title: "Role-Based Permission System Design",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["rbac", "permissions", "architecture"],
    prompt: `Role:
Act as a senior software architect specializing in access control systems.

Context:
System: [SYSTEM_NAME, e.g. "ERP with Sales, Inventory, Accounting, HR modules"]
Roles needed: [ROLE_LIST, e.g. "Admin, Branch Manager, Accountant, Sales Executive, Auditor (read-only)"]
Granularity needed: [GRANULARITY, e.g. "module-level is enough" vs "need per-action permissions like approve vs view"]

Objective:
Design a role-based (or hybrid role+permission) access control system for [SYSTEM_NAME].

Requirements:
- Decide between pure RBAC (fixed roles) vs. RBAC + granular permissions (roles are bundles of fine-grained permissions) based on [GRANULARITY], and justify it.
- Define the core schema (role, permission, role_permission, user_role) supporting [ROLE_LIST].
- Design how a permission check happens at request time efficiently (not re-querying the full permission set on every request).
- Address multi-branch or multi-tenant scoping if relevant (a Branch Manager should only manage their own branch's data).
- Note how this scales when a new module is added later without redesigning the permission model.

Expected Output:
Core entity schema, the permission-check flow, and the scoping approach for multi-branch access.`
  },
  {
    id: 90,
    category: "AI Automation",
    title: "Notification & Alert Engine Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["notifications", "automation", "architecture"],
    prompt: `Role:
Act as a senior software architect specializing in cross-cutting platform services.

Context:
Notification channels needed: [CHANNELS, e.g. "email, SMS, in-app, push"]
Trigger examples: [TRIGGER_EXAMPLES, e.g. "leave approved, low stock alert, invoice due"]

Task:
Design a single, reusable notification engine that any module in the system can use.

Requirements:
- Define a generic "notification event" schema (type, recipient, channel preference, payload) so modules don't each build their own notification logic.
- Design channel abstraction so adding a new channel later (e.g. WhatsApp) doesn't require touching every module that sends notifications.
- Handle per-user channel preferences and quiet hours/opt-outs.
- Design for delivery reliability (queued sending, retry on transient failure, delivery status tracking) rather than fire-and-forget.

Expected Output:
Core entity schema, the module-to-engine integration pattern (how a module triggers a notification without knowing delivery details), and the retry/delivery-tracking approach.`
  },

  // ============= D. E-COMMERCE — DEEPER (91-95) =============
  {
    id: 91,
    category: "E-commerce",
    title: "Abandoned Cart Recovery Flow",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ecommerce", "cart-recovery", "automation"],
    prompt: `Role:
Act as a senior e-commerce engineer and lifecycle-marketing consultant.

Context:
Platform: [PLATFORM_OR_STACK]
Current cart abandonment rate: [ABANDONMENT_RATE]
Channels available: [CHANNELS, e.g. "email only", "email + SMS"]

Task:
Design an abandoned-cart recovery flow.

Requirements:
- Define what counts as "abandoned" (time since last cart activity with no checkout) and how that's detected reliably.
- Design a multi-touch sequence (timing and message intent per touch) across [CHANNELS], not just one reminder email.
- Address cart-state accuracy: price/stock may have changed since abandonment — the recovery message must reflect current reality.
- Define how to stop the sequence immediately once the customer completes checkout.

Expected Output:
The abandonment-detection logic, the touch sequence (timing + intent per message), and the stop-condition handling.`
  },
  {
    id: 92,
    category: "E-commerce",
    title: "Wishlist & Product Recommendation Engine",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ecommerce", "recommendations", "personalization"],
    prompt: `Role:
Act as a senior backend engineer specializing in e-commerce personalization.

Context:
Data available: [AVAILABLE_DATA, e.g. "purchase history, browsing history, wishlist adds"]
Placement: [PLACEMENT, e.g. "product detail page 'you may also like'", "cart page cross-sell"]

Task:
Design a wishlist feature plus a recommendation mechanism for [PLACEMENT].

Requirements:
- Define the wishlist data model (supporting guest-to-account merge when a guest logs in).
- Propose a recommendation approach appropriate to [AVAILABLE_DATA] and scale — start with simple, explainable rules (e.g. "frequently bought together", "same category, similar price") before assuming a full ML pipeline is needed.
- Define how recommendation quality would be measured (click-through, conversion) so it can be improved over time.
- Address performance: recommendations must not slow down page load.

Expected Output:
Wishlist schema, the recommendation logic/approach with reasoning, and the measurement plan.`
  },
  {
    id: 93,
    category: "E-commerce",
    title: "Coupon / Discount Rules Engine",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ecommerce", "coupons", "discounts"],
    prompt: `Role:
Act as a senior backend engineer specializing in pricing and promotions systems.

Context:
Discount types needed: [DISCOUNT_TYPES, e.g. "percentage off, flat amount off, buy-X-get-Y, free shipping"]
Constraints needed: [CONSTRAINTS, e.g. "minimum order value, category-specific, one per customer, expiry"]

Task:
Design a coupon/discount rules engine.

Requirements:
- Design a data model flexible enough for [DISCOUNT_TYPES] without a separate hardcoded code path per type.
- Support the constraint set in [CONSTRAINTS] as composable rules, not one giant if/else per coupon.
- Define how multiple applicable discounts on one order are resolved (stacking allowed vs. best-single-discount-wins).
- Prevent abuse: single-use enforcement per customer, and protecting against race conditions when a coupon has a limited total redemption count.

Expected Output:
Core entity schema (coupon, rule, redemption) and the rule-evaluation logic explained with a worked example order.`
  },
  {
    id: 94,
    category: "E-commerce",
    title: "Subscription & Recurring Billing System",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ecommerce", "subscriptions", "billing"],
    prompt: `Role:
Act as a senior backend engineer specializing in subscription billing systems.

Context:
Subscription model: [MODEL, e.g. "fixed monthly plans", "usage-based", "product subscribe-and-save"]
Payment gateway: [PAYMENT_GATEWAY]

Objective:
Design a subscription and recurring billing system.

Requirements:
- Define the subscription lifecycle (trial → active → past_due → cancelled/paused → resumed) as an explicit state machine.
- Design how recurring charges are triggered and how failed payments are retried (dunning) before cancelling a subscription.
- Handle plan changes mid-cycle (upgrade/downgrade) including proration logic.
- Design how [PAYMENT_GATEWAY] webhooks (payment succeeded/failed) keep the local subscription state in sync, handling out-of-order or duplicate webhook delivery.
- Address what happens to access/entitlements immediately when a subscription lapses vs. during a grace period.

Expected Output:
The subscription state machine, the dunning/retry logic, the proration approach for plan changes, and the webhook-sync handling.`
  },
  {
    id: 95,
    category: "Multi-Vendor E-commerce",
    title: "Vendor Rating & Review System",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["marketplace", "reviews", "trust"],
    prompt: `Role:
Act as a senior backend engineer specializing in marketplace trust systems.

Context:
Marketplace type: [MARKETPLACE_TYPE]
Review scope: [REVIEW_SCOPE, e.g. "product reviews only", "product reviews + separate vendor rating"]

Task:
Design a vendor rating and review system.

Requirements:
- Define the data model separating product reviews from overall vendor rating if [REVIEW_SCOPE] requires both.
- Restrict reviews to verified purchasers only, and design how that's enforced.
- Design how a vendor's aggregate rating is calculated and kept up to date without recalculating from scratch on every single review (e.g. incremental average update).
- Address handling of disputed/fraudulent reviews (flagging, moderation queue) without letting vendors simply delete negative reviews.

Expected Output:
Core entity schema, the aggregate-rating update logic, and the moderation/dispute-handling flow.`
  },

  // ============= E. BUSINESS GROWTH & ANALYSIS — DEEPER (96-98) =============
  {
    id: 96,
    category: "Business Analysis",
    title: "Competitor Analysis",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["competitor-analysis", "business-analysis", "strategy"],
    prompt: `Role:
Act as a senior business/competitive analyst.

Context:
My business: [BUSINESS_TYPE]
Key competitors: [COMPETITOR_LIST]
What I want to understand: [SPECIFIC_QUESTION, e.g. "why are they winning deals against us", "should we match their pricing"]

Task:
Analyze the competitive landscape to answer [SPECIFIC_QUESTION].

Requirements:
- Compare on the dimensions that actually matter to [SPECIFIC_QUESTION] (not a generic feature-by-feature list).
- Identify each competitor's likely strategic position (e.g. low-cost, premium/full-service, niche specialist) based on the information given.
- Identify one real, defensible advantage my business could lean into, given what the competitors are and aren't doing well.
- Flag if the honest answer is that I don't have enough information yet, and state exactly what data would resolve [SPECIFIC_QUESTION].

Expected Output:
A comparison summary focused on [SPECIFIC_QUESTION], each competitor's strategic position, and one concrete recommendation.`
  },
  {
    id: 97,
    category: "Business Growth",
    title: "Pricing Strategy Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["pricing", "strategy", "business-growth"],
    prompt: `Role:
Act as a senior pricing strategy consultant.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Current pricing: [CURRENT_PRICING]
Cost structure: [COST_STRUCTURE, e.g. "mostly fixed cost", "cost scales per customer"]
Target customer: [TARGET_CUSTOMER]

Task:
Evaluate and propose a pricing strategy.

Requirements:
- Identify the pricing model that fits [PRODUCT_OR_SERVICE] and [COST_STRUCTURE] best (cost-plus, value-based, tiered/usage-based, competitor-anchored) and justify it.
- Point out where [CURRENT_PRICING] likely leaves money on the table or creates friction with [TARGET_CUSTOMER], based on the model chosen.
- Propose a concrete pricing structure (tiers or a formula), not just a philosophy.
- Note the risk of changing pricing for existing customers and how to roll out the change without triggering churn.

Expected Output:
Pricing model recommendation with reasoning, a concrete proposed structure, and a rollout note for existing customers.`
  },
  {
    id: 98,
    category: "Business Analysis",
    title: "Customer Churn Analysis",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["churn", "retention", "business-analysis"],
    prompt: `Role:
Act as a senior business analyst specializing in retention.

Context:
Business type: [BUSINESS_TYPE]
Current churn rate: [CHURN_RATE]
Available signals: [AVAILABLE_SIGNALS, e.g. "usage frequency, support ticket count, plan tier, tenure"]

Task:
Analyze likely churn drivers and propose a response.

Requirements:
- Reason through which of [AVAILABLE_SIGNALS] most plausibly correlates with churn for this type of business, and why.
- Distinguish churn that's preventable (product/service issue) from churn that likely isn't (customer's business closed, budget cuts) — don't treat all churn the same.
- Propose 2-3 concrete interventions targeted at the preventable segment, each with what would indicate it's working.
- Suggest the simplest way to start tracking [AVAILABLE_SIGNALS] against churn if it isn't already being tracked, without requiring a full data-science build-out.

Expected Output:
Likely churn driver hypotheses, the preventable-vs-not distinction applied, and targeted interventions with success indicators.`
  },

  // ============= F. CREATIVE / UI-UX — DEEPER (99-100) =============
  {
    id: 99,
    category: "UI/UX Design",
    title: "Admin Dashboard UI Design Brief",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ui-ux", "dashboard", "design-brief"],
    prompt: `Role:
Act as a senior product designer specializing in data-dense admin interfaces.

Context:
Product: [PRODUCT_NAME]
Primary users: [PRIMARY_USERS, e.g. "operations staff checking daily metrics"]
Key data to surface: [KEY_DATA, e.g. "today's orders, low-stock alerts, pending approvals"]

Task:
Design the layout and information hierarchy for this admin dashboard.

Requirements:
- Identify the single most time-sensitive piece of [KEY_DATA] and place it where it's seen first.
- Group related data logically (e.g. all "needs my action" items together, separate from "for my awareness" items).
- Recommend which data should be a number/KPI card, which should be a chart, and which should be a table — and justify each choice by what decision it supports.
- Flag any risk of information overload given [PRIMARY_USERS], and what to intentionally leave off this screen.

Expected Output:
An information hierarchy plan and a text/ASCII wireframe of the dashboard layout.`
  },
  {
    id: 100,
    category: "UI/UX Design",
    title: "Landing Page Copy + Design Brief",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["ui-ux", "landing-page", "copywriting"],
    prompt: `Role:
Act as a senior conversion-focused product marketer and designer.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Target visitor: [TARGET_VISITOR]
Primary goal: [PRIMARY_GOAL, e.g. "sign up for free trial", "book a demo"]

Task:
Write the landing page copy and a matching layout brief.

Requirements:
- Write a headline and subheadline that state the specific value to [TARGET_VISITOR], not a generic tagline.
- Write 3 benefit-focused sections (not feature lists) that each address a real hesitation [TARGET_VISITOR] would have.
- Write one clear call-to-action tied to [PRIMARY_GOAL], repeated at the top and bottom of the page.
- Specify the section order and what visual (screenshot, illustration, testimonial) belongs in each section and why.

Expected Output:
The full page copy (headline → sections → CTA) followed by a short section-by-section layout brief.`
  }

];

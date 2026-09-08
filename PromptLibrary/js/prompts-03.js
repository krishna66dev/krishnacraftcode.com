/**
 * prompts-03.js
 * Prompt data file #3 — IDs 101-150.
 * Focus: the remaining top-level categories from the original master
 * list that batch 1 and batch 2 didn't touch — Marketing, Sales,
 * Customer Support, Productivity, Research, and AI Agents.
 *
 * IMPORTANT: declared with `var`, matching prompts-01.js and
 * prompts-02.js, so it attaches to `window.promptData03` and
 * app.js's auto-discovery loop picks it up automatically. Only
 * change needed elsewhere: add
 *   <script src="js/prompts-03.js"></script>
 * to index.html, before <script src="js/app.js"></script>.
 */

var promptData03 = [

  // ================= MARKETING (101-108) =================
  {
    id: 101,
    category: "Marketing",
    title: "Content Marketing Calendar & Strategy",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["marketing", "content-strategy", "calendar"],
    prompt: `Role:
Act as a senior content marketing strategist.

Context:
Business: [BUSINESS_TYPE]
Target audience: [TARGET_AUDIENCE]
Goal: [GOAL, e.g. "build organic traffic", "establish thought leadership"]
Resources: [RESOURCES, e.g. "1 writer, 4 hours/week"]

Objective:
Build a realistic content calendar and strategy for the next [TIMEFRAME].

Requirements:
- Identify 3-4 content pillars/themes that map directly to [TARGET_AUDIENCE]'s actual problems, not generic industry topics.
- Propose a realistic publishing cadence given [RESOURCES] — don't propose more than the resources can sustain.
- For each content pillar, suggest 2-3 specific piece ideas (not just the theme name) with the format (blog, video, guide) that fits it best.
- Define how success will be measured for [GOAL] specifically.

Expected Output:
The content pillars with example pieces, a publishing cadence, and the success metric tied to [GOAL].`
  },
  {
    id: 102,
    category: "Marketing",
    title: "SEO Content Brief for a Target Keyword",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["marketing", "seo", "content-brief"],
    prompt: `Role:
Act as a senior SEO content strategist.

Context:
Target keyword: [KEYWORD]
Search intent (if known): [SEARCH_INTENT, e.g. informational, transactional]
Audience: [TARGET_AUDIENCE]

Task:
Write a content brief a writer could execute directly for [KEYWORD].

Requirements:
- State the likely search intent behind [KEYWORD] and what the article must deliver to satisfy it.
- Propose a title and H2/H3 outline that covers the topic thoroughly without padding.
- List 3-5 related questions or subtopics worth covering (for topical depth), sourced from what someone searching [KEYWORD] would also want to know.
- Specify target word count range and the single most important thing the intro must do in the first 2 sentences.

Expected Output:
Search intent statement, title + heading outline, related subtopics list, and word count guidance.`
  },
  {
    id: 103,
    category: "Marketing",
    title: "Email Marketing Campaign Sequence",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["marketing", "email", "campaign"],
    prompt: `Role:
Act as a senior email marketing strategist.

Context:
Campaign goal: [GOAL, e.g. "nurture free trial users toward upgrade"]
Audience segment: [SEGMENT]
Number of emails: [EMAIL_COUNT]

Task:
Design the email sequence.

Requirements:
- Give each email in the sequence a distinct job (e.g. welcome/value, social proof, objection-handling, urgency) — no two emails should do the same thing.
- Write a subject line and one-paragraph summary of the body content for each email.
- Specify the send-timing gap between emails and why that gap makes sense for [GOAL].
- Define the single call-to-action per email and confirm it's consistent with [GOAL].

Expected Output:
An email-by-email table (Email # | Job | Subject Line | Timing | CTA) with the body summary for each.`
  },
  {
    id: 104,
    category: "Marketing",
    title: "Brand Positioning & Messaging Framework",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["marketing", "positioning", "brand"],
    prompt: `Role:
Act as a senior brand strategist.

Context:
Product/company: [PRODUCT_OR_COMPANY]
Target customer: [TARGET_CUSTOMER]
Main competitors: [COMPETITORS]
Current messaging (if any): [CURRENT_MESSAGING]

Objective:
Build a positioning and messaging framework.

Requirements:
- Define who this is for, what category it competes in, and the single most important reason to believe it's the right choice — the classic "for [X], who [Y], [product] is the [category] that [key benefit], unlike [alternative], because [reason to believe]" structure, filled in for real.
- Identify what [CURRENT_MESSAGING] (if given) gets wrong or leaves vague.
- Provide 3 messaging pillars, each with one supporting proof point.
- Write one short elevator pitch (2-3 sentences) derived from the framework.

Expected Output:
The positioning statement, 3 messaging pillars with proof points, and the elevator pitch.`
  },
  {
    id: 105,
    category: "Marketing",
    title: "Marketing Campaign Performance Analysis",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["marketing", "analytics", "performance"],
    prompt: `Role:
Act as a senior marketing analyst.

Context:
Campaign: [CAMPAIGN_DESCRIPTION]
Metrics so far: [METRICS, e.g. "impressions, CTR, conversion rate, CAC"]
Goal that was set: [ORIGINAL_GOAL]

Task:
Analyze whether this campaign is performing well and why.

Requirements:
- Compare [METRICS] against [ORIGINAL_GOAL] and state plainly whether it's on track, underperforming, or overperforming.
- Diagnose the most likely stage of the funnel where performance is weakest (awareness, interest, conversion) based on the metrics given.
- Propose 2-3 specific adjustments targeted at that weak stage, not a generic "try more channels" list.
- Note what additional data would sharpen this analysis if it's currently inconclusive.

Expected Output:
Performance verdict → weak-stage diagnosis → targeted adjustments → any additional data needed.`
  },
  {
    id: 106,
    category: "Marketing",
    title: "Product Launch Marketing Plan",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["marketing", "product-launch", "planning"],
    prompt: `Role:
Act as a senior product marketing manager.

Context:
Product: [PRODUCT_NAME]
Launch date: [LAUNCH_DATE]
Audience: [TARGET_AUDIENCE]
Channels available: [CHANNELS]

Objective:
Build a launch marketing plan across pre-launch, launch day, and post-launch.

Requirements:
- Pre-launch: define what builds anticipation (waitlist, teasers, early access) appropriate for [TARGET_AUDIENCE] and [CHANNELS].
- Launch day: define the exact sequence of actions and which channel leads.
- Post-launch: define how momentum is sustained in the following 2-4 weeks instead of the campaign dying after day one.
- Identify the single biggest risk to this launch (e.g. audience not ready, message unclear) and how the plan mitigates it.

Expected Output:
A three-phase plan (Pre-launch | Launch Day | Post-launch) with specific actions per phase, and the key risk with its mitigation.`
  },
  {
    id: 107,
    category: "Marketing",
    title: "Influencer / Partnership Outreach Pitch",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["marketing", "outreach", "partnerships"],
    prompt: `Write a short outreach message to [INFLUENCER_OR_PARTNER_NAME/TYPE] proposing a partnership around [PARTNERSHIP_IDEA]. Lead with something specific about their audience or work (not generic flattery), state exactly what you're proposing and what's in it for them, and end with a low-friction next step (not "let's hop on a call" — something they can say yes to in one line). Keep it under 120 words.`
  },
  {
    id: 108,
    category: "Marketing",
    title: "Ad Copy Variations for A/B Testing",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["marketing", "ad-copy", "ab-testing"],
    prompt: `Role:
Act as a senior performance-marketing copywriter.

Context:
Platform: [PLATFORM, e.g. Google Search, Meta Ads]
Product/offer: [PRODUCT_OR_OFFER]
Target audience: [TARGET_AUDIENCE]

Task:
Write ad copy variations for A/B testing.

Requirements:
- Write 4 headline variations, each testing a genuinely different angle (e.g. price/value, urgency, social proof, pain point) — not just reworded synonyms of the same angle.
- Write matching body copy for each headline, within [PLATFORM]'s typical length constraints.
- State which specific hypothesis each variation is testing, so results are interpretable afterward.
- Include one clear CTA per variation appropriate for [PLATFORM].

Expected Output:
A table (Variation | Headline | Body | Hypothesis Being Tested | CTA).`
  },

  // ================= SALES (109-116) =================
  {
    id: 109,
    category: "Sales",
    title: "Cold Outreach Email Sequence",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "cold-outreach", "email"],
    prompt: `Role:
Act as a senior B2B sales development rep who writes outreach that gets replies.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Target buyer: [TARGET_BUYER_PERSONA]
Pain point it solves: [PAIN_POINT]
Sequence length: [EMAIL_COUNT] emails

Task:
Write a cold outreach sequence for [TARGET_BUYER_PERSONA].

Requirements:
- Email 1 must lead with [PAIN_POINT] specifically, not a company introduction — assume they don't care who you are yet.
- Each subsequent email must add new value or a new angle (case study, different pain point, social proof) — never just "just following up."
- Keep every email short enough to read on a phone (under 100 words) except where a specific data point genuinely needs more room.
- End the final email with a clean, low-pressure break-up line rather than one more ask.

Expected Output:
The full sequence, each email labeled with its distinct angle, plus subject lines.`
  },
  {
    id: 110,
    category: "Sales",
    title: "Sales Discovery Call Framework",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "discovery-call", "framework"],
    prompt: `Role:
Act as a senior sales trainer.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Typical buyer: [BUYER_PERSONA]
Deal size/complexity: [DEAL_COMPLEXITY]

Task:
Build a discovery call framework/question set.

Requirements:
- Organize questions to uncover: current situation, pain/cost of inaction, decision process, and success criteria — in that order, so the conversation flows naturally rather than feeling like an interrogation.
- Write 2-3 open-ended questions per section that a real buyer would actually answer, not leading/loaded questions.
- Note the one or two signals during the call that indicate this is NOT a good-fit deal, so time isn't wasted chasing it.
- Define what "next step" looks like if the call goes well.

Expected Output:
The question framework organized by section, plus the disqualification signals and the ideal next-step definition.`
  },
  {
    id: 111,
    category: "Sales",
    title: "Handle a Specific Sales Objection",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "objection-handling"],
    prompt: `Role:
Act as a senior sales coach.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Objection heard: [OBJECTION, e.g. "it's too expensive", "we already use a competitor"]
Deal context: [DEAL_CONTEXT]

Task:
Help me handle this objection well, not dodge it.

Requirements:
- Identify what [OBJECTION] usually really means beneath the surface (e.g. "too expensive" is often "I don't yet see the value" or "I can't justify it internally").
- Give a response framework: acknowledge → clarify → reframe/address → confirm — with actual example language, not just the framework labels.
- Provide one clarifying question that would reveal whether this is a real blocker or a soft "not yet."
- Note when the honest right move is to accept the objection and walk away rather than push past it.

Expected Output:
The underlying-meaning diagnosis, example response language following the framework, and the clarifying question.`
  },
  {
    id: 112,
    category: "Sales",
    title: "Sales Proposal / Pitch Deck Outline",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "proposal", "pitch-deck"],
    prompt: `Role:
Act as a senior sales professional who builds proposals that close.

Context:
Prospect: [PROSPECT_CONTEXT, e.g. their industry, size, situation]
What they told you they need: [STATED_NEED]
Your solution: [YOUR_SOLUTION]
Deal value: [DEAL_VALUE]

Task:
Outline a sales proposal/deck for this prospect.

Requirements:
- Open with the prospect's situation and [STATED_NEED] in their own language, not your product's features first.
- Structure the middle as: their problem → cost of not solving it → your approach → why you specifically (differentiation) → proof (case study/results).
- Tailor the pricing/ROI framing to [DEAL_VALUE] — for larger deals, justify ROI explicitly; for smaller deals, keep it simple.
- End with one clear, specific next step, not a vague "let's discuss."

Expected Output:
A slide-by-slide (or section-by-section) outline with a one-line description of what each section must accomplish.`
  },
  {
    id: 113,
    category: "Sales",
    title: "Lead Qualification Framework",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "lead-qualification", "framework"],
    prompt: `Role:
Act as a senior sales operations consultant.

Context:
Product/service: [PRODUCT_OR_SERVICE]
Ideal customer profile: [ICP_DESCRIPTION]
Sales cycle length: [CYCLE_LENGTH]

Task:
Build a lead qualification framework appropriate for [CYCLE_LENGTH] and [ICP_DESCRIPTION].

Requirements:
- Choose a qualification approach (e.g. BANT, MEDDIC, a simpler custom checklist) that fits the deal complexity implied by [CYCLE_LENGTH] — don't impose an enterprise-grade framework on a short simple sales cycle or vice versa.
- Define the specific, checkable criteria for each qualification dimension (not vague categories).
- Define what score/combination of criteria makes a lead "sales-ready" vs. "needs nurturing" vs. "disqualify."
- Note where this qualification data should be captured so it doesn't live only in a rep's head.

Expected Output:
The qualification framework with concrete criteria per dimension, and the scoring/routing logic.`
  },
  {
    id: 114,
    category: "Sales",
    title: "Sales Follow-Up Cadence",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["sales", "follow-up", "cadence"],
    prompt: `Design a follow-up cadence for a prospect who [SITUATION, e.g. "went quiet after a great discovery call", "asked for a proposal but hasn't responded in 2 weeks"]. Give me the number of touches, the spacing between them, and the specific angle/value each touch should add (not just "checking in"). Keep it realistic — no more touches than a prospect would tolerate before it feels pushy.`
  },
  {
    id: 115,
    category: "Sales",
    title: "Deal Negotiation Strategy",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["sales", "negotiation", "strategy"],
    prompt: `Role:
Act as a senior sales negotiation coach.

Context:
Deal: [DEAL_DESCRIPTION]
What the prospect is pushing for: [PROSPECT_ASK, e.g. "20% discount", "extended payment terms"]
Your constraints: [YOUR_CONSTRAINTS, e.g. "can't go below X margin", "can offer added value instead of discount"]

Task:
Build a negotiation strategy for this deal.

Requirements:
- Identify what the prospect's [PROSPECT_ASK] likely signals about their real priority (price-sensitive vs. risk-averse vs. needs internal justification).
- Propose 2-3 concession options that trade something low-cost-to-you for something valuable-to-them, instead of a straight discount.
- Define your walk-away point given [YOUR_CONSTRAINTS] and what you'd do if the prospect won't move past it.
- Note the order in which to offer concessions (never lead with your best offer).

Expected Output:
The priority diagnosis, the concession options ranked by cost-to-you, and the walk-away point.`
  },
  {
    id: 116,
    category: "Sales",
    title: "Sales Pipeline Health Review",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["sales", "pipeline", "analysis"],
    prompt: `Role:
Act as a senior sales manager reviewing pipeline health.

Context:
Pipeline snapshot: [PIPELINE_DATA, e.g. deal count and stage per stage, average deal age per stage]
Quota/target: [TARGET]
Time remaining in period: [TIME_REMAINING]

Task:
Assess whether this pipeline can realistically hit [TARGET] in [TIME_REMAINING].

Requirements:
- Identify which stage has the most deals stuck longer than is typical, and what that usually indicates (poor qualification, stalled champion, pricing objection).
- Calculate whether the current pipeline value/count, at a reasonable close rate, is even mathematically sufficient to hit [TARGET] — flag it plainly if it isn't.
- Recommend 2-3 specific actions to unstick the biggest bottleneck stage.
- Distinguish between a coaching issue (rep behavior) and a pipeline-generation issue (not enough leads) if the data suggests one over the other.

Expected Output:
Bottleneck diagnosis, the math on whether target is achievable, and targeted unsticking actions.`
  },

  // ================= CUSTOMER SUPPORT (117-124) =================
  {
    id: 117,
    category: "Customer Support",
    title: "Customer Support Response Templates",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["customer-support", "templates", "communication"],
    prompt: `Role:
Act as a senior customer support lead.

Context:
Common issue: [ISSUE_TYPE, e.g. "billing discrepancy", "feature not working as expected"]
Brand tone: [BRAND_TONE]
Channel: [CHANNEL, e.g. email, live chat]

Task:
Write a reusable response template for [ISSUE_TYPE].

Requirements:
- Acknowledge the customer's specific frustration before jumping to the solution.
- Give a clear explanation of what happened (if known) without over-explaining internal processes the customer doesn't care about.
- State the concrete next step and timeline, not "we're looking into it."
- Leave clearly marked placeholders for the parts that must be personalized per customer (don't template the parts that need a human's judgment).

Expected Output:
The response template with placeholders marked, matching [BRAND_TONE] and appropriate for [CHANNEL]'s typical length.`
  },
  {
    id: 118,
    category: "Customer Support",
    title: "De-escalate an Angry Customer",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["customer-support", "de-escalation", "conflict"],
    prompt: `Role:
Act as a senior customer support lead specializing in de-escalation.

Context:
Situation: [SITUATION_DESCRIPTION]
What the customer said: [CUSTOMER_MESSAGE]
What actually happened on our end: [ACTUAL_SITUATION]

Task:
Draft a response that de-escalates this situation.

Requirements:
- Open by genuinely acknowledging the impact on the customer, not a scripted-sounding apology.
- Be honest about [ACTUAL_SITUATION] — don't over-promise or admit fault that isn't ours, but don't be defensive either.
- Offer a concrete resolution or next step, not just sympathy.
- Keep the tone calm and human — avoid corporate-speak that would make an already-angry customer angrier.

Expected Output:
The response message, plus a one-line note on what NOT to say in this situation and why.`
  },
  {
    id: 119,
    category: "Customer Support",
    title: "Write a Support Knowledge Base Article",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["customer-support", "knowledge-base", "documentation"],
    prompt: `Role:
Act as a senior technical support writer.

Context:
Topic: [TOPIC, e.g. "how to reset your password", "why an order shows as delayed"]
Audience technical level: [AUDIENCE_LEVEL]

Task:
Write a knowledge base article for [TOPIC].

Requirements:
- Open with a one-sentence summary of what this article solves, so a scanning reader knows immediately if they're in the right place.
- Write numbered steps if it's a how-to, or a clear explanation if it's a "why" article — match the format to the actual question type.
- Anticipate the most likely follow-up question or edge case and address it in a short "If this doesn't work" section.
- Avoid internal jargon or system names customers wouldn't recognize.

Expected Output:
The complete article in Markdown, ready to publish.`
  },
  {
    id: 120,
    category: "Customer Support",
    title: "Support Ticket Triage & Prioritization",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["customer-support", "triage", "prioritization"],
    prompt: `Role:
Act as a senior support operations lead.

Context:
Ticket volume: [VOLUME]
Team size: [TEAM_SIZE]
Ticket types seen: [TICKET_TYPES]

Task:
Design a triage and prioritization system for incoming tickets.

Requirements:
- Define priority tiers (e.g. Critical/High/Medium/Low) with concrete, checkable criteria per tier — not subjective judgment calls.
- Define target first-response and resolution times per tier appropriate for [TEAM_SIZE] and [VOLUME].
- Design how tickets get routed (by type, by tier, by skill) so the right ticket reaches the right person without manual sorting of every single one.
- Address what happens when a ticket's true priority only becomes clear after initial triage (re-prioritization path).

Expected Output:
The priority-tier table with criteria and SLAs, and the routing logic.`
  },
  {
    id: 121,
    category: "Customer Support",
    title: "Refund / Complaint Policy Response",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["customer-support", "refunds", "policy"],
    prompt: `Role:
Act as a senior customer support lead balancing policy and customer experience.

Context:
Policy: [POLICY_DESCRIPTION, e.g. "refunds within 30 days, case-by-case after that"]
Customer's request: [CUSTOMER_REQUEST]
Where it falls relative to policy: [POLICY_FIT, e.g. "just outside the window", "clearly within policy"]

Task:
Draft a response to this refund/complaint request.

Requirements:
- If within policy, approve clearly and quickly without making the customer justify themselves further.
- If outside policy per [POLICY_FIT], explain the policy without sounding like a wall — and state whether there's a reasonable exception to offer given the specifics, or why not.
- Avoid language that sounds like a form rejection; the customer should feel heard even if the answer is no.
- Offer an alternative resolution if a full refund isn't appropriate (partial credit, replacement, etc.) where relevant.

Expected Output:
The response message, plus a one-line internal note on the reasoning behind the decision (for the support record).`
  },
  {
    id: 122,
    category: "Customer Support",
    title: "Customer Onboarding Email Sequence",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["customer-support", "onboarding", "email"],
    prompt: `Role:
Act as a senior customer success manager.

Context:
Product: [PRODUCT_NAME]
Key action that predicts long-term retention: [KEY_ACTIVATION_ACTION, e.g. "connecting their first integration"]
Sequence length: [EMAIL_COUNT] emails over [TIMEFRAME]

Task:
Design an onboarding email sequence that drives customers toward [KEY_ACTIVATION_ACTION].

Requirements:
- Make every email's primary goal driving progress toward [KEY_ACTIVATION_ACTION] — cut anything that's just "here's another feature" noise.
- Sequence the emails so each builds on the last (don't repeat the same CTA if the previous one wasn't clicked — escalate or reframe instead).
- Include one email that proactively addresses the most common confusion new users have.
- Define what triggers a customer to exit this sequence early (they already completed the action).

Expected Output:
An email-by-email table (Email # | Goal | Subject | Key CTA | Exit Condition).`
  },
  {
    id: 123,
    category: "Customer Support",
    title: "Build a Canned-Response Macro Library",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["customer-support", "macros", "efficiency"],
    prompt: `Act as a senior support lead. Build a small library of 5 canned-response macros for these recurring situations: [LIST_OF_SITUATIONS, e.g. "order not received, wrong item shipped, how to cancel subscription, requesting an invoice, general thank-you-for-feedback"]. Each macro should be short, personalizable with clearly marked placeholders, and written in [BRAND_TONE]. Label each with the exact situation it's for so agents pick the right one fast.`
  },
  {
    id: 124,
    category: "Customer Support",
    title: "Analyze Support Ticket Trends for Product Feedback",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["customer-support", "product-feedback", "analysis"],
    prompt: `Role:
Act as a senior support operations analyst who bridges support and product teams.

Context:
Ticket themes observed over [TIMEFRAME]: [TICKET_THEMES_LIST]
Ticket volume per theme: [VOLUME_PER_THEME]

Task:
Turn this raw ticket data into actionable product feedback.

Requirements:
- Group the themes into: bugs (something broken), UX friction (works but confusing), missing features (customers asking for something that doesn't exist), and pure support/education gaps (answerable without a product change).
- Rank the groups by combined impact (volume × how clearly the fix would reduce future tickets).
- For the top 2-3 items, write them as a product team would want to receive them (problem statement + customer impact + rough frequency), not just "customers are complaining about X."
- Flag anything that's cheap-and-high-impact to fix (quick wins) separately from bigger structural issues.

Expected Output:
The categorized/ranked theme table and the top items written up as product-team-ready feedback.`
  },

  // ================= PRODUCTIVITY (125-132) =================
  {
    id: 125,
    category: "Productivity",
    title: "Weekly Planning & Prioritization System",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["productivity", "planning", "prioritization"],
    prompt: `Role:
Act as a productivity coach.

Context:
Role: [YOUR_ROLE]
Typical week's mix of work: [WORK_MIX, e.g. "meetings, deep coding work, ad-hoc requests"]
Current pain point: [PAIN_POINT, e.g. "always reactive, never get to the important stuff"]

Task:
Design a weekly planning system that fits [WORK_MIX] and fixes [PAIN_POINT].

Requirements:
- Recommend when and how to plan the week (e.g. Friday afternoon vs. Monday morning) and why, given [WORK_MIX].
- Give a concrete method for separating "important" from "urgent" tasks that I can apply in under 10 minutes.
- Address how to protect time for the important-but-not-urgent work that [PAIN_POINT] suggests keeps getting crowded out.
- Define one weekly review question that catches whether the system is actually working.

Expected Output:
The weekly planning routine as clear steps, the prioritization method, and the review question.`
  },
  {
    id: 126,
    category: "Productivity",
    title: "Meeting Agenda & Notes Template",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["productivity", "meetings", "template"],
    prompt: `Build a reusable meeting agenda + notes template for [MEETING_TYPE, e.g. "weekly 1:1", "sprint planning", "client status call"]. Include: purpose (one line), time-boxed agenda items, a section for decisions made, and a section for action items with owner and due date. Keep it tight enough that filling it out doesn't become its own chore.`
  },
  {
    id: 127,
    category: "Productivity",
    title: "Task Delegation Framework",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["productivity", "delegation", "management"],
    prompt: `Role:
Act as a management coach specializing in delegation.

Context:
My role: [YOUR_ROLE]
Team/people I can delegate to: [TEAM_DESCRIPTION]
What I'm currently holding onto that I probably shouldn't: [TASKS_HELD_ONTO]

Task:
Build a framework for deciding what to delegate and how.

Requirements:
- Give a simple test for whether a task should be delegated (e.g. based on who else could do it adequately, and the cost of your time doing it instead).
- Apply that test to [TASKS_HELD_ONTO] and give a clear delegate/keep verdict for each, with reasoning.
- For each task marked "delegate," specify how much context/autonomy to hand off (full ownership vs. checkpoint-based) based on the task's risk and the team member's experience.
- Address the common fear behind under-delegating ("it'll be done wrong" or "it's faster to do it myself") honestly.

Expected Output:
The delegation test, the verdict table for [TASKS_HELD_ONTO], and the autonomy-level guidance per delegated task.`
  },
  {
    id: 128,
    category: "Productivity",
    title: "Deep Work / Focus Time Blocking Plan",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["productivity", "deep-work", "time-blocking"],
    prompt: `Role:
Act as a productivity coach specializing in focus and deep work.

Context:
Work that needs deep focus: [DEEP_WORK_TYPE, e.g. "writing code", "writing reports"]
Calendar reality: [CALENDAR_REALITY, e.g. "meetings scattered through the day", "mornings are usually free"]
Interruption sources: [INTERRUPTION_SOURCES, e.g. "Slack, walk-up questions"]

Task:
Design a time-blocking plan that protects real focus time.

Requirements:
- Identify the best block(s) in a typical week for [DEEP_WORK_TYPE] given [CALENDAR_REALITY], not an idealized schedule that ignores reality.
- Propose a concrete way to handle [INTERRUPTION_SOURCES] during those blocks (status signals, batching responses, etc.) without becoming unreachable in a way that causes other problems.
- Suggest how long each block should be and why, based on the nature of [DEEP_WORK_TYPE].
- Address what to do when a block gets interrupted anyway (recovery approach, not just prevention).

Expected Output:
A sample weekly time-block layout and the interruption-handling approach.`
  },
  {
    id: 129,
    category: "Productivity",
    title: "Email Inbox Zero System",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["productivity", "email", "inbox-management"],
    prompt: `Role:
Act as a productivity coach specializing in email management.

Context:
Daily email volume: [VOLUME]
Current approach: [CURRENT_APPROACH, e.g. "leave everything in inbox, search when needed"]
Biggest frustration: [FRUSTRATION, e.g. "important emails get buried"]

Task:
Design a sustainable inbox system, not a one-time cleanup.

Requirements:
- Define a small set of categories/folders that map to actual decisions (e.g. "needs reply," "waiting on someone," "reference"), not an elaborate folder tree that's a chore to maintain.
- Give a decision rule for every incoming email (act now if under 2 minutes, schedule, delegate, file, delete) so nothing sits unprocessed.
- Address [FRUSTRATION] specifically with a concrete mechanism, not a general tip.
- Suggest a realistic daily/weekly cadence for processing, matched to [VOLUME].

Expected Output:
The category system, the per-email decision rule, and the processing cadence.`
  },
  {
    id: 130,
    category: "Productivity",
    title: "Project Kickoff Checklist",
    difficulty: "Beginner",
    promptType: "Medium Prompt",
    tags: ["productivity", "project-management", "checklist"],
    prompt: `Role:
Act as a senior project manager.

Context:
Project type: [PROJECT_TYPE]
Team involved: [TEAM_DESCRIPTION]
Past kickoff pain point: [PAST_PAIN_POINT, e.g. "scope was unclear and changed mid-project"]

Task:
Build a project kickoff checklist that specifically prevents [PAST_PAIN_POINT] from happening again.

Requirements:
- Cover: scope/goals clarity, roles and ownership, timeline and milestones, communication plan, and definition of done.
- For each checklist item, state briefly why skipping it tends to cause problems later.
- Make the item addressing [PAST_PAIN_POINT] specific and concrete, not generic ("clarify scope" isn't enough — say how).
- Keep the checklist usable — a project team should be able to work through it in one kickoff meeting.

Expected Output:
The checklist grouped by category, with a one-line rationale per item.`
  },
  {
    id: 131,
    category: "Productivity",
    title: "Decision-Making Framework for a Tough Choice",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["productivity", "decision-making", "framework"],
    prompt: `Role:
Act as a decision-making coach.

Context:
Decision I'm facing: [DECISION_DESCRIPTION]
Options: [OPTIONS_LIST]
What's making it hard: [DIFFICULTY_REASON, e.g. "both options have real downsides", "I don't have enough information"]

Task:
Help me actually make this decision, not just list pros and cons.

Requirements:
- Identify whether this is a reversible or irreversible decision, and adjust how much deliberation time is actually warranted accordingly.
- Surface the 1-2 factors that matter most here (not a flat list where everything looks equally important).
- If [DIFFICULTY_REASON] is a lack of information, specify exactly what information would resolve the biggest uncertainty, and whether it's actually gettable in reasonable time.
- Give a clear recommendation given what's known, while flagging any assumption the recommendation depends on.

Expected Output:
Reversibility assessment, the decisive factors, any missing-information gap, and a direct recommendation with its key assumption stated.`
  },
  {
    id: 132,
    category: "Productivity",
    title: "Personal Productivity Audit",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["productivity", "self-audit", "reflection"],
    prompt: `Role:
Act as a productivity coach conducting an honest audit.

Context:
A rough log of how my time actually went last week: [TIME_LOG_OR_DESCRIPTION]
What I wish I'd spent more time on: [DESIRED_FOCUS]

Task:
Audit this week honestly and identify what to change.

Requirements:
- Identify where time went that didn't serve [DESIRED_FOCUS] or any other clear priority — be specific, not a vague "you're too busy."
- Distinguish between time lost to genuinely necessary work (can't be cut) and time lost to avoidable patterns (can be cut or reduced).
- Propose one specific, small change to try next week, not a complete life overhaul — something realistic to actually stick to.
- Define how I'd know in one week whether that change worked.

Expected Output:
The audit findings (necessary vs. avoidable time loss), one concrete change to try, and the success check.`
  },

  // ================= RESEARCH (133-140) =================
  {
    id: 133,
    category: "Research",
    title: "Structured Research Plan",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "planning", "methodology"],
    prompt: `Role:
Act as a senior research analyst.

Context:
Research question: [RESEARCH_QUESTION]
Purpose: [PURPOSE, e.g. "inform a business decision", "academic understanding"]
Time available: [TIME_AVAILABLE]

Task:
Build a structured research plan to answer [RESEARCH_QUESTION].

Requirements:
- Break [RESEARCH_QUESTION] into 3-4 concrete sub-questions that, once answered, add up to a real answer.
- For each sub-question, suggest what type of source would actually answer it (primary data, expert interviews, published studies, competitor filings) — not just "search online."
- Sequence the sub-questions by dependency (which must be answered before others make sense to pursue).
- Given [TIME_AVAILABLE], flag if the scope needs to be narrowed to be realistic.

Expected Output:
The sub-question breakdown with source type per question, sequenced, plus a scope note if needed.`
  },
  {
    id: 134,
    category: "Research",
    title: "Summarize and Synthesize Multiple Sources",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "synthesis", "summarization"],
    prompt: `Role:
Act as a senior research analyst specializing in synthesis, not just summary.

Context:
Sources: [PASTE_OR_DESCRIBE_SOURCES]
Question I'm trying to answer: [GUIDING_QUESTION]

Task:
Synthesize these sources into a coherent answer to [GUIDING_QUESTION].

Requirements:
- Don't summarize each source one by one — organize by theme or finding, and note which sources support or contradict each theme.
- Explicitly flag where sources disagree, rather than smoothing over the disagreement.
- Distinguish between findings that are well-supported (multiple sources agree) and those that are speculative or single-sourced.
- State plainly if the sources are insufficient to fully answer [GUIDING_QUESTION], and what's missing.

Expected Output:
A theme-organized synthesis with source agreement/disagreement noted, and an honest gap assessment.`
  },
  {
    id: 135,
    category: "Research",
    title: "User Research Interview Guide",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "user-research", "interviews"],
    prompt: `Role:
Act as a senior user researcher.

Context:
What I'm trying to learn: [RESEARCH_GOAL, e.g. "why users abandon onboarding"]
Participant type: [PARTICIPANT_TYPE]
Interview length: [DURATION]

Task:
Build a user interview guide for [RESEARCH_GOAL].

Requirements:
- Write open-ended questions that avoid leading the participant toward an answer you expect.
- Sequence from broad/warm-up questions to specific ones, ending with the most sensitive or pointed questions once rapport is built.
- Include 2-3 follow-up probes ("tell me more about that," "why was that frustrating") to use when an answer is too surface-level.
- Fit realistically within [DURATION] — don't write more questions than can actually be covered.

Expected Output:
The interview guide with main questions and probes, timed roughly to fit [DURATION].`
  },
  {
    id: 136,
    category: "Research",
    title: "Competitive Market Research Report Outline",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "market-research", "competitive-analysis"],
    prompt: `Role:
Act as a senior market research analyst.

Context:
Market: [MARKET_DESCRIPTION]
Purpose of the report: [PURPOSE, e.g. "inform a go-to-market decision", "brief investors"]
Audience: [AUDIENCE]

Task:
Outline a market research report structure for [MARKET_DESCRIPTION].

Requirements:
- Structure sections to build toward [PURPOSE] specifically, not a generic "market overview" template.
- For each section, state the specific question it must answer, so whoever fills it in knows exactly what's needed.
- Recommend which sections need primary research/data vs. which can rely on secondary/desk research.
- Keep the structure appropriately scoped for [AUDIENCE] — don't over-build a report meant for a quick internal decision.

Expected Output:
The report outline (section | question it answers | primary vs. secondary research needed).`
  },
  {
    id: 137,
    category: "Research",
    title: "Survey Design for Customer Feedback",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "surveys", "customer-feedback"],
    prompt: `Role:
Act as a senior research analyst specializing in survey design.

Context:
What I want to learn: [RESEARCH_GOAL]
Audience: [AUDIENCE]
Where it'll be sent: [DISTRIBUTION_CHANNEL, e.g. email, in-app]

Task:
Design a survey for [RESEARCH_GOAL].

Requirements:
- Keep the survey as short as possible while still answering [RESEARCH_GOAL] — cut any question that's "nice to know" but not decision-relevant.
- Avoid leading or double-barreled questions (asking two things in one question).
- Mix question types appropriately (rating scale, multiple choice, one open-ended question) rather than making everything open-ended (fatigue) or everything closed (loses nuance).
- Order questions from general to specific, with any demographic questions at the end, not the start.

Expected Output:
The complete survey with question types labeled, plus a one-line note on why any cut questions were excluded.`
  },
  {
    id: 138,
    category: "Research",
    title: "Fact-Check / Verify a Claim",
    difficulty: "Beginner",
    promptType: "Short Prompt",
    tags: ["research", "fact-checking", "verification"],
    prompt: `Help me think through how to verify this claim: [CLAIM]. Tell me what kind of evidence would actually confirm or refute it (not just "search for it"), what kind of source would be most credible for this specific claim, and any reason to be skeptical of the claim as stated (vague wording, missing context, a stat without a source).`
  },
  {
    id: 139,
    category: "Research",
    title: "Turn Research Into an Executive Summary",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "executive-summary", "communication"],
    prompt: `Role:
Act as a senior analyst who writes for busy executives.

Context:
Full research/findings: [PASTE_OR_DESCRIBE_FINDINGS]
Decision this needs to inform: [DECISION_CONTEXT]
Audience: [AUDIENCE, e.g. "C-suite, non-technical"]

Task:
Turn this into a tight executive summary.

Requirements:
- Lead with the bottom-line answer/recommendation relevant to [DECISION_CONTEXT], not the research methodology or background first.
- Include only the findings that actually change the decision — cut anything interesting-but-not-decision-relevant.
- Use plain language appropriate for [AUDIENCE] — no jargon without a one-phrase explanation.
- Keep it to a length a busy executive would actually read (state the target length explicitly, e.g. "half a page").

Expected Output:
The executive summary: bottom-line recommendation first, then the 3-4 supporting findings, in plain language.`
  },
  {
    id: 140,
    category: "Research",
    title: "Technology Feasibility Research",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["research", "feasibility", "technology"],
    prompt: `Role:
Act as a senior technical researcher.

Context:
Idea/requirement: [IDEA_OR_REQUIREMENT]
Constraints: [CONSTRAINTS, e.g. budget, timeline, existing stack compatibility]

Task:
Research and assess the feasibility of [IDEA_OR_REQUIREMENT].

Requirements:
- Identify what would need to be true (technically and practically) for this to work given [CONSTRAINTS].
- Identify existing tools/approaches that already solve this or something close to it, so we're not reinventing something well-established.
- Flag the biggest technical risk or unknown that could make this infeasible, and what would need to be tested early to de-risk it.
- Give an honest feasibility verdict: straightforward, feasible with effort, or high-risk/questionable — with reasoning.

Expected Output:
The feasibility requirements, relevant existing approaches, the biggest risk, and the honest verdict.`
  },

  // ================= AI AGENTS (141-150) =================
  {
    id: 141,
    category: "AI Agents",
    title: "Design an AI Agent's System Prompt / Persona",
    difficulty: "Intermediate",
    promptType: "Long Prompt",
    tags: ["ai-agents", "system-prompt", "persona"],
    prompt: `Role:
Act as a senior AI product designer specializing in agent behavior design.

Context:
Agent's purpose: [AGENT_PURPOSE, e.g. "internal support assistant for engineers"]
Users: [USERS]
Tone/personality needed: [TONE]
Boundaries: [BOUNDARIES, e.g. "must not give legal advice", "must escalate billing questions to a human"]

Task:
Write a system prompt that defines this agent's identity and behavior.

Requirements:
- State the agent's role and purpose in the first lines, unambiguously.
- Define its tone/personality with concrete behavioral guidance (e.g. "concise, no filler phrases" is concrete; "friendly" alone is not).
- Encode [BOUNDARIES] as explicit rules, including what the agent should do instead when a boundary is hit (redirect, escalate, decline clearly).
- Specify how the agent should handle ambiguous or out-of-scope requests, so behavior is defined even for cases you didn't anticipate.

Expected Output:
The complete system prompt, organized into clear sections (role, tone, boundaries, fallback behavior).`
  },
  {
    id: 142,
    category: "AI Agents",
    title: "AI Agent Tool-Use / Function-Calling Spec",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ai-agents", "tool-use", "function-calling"],
    prompt: `Role:
Act as a senior AI engineer specializing in agent tool design.

Context:
Agent's task: [AGENT_TASK]
Available system/data it needs to act on: [SYSTEM_OR_DATA]
Risk level of actions: [RISK_LEVEL, e.g. "read-only lookups" vs "can modify customer records"]

Task:
Design the tool/function specifications this agent needs.

Requirements:
- Define each tool with a clear name, purpose, required parameters (with types), and what it returns — precise enough for the model to call it correctly without ambiguity.
- For any tool matching [RISK_LEVEL] as higher-risk (writes, deletes, sends), define whether it requires human confirmation before executing, and how that confirmation step is modeled.
- Design tools to be as narrow and specific as reasonably possible (avoid one giant do-everything tool) so the model's tool choice stays unambiguous.
- Define what the agent should do if a tool call fails or returns unexpected data.

Expected Output:
A tool specification table (Tool Name | Purpose | Parameters | Returns | Confirmation Required?) plus the failure-handling behavior.`
  },
  {
    id: 143,
    category: "AI Agents",
    title: "Multi-Step AI Agent Workflow Design",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ai-agents", "workflow", "orchestration"],
    prompt: `Role:
Act as a senior AI systems architect.

Context:
End goal the agent must accomplish: [END_GOAL, e.g. "research a lead and draft a personalized outreach email"]
Steps likely required: [LIKELY_STEPS]
Failure tolerance: [FAILURE_TOLERANCE, e.g. "must not send anything without review", "fully autonomous is fine"]

Task:
Design the multi-step workflow this agent should follow to accomplish [END_GOAL].

Requirements:
- Break [END_GOAL] into an explicit ordered sequence of steps, each with a clear success condition before moving to the next.
- Identify which steps can run autonomously and which require a checkpoint given [FAILURE_TOLERANCE].
- Define what happens if a step fails or produces a low-confidence result (retry, ask for clarification, halt and report) rather than silently continuing.
- Note where this workflow could go wrong in a way that's hard to detect (e.g. confidently wrong output) and how to guard against it.

Expected Output:
The step-by-step workflow with success conditions, checkpoints, and failure-handling per step.`
  },
  {
    id: 144,
    category: "AI Agents",
    title: "AI Agent Guardrails & Safety Constraints",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["ai-agents", "guardrails", "safety"],
    prompt: `Role:
Act as a senior AI safety-focused engineer.

Context:
Agent's purpose: [AGENT_PURPOSE]
Access/permissions it has: [ACCESS_LEVEL]
Known risk scenarios: [RISK_SCENARIOS, e.g. "could be prompted to reveal other users' data", "could take a destructive action by mistake"]

Task:
Define the guardrails this agent needs.

Requirements:
- For each item in [RISK_SCENARIOS], define a specific constraint or check that prevents it, not a vague "be careful" instruction.
- Define input-side guardrails (what requests the agent should refuse or flag) separately from output-side guardrails (what it should never produce or execute).
- Address prompt-injection risk if the agent processes untrusted content (e.g. web pages, user-uploaded files) as part of its task.
- Define what logging or human-visible audit trail should exist for actions taken by this agent, given [ACCESS_LEVEL].

Expected Output:
The guardrail list split into input-side and output-side, the prompt-injection mitigation, and the audit-trail requirement.`
  },
  {
    id: 145,
    category: "AI Agents",
    title: "AI Agent Memory / Context Management Strategy",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["ai-agents", "memory", "context-management"],
    prompt: `Role:
Act as a senior AI systems architect specializing in agent memory design.

Context:
Agent's use case: [USE_CASE, e.g. "long-running project assistant across many sessions"]
What needs to persist: [WHAT_TO_REMEMBER, e.g. "user preferences, past decisions, ongoing task state"]
Context window constraint: [CONTEXT_CONSTRAINT]

Task:
Design a memory/context management strategy for this agent.

Requirements:
- Decide what belongs in short-term context (current conversation) vs. long-term memory (persisted across sessions) for [WHAT_TO_REMEMBER].
- Define how long-term memory is retrieved and injected back into context without blowing past [CONTEXT_CONSTRAINT] — summarization, retrieval-by-relevance, or selective loading.
- Address memory staleness: how outdated or superseded memory gets updated or removed rather than accumulating forever.
- Note what should explicitly NOT be stored (sensitive data, one-off details that don't need to persist).

Expected Output:
The short-term vs. long-term split, the retrieval/injection approach, and the staleness-handling policy.`
  },
  {
    id: 146,
    category: "AI Agents",
    title: "Customer-Facing AI Chatbot Conversation Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ai-agents", "chatbot", "conversation-design"],
    prompt: `Role:
Act as a senior conversation designer for customer-facing AI chatbots.

Context:
Chatbot purpose: [PURPOSE, e.g. "answer product questions and route complex issues to a human"]
Brand tone: [BRAND_TONE]
Escalation triggers: [ESCALATION_TRIGGERS, e.g. "billing disputes, angry sentiment, 2 failed clarifications"]

Task:
Design the conversation flow and behavior rules for this chatbot.

Requirements:
- Define the opening message and how the bot clarifies what the user needs without an interrogation-style question list.
- Define exactly how and when it hands off to a human based on [ESCALATION_TRIGGERS], including what it tells the user during handoff (never leave them wondering if they're stuck with the bot).
- Define how the bot handles not knowing an answer — never fabricate, always have a clear fallback.
- Keep responses in [BRAND_TONE] while staying concise enough for a chat interface.

Expected Output:
The conversation flow (opening → clarification → resolution or escalation), with the escalation and don't-know fallback behavior explicitly defined.`
  },
  {
    id: 147,
    category: "AI Agents",
    title: "AI Agent Evaluation & Testing Plan",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ai-agents", "evaluation", "testing"],
    prompt: `Role:
Act as a senior AI evaluation engineer.

Context:
Agent's task: [AGENT_TASK]
What "good" looks like: [SUCCESS_DEFINITION]
Known failure modes so far: [KNOWN_FAILURES, if any]

Objective:
Design an evaluation plan for this agent before wider rollout.

Requirements:
- Define concrete, checkable success criteria derived from [SUCCESS_DEFINITION] — not just "the output looks reasonable."
- Build a test set covering: typical cases, edge cases, and adversarial/misuse attempts relevant to [AGENT_TASK].
- If [KNOWN_FAILURES] were given, ensure the test set specifically includes regression cases for each.
- Define whether evaluation should be automated (rule-based or model-graded) vs. human-reviewed for each criteria type, and why.
- Define the bar for "ready to ship" vs. "needs more work" based on eval results.

Expected Output:
The success criteria, the test-case categories with examples, the automated-vs-human evaluation split, and the ship/no-ship bar.`
  },
  {
    id: 148,
    category: "AI Agents",
    title: "Human-in-the-Loop AI Agent Handoff Design",
    difficulty: "Intermediate",
    promptType: "Medium Prompt",
    tags: ["ai-agents", "human-in-the-loop", "handoff"],
    prompt: `Role:
Act as a senior AI product designer specializing in human-AI collaboration.

Context:
Agent's task: [AGENT_TASK]
Where human judgment is still required: [HUMAN_JUDGMENT_POINTS, e.g. "final approval before sending", "ambiguous edge cases"]
Volume: [VOLUME, e.g. "hundreds of cases per day"]

Task:
Design the handoff points between the agent and a human reviewer.

Requirements:
- Define exactly when the agent hands off to a human, based on [HUMAN_JUDGMENT_POINTS] — confidence threshold, specific case types, or both.
- Design what information the human reviewer sees at handoff so they can decide quickly without redoing the agent's work from scratch.
- Given [VOLUME], design how review queues are prioritized so the most time-sensitive or highest-risk cases are reviewed first.
- Define what happens to the agent's future behavior based on the human's decision (does it learn/adjust, or is each case independent?).

Expected Output:
The handoff trigger logic, the reviewer's information view, the queue prioritization approach, and the feedback-loop behavior.`
  },
  {
    id: 149,
    category: "AI Agents",
    title: "Multi-Agent System Design (Orchestration)",
    difficulty: "Advanced",
    promptType: "Long Prompt",
    tags: ["ai-agents", "multi-agent", "orchestration"],
    prompt: `Role:
Act as a senior AI systems architect specializing in multi-agent systems.

Context:
Overall goal: [OVERALL_GOAL, e.g. "research a topic, draft a report, and fact-check it before delivery"]
Why multiple agents (vs. one): [REASON_FOR_MULTI_AGENT, e.g. "distinct specialized skills needed", "need an independent check on the output"]

Objective:
Design a multi-agent system to accomplish [OVERALL_GOAL].

Requirements:
- Define each sub-agent's specific role and why it's separated from the others (avoid splitting agents just for the sake of it — justify each one against [REASON_FOR_MULTI_AGENT]).
- Define the orchestration pattern (a coordinator agent delegating to specialists vs. a fixed pipeline vs. peer agents negotiating) and justify the choice.
- Define how information passes between agents (shared state, message passing) and how conflicts or disagreements between agents are resolved.
- Identify the failure mode most likely in a multi-agent setup (e.g. agents talking past each other, compounding errors) and how this design guards against it.

Expected Output:
The sub-agent roles with justification, the orchestration pattern, the inter-agent communication design, and the failure-mode mitigation.`
  },
  {
    id: 150,
    category: "AI Agents",
    title: "Debug an AI Agent's Unexpected Behavior",
    difficulty: "Advanced",
    promptType: "Medium Prompt",
    tags: ["ai-agents", "debugging", "troubleshooting"],
    prompt: `Role:
Act as a senior AI engineer specializing in debugging agent behavior.

Context:
Agent's task: [AGENT_TASK]
Expected behavior: [EXPECTED_BEHAVIOR]
Actual (wrong) behavior observed: [ACTUAL_BEHAVIOR]
Relevant system prompt / tool setup: [PASTE_RELEVANT_CONFIG]

Task:
Diagnose why the agent produced [ACTUAL_BEHAVIOR] instead of [EXPECTED_BEHAVIOR].

Requirements:
- Rank the most likely causes: ambiguous/conflicting system prompt instructions, a tool returning unexpected data, missing context, or a genuinely hard edge case the instructions never covered.
- For the most likely cause, point to the specific part of [PASTE_RELEVANT_CONFIG] that's responsible, don't just say "the prompt needs work."
- Propose the specific fix (reworded instruction, added guardrail, additional context, tool schema change).
- Suggest one test case that would catch this specific failure in the future if it were part of a regression suite.

Expected Output:
Ranked hypotheses → most likely cause pinpointed in the config → specific fix → the regression test case.`
  }

];

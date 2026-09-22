/**
 * The Founder's Marketer: site content
 *
 * Single source of truth for every string, price, placeholder and diagnostic
 * rule on the page. Components read from here and never carry copy of their own.
 * Brief: "The Founder's Marketer: website brief v2 (v0 / v1 releases)".
 * Edits: site-edits.md (American English, no em dashes, CTA set).
 *
 * Conventions
 *   null price          not decided yet: the phase row is hidden until a tier has a price; pricing.emptyPrice fills the rest
 *   TODO(sophie)        copy Sophie owns; the placeholder ships if still open at build
 *   VERBATIM(pkg …)     drafted here; replace with the exact text from the package doc v3
 *   status: "draft"     same idea for whole entries
 *   release.*           what v0 shows; flip flags for v1, don't fork the file
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PhaseId = 1 | 2 | 3;
export type TierId = "who" | "sortOf" | "nextHire";
export type CopyStatus = "final" | "draft" | "placeholder";

export interface Phase {
  id: PhaseId;
  question: string; // the phase's name on the page
  duration: string;
  summary: string; // section 4 card
  job: string; // section 5 panel: THE JOB
  youGetHeading: "You get" | "What gets built";
  youGet: string[];
  yourTime: string | null;
  weekByWeek?: { period: string; activity: string }[]; // v1, Phase 1 only
  status: CopyStatus;
}

export interface Tier {
  id: TierId;
  label: string;
  whoLine: string;
  prices: Record<`phase${PhaseId}`, number | null>;
}

export interface DiagnosticOption {
  id: string;
  label: string;
  score: number | null; // null = not scored (tier / free text)
}

export interface DiagnosticQuestion {
  id: number;
  prompt: string;
  kind: "single" | "twoNumbers" | "freeText";
  options?: DiagnosticOption[];
  fields?: { id: string; label: string }[]; // twoNumbers
  required?: boolean; // default true; Q10 is optional
  gap?: string; // what a low score means
  freeFix?: string; // the free-fix line in the results email
  phase?: string; // which phase addresses it
}

export interface FaqItem {
  question: string;
  answer: string;
  status: CopyStatus;
  show: boolean;
}

/* ------------------------------------------------------------------ */
/*  Release switches                                                   */
/* ------------------------------------------------------------------ */

export const release = {
  version: "v0" as "v0" | "v1",
  diagnostic: "stepper" as "form" | "stepper", // "form": one screen; "stepper": one question per step (site-edits.md). Both post to the same Netlify Form
  directDiagnosticRoute: false, // /diagnostic (v1)
  showWhatYouGet: false, // section 7 (v1)
  showProof: false, // section 9 (v1)
  showPricingTerms: false, // payment terms + add-ons under the table (v1 or FAQ)
  showPhase1WeekByWeek: false, // v1
  showExclusionsFaq: false, // until exclusions are decided
};

/* ------------------------------------------------------------------ */
/*  Site                                                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: "The Founder's Marketer",
  domain: "thefoundersmarketer.com",
  title: "The Founder's Marketer: marketing for B2B companies before their first marketing hire",
  description:
    "A fixed-scope, fixed-price program that builds the marketing function for B2B companies with founder-led sales, in three phases, and leaves you running it.",
  location: "Durango, Colorado",
  email: null as string | null, // TODO(sophie)
  linkedin: null as string | null, // TODO(sophie)
  bookingUrl: null as string | null, // TODO(sophie): Calendly or equivalent; used in thank-you state and results email only
  bookingLabel: "Book the free 45-minute walkthrough",
};

export const anchors = {
  howItWorks: "how-it-works",
  pricing: "pricing",
  about: "about",
  diagnostic: "diagnostic",
};

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

export const nav = {
  links: [
    { label: "How it works", href: `#${anchors.howItWorks}` },
    { label: "Pricing", href: `#${anchors.pricing}` },
    { label: "About", href: `#${anchors.about}` },
  ],
  cta: { label: "What to fix first", href: `#${anchors.diagnostic}` },
};

/* ------------------------------------------------------------------ */
/*  1 · Hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  wordmark: "The Founder's Marketer",
  // One h1 on two lines; the first line never wraps on its own
  headlineLines: ["You built something people buy.", "Let's build the marketing to sell more of it."],
  lead: "Sales works. Marketing is still nobody's job.",
  bullets: [
    "Who you sell to lives in your head.",
    "What you say changes with every deck.",
    "The CRM is a contact list, not a pipeline.",
  ],
  close: "Three fixed-price phases. We build it, you run it. Start with the free diagnostic.",
  primaryCta: { label: "See what to fix first", href: `#${anchors.diagnostic}` },
  secondaryCta: { label: "How it works", href: `#${anchors.howItWorks}` },
  microcopy: "Ten questions, free.", // small text under the buttons
};

/* ------------------------------------------------------------------ */
/*  2 · Why now                                                        */
/* ------------------------------------------------------------------ */

export const whyNow = {
  heading: "Product first, then sales. Now it's time for marketing.",
  left: {
    title: "Where you are",
    bullets: [
      "You found product-market fit. People buy what you built, and they keep buying.",
      "You built product and sales first, because a company can't start without them.",
      "Sales is founder-led, or close to it. You know who buys and why. It's just not written down.",
      "You haven't narrowed who you sell to yet. \"We won't turn anyone away.\"",
      "The CRM is neglected, or there isn't one.",
      "Leads that don't close get forgotten.",
    ],
  },
  right: {
    title: "Why it's time",
    paragraphs: [
      "Marketing gets passed around like a hot potato. Nobody owns it, so it's a chore instead of a function. That's the small problem.",
      "The big one: you're not building the pipeline you could, and it's throttling growth. Marketing is the next function to build, for the same reason sales came after product. It's the one that sells more of what you built.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  3 · Do you have the problem?                                       */
/* ------------------------------------------------------------------ */

export const checklist = {
  heading: "Does this sound like you?",
  items: [
    "Your reps, slides and website all describe the product a little differently.",
    "Your win rate is squishy.",
    "Most of your wins come from referrals, and referrals are unpredictable.",
    "Ask three people on your team who the ideal customer is and you'll get three answers.",
    "Your CRM has thousands of contacts and no way to tell which ones matter.",
    "You've written the positioning three times and it still doesn't stick.",
  ],
  threshold: 3,
  ctaBefore: "Three or more?",
  ctaCounted: "That's {n}.", // {n} = checked count; shown once count >= threshold
  ctaLabel: "See what to fix first",
  ctaHref: `#${anchors.diagnostic}`,
};

/* ------------------------------------------------------------------ */
/*  4 + 5 · How it works, phase detail                                  */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  heading: "Three phases.", // "phases" everywhere on the page; "steps" is not used
};

export const phases: Phase[] = [
  {
    id: 1,
    question: "What can we win now?",
    duration: "4 weeks",
    summary: "A campaign in market and the decisions it depends on",
    job: "Get something revenue-facing into market inside a month, and make the decisions everything else depends on.",
    youGetHeading: "You get",
    youGet: [
      "An adversarial read of your own data",
      "An ICP decision and scoring rubric",
      "A messaging framework",
      "One campaign in market",
      "Provisional sales stages",
      "What we kept out of market",
    ],
    yourTime: "About 5 hours in meetings plus async approvals",
    weekByWeek: [
      { period: "Pre", activity: "Diagnostic results, intake, CRM exports" },
      { period: "Week 1", activity: "Kickoff; systems walkthrough" },
      { period: "Week 2", activity: "ICP rubric built; targets segmented" },
      { period: "Week 3", activity: "Campaign review; assets written" },
      { period: "Week 4", activity: "Launch; readout" },
    ],
    status: "final",
  },
  {
    id: 2,
    question: "Who do we sell to, and how?",
    duration: "4-8 weeks",
    summary: "ICP, personas, qualifiers, sales stages, clean CRM",
    job: "Turn Phase 1's provisional decisions into systems the company runs without us.",
    youGetHeading: "What gets built",
    youGet: [
      "CRM foundation: undeliverables archived, unused fields retired, ICP score and qualification fields added",
      "Qualification: a written MQL→SQL gate whose questions double as discovery questions",
      "Buyer personas and the ICP written where sales uses it",
      "Contact acquisition: an enrichment pilot on the highest-value segment before any vendor contract",
      "Messaging and proof: the ROI model rebuilt before any cost figure enters copy; the competitive set updated",
      "Compliance: cold outreach routed off the marketing-email tool onto a dedicated sending domain",
    ],
    yourTime: null, // TODO(sophie)
    status: "draft", // VERBATIM(pkg §The three phases)
  },
  {
    id: 3,
    question: "How do we reach them?",
    duration: "4-8 weeks",
    summary: "Segments activated, dashboard, handoff",
    job: "Activate the segments, put a dashboard in front of the team, and hand the function off.",
    youGetHeading: "What gets built",
    youGet: [
      "Campaigns running across the tiered segments, not just the first one",
      "A pipeline dashboard the team reads without you",
      "The handoff playbook: rubric, framework, fields and campaign maps, documented",
      "The job description for your first marketer, written from the function that now exists",
    ],
    yourTime: null, // TODO(sophie)
    status: "draft", // VERBATIM(pkg §The three phases)
  },
];

/* ------------------------------------------------------------------ */
/*  6 · Pricing                                                        */
/* ------------------------------------------------------------------ */

export const pricing = {
  heading: "Three tiers, based on where marketing stands today",
  floor: null as number | null, // TODO(sophie): Phase 1 "from {price}"; the one number v0 needs
  floorLabel: "Phase 1 from {price}",
  emptyPrice: "TBD", // fills a null cell in a phase row that another tier has priced
  tiers: [
    {
      id: "who",
      label: "Marketing, who?",
      whoLine: "Nobody's job. The founder sells; the CRM is a contact list.",
      prices: { phase1: null, phase2: null, phase3: null },
    },
    {
      id: "sortOf",
      label: "Marketing, sort of",
      whoLine: "Someone does it on the side: ops, sales, the founder on Fridays.",
      prices: { phase1: null, phase2: null, phase3: null },
    },
    {
      id: "nextHire",
      label: "Marketing, next hire",
      whoLine: "You've budgeted for a marketer or you're writing the JD.",
      prices: { phase1: null, phase2: null, phase3: null },
    },
  ] as Tier[],
  whoLinesStatus: "draft" as CopyStatus, // TODO(sophie): read in voice
  rowLabels: { who: "Who", phase: "Phase {n}" }, // PROPOSED: who → "Sounds like"
  cta: { label: "Find your tier and what to fix first", href: `#${anchors.diagnostic}` },
  // Hidden while release.showPricingTerms is false
  terms: "50% of each phase at kickoff, 50% on delivery. Net 15.",
  addOnsIntro: "Add-ons by change order:",
  addOns: ["conference-to-pipeline", "regulated-buyer messaging", "community setup", "website"],
};

/* ------------------------------------------------------------------ */
/*  7 · What you get (hidden in v0)                                     */
/* ------------------------------------------------------------------ */

export const whatYouGet = {
  heading: "Shown, not described",
  items: [
    { title: "ICP scoring tool", image: "/images/deliverables/icp-scoring-tool.png" },
    { title: "Messaging framework", image: "/images/deliverables/messaging-framework.png" },
    { title: "Campaign brief", image: "/images/deliverables/campaign-brief.png" },
    { title: "Handoff playbook", image: "/images/deliverables/handoff-playbook.png" },
  ],
  imageAspect: "4/3",
  status: "placeholder" as CopyStatus, // redacted screenshots after Magnet, late October
};

/* ------------------------------------------------------------------ */
/*  8 · About                                                          */
/* ------------------------------------------------------------------ */

export const about = {
  heading: "I'm Sophie.",
  photo: "/images/sophie.jpg", // TODO(sophie)
  paragraphs: [
    // TODO(sophie): outline only; write in voice
    "[eMentorConnect: co-founded and ran an enterprise mentoring software company for 11 years, through acquisition by Chronus. Wrote the positioning, built the decks, ran the launches, closed the deals, the whole marketing job before there was a title.]",
    "[Chronus: Director of Product Marketing, built the function from zero inside the acquirer.]",
    "[Why this practice: the founder who had to do it without a marketer, and the marketer who built it after. Durango, CO.]",
  ],
  status: "placeholder" as CopyStatus,
};

/* ------------------------------------------------------------------ */
/*  9 · Proof (hidden in v0)                                            */
/* ------------------------------------------------------------------ */

export const proof = {
  testimonials: [] as { quote: string; name: string; title: string; company: string }[],
  beforeAfter: {
    permission: false, // Shareable: ask in October; anonymized if numbers but not name
    companyLabel: "a healthcare software company", // used when permission covers numbers only
    rows: [
      { before: "17,000 contacts", after: "902 tiered accounts" },
      { before: "No ICP", after: "A scored rubric the sales team uses" },
      { before: "No campaign", after: "One live on day 15" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  10 · FAQ                                                           */
/* ------------------------------------------------------------------ */

export const faq = {
  heading: "Questions founders ask",
  items: [
    {
      question: "What do you need from us before Phase 1?",
      answer:
        "Your diagnostic results, a written intake (about 30 minutes of your time), and exports of deals, contacts and companies from whatever you use as a CRM. After that, about five hours of meetings over four weeks and a few async approvals.",
      status: "draft",
      show: true,
    },
    {
      question: "We don't have a CRM, or ours is a spreadsheet.",
      answer:
        "A spreadsheet is enough for Phase 1; the data read works on whatever you have. Setting up a CRM properly is Phase 2 work, and it's cheaper to build it once around a defined ICP than to clean it twice.",
      status: "draft",
      show: true,
    },
    {
      question: "We don't have referral wins to scale yet.",
      answer:
        "Then Phase 1 changes shape rather than scope: the ICP decision, messaging framework and provisional stages still ship, and the campaign becomes the first outbound test against that ICP instead of a referral campaign. The diagnostic tells you which version you're in.",
      status: "draft",
      show: true,
    },
    {
      question: "Will you hire our first marketer?",
      answer:
        "Not the hiring itself. Phase 3 writes the job description from the function that's now running, so your first marketer starts with a rubric, a framework and a CRM they can trust instead of a blank page.",
      status: "draft",
      show: true,
    },
    {
      question: "Will you talk to our customers?",
      answer:
        "Not on your behalf. Phase 1 gives you the reference and quote requests, written in your voice, and you send them. The relationship is yours and it should stay that way.",
      status: "draft",
      show: true,
    },
    {
      question: "What happens after Phase 3?",
      answer:
        "You run it. The rubric, the framework, the CRM fields and the campaign playbooks are yours, documented for whoever owns marketing next. Anything after that is scoped separately.",
      status: "draft",
      show: true,
    },
    {
      question: "Who is this not for?",
      answer:
        "Companies without a product people already buy, agencies and pure services, and companies that already have a marketer. The diagnostic will say so if that's you.",
      status: "draft",
      show: true,
    },
    {
      question: "We're not a software company. Does this apply?",
      answer:
        "Yes, if a founder is selling a repeatable product and the CRM is where deals go to be forgotten. The method is the same for a device, a platform or a product-backed service. It is not built for agencies or pure services.",
      status: "final",
      show: true,
    },
    {
      question: "What don't you do?",
      answer: "[Placeholder: four exclusions, one line each, with the change-order or partner route for each.]",
      status: "placeholder",
      show: release.showExclusionsFaq,
    },
  ] as FaqItem[],
};

/* ------------------------------------------------------------------ */
/*  11 · The diagnostic                                                */
/* ------------------------------------------------------------------ */

export const diagnostic = {
  heading: "What should you fix first?",
  intro:
    "Ten questions, five minutes. Within two business days you'll get an email with the three things to fix first, how to fix them for free this week, and whether Phase 1 is the right next step. Sometimes it isn't, and we'll say so.",
  stageNote: "We ask about your stage, not your revenue.",
  netlifyFormName: "diagnostic",
  progressLabel: "Question {current} of {total}", // stepper only
  lastStepLabel: "Last step", // stepper only: the contact screen
  nextLabel: "Next",
  backLabel: "Back",
  contact: {
    heading: "Where should we send it?",
    fields: [
      { id: "name", label: "Name", type: "text", required: true },
      { id: "company", label: "Company", type: "text", required: true },
      { id: "email", label: "Work email", type: "email", required: true },
    ],
    submitLabel: "Send me what to fix first",
  },
  thankYou: {
    heading: "It's on its way.",
    body: "Within two business days you'll have the three things to fix first. Want to walk through them together?",
    bookingLabel: site.bookingLabel,
  },

  questions: [
    {
      id: 1,
      prompt: "Who owns marketing today?",
      kind: "single",
      options: [
        { id: "nobody", label: "Nobody", score: 0 },
        { id: "founder", label: "The founder", score: 0 },
        { id: "generalist", label: "A generalist", score: 1 },
        { id: "marketer", label: "A marketer", score: 2 },
      ],
      gap: "No function",
      freeFix: "Name an owner for the next 90 days, even if it's you.",
      phase: "All",
    },
    {
      id: 2,
      prompt: "Where do most of your wins come from?",
      kind: "single",
      options: [
        { id: "unknown", label: "Don't know", score: 0 },
        { id: "referrals", label: "Referrals", score: 1 },
        { id: "network", label: "Founder's network", score: 1 },
        { id: "outbound", label: "Outbound", score: 2 },
        { id: "inbound", label: "Inbound", score: 2 },
      ],
      gap: "Winning motion isn't systematized or known",
      freeFix: "Write down the source of your last ten wins.",
      phase: "1",
    },
    {
      id: 3,
      prompt: "Do you trust your win rate?",
      kind: "single",
      options: [
        { id: "no", label: "No", score: 0 },
        { id: "roughly", label: "Roughly", score: 1 },
        { id: "yes", label: "Yes, it's in the CRM", score: 2 },
      ],
      gap: "Data can't be built on",
      freeFix: "Check whether deals enter the CRM at first call or at \"nearly closed\".",
      phase: "1",
    },
    {
      id: 4,
      prompt: "Is your ICP written down somewhere sales uses it?",
      kind: "single",
      options: [
        { id: "head", label: "In the founder's head", score: 0 },
        { id: "rough", label: "A rough idea", score: 1 },
        { id: "yes", label: "Yes", score: 2 },
      ],
      gap: "ICP undefined",
      freeFix: "One page: the five things your best ten customers have in common.",
      phase: "1→2",
    },
    {
      id: 5,
      prompt: "How many contacts are in your CRM, and how many would you email tomorrow?",
      kind: "twoNumbers",
      fields: [
        { id: "contactsTotal", label: "Contacts in the CRM" },
        { id: "contactsEmailable", label: "You'd email tomorrow" },
      ],
      gap: "Contacts ≠ pipeline",
      freeFix: "Run a deliverability check; archive what bounces.",
      phase: "2",
    },
    {
      id: 6,
      prompt: "If three people described your product, how many versions would you get?",
      kind: "single",
      options: [
        { id: "three", label: "Three", score: 0 },
        { id: "two", label: "Two", score: 1 },
        { id: "one", label: "One", score: 2 },
      ],
      gap: "Messaging inconsistent",
      freeFix: "Agree one sentence and put it at the top of the deck.",
      phase: "1",
    },
    {
      id: 7,
      prompt: "Is there a written definition of a qualified lead?",
      kind: "single",
      options: [
        { id: "no", label: "No", score: 0 },
        { id: "sortOf", label: "Sort of", score: 1 },
        { id: "yes", label: "Yes", score: 2 },
      ],
      gap: "Qualification undefined",
      freeFix: "Write the three things that must be true before a lead becomes a deal.",
      phase: "2",
    },
    {
      id: 8,
      prompt: "When did you last ask a customer for a quote or reference?",
      kind: "single",
      options: [
        { id: "never", label: "Never", score: 0 },
        { id: "thisYear", label: "This year", score: 1 },
        { id: "thisMonth", label: "This month", score: 2 },
      ],
      gap: "Referrals happen by accident",
      freeFix: "Ask your three happiest customers this week.",
      phase: "1→3",
    },
    {
      id: 9,
      prompt: "Are you planning to hire a marketer?",
      kind: "single",
      options: [
        { id: "no", label: "No, not soon", score: null },
        { id: "maybe", label: "Maybe within a year", score: null },
        { id: "yes", label: "Yes, budgeted or hiring now", score: null },
      ],
      gap: "Sets the tier, with Q1",
      phase: "Pricing",
    },
    {
      id: 10,
      prompt: "What one number do you want to move in 90 days?",
      kind: "freeText",
      required: false, // optional in the stepper (site-edits.md)
      gap: "Their words",
      phase: "1 kickoff",
    },
  ] as DiagnosticQuestion[],

  /* Scoring: applied by hand in v0, in code in v1 */
  scoring: {
    scoredQuestions: [1, 2, 3, 4, 5, 6, 7, 8],
    maxScore: 16,
    // Q5: emailable / total
    q5RatioBands: [
      { belowRatio: 0.25, score: 0 },
      { belowRatio: 0.75, score: 1 },
      { belowRatio: Infinity, score: 2 },
    ],
    // Three lowest-scoring of Q1-Q8; ties broken in this order (data, then who, then message, then system)
    gapTieBreak: [3, 4, 2, 6, 7, 5, 8, 1],
    gapsReported: 3,
    verdicts: [
      { minScore: 0, maxScore: 5, id: "notYet", label: "Not yet: do the free fixes first" },
      { minScore: 6, maxScore: 12, id: "phase1", label: "Phase 1 is the right next step" },
      { minScore: 13, maxScore: 16, id: "dontNeed", label: "You don't need this program", requires: { q1: "marketer" } },
      { minScore: 13, maxScore: 16, id: "phase1", label: "Phase 1 is the right next step" }, // 13-16 without a marketer
    ],
    // Evaluated in order; first match wins. Option ids refer to questions[].options[].id
    tierRules: [
      { when: { q1: ["marketer"] }, tier: null, note: "don't-need verdict; no tier" },
      { when: { q9: ["yes"] }, tier: "nextHire" as TierId },
      { when: { q1: ["generalist"] }, tier: "sortOf" as TierId },
      { when: { q1: ["nobody", "founder"] }, tier: "who" as TierId },
    ],
    q9MaybeNote: "Noted in the results email as the hiring conversation to have after Phase 1.",
  },

  /* Results email: hand-written in v0, templated in v1 */
  resultsEmail: {
    includes: [
      "Stage label (the tier)",
      "The three things to fix first, one line each on what they cost",
      "The free-fix list in full",
      "The verdict",
      "One link: book the free 45-minute walkthrough",
    ],
    excludes: ["Pricing recap", "Attachments", "Anything else"],
    responseTime: "within two business days",
  },
};

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export const footer = {
  wordmark: site.name,
  line: `${site.name} · ${site.location}`,
  privacyNote: "Your answers are used to write your results and nothing else.", // draft
};

/* ------------------------------------------------------------------ */
/*  Analytics                                                          */
/* ------------------------------------------------------------------ */

export const analytics = {
  // diagnostic_start: first answer given; diagnostic_step: each advance, with the step number
  v0: ["diagnostic_start", "diagnostic_step", "diagnostic_submit", "booking_click"],
  v1: ["diagnostic_start", "diagnostic_step", "diagnostic_submit", "booking_click"],
};

/* ------------------------------------------------------------------ */
/*  Everything, for components that want one import                    */
/* ------------------------------------------------------------------ */

export const content = {
  release,
  site,
  anchors,
  nav,
  hero,
  whyNow,
  checklist,
  howItWorks,
  phases,
  pricing,
  whatYouGet,
  about,
  proof,
  faq,
  diagnostic,
  footer,
  analytics,
};

export default content;

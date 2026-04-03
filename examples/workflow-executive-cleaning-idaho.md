# Executive Cleaning of Idaho — Operations Automation Stack

> Replace Jobber/Housecall Pro with open-source tools + AI agents. Automate scheduling, quoting, invoicing, customer comms, dispatching, reviews, and lead capture.

## The Real Pain Points

These are what actually eat a cleaning business owner's time — in order of money lost:

1. **Leads going cold** — Phone rings while you're on a job. Nobody follows up. Lead books someone else.
2. **Manual quoting** — Estimating over the phone without seeing the property = underquote (lose money) or overquote (lose the job).
3. **Scheduling chaos** — Double bookings, missed appointments, confused crews. All managed in a spreadsheet or someone's head.
4. **Chasing payments** — Invoices go out late, payments slip through cracks, cash flow is unpredictable even when busy.
5. **No-shows & cancellations** — No automated reminders = expensive gaps in the schedule.
6. **Customer churn** — No post-service follow-up, no rebooking reminders, no review requests.
7. **Crew dispatching** — Knowing who is where, handling call-outs, optimizing drive time between jobs.
8. **Disconnected everything** — Spreadsheets for scheduling, texts for crews, a notebook for invoices. Nothing talks to anything.

---

## The Open-Source Stack (Replaces Jobber at $0/month)

### Minimum Viable Stack — Start Here

These 5 repos cover 80% of the pain. All self-hostable with Docker.

| Pain Point | Tool | Repo | Stars |
|------------|------|------|-------|
| **Workflow glue (connects everything)** | n8n | `n8n-io/n8n` | 182K+ |
| **Online booking + scheduling** | Cal.com | `calcom/cal.com` | 41K+ |
| **Quoting + invoicing + payments** | Invoice Ninja | `invoiceninja/invoiceninja` | 9.6K+ |
| **Customer communication hub** | Chatwoot | `chatwoot/chatwoot` | 28K+ |
| **AI chatbot for lead capture + quoting** | Flowise | `FlowiseAI/Flowise` | 51K+ |

### Scale-Up Stack — Add as You Grow

| Pain Point | Tool | Repo | Stars |
|------------|------|------|-------|
| **Customer CRM** | Twenty | `twentyhq/twenty` | 43K+ |
| **Route optimization** | VROOM + OSRM | `VROOM-Project/vroom` + `Project-OSRM/osrm-backend` | 1.7K + 7.6K |
| **AI phone answering** | LiveKit Agents | `livekit/agents` | 9.9K+ |
| **Review automation** | Formbricks | `formbricks/formbricks` | 12K+ |
| **Crew push notifications** | ntfy | `binwiederhier/ntfy` | 29K+ |
| **Multi-channel notifications** | Novu | `novuhq/novu` | 38K+ |
| **Email marketing** | Listmonk | `knadh/listmonk` | 19K+ |
| **Document signing (contracts)** | Documenso | `documenso/documenso` | 12.6K+ |
| **AI agent builder (advanced)** | Dify | `langgenius/dify` | 135K+ |
| **Document management** | Paperless-ngx | `paperless-ngx/paperless-ngx` | 37K+ |

---

## How It Maps to Jobber/Housecall Pro

| Jobber Feature | Open-Source Replacement |
|----------------|----------------------|
| Online booking widget | **Cal.com** — embeddable booking, team scheduling, recurring bookings |
| Customer CRM | **Twenty** — customer profiles, service history, pipeline view |
| Quoting/estimating | **Invoice Ninja** + **Flowise** AI agent for auto-pricing |
| Job scheduling + calendar | **Cal.com** + **Timefold Solver** for optimization |
| Crew dispatch + notifications | **n8n** + **ntfy** push notifications to crew phones |
| Route optimization | **VROOM** + **OSRM** — optimal routes for multiple crews |
| Invoicing + online payments | **Invoice Ninja** — Stripe, PayPal, recurring invoices |
| SMS/email reminders | **Novu** — unified notification API across channels |
| Review requests | **Formbricks** — post-service survey, redirect 4-5 star to Google |
| Customer chat widget | **Chatwoot** + **Typebot** conversational booking flow |
| AI phone answering | **LiveKit Agents** — voice AI receptionist |
| Workflow automation | **n8n** — the connective tissue between all tools |
| Document signing | **Documenso** or **DocuSeal** — digital contracts/waivers |
| Email marketing | **Listmonk** — newsletters, seasonal promos, win-back campaigns |
| Website builder | **GrapesJS** (`GrapesJS/grapesjs`, 25K+ stars) |
| AI business assistant | **Dify** or **Open WebUI** (`open-webui/open-webui`, 129K+ stars) |

---

## The Full Repo List (36 Tools)

### AI Agent Frameworks

| Repo | Stars | What It Does | Cleaning Use Case |
|------|-------|-------------|-------------------|
| `langgenius/dify` | 135K+ | Production AI workflow platform, visual builder | AI agent for lead qualification + auto-quoting |
| `n8n-io/n8n` | 182K+ | Workflow automation, 400+ integrations | Connects everything: booking → invoice → SMS → review |
| `activepieces/activepieces` | 21K+ | Open-source Zapier alternative | Simpler alternative to n8n for basic automations |
| `FlowiseAI/Flowise` | 51K+ | Visual AI chatbot builder, no code | Website chatbot: collects rooms/sqft → instant quote |
| `crewAIInc/crewAI` | 47K+ | Multi-agent orchestration framework | Team of AI agents: lead handler, quoter, scheduler, follow-up |
| `langchain-ai/langgraph` | 28K+ | Graph-based agent framework | Complex multi-step operations agents |
| `VRSEN/agency-swarm` | 4.1K+ | Multi-agent orchestration | Virtual office manager with cooperating agents |
| `firecrawl/firecrawl` | 103K+ | Web scraping API for AI | Scrape real estate listings for leads, monitor competitor pricing |
| `mastra-ai/mastra` | 22K+ | TypeScript AI agent framework | Node.js-native agent development |

### CRM / Invoicing / Business Management

| Repo | Stars | What It Does | Cleaning Use Case |
|------|-------|-------------|-------------------|
| `twentyhq/twenty` | 43K+ | Open-source Salesforce alternative | Customer database, service history, lead pipeline |
| `frappe/erpnext` | 32K+ | Full ERP suite | Nuclear option: CRM + invoicing + HR + accounting + field service |
| `odoo/odoo` | 49K+ | Comprehensive business apps | Field Service module for dispatch + time tracking + invoicing |
| `invoiceninja/invoiceninja` | 9.6K+ | Invoicing, quoting, payments | Quotes → invoices → Stripe payments → recurring billing |
| `crater-invoice-inc/crater` | 8.3K+ | Simple invoicing | Lightweight alternative to Invoice Ninja |
| `akaunting/akaunting` | 9.7K+ | Online accounting | Invoicing + expenses + P&L by customer or service type |
| `InvoicePlane/InvoicePlane` | 3K+ | Basic invoice management | Minimal invoicing for simple operations |

### Communication Automation

| Repo | Stars | What It Does | Cleaning Use Case |
|------|-------|-------------|-------------------|
| `chatwoot/chatwoot` | 28K+ | Omnichannel messaging (chat, SMS, email, WhatsApp) | One inbox: website chat + SMS + email + social |
| `novuhq/novu` | 38K+ | Notification infrastructure API | Trigger: job done → invoice email + SMS review request + owner push |
| `knadh/listmonk` | 19K+ | Newsletter/mailing list manager | Monthly tips, seasonal promos, win-back campaigns |
| `binwiederhier/ntfy` | 29K+ | Push notifications via HTTP | "New job: 123 Main St, 2pm" → crew's phone. Dead simple. |
| `baptisteArno/typebot.io` | 9.8K+ | Visual chatbot builder | Conversational booking: "How many rooms? → Here's your quote!" |
| `EvolutionAPI/evolution-api` | 7.7K+ | WhatsApp integration API | Automate WhatsApp booking confirmations + reminders |
| `botpress/botpress` | 14K+ | GPT-powered chatbot platform | Advanced conversational AI for complex customer interactions |

### Booking & Scheduling

| Repo | Stars | What It Does | Cleaning Use Case |
|------|-------|-------------|-------------------|
| `calcom/cal.com` | 41K+ | Scheduling infrastructure (Calendly alternative) | Self-book cleaning appointments, team scheduling, recurring bookings |
| `VROOM-Project/vroom` | 1.7K+ | Vehicle routing optimization | Optimal routes for 2+ crews across 8+ daily jobs |
| `Project-OSRM/osrm-backend` | 7.6K+ | Driving directions + travel time engine | Powers travel-time calculations between jobs. No Google Maps bills. |
| `TimefoldAI/timefold-solver` | 1.6K+ | AI scheduling/routing solver | Advanced crew scheduling with skills, availability, travel constraints |

### AI-Powered Operations

| Repo | Stars | What It Does | Cleaning Use Case |
|------|-------|-------------|-------------------|
| `emcie-co/parlant` | 17K+ | Conversational control layer for AI agents | AI receptionist with business rules: "minimum $120", "48hr notice for deep cleans" |
| `livekit/agents` | 9.9K+ | Realtime voice AI agents | AI phone answering: "Thanks for calling Executive Cleaning, how can I help?" |
| `TEN-framework/ten-framework` | 10K+ | Voice AI agent framework | Alternative voice bot for after-hours call handling |
| `open-webui/open-webui` | 129K+ | Private AI interface (ChatGPT alternative) | Owner's AI assistant: draft emails, analyze business data, create checklists |
| `paperless-ngx/paperless-ngx` | 37K+ | Document management with OCR + ML | Digitize contracts, insurance certs, receipts, employee docs |
| `documenso/documenso` | 12.6K+ | Digital document signing (DocuSign alternative) | Service agreements + cleaning contracts signed before first clean |
| `docusealco/docuseal` | 11K+ | Document signing + form builder | Fillable estimate forms customers sign off on |
| `formbricks/formbricks` | 12K+ | Survey + experience management | Post-service: "Rate 1-5" → if 4-5, redirect to Google Reviews |
| `GrapesJS/grapesjs` | 25K+ | Drag-and-drop web page builder | Build/maintain website without a developer |

---

## Automation Flows (Built with n8n)

### Flow 1: Lead → Quote → Booking (Zero Manual Effort)

```
Website Typebot chatbot collects: name, address, rooms, sqft, service type
  → n8n webhook receives form data
  → AI agent (Flowise) calculates quote based on pricing rules
  → Invoice Ninja creates estimate PDF
  → Novu sends quote email + SMS to customer
  → Twenty CRM creates lead record
  → If no response in 48hr: n8n triggers follow-up email
  → If no response in 5 days: n8n sends 10% discount offer
  → Customer accepts: Cal.com booking link in email
  → Booking confirmed: n8n notifies crew via ntfy
```

### Flow 2: Job Day (Fully Automated Communication)

```
Day before job:
  → n8n checks Cal.com for tomorrow's jobs
  → Novu sends customer reminder SMS: "Your cleaning is tomorrow at 10am"
  → ntfy pushes crew schedule for tomorrow

Day of job:
  → Crew marks "on the way" in Cal.com mobile
  → n8n triggers SMS to customer: "Your crew is 15 minutes away"
  → Crew marks "complete" in Cal.com
  → n8n triggers Invoice Ninja to generate + send invoice with Stripe link
  → 24 hours later: Formbricks sends satisfaction survey
  → If rating 4-5: redirect to Google Reviews link
  → If rating 1-3: alert owner via ntfy for personal follow-up
```

### Flow 3: Customer Retention (Automated Lifecycle)

```
Recurring customer:
  → 3 days before scheduled cleaning: n8n sends confirm/reschedule SMS
  → Quarterly: n8n sends upsell email "Add a deep clean this month? 15% off"
  → Annual: automated thank-you + loyalty discount

Lapsed customer (90 days no booking):
  → n8n triggers Listmonk "we miss you" email with 15% off
  → 120 days: final outreach
  → 180 days: mark inactive in Twenty CRM
```

### Flow 4: Commercial Outreach (AI-Powered Prospecting)

```
Weekly:
  → Firecrawl scrapes Google Maps for new businesses in Boise metro
  → AI agent (Dify) qualifies prospects: property managers, medical offices, gyms
  → n8n adds qualified leads to Twenty CRM pipeline
  → Automated 3-email outreach sequence via Listmonk
  → Responses route to Chatwoot inbox
  → Owner converts hot leads using Proposal Strategist agent templates
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                  CUSTOMER FACING                 │
├──────────┬──────────┬──────────┬────────────────┤
│ Website  │ Typebot  │ Cal.com  │ LiveKit Voice  │
│(GrapesJS)│ Chatbot  │ Booking  │  AI Phone Bot  │
└────┬─────┴────┬─────┴────┬─────┴───────┬────────┘
     │          │          │             │
     └──────────┴──────┬───┴─────────────┘
                       │
              ┌────────▼────────┐
              │      n8n        │
              │ (workflow glue) │
              └──┬───┬───┬───┬─┘
                 │   │   │   │
    ┌────────────┘   │   │   └──────────────┐
    │                │   │                  │
┌───▼───┐    ┌──────▼─┐ │  ┌───────┐  ┌───▼────┐
│Twenty │    │Invoice │ │  │Novu/  │  │Flowise │
│  CRM  │    │ Ninja  │ │  │ ntfy  │  │AI Agent│
└───────┘    └────────┘ │  └───────┘  └────────┘
                        │
               ┌────────▼────────┐
               │    Chatwoot     │
               │  (unified inbox)│
               └─────────────────┘
```

All services run in Docker on a single $20-40/mo VPS (Hetzner, DigitalOcean, or Railway).

---

## Implementation Priority

### Week 1: Stop the Bleeding (Lead Capture)
- Deploy **Cal.com** — customers can self-book online immediately
- Deploy **Typebot** — chatbot on website collects quote requests 24/7
- Set up **n8n** — auto-send confirmation emails when bookings come in

### Week 2: Get Paid Faster (Invoicing)
- Deploy **Invoice Ninja** — auto-generate invoices after each job
- Connect to **Stripe** — customers pay online via invoice link
- **n8n** automation: job complete → invoice sent → payment reminder at 48hr

### Week 3: Never Forget a Customer (Communication)
- Deploy **Chatwoot** — one inbox for all customer messages
- Deploy **Novu** or **ntfy** — automated SMS reminders day before service
- **n8n** flows: booking reminders, "crew on the way", post-service follow-up

### Week 4: Get Reviews on Autopilot
- Deploy **Formbricks** — post-service satisfaction survey
- **n8n** flow: 24hr after job → survey → happy customers → Google Review link
- Set up **Listmonk** — monthly newsletter + seasonal promos

### Month 2+: Scale
- **Twenty CRM** — full customer database as you grow past 50 clients
- **VROOM + OSRM** — route optimization when running 3+ crews
- **LiveKit Agents** — AI phone answering for after-hours calls
- **Firecrawl + Dify** — automated commercial lead prospecting

---

## Cost Comparison

| | Jobber (Pro) | This Stack (Self-Hosted) |
|---|---|---|
| Monthly cost | $169/mo | $20-40/mo (VPS) |
| Annual cost | $2,028/yr | $240-480/yr |
| AI phone answering | Not included | LiveKit Agents (free) |
| AI chatbot | Not included | Flowise/Typebot (free) |
| Route optimization | Basic | VROOM + OSRM (advanced, free) |
| Email marketing | Not included | Listmonk (free) |
| Review automation | Basic | Formbricks (customizable, free) |
| Document signing | Not included | Documenso (free) |
| Customization | Limited | Unlimited |
| Data ownership | Theirs | Yours |

**Trade-off:** More setup time upfront, but dramatically lower cost and full control.

---

## Using Agency Agents with This Stack

The agents in this repo (`agency-agents`) serve as the **brains** that configure and optimize each tool:

| Agent | What It Does with This Stack |
|-------|------------------------------|
| **Backend Architect** | Designs n8n workflows and API integrations between tools |
| **Frontend Developer** | Builds the website, embeds Cal.com + Typebot widgets |
| **SEO Specialist** | Optimizes website content for "cleaning services Boise" |
| **Content Creator** | Writes email templates, chatbot scripts, website copy |
| **Growth Hacker** | Designs the review funnel, referral program, conversion optimization |
| **Support Responder** | Designs customer communication flows and templates |
| **Proposal Strategist** | Creates commercial cleaning proposal templates |
| **Outbound Strategist** | Designs the Firecrawl → Dify → Listmonk prospecting pipeline |
| **PPC Campaign Strategist** | Sets up Google Ads campaigns for local search |
| **Finance Tracker** | Configures Invoice Ninja reporting and job costing |
| **Analytics Reporter** | Builds business dashboard from n8n + Invoice Ninja data |
| **Document Generator** | Creates PDF templates for quotes, checklists, contracts |

---

## NEXUS Activation

```
Activate Agents Orchestrator in NEXUS-Sprint mode.

Project: Executive Cleaning of Idaho — Operations Automation
Goal: Deploy open-source stack replacing Jobber. Automate lead capture,
booking, quoting, invoicing, customer communication, crew dispatch,
review generation, and commercial prospecting.

Tech stack: n8n, Cal.com, Invoice Ninja, Chatwoot, Flowise, Typebot,
Novu, ntfy, Formbricks, Listmonk, Twenty CRM, VROOM, LiveKit Agents.

Sprint team:
- PM: Senior Project Manager
- Engineering: Backend Architect, Frontend Developer, DevOps Automator
- AI: AI Engineer (Flowise chatbot + LiveKit voice bot)
- Content: Content Creator (email templates, chatbot scripts, website copy)
- Sales: Proposal Strategist, Outbound Strategist
- Marketing: SEO Specialist, Growth Hacker, PPC Campaign Strategist
- Support: Support Responder (communication flow design)
- Operations: Finance Tracker, Analytics Reporter

Phase 1 (Week 1): Deploy Cal.com + Typebot + n8n. Live booking on website.
Phase 2 (Week 2): Deploy Invoice Ninja + Stripe. Automated invoicing.
Phase 3 (Week 3): Deploy Chatwoot + Novu. Automated customer comms.
Phase 4 (Week 4): Deploy Formbricks + Listmonk. Review + retention automation.
Phase 5 (Month 2): Deploy Twenty CRM + VROOM + LiveKit. Scale operations.

Quality gate: Each phase must be live and processing real data before advancing.
```

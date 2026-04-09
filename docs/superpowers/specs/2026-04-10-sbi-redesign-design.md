# SBI Web App Redesign — Design Spec

## Purpose

Portfolio piece demonstrating that one person with Claude Code can build a world-class UI for India's largest bank. Focuses on login and payment flows — the two most used features — with a real-looking dashboard shell.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui** — forms, inputs, cards, dialogs, tabs, buttons
- **Aceternity UI** — spotlight effects, glowing borders, animations
- **Framer Motion** — page transitions, inline state morphing

## Design Principles

1. **Inclusive by default** — SBI serves 50Cr+ Indians, from Mumbai tech workers to farmers in villages. The design must feel welcoming to everyone, not elitist or "for rich people only." Plain language, big clear text, nothing intimidating.
2. **Modern but approachable** — Clean, bold, confident design (Revolut energy) but with warmth (Google Pay accessibility). Not cold fintech luxury.
3. **Trust through simplicity** — No walls of security warnings. Clean design builds more trust than anxiety-inducing banners. Small, calm trust indicators instead.
4. **One brand** — "SBI" only. No "SBI ONLINE", "YONO SBI", "YONO" confusion.
5. **Consistent patterns** — OTP always appears inline (same page morph). No random modals or side panels. Every page follows the same layout system.

## Color Palette

- **Primary**: Deep Navy to SBI Blue (`#0052cc`)
- **Accent**: Teal (`#00d4aa`) for success/highlights
- **Background**: Light gray (`#f8fafc`) with white cards
- **Text**: Slate scale (`#0f172a` primary, `#64748b` secondary, `#94a3b8` muted)
- **Success**: Green (`#16a34a`)
- **Destructive**: Red (`#dc2626`)
- **Card borders**: `#e2e8f0`
- **Inputs**: `#f8fafc` background, `#cbd5e1` border

## Typography

- System font stack (Inter or similar sans-serif)
- Tight letter-spacing on headings (`-0.5px` to `-1.5px`)
- Font weights: 400 body, 500 labels, 600 buttons, 700 headings

## Branding

- Reimagined SBI logo: blue rounded square with white "SBI" text + "State Bank of India" wordmark
- No gradient taglines, no marketing fluff
- Hindi language toggle in nav (signals inclusivity)

---

## Pages & Routes

### 1. Login Page (`/`)

**Layout**: Split — brand story left, login form right. Top nav with logo + Help + हिन्दी toggle.

**Left side**:
- SBI logo + wordmark
- Heading: "Welcome to SBI Online Banking"
- Subtext: "Safe, simple, and secure. Access your account from anywhere."
- Trust indicators with icons: "Your money is safe with us", "Send money in seconds", "Works on any device"

**Right side — Login form card**:
- White card with subtle shadow on light background
- "Sign in to your account" heading
- Username field (labeled, placeholder)
- Password field (with show/hide toggle)
- "Forgot password?" link
- "Sign In" button (blue, full width)
- Divider: "or"
- "New to SBI? Create account" link

**OTP state (same page, card morphs)**:
- Back arrow returns to login form
- "Verify it's you" heading
- "We sent a code to ****1234" — shows masked phone
- 6 individual OTP input boxes (large, clear)
- Expiry countdown + resend timer
- "Verify & Sign In" button
- "Didn't get the code? Check your SMS" helper

**Interaction**: After clicking Sign In, left side stays static, right card animates/morphs from login fields to OTP fields. No page navigation.

**Footer**: Minimal — "© 2026 State Bank of India. All rights reserved."

### 2. Dashboard (`/dashboard`)

**Nav bar** (sticky top, white):
- SBI logo + "SBI Online"
- Nav items: Home | Accounts | Payments | Cards | Investments | Services
- Right: notification bell + user avatar (initials)

**Content (scrollable)**:

**Section 1 — Greeting + Balance**:
- "Good morning, Janam" with subtitle
- Balance card: account number, large balance figure, Statement/Card quick actions

**Section 2 — Quick Actions**:
- 3 cards in a row: Send Money (blue filled, hero), Self Transfer (white), Pay Bills (white)
- Send Money is the entry point to payment flow

**Section 3 — Recent Transactions**:
- White card with last 3 transactions
- Each: icon (red ↗ for sent, green ↙ for received) + name + date/mode + amount
- "View all" link

**Section 4 — This Month + Upcoming**:
- Two cards side by side
- This Month: Money Out vs Money In with bar visualization
- Upcoming: next 2 due payments with dates and amounts

**Section 5 — Your Card**:
- Debit card visual (dark blue gradient, card number, name, expiry)
- Card actions: Lock/Unlock, Set Limits, View PIN

**Section 6 — Schemes & Benefits**:
- Horizontal scrollable cards
- Government schemes: Education Loan, MSME Easy Loan, PM Awas Yojana, Kisan Credit Card, Startup India Loan
- Each: icon + title + one-line description + "Learn more →"
- Non-intrusive — feels like helpful content, not ads

**Section 7 — Quick Services**:
- 4x2 grid: Statements, Cheque Book, ATM Locator, Tax Payment, Fixed Deposit, Investments, Insurance, Help & Support

**Footer**: About SBI | Privacy Policy | Terms & Conditions | Sitemap

### 3. Send Money — Step 1: Pay (`/payments/send`)

**Stepper**: 3 dots — Pay (active) → Review & Verify → Done

**Content (single page, all sections)**:

**Who — Payee selection**:
- "To" label
- Recent payees as avatar circles (color-coded by person, with initials). Selected has blue border. "+" for new payee.
- Selected payee card: avatar + name + bank + last 4 digits + "Change" link
- If none selected: show search bar + full saved payees list with Pay buttons

**How much — Amount**:
- "Amount" label
- Large centered amount display (₹ + number)
- Quick amount chips: ₹500, ₹1,000, ₹5,000 + last paid amount highlighted
- "Last paid ₹X on [date]" helper text

**How — Transfer details (compact row)**:
- Two side-by-side cards:
  - Transfer via: IMPS (default) with dropdown for NEFT/RTGS + brief description
  - From: account number + available balance with dropdown if multiple accounts

**Action**: "Review Payment" button (blue, full width)

### 4. Send Money — Step 2: Review & Verify (`/payments/send/review`)

**Stepper**: Pay ✓ → Review & Verify (active) → Done

**State A — Review**:
- "You're sending" + large amount centered
- Details card (receipt-style): To (name + bank + account), From (account), Mode
- "Confirm & Send OTP" button
- Helper: "OTP will be sent to ****1234"

**State B — OTP (same page morph)**:
- Details collapse into compact summary bar (avatar + "Paying [name]" + amount)
- OTP input appears: 6 boxes, masked phone, expiry countdown, resend link
- "Pay ₹[amount]" button — shows amount for final confirmation

**Interaction**: After clicking "Confirm & Send OTP," the review details animate/collapse into the summary bar, and the OTP section morphs in below. Same inline pattern as login OTP.

### 5. Send Money — Step 3: Done (`/payments/send/success`)

**Stepper**: All 3 ✓ (green)

**Content (centered)**:
- Large green checkmark in circle
- "Payment Successful!" heading
- "₹X sent to [name]" subtext
- Receipt card: Amount, To, Reference No. (monospace, prominent), Date & Time
- Action buttons: Download PDF | Share Receipt
- Navigation: "Send Another Payment" (blue) | "Go Home" (gray)

---

## Non-Functional Pages

Dashboard sections (Accounts, Cards, Investments, Services) and nav items outside the login/payment flow should be present in the UI but not navigate anywhere. They exist to make the prototype feel like a complete app.

## Dummy Data

- **User**: Janam Shah
- **Account**: Savings ****8033, Balance ₹1,35,991.21, SBI
- **Card**: VISA ****4957, expires 04/26
- **Payees**: Janam Shah (Kotak ****5871), Manali Bhavsar (SBI ****5325), Rahul Sharma (HDFC ****9012)
- **Transactions**: ₹34,000 sent to Janam Shah (30 Mar), ₹85,000 salary credit (28 Mar), ₹5,200 sent to Manali (25 Mar)

## Animations & Micro-interactions

- **Login → OTP morph**: Right card content fades/slides, form fields transition (Framer Motion)
- **Review → OTP morph**: Details card collapses, OTP section slides in from below
- **Success checkmark**: Scale-in animation with slight bounce
- **Page transitions**: Subtle fade between routes
- **Aceternity effects**: Spotlight/glow on login page background, subtle hover glows on cards
- **Stepper**: Steps fill in green with checkmark animation as user progresses
- **Quick amount chips**: Scale on hover/tap

## What We Explicitly Don't Build

- Backend / API / authentication logic
- Dark mode
- Mobile responsive (desktop-only prototype for portfolio)
- Registration flow
- Account details page
- Any page behind nav items other than Home and Payments > Send Money
- Actual OTP validation (dummy accepts any 6 digits)

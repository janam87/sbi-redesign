# SBI Web App - Current Design Analysis

## Overview
The State Bank of India (SBI) online banking has a **fragmented login experience** spread across multiple pages and even different subdomains. The user journey to simply log in is unnecessarily complex.

---

## Screenshot 1: Landing/Portal Page (`onlinesbi.sbi.bank.in`)

### Header
- **Logo**: SBI logo (blue) top-left
- **Top-right**: "Jono" branding badge (green/white), "Skip to main content" link
- **Navigation bar** (dark blue/navy): Services | FAQ | Corporate Website | SBIPay Lite users | Donations | SB Collect | Videos | Apply for SBI Current Account | NPS | SBI Utsav | SBI e-Tax

### Alert Banner
- Yellow/warning bar: "If slowness is observed during Login Page loading, please refresh the page for better experience."
- Security notice (blue text): "SBI never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info."
- Additional warning: "your email or mobile asking your Bank/Card details."

### Main Content - Two Login Portals Side by Side

#### Left: Personal Banking (YONO SBI / Net Banking)
- Purple/dark background section
- "YONO SBI NET-BANKING" branding
- "PERSONAL BANKING" heading
- **LOGIN button** (white outlined, prominent)
- Three icon links below:
  - New User Registration (person+ icon)
  - How Do I (question mark icon)
  - Customer Care - Personal (headset icon)
  - Lock & Unlock User (lock icon)
- Description: "SBI's internet banking portal provides personal banking services that gives you complete control over all your banking demands online."

#### Right: Corporate Banking (YONO SBI)
- Similar purple/dark background
- "YONO SBI" branding
- "CORPORATE BANKING" heading
- **LOGIN button** (white outlined)
- Description about "simplified and intuitive business banking platform"
- Same three icon links: New Corporate Registration, How Do I, Customer Care - Corporate
- URL reference: yonocorporate.sbi.bank.in

### Quick Links Section (Below login boxes)
Two-column layout of text links:
- Register Complaint of Unauthorized Transaction
- Banking Forms
- SBI Salary Account
- SBI Express Remit (partially visible)
- QRIS (e-Appointment)
- Doorstep Banking
- NRI Services
- SBI Mutual Fund (partially visible)
- SBI Retail Direct portal
- SBI General Insurance Document Download
- CYBER CRIME HELPLINE
- Block ATM
- SBI FasTag
- SBI Securities
- SBI Insurance

### Design Issues Noted
- Cluttered layout with too many links
- Multiple warning banners create anxiety
- Two separate login paths on one page is confusing
- Dark purple sections feel dated
- Poor visual hierarchy
- Overwhelming amount of text
- Navigation bar has too many items
- YONO branding mixed with SBI branding is inconsistent

---

## Screenshot 2: Personal Banking Login - Step 1 (`retail.sbi.bank.in/retail/login.htm`)

### Header
- **Logo**: "SBI ONLINE" (blue, different from page 1)
- **Navigation**: Home | Products & Services | How Do I (Help) | Manage Debit Card E-Mandate | Contact Us
- **Top-right utilities**: Skip to main content | About OnlineSBI | Forms | Net Banking Branches | SBI Home (red button) | Language dropdown

### Hero Section
- Large blue gradient banner image with laptop illustration
- "Personal Banking" heading in white
- **"CONTINUE TO LOGIN" button** (green, prominent)
- Notice: "Dear Customer, OTP based login is introduced for added security"
- Footer links within banner: RBI Limited Liability Policy | Privacy Statement | Disclosure | Terms of Service/Terms & Conditions
- Disclaimer text: "By clicking on 'Continue to Login' button, you agree to the Terms of Service (Terms & Conditions of usage of Internet Banking of SBI)."

### Security Tips Section (Below hero)
Four card-style tips with colored headers:
1. **ALWAYS** (green header) - "keep your computer free of malware" (green checkmark)
2. **ALWAYS** (green header) - "change your passwords periodically" (green checkmark)
3. **NEVER** (red header) - "respond to any communication seeking your passwords" (red X)
4. **NEVER** (red header) - "reveal your passwords or card details to anyone" (red X)

### Below fold
- "FOR YOUR OWN SECURITY" section (partially visible)

### Design Issues Noted
- This is an EXTRA step before even seeing login fields - unnecessary friction
- Different branding ("SBI ONLINE" vs "YONO SBI")
- Different subdomain (retail.sbi.bank.in vs onlinesbi.sbi.bank.in)
- Hero image feels stock/generic and dated (gradient blue, generic laptop)
- Security tips are useful but take up too much space
- Green "CONTINUE TO LOGIN" button is another click just to reach the actual form
- Overall feels like a 2010-era design
- Navigation items differ from page 1

---

## Screenshot 3: Personal Banking Login - Step 2 / Actual Login Form (`retail.sbi.bank.in/retail/login.htm`)

### Header
- Same as Screenshot 2 (SBI ONLINE branding, same nav)

### Left Column: Login Form
- **"Login to OnlineSBI"** heading
- Warning: "CARE: Username and password are case sensitive."
- **Form fields:**
  - Username* (text input)
  - Password* (text input)
  - "New User? Register here/Activate" link
  - "Forgot Username / Login Password" link
  - Checkbox: "Enable Virtual Keyboard"
- **CAPTCHA section:**
  - "Enter the text as shown in the Image" label
  - CAPTCHA image showing "3cggp" (distorted text)
  - Two radio options: "Image Captcha" | "Audio Captcha"
  - "Click here to Report" link
- **Buttons:** Login (blue) | Reset (grey)
- Footer note: "For better security use the Online Virtual Keyboard to login. More..."

### Center Column: Promotional Banner
- "UNAUTHORIZED TRANSACTIONS - ACT FAST" warning
- YONO SBI promotional banner: "Your Internet Banking is now live in a new Avatar" / "for a Smoother & Smarter Banking experience."

### Right Column: Information Panel
- "Dear Customer" greeting with Welcome message
- "Welcome to Personal Internet Banking"
- Key notices with bullet points (green dots):
  - No change in URL/Website link
  - No change in Internet Banking Username/Login password
  - No re-registration required
  - Beware of fraudulent calls/emails/links for login or registration
  - Enhanced features will be fully move in due course
- Additional notices:
  - OTP based login & mandatory password change after 180 days
  - Don't share OTP/password information
  - Lock & Unlock NB access through "Lock & Unlock User"
  - Mandatory Profile password change after 365 days

### Design Issues Noted
- CAPTCHA is a terrible UX pattern (hard to read, frustrating)
- Three columns of competing information is overwhelming
- Login form is cramped on the left with too many elements
- Mixed messaging: security warnings + promotions + login
- "Virtual Keyboard" suggestion adds complexity
- Multiple warning messages create cognitive overload
- Reset button next to Login is risky (accidental clicks)
- No "show password" toggle
- No "remember me" option visible
- The transition from page 2 to page 3 seems like a modal/state change on same URL
- Color scheme is inconsistent (blue nav, dark blue form area, mixed content)

---

## Summary of Key UX Problems

### 1. Fragmented Journey
- **3 pages/states** just to log in (Portal > Continue to Login > Actual Form)
- Two different subdomains involved
- Two different brand identities (SBI vs SBI ONLINE vs YONO SBI)

### 2. Visual Design
- Dated aesthetic (circa 2008-2012 design language)
- Inconsistent color usage (navy, blue, purple, green)
- Poor typography hierarchy
- Cluttered layouts with no breathing room
- No modern design patterns (no cards, no clean spacing)

### 3. Information Overload
- Excessive security warnings on every page
- Too many links and options competing for attention
- Promotional content mixed with functional content
- Quick links section is a wall of text

### 4. Accessibility & Usability
- CAPTCHA is a major accessibility barrier
- Small text in many areas
- Low contrast in some sections
- No visible dark mode option
- Multiple navigation patterns across pages

### 5. Trust & Security UX
- Paradoxically, the excessive security warnings may reduce trust
- Multiple fraud warnings create anxiety rather than confidence
- CAPTCHA suggests outdated security approach

### 6. Branding Confusion
- SBI, SBI ONLINE, YONO SBI, YONO - too many sub-brands
- Inconsistent logos and branding across pages
- Corporate vs Personal split adds confusion for most users

---

---

## Screenshot 4: OTP / Second Factor Authentication (`retail.sbi.bank.in/retail/loginsubmit.htm`)

### Header
- Same "SBI ONLINE" branding as pages 2-3
- **Top-right**: "About OnlineSBI" | Products & Services (pink/magenta button) | How do I (Help) (pink button) | Registration/Forms | LOGOUT
- Timestamp displayed: "10-Apr-2026 (02:52 AM IST)"

### Welcome Banner
- Right-aligned: "Welcome, Mr. JANAM MANOJKUMAR SHAH"
- Personalized greeting after username/password was accepted

### Main Content: OTP Form
- **Heading**: "Login Second Factor Authentication" (red text)
- Instruction: "Enter the One Time Password sent to your mobile phone"
- Note: "Mandatory fields are marked with an asterisk (*)"
- **Form field**: "One Time Password *" (single text input)
- **Submit button** (green, centered)
- **"Click here to resend the OTP"** link (highlighted in yellow/green box)
- Fallback note: "If you did not receive the High Security Password on SMS, you can [resend]"

### Security Disclaimers (Bottom)
- Bullet points with lengthy warnings:
  - All communication related to Internet banking will be sent on registered mobile number
  - SBI never sends email/SMS or calls to get personal information, passwords, or OTP
  - Report phishing to report.phishing@sbi.co.in
  - Change passwords if credentials revealed

### Footer
- Privacy Statement | Disclosures | Terms of Service/Terms & Conditions
- "Site best viewed at 1024 x 768 resolution in Microsoft Edge 79+, Mozilla 81+, Google Chrome 87+"
- Copyright: State Bank of India

### Design Issues Noted
- **Yet another page** in the login flow (now page 4 of 5)
- Very sparse layout — just one input field with massive whitespace
- Red heading for "Second Factor Authentication" feels alarming, not reassuring
- Security warnings are repetitive (same warnings seen on previous pages)
- The "resend OTP" highlight looks like an afterthought (yellow box styling)
- Browser resolution recommendation in footer is extremely outdated practice
- Navigation changed again — now showing "LOGOUT" and different nav items
- No indication of OTP expiry time
- No option to receive OTP via alternate channel (email, authenticator app)
- No masked phone number shown (e.g., "sent to ****1234") for user confirmation
- Submit button is small and plain

---

## Screenshot 5: YONO Redirect/Transition Page (`cdnweb.onlineyono.sbi.bank.in/sso`)

### Header
- Minimal — just browser chrome, no SBI header/nav

### Content
- **YONO SBI logo** (centered, small, purple/blue)
- Illustration: Stylized browser windows/cards graphic (purple/pink/orange tones — more modern aesthetic than previous pages)
- **Heading**: "You're on your way to the new YONO Net Banking"
- **Subheading**: "Enjoy exclusive early access to a smoother and smarter banking experience."

### Bottom Notice
- Dark card/banner: "Want the old view? You can switch back anytime using the option at the top of the next page."

### Design Issues Noted
- **A 5th page/screen** in the login journey — user still hasn't reached their dashboard
- This is essentially a marketing interstitial DURING login — terrible UX
- Yet another subdomain: `cdnweb.onlineyono.sbi.bank.in` (3rd domain in the flow)
- The illustration style is noticeably more modern than all previous pages — inconsistent design language
- No skip button or continue button visible — unclear how user proceeds
- The "old view" option suggests SBI is mid-migration between systems
- This page adds zero functional value — pure friction
- Branding shifts again: now fully "YONO" branded, dropping "SBI ONLINE"

---

## Updated Login Journey Map (5 Steps!)

```
Step 1: Portal Page (onlinesbi.sbi.bank.in)
  → Click "LOGIN" under Personal Banking
  
Step 2: Pre-Login Landing (retail.sbi.bank.in/retail/login.htm)
  → Click "CONTINUE TO LOGIN"
  
Step 3: Actual Login Form (same URL, state change)
  → Enter Username + Password + CAPTCHA → Click "Login"
  
Step 4: OTP Page (retail.sbi.bank.in/retail/loginsubmit.htm)
  → Enter OTP → Click "Submit"
  
Step 5: YONO Transition Page (cdnweb.onlineyono.sbi.bank.in/sso)
  → Marketing interstitial before dashboard
  
Step 6: Dashboard (presumably)
```

**3 different subdomains. 5 pages. At least 4 clicks. Just to log in.**

This is the core UX failure that the redesign must address.

---

---

# POST-LOGIN SCREENS (YONO SBI Net Banking)

All post-login screens live on `cdnweb.onlineyono.sbi.bank.in` and use the YONO SBI branding. The design language is noticeably more modern than the login flow — but still has significant issues.

---

## Screenshot 6: Home / Dashboard Page

### Top Bar (Two-tier navigation)
- **Tier 1 (dark purple/black)**: Banking (active) | Lifestyle | Rewards | "Switch to old view" toggle | Contact Us: 022-20744646 (9AM-8PM Mon-Sat) 1800-11-1101 (24x7) | English dropdown | A (font size) | + (accessibility?) | Logout
- **Tier 2 (white)**: YONO SBI NET-BANKING logo | Overview | Accounts | Payments | Deposits | Loans | Cards | Investments | Insurance | Services | Search icon | Bell icon | JS (avatar) My Profile

### Greeting
- "Hi Janam, Hope you're doing well"

### Quick Actions Row (Icon grid)
- Welcome to Yono | Security | Explore | Offers | Discover | Savings A/c | Coming Soon | Invest Now
- Circular purple icons with white illustrations

### Relationship Overview Section
- **Transaction Accounts** card:
  - Account number: XXXXXXX8033
  - Balance: ₹XXXXX.xx (masked in screenshot)
  - Three links: View Accounts | Transactions
- **Deposits** card: placeholder/empty
- **Loans** card: "Grow your money faster" promo + "Find the perfect loan" promo with illustrations
  - Links: Explore | Manage loans

### Right Sidebar - Product Grid
Organized by category with "View All" links:

**Deposits**: Fixed Deposit | Recurring Deposit | Annuity Deposit | Auto Sweep

**Loans**: Personal Loan | Loan Against Mutual Fund | Home Loan | Gold Loan

**Investments**: Mutual Funds | Demat & Securities | NPS | PPF

**Cards**: Credit Cards | Debit Cards | Forex Cards | NCMC

**Insurance**: Life | Health | Accident | Motor

**Services**: View All | Account Related | Tax Related | Cheque Services | e-Service Lock

### Payments & Transfers Section
- **Two tabs**: Fund Transfer | Bill Payments
- Icon grid: Quick Transfer (via POSB) | Send Money (new account) | Schedule Payments
- **Recents**: Avatar circles — Janam S., Manali B., (JC), (JS), Janam S.

### Upcoming Payments
- Illustration of calendar/bills
- "Never Miss Your Payments Now — Track and get reminder for your"
- **Pay Bills** button (purple)

### Bottom Cards
- "Check your Credit Score >" (green gradient card)
- "Personal Finance Manager >" (purple gradient card)

### Promotional Banner (Bottom)
- "From renting to fixing your own home" — home loan ad with key illustration
- "Apply Now" button

### Footer
- About SBI | About SBI Online | Sitemap | Terms & Conditions | Privacy Policy

### Design Issues Noted
- **Information overload** — dashboard tries to show everything at once
- Quick Actions row has "Coming Soon" placeholder — unpolished
- Right sidebar is a massive product catalog, not a dashboard
- Two-tier navigation is heavy — 10+ items in primary nav alone
- "Switch to old view" toggle suggests incomplete migration
- The Relationship Overview cards are cramped with tiny text
- "Recents" avatars use initials but identical purple circles — hard to distinguish
- Upcoming Payments section is mostly promo, not functional
- Credit Score and Finance Manager feel like afterthoughts
- Ad banner at the bottom is distracting
- Overall: too much crammed into one page with no clear visual hierarchy

---

## Screenshot 7: Accounts Page

### Breadcrumb
- > Relationship Overview

### Left Sidebar
- **Tab navigation**: Transaction Accounts (active) | Deposits | Loans | Investments | Insurance
- **Savings Account** section:
  - A/C Number: XXXXXXX8033 (with copy/eye icon)
  - "Apply for a new Savings Account →"
- **Current Account** section:
  - "Apply for a new Current Account →"

### Main Content
- **Account header**: SAVINGS A/C | XXXXXXXX8033 (with copy icon) | "Manage Account" link (purple)
- **Sub-tabs**: Account Summary (active) | Transactions | Statements | Spend Analysis

#### Account Summary
- Account Description: REGULAR SB CHQ - INDIVIDUAL
- Currency: Rupees
- Mode of Operation: Single
- Rate of Interest: 2.50%
- Nominee(s): View Details

#### Balance Panel (Right)
- Available Balance: **₹1,35,991.21**
- Hold/Lien Amount: ₹0.00
- Uncleared Balance: ₹0.00
- MOD Balance: ₹0.00

#### Associated Debit Card
- Card visual (dark maroon/brown gradient):
  - SBI logo | VISA logo
  - Card number: XXXX XXXX XXXX 4957
  - Valid From: 05/21 | Valid Thru: 04/26
  - Name: JANAM SHAH
  - Contactless + chip icons
- "Manage Debit Card" link

### Design Issues Noted
- Good layout overall — cleaner than the dashboard
- Left sidebar navigation is logical
- Card visualization is a nice touch
- **Issues**: 
  - Account summary info is plain text, could use better formatting
  - Balance section could be more prominent (it's the most important info)
  - "Spend Analysis" tab is interesting but buried
  - The apply-for-new-account CTAs feel pushy in an account view
  - Rate of interest (2.50%) shown but no context on how it compares

---

## Screenshot 8: Payments Dropdown Menu

### Menu Structure (Opened from "Payments" nav item)
**Fund Transfer** (left column):
- Quick Transfer
- Send Money
- Manage Payee
- Schedule Payments
- Send Money Abroad
- Bill Payments

**Quick Links** (right column):
- Transaction History
- Manage Limits

### Design Issues Noted
- Clean dropdown, reasonable organization
- **Issues**:
  - "Quick Transfer" vs "Send Money" distinction is unclear to users
  - "Fund Transfer" as a category name is bank jargon, not user language
  - "Send Money Abroad" is separate from "Send Money" — could be confusing
  - Only 2 quick links feels sparse
  - No icons in the dropdown (unlike the dashboard icons)
  - Dropdown overlays the page content (debit card visible behind)

---

## Screenshot 9: Send Money — Select Payee

### Page Header
- Back to Home link
- **"Send Money"** heading (purple)

### Progress Stepper
- Select Payee (active) → Transaction details → Review → Authentication → Receipt

### Content

#### Top Actions
- Transaction History | + Add Payee (purple filled) | + Manage Payee (purple filled)

#### Recently Paid
- Horizontal scrollable avatars: Janam S., Manali B., Janam S., Janam S. (with left/right arrows)
- Circular purple avatars with initials

#### Transfer to Self Accounts
- Savings Account — Account No: 20375498033 — **Pay** button (purple)

#### Transfer to Other Payees
- Search bar: "Search here..."
- **Manali Bhavsar** — Account No: 5412455325 — View & Edit | Pay
- **Janam Shah** — Account No: 2313795871 — View & Edit | Pay
- **Janam Shah Axis CC** — Account No: 4117146064902233 — View & Edit | Pay

### Design Issues Noted
- Good clear stepper showing progress
- Recently Paid section is helpful
- Self-transfer separated from other payees is logical
- **Issues**:
  - Multiple payees with same/similar names ("Janam S." appears 3x in recents) — needs better differentiation (bank name, last 4 digits)
  - "View & Edit" and "Pay" buttons are small and close together
  - No payee categories or grouping
  - Add Payee is a button but could be more discoverable
  - No indication of payee bank/transfer type (IMPS/NEFT/RTGS)

---

## Screenshot 10: Payee Details Page

### Page Header
- Back to Home link
- **"Payee Details"** heading (purple)

### Payee Card
- Avatar: JS (purple circle)
- **Janam Shah**
- KOTAK MAHINDRA BANK LIMITED: 2313795871
- Payee Limit: ₹2,00,000.00

### Action Buttons (Inline)
- Verify (text link) | Edit Transaction Limit (outlined) | Overview (outlined) | Delete (outlined)

### Tabs
- **Recent Transactions** (active) | Scheduled Transactions (0)

### Transaction History
- **March 2026**:
  - Payment to Janam Shah — 30/03/2026 at 1:47 PM — **₹34,000.00** — Success ✅
  - Tag: "Bill Payment"

### Bottom
- **Pay** button (purple, full-width, bottom-right)

### Design Issues Noted
- Clean, focused layout — one of the better pages
- Transaction history with date grouping is good
- **Issues**:
  - Action buttons are all the same visual weight — "Delete" should look different/dangerous
  - "Verify" as a text link is inconsistent with the button actions
  - Only one transaction visible — no indication of pagination or "load more"
  - The tag "Bill Payment" seems like metadata, not a user-applied tag
  - Pay button at bottom right could be missed on long pages

---

## Screenshot 11: Send Money — Transaction Details Form

### Progress Stepper
- Select Payee ✓ → **Transaction details** (active) → Review → Authentication → Receipt

### Payee Info Bar
- JS avatar | Janam Shah | KOTAK MAHINDRA BANK LIMITED: 2313795871
- Verify link | Payee Limit: ₹2,00,000.00

### Form Fields

**Transfer**: Toggle — **Now** (active, purple) | Schedule Payment

**Transfer Amount**: 
- Amount input field
- "Recent Transfers" — shows ₹34,000.00 (30 Mar 2026) as quick-fill chip

**Mode of Transfer**: 
- Toggle pills — **IMPS** (active, purple) | NEFT | RTGS
- Helper text: "Instant Transfer upto ₹5,00,000 per transaction"

**Debit Account**:
- Card showing: XXXX XXX8 033 | Savings Account | Available Balance: ₹1,35,991.21+

**Purpose**: 
- Dropdown: "Purpose" (placeholder)

### Navigation
- ← Previous (bottom-left)
- "up next: Review" label | **Proceed →** (purple, bottom-right)

### Design Issues Noted
- Good form layout with clear sections
- Recent transfers as quick-fill is a great feature
- Mode of transfer toggles are clear
- **Issues**:
  - "Verify" link on payee bar is repeated from previous page — unnecessary
  - No amount validation feedback visible (min/max)
  - IMPS/NEFT/RTGS differences not explained for regular users
  - Purpose dropdown feels mandatory but unclear why
  - "up next: Review" label is unusual — not standard UX pattern
  - Debit account selection seems like a card, not a selector (what if multiple accounts?)

---

## Screenshot 12: Review Transaction Modal

### Modal Overlay
- Dims the background (transaction form visible behind)
- Close (X) button top-right

### Content
- **"Review Your Transactions Details"** heading

#### Transaction Summary
- **Amount**: ₹1 (large, prominent)
- **To**: JS avatar | Janam Shah | KOTAK MAHINDRA BANK LIMITED: 2313795871
- **From**: SBI icon | Savings Account | Account number: 20375498033
- Mode of Transfer: IMPS
- Purpose: Transfer to Family or friends

### Confirmation
- Info icon: "Please verify the details and accept the 'Terms and Conditions'."
- Checkbox: "I have read, understood & agree to the Terms and Conditions" (unchecked)

### Buttons
- **Back** (outlined) | **Yes, I confirm** (greyed out — disabled until checkbox checked)

### Design Issues Noted
- Modal approach is reasonable for review
- Clear summary of transaction details
- **Issues**:
  - "Yes, I confirm" is disabled/greyed — user must check T&C box first, but the pattern is friction
  - "Review Your Transactions Details" — grammatical error ("Transactions" should be "Transaction")
  - Terms & Conditions checkbox for every transaction is excessive
  - Modal could be larger — the information feels cramped
  - No option to edit from this screen — must go "Back"

---

## Screenshot 13: Payment OTP Verification Modal

### Modal (Right-side slide-in panel, purple header)
- **"You're paying ₹1 to Janam Shah"** (white text on purple)
- Close (X) button

### Content
- "OTP has been sent to your registered mobile number."
- "The OTP will expire in: **00:58**" (countdown timer)
- Warning: "Only one OTP validation is allowed per request. Please verify before submitting"
- **Resend OTP**: "28s" countdown before resend available
- OTP input field (with eye icon for show/hide)
- **Submit** button (purple)

### Design Issues Noted
- Good: Shows who you're paying and amount in header
- Good: OTP countdown timer
- Good: Resend OTP with cooldown timer
- **Issues**:
  - "Only one OTP validation is allowed per request" is confusing — does that mean one attempt only?
  - The warning creates anxiety during a payment
  - No option for alternate OTP delivery
  - Slide-in panel is a different pattern than the previous modal (inconsistency)
  - The purple header takes up a lot of space

---

## Screenshot 14: Transaction Successful Page

### Progress Stepper
- Select Payee ✓ → Transaction details ✓ → Review ✓ → Authentication ✓ → **Receipt** (active)

### Success Card
- **"Transaction Successful"** heading
- Payee info: JS avatar | Janam Shah | KOTAK MAHINDRA BANK LIMITED: 2313795871
- **Download options**: PDF icon | JPEG icon
- Green checkmark (large, ✓)
- **Amount**: ₹1.00
- Label: "Transfer to Family or friends"
- Transaction Date: 10/04/2026
- Transaction Time: 02:57 AM
- Debit Account: (visible)
- Mode of Transfer: (visible)

### Navigation
- **Done →** button (purple, bottom-right)

### Design Issues Noted
- Clean success confirmation
- PDF/JPEG download options are useful
- Green checkmark provides clear success signal
- **Issues**:
  - Transaction reference number not prominently displayed (critical for support)
  - "Done" goes where? Back to dashboard? Back to payments?
  - No "Send another payment" shortcut
  - No share option (WhatsApp/email the receipt)
  - Time shown as 02:57 AM — no timezone indicator

---

# COMPLETE UX AUDIT SUMMARY

## Full User Journey: Login to Payment (14 screens documented)

### Login Flow (5 screens — Screenshots 1-5)
```
Portal → Pre-Login → Login Form → OTP → YONO Transition → Dashboard
```
**Verdict**: Severely fragmented. Should be 2 screens max (Login + OTP).

### Dashboard (1 screen — Screenshot 6)
**Verdict**: Information overload. Tries to be everything at once.

### Account View (1 screen — Screenshot 7)
**Verdict**: Relatively clean. Best-designed page in the current system.

### Payment Flow (6 screens — Screenshots 8-14)
```
Menu → Select Payee → [Payee Details] → Transaction Form → Review Modal → OTP Modal → Success
```
**Verdict**: Reasonable flow but with inconsistent interaction patterns (page vs. modal vs. slide-in panel).

## Top-Level Design Problems

### 1. Identity Crisis
- 4 brand names: SBI, SBI ONLINE, YONO SBI, YONO
- 3 subdomains in login alone
- Old design (login) vs. new design (YONO) coexist

### 2. Information Architecture
- Dashboard has no hierarchy — everything is "important"
- Navigation has 10+ primary items
- Quick actions, product grid, and sidebar all compete
- Payment menu has ambiguous labels (Quick Transfer vs Send Money)

### 3. Visual Design
- Login pages: dated, cluttered, anxiety-inducing
- YONO pages: cleaner but inconsistent (modals vs panels vs pages)
- Purple/white theme is okay but monotonous
- No clear design system — spacing, typography, components vary

### 4. Interaction Patterns
- Review step uses centered modal
- OTP uses right-side slide-in panel
- Different page types for similar actions
- Buttons styles vary across screens

### 5. Content & Messaging
- Excessive security warnings everywhere
- Bank jargon (Fund Transfer, Mode of Operation, MOD Balance)
- Grammatical errors ("Transactions Details")
- "Coming Soon" placeholders on production

### 6. Key Metrics (Estimated)
- **Login**: 5 pages, 4+ clicks, ~3 minutes
- **Send Money**: 6 steps from menu to success
- **Total to make a payment from scratch**: 11+ screens

## Redesign Opportunity Areas
1. **Unified single-page login** — eliminate the multi-step journey
2. **Clean, modern visual design** — whitespace, typography, consistent colors
3. **Simplified navigation** — reduce cognitive load
4. **Modern security** — replace CAPTCHA with invisible reCAPTCHA or similar
5. **Consistent branding** — one unified SBI identity
6. **Mobile-first responsive** — current design is desktop-centric
7. **Progressive disclosure** — show information when needed, not all at once
8. **Trust through design** — clean design builds more trust than warning banners
9. **Streamlined payment flow** — consistent interaction patterns throughout
10. **Dashboard hierarchy** — surface what matters, hide what doesn't
11. **Human language** — replace bank jargon with plain English/Hindi
12. **Consistent component library** — one modal style, one button style, one card style

# AGENTS.md

## Project Goal

Gadget Goblin is a content-first affiliate tech website focused on useful gadgets, budget gaming gear, PC upgrades, desk setup upgrades, power gear, weird but practical tech, hot product roundups, research-based product reviews, and affiliate recommendations.

The site should feel practical, helpful, no-BS, slightly fun, and goblin-themed without becoming childish. It should feel curated by a real person, not like a generic AI content farm.

## Target Audience

- Budget-conscious gamers
- PC builders and upgraders
- Desk setup tinkerers
- People who want useful gadgets without wasting money
- Readers comparing practical gear before buying

## Monetization Model

The site earns through affiliate links and possibly ads or newsletter sponsorships later. It is not an ecommerce store.

Do not add:

- Backend
- Database
- Login system
- Shopping cart
- Payment processor
- Unnecessary framework complexity

## Affiliate Compliance Rules

- Always disclose affiliate links.
- Sitewide footer disclosure must remain: `As an Amazon Associate, Gadget Goblin may earn from qualifying purchases.`
- Add a nearby disclosure block on affiliate-heavy pages and sections.
- Do not scrape Amazon.
- Do not invent affiliate IDs.
- Do not invent exact prices.
- Do not fake testimonials.
- Do not fake hands-on testing.
- Do not use Amazon product images unless provided by the user or through an approved official method.
- Use neutral CTA text such as `Check current price`, `View product`, or `See details`.

## Design Direction

- Mobile-first
- Fast
- Dark tech/goblin style
- Clean card-based layouts
- High contrast
- Easy tap targets
- Clear disclosures
- Polished, but not cluttered

Use the existing static structure unless the project is intentionally migrated later.

## Required Pages

- Home
- Reviews
- Deals
- Best Lists
- Comparisons
- About
- Affiliate Disclosure
- Privacy Policy
- Contact
- 404

## Content Types

- Product cards
- Research-based reviews
- Deal analysis
- Comparisons
- Best lists
- Category guides
- Newsletter blurbs
- Short-form social summaries

## Review Page Structure

Each review should include:

- Review type label
- Short practical summary
- Goblin Score
- Last checked date
- Pros and cons
- Best for
- Avoid if
- Specs and checks
- Alternatives
- Final take
- FAQ
- Affiliate disclosure
- Neutral affiliate CTA

## Goblin Score System

`goblinScore` is a 0-100 practical recommendation score. It should reflect:

- Usefulness
- Value for money
- Fit for target audience
- Compatibility
- Known drawbacks
- Risk of buyer regret
- Availability of better alternatives

Do not present the score as lab-tested unless the review is actually hands-on and the methodology is documented.

## Product And Review Data Fields

Product data lives in `data/products.json`.

Required fields:

- `id`
- `slug`
- `name`
- `title`
- `category`
- `shortDescription`
- `reviewType`
- `bestFor`
- `avoidIf`
- `pros`
- `cons`
- `specs`
- `goblinScore`
- `affiliateNetwork`
- `affiliateUrl`
- `imageUrl`
- `lastCheckedDate`
- `datePublished`
- `dateUpdated`
- `alternatives`
- `finalTake`
- `faq`

Allowed `reviewType` values:

- `hands-on`
- `research-based`
- `deal-analysis`
- `comparison`

## GitHub Pages Notes

This repository is named `thegadgetgoblin.github.io`, so it should be treated as a user or organization GitHub Pages site. Static files should live at the repository root unless a future build system is added.

Keep relative paths working on GitHub Pages. Do not assume a project subpath unless the repo name changes.

## Development Rules

- Keep the stack simple.
- Prefer plain HTML/CSS/JS for this site.
- Do not add a package system unless it solves a real problem.
- Keep content honest and clearly labeled.
- Update `sitemap.xml` when adding standalone pages.
- Preview through a local server because JSON loading uses `fetch`.

## What Not To Break

- `index.html` at the root
- `assets/css/styles.css`
- `assets/js/site.js`
- `data/products.json`
- Affiliate disclosure language
- Mobile navigation
- GitHub Pages compatibility
- Review type honesty


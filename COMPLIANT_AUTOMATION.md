# Compliant Automation Plan

This is the safe version of the requested product-finding and review-writing agent.

## What Not To Build

Do not build an agent that:

- Scrapes Amazon pages.
- Scrapes Amazon customer reviews.
- Copies or stores Amazon customer review text.
- Pulls Amazon product images from the retail page HTML.
- Invents affiliate IDs.
- Publishes AI reviews as hands-on testing.

## What To Build Later

After Amazon Associates/API approval, build an importer that uses approved Amazon product APIs to collect allowed product metadata.

Suggested fields to import into `data/products.json`:

- `asin`
- `name`
- `title`
- `category`
- `categorySlug`
- `shortDescription`
- `officialProductUrl`
- `affiliateUrl`
- `imageUrl`
- `imageAlt`
- `lastCheckedDate`
- `sourceUrls`

The site already supports these fields. Product cards will show `imageUrl` when it is populated.

## Product Discovery Workflow

Use a human-reviewed queue:

1. Search approved sources for products in a category.
2. Add candidates to `data/products.json`.
3. Use Amazon search links only as temporary placeholders.
4. Replace with approved affiliate links after account approval.
5. Add product images only from approved API responses, manufacturer press kits, or your own photos.
6. Add source links in `sourceUrls`.
7. Mark review type as `research-based`, `deal-analysis`, or `comparison`.

## Review Research Workflow

The agent may summarize notes that you provide from:

- Official product pages
- Manufacturer documentation
- Reputable editorial reviews
- Your own hands-on notes
- Permitted owner-review summaries from sources that allow this use

The agent must not scrape or store Amazon customer review content.

Use `review-builder.html` to turn manually collected notes into a research-based draft.

## Goblin Voice Rules

Use a little personality, not nonsense.

Good:

- "Good enough to earn a spot in the gear pile."
- "Skip it if your desk is already cable chaos."
- "The shiny feature is less important than whether the port layout makes sense."

Avoid:

- Babyish fantasy language
- Fake lab testing
- Fake certainty
- Overclaiming from weak evidence

## Future API Implementation Notes

Do this only after credentials exist:

1. Store API keys outside the repository.
2. Create a local script that writes candidate JSON, not finished published reviews.
3. Rate-limit requests.
4. Log `lastCheckedDate`.
5. Require manual approval before publishing.
6. Never commit secret keys.


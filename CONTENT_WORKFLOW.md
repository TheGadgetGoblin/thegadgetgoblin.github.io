# Content Workflow

Use this workflow to add hot tech products quickly without turning Gadget Goblin into a fake review mill.

## 1. Pick A Product Or Topic

Good starter categories:

- Budget gaming headsets
- Cheap mechanical keyboards
- Steam Deck accessories
- USB hubs for gaming PCs
- Budget microphones
- Desk setup upgrades
- Cheap PC builder tools
- Useful power banks

Pick products that solve a clear problem, fit a budget, and have enough public information to research honestly.

## 2. Research The Product

Use:

- Official product page
- Official spec sheet or manual
- Reputable reviews
- Owner feedback patterns
- Compatibility notes
- Return policy and warranty information
- Common complaints

Do not scrape Amazon or Amazon user reviews. Do not copy merchant content wholesale. Do not invent testing results.

For quick drafts, open `review-builder.html` in the local preview and paste your own summarized research notes. The builder is a formatting helper, not a source of truth.

## 3. Choose The Review Type

Use one of:

- `hands-on`: only after real testing
- `research-based`: public specs, reputable sources, owner-pattern research, and tradeoff analysis
- `deal-analysis`: focused on whether a product or category is worth watching at the right price
- `comparison`: compares multiple options or product categories

When unsure, choose `research-based`.

## 4. Add The Product Data

Open:

```text
data/products.json
```

Add a new object with all required fields. Use a unique `id` and URL-friendly `slug`.

Set:

- `affiliateNetwork` to the real network name when known
- `affiliateUrl` to an official affiliate URL
- `lastCheckedDate` to the date the link and claims were checked
- `goblinScore` to a realistic 0-100 score

Do not add exact prices unless you also add a manual price field and update `lastCheckedDate`.

## 5. Write The Review Honestly

Structure:

- What it is
- Who it is for
- Who should avoid it
- Practical pros
- Practical cons
- Specs that matter
- Alternatives
- Final take
- FAQ

Avoid:

- Fake hands-on phrases
- Fake benchmarks
- Fake durability claims
- Fake testimonials
- Overconfident claims from weak evidence

## 6. Add A Standalone Review Page

For a full page:

1. Copy `templates/review-template.html`.
2. Save it as `reviews/your-product-slug.html`.
3. Replace `REVIEW_TITLE`, `REVIEW_DESCRIPTION`, and `REVIEW_SLUG`.
4. Make sure `REVIEW_SLUG` matches the JSON `slug`.
5. Add the URL to `sitemap.xml`.

The shared JavaScript renders the review details from `data/products.json`.

## 7. Add Affiliate Links

Replace:

```text
https://example.com/replace-with-affiliate-link
```

Use official affiliate links. Use neutral CTAs:

- Check current price
- View product
- See details

## 8. Publish

Preview locally:

```powershell
python -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

Check:

- Mobile layout
- Navigation
- Product cards
- Affiliate disclosures
- Review type labels
- Links
- Sitemap entry

Then commit and push to GitHub Pages.

## 9. Short-Form Social Content

Turn a review into:

- One hook: the problem the product solves
- Three useful bullets
- One warning
- One neutral CTA

Example:

```text
Cheap gaming headsets can be fine if you ignore the RGB bait.
- Check mic clarity first.
- Comfort matters more than driver size.
- 3.5 mm is easier for console support.
Watch out for fake surround claims.
Full notes on Gadget Goblin.
```

## 10. Newsletter Blurb

Keep it short:

```text
This week I checked the budget gaming headset category under $50. The useful picks are the boring ones: comfortable, clear mic, sane cable, and no nonsense surround claims. I would avoid anything that only sells itself on lighting.
```

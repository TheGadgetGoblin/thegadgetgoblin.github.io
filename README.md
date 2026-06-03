# Gadget Goblin

Gadget Goblin is a mobile-first, content-first affiliate tech website focused on useful gadgets, budget gaming gear, PC upgrades, desk setup upgrades, power gear, weird but practical tech, hot product roundups, and research-based recommendations.

The site is intentionally simple: plain HTML, CSS, JavaScript, JSON, and an optional Node script that bakes review pages into static HTML. There is no backend, database, login system, shopping cart, or package system.

## Project Status

- Stack: plain static HTML/CSS/JS
- Data: `data/products.json`
- Host target: GitHub Pages
- Expected public URL for this repo name: `https://thegadgetgoblin.github.io/`
- Review pages: generated static HTML committed under `reviews/`

## Local Preview

Because product cards load from JSON, preview through a local web server instead of opening `index.html` directly.

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Editing Products

Edit products in:

```text
data/products.json
```

Each product supports:

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

Do not use `hands-on` unless the product was actually tested.

## Adding a New Review

1. Add the product or review entry to `data/products.json`.
2. Choose a unique `slug`.
3. Run the review builder:

```powershell
node scripts/build-reviews.js
```

4. Add the new page URL to `sitemap.xml`.
5. Link to it from `reviews.html`, a best list, or the homepage if it should be featured.

For cards only, adding the JSON entry is enough. For a standalone review page, run the builder and commit the generated HTML.

## Affiliate Links

Use official affiliate links only. Do not invent Amazon affiliate IDs. Do not scrape Amazon or Amazon user reviews. Do not display exact prices unless you manually add a price field and update `lastCheckedDate`.

Some current buttons use non-tagged retailer pages or Amazon search URLs so readers can verify current details. Replace them with approved affiliate links only after the destination and affiliate program requirements are confirmed.

Recommended button text:

- Check current price
- View product
- See details

## Disclosures

Sitewide footer disclosure:

```text
As an Amazon Associate, Gadget Goblin may earn from qualifying purchases.
```

Affiliate-heavy pages also include:

```text
This page may contain affiliate links. If you buy through them, Gadget Goblin may earn a commission at no extra cost to you.
```

Update `affiliate-disclosure.html` before applying to or publishing through affiliate programs.

## Deployment To GitHub Pages

This repository name, `thegadgetgoblin.github.io`, is a GitHub user or organization Pages site. It should deploy from the root of the default branch, usually `main`.

If this folder is still not connected to Git:

```powershell
git init
git branch -M main
git remote add origin https://github.com/TheGadgetGoblin/thegadgetgoblin.github.io.git
git add .
git commit -m "Rebuild Gadget Goblin static site"
git push -u origin main
```

If GitHub CLI is available after restarting your terminal:

```powershell
gh auth login
gh repo view TheGadgetGoblin/thegadgetgoblin.github.io
```

Then use the normal `git push` flow above.

In GitHub, confirm Pages is set to deploy from:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/root`

## Monetization Checklist

- Replace every non-tagged retailer/search URL with an approved affiliate URL when ready.
- Confirm disclosures appear near affiliate-heavy sections.
- Review the Affiliate Disclosure page.
- Add a real contact method.
- Add a real privacy policy before enabling analytics, ads, or email collection.
- Do not use Amazon product images unless through an approved official method.
- Do not claim hands-on testing unless you actually tested the product.

## Remaining Launch Tasks

- Replace non-tagged retailer/search links with approved affiliate links when ready.
- Add real product-level reviews for the highest-priority categories.
- Add a contact email or connect a real form provider.
- Add analytics only after updating the privacy policy.
- Expand research-outline pages into finalized guides.
- Consider custom product images or approved merchant images later.

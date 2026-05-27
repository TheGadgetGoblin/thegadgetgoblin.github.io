# Product Selection Workflow

Use this workflow to turn a research-based Gadget Goblin guide from a useful draft into a monetization-ready article.

## 1. Choose Exact Products

For each guide, pick 3-5 exact products. Avoid vague product families unless the article is still in draft mode.

For each pick, record:

- `productName`
- `pickLabel`
- `bestFor`
- `avoidIf`
- `pros`
- `cons`
- `lastCheckedDate`

If the exact model is not finalized, keep:

```text
Product slot - final model needed
```

## 2. Record Official Product URLs

Use manufacturer or brand pages when possible.

Good official sources:

- Manufacturer product page
- Manufacturer support page
- Official PDF/manual/spec sheet
- Official retailer page only when the manufacturer does not publish useful specs

Add the URL to:

```json
officialProductUrl
```

## 3. Record ASINs

Only add an ASIN after confirming the exact Amazon listing for the exact model.

Do not guess ASINs.

Add the ASIN to:

```json
asin
```

## 4. Add Source URLs

Use source links to support specs, category reasoning, and product claims.

Good source types:

- Official product pages
- Official manuals/spec pages
- Reputable editorial reviews
- Reputable lab-style testing pages
- Your own testing notes, if any

Do not scrape Amazon customer reviews. Do not copy review text.

Add source links to:

```json
sourceUrls
```

## 5. Add Allowed Images

Use only images you are allowed to publish:

- Your own photos
- Manufacturer press/media assets with permission
- Approved Amazon API image URLs after approval
- Generated category images that are not pretending to show a real product

Do not pull images from Amazon retail pages manually.

Add:

```json
imageUrl
imageAlt
```

## 6. Replace Affiliate Links Later

Current links are search or placeholder links.

After approval, replace:

```json
affiliateUrl
```

Use neutral CTA text such as:

- Check current price
- View product
- See details

Do not invent affiliate IDs.

## 7. Avoid Fake Hands-On Claims

Use `research-based` unless you personally tested the product.

Avoid phrases like:

- We tested
- In our lab
- We measured
- After weeks of use

Use phrases like:

- Based on official specs
- Based on current research
- The pattern to verify is
- This is a product slot until the final model is chosen

## 8. Update Last Checked Date

Update `lastCheckedDate` whenever you verify:

- Product availability
- Official links
- ASIN
- Affiliate URL
- Specs
- Image permissions

Use `YYYY-MM-DD`.

## 9. Mark A Guide Ready For Monetization

Set:

```json
readyForAffiliateLinks: true
productSelectionStatus: "final-products-selected"
```

Only do this when:

- Exact products are chosen.
- Official URLs are present.
- ASINs are verified if Amazon is used.
- Affiliate links are approved and correct.
- Images are allowed.
- Claims are sourced.
- No fake hands-on claims appear.
- Privacy and affiliate disclosure pages have been reviewed.


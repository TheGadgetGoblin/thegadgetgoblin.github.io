# Gadget Goblin Monetization Setup

Use this file to track MailerLite, Google AdSense, and Amazon Associates setup without mixing private account data into the public site repo.

## Current Priority

Do these in this order:

1. MailerLite domain authentication and newsletter form setup.
2. Site trust cleanup for AdSense and Amazon review.
3. Amazon Associates application after the first guides are stronger.
4. AdSense application after the site has enough useful original content.

Do not paste passwords, tax details, bank details, phone verification codes, or private account IDs into this repo.

## MailerLite

Dashboard:

```text
https://dashboard.mailerlite.com/configuration/domains
```

Goal:

- Authenticate the sending domain.
- Create one simple signup form.
- Replace the current placeholder newsletter form only after the form is live and the privacy policy is updated.

Official setup notes:

- MailerLite domain authentication: https://www.mailerlite.com/help/how-to-verify-and-authenticate-your-domain
- MailerLite domains help: https://www.mailerlite.com/help/c/domains

Checklist:

- [ ] Add the Gadget Goblin domain in MailerLite.
- [ ] Copy the exact DNS records MailerLite gives you.
- [ ] Add DKIM as a `CNAME` record at the DNS host.
- [ ] Add SPF as a `TXT` record at the DNS host.
- [ ] Add MailerLite domain verification as a `TXT` record if requested.
- [ ] Click MailerLite's DNS check button after DNS has had time to update.
- [ ] Create one audience/group for Gadget Goblin readers.
- [ ] Create a simple embedded signup form.
- [ ] Update `privacy-policy.html` before the embedded form goes live.
- [ ] Replace the placeholder newsletter form on `index.html`.

Notes:

- Do not edit MailerLite's DKIM/SPF values. Copy them exactly.
- If an SPF record already exists, merge it carefully instead of adding multiple conflicting SPF records.
- The site currently says newsletter capture is not active. Update that before enabling the form.

## Google AdSense

Login:

```text
https://www.google.com/adsense/login
```

Goal:

- Prepare the site for review, but do not rush the application while pages still look thin or unfinished.

Official setup notes:

- AdSense eligibility: https://support.google.com/adsense/answer/9724

Checklist before applying:

- [ ] Publish the current visual polish and verify GitHub Pages is green.
- [ ] Make sure the live site has no broken navigation.
- [ ] Make sure `privacy-policy.html` reflects any analytics, ads, or email tools actually enabled.
- [ ] Make sure `contact.html` has a real contact method.
- [ ] Make sure the About page makes the site feel owned by a real publisher.
- [ ] Strengthen at least 5 buyer guides with useful original research summaries.
- [ ] Remove public TODO language from reader-facing pages unless it is an intentional trust note.
- [ ] Keep pages readable on mobile.
- [ ] Avoid auto-generated thin content.
- [ ] Add AdSense code only after Google provides it and you are ready for review.

Notes:

- AdSense is more likely to reject sites that look unfinished, thin, inaccessible, or policy-unclear.
- Apply after the first five guides feel useful to a real reader, not just structurally complete.

## Amazon Associates

Application:

```text
https://affiliate-program.amazon.com/
```

Goal:

- Apply after Gadget Goblin has enough useful content and trust pages.
- Keep all Amazon links non-affiliate or placeholder until approval.

Official setup notes:

- Associates Operating Agreement: https://affiliate-program.amazon.com/help/operating/agreement/
- Associates Program Policies: https://affiliate-program.amazon.com/help/operating/policies
- Amazon disclosure help: https://affiliate-program.amazon.com/help/node/topic/GPXFHVYZMTGPUMPE

Checklist before applying:

- [ ] Keep the required sitewide footer disclosure visible.
- [ ] Keep affiliate disclosure visible near affiliate-heavy sections.
- [ ] Finish at least 5 strong buyer guides.
- [ ] Verify exact product picks, official URLs, ASINs, source URLs, and last checked dates.
- [ ] Do not use Amazon retail-page images manually.
- [ ] Do not scrape Amazon reviews.
- [ ] Do not invent affiliate IDs.
- [ ] Do not claim hands-on testing.
- [ ] Review `affiliate-disclosure.html`.
- [ ] Review `privacy-policy.html`.
- [ ] Make sure `AFFILIATE_LINK_REPLACEMENT_TRACKER.md` shows what still needs replacement.

After approval:

- [ ] Replace placeholder affiliate links with approved tagged URLs.
- [ ] Confirm every affiliate link points to the exact product model.
- [ ] Use neutral CTA text such as `Check current price`.
- [ ] Re-check disclosure placement on every monetized page.
- [ ] Update `readyForAffiliateLinks` only when links, images, ASINs, and disclosures are all ready.

## Site-Side Implementation Tasks

MailerLite:

- [ ] Replace homepage newsletter placeholder with approved MailerLite embed.
- [ ] Add a short privacy note near signup if needed.
- [ ] Update privacy policy with newsletter provider language.

AdSense:

- [ ] Add AdSense verification/ad script only after account setup provides it.
- [ ] Decide where ads can appear without hurting trust or mobile readability.
- [ ] Avoid ads inside the first screen of buyer guides until the site feels established.

Amazon:

- [ ] Keep product image placeholders until allowed image sources are available.
- [ ] Replace product `affiliateUrl` fields only after approval.
- [ ] Leave `readyForAffiliateLinks: false` until each guide is truly ready.

## Do Not Store In Git

- Passwords
- API keys
- MailerLite private keys
- AdSense publisher IDs if you do not want them public before launch
- Amazon tracking IDs before you are ready to publish them
- Tax details
- Bank details
- Personal identity documents


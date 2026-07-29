const fs = require("fs");
const path = require("path");

const SITE_URL = "https://thegadgetgoblin.github.io";
const ASSET_VERSION = "20260729-1";
const ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(ROOT, "data", "products.json");
const REVIEWS_DIR = path.join(ROOT, "reviews");

const reviewTypeLabels = {
  "hands-on": "Hands-on",
  "research-based": "Research-based review",
  "deal-analysis": "Deal analysis",
  "comparison": "Comparison"
};

const products = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/<\/script/gi, "<\\/script");
}

function cleanGeneratedHtml(value) {
  return value.replace(/[ \t]+$/gm, "").trimEnd() + "\n";
}

function absolute(pathname) {
  if (!pathname) return `${SITE_URL}/`;
  if (/^https?:\/\//.test(pathname)) return pathname;
  return `${SITE_URL}/${String(pathname).replace(/^\/+/, "")}`;
}

function nestedAsset(value) {
  if (!value) return "";
  if (/^(https?:|data:|\/)/.test(value)) return value;
  return `../${value}`;
}

function renderList(items) {
  if (!items || !items.length) return "<li>Check current specs, compatibility, and return policy before buying.</li>";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function renderTags(items) {
  return `<div class="tag-list">${(items || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function scoreMarkup(score) {
  const safeScore = Number(score) || 0;
  const color = safeScore >= 85 ? "var(--green)" : safeScore >= 75 ? "var(--gold)" : "var(--red)";
  return `<span class="score score-large" style="--score-value:${safeScore}; --score-color:${color}"><span class="score-meter" aria-hidden="true"><span></span></span>${safeScore}/100</span>`;
}

function specsTable(specs) {
  const entries = Object.entries(specs || {});
  if (!entries.length) return "<p>Specs will be expanded when the guide is refreshed.</p>";
  return `
        <div class="table-wrap">
          <table>
            <tbody>
              ${entries.map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join("\n")}
            </tbody>
          </table>
        </div>`;
}

function externalLink(url, label, className = "") {
  if (!url) return "";
  const classAttr = className ? ` class="${className}"` : "";
  return `<a${classAttr} href="${escapeHtml(url)}" rel="nofollow sponsored noopener" target="_blank">${escapeHtml(label)}</a>`;
}

function sourceLink(url, label) {
  if (!url) return "";
  return `<a href="${escapeHtml(url)}" rel="noopener nofollow" target="_blank">${escapeHtml(label || url)}</a>`;
}

function linkForPick(pick, commercialReady = false) {
  if (commercialReady && pick.productSourceUrl) return externalLink(pick.productSourceUrl, "Check current price", "button secondary");
  if (pick.officialProductUrl) {
    return `<a class="button secondary" href="${escapeHtml(pick.officialProductUrl)}" rel="noopener nofollow" target="_blank">View official product</a>`;
  }
  return "";
}

function sourceList(product) {
  const sources = [];
  for (const source of product.sourceUrls || []) {
    sources.push(source);
  }
  for (const pick of product.topPicks || []) {
    for (const source of pick.sourceUrls || []) {
      sources.push(source);
    }
  }
  const seen = new Set();
  const unique = sources.filter((source) => {
    const url = source.url || "";
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
  if (!unique.length) {
    return "<p>Source links will be added when this guide is expanded.</p>";
  }
  return `<ul>${unique.map((source) => `<li>${sourceLink(source.url, source.label)}</li>`).join("\n")}</ul>`;
}

function header(product) {
  const canonical = `${SITE_URL}/reviews/${product.slug}.html`;
  const ogImage = `${SITE_URL}/assets/images/gadget-goblin-og.svg`;
  const title = `${product.title} | Gadget Goblin`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: product.title,
    description: product.shortDescription,
    image: [ogImage],
    datePublished: product.datePublished,
    dateModified: product.dateUpdated,
    author: {
      "@type": "Organization",
      name: "Gadget Goblin"
    },
    publisher: {
      "@type": "Organization",
      name: "Gadget Goblin",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/gadget-goblin-logo.svg`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gear Library",
        item: `${SITE_URL}/reviews.html`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: canonical
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(product.shortDescription)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="../assets/images/gadget-goblin-logo.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(product.title)}">
  <meta property="og:description" content="${escapeHtml(product.shortDescription)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="article:published_time" content="${escapeHtml(product.datePublished)}T00:00:00-06:00">
  <meta property="article:modified_time" content="${escapeHtml(product.dateUpdated)}T00:00:00-06:00">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="../assets/css/styles.css?v=${ASSET_VERSION}">
  <script type="application/ld+json">${jsonLd(articleSchema)}</script>
  <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
</head>`;
}

function siteHeader() {
  return `<body data-page="reviews" data-root="../">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="../index.html" aria-label="Gadget Goblin home">
      <img class="brand-logo" src="../assets/images/gadget-goblin-logo.svg" alt="" width="44" height="44">
      <span><strong>Gadget Goblin</strong><small>Practical tech worth hoarding</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="../reviews.html">Gear Library</a>
      <a href="../deals.html">Deals</a>
      <a href="../best-lists.html">Guides</a>
      <a href="../about.html">About</a>
    </nav>
  </header>`;
}

function siteFooter() {
  return `<footer class="site-footer">
    <div>
      <strong>Gadget Goblin</strong>
      <p>As an Amazon Associate, Gadget Goblin may earn from qualifying purchases.</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="../affiliate-disclosure.html">Affiliate Disclosure</a>
      <a href="../privacy-policy.html">Privacy Policy</a>
      <a href="../contact.html">Contact</a>
    </nav>
  </footer>
  <button class="back-to-top" type="button" aria-label="Back to top">Top</button>
  <script src="../assets/js/site.js?v=${ASSET_VERSION}" defer></script>
</body>
</html>`;
}

function reviewHero(product) {
  return `<section class="review-hero section">
      <div class="review-hero-copy">
        <p class="eyebrow">${escapeHtml(reviewTypeLabels[product.reviewType] || product.reviewType)}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p>${escapeHtml(product.intro || product.shortDescription)}</p>
        <div class="meta-row">
          <span class="meta-pill">Last checked ${escapeHtml(product.lastCheckedDate)}</span>
          <span class="meta-pill">Updated ${escapeHtml(product.dateUpdated)}</span>
          <span class="meta-pill">${escapeHtml(product.category)}</span>
        </div>
      </div>
      <figure class="review-hero-visual">
        <img src="${escapeHtml(nestedAsset(product.imageUrl || "assets/images/gadget-goblin-og.svg"))}" alt="${escapeHtml(product.imageAlt || product.title)}" width="640" height="420">
      </figure>
    </section>`;
}

function comparisonTable(product) {
  const rows = (product.topPicks || []).map((pick) => `
              <tr>
                <td><strong>${escapeHtml(pick.pickLabel || pick.slot || "Pick")}</strong></td>
                <td>${escapeHtml(pick.productName || pick.name)}</td>
                <td>${escapeHtml(pick.bestFor || "Specific use case to compare.")}</td>
                <td>${escapeHtml(pick.avoidIf || pick.watchOut || "Verify tradeoffs before buying.")}</td>
                <td>${escapeHtml(pick.lastCheckedDate || product.lastCheckedDate)}</td>
                <td>${linkForPick(pick, product.readyForAffiliateLinks === true) || '<span class="affiliate-note">No buying link yet</span>'}</td>
              </tr>`).join("\n");
  return `<h2>Top picks comparison</h2>
        <div class="table-wrap comparison-table">
          <table>
            <thead>
              <tr>
                <th>Slot</th>
                <th>Model</th>
                <th>Best for</th>
                <th>Avoid if</th>
                <th>Last checked</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
}

function pickCards(product) {
  if (!product.topPicks || !product.topPicks.length) return "";
  const outlineOnly = product.productSelectionStatus === "research-outline";
  const commercialReady = product.readyForAffiliateLinks === true;
  const pickImage = (pick) => nestedAsset(pick.imageUrl || product.imageUrl || "assets/images/gadget-goblin-logo.svg");
  return `<h2>${outlineOnly ? "What this guide will compare" : "Why these picks made the shortlist"}</h2>
        <div class="article-grid pick-grid">
          ${product.topPicks.map((pick) => `
          <article class="article-card pick-card">
            <figure class="pick-card-visual">
              <img src="${escapeHtml(pickImage(pick))}" alt="${escapeHtml(pick.imageAlt || product.imageAlt || pick.productName || pick.name || "Product placeholder image")}" width="320" height="210">
            </figure>
            <p class="eyebrow">${escapeHtml(pick.pickLabel || pick.slot || "Research focus")}</p>
            <h3>${escapeHtml(pick.productName || pick.name)}</h3>
            <p>${escapeHtml(pick.why || "This slot needs current specs, support details, and tradeoff checks before a final recommendation.")}</p>
            ${outlineOnly && pick.slotStatus ? `<p class="affiliate-note">${escapeHtml(pick.slotStatus)}</p>` : ""}
            ${pick.bestFor ? `<h4>Best for</h4><p>${escapeHtml(pick.bestFor)}</p>` : ""}
            <h4>Avoid if</h4>
            <p>${escapeHtml(pick.avoidIf || pick.watchOut || "The tradeoffs are not a fit for your setup.")}</p>
            <div class="two-column-list compact-list">
              <section><h4>Pros</h4><ul>${renderList(pick.pros)}</ul></section>
              <section><h4>Cons</h4><ul>${renderList(pick.cons)}</ul></section>
            </div>
            ${outlineOnly && !pick.officialProductUrl ? `<p class="affiliate-note">No buying button is shown because this product slot is not final.</p>` : `<div class="affiliate-actions">${linkForPick(pick, commercialReady) || '<span class="affiliate-note">Retailer link needs review</span>'}</div>`}
          </article>`).join("\n")}
        </div>`;
}

function outlineBlock(product) {
  if (product.productSelectionStatus !== "research-outline") return "";
  return `<div class="disclosure-banner">
          This is a public research outline, not a finalized recommendation list. Product slots are shown for comparison context only, and buying buttons are intentionally omitted.
        </div>`;
}

function buyingLink(product) {
  if (!product.readyForAffiliateLinks || product.productSelectionStatus === "research-outline") {
    return `<p class="affiliate-note">Buying links are omitted until final products and destinations are reviewed.</p>`;
  }
  if (!product.affiliateUrl) {
    return `<p class="affiliate-note">Affiliate links are not finalized for this guide.</p>`;
  }
  return `<div class="affiliate-actions">
          ${externalLink(product.affiliateUrl, "Check current price", "button primary")}
          <span class="affiliate-note">Search-result link. Verify the exact model, seller, warranty, and price at checkout.</span>
        </div>`;
}

function faq(product) {
  if (!product.faq || !product.faq.length) return "";
  return `<h2>FAQ</h2>
        ${product.faq.map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("\n")}`;
}

function articleBody(product) {
  const isFlagship = product.slug === "budget-gaming-headsets-under-50";
  return `<section class="section compact">
      <div class="disclosure-banner">This page may contain affiliate links. If you buy through them, Gadget Goblin may earn a commission at no extra cost to you.</div>
    </section>
    <section class="section review-layout">
      <article class="prose review-article">
        ${outlineBlock(product)}
        <h2>Quick verdict</h2>
        <p>${escapeHtml(product.quickVerdict || product.finalTake)}</p>
        ${product.selectionNote ? `<div class="disclosure-banner">${escapeHtml(product.selectionNote)}</div>` : ""}
        ${isFlagship ? comparisonTable(product) : ""}
        ${pickCards(product)}
        <div class="two-column-list">
          <section>
            <h2>Best for</h2>
            ${renderTags(product.bestFor)}
          </section>
          <section>
            <h2>Avoid if</h2>
            ${renderTags(product.avoidIf)}
          </section>
        </div>
        <h2>Buying criteria</h2>
        <ul>${renderList(product.buyingCriteria)}</ul>
        <h2>Common mistakes</h2>
        <ul>${renderList(product.commonMistakes)}</ul>
        <h2>Specs and checks</h2>
        ${specsTable(product.specs)}
        <div class="two-column-list">
          <section>
            <h2>Pros</h2>
            <ul>${renderList(product.pros)}</ul>
          </section>
          <section>
            <h2>Cons</h2>
            <ul>${renderList(product.cons)}</ul>
          </section>
        </div>
        <h2>Alternatives</h2>
        <ul>${renderList(product.alternatives)}</ul>
        <h2>Final take</h2>
        <p>${escapeHtml(product.finalTake)}</p>
        ${faq(product)}
        <h2>Source links</h2>
        ${sourceList(product)}
        <h2>Affiliate disclosure</h2>
        <p>Gadget Goblin may earn from qualifying purchases through affiliate links. This research-based guide does not claim hands-on testing, does not list exact prices, and uses neutral buying language so readers can verify the current deal themselves.</p>
      </article>
      <aside class="review-sidebar">
        <div class="feature-panel">
          <p class="eyebrow">Goblin Score</p>
          <p>${scoreMarkup(product.goblinScore)}</p>
          <p>${escapeHtml(product.finalTake)}</p>
          ${buyingLink(product)}
        </div>
        <div class="feature-panel">
          <p class="eyebrow">Review type</p>
          <h2>${escapeHtml(reviewTypeLabels[product.reviewType] || product.reviewType)}</h2>
          <p>Scores reflect usefulness, value, fit for the target audience, compatibility, known drawbacks, buyer-regret risk, and availability of better alternatives.</p>
        </div>
      </aside>
    </section>`;
}

function page(product) {
  return `${header(product)}
${siteHeader()}
  <main id="main">
    ${reviewHero(product)}
    ${articleBody(product)}
  </main>
  ${siteFooter()}`;
}

fs.mkdirSync(REVIEWS_DIR, { recursive: true });
for (const product of products) {
  const outputPath = path.join(REVIEWS_DIR, `${product.slug}.html`);
  fs.writeFileSync(outputPath, cleanGeneratedHtml(page(product)));
  console.log(`Wrote ${path.relative(ROOT, outputPath)}`);
}

(function () {
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";

  const reviewTypeLabels = {
    "hands-on": "Hands-on",
    "research-based": "Research-based review",
    "deal-analysis": "Deal analysis",
    "comparison": "Comparison"
  };

  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if ((page === "home" && href === "index.html") || href.includes(`${page}.html`)) {
      link.setAttribute("aria-current", "page");
    }
  });

  const topButton = document.querySelector(".back-to-top");
  if (topButton) {
    window.addEventListener("scroll", () => {
      topButton.classList.toggle("is-visible", window.scrollY > 600);
    });
    topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("is-submitted");
      const existing = form.querySelector(".form-note");
      if (!existing) {
        const note = document.createElement("p");
        note.className = "form-note affiliate-note";
        note.textContent = "Placeholder form only. Connect a newsletter or form service before launch.";
        form.appendChild(note);
      }
    });
  });

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function productUrl(product) {
    return `${root}reviews/${product.slug}.html`;
  }

  function scoreMarkup(score) {
    const safeScore = Number(score) || 0;
    const color = safeScore >= 85 ? "var(--green)" : safeScore >= 75 ? "var(--gold)" : "var(--red)";
    return `<span class="score" style="--score-value:${safeScore}; --score-color:${color}"><span class="score-meter" aria-hidden="true"><span></span></span>${safeScore}/100</span>`;
  }

  function cardMarkup(product) {
    const tags = [reviewTypeLabels[product.reviewType] || product.reviewType, product.specs?.priceTier, product.category].filter(Boolean);
    const visual = product.imageUrl
      ? `<img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.imageAlt || product.name)}">`
      : `<span>${escapeHtml(product.category)}</span>`;
    return `
      <article class="product-card" id="${escapeHtml(product.slug)}">
        <a href="${productUrl(product)}">
          <div class="product-visual ${product.imageUrl ? "has-image" : ""}">${visual}</div>
          <div class="product-body">
            <div class="meta-row">${tags.map((tag) => `<span class="meta-pill">${escapeHtml(tag)}</span>`).join("")}</div>
            <h3>${escapeHtml(product.title)}</h3>
            <p>${escapeHtml(product.shortDescription)}</p>
            <div class="score-row">${scoreMarkup(product.goblinScore)}</div>
            <div class="affiliate-actions">
              <span class="button secondary">See details</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  function affiliateButton(product) {
    return `
      <div class="affiliate-actions">
        <a class="button primary" href="${escapeHtml(product.affiliateUrl)}" rel="nofollow sponsored noopener" target="_blank">Check current price</a>
        <span class="affiliate-note">${product.affiliateNetwork === "Amazon search placeholder" ? "Amazon search link. Replace with an approved affiliate link before publishing." : "Affiliate link. Check disclosure and date before publishing."}</span>
      </div>
    `;
  }

  function renderList(items) {
    return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderTopPicks(product) {
    if (!product.topPicks || !product.topPicks.length) return "";
    return `
      <h2>Top picks</h2>
      <div class="article-grid">
        ${product.topPicks.map((pick) => `
          <article class="article-card">
            <p class="eyebrow">${escapeHtml(pick.slot || "Pick")}</p>
            <h3>${escapeHtml(pick.name)}</h3>
            <p>${escapeHtml(pick.why)}</p>
            <p><strong>Watch out:</strong> ${escapeHtml(pick.watchOut || "Verify current specs, fit, and return policy before buying.")}</p>
            <div class="affiliate-actions">
              <a class="button secondary" href="${escapeHtml(pick.affiliateUrl || product.affiliateUrl)}" rel="nofollow sponsored noopener" target="_blank">Check current price</a>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderSourceLinks(product) {
    const sources = product.sourceUrls || [];
    if (!sources.length) {
      return "<p>Source links: TODO - add official product pages and current reputable review references before final monetized publishing.</p>";
    }
    return `
      <h2>Source links</h2>
      <ul>
        ${sources.map((source) => `<li><a href="${escapeHtml(source.url)}" rel="noopener" target="_blank">${escapeHtml(source.label || source.url)}</a></li>`).join("")}
      </ul>
    `;
  }

  function renderCards(target, products) {
    target.innerHTML = products.map(cardMarkup).join("");
  }

  function renderComparisonRows(target, products) {
    target.innerHTML = products.slice(0, 4).map((product) => `
      <tr>
        <td><strong>${escapeHtml(product.name)}</strong></td>
        <td>${escapeHtml((product.bestFor || []).slice(0, 2).join(", "))}</td>
        <td>${escapeHtml((product.avoidIf || []).slice(0, 2).join(", "))}</td>
        <td>${escapeHtml(reviewTypeLabels[product.reviewType] || product.reviewType)}</td>
      </tr>
    `).join("");
  }

  function renderReview(target, products) {
    const slug = target.dataset.reviewSlug;
    const product = products.find((item) => item.slug === slug);
    if (!product) {
      target.innerHTML = "<p>Review data not found.</p>";
      return;
    }

    document.title = `${product.title} | Gadget Goblin`;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", product.shortDescription);
    }

    target.innerHTML = `
      <article class="prose">
        <p class="eyebrow">${escapeHtml(reviewTypeLabels[product.reviewType] || product.reviewType)}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p>${escapeHtml(product.intro || product.shortDescription)}</p>
        <div class="meta-row">
          <span class="meta-pill">Last checked ${escapeHtml(product.lastCheckedDate)}</span>
          <span class="meta-pill">Updated ${escapeHtml(product.dateUpdated)}</span>
          <span class="meta-pill">${escapeHtml(product.category)}</span>
        </div>
        <h2>Quick take</h2>
        <p>${escapeHtml(product.quickVerdict || product.finalTake)}</p>
        <h2>Goblin read</h2>
        <p>${escapeHtml(goblinRead(product))}</p>
        ${renderTopPicks(product)}
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
        <h2>Best for</h2>
        <div class="tag-list">${(product.bestFor || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
        <h2>Avoid if</h2>
        <div class="tag-list">${(product.avoidIf || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
        <h2>What matters when buying</h2>
        <ul>${renderList(product.buyingCriteria)}</ul>
        <h2>Specs and checks</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              ${Object.entries(product.specs || {}).map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <h2>Common mistakes</h2>
        <ul>${renderList(product.commonMistakes)}</ul>
        <h2>Alternatives</h2>
        <ul>${renderList(product.alternatives)}</ul>
        <h2>FAQ</h2>
        ${(product.faq || []).map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("")}
        ${renderSourceLinks(product)}
      </article>
      <aside class="review-sidebar">
        <div class="feature-panel">
          <p class="eyebrow">Goblin Score</p>
          <p>${scoreMarkup(product.goblinScore)}</p>
          <p>${escapeHtml(product.finalTake)}</p>
          ${affiliateButton(product)}
        </div>
        <div class="disclosure-banner">This page may contain affiliate links. If you buy through them, Gadget Goblin may earn a commission at no extra cost to you.</div>
      </aside>
    `;
  }

  function goblinRead(product) {
    const category = product.category || "gear";
    const bestFor = (product.bestFor || [])[0] || "the right setup";
    const avoidIf = (product.avoidIf || [])[0] || "the tradeoffs bother you";
    return `This ${category.toLowerCase()} earns a spot in the stash if you need ${bestFor.toLowerCase()} and you are being realistic about the budget. Leave it in the cave if ${avoidIf.toLowerCase()}.`;
  }

  function setupFilters(products) {
    const search = document.querySelector("[data-filter-search]");
    const chipHost = document.querySelector("[data-filter-chips]");
    const grid = document.querySelector('[data-render="all-products"]');
    if (!search || !chipHost || !grid) return;

    const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
    let activeCategory = "All";
    chipHost.innerHTML = categories.map((category) => `<button type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
    chipHost.querySelector("button")?.classList.add("is-active");

    function apply() {
      const query = search.value.trim().toLowerCase();
      const filtered = products.filter((product) => {
        const categoryMatch = activeCategory === "All" || product.category === activeCategory;
        const text = `${product.title} ${product.shortDescription} ${product.category} ${(product.bestFor || []).join(" ")}`.toLowerCase();
        return categoryMatch && text.includes(query);
      });
      renderCards(grid, filtered);
    }

    chipHost.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      activeCategory = button.dataset.category;
      chipHost.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
      apply();
    });

    search.addEventListener("input", apply);
    apply();
  }

  async function initData() {
    const targets = document.querySelectorAll("[data-render], [data-review-slug]");
    if (!targets.length) return;

    let products = [];
    try {
      const response = await fetch(`${root}data/products.json?v=20260527-3`, { cache: "no-store" });
      products = await response.json();
    } catch (error) {
      targets.forEach((target) => {
        target.innerHTML = "<p>Product data could not load. Preview this site through a local web server instead of opening files directly.</p>";
      });
      return;
    }

    document.querySelectorAll("[data-render]").forEach((target) => {
      const type = target.dataset.render;
      if (type === "featured-deals") renderCards(target, products.filter((product) => product.reviewType === "deal-analysis").slice(0, 3));
      if (type === "latest-reviews") renderCards(target, products.slice(0, 3));
      if (type === "deal-products") renderCards(target, products.filter((product) => product.reviewType === "deal-analysis" || product.specs?.priceTier?.includes("Under")).slice(0, 6));
      if (type === "comparison-products") renderCards(target, products.filter((product) => product.reviewType === "comparison").concat(products.slice(0, 2)));
      if (type === "comparison-rows") renderComparisonRows(target, products);
      if (type === "category-products") {
        const category = target.dataset.category;
        renderCards(target, products.filter((product) => product.categorySlug === category));
      }
    });

    document.querySelectorAll("[data-review-slug]").forEach((target) => renderReview(target, products));
    setupFilters(products);
  }

  initData();

  const builder = document.querySelector("[data-review-builder]");
  if (builder) {
    const form = builder.querySelector("form");
    const output = builder.querySelector("[data-builder-output]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const product = String(data.get("product") || "").trim();
      const url = String(data.get("url") || "").trim();
      const bestFor = String(data.get("bestFor") || "").trim();
      const positives = String(data.get("positives") || "").trim();
      const negatives = String(data.get("negatives") || "").trim();
      const specs = String(data.get("specs") || "").trim();
      const alternatives = String(data.get("alternatives") || "").trim();

      output.hidden = false;
      output.innerHTML = `
        <h2>Research-based draft</h2>
        <p class="affiliate-note">Draft generated from notes you entered. Verify every claim before publishing. Do not label as hands-on unless you personally tested the product.</p>
        <h3>${escapeHtml(product || "Product name")}</h3>
        <p><strong>Review type:</strong> research-based</p>
        ${url ? `<p><strong>Product link:</strong> <a href="${escapeHtml(url)}" rel="nofollow sponsored noopener" target="_blank">${escapeHtml(url)}</a></p>` : ""}
        <p><strong>Best for:</strong> ${escapeHtml(bestFor || "Add the reader/use case this product fits best.")}</p>
        <p><strong>Quick take:</strong> ${escapeHtml(product || "This product")} looks worth considering if its specs and owner feedback match your setup, but the final recommendation should depend on verified compatibility, support, and common complaint patterns.</p>
        <h3>Pros to verify</h3>
        <p>${escapeHtml(positives || "Paste repeated positive owner-review themes here.")}</p>
        <h3>Cons to verify</h3>
        <p>${escapeHtml(negatives || "Paste repeated negative owner-review themes here.")}</p>
        <h3>Specs that matter</h3>
        <p>${escapeHtml(specs || "Add official specs, dimensions, compatibility, wattage, connection type, or warranty notes.")}</p>
        <h3>Alternatives</h3>
        <p>${escapeHtml(alternatives || "Add cheaper, better, or safer alternatives.")}</p>
        <h3>Final take</h3>
        <p>If the repeated owner feedback is consistent and the official specs fit your setup, ${escapeHtml(product || "this product")} may be a practical pick. Avoid it if the negative patterns affect your specific use case.</p>
      `;
      output.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();

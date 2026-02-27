function basePath() {
  // Works on both:
  // - https://keynee.com/...
  // - https://username.github.io/repo/...
  const parts = window.location.pathname.split("/").filter(Boolean);

  // If it's GitHub Pages project site, first segment is repo name.
  // If it's a custom domain root site, there may be 0 segments.
  // We detect repo mode by checking hostname ends with github.io.
  const isGithubIo = window.location.hostname.endsWith("github.io");

  if (!isGithubIo) return ""; // custom domain root

  // project pages: /<repo>/...
  return parts.length ? "/" + parts[0] : "";
}

async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return;

  el.innerHTML = await res.text();
}

function setActiveNav() {
  const page = document.body.getAttribute("data-page");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("data-nav") === page) a.setAttribute("aria-current", "page");
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

(async function init() {
  const base = basePath();

  await inject("#site-header", `${base}/partials/header.html`);
  await inject("#site-footer", `${base}/partials/footer.html`);

  setActiveNav();
  setYear();
})();

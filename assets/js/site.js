function basePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const isGithubIo = window.location.hostname.endsWith("github.io");
  if (!isGithubIo) return "";
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

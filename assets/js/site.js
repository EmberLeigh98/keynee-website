async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return;

  el.innerHTML = await res.text();
}

function setActiveNav() {
  const page = document.body.getAttribute("data-page");
  const links = document.querySelectorAll("[data-nav]");
  links.forEach((a) => {
    if (a.getAttribute("data-nav") === page) {
      a.setAttribute("aria-current", "page");
    }
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

(async function init() {
  await inject("#site-header", "/partials/header.html");
  await inject("#site-footer", "/partials/footer.html");
  setActiveNav();
  setYear();
})();

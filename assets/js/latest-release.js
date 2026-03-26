async function loadLatestRelease() {
  const container = document.getElementById("latest-release");
  if (!container) return;

  try {
    const res = await fetch("./assets/data/latest-release.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("Could not load latest release data.");

    const release = await res.json();

    container.innerHTML = `
      <div class="item">
        <div class="meta">
          <div class="title">${release.title}</div>
          <p class="desc">${release.description}</p>
        </div>
        <div class="right">
          ${release.type ? `<span class="badge">${release.type}</span>` : ""}
          ${release.spotify ? `<a class="btn" href="${release.spotify}" target="_blank" rel="noopener noreferrer">Spotify</a>` : ""}
          ${release.apple ? `<a class="btn" href="${release.apple}" target="_blank" rel="noopener noreferrer">Apple</a>` : ""}
          ${release.soundcloud ? `<a class="btn" href="${release.soundcloud}" target="_blank" rel="noopener noreferrer">SoundCloud</a>` : ""}
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="item">
        <div class="meta">
          <div class="title">Latest release</div>
          <p class="desc">Release information will appear here soon.</p>
        </div>
      </div>
    `;
  }
}

loadLatestRelease();

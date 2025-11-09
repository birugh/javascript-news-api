export class HeroView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(itemsHeadlines) {
    if (!this.container) return;

    if (!itemsHeadlines || itemsHeadlines.length === 0) {
      this.container.innerHTML = `
        <p>Tidak ada isi data</p>
      `;
      return;
    }

    this.container.innerHTML = `
      <section class="hero-grid">
        ${itemsHeadlines
          .map(
            (headline) => `
            <article class="hero-card">
              <img src="${headline.urlToImage || './assets/placeholder.jpg'}" 
                   alt="${headline.title}">
              <div class="hero-content">
                <h3>${headline.title}</h3>
                <p>${headline.description || ''}</p>
                <small>${headline.source} · ${headline.publishedAt}</small>
                <a href="${headline.url}" target="_blank">Read more →</a>
              </div>
            </article>
          `
          )
          .join('')}
      </section>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = `<p>Loading posts ...</p>`;
  }

  renderError(message) {
    if (!this.container) return;
    this.container.innerHTML = `<p>${message}</p>`;
  }
}

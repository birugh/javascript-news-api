// views/AbcNewsView.js
export class AbcNewsView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(itemsNews) {
    if (!this.container) return;

    if (!itemsNews || itemsNews.length === 0) {
      this.container.innerHTML = `
        <article class="grid-row">
          <div class="col-12">
            <p>Tidak ada berita dari ABC News.</p>
          </div>
        </article>
      `;
      return;
    }

    this.container.innerHTML = `
      <h2 class="abc__title">ABC-News</h2>
      <article class="grid-row">
        ${itemsNews.slice(0, 4).map(news => `
          <div class="col-3 col-lg-6 col-md-12">
            <div class="abc__article dp-flex dr-column">
              <img src="${news.urlToImage || 'https://placehold.co/240x320'}" alt="${news.title}" class="h-100">
              <h2><a href="${news.url}" target="_blank">${news.title}</a></h2>
              <p>${news.description || 'No description available'}</p>
              <ul class="info__list gray dp-flex dr-row content-start g-2">
                <li>${news.source.name || 'Unknown'}</li>
                <li class="seperator--vertical"></li>
                <li>${this.formatDate(news.publishedAt)}</li>
                <li class="seperator--vertical"></li>
                <li>${news.author || 'Unknown'}</li>
              </ul>
            </div>
          </div>
        `).join('')}
      </article>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = `
      <article class="grid-row">
        <div class="col-12">
          <p>Loading ABC News ...</p>
        </div>
      </article>
    `;
  }

  renderError(message) {
    if (!this.container) return;
    this.container.innerHTML = `
      <article class="grid-row">
        <div class="col-12">
          <p>${message}</p>
        </div>
      </article>
    `;
  }

  formatDate(dateString) {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  }
}

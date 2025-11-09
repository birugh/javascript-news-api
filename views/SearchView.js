// views/SearchView.js
export class SearchView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(articles, query, pagination = {}) {
    if (!this.container) return;

    if (!articles || articles.length === 0) {
      this.container.innerHTML = `
        <p>Tidak ada hasil untuk <strong>${query || "pencarian ini"}</strong>.</p>
      `;
      return;
    }

    const totalPages = pagination.totalResults ? Math.ceil(pagination.totalResults / pagination.pageSize) : 1;

    this.container.innerHTML = `
      ${articles
        .map(
          (news) => `
            <div class="col-3 col-md-6 col-lg-12 mb-4">
              <a href="${news.url}" class="article-card dp-flex dr-column h-full content-start bg-white p-3">
                <img src="${news.urlToImage || './assets/placeholder.jpg'}" alt="${news.title}" class="w-full article-img">
                <h2 class="mt-3 color-black">${news.title}</h2>
                <p class="color-calligraphy">${news.description || ''}</p>
                <ul class="info__list gray dp-flex dr-row content-start g-2 mt-2">
                  <li>${news.author || news.source.name || 'Unknown'}</li>
                </ul>
              </a>
            </div>
          `
        )
      .join("")}
      ${pagination.page ? `
        <div class="pagination dp-flex content-center items-center g-2 mt-4">
          <button id="prev-btn" class="btn btn--secondary" ${pagination.page === 1 ? 'disabled' : ''}>Prev</button>
          <span>Page ${pagination.page} of ${totalPages}</span>
          <button id="next-btn" class="btn btn--primary" ${pagination.page >= totalPages ? 'disabled' : ''}>Next</button>
        </div>
      ` : ''}
    `;
  }

  renderLoading(query) {
    if (!this.container) return;
    this.container.innerHTML = `<p>Loading hasil ${query ? `"${query}"` : "pencarian"} ...</p>`;
  }

  renderError(message) {
    if (!this.container) return;
    this.container.innerHTML = `<p>${message}</p>`;
  }
}

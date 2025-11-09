// views/CategoryNewsView.js
export class CategoryNewsView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(data) {
    if (!this.container) return;

    const { latest, technology, health, science } = data;

    this.container.innerHTML = `
      <div class="lastest__news">
        <h2>Lastest News</h2>
        ${this.renderLatestNews(latest)}
      </div>
      <div class="news__category--list">
        <div class="grid-row">
          ${this.renderCategoryColumn(technology, 'Technology News.')}
          ${this.renderCategoryColumn(health, 'Health News.')}
          ${this.renderCategoryColumn(science, 'Science News.')}
        </div>
      </div>
    `;
  }

  renderLatestNews(latest) {
    if (!latest || latest.length === 0) {
      return `
        <article class="grid-row">
          <div class="col-7 col-xl-12">
            <img class="w-full" src="https://placehold.co/900x600" alt="">
          </div>
          <div class="col-5 col-xl-12">
            <div class="dp-flex dr-column content-between h-full">
              <div class="lastest__content">
                <h3 class="mb-4">No latest news available</h3>
                <p class="mb-4">Please check back later for updates.</p>
              </div>
              <div class="dp-flex dr-row content-between">
                <ul class="info__list gray dp-flex dr-row content-start g-2">
                  <li>N/A</li>
                  <li class="seperator--vertical"></li>
                  <li>N/A</li>
                  <li class="seperator--vertical"></li>
                  <li>N/A</li>
                </ul>
                <a href="javascript:;" class="btn no-pd">Continue Reading</a>
              </div>
            </div>
          </div>
        </article>
      `;
    }

    const news = latest[0];
    return `
      <article class="grid-row">
        <div class="col-7 col-xl-12">
          <img class="w-full" src="${news.urlToImage || 'https://placehold.co/900x600'}" alt="${news.title}">
        </div>
        <div class="col-5 col-xl-12">
          <div class="dp-flex dr-column content-between h-full">
            <div class="lastest__content">
              <h3 class="mb-4"><a href="${news.url}" target="_blank">${news.title}</a></h3>
              <p class="mb-4">${news.description || 'No description available'}</p>
            </div>
            <div class="dp-flex dr-row content-between">
              <ul class="info__list gray dp-flex dr-row content-start g-2">
                <li>${news.source?.name || 'Unknown'}</li>
                <li class="seperator--vertical"></li>
                <li>${this.formatDate(news.publishedAt)}</li>
                <li class="seperator--vertical"></li>
                <li>${news.author || 'Unknown'}</li>
              </ul>
              <a href="${news.url}" target="_blank" class="btn no-pd">Continue Reading</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  renderCategoryColumn(items, categoryName) {
    if (!items || items.length === 0) {
      return `
        <div class="col-4 col-lg-6 col-md-12">
          <div class="news__category--selected">
            <span>${categoryName}</span>
            <img class="w-full" src="https://placehold.co/500x500" alt="">
            <h2>No articles available</h2>
          </div>
        </div>
      `;
    }

    const selected = items[0];
    const others = items.slice(1, 5);

    return `
      <div class="col-4 col-lg-6 col-md-12">
        <div class="news__category--selected">
          <span>${categoryName}</span>
          <img class="w-full" src="${selected.urlToImage || 'https://placehold.co/500x500'}" alt="${selected.title}">
          <h2><a href="${selected.url}" target="_blank">${selected.title}</a></h2>
        </div>
        <div class="news__category--others">
          ${others.map(news => `
            <div class="seperator--horizontal mbt-4"></div>
            <div class="news__category--item dp-flex items-center g-2">
              <img src="${news.urlToImage || 'https://placehold.co/180x120'}" alt="${news.title}">
              <h3><a href="${news.url}" target="_blank">${news.title}</a></h3>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="lastest__news">
        <h2>Lastest News</h2>
        <article class="grid-row">
          <div class="col-12">
            <p>Loading latest news...</p>
          </div>
        </article>
      </div>
      <div class="news__category--list">
        <div class="grid-row">
          <div class="col-12">
            <p>Loading category news...</p>
          </div>
        </div>
      </div>
    `;
  }

  renderError(message) {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="lastest__news">
        <h2>Lastest News</h2>
        <article class="grid-row">
          <div class="col-12">
            <p>${message}</p>
          </div>
        </article>
      </div>
      <div class="news__category--list">
        <div class="grid-row">
          <div class="col-12">
            <p>${message}</p>
          </div>
        </div>
      </div>
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

export class HeroView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(itemsHeadlines) {
    if (!this.container) return;

    if (!itemsHeadlines || itemsHeadlines.length === 0) {
      this.container.innerHTML = `
        <article class="grid-row">
          <div class="col-12">
            <p>Tidak ada isi data</p>
          </div>
        </article>
      `;
      return;
    }

    // main
    const mainArticle = itemsHeadlines[0];

    // sidebar
    const sidebarArticles = itemsHeadlines.slice(1, 5);

    // bottom
    const bottomArticles = itemsHeadlines.slice(5, 9);

    this.container.innerHTML = `
      <article class="grid-row">
        <div class="col-8 col-xl-12">
          <div class="hero__article--main">
            <div class="grid-row">
              <div class="col-6 col-lg-12">
                <div class="hero__wrapper dp-flex dr-column content-between h-full">
                  <div class="hero__main">
                    <h1 class="mb-4">${mainArticle.title}</h1>
                    <p>${mainArticle.description || 'No description available'}</p>
                  </div>
                  <ul class="info__list dp-flex dr-row content-start g-2">
                    <li>${mainArticle.source.name || 'Unknown'}</li>
                    <li class="seperator--vertical"></li>
                    <li>${this.formatDate(mainArticle.publishedAt)}</li>
                    <li class="seperator--vertical"></li>
                    <li>${mainArticle.author || 'Unknown'}</li>
                  </ul>
                </div>
              </div>
              <div class="col-6 col-lg-12">
                <img class="w-full" src="${mainArticle.urlToImage || 'https://placehold.co/500x850'}" alt="${mainArticle.title}">
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 col-xl-12">
          <div class="hero__article--list dp-flex dr-column g-2 content-between">
            ${sidebarArticles.map(article => `
              <div class="hero__article--items dp-flex g-2">
                <img src="${article.urlToImage || 'https://placehold.co/180x200'}" alt="${article.title}">
                <div class="dp-flex dr-column content-between pbt-2">
                  <ul class="info__list dp-flex dr-row content-start g-2">
                    <li>${article.source.name || 'Unknown'}</li>
                    <li class="seperator--vertical"></li>
                    <li>${this.formatDate(article.publishedAt)}</li>
                  </ul>
                  <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                  <span>${article.description ? article.description.substring(0, 100) + '...' : 'No description'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="col-12">
          <div class="seperator--horizontal"></div>
        </div>
        <div class="col-12">
          <div class="hero__article--others dp-flex dr-row g-4">
            ${bottomArticles.map(article => `
              <div class="hero__article--items dp-flex dr-column content-between">
                <ul class="info__list dp-flex dr-row content-start g-2">
                  <li>${article.source.name || 'Unknown'}</li>
                  <li class="seperator--vertical"></li>
                  <li>${this.formatDate(article.publishedAt)}</li>
                  <li class="seperator--vertical"></li>
                  <li>${article.author || 'Unknown'}</li>
                </ul>
                <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                <span>${article.description ? article.description.substring(0, 80) + '...' : 'No description'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </article>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = `
      <article class="grid-row">
        <div class="col-12">
          <p>Loading posts ...</p>
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

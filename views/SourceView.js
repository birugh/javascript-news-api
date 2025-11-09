// views/SourceView.js
export class SourceView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(sources) {
    if (!this.container) return;

    if (!sources || sources.length === 0) {
      this.container.innerHTML = `
        <div class="dp-flex">
          <h2>Our Sources</h2>
        </div>
        <div class="grid-row">
          <div class="col-12">
            <p>No sources available.</p>
          </div>
        </div>
      `;
      return;
    }

    const limitedSources = sources.slice(0, 9);
    const column1 = limitedSources.slice(0, 3);
    const column2 = limitedSources.slice(3, 6);
    const column3 = limitedSources.slice(6, 9);

    this.container.innerHTML = `
      <div class="dp-flex">
        <h2>Our Sources</h2>
      </div>
      <div class="grid-row">
        <div class="col-4 col-lg-12">
          <div class="sources-list dp-flex dr-column g-6">
            ${column1.map(src => `
              <div class="source__items">
                <h3>${src.name}</h3>
                <p>${src.description || "No description available."}</p>
              </div>
            `).join('')}
          </div>
          <div class="seperator--horizontal mbt-4 dp-lg-block dp-none"></div>
        </div>
        <div class="col-4 col-lg-12">
          <div class="sources-list dp-flex dr-column g-6">
            ${column2.map(src => `
              <div class="source__items">
                <h3>${src.name}</h3>
                <p>${src.description || "No description available."}</p>
              </div>
            `).join('')}
          </div>
          <div class="seperator--horizontal mbt-4 dp-lg-block dp-none"></div>
        </div>
        <div class="col-4 col-lg-12">
          <div class="sources-list dp-flex dr-column g-6">
            ${column3.map(src => `
              <div class="source__items">
                <h3>${src.name}</h3>
                <p>${src.description || "No description available."}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="dp-flex content-end mt-4">
        <a href="javascript:;" class="btn no-pd">See more</a>
      </div>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="dp-flex">
        <h2>Our Sources</h2>
      </div>
      <div class="grid-row">
        <div class="col-12">
          <p>Loading sources...</p>
        </div>
      </div>
    `;
  }

  renderError(message) {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="dp-flex">
        <h2>Our Sources</h2>
      </div>
      <div class="grid-row">
        <div class="col-12">
          <p>${message}</p>
        </div>
      </div>
    `;
  }
}

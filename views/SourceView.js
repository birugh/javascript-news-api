// views/SourceView.js
export class SourceView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.allSources = [];
    this.currentIndex = 0;
  }

  render(sources) {
    if (!this.container) return;

    this.allSources = sources || [];
    this.currentIndex = 0;

    if (!this.allSources || this.allSources.length === 0) {
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

    this.renderSources();
  }

  renderSources() {
    const endIndex = Math.min(this.currentIndex + 9, this.allSources.length);
    const sourcesToShow = this.allSources.slice(this.currentIndex, endIndex);
    const column1 = sourcesToShow.slice(0, 3);
    const column2 = sourcesToShow.slice(3, 6);
    const column3 = sourcesToShow.slice(6, 9);

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
      <div class="dp-flex content-between items-center mt-4">
        <button class="btn btn--secondary" id="prev-btn" ${this.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
        <span>Showing ${this.currentIndex + 1}-${endIndex} of ${this.allSources.length}</span>
        <button class="btn btn--primary" id="next-btn" ${endIndex >= this.allSources.length ? 'disabled' : ''}>Next</button>
      </div>
    `;

    const prevBtn = this.container.querySelector('#prev-btn');
    const nextBtn = this.container.querySelector('#next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentIndex = Math.max(0, this.currentIndex - 9);
        this.renderSources();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex += 9;
        this.renderSources();
      });
    }
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

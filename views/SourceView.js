export class SourceView {
    constructor(filterSelector, listSelector) {
        this.filterForm = document.querySelector(filterSelector);
        this.listContainer = document.querySelector(listSelector);
        this.loadingContainer = document.querySelector('#loading-sources');
    }

    bindFilter(handler) {
        if (this.filterForm) {
            this.filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const params = {};
                for (let [key, value] of formData.entries()) {
                    if (value.trim()) params[key] = value;
                }
                handler(params);
            });
        }
    }

    renderLoading() {
        if (this.loadingContainer) {
            this.loadingContainer.innerHTML = '<p>Loading sources...</p>';
            this.loadingContainer.style.display = 'block';
        }
        if (this.listContainer) this.listContainer.innerHTML = '';
    }

    renderError(message) {
        if (this.loadingContainer) this.loadingContainer.style.display = 'none';
        if (this.listContainer) {
            this.listContainer.innerHTML = `<p class="error">${message}</p>`;
        }
    }

    renderSources(sources) {
        if (this.loadingContainer) this.loadingContainer.style.display = 'none';

        if (!sources || sources.length === 0) {
            this.listContainer.innerHTML = '<p>Tidak ada sumber berita ditemukan.</p>';
            return;
        }

        this.listContainer.innerHTML = sources.map(source => `
            <div class="source-card">
                <h3><a href="${source.url}" target="_blank">${source.name}</a></h3>
                <p class="source-description">${source.getShortDescription()}</p>
                <p class="source-meta">
                    <span class="category">Category: ${source.category}</span> |
                    <span class="language">Language: ${source.language}</span> |
                    <span class="country">Country: ${source.country}</span>
                </p>
            </div>
        `).join('');
    }
}

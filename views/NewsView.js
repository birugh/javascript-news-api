export class NewsView {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.filterForm = document.querySelector('#news-filter');
        this.resultsContainer = document.querySelector('#news-results');
        this.paginationContainer = document.querySelector('#pagination');
        this.loadingContainer = document.querySelector('#loading');
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

    bindPagination(handler) {
        this.paginationHandler = handler;
    }

    renderLoading() {
        if (this.loadingContainer) {
            this.loadingContainer.innerHTML = '<p>Loading news...</p>';
            this.loadingContainer.style.display = 'block';
        }
        if (this.resultsContainer) this.resultsContainer.innerHTML = '';
        if (this.paginationContainer) this.paginationContainer.innerHTML = '';
    }

    renderError(message) {
        if (this.loadingContainer) this.loadingContainer.style.display = 'none';
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = `<p class="error">${message}</p>`;
        }
        if (this.paginationContainer) this.paginationContainer.innerHTML = '';
    }

    renderResults(articles, currentPage, totalResults, pageSize) {
        if (this.loadingContainer) this.loadingContainer.style.display = 'none';

        if (!articles || articles.length === 0) {
            this.resultsContainer.innerHTML = '<p>Tidak ada berita ditemukan.</p>';
            this.paginationContainer.innerHTML = '';
            return;
        }

        this.resultsContainer.innerHTML = articles.map(article => `
            <article class="news-card">
                ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="news-image">` : ''}
                <div class="news-content">
                    <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                    <p class="news-description">${article.truncateDescription()}</p>
                    <p class="news-meta">By ${article.author} on ${article.getFormattedDate()}</p>
                    <p class="news-source">Source: ${article.source.name || 'Unknown'}</p>
                    <a href="${article.url}" target="_blank" class="read-more">Baca Selengkapnya</a>
                </div>
            </article>
        `).join('');

        this.renderPagination(currentPage, totalResults, pageSize);
    }

    renderPagination(currentPage, totalResults, pageSize) {
        const totalPages = Math.ceil(totalResults / pageSize);
        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination">';
        if (currentPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="${currentPage - 1}">Previous</button>`;
        }

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${currentPage + 1}">Next</button>`;
        }

        paginationHTML += '</div>';
        this.paginationContainer.innerHTML = paginationHTML;

        this.paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                if (this.paginationHandler) this.paginationHandler(page);
            });
        });
    }
}

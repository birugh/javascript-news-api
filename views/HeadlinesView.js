export class PostView {
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

        this.container.innerHTML = itemsHeadlines.map(headline => `
            // TODO
        `).join('');
    }

    renderLoading() {
        this.container.innerHTML = `<p>Loading posts ...</p>`;
    }

    renderError(message) {
        this.container.innerHTML = `
            <p>${message}</p>
        `;
    }
}
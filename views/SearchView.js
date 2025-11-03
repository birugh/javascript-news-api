export class PostView {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render(itemsSearch) {
        if (!this.container) return;

        if (!itemsSearch || itemsSearch.length === 0) {
            this.container.innerHTML = `
                <p>Tidak ada isi data</p>
            `;
            return;
        }

        this.container.innerHTML = itemsSearch.map(news => `
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
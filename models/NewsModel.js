export class NewsModel {
    constructor(rawData) {
        this.source = rawData.source || {};
        this.author = rawData.author || 'Unknown';
        this.title = rawData.title || '(No Title)';
        this.description = rawData.description || '(No Description)';
        this.url = rawData.url || '#';
        this.urlToImage = rawData.urlToImage || '';
        this.publishedAt = rawData.publishedAt || '';
        this.content = rawData.content || '';
    }

    getFormattedDate() {
        if (!this.publishedAt) return 'Unknown Date';
        const date = new Date(this.publishedAt);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    truncateDescription(limit = 100) {
        if (!this.description) return '(No Description)';
        return this.description.length > limit ? this.description.slice(0, limit) + '...' : this.description;
    }

    getShortInfo() {
        return `${this.title} (${this.getFormattedDate()})`;
    }
}

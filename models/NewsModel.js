export class NewsModel {
    constructor(rawData) {
        this.source = rawData.source || {};
        this.author = this.truncateAtWord(rawData.author || 'Unknown', 15);
        this.title = this.truncateAtWord(rawData.title || '(No Title)', 50);
        this.description = this.truncateAtWord(rawData.description || '(No Description)', 120);
        this.url = rawData.url || '#';
        this.urlToImage = rawData.urlToImage || '';
        this.publishedAt = rawData.publishedAt
            ? new Date(rawData.publishedAt).toLocaleDateString()
            : "-";
        this.content = rawData.content || '';
    }

    truncateAtWord(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }

        const truncated = text.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        if (lastSpaceIndex > 0) {
            return truncated.substring(0, lastSpaceIndex) + '...';
        } else {
            return truncated + '...';
        }
    }
}

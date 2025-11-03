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
}
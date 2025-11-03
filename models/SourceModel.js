export class SourceModel {
    constructor(rawData) {
        this.id = rawData.id || '';
        this.name = rawData.name || 'Unknown';
        this.description = rawData.description || '(No Description)';
        this.url = rawData.url || '';
        this.category = rawData.category || '';
        this.language = rawData.language || '';
        this.country = rawData.country || '';
    }
}
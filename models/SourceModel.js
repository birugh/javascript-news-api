export class SourceModel {
    constructor(rawData) {
        this.id = rawData.id || '';
        this.name = rawData.name || 'Unknown';
        this.description = rawData.description || 'No description available';
        this.url = rawData.url || '#';
        this.category = rawData.category || 'general';
        this.language = rawData.language || 'en';
        this.country = rawData.country || 'us';
    }

    getShortDescription(limit = 120) {
        if (!this.description) return 'No description available';
        return this.description.length > limit ? this.description.slice(0, limit) + '...' : this.description;
    }
}

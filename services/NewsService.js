import { BaseService } from "./BaseService.js";

export class NewsService extends BaseService {
    constructor(apiKey) {
        super('https://newsapi.org/v2');
        this.apiKey = apiKey;
    }

    async getTopHeadlines(params = {}) {
        const queryParams = { ...params, apiKey: this.apiKey };
        return this.get('top-headlines', queryParams);
    }

    async getSources(params = {}) {
        const queryParams = { ...params, apiKey: this.apiKey };
        return this.get('sources', queryParams);
    }
}

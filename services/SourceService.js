import { BaseService } from "./BaseService.js";

export class SourceService extends BaseService {
    constructor(apiKey) {
        super('https://newsapi.org/v2');
        this.apiKey = apiKey;
    }

    async getSources(params = {}) {
        const queryParams = { ...params, apiKey: this.apiKey };
        return this.get('top-headlines/sources', queryParams);
    }
}

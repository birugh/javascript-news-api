import { BaseService } from "./BaseService.js";
import { CONFIG } from "../config/env.js";

export class EverythingService extends BaseService {
    constructor(apiKey = CONFIG.API_KEY) {
        super(CONFIG.BASE_URL)
        this.apiKey = apiKey;
    }

    async getEverything(queryParams = {}) {
        return this.get('everything', { headers: { 'Authorization': CONFIG.API_KEY }, params: queryParams });
    }

    async getTopHeadlines(queryParams = {}) {
        return this.get('top-headlines', { headers: { 'Authorization': CONFIG.API_KEY }, params: queryParams });
    }

    async getSources(queryParams = {}) {
        return this.get('top-headlines/sources', { headers: { 'Authorization': CONFIG.API_KEY }, params: queryParams });
    }
}
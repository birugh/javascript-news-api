import { EverythingService } from "../services/EverythingService.js";

const everything = new EverythingService

const response = await everything.getEverything({
    q: 'technology',
    language: 'en',
    sortBy: 'publishedAt',
});

console.log(response);

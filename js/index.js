import { NewsController } from "../controllers/NewsController.js";
import { SourceController } from "../controllers/SourceController.js";

const apiKey = 'eeee4d4832264f5399d21870bb0b9a85';

const newsController = new NewsController("#news-results", apiKey);
const sourceController = new SourceController('#source-filter', '#source-list', apiKey);

newsController.loadHeadlines();

sourceController.loadSources();

document.querySelector('#news-filter').addEventListener('submit', () => {
    const newApiKey = document.querySelector('#apiKey').value;
    if (newApiKey && newApiKey !== newsController.apiKey) {
        newsController = new NewsController("#news-results", newApiKey);
        sourceController = new SourceController('#source-filter', '#source-list', newApiKey);
    }
});

import { NewsService } from "../services/NewsService.js";
import { NewsModel } from "../models/NewsModel.js";
import { NewsView } from "../views/NewsView.js";

export class NewsController {
    constructor(containerSelector, apiKey) {
        this.view = new NewsView(containerSelector);
        this.service = new NewsService(apiKey);
        this.state = {
            articles: [],
            loading: false,
            error: null,
            currentPage: 1,
            totalResults: 0,
            pageSize: 5,
            lastParams: {}
        };
        this.view.bindFilter(this.handleFilterChange.bind(this));
        this.view.bindPagination(this.handlePagination.bind(this));
        this.apiKey = apiKey;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    async loadHeadlines() {
        const defaultParams = { country: 'us', category: 'business', pageSize: 5, page: 1 };
        await this.loadResults(defaultParams);
    }

    async handleFilterChange(params) {
        this.state.lastParams = params;
        this.state.currentPage = 1;
        await this.loadResults({ ...params, page: 1 });
    }

    async handlePagination(page) {
        this.state.currentPage = page;
        await this.loadResults({ ...this.state.lastParams, page });
    }

    async loadResults(params) {
        this.setState({ loading: true, error: null });
        try {
            const data = await this.service.getTopHeadlines(params);
            if (data?.error) throw new Error(data.message);

            const articles = data.articles.map(article => new NewsModel(article));
            this.setState({
                articles,
                loading: false,
                totalResults: data.totalResults || 0,
                pageSize: params.pageSize || 5
            });
        } catch (err) {
            this.setState({ error: err.message, loading: false });
        }
    }

    render() {
        const { loading, error, articles, currentPage, totalResults, pageSize } = this.state;

        if (loading) {
            this.view.renderLoading();
            return;
        }

        if (error) {
            this.view.renderError(error);
            return;
        }

        this.view.renderResults(articles, currentPage, totalResults, pageSize);
    }
}

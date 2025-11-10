// controllers/CategoryNewsController.js
import { requireAuth } from "../helpers/AuthGuard.js";
import { NewsService } from "../services/NewsService.js";
import { NewsModel } from "../models/NewsModel.js";
import { CategoryNewsView } from "../views/CategoryNewsView.js";

export class CategoryNewsController {
  constructor(containerSelector) {
    this.view = new CategoryNewsView(containerSelector);
    this.service = new NewsService();
    this.state = {
      loading: false,
      error: null,
      categories: {
        latest: [],
        technology: [],
        health: [],
        science: [],
      },
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async init() {
    requireAuth();
    this.setState({ loading: true, error: null });

    try {
      const now = new Date();

      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const formatDate = (date) => date.toISOString().slice(0, 19);

      const latestParams = {
        sources: "abc-news",
        from: formatDate(now),
        to: formatDate(lastMonth),
        pageSize: 1,
      };

      // lastest
      const latestData = await this.service.getEverything(latestParams);

      // tech
      const techParams = { category: "technology", pageSize: 5 };
      const techData = await this.service.getTopHeadlines(techParams);

      // health
      const healthParams = { category: "health", pageSize: 5 };
      const healthData = await this.service.getTopHeadlines(healthParams);

      // science
      const scienceParams = { category: "science", pageSize: 6 };
      const scienceData = await this.service.getTopHeadlines(scienceParams);

      const categories = {
        latest: (latestData?.articles || []).map(a => new NewsModel(a)),
        technology: (techData?.articles || []).map(a => new NewsModel(a)),
        health: (healthData?.articles || []).map(a => new NewsModel(a)),
        science: (scienceData?.articles || []).map(a => new NewsModel(a)),
      };

      this.setState({ categories, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, categories } = this.state;

    if (loading) return this.view.renderLoading();
    if (error) return this.view.renderError(error);
    this.view.render({
      latest: categories.latest,
      technology: categories.technology,
      health: categories.health,
      science: categories.science
    });
  }
}

// controllers/AbcNewsController.js
import { NewsService } from "../services/NewsService.js";
import { NewsModel } from "../models/NewsModel.js";
import { AbcNewsView } from "../views/AbcNewsView.js";

export class AbcNewsController {
  constructor(containerSelector) {
    this.view = new AbcNewsView(containerSelector);
    this.service = new NewsService();
    this.state = {
      loading: false,
      error: null,
      articles: [],
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async init() {
    this.setState({ loading: true, error: null });
    try {
      const params = {
        sources: "abc-news",
        language: "en",
        pageSize: 4,
      };

      const data = await this.service.getEverything(params);
      if (data?.error) throw new Error(data.message);

      const articles = data.articles.map(a => new NewsModel(a));
      this.setState({ articles, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, articles } = this.state;

    if (loading) return this.view.renderLoading();
    if (error) return this.view.renderError(error);
    this.view.render(articles);
  }
}

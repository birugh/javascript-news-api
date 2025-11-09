// controllers/HeroController.js
import { NewsService } from "../services/NewsService.js";
import { NewsModel } from "../models/NewsModel.js";
import { HeroView } from "../views/HeroView.js";

export class HeroController {
  constructor(containerSelector) {
    this.view = new HeroView(containerSelector);
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
        country: "us",
        pageSize: 9,
        page: 1,
      };
      const data = await this.service.getTopHeadlines(params);
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

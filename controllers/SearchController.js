import { NewsService } from "../services/NewsService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { SearchView } from "../views/SearchView.js";

export class SearchController {
  constructor(containerSelector) {
    this.view = new SearchView(containerSelector);
    this.service = new NewsService();
    this.state = {
      loading: false,
      error: null
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async init(params) {
    this.setState({ loading: true, error: null });
    try {
      const data = await this.service.getEverything(params);
      if (data?.error) throw new Error(data.message);

      const article = data.map(a => new ArticleModel(a));
      this.setState({ article, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, article } = this.state;

    if (loading) {
      this.view.renderLoading();
      return;
    }

    if (error) {
      this.view.renderError(error);
      return;
    }

    this.view.render(article);
  }
}

import { NewsService } from "../services/NewsService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { SourceView } from "../views/SourceView.js";

export class SearchController {
  constructor(containerSelector) {
    this.view = new SourceView(containerSelector);
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
      const data = await this.service.getSources(params);
      if (data?.error) throw new Error(data.message);

      const sources = data.map(s => new SourceModel(s));
      this.setState({ sources, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, sources } = this.state;

    if (loading) {
      this.view.renderLoading();
      return;
    }

    if (error) {
      this.view.renderError(error);
      return;
    }

    this.view.render(sources);
  }
}

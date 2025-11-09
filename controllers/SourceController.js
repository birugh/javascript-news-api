// controllers/SourceController.js
import { NewsService } from "../services/NewsService.js";
import { SourceModel } from "../models/SourceModel.js";
import { SourceView } from "../views/SourceView.js";

export class SourceController {
  constructor(containerSelector) {
    this.view = new SourceView(containerSelector);
    this.service = new NewsService();
    this.state = {
      loading: false,
      error: null,
      sources: [],
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async init() {
    this.setState({ loading: true, error: null });
    try {
      const data = await this.service.getSources();
      if (data?.error) throw new Error(data.message);

      const sources = (data.sources || []).map((src) => new SourceModel(src));
      this.setState({ sources, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, sources } = this.state;

    if (loading) return this.view.renderLoading();
    if (error) return this.view.renderError(error);
    this.view.render(sources);
  }
}

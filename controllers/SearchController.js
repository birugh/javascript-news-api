  // controllers/SearchController.js
  import { NewsService } from "../services/NewsService.js";
  import { NewsModel } from "../models/NewsModel.js";
  import { SearchView } from "../views/SearchView.js";

  export class SearchController {
    constructor(containerSelector, formSelector) {
      this.view = new SearchView(containerSelector);
      this.service = new NewsService();
      this.state = {
        loading: false,
        error: null,
        articles: [],
        query: "",
      };
      this.form = document.querySelector(formSelector);
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

    async init() {
      this.handleSearchSubmit(); // set up event listener
      await this.fetchSearchResults(); // load default content on page load
    }

    handleSearchSubmit() {
      if (!this.form) return;
      this.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(this.form);
        const query = formData.get("q")?.trim() || "";
        this.fetchSearchResults(query);
      });
    }

    async fetchSearchResults(query = "") {
      this.setState({ loading: true, error: null, query });

      try {
        const params = {
          sources: "abc-news",
          language: "en",
          pageSize: 8,
          page: 1,
        };
        console.log('tes');
        
        if (query) params.q = query;

        const data = await this.service.getEverything(params);
        if (data?.error) throw new Error(data.message);

        const articles = (data.articles || []).map((a) => new NewsModel(a));
        this.setState({ articles, loading: false });
      } catch (err) {
        this.setState({ error: err.message, loading: false });
      }
    }

    render() {
      const { loading, error, articles, query } = this.state;

      if (loading) return this.view.renderLoading(query);
      if (error) return this.view.renderError(error);
      this.view.render(articles, query);
    }
  }

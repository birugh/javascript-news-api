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
        page: 1,
        totalResults: 0,
      };
      this.form = document.querySelector(formSelector);
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

    async init() {
      this.handleSearchSubmit(); // set up event listener
      await this.fetchSearchResults("", 1); // load default content on page load
    }

    handleSearchSubmit() {
      if (!this.form) return;
      this.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(this.form);
        const query = formData.get("q")?.trim() || "";
        this.setState({ page: 1 });
        this.fetchSearchResults(query, 1);
      });
    }

    async fetchSearchResults(query = "", page = 1) {
      this.setState({ loading: true, error: null, query, page });

      try {
        const params = {
          sources: "abc-news",
          language: "en",
          pageSize: 8,
          page,
        };
        console.log('tes');

        if (query) params.q = query;

        const data = await this.service.getEverything(params);
        if (data?.error) throw new Error(data.message);

        const articles = (data.articles || []).map((a) => new NewsModel(a));
        this.setState({ articles, totalResults: data.totalResults || 0, loading: false });
      } catch (err) {
        this.setState({ error: err.message, loading: false });
      }
    }

    handlePagination(direction) {
      const { page, totalResults } = this.state;
      const pageSize = 8;
      let newPage = page;

      if (direction === 'prev' && page > 1) {
        newPage = page - 1;
      } else if (direction === 'next' && page * pageSize < totalResults) {
        newPage = page + 1;
      }

      if (newPage !== page) {
        this.setState({ page: newPage });
        this.fetchSearchResults(this.state.query, newPage);
      }
    }

    render() {
      const { loading, error, articles, query, page, totalResults } = this.state;

      if (loading) return this.view.renderLoading(query);
      if (error) return this.view.renderError(error);
      this.view.render(articles, query, { page, totalResults, pageSize: 8 });
    }
  }

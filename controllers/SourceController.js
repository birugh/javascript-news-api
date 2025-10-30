import { SourceService } from "../services/SourceService.js";
import { SourceModel } from "../models/SourceModel.js";
import { SourceView } from "../views/SourceView.js";

export class SourceController {
    constructor(filterSelector, listSelector, apiKey) {
        this.view = new SourceView(filterSelector, listSelector);
        this.service = new SourceService(apiKey);
        this.state = {
            sources: [],
            loading: false,
            error: null,
            lastParams: {}
        };
        this.view.bindFilter(this.handleFilter.bind(this));
        this.apiKey = apiKey;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    async loadSources(params = {}) {
        this.setState({ loading: true, error: null });
        try {
            const data = await this.service.getSources(params);
            if (data?.error) throw new Error(data.message);

            const sources = data.sources.map(source => new SourceModel(source));
            this.setState({
                sources,
                loading: false
            });
        } catch (err) {
            this.setState({ error: err.message, loading: false });
        }
    }

    async handleFilter(params) {
        this.state.lastParams = params;
        await this.loadSources(params);
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

        this.view.renderSources(sources);
    }
}

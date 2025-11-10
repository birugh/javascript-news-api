import { AuthService } from "../services/AuthService.js";
import { UserModel } from "../models/UserModel.js";
import { LoginView } from "../views/LoginView.js";

export class LoginController {
  constructor(formSelector, containerSelector) {
    this.view = new LoginView(containerSelector);
    this.service = new AuthService();
    this.state = {
      loading: false,
      error: null,
      user: null,
    };
    this.form = document.querySelector(formSelector);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => this.handleLogin(e));
  }

  async handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const username = formData.get("username");
    const password = formData.get("password");
    
    const expiresInMins = 1;

    if (!username || !password) {
      this.setState({ error: "Harap isi username dan password." });
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const data = await this.service.login({ username, password });

      if (data?.error) throw new Error(data.message);

      const user = new UserModel(data);
      this.setState({ user, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { loading, error, user } = this.state;

    if (loading) return this.view.renderLoading();
    if (error) return this.view.renderError(error);
    if (user) return this.view.renderSuccess(user);

    this.view.renderDefault();
  }
}

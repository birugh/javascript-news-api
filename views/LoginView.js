export class LoginView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  renderDefault() {
    if (!this.container) return;
    this.container.innerHTML = '';
  }

  renderLoading() {
    if (!this.container) return;
    this.container.innerHTML = '<p>Loading...</p>';
  }

  renderError(error) {
    if (!this.container) return;
    this.container.innerHTML = `<p class="text-red">${error}</p>`;
  }

  renderSuccess(user) {
    if (!this.container) return;
    this.container.innerHTML = `<p class="text-green">Login successful! Welcome, ${user.firstName} ${user.lastName}.</p>`;
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

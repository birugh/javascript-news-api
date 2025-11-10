import { LoginController } from "../controllers/LoginController.js";

document.addEventListener("DOMContentLoaded", () => {
  const login = new LoginController("#login-form", "#login-result");
  login.init();
});

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  toggle.classList.toggle("fa-eye");
  toggle.classList.toggle("fa-eye-slash");
});

const container = document.getElementById("login-result");
const username = document.getElementById("username");

username.addEventListener("click", () => {
  container.innerHTML = '';
})

password.addEventListener("click", () => {
  container.innerHTML = '';
})
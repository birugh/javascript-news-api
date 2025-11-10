import { AuthService } from "../services/AuthService.js";

const auth = new AuthService();

export function requireAuth() {
  if (!auth.isLoggedIn()) {
    alert("Sesi login kamu sudah berakhir. Silakan login kembali.");
    auth.logout();
    window.location.href = "login.html";
    throw new Error("Token expired");
  }
}

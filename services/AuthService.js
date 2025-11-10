import { BaseService } from "./BaseService.js";

export class AuthService extends BaseService {
    constructor() {
        super("https://dummyjson.com");
    }

    async login(bodyData) {
        try {
            const res = await fetch(`${this.baseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (data.message && !data.accessToken) {
                return { error: true, message: data.message };
            }

            const now = Date.now();
            const expireAt = now + bodyData.expiresInMins * 60 * 1000;

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("expireAt", expireAt);
            localStorage.setItem("user", JSON.stringify(data));

            return data;
        } catch (error) {
            console.error("Login error:", error.message);
            return { error: true, message: error.message };
        }
    }

    logout() {
        localStorage.clear();
    }

    getToken() {
        return localStorage.getItem("accessToken");
    }

    isLoggedIn() {
        const token = this.getToken();
        const expireAt = localStorage.getItem("expireAt");
        
        if (!token || !expireAt) return false;
        return Date.now() < Number(expireAt);
    }
}

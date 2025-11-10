import { SearchController } from "../controllers/SearchController.js";
import { AuthService } from "../services/AuthService.js";

document.addEventListener('DOMContentLoaded', () => {
    const auth = new AuthService();

    if (auth.isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem("user"));
        document.getElementById("user-name").textContent = user.firstName;
        document.getElementById("user-name-mobile").textContent = user.firstName;
        document.querySelectorAll(".cta__guest").forEach(el => el.classList.add("dp-none"));
        document.querySelectorAll(".cta__user").forEach(el => el.classList.remove("dp-none"));
    }

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-toggle');
    const searchSidebar = document.getElementById('search-sidebar');

    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchSidebar.classList.toggle('active');
    });

    sidebarClose.addEventListener('click', () => {
        searchSidebar.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        const isClickInside = searchSidebar.contains(e.target) || sidebarToggle.contains(e.target);
        if (!isClickInside) {
            searchSidebar.classList.remove('active');
        }
    });


    const search = new SearchController("#search-results", "#search-form");
    // search.init();

    document.addEventListener('click', (e) => {
        if (e.target.id === 'prev-btn') {
            search.handlePagination('prev');
        } else if (e.target.id === 'next-btn') {
            search.handlePagination('next');
        }
    });

    const ctaUser = document.getElementById("cta-user");
    const userMenu = document.getElementById("user-menu");

    if (ctaUser && userMenu) {
        ctaUser.addEventListener("click", () => {
            userMenu.classList.toggle("dp-none");
        });

        document.getElementById("logout-btn").addEventListener("click", () => {
            auth.logout();
            window.location.href = "login.html";
        });

        document.addEventListener("click", (e) => {
            if (!ctaUser.contains(e.target)) {
                userMenu.classList.add("dp-none");
            }
        });
    }

    const ctaUserMobile = document.getElementById("cta-user-mobile");
    const userMenuMobile = document.getElementById("user-menu-mobile");

    if (ctaUserMobile && userMenuMobile) {
        ctaUserMobile.addEventListener("click", () => {
            userMenuMobile.classList.toggle("dp-none");
        });

        document.getElementById("logout-btn-mobile").addEventListener("click", () => {
            auth.logout();
            window.location.href = "login.html";
        });

        document.addEventListener("click", (e) => {
            if (!ctaUserMobile.contains(e.target)) {
                userMenuMobile.classList.add("dp-none");
            }
        });
    }
});

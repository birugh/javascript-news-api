import { HeroController } from "../controllers/HeroController.js";
import { AbcNewsController } from "../controllers/AbcNewsController.js";
import { CategoryNewsController } from "../controllers/CategoryNewsController.js";
import { SourceController } from "../controllers/SourceController.js";

document.addEventListener("DOMContentLoaded", () => {
    // const hero = new HeroController("#hero-content");
    // hero.init();

    // const abcNews = new AbcNewsController("#abc-news-content");
    // abcNews.init();

    // const categories = new CategoryNewsController("#category-news-content");
    // categories.init();

    // const sources = new SourceController("#news-source-content");
    // sources.init();
});


const menu = document.getElementById('menu-navbar');

window.addEventListener('scroll', function () {

    const navbar = document.getElementById('navbar');
    const profile = document.getElementById('icon-profile');
    const target = document.getElementById('abc-news');
    const scrollPoint = target.offsetTop - 200;

    if (window.scrollY > scrollPoint) {
        navbar.classList.add('scrolled');

        profile.classList.add('color-black');
        profile.classList.remove('color-white');

        menu.classList.remove('bg-black');
        menu.classList.add('bg-white');
    } else {
        navbar.classList.remove('scrolled');

        profile.classList.remove('bg-black');
        profile.classList.add('bg-white');

        menu.classList.add('bg-black');
        menu.classList.remove('bg-white');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-nav');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    })
})  

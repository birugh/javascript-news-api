// import { EverythingService } from "../services/EverythingService.js";

// const everything = new EverythingService

// const response = await everything.getEverything({
//     q: 'technology',
//     language: 'en',
//     sortBy: 'publishedAt',
// });

// console.log(response);
const menu = document.getElementById('menu-navbar');

window.addEventListener('scroll', function () {

    const navbar = document.getElementById('navbar');
    const profile = document.getElementById('icon-profile');
    const scrollPoint = 1500;

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

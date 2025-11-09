document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-toggle');
    const searchSidebar = document.getElementById('search-sidebar');

    sidebarToggle.addEventListener('click', () => {
        searchSidebar.classList.toggle('active');
    });

    sidebarClose.addEventListener('click', () => {
        searchSidebar.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
            
    /* --- 1. THEME TOGGLE LOGIC (DARK/LIGHT MODE) --- */
    const themeBtn = document.getElementById('themeToggleBtn');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        let isLight = root.getAttribute('data-theme') === 'light';
        
        themeBtn.style.transform = 'scale(0.85)';
        setTimeout(() => themeBtn.style.transform = 'scale(1)', 150);

        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });

    /* --- 2. SIDEBAR LOGIC --- */
    const menuBtn = document.getElementById('menuOpenBtn');
    const closeBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeSidebar = function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    /* --- 3. SCROLL ANIMATION (INTERSECTION OBSERVER) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* --- 4. SPA NAVIGATION ROUTER --- */
    window.navigateTo = function(viewId) {
        const views = document.querySelectorAll('.view');
        views.forEach(v => {
            v.classList.remove('active');
        });

        const targetView = document.getElementById(viewId);
        if (targetView) {
            void targetView.offsetWidth; 
            targetView.classList.add('active');
        }

        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        
        let activeId = 'nav-home';
        if(viewId === 'view-about') activeId = 'nav-about';
        if(viewId === 'view-projects') activeId = 'nav-projects';
        
        const activeNavBtn = document.getElementById(activeId);
        if(activeNavBtn) activeNavBtn.classList.add('active');

        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const menuBars = navbarToggle.querySelectorAll('span:not(.sr-only)');
    
    function toggleMenu() {
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Simple toggle for menu visibility
        navbarMenu.classList.toggle('hidden');

        // Simple hamburger animation
        if (!isExpanded) {
            menuBars[0].style.transform = 'rotate(45deg)';
            menuBars[0].style.top = '50%';
            menuBars[1].style.opacity = '0';
            menuBars[2].style.transform = 'rotate(-45deg)';
            menuBars[2].style.bottom = '45%';
        } else {
            menuBars[0].style.transform = '';
            menuBars[0].style.top = '0';
            menuBars[1].style.opacity = '1';
            menuBars[2].style.transform = '';
            menuBars[2].style.bottom = '0';
        }
    }

    // Event Listeners
    navbarToggle.addEventListener('click', toggleMenu);

    // Close menu on desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navbarMenu.classList.add('hidden');
            navbarToggle.setAttribute('aria-expanded', 'false');
            // Reset hamburger
            menuBars[0].style.transform = '';
            menuBars[0].style.top = '0';
            menuBars[1].style.opacity = '1';
            menuBars[2].style.transform = '';
            menuBars[2].style.bottom = '0';
        }
    });

    // Click handlers
    document.addEventListener('click', (e) => {
        const isOpen = !navbarMenu.classList.contains('hidden');
        const isClickInside = navbarMenu.contains(e.target) || navbarToggle.contains(e.target);
        
        if (isOpen && !isClickInside) {
            toggleMenu();
        }
    });

    // Handle menu link clicks on mobile
    navbarMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

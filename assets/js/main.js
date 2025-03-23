document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    function toggleMobileMenu() {
        const isMenuOpen = mobileMenu.classList.contains('flex');
        
        if (isMenuOpen) {
            mobileMenu.classList.replace('flex', 'hidden');
            document.body.classList.remove('overflow-hidden');
        } else {
            mobileMenu.classList.replace('hidden', 'flex');
            document.body.classList.add('overflow-hidden');
        }
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
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

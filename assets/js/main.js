document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add visible class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once animation is done, stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add stagger animation to hero badges
    document.querySelectorAll('.hero-badges .badge').forEach((badge, index) => {
        badge.style.transitionDelay = `${(index + 1) * 0.2}s`;
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll('.hero-shapes .shape');
    
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            shapes.forEach(shape => {
                const speed = shape.classList.contains('shape-1') ? 20 : 10;
                shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
    });

    // Profile image animation
    const profileImage = document.querySelector('.profile-placeholder');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const bounds = profileImage.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const angleX = (mouseY - centerY) / 20;
            const angleY = (centerX - mouseX) / 20;
            
            profileImage.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });

        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const angleX = (mouseY - centerY) / 30;
            const angleY = (centerX - mouseX) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

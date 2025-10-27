// Animation functionality
function initAnimations() {
    initScrollAnimations();
    initStatsCounting();
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initStatsCounting() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                const isPercentage = element.textContent.includes('%');
                
                animateCount(element, 0, target, 2000, isPercentage);
                statsObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCount(element, start, end, duration, isPercentage) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.textContent = value + (isPercentage ? '%' : '+');
        element.classList.add('counting');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
});
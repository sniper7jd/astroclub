// Modal Functionality with improved features
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal-open');
        
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }, 300);
    }
}

// Close modal on ESC key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="flex"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
});

// Carousel Functionality - Improved with DOM ready check
let scrollPosition = 0;
let carousel, items, itemWidth, totalItems, carouselWidth;

function initCarousel() {
    carousel = document.querySelector('.past-events .carousel');
    if (!carousel) return;
    
    items = document.querySelectorAll('.past-events .carousel-item');
    if (items.length === 0) return;
    
    // Calculate dimensions after DOM is ready
    const firstItem = items[0];
    const computedStyle = window.getComputedStyle(carousel);
    const gap = parseInt(computedStyle.gap) || 20;
    itemWidth = firstItem.offsetWidth + gap;
    totalItems = items.length;
    carouselWidth = carousel.parentElement.offsetWidth;
}

function scrollCarousel(direction) {
    if (!carousel || !items || items.length === 0) {
        initCarousel();
        if (!carousel || !items || items.length === 0) return;
    }
    
    // Recalculate dimensions in case of window resize
    const computedStyle = window.getComputedStyle(carousel);
    const gap = parseInt(computedStyle.gap) || 20;
    itemWidth = items[0].offsetWidth + gap;
    carouselWidth = carousel.parentElement.offsetWidth;
    
    // Calculate the total scrollable width
    const totalWidth = (totalItems * itemWidth);
    const maxScrollPosition = -(totalWidth - carouselWidth);

    if (direction === 'next') {
        // Move to next item
        const newPosition = scrollPosition - itemWidth;
        if (newPosition >= maxScrollPosition) {
            scrollPosition = newPosition;
            carousel.style.transform = `translateX(${scrollPosition}px)`;
        } else {
            scrollPosition = maxScrollPosition;
            carousel.style.transform = `translateX(${scrollPosition}px)`;
        }
    } else if (direction === 'prev') {
        // Move to previous item
        const newPosition = scrollPosition + itemWidth;
        if (newPosition <= 0) {
            scrollPosition = newPosition;
            carousel.style.transform = `translateX(${scrollPosition}px)`;
        } else {
            scrollPosition = 0;
            carousel.style.transform = `translateX(${scrollPosition}px)`;
        }
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    
    // Recalculate on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initCarousel();
            scrollPosition = 0;
            if (carousel) {
                carousel.style.transform = `translateX(0px)`;
            }
        }, 250);
    });
});


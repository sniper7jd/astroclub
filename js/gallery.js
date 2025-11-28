// Gallery Carousel - Improved with DOM ready check and auto-play
let currentIndex = 0;
let carouselItems = [];
let autoPlayInterval = null;

// Function to change the active carousel item
function changeCarousel(index) {
    if (carouselItems.length === 0) return;
    
    // Ensure index is within bounds
    if (index < 0) index = carouselItems.length - 1;
    if (index >= carouselItems.length) index = 0;
    
    // Remove active class from all carousel items
    carouselItems.forEach(item => item.classList.remove('active'));

    // Add active class to the item at the current index with smooth transition
    carouselItems[index].classList.add('active');
    currentIndex = index;
}

// Function to move to the next carousel item
function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    changeCarousel(currentIndex);
    resetAutoPlay();
}

// Function to move to the previous carousel item
function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    changeCarousel(currentIndex);
    resetAutoPlay();
}

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.carousel-container .carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-container .carousel-btn.next');
    carouselItems = document.querySelectorAll('.carousel-container .carousel-item');
    
    if (carouselItems.length === 0) return;
    
    // Add event listeners for the next and previous buttons
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    // Initialize the carousel by showing the first image
    changeCarousel(currentIndex);
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover, resume on leave
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});

// Image Modal Functionality
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (modal && modalImage) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('image-modal-open');
        }, 10);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('image-modal-open');
        
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

// Close image modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const imageModal = document.getElementById('imageModal');
        if (imageModal && imageModal.style.display === 'flex') {
            closeImageModal();
        }
    }
});

// Make grid items keyboard accessible
document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View full size image');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                if (img) {
                    openImageModal(img.src, img.alt);
                }
            }
        });
    });
});

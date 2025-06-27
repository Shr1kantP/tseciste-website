// ===== GALLERY PAGE FUNCTIONALITY =====

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('visible'), 10);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Popup image on hover (for gallery-item)
document.querySelectorAll('.gallery-item').forEach(item => {
    const popup = item.querySelector('.gallery-popup');
    if (popup) {
        item.addEventListener('mouseenter', () => {
            popup.style.display = 'block';
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        });
        item.addEventListener('mouseleave', () => {
            popup.style.display = 'none';
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        });
    }
});

// Video modal functionality
const videoModal = document.getElementById('video-modal');
const videoIframe = document.getElementById('video-iframe');
const videoModalClose = document.querySelector('.video-modal-close');
const videoItems = document.querySelectorAll('.video-item');

videoItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoUrl = item.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        videoIframe.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

videoModalClose.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModalClose.click();
    }
}); 
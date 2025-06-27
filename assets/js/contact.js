// ===== CONTACT PAGE FUNCTIONALITY =====

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        contactForm.reset();
    });
}

function closeModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

const modalClose = document.querySelector('.modal-close');
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
} 
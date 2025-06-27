// ===== TEAM PAGE FUNCTIONALITY =====

// Team tabs functionality
const teamTabBtns = document.querySelectorAll('.team-tabs .tab-btn');
const teamSections = document.querySelectorAll('.team-section');

teamTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        teamTabBtns.forEach(b => b.classList.remove('active'));
        teamSections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
}); 
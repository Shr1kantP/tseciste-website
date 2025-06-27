function toggleOtherField() {
    const fieldEducation = document.getElementById('field-education');
    const otherField = document.getElementById('other-field');
    const otherInput = document.getElementById('field-education-other');
    if (fieldEducation.value === 'Other') {
        otherField.classList.remove('hidden');
        otherInput.required = true;
        otherInput.style.display = '';
    } else {
        otherField.classList.add('hidden');
        otherInput.required = false;
        otherInput.style.display = 'none';
    }
}

document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // Debug: Log to confirm progress bar is being shown
    console.log('Showing progress bar');

    // Progress UI kickoff
    submitBtn.disabled = true;
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Uploading...';

    // Add extra fields manually
    const day1Event = document.querySelector('input[name="day_1_event"]:checked')?.value || '';
    formData.set('day_1_event', day1Event);

    const day2Event = document.querySelector('input[name="day_2_event"]:checked')?.value || '';
    formData.set('day_2_event', day2Event);

    // Simulated progress (visual only)
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 90);
        progressFill.style.width = `${progress}%`;
    }, 300);

    // Submit the FormData (keep as multipart/form-data!)
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
        .then(res => res.text()) // If using Google Apps Script, use `.text()`
        .then(responseText => {
            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload Complete!';

            // Optional: log server response
            console.log('Server Response:', responseText);

            setTimeout(() => {
                progressContainer.style.display = 'none';
                progressFill.style.width = '0%'; // Reset for next submit
                progressText.textContent = 'Uploading...'; // Reset for next submit
                submitBtn.disabled = false;
                alert('Registration submitted successfully!');
                form.reset();
                toggleOtherField();
            }, 600);
        })
        .catch(error => {
            clearInterval(progressInterval);
            progressFill.style.width = '0%';
            progressText.textContent = 'Upload Failed!';
            console.error('Error:', error);

            setTimeout(() => {
                progressContainer.style.display = 'none';
                progressFill.style.width = '0%'; // Reset for next submit
                progressText.textContent = 'Uploading...'; // Reset for next submit
                submitBtn.disabled = false;
                alert('Error submitting registration. Please try again.');
            }, 1000);
        });
});

// Navigation Buttons – keep these outside the form submit handler
document.getElementById("index").onclick = () => location.href = "index.html";
document.getElementById("gallery-page").onclick = () => location.href = "gallery-page.html";
document.getElementById("goEvent").onclick = () => location.href = "event-page.html";

// === Theme Toggle Logic ===
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

function setTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.textContent = '🌞';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', mode);
}

// On load, set theme from localStorage or system preference
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
})();

themeToggleBtn.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
});
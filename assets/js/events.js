// ===== EVENTS PAGE FUNCTIONALITY =====

// Event tabs functionality
const eventTabBtns = document.querySelectorAll('.tab-btn[data-tab]');
const eventSections = document.querySelectorAll('.events-section');

eventTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        eventTabBtns.forEach(b => b.classList.remove('active'));
        eventSections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Event calendar functionality
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

if (calendarGrid && currentMonthElement) {
    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        calendarGrid.innerHTML = '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            if (date.getMonth() === currentMonth) {
                dayElement.textContent = date.getDate();
                dayElement.classList.add('current-month');
                if (hasEvent(date)) {
                    dayElement.classList.add('has-event');
                }
            } else {
                dayElement.classList.add('other-month');
            }
            calendarGrid.appendChild(dayElement);
        }
    }
    function hasEvent(date) {
        const eventDates = [
            new Date(2024, 11, 15),
            new Date(2024, 11, 20),
            new Date(2024, 11, 25)
        ];
        return eventDates.some(eventDate => eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear());
    }
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    renderCalendar();
} 
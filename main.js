// Filter functionality for exams
document.addEventListener('DOMContentLoaded', function() {
    initFilterListeners();
});

function initFilterListeners() {
    const searchInput = document.getElementById('searchInput');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const stateDropdown = document.getElementById('stateDropdown');

    if (searchInput) {
        searchInput.addEventListener('input', filterExams);
    }

    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                const tab = this.getAttribute('data-tab');
                filterExams();
            });
        });
    }

    if (checkboxes) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterExams);
        });
    }

    if (stateDropdown) {
        stateDropdown.addEventListener('change', filterExams);
    }
}

function filterExams() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
    const allIndiaChecked = document.querySelector('input[value="All India"]').checked;
    const stateChecked = document.querySelector('input[value="State"]').checked;
    const selectedState = document.getElementById('stateDropdown').value;

    const examCards = document.querySelectorAll('.exam-card');

    examCards.forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        // Tab filtering
        let matchesTab = true;
        if (activeTab !== 'all') {
            matchesTab = tags.includes(activeTab.toLowerCase());
        }

        // Search filtering
        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            description.includes(searchTerm);

        // Location filtering
        let matchesLocation = true;
        if (allIndiaChecked || stateChecked) {
            matchesLocation = false;
            if (allIndiaChecked && tags.includes('all india')) {
                matchesLocation = true;
            }
            if (stateChecked && selectedState && tags.includes(selectedState.toLowerCase())) {
                matchesLocation = true;
            }
        }

        // Show or hide card based on filters
        if (matchesTab && matchesSearch && matchesLocation) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
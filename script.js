// Countdown Timer Functionality
document.addEventListener('DOMContentLoaded', function() {
    const festivalDate = new Date('August 15, 2024 00:00:00').getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const timeRemaining = festivalDate - now;
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Update DOM elements if they exist
        if (document.getElementById('days')) document.getElementById('days').textContent = days.toString().padStart(2, '0');
        if (document.getElementById('hours')) document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        if (document.getElementById('minutes')) document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        if (document.getElementById('seconds')) document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Stop countdown when festival starts
        if (timeRemaining < 0) {
            clearInterval(countdownTimer);
            if (document.querySelector('.countdown-timer')) {
                document.querySelector('.countdown-timer').innerHTML = '<p>FESTIVAL IS HERE!</p>';
            }
        }
    }, 1000);

    // Mobile Burger Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('toggle');
        });
    }

    // Lineup Filtering
    const genreFilter = document.getElementById('genre-filter');
    const stageFilter = document.getElementById('stage-filter');
    const artistCards = document.querySelectorAll('.artist-card');

    function filterArtists() {
        const selectedGenre = genreFilter ? genreFilter.value : '';
        const selectedStage = stageFilter ? stageFilter.value : '';

        artistCards.forEach(card => {
            const genre = card.getAttribute('data-genre');
            const stage = card.getAttribute('data-stage');

            const genreMatch = !selectedGenre || genre === selectedGenre;
            const stageMatch = !selectedStage || stage === selectedStage;

            card.style.display = (genreMatch && stageMatch) ? 'block' : 'none';
        });
    }

    if (genreFilter) genreFilter.addEventListener('change', filterArtists);
    if (stageFilter) stageFilter.addEventListener('change', filterArtists);

    // Carbon Calculator
    const carbonForm = document.querySelector('.carbon-form');
    const carbonResult = document.getElementById('carbon-result');

    if (carbonForm && carbonResult) {
        carbonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const transportType = document.getElementById('transport-type').value;
            const distance = parseFloat(document.getElementById('travel-distance').value);
            
            const carbonFactors = {
                car: 0.192,     // kg CO2 per km
                bus: 0.105,     // kg CO2 per km
                train: 0.041,   // kg CO2 per km
                plane: 0.255    // kg CO2 per km
            };

            if (transportType && distance) {
                const carbonFootprint = (carbonFactors[transportType] * distance).toFixed(2);
                carbonResult.textContent = `Your carbon footprint: ${carbonFootprint} kg CO2`;
            } else {
                carbonResult.textContent = 'Please enter valid information';
            }
        });
    }

    // Blog Category Filtering
    const categoryFilter = document.getElementById('category-filter');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;

            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = (!selectedCategory || cardCategory === selectedCategory) ? 'block' : 'none';
            });
        });
    }
});
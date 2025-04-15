document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.slider-dot');
    const slider = document.querySelector('.slider-container');
    let currentSlide = 0;

    // Update dots when animation frame changes
    slider.addEventListener('animationiteration', () => {
        updateDots();
    });

    // Update active dot
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Click on dots to jump to slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            slider.style.animation = 'none';
            slider.offsetHeight; // Trigger reflow
            slider.style.transform = `translateX(-${currentSlide * 25}%)`;
            slider.style.animation = 'slideAnimation 20s infinite linear';
            updateDots();
        });
    });
});

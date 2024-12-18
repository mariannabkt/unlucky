const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const thumbnails = document.querySelectorAll('.thumbnails img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const thumbnailWrapper = document.querySelector('.thumbnail-wrapper');

let currentIndex = 0;

function updateSlider(index) {
    const slideOffset = index * (slider.offsetWidth + 60);
    slider.style.transform = `translateX(-${slideOffset}px)`;
    slides.forEach((slide, i) => {
        slide.classList.toggle('shown', i === index);
    });
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('current', i === index);
    });
    centerThumbnail(index);
}

function centerThumbnail(index) {
    const thumbnailWidth = thumbnails[0].offsetWidth + 10; // Add margin
    const containerWidth = thumbnailWrapper.offsetWidth;
    const scrollPosition = Math.max(
        0,
        thumbnailWidth * index - containerWidth / 2 + thumbnailWidth / 2
    );

    thumbnailWrapper.scrollLeft = scrollPosition;
}

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
});

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateSlider(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSlider(currentIndex);
});

// Initialize active thumbnail and position
updateSlider(currentIndex);

// Handle window resize
window.addEventListener('resize', () => {
    updateSlider(currentIndex); // Recalculate position on resize
});
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slider');
    const gslides = document.querySelectorAll('.slide');
    const thumbnailitems = document.querySelectorAll('.thumbnail-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const thumbnailWrapper = document.querySelector('.thumbnail-wrapper');
    const thumbnails = document.querySelector(".thumbnails");

    let currentIndex = 0;

    // Update the slider based on index
    function updateSlider(index) {
        const slideOffset = index * (slider.offsetWidth + 60);
        slider.style.transform = `translateX(-${slideOffset}px)`;
        gslides.forEach((slide, i) => {
            slide.classList.toggle('shown', i === index);
        });

        // Add 'current' class to the appropriate image inside the div.thumbnail-item
        thumbnailitems.forEach((thumb, i) => {
            const img = thumb.querySelector('img');
            img.classList.toggle('current', i === index); // Toggle the 'current' class on the img
        });

        centerThumbnail(index);
    }

    // Center the selected thumbnail
    function centerThumbnail(index) {
        const thumbnailItem = thumbnailitems[0];
        const thumbnailWidth = thumbnailItem.offsetWidth + 10;
        const containerWidth = thumbnails.offsetWidth;
        const scrollPosition = Math.max(
            0,
            thumbnailWidth * index - containerWidth / 2 + thumbnailWidth / 2
        );
        thumbnails.scrollLeft = scrollPosition;
    }
    

    // Click event on thumbnail divs
    thumbnailitems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });

    // Arrow navigation
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : gslides.length - 1;
        updateSlider(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < gslides.length - 1) ? currentIndex + 1 : 0;
        updateSlider(currentIndex);
    });

    // Initialize slider and thumbnails on page load
    updateSlider(currentIndex);

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlider(currentIndex); // Recalculate position on resize
    });


    if (!thumbnails) {
        console.error("Error: .thumbnails element not found!");
        return;
    }

    let isDragging = false;
    let startX, scrollLeft;

    // When mouse is pressed down anywhere inside thumbnails (including image space)
    thumbnails.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - thumbnails.offsetLeft;
        scrollLeft = thumbnails.scrollLeft;
        thumbnails.style.cursor = "grabbing"; // Set cursor to grabbing when dragging
    });

    // When mouse is released
    document.addEventListener("mouseup", () => {
        isDragging = false;
        thumbnails.style.cursor = "grab"; // Reset cursor to grab when released
    });

    // When mouse leaves the container
    thumbnails.addEventListener("mouseleave", () => {
        isDragging = false;
        thumbnails.style.cursor = "grab"; // Reset cursor when mouse leaves the container
    });

    // Mouse move (dragging) event
    thumbnails.addEventListener("mousemove", (e) => {
        if (!isDragging) return; // Only drag if mouse is pressed
        e.preventDefault();
        const x = e.pageX - thumbnails.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        thumbnails.scrollLeft = scrollLeft - walk;
    });

    // Scroll horizontally with mouse wheel
    thumbnails.addEventListener("wheel", (e) => {
        e.preventDefault(); // Prevent vertical scrolling
        thumbnails.scrollLeft += e.deltaY; // Scroll horizontally
    });
});
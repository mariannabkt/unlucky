document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelector(".thumbnails");

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

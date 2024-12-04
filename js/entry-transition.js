document.addEventListener("DOMContentLoaded", function () {
    const circle = document.querySelector("#reveal-circle");
    const cat = document.querySelector("#cat");
    const svg = document.querySelector(".circle-mask");

    // Lock scrolling on the body until animation finishes
    document.body.style.overflow = 'hidden';

    // Function to map viewport coordinates to SVG coordinates
    function viewportToSVG(svgElement, x, y) {
        const point = svgElement.createSVGPoint(); // Create a point in the SVG coordinate system
        point.x = x;
        point.y = y;
        const transformedPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        return { x: transformedPoint.x, y: transformedPoint.y };
    }

    // Function to update the circle's position based on the cat's position
    function updateCirclePosition() {
        const catRect = cat.getBoundingClientRect(); // Get the cat's position relative to the viewport

        // Center of the cat horizontally and vertically (relative to viewport)
        const catCenterX = catRect.left + catRect.width / 2;
        const catCenterY = catRect.top + catRect.height / 2;

        // Transform viewport coordinates to SVG coordinates
        const svgCoords = viewportToSVG(svg, catCenterX, catCenterY);

        // Update the circle's position
        circle.setAttribute("cx", svgCoords.x);
        circle.setAttribute("cy", svgCoords.y);
    }

    // Update the circle position when the page is loaded
    updateCirclePosition();

    // Start the circle reveal animation after a brief delay
    setTimeout(function () {
        circle.setAttribute("r", "150"); // Expand the circle to reveal the content
    }, 1); // Delay before starting animation

    // Hide the overlay after the animation finishes (e.g., 5 seconds)
    setTimeout(function () {
        document.querySelector(".overlay").classList.add("hide"); // Add hide class to overlay
    }, 5000); // Wait for the animation to finish before hiding

    // Unlock scroll after the animation ends
    setTimeout(function () {
        document.body.style.overflow = 'auto'; // Enable scroll after animation ends
    }, 5000); // Match this with your animation duration

    // Adjust circle position on window resize
    window.addEventListener('resize', updateCirclePosition);
});
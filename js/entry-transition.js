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
    const circle = document.querySelector("#reveal-circle");
    const cat = document.querySelector("#cat");
    const svg = document.querySelector(".circle-mask");

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

// Function to start the reveal animation
function startRevealAnimation() {
    const circle = document.querySelector("#reveal-circle");

    // Start the circle reveal animation
    setTimeout(function () {
        circle.setAttribute("r", "150"); // Expand the circle to reveal the content
    }, 100); // Slight delay to ensure smooth animation

    // Unlock scroll after the animation ends
    setTimeout(function () {
        document.body.style.overflow = "auto"; // Enable scroll after animation ends
    }, 9000); // Match this with your animation duration
}

// Scroll to the top of the page and update the circle position
function scrollToTopAndSetup() {

    setTimeout(() => {
        // Force scroll to the top
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
 
        // Update circle position and start animations
        updateCirclePosition();
        startRevealAnimation();
        updateLightBeam();
        adjustEyesPosition();
    }, 50); // Slight delay for layout updates
}

// Ensure the page starts at the top and positions the circle correctly
window.addEventListener("load", scrollToTopAndSetup);

document.addEventListener("DOMContentLoaded", function () {
    // Lock scrolling on the body until animation finishes
    document.body.style.overflow = "hidden";

    // Adjust circle position on window resize
    window.addEventListener("resize", updateCirclePosition);
});
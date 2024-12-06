document.addEventListener("DOMContentLoaded", () => {
    const catContainer = document.querySelector(".cat-container");
    const cat = document.getElementById("cat");
    const eyes = document.getElementById("eyes");

    function adjustEyesPosition() {
        const catContRect = catContainer.getBoundingClientRect();
        const catContWidth = catContRect.width;

        // Get the cat's current position and size, excluding margins and padding
        const catRect = cat.getBoundingClientRect();
        const catWidth = catRect.width;  // Get the width of the cat
        const catHeight = catRect.height;  // Get the height of the cat

        // Get the cat's margin using getComputedStyle
        const catStyle = getComputedStyle(cat);
        const catMarginTop = parseFloat(catStyle.marginTop);

        // Calculate the eyeballs' width based on the cat's adjusted width
        const eyesWidth = (95 / 600) * catWidth;
        eyes.style.width = `${eyesWidth}px`;

        // Calculate the "left" position based on the adjusted cat's width
        const leftPosition = (342 / 600) * catWidth;
        if (window.innerWidth > 800) {
            leftOffset = catContWidth * 0.05 + leftPosition;
        } else {
            leftOffset = catContWidth * 0.1 + leftPosition;
        }
        eyes.style.left = `${leftOffset}px`;

        // Calculate the "top" position based on the adjusted cat's height
        const topPosition = (156 / 443) * catHeight;
        eyes.style.top = `${topPosition + catMarginTop}px`;
    }

    // Adjust eyes position initially and on window resize
    window.addEventListener("resize", adjustEyesPosition);
    adjustEyesPosition();

    function adjustAnimation() {
        const catRect = cat.getBoundingClientRect();
        const catWidth = catRect.width;

        // Get the cat's margin
        const catStyle = getComputedStyle(cat);
        const catMarginLeft = parseFloat(catStyle.marginLeft);
        
        // Calculate the left and right limits based on the cat's width
        const leftLimit = (6 / 600) * (catWidth + catMarginLeft * 2);
        const rightLimit = (12 / 600) * (catWidth + catMarginLeft * 2);

        // Set the CSS animation range dynamically
        eyes.style.setProperty('--left-limit', `${-leftLimit}px`);
        eyes.style.setProperty('--right-limit', `${rightLimit}px`);
        eyes.style.setProperty('--middle-limit', `${leftLimit}px`);
    }

    // Adjust the animation range based on the window resize
    window.addEventListener("resize", adjustAnimation);

    // Run once on page load
    adjustAnimation();
});

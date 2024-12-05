document.addEventListener('DOMContentLoaded', function() {
    const cat = document.getElementById('cat');
    const star = document.querySelector('.star');
    const lightBeam = document.querySelector('.light-beam');
    const circle = document.querySelector('.circle');

    function updateLightBeam() {
        // Get positions of the cat and star relative to the document
        const catRect = cat.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();
        const lightBeamRect = lightBeam.getBoundingClientRect();
        const circleRect = lightBeam.getBoundingClientRect();

        // Calculate the center of the cat and the star
        const catCenterX = catRect.left + catRect.width / 2;
        const catBottom = catRect.bottom; 
        const starCenterX = starRect.left + starRect.width / 2;
        const starCenterY = starRect.top + starRect.height / 2; 

        // Calculate the diagonal distance between the cat and the star
        const distanceX = catCenterX - starCenterX;
        const distanceY = catBottom - starCenterY;
        const diagonalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Update light beam size and position
        lightBeam.style.height = `${diagonalDistance}px`; // Set the diagonal distance as the height
        lightBeam.style.width = `${catRect.width}px`; // Set the width of the beam based on the cat's width

        const topX = Math.abs(lightBeamRect.left - starCenterX);

        // Update the polygon clip-path with dynamic points
        lightBeam.style.clipPath = `polygon(
            ${topX}px 0%, 
            0% 100%, 
            100% 100%
        )`;

        // Position the circle at the bottom of the beam
        const circleSize = catRect.width; // Circle size relative to cat width
        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize / 4}px`;
        circle.style.bottom = `${-circle.offsetHeight / 2}px`;
    }

    // Update the light beam whenever the page is resized or scrolled
    window.addEventListener('resize', updateLightBeam);
    window.addEventListener('scroll', updateLightBeam);

    // Initial update
    updateLightBeam();
});

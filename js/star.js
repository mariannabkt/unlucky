window.addEventListener('DOMContentLoaded', () => {
    const star = document.querySelector('.star');
    const cat = document.querySelector('#cat');
    const lightBeam = document.querySelector('.light-beam');
    const circle = document.querySelector('.circle');

    function updateLightBeamPosition() {
        // Get the position of the star and cat
        const starRect = star.getBoundingClientRect();
        const catRect = cat.getBoundingClientRect();

        // Get the center of the star and the bottom center of the cat (legs)
        const starCenter = {
            x: starRect.left + starRect.width / 2,
            y: starRect.top + starRect.height / 2
        };

        const catLegs = {
            x: catRect.left + catRect.width / 2,
            y: catRect.bottom // Bottom center of the cat
        };

        // Introduce a horizontal offset for the star's misalignment
        const starHorizontalOffset = 15; // Adjust this value as needed
        const adjustedStarCenter = {
            x: starCenter.x + starHorizontalOffset,
            y: starCenter.y
        };

        // Calculate the distance and angle between the adjusted star center and the cat's bottom
        const dx = catLegs.x - adjustedStarCenter.x;
        const dy = catLegs.y - adjustedStarCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
        const angle = Math.atan2(dy, dx);

        // Position and shape the light beam
        lightBeam.style.position = 'absolute';
        lightBeam.style.left = `${adjustedStarCenter.x}px`;
        lightBeam.style.top = `${adjustedStarCenter.y}px`;

        const beamWidth = 20; // Beam's base width
        const beamHeight = distance - circle.offsetHeight / 2; // Adjust height so the triangle ends above the circle

        lightBeam.style.width = `${beamWidth}px`;
        lightBeam.style.height = `${beamHeight}px`;
        lightBeam.style.background = 'var(--yellow)';
        lightBeam.style.transform = `rotate(${angle}rad)`;
        lightBeam.style.transformOrigin = 'top center';
        lightBeam.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';

        // Position the circle at the bottom of the beam
        const circleSize = catRect.width; // Circle size relative to cat width
        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize / 4}px`;
        circle.style.position = 'absolute';
        circle.style.top = `${catLegs.y - circle.offsetHeight}px`;
    }

    // Call the update function to position the beam
    updateLightBeamPosition();

    // Add event listener to adjust the beam dynamically on window resize
    window.addEventListener('resize', updateLightBeamPosition);
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.pawprints');
    const numPawprints = 40; // Adjust for more/less pawprints
  
    // Array to hold pawprint elements and positions
    const pawElements = [];
    let positions = [];
  
    // Adjustable width and height factors for the S-path
    const sWidthFactor = 2; // Adjust this to make the S-path wider or narrower
    const sHeightFactor = 1; // Adjust this to make the S-path taller or shorter
  
    // Function to calculate a point along an S-shaped path
    const getSPathPoint = (progress, containerWidth, containerHeight, centerOffset) => {
      const xOffset = Math.sin(progress * Math.PI * sWidthFactor) * (containerWidth / 4); // Adjust width with sWidthFactor
      const yOffset = progress * containerHeight * sHeightFactor; // Adjust height with sHeightFactor
      return { x: centerOffset + xOffset, y: yOffset }; // Center the S-shape horizontally
    };
  
    // Function to set up pawprints
    const setupPawprints = () => {
      // Clear previous positions
      positions = [];
  
      // Get current container dimensions
      const containerHeight = container.offsetHeight;
      const containerWidth = container.offsetWidth;
  
      // Center the S-path horizontally
      const centerOffset = containerWidth / 2;
  
      // Update pawprint positions and styles
      pawElements.forEach((paw, i) => {
        const progress = i / (numPawprints - 1); // Ensure equal spacing from 0 to 1
        const position = getSPathPoint(progress, containerWidth, containerHeight, centerOffset);
  
        positions.push(position);
        paw.style.left = `${position.x}px`;
        paw.style.top = `${position.y}px`;
      });
  
      // Rotate each pawprint to point to the next one
      for (let i = 0; i < pawElements.length - 1; i++) {
        const current = positions[i];
        const next = positions[i + 1];
  
        // Calculate angle between current and next pawprint
        const deltaX = next.x - current.x;
        const deltaY = next.y - current.y;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
  
        // Apply rotation to current pawprint
        pawElements[i].style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    };
  
    // Initialize pawprints
    for (let i = 0; i < numPawprints; i++) {
      const paw = document.createElement('div');
      paw.classList.add('pawprint');
      paw.style.opacity = 0; // Initially hidden
      container.appendChild(paw);
      pawElements.push(paw);
    }
  
    // Function to trigger animations for visible pawprints
    const triggerAnimations = () => {
      let visibleIndex = 0; // Counter for visible pawprints
  
      pawElements.forEach((paw) => {
        const rect = paw.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0 && paw.style.opacity == 0) {
          // Calculate delay based on the visible index
          const delay = visibleIndex * 0.5;
  
          // Apply styles with delay
          paw.style.transitionDelay = `${delay}s`;
          paw.style.opacity = 1;
          paw.style.transform += ' translateY(0)'; // Add animation
  
          visibleIndex++; // Increment visible pawprint counter
        }
      });
    };
  
    let scrollTimeout;
    // Scroll event listener with debounce
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout); // Clear any previously set timeout
      scrollTimeout = setTimeout(() => {
        // Trigger animations when scrolling stops
        triggerAnimations();
      }, 100); // Adjust debounce delay (100ms is typical)
    });
  
    // Set up pawprints on load
    setupPawprints();
    
    // Trigger animations for pawprints initially in the viewport
    triggerAnimations();
  
    // Update pawprint positions on resize
    window.addEventListener('resize', () => {
      setupPawprints();
    });
  });
  
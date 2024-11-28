let lastScrollTop = 0;
const marqueeContent = document.querySelector('.marquee-content');

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;

    // Scroll down
    if (scrollTop > lastScrollTop) {
        marqueeContent.style.transform = `translateX(-${scrollTop * 1}px)`; // Move right
    } 
    // Scroll up
    else {
        marqueeContent.style.transform = `translateX(${scrollTop * 1}px)`; // Move left
    }
});
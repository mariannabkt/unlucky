document.addEventListener("DOMContentLoaded", function () {
    // Header scroll effect
    const header = document.querySelector(".head");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const overlayMenu = document.getElementById("overlayMenu");
    const closeBtn = document.getElementById("closeBtn");
  
    hamburger.addEventListener("click", function () {
      overlayMenu.classList.toggle("active");
      hamburger.classList.toggle("open"); // Toggle between hamburger and X icon
    });
  
    closeBtn.addEventListener("click", function () {
      overlayMenu.classList.remove("active");
      hamburger.classList.remove("open"); // Revert to hamburger icon when menu closes
    });
  
    // Hide the overlay menu if the window is resized to a width larger than 768px
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        overlayMenu.classList.remove("active"); // Hide overlay menu
        hamburger.classList.remove("open"); // Reset hamburger icon to normal state
      }
    });
  });
  
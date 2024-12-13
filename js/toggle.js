document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const paragraph = button.nextElementSibling; // Select the <p> element after the button
        const icon = button.querySelector('i'); // Select the icon inside the button
        
        // Toggle the display of the paragraph
        if (paragraph.style.display === 'none' || !paragraph.style.display) {
            paragraph.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            paragraph.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('name');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';

    let i = 0;
    const typingSpeed = 100; // Speed in milliseconds

    function typeWriter() {
        if (i < nameText.length) {
            nameElement.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    typeWriter();

    // Smooth scrolling
    const pageNumbers = document.querySelectorAll('.page-number');
    const sections = document.querySelectorAll('section');

    // Update the active page number based on scroll position
    function changeActivePage(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                pageNumbers.forEach((page, i) => {
                    page.classList.toggle('active', i === index);
                });
            }
        });
    }

    const observerOptions = {
        threshold: 0.5 // Adjust this threshold based on when you want to trigger the change
    };

    const observer = new IntersectionObserver(changeActivePage, observerOptions);
    sections.forEach(section => observer.observe(section));

    pageNumbers.forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Update the active class immediately after clicking
            pageNumbers.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

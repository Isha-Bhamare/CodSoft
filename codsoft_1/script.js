document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('header .navlist a');
    const backToTopLink = document.querySelector('#BackToTop');

    // Function to handle smooth scrolling
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            scrollToSection(targetSection, 500); // 8000ms = 8 seconds
        }
    }

    // Smooth scroll function
    function scrollToSection(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Add event listener to Back To Top link
    backToTopLink.addEventListener('click', smoothScroll);
});

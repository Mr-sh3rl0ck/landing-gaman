document.addEventListener('DOMContentLoaded', function () {
    // Dropdown toggle functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking a menu item
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function () {
                dropdown.classList.remove('active');
            });
        });
    }

    // Close mobile menu when clicking on any navigation link
    const closeNavRadio = document.getElementById('close-navigation');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (closeNavRadio) {
                // Small delay to allow navigation to start
                setTimeout(() => {
                    closeNavRadio.checked = true;
                }, 100);
            }
        });
    });

    // Smooth scroll with centered positioning for all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId.length <= 1) {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const header = document.querySelector('.site-header');
                const navbarHeight = header ? header.offsetHeight : 80;
                const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const elementHeight = targetElement.offsetHeight;
                const windowHeight = window.innerHeight;

                let offsetPosition;

                // Logic to center the content in the viewport *considering the navbar*
                // Available height to view content is windowHeight - navbarHeight
                const availableHeight = windowHeight - navbarHeight;

                if (elementHeight < availableHeight) {
                    // If element fits in the available space below navbar:
                    // We want to center it in that available space.
                    offsetPosition = elementTop - (navbarHeight + (availableHeight - elementHeight) / 2);
                } else {
                    // If taller than available space, align to top (just below navbar)
                    offsetPosition = elementTop - navbarHeight - 20;
                }

                // Apply fine-tuning for specific sections (ALWAYS applied)
                if (targetId === '#nosotros') {
                    // "un poco mas abajo" -> Scroll LESS -> Smaller offset
                    offsetPosition -= -75;
                } else if (targetId === '#mantenimiento') {
                    // "un poco mas arriba" -> Scroll MORE -> Larger offset
                    // Using 90 to give it a good lift as requested
                    offsetPosition += -86;
                } else if (targetId === '#contacto') {
                    // "abarque todo el vh" -> Align top of section to top of viewport
                    offsetPosition = elementTop;
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

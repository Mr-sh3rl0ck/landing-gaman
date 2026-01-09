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

    // Close mobile menu when clicking on navigation links (but NOT dropdown toggle)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Don't close menu if this is the dropdown toggle
            if (this.classList.contains('dropdown-toggle')) {
                return; // Let the dropdown toggle handler above handle it
            }

            // Only close menu for actual navigation links
            if (menuToggle) {
                // Small delay to allow navigation to start
                setTimeout(() => {
                    menuToggle.checked = false;
                }, 100);
            }
        });
    });

    // ========================================
    // CONFIGURACIÓN DE SCROLL PERSONALIZADO
    // ========================================
    // Aquí puedes ajustar el offset de scroll para cada sección
    // de manera independiente para desktop y mobile

    const scrollConfig = {
        // Configuración para DESKTOP (> 768px)
        desktop: {
            '#inicio': 0,           // Sin offset adicional
            '#nosotros': 75,        // Ajuste positivo = scroll más abajo
            '#servicios': 0,        // Sin offset adicional
            '#mantenimiento': -120,  // Ajuste negativo = scroll más arriba
            '#wcm': -40,            // Ajuste negativo = scroll más arriba
            '#proyectos': -30,      // Ajuste negativo = scroll más arriba
            '#certificaciones': 1,// Ajuste negativo = scroll más arriba
            '#contacto': 60          // Alinear al tope del viewport
        },
        // Configuración para MOBILE/TABLET (<= 768px)
        mobile: {
            '#inicio': 0,           // Sin offset adicional
            '#nosotros': 93,        // Ajuste positivo = scroll más abajo
            '#servicios': 0,        // Sin offset adicional
            '#mantenimiento': 6,  // Ajuste negativo = scroll más arriba
            '#wcm': 6,            // Ajuste negativo = scroll más arriba
            '#proyectos': 6,      // Ajuste negativo = scroll más arriba
            '#certificaciones': -86,// Ajuste negativo = scroll más arriba
            '#contacto': 60          // Alinear al tope del viewport
        }
    };

    // Smooth scroll con offsets personalizados
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
                const isMobile = window.innerWidth <= 768;

                let offsetPosition;

                // Determinar el offset base según el dispositivo
                if (isMobile) {
                    // Mobile/Tablet: offset simple desde el navbar
                    offsetPosition = elementTop - navbarHeight - 10;
                } else {
                    // Desktop: centrar contenido si cabe, o alinear arriba si es muy alto
                    const availableHeight = windowHeight - navbarHeight;

                    if (elementHeight < availableHeight) {
                        // Centrar contenido si cabe en el viewport
                        offsetPosition = elementTop - (navbarHeight + (availableHeight - elementHeight) / 2);
                    } else {
                        // Alinear arriba si el contenido es muy alto
                        offsetPosition = elementTop - navbarHeight - 40;
                    }
                }

                // Aplicar offset personalizado según la configuración
                const config = isMobile ? scrollConfig.mobile : scrollConfig.desktop;
                const customOffset = config[targetId] || 0;

                // Aplicar el offset personalizado a todas las secciones
                offsetPosition += customOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

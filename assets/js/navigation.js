// ===================================
// Navegação e Menu
// ===================================

/**
 * Inicializa funcionalidades de navegação
 */
function initNavigation() {
    setupSmoothScroll();
    setupMobileMenu();
    highlightActiveSection();
    handleHeaderScroll();
    
    devLog('Navegação inicializada', 'log');
}

/**
 * Configura scroll suave para links âncora
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = getHeaderHeight();
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                closeMobileMenu();
                
                // Scroll suave
                smoothScrollTo(targetElement, headerHeight + 20);
                
                // Atualiza link ativo
                updateActiveLink(link);
            }
        });
    });
}

/**
 * Configura menu mobile (hamburguer)
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    // Toggle menu ao clicar no botão
    menuToggle.addEventListener('click', () => {
        toggleMobileMenu();
    });
    
    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Fecha menu ao redimensionar para desktop
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
}

/**
 * Alterna menu mobile
 */
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (!menuToggle || !nav) return;
    
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Previne scroll do body quando menu está aberto
    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

/**
 * Fecha menu mobile
 */
function closeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (!menuToggle || !nav) return;
    
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    body.style.overflow = '';
}

/**
 * Destaca seção ativa no menu conforme scroll
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

/**
 * Atualiza link ativo manualmente
 * @param {HTMLElement} link - Link clicado
 */
function updateActiveLink(link) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

/**
 * Adiciona efeito ao header durante scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Adiciona classe 'scrolled' quando rolar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Esconde header ao rolar para baixo, mostra ao rolar para cima
        if (currentScroll > lastScroll && currentScroll > 200) {
            // Rolando para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Rolando para cima
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
}

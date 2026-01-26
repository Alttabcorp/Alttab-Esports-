// ===================================
// Animações e Efeitos
// ===================================

/**
 * Inicializa animações
 */
function initAnimations() {
    setupScrollAnimations();
    setupParallaxEffect();
    
    devLog('Animações inicializadas', 'log');
}

/**
 * Configura animações ao fazer scroll
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    // Intersection Observer para animar elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay baseado no índice para efeito cascata
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                
                // Para de observar após animar (anima apenas uma vez)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Efeito parallax no hero (opcional, sutil)
 */
function setupParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (!heroBackground || isMobile()) return;
    
    const handleParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, 10);
    
    window.addEventListener('scroll', handleParallax);
}

/**
 * Animação de contadores (para métricas/números)
 * @param {HTMLElement} element - Elemento contador
 * @param {Number} target - Valor alvo
 * @param {Number} duration - Duração da animação em ms
 */
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/**
 * Efeito de typing no hero (opcional)
 * @param {HTMLElement} element - Elemento de texto
 * @param {Array} texts - Array de textos para alternar
 * @param {Number} speed - Velocidade de digitação
 */
function typingEffect(element, texts, speed = 100) {
    if (!element || !texts.length) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pausa antes de começar novo texto
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/**
 * Fade in de elementos
 * @param {HTMLElement} element - Elemento
 * @param {Number} duration - Duração em ms
 */
function fadeIn(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let opacity = 0;
    const increment = 16 / duration;
    
    const fade = () => {
        opacity += increment;
        element.style.opacity = opacity;
        
        if (opacity < 1) {
            requestAnimationFrame(fade);
        }
    };
    
    fade();
}

/**
 * Fade out de elementos
 * @param {HTMLElement} element - Elemento
 * @param {Number} duration - Duração em ms
 */
function fadeOut(element, duration = 300) {
    if (!element) return;
    
    let opacity = 1;
    const decrement = 16 / duration;
    
    const fade = () => {
        opacity -= decrement;
        element.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(fade);
        } else {
            element.style.display = 'none';
        }
    };
    
    fade();
}

/**
 * Adiciona efeito de glow aos botões
 */
function setupButtonGlow() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 1.5s infinite';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Inicializa efeitos de botão
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupButtonGlow);
} else {
    setupButtonGlow();
}

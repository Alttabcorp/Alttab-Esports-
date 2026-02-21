/**
 * ===================================
 * CARROSSEL DE UNIFORMES
 * ===================================
 */

// Inicializa o carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const carousel = document.querySelector('.uniform-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 segundos

    // Função para mostrar um slide específico
    function showSlide(index) {
        // Remove a classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Ajusta o índice se estiver fora dos limites
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Adiciona a classe active ao slide e indicador atual
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Função para ir para o slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Navegação por teclado (acessibilidade)
    document.addEventListener('keydown', (e) => {
        // Verifica se o carrossel está visível na viewport
        const rect = carousel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (!isVisible) return;

        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Autoplay: avança automaticamente
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    // Para o autoplay ao passar o mouse
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Retoma o autoplay ao retirar o mouse
    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Reinicia o timer do autoplay
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Suporte a gestos touch em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda - próximo slide
            nextSlide();
            resetAutoplay();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita - slide anterior
            prevSlide();
            resetAutoplay();
        }
    }

    // Inicia o autoplay
    startAutoplay();

    // Para o autoplay quando o usuário sai da aba
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoplayInterval);
        } else {
            startAutoplay();
        }
    });
}

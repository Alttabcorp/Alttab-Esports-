// ===================================
// Funções Utilitárias
// ===================================

/**
 * Debounce - Atrasa a execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {Number} wait - Tempo de espera em ms
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - Limita a frequência de execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {Number} limit - Intervalo mínimo entre execuções em ms
 * @returns {Function}
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Verifica se um elemento está visível no viewport
 * @param {HTMLElement} element - Elemento a ser verificado
 * @param {Number} offset - Offset adicional em pixels
 * @returns {Boolean}
 */
function isInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight - offset &&
        rect.bottom >= offset
    );
}

/**
 * Detecta se o dispositivo é mobile
 * @returns {Boolean}
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Formata uma data para padrão brasileiro
 * @param {Date} date - Data a ser formatada
 * @returns {String}
 */
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

/**
 * Scroll suave para um elemento
 * @param {String|HTMLElement} target - Seletor ou elemento alvo
 * @param {Number} offset - Offset do topo em pixels
 */
function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Adiciona classe com delay
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Classe a adicionar
 * @param {Number} delay - Delay em ms
 */
function addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Remove classe com delay
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Classe a remover
 * @param {Number} delay - Delay em ms
 */
function removeClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

/**
 * Toggle classe em elemento
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Classe a alternar
 */
function toggleClass(element, className) {
    if (!element) return;
    element.classList.toggle(className);
}

/**
 * Obtém altura do header
 * @returns {Number}
 */
function getHeaderHeight() {
    const header = document.querySelector('.header');
    return header ? header.offsetHeight : 0;
}


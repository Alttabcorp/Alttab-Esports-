// ===================================
// Script Principal - Inicialização
// ===================================

/**
 * Inicializa todas as funcionalidades quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    // Log de boas-vindas
    console.log('%c🎮 Alttab E-Sports Team', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite carregado com sucesso!', 'color: #0dcaf0; font-size: 14px;');
    
    // Inicializa módulos
    try {
        // Navegação e menu
        if (typeof initNavigation === 'function') {
            initNavigation();
        }
        
        // Animações
        if (typeof initAnimations === 'function') {
            initAnimations();
        }
        
        // Formulário
        if (typeof initForm === 'function') {
            initForm();
        }
        
        // Tabs de modalidades
        if (typeof initTabs === 'function') {
            initTabs();
        }
        
        devLog('Todos os módulos inicializados', 'log');
    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
    
    // Adiciona classe 'loaded' ao body
    document.body.classList.add('loaded');
});

/**
 * Manipula eventos de carregamento completo
 */
window.addEventListener('load', () => {
    devLog('Página totalmente carregada', 'log');
    
    // Remove preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        fadeOut(preloader, 500);
    }
});

/**
 * Manipula redimensionamento da janela
 */
window.addEventListener('resize', debounce(() => {
    devLog('Janela redimensionada', 'log');
    
    // Fecha menu mobile se tela ficar grande
    if (window.innerWidth > 768) {
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

/**
 * Previne comportamentos indesejados
 */
document.addEventListener('contextmenu', (e) => {
    // Descomente para desabilitar menu de contexto em imagens
    // if (e.target.tagName === 'IMG') {
    //     e.preventDefault();
    // }
});

/**
 * Easter egg - Konami Code (opcional, diversão)
 */
(function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        console.log('%c🏆 ACHIEVEMENT UNLOCKED!', 'color: gold; font-size: 24px; font-weight: bold;');
        console.log('%cVocê descobriu o Easter Egg do Alttab E-Sports!', 'color: #00d4ff; font-size: 16px;');
        
        // Efeito visual opcional
        document.body.style.animation = 'glow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
})();

/**
 * Detecta se usuário está offline
 */
window.addEventListener('offline', () => {
    console.warn('⚠️ Você está offline');
    // Poderia exibir uma mensagem ao usuário
});

window.addEventListener('online', () => {
    console.log('✅ Conexão restaurada');
});

/**
 * Performance monitoring (opcional)
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            devLog(`Performance: Load=${pageLoadTime}ms, Connect=${connectTime}ms, Render=${renderTime}ms`, 'log');
        }, 0);
    });
}

/**
 * Service Worker (opcional, para PWA)
 */
if ('serviceWorker' in navigator) {
    // Descomente para ativar Service Worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => devLog('Service Worker registrado', 'log'))
    //         .catch(err => devLog('Erro ao registrar Service Worker: ' + err, 'error'));
    // });
}

// Exporta funções globais se necessário
window.AlttabEsports = {
    smoothScrollTo,
    toggleClass,
    fadeIn,
    fadeOut,
    devLog
};

// ===================================
// Script Principal - Inicialização
// ===================================

/**
 * Inicializa todas as funcionalidades quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {    
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
};

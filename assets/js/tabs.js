// ===================================
// Sistema de Tabs para Modalidades
// ===================================

/**
 * Inicializa o sistema de tabs
 */
function initTabs() {
    const tabs = document.querySelectorAll('.game-tab');
    const contents = document.querySelectorAll('.lineup-content');
    
    if (!tabs.length || !contents.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const gameId = tab.getAttribute('data-game');
            
            // Remove active de todas as tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.borderColor = 'transparent';
                const icon = t.querySelector('i');
                const span = t.querySelector('span');
                if (icon) icon.style.color = 'var(--color-gray)';
                if (span) span.style.color = 'var(--color-gray)';
            });
            
            // Adiciona active na tab clicada
            tab.classList.add('active');
            tab.style.borderColor = 'var(--color-accent)';
            const activeIcon = tab.querySelector('i');
            const activeSpan = tab.querySelector('span');
            if (activeIcon) activeIcon.style.color = 'var(--color-accent)';
            if (activeSpan) activeSpan.style.color = 'var(--color-white)';
            
            // Esconde todos os conteúdos
            contents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Mostra o conteúdo correspondente
            const activeContent = document.querySelector(`[data-game-content="${gameId}"]`);
            if (activeContent) {
                activeContent.style.display = 'block';
                
                // Anima os player cards
                const playerCards = activeContent.querySelectorAll('.player-card');
                playerCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            devLog(`Tab alterada para: ${gameId}`, 'log');
        });
    });
}

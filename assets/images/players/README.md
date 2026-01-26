# ⚠️ AVATARES DOS JOGADORES

Esta pasta deve conter os avatares dos 5 jogadores do line-up.

## 📁 Arquivos Necessários

1. **avatar-zephyr.png** - Jogador Top Lane
2. **avatar-pyro.png** - Jogador Jungle
3. **avatar-cipher.png** - Jogador Mid Lane
4. **avatar-vortex.png** - Jogador ADC
5. **avatar-aurora.png** - Jogador Support
6. **avatar-default.png** - Avatar padrão (fallback)

## 📝 Especificações

- **Formato:** PNG ou JPG
- **Tamanho:** 300x300px (quadrado)
- **Proporção:** 1:1 (aspecto quadrado)
- **Peso máximo:** 200KB por arquivo
- **Estilo:** Fotos, ilustrações ou avatars estilizados

## 🎨 Dicas de Design

- Use imagens com boa iluminação
- Fundo neutro ou transparente (PNG)
- Centralize o rosto/personagem
- Mantenha consistência visual entre todos

## 🔄 Como Substituir Jogadores

1. Adicione nova imagem com nome descritivo: `avatar-novojogador.png`
2. Atualize o HTML em `index.html` na seção `#lineup`
3. Atualize nome e função do jogador

Exemplo:
```html
<img src="assets/images/players/avatar-novojogador.png" alt="Avatar NovoJogador">
<h3 class="player-nickname">NovoJogador</h3>
<p class="player-role">Mid Lane</p>
```

---

**Nota:** O site tem fallback para `avatar-default.png` caso alguma imagem não seja encontrada.

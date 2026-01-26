// ===================================
// Validação e Envio de Formulário
// ===================================

/**
 * Inicializa formulário de contato
 */
function initForm() {
    const form = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (form) {
        // Validação em tempo real
        setupRealtimeValidation(form);
        // Envio do formulário
        form.addEventListener('submit', handleFormSubmit);
        devLog('Formulário de contato inicializado', 'log');
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        devLog('Formulário de newsletter inicializado', 'log');
    }
}

/**
 * Configura validação em tempo real
 * @param {HTMLFormElement} form - Formulário
 */
function setupRealtimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Validar ao sair do campo (blur)
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        // Limpar erro ao digitar
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                clearFieldError(input);
            }
        });
    });
}

/**
 * Valida um campo específico
 * @param {HTMLInputElement} field - Campo a validar
 * @returns {Boolean}
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validações específicas por tipo de campo
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (fieldName === 'name' && value.length < 3) {
        isValid = false;
        errorMessage = 'Nome deve ter no mínimo 3 caracteres';
    } else if (fieldName === 'email' && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'E-mail inválido';
    } else if (fieldName === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Mensagem deve ter no mínimo 10 caracteres';
    }
    
    // Exibe ou limpa erro
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

/**
 * Valida formato de e-mail
 * @param {String} email - E-mail a validar
 * @returns {Boolean}
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valida todos os campos do formulário
 * @param {HTMLFormElement} form - Formulário
 * @returns {Boolean}
 */
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Exibe mensagem de erro no campo
 * @param {HTMLInputElement} field - Campo
 * @param {String} message - Mensagem de erro
 */
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    field.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Limpa erro do campo
 * @param {HTMLInputElement} field - Campo
 */
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    field.classList.remove('error');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Limpa todos os erros do formulário
 * @param {HTMLFormElement} form - Formulário
 */
function clearAllErrors(form) {
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

/**
 * Manipula envio do formulário
 * @param {Event} e - Evento de submit
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const successMessage = form.querySelector('.form-success');
    
    // Limpa mensagem de sucesso anterior
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    
    // Valida formulário
    if (!validateForm(form)) {
        devLog('Formulário inválido', 'warn');
        return;
    }
    
    // Dados do formulário
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };
    
    // Desabilita botão e mostra loading
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    try {
        // Simula envio (substitua por sua lógica de envio real)
        await submitFormData(formData);
        
        // Sucesso
        showSuccessMessage(form);
        resetForm(form);
        
        devLog('Formulário enviado com sucesso', 'log');
    } catch (error) {
        // Erro
        alert('Erro ao enviar formulário. Por favor, tente novamente ou entre em contato por e-mail.');
        devLog('Erro ao enviar formulário: ' + error, 'error');
    } finally {
        // Restaura botão
        submitButton.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

/**
 * Envia dados do formulário
 * @param {Object} data - Dados do formulário
 * @returns {Promise}
 */
async function submitFormData(data) {
    // Simula delay de envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // OPÇÃO 1: Usar serviço externo como FormSubmit ou FormSpree
    // const response = await fetch('https://formsubmit.co/seu-email@exemplo.com', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    
    // OPÇÃO 2: Usar mailto (básico, abre cliente de e-mail)
    // window.location.href = `mailto:esports@alttabcorp.com.br?subject=Contato do Site&body=${encodeURIComponent(
    //     `Nome: ${data.name}\nE-mail: ${data.email}\nMensagem: ${data.message}`
    // )}`;
    
    // OPÇÃO 3: Integrar com seu backend
    // const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    
    devLog('Dados do formulário:', data);
    
    return true;
}

/**
 * Exibe mensagem de sucesso
 * @param {HTMLFormElement} form - Formulário
 */
function showSuccessMessage(form) {
    const successMessage = form.querySelector('.form-success');
    
    if (successMessage) {
        successMessage.style.display = 'flex';
        
        // Esconde após 5 segundos
        setTimeout(() => {
            fadeOut(successMessage, 500);
        }, 5000);
    }
}

/**
 * Reseta formulário
 * @param {HTMLFormElement} form - Formulário
 */
function resetForm(form) {
    form.reset();
    clearAllErrors(form);
}

/**
 * Processa envio do formulário de newsletter
 * @param {Event} e - Evento de submit
 */
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('#newsletter-email');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const successMessage = form.querySelector('.newsletter-success');
    
    const email = emailInput.value.trim();
    
    // Validar e-mail
    if (!validateEmail(email)) {
        emailInput.style.borderColor = 'var(--color-error, #ff4444)';
        emailInput.focus();
        return;
    }
    
    // Desabilita botão
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    try {
        // Simula envio
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Aqui você pode integrar com seu serviço de e-mail marketing
        // Exemplos: Mailchimp, SendGrid, etc.
        devLog('Newsletter cadastrado: ' + email, 'log');
        
        // Exibe mensagem de sucesso
        successMessage.style.display = 'flex';
        form.reset();
        
        // Esconde mensagem após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        alert('Erro ao cadastrar e-mail. Por favor, tente novamente.');
        devLog('Erro ao enviar newsletter: ' + error, 'error');
    } finally {
        // Restaura botão
        submitButton.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        emailInput.style.borderColor = '';
    }
}

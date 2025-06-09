document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Limpa mensagens de erro anteriores
        clearErrors();
        
        // Valida cada campo
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // Se todos os campos estiverem válidos, pode enviar o formulário
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Formulário enviado com sucesso!');
            form.reset(); // Limpa o formulário após o envio
        }
    });
    
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, 'Por favor, insira seu nome completo.');
            return false;
        }
        
        // Verifica se o nome tem pelo menos 2 partes (nome e sobrenome)
        if (nameValue.split(' ').length < 2) {
            showError(nameInput, 'Por favor, insira seu nome completo.');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, 'Por favor, insira seu e-mail.');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Por favor, insira um e-mail válido.');
            return false;
        }
        
        return true;
    }
    
    function validateSubject() {
        const subjectInput = document.getElementById('subject');
        const subjectValue = subjectInput.value;
        
        if (subjectValue === '' || subjectValue === null) {
            showError(subjectInput, 'Por favor, selecione um assunto.');
            return false;
        }
        
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageInput, 'Por favor, escreva sua mensagem.');
            return false;
        }
        
        if (messageValue.length < 10) {
            showError(messageInput, 'A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }
        
        return true;
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Adiciona classe de erro ao campo
        input.classList.add('error');
        
        // Insere a mensagem de erro após o campo
        formGroup.appendChild(errorDiv);
    }
    
    function clearErrors() {
        // Remove todas as mensagens de erro
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Remove a classe de erro de todos os campos
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }
    
    // Validação em tempo real para melhor experiência do usuário
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('subject').addEventListener('change', validateSubject);
    document.getElementById('message').addEventListener('blur', validateMessage);
});
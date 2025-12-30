document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica do Modal ---
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.modal .close-btn');

    function openModal() {
        if (modal) modal.style.display = 'flex';
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    if (openBtn) openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // --- Lógica de Envio de E-mail com EmailJS ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalBtnText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            // --- PREENCHA SUAS CHAVES AQUI ---
            const serviceID = 'service_4lnsqr8';
            const templateID = 'template_ch193sv';
            const userID = 'rwZOhObLF6naw9hKQ'; // (Public Key)
            // ---------------------------------
            
            // Pega os dados do formulário
            const templateParams = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
            };

            emailjs.send(serviceID, templateID, templateParams, userID)
                .then((response) => {
                    // Sucesso
                    alert('E-mail recebido com sucesso! Entrarei em contato em breve.');
                    contactForm.reset();
                    closeModal();
                    btn.textContent = originalBtnText;
                    btn.disabled = false;
                }, (err) => {
                    // Erro
                    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
                    console.error('EmailJS Error:', err);
                    btn.textContent = originalBtnText;
                    btn.disabled = false;
                });
        });
    }
});
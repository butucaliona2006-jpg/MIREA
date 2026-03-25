document.addEventListener('DOMContentLoaded', () => {
    /* --- FUNCȚIONALITATE FORMULAR CONTACT (Cerută la Lab 3) --- */
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    // Verificăm dacă suntem pe pagina de contact (unde există formularul)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne reîncărcarea paginii

            // Preluarea datelor din formular
            const nume = document.getElementById('nume').value;
            const email = document.getElementById('email').value;
            const mesaj = document.getElementById('mesaj').value;
            
            // Afișarea răspunsului personalizat
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = `Mulțumim, <strong>${nume}</strong>! Mesajul tău a fost trimis cu succes. Vei primi un răspuns pe adresa <strong>${email}</strong>.`;
            
            // Resetarea formularului
            contactForm.reset();
        });
    }

    /* --- EFECTE VIZUALE (Cerute suplimentar la Lab 3) --- */
    // Efect discret de apariție (Fade-in) la scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicăm efectul pe elementele hero și cardurile din grid
    const faders = document.querySelectorAll('.hero, .grid .item');
    faders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

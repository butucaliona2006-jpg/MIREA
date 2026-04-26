document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll pentru ancore (Ex: butonul DISCOVER)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Efect de Fade-in la Scroll (Efect vizual Lab 3)
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

    // Aplicăm efectul pe hero și pe itemele din grid
    document.querySelectorAll('.hero, .item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

});
// === FORMULAR CONTACT (AJAX + PHP) ===
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nume = document.getElementById('nume').value;
        const email = document.getElementById('email').value;
        const mesaj = document.getElementById('mesaj').value;

        fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nume=${nume}&email=${email}&mesaj=${mesaj}`
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('responseMessage').innerHTML = data;
            form.reset();
        })
        .catch(() => {
            document.getElementById('responseMessage').innerHTML = "Eroare la trimitere!";
        });
    });
}

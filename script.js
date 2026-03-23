// ============================================
// 1. PROCESAREA FORMULARULUI DE CONTACT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Colectarea datelor din formular
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Validarea câmpurilor
            let errors = [];
            
            if (formData.name === '') {
                errors.push('Numele complet este obligatoriu');
            } else if (formData.name.length < 2) {
                errors.push('Numele trebuie să aibă cel puțin 2 caractere');
            }
            
            if (formData.email === '') {
                errors.push('Email-ul este obligatoriu');
            } else if (!isValidEmail(formData.email)) {
                errors.push('Introduceți o adresă de email validă');
            }
            
            if (formData.message === '') {
                errors.push('Mesajul este obligatoriu');
            } else if (formData.message.length < 10) {
                errors.push('Mesajul trebuie să aibă cel puțin 10 caractere');
            }
            
            // Afișarea rezultatului
            if (errors.length > 0) {
                displayMessage('error', errors.join('<br>'));
            } else {
                displayMessage('success', 
                    `✓ Mesaj trimis cu succes!<br><br>
                    <strong>Date trimise:</strong><br>
                    Nume: ${formData.name}<br>
                    Email: ${formData.email}<br>
                    Subiect: ${getSubjectText(formData.subject)}<br>
                    Mesaj: ${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}<br>
                    Newsletter: ${formData.newsletter ? 'DA' : 'NU'}<br><br>
                    Vă vom contacta în cel mai scurt timp!`
                );
                
                // Resetarea formularului
                contactForm.reset();
            }
        });
    }
    
    // Validare email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Obține text pentru subiect
    function getSubjectText(value) {
        const subjects = {
            'intrebare': 'Întrebare',
            'comanda': 'Comandă',
            'colaborare': 'Colaborare',
            'feedback': 'Feedback'
        };
        return subjects[value] || value;
    }
    
    // Afișează mesajul
    function displayMessage(type, text) {
        if (formMessage) {
            formMessage.innerHTML = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Ascunde mesajul după 5 secunde
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    }
});

// ============================================
// 2. EFECTE VIZUALE PENTRU PAGINI
// ============================================

// Efect de fade-in pentru elemente la încărcare
document.addEventListener('DOMContentLoaded', function() {
    // Adaugă clasă pentru animație la elementele principale
    const elementsToAnimate = document.querySelectorAll('.hero, .grid, .item');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Efect hover pentru link-uri din meniu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efect pentru grid items
    const gridItems = document.querySelectorAll('.item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.4s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// 3. EFECT DE TIPĂRIRE TEXT PENTRU HERO
// ============================================

// Funcționalitate opțională: efect de tipărire pentru titlul principal
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
        const originalText = heroTitle.innerText;
        heroTitle.setAttribute('data-typed', 'true');
        heroTitle.innerText = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.innerText += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
}

// Activează efectul doar pe pagina principală
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    setTimeout(addTypingEffect, 500);
}

// ============================================
// 4. CONTORIZARE VIZITATORI (folosind localStorage)
// ============================================

function updateVisitorCount() {
    let visits = localStorage.getItem('mirea_visits');
    if (visits === null) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('mirea_visits', visits);
    
    // Afișează contorul doar dacă există elementul
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) {
        counterElement.innerText = `Vizitatori: ${visits}`;
    }
}

// Actualizează contorul la încărcare
document.addEventListener('DOMContentLoaded', updateVisitorCount);

// ============================================
// 5. BUTON SCROLL SUS
// ============================================

function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollTopBtn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1a1a1a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// ============================================
// 6. EFECT DE LOADING PENTRU IMAGINI (dacă există)
// ============================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);
// ============================================
// 7. MODAL PENTRU LOOKBOOK
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('lookModal');
    const closeModal = document.querySelector('.close-modal');
    const lookItems = document.querySelectorAll('.lookbook-item');
    
    // Date pentru fiecare look
    const lookData = {
        1: {
            title: 'Look 01 - Eleganță urbană',
            description: 'O ținută perfectă pentru oraș, care combină confortul cu stilul rafinat.',
            details: 'Blazer crem, rochie midi neagră, botine din piele și geantă minimalistă.'
        },
        2: {
            title: 'Look 02 - Minimalism natural',
            description: 'Simplitate și naturalețe pentru zilele în care vrei să te simți liberă.',
            details: 'Pantaloni din in, cămașă albă oversized, sandale cu talpă joasă.'
        },
        3: {
            title: 'Look 03 - Serenity',
            description: 'Eleganță subtilă pentru momentele speciale.',
            details: 'Rochie fluidă în nuanțe neutre, bijuterii fine și clutch elegant.'
        }
    };
    
    if (lookItems.length > 0 && modal) {
        lookItems.forEach(item => {
            const lookNumber = item.getAttribute('data-look');
            const viewButton = item.querySelector('.view-detail');
            
            const showModal = () => {
                const data = lookData[lookNumber];
                if (data) {
                    document.getElementById('modalTitle').innerText = data.title;
                    document.getElementById('modalDescription').innerText = data.description;
                    document.getElementById('modalDetails').innerHTML = `
                        <div class="modal-details-content">
                            <p><strong>Piese componente:</strong></p>
                            <p>${data.details}</p>
                        </div>
                    `;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            };
            
            if (viewButton) {
                viewButton.addEventListener('click', showModal);
            }
            
            // Poți activa și la click pe întreg item-ul
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-detail')) {
                    showModal();
                }
            });
        });
        
        // Închide modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Închide la click în afara modal-ului
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Închide cu tasta Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// ============================================
// 8. EFECT DE TIPĂRIRE PENTRU COLEcȚIE
// ============================================

function addHoverDescription() {
    const items = document.querySelectorAll('.grid .item');
    const descriptions = {
        'Rochii': 'Descoperă rochiile elegante pentru orice ocazie',
        'Costume': 'Costume tailore pentru femei puternice',
        'Basics': 'Piese esențiale pentru garderoba ta',
        'Accesorii': 'Detalii care fac diferența',
        'New In': 'Cele mai noi tendințe',
        'Limited': 'Ediții limitate disponibile'
    };
    
    items.forEach(item => {
        const text = item.innerText.trim();
        if (descriptions[text]) {
            item.setAttribute('data-description', descriptions[text]);
            
            // Adaugă tooltip
            item.addEventListener('mouseenter', function() {
                const desc = this.getAttribute('data-description');
                if (desc && !this.querySelector('.tooltip')) {
                    const tooltip = document.createElement('span');
                    tooltip.className = 'tooltip';
                    tooltip.innerText = desc;
                    this.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                    }, 10);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', addHoverDescription);

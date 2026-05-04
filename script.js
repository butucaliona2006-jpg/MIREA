document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Coș de Cumpărături (Logica Magazin)
    let cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            
            cart.push({ name, price });
            renderCart();
        });
    });

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; opacity: 0.5;">Coșul este gol.</p>';
            totalPriceElement.innerText = '0';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `<span>${item.name}</span> <span>${item.price} MDL</span>`;
            cartItemsContainer.appendChild(itemDiv);
        });

        totalPriceElement.innerText = total;
    }

    // 3. Finalizare Comandă (AJAX)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Adăugați cel puțin un produs în coș!");
                return;
            }

            fetch('comanda.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produse: cart })
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('order-status').innerHTML = data;
                cart = []; // Golim coșul după succes
                renderCart();
            })
            .catch(() => {
                document.getElementById('order-status').innerHTML = "Eroare la procesarea comenzii.";
            });
        });
    }

    // 4. Formular Contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new URLSearchParams();
            formData.append('nume', document.getElementById('nume').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('mesaj', document.getElementById('mesaj').value);

            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(data => {
                document.getElementById('responseMessage').innerHTML = data;
                contactForm.reset();
            });
        });
    }
});

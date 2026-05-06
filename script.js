// 1. Inițializăm variabila cart cu datele salvate, folosind un singur nume cheie: 'mirea_cart'
let cart = JSON.parse(localStorage.getItem('mirea_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Actualizăm afișarea coșului (numărul de pe iconiță și lista dacă suntem pe pagina cos.html)
    updateCart();

    // 2. Gestionăm butoanele "Adaugă în coș"
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            addToCart(name, price);
        });
    });

    // 3. Gestionare Formular Contact (dacă există în pagină)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const submitBtn = document.getElementById('submitBtn');
            
            submitBtn.innerText = "SE TRIMITE...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("contact.php", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    document.getElementById('responseMessage').innerHTML = "<span style='color: green;'>Mesaj salvat și trimis!</span>";
                    contactForm.reset();
                } else {
                    document.getElementById('responseMessage').innerHTML = "<span style='color: red;'>Eroare la server.</span>";
                }
            } catch (error) {
                document.getElementById('responseMessage').innerHTML = "<span style='color: red;'>Eroare de conexiune.</span>";
            } finally {
                submitBtn.innerText = "TRIMITE";
                submitBtn.disabled = false;
            }
        });
    }
});

// 4. Funcția principală de adăugare
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    alert(`Produsul "${name}" a fost adăugat în coș!`);
}

// 5. Funcția de actualizare vizuală și salvare
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // Actualizăm badge-ul (numărul de lângă iconiță)
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }

    // Salvăm în localStorage
    localStorage.setItem('mirea_cart', JSON.stringify(cart));

    // Dacă suntem pe pagina cos.html, afișăm lista
    if (cartItemsContainer && cartTotalElement) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="opacity: 0.5;">Coșul este momentan gol.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = "cart-item-row"; // Poți stiliza asta în CSS
                itemDiv.style.display = "flex";
                itemDiv.style.justifyContent = "space-between";
                itemDiv.style.margin = "10px 0";
                itemDiv.innerHTML = `
                    <span>${item.name}</span> 
                    <span><strong>${item.price} MDL</strong> 
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">[X]</button></span>
                `;
                cartItemsContainer.appendChild(itemDiv);
                total += item.price;
            });
        }
        cartTotalElement.innerText = total;
    }
}

// 6. Funcția de eliminare produs
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// 7. Funcția de finalizare comandă (Trimite către comanda.php)
async function checkout() {
    if (cart.length === 0) {
        alert("Coșul tău este gol!");
        return;
    }

    try {
        const response = await fetch('comanda.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produse: cart })
        });

        const result = await response.text();
        if (response.ok) {
            document.body.innerHTML = result; // Afișează mesajul de succes din PHP
            cart = [];
            localStorage.removeItem('mirea_cart');
        } else {
            alert("Eroare la procesarea comenzii.");
        }
    } catch (error) {
        alert("Eroare de conexiune cu serverul.");
    }
}

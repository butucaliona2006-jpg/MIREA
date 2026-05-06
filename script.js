let cart = JSON.parse(localStorage.getItem('mirea_cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="opacity: 0.5;">Coșul este momentan gol.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = "flex";
            itemDiv.style.justifyContent = "center";
            itemDiv.style.gap = "15px";
            itemDiv.style.margin = "10px 0";
            itemDiv.innerHTML = `
                <span>${item.name}</span> 
                <strong>${item.price} MDL</strong>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">[X]</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });
    }
    cartTotalElement.innerText = total;
    localStorage.setItem('mirea_cart', JSON.stringify(cart));
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// FUNCȚIA DE COMANDĂ - Trimite către baza de date locală
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
            document.body.innerHTML = result;
            cart = [];
            localStorage.removeItem('mirea_cart');
        } else {
            alert("Eroare la procesarea comenzii.");
        }
    } catch (error) {
        alert("Eroare de conexiune cu serverul local.");
    }
}

// GESTIONARE CONTACT - Trimite către PHP local (care va trimite apoi la Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const submitBtn = document.getElementById('submitBtn');
        
        submitBtn.innerText = "SE TRIMITE...";
        submitBtn.disabled = true;

        try {
            // Trimitem datele către contact.php-ul tău local
            const response = await fetch("contact.php", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                document.getElementById('responseMessage').innerHTML = "<span style='color: green;'>Mesaj salvat local și trimis pe email!</span>";
                contactForm.reset();
            } else {
                document.getElementById('responseMessage').innerHTML = "<span style='color: red;'>Eroare la salvarea mesajului.</span>";
            }
        } catch (error) {
            document.getElementById('responseMessage').innerHTML = "<span style='color: red;'>Eroare de conexiune.</span>";
        } finally {
            submitBtn.innerText = "TRIMITE";
            submitBtn.disabled = false;
        }
    });
}

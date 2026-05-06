// Încărcăm coșul din memoria browserului când se deschide pagina
let cart = JSON.parse(localStorage.getItem('mirea_cart')) || [];

// Funcția de adăugare în coș
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        cart.push({ name, price });
        updateCart();
    });
});

// Funcția care actualizează afișarea și salvează datele
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if(!cartItems || !cartTotal) return; // Siguranță în caz că elementele nu există pe pagină

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('div');
        li.style.margin = "10px 0";
        li.innerHTML = `${item.name} - ${item.price} MDL <button onclick="removeItem(${index})" style="margin-left:10px; cursor:pointer;">X</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.innerText = `TOTAL: ${total} MDL`;
    
    // SALVĂM în memoria browserului ca să fie disponibil pe cealaltă pagină
    localStorage.setItem('mirea_cart', JSON.stringify(cart));
}

// Funcție pentru ștergerea unui produs
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Funcția de finalizare (opțional)
function checkout() {
    if (cart.length === 0) {
        alert("Coșul este gol!");
    } else {
        alert("Comanda a fost trimisă! Vă mulțumim.");
        cart = []; // Golim coșul după comandă
        updateCart();
    }
}

// Apelăm updateCart la început pentru a afișa ce era deja în coș
updateCart();

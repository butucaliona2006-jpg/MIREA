// 1. Încărcăm datele salvate anterior sau un coș gol
let cart = JSON.parse(localStorage.getItem('mirea_cart')) || [];

// 2. Ascultăm click-urile pe butoanele "Adaugă în coș"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        cart.push({ name, price });
        updateCart();
    });
});

// 3. Funcția care desenează coșul și calculează totalul
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
    
    // 4. SALVĂM coșul în memoria browserului (LocalStorage)
    localStorage.setItem('mirea_cart', JSON.stringify(cart));
}

// Funcție pentru ștergere
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Funcție finalizare
function checkout() {
    if (cart.length === 0) {
        alert("Coșul tău este gol!");
    } else {
        alert("Comanda a fost recepționată! Vă mulțumim.");
        cart = [];
        updateCart();
    }
}

// Apelăm la încărcarea paginii ca să vedem produsele adăugate anterior
window.onload = updateCart;

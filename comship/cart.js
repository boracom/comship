// Sepetteki Ürünleri Yükleme
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; // Önce içeriği temizle

    let totalQuantity = 0;
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sepetiniz boş.</p>';
    }

    cartItems.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="images/product${item.id}.jpg" alt="${item.name}" class="cart-item-image">
                <span>${item.name}</span>
                <span>${item.quantity} x ₺${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart('${item.id}')">Kaldır</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Sepet toplam bilgilerini güncelle
    totalQuantityElement.textContent = `Ürün Sayısı: ${totalQuantity}`;
    totalPriceElement.textContent = `Toplam Fiyat: ₺${totalPrice.toFixed(2)}`;
}

// Sepetten Ürün Kaldırma
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems = cartItems.filter(item => item.id !== productId);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}

// Sayfa Yüklendiğinde Sepeti Yükle
window.onload = function() {
    loadCartItems(); // Sepet öğelerini yükle
};

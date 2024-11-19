// Sepete ürün eklemek için kullanılan fonksiyon
function addToCart(button) {
    // HTML butonundan ürün bilgilerini al
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Sepetteki ürünleri (localStorage'dan alıyoruz ya da boşsa yeni bir array oluşturuyoruz)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Ürün sepete zaten eklenmişse miktarını artır
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Ürün sepete eklenmemişse yeni ürün ekle
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Sepeti güncelle
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Kullanıcıya bilgi ver
    alert(`${productName} sepete eklendi!`);
    updateCartUI(); // Sepet arayüzünü güncelle
}

// Sepet arayüzünü güncelleme fonksiyonu
function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Sepet içeriğini temizle

    let total = 0;

    // Sepetteki Her Ürün için Bir Eleman Oluştur
    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x ₺${item.price.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">Kaldır</button>
        `;
        cartItemsContainer.appendChild(productElement);
    });

    // Toplam Tutarı Güncelle
    totalPriceContainer.textContent = `Toplam Tutar: ₺${total.toFixed(2)}`;
    
    // Sepetteki Ürün Sayısını Güncelle
    updateCartIcon();
}

// Sepetten ürün silmek için kullanılan fonksiyon
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Ürün sepette bulunuyorsa
    const updatedCartItems = cartItems.filter(item => item.id !== productId);

    // Sepeti güncelle
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartUI(); // Sepet arayüzünü güncelle
}

// Sepet ikonunu güncelleme fonksiyonu
function updateCartIcon() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartIcon = document.getElementById('cart-icon'); // Sepet ikonu burada bir ID ile olmalı

    // Sepetteki toplam öğe sayısını göster
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartIcon.textContent = totalItems > 0 ? totalItems : ''; // Sepet ikonunda toplam ürün sayısı
}

// Sepeti Temizle Butonuna Olay Dinleyicisi Ekle
document.getElementById('clear-cart-btn').addEventListener('click', function () {
    if (confirm('Sepeti temizlemek istediğinizden emin misiniz?')) {
        localStorage.removeItem('cartItems'); // Sepeti temizle
        updateCartUI(); // Arayüzü güncelle
    }
});

// Sayfa yüklendiğinde sepet ikonunu güncelle
window.onload = function() {
    updateCartUI();
    updateCartIcon();
};

// Sepete Ekle Butonlarına Olay Dinleyicisi Ekle
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        addToCart(this);
    });
});

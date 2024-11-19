// Banner Görseli Değiştirme
const images = ['images/banner-1.jpg', 'images/banner-2.jpg', 'images/banner-3.jpg'];
let currentIndex = 0;

function changeBanner() {
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
}

changeBanner();
setInterval(changeBanner, 8000);

// Sepet Verilerini Saklama
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sepeti Güncelleme
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Sepetteki ürün sayısını güncelle

    const cartContainer = document.getElementById('cart-container');
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <h2>Sepetiniz Boş</h2>
            <img src="images/empty-cart.jpg" alt="Boş Sepet" width="500" height="500">
        `;
    } else {
        const itemsHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} ₺</p>
                    <input type="number" value="${item.quantity}" min="1" class="quantity" data-id="${item.id}">
                    <button class="remove-item" data-id="${item.id}">Kaldır</button>
                </div>
            </div>
        `).join('');

        cartContainer.innerHTML = `
            <div class="cart-items">
                ${itemsHTML}
            </div>
            <div class="cart-summary">
                <h3>Ödeme Özeti</h3>
                <p>Toplam Fiyat: <span id="total-price">${calculateTotalPrice(cart)} ₺</span></p>
                <button id="checkout-btn">Ödeme Yap</button>
            </div>
        `;
    }
}

// Toplam Fiyat Hesaplama
function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Sepete Ürün Ekleme
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // Eğer ürün zaten sepette varsa, miktarını artır
        existingItem.quantity += 1;
    } else {
        // Eğer ürün sepette yoksa, yeni bir ürün ekle
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(product);
    }
    updateCartInLocalStorage(); // Sepeti localStorage'a kaydet
    updateCartDisplay(); // Sepeti görüntüle
    alert(`${productName} sepete eklendi!`);
}

// Sepetten Öğeleri Kaldırma
function removeItemFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); // Öğeyi sepetten kaldır
        updateCartInLocalStorage(); // Sepeti localStorage'a kaydet
        updateCartDisplay(); // Sepeti tekrar görüntüle
    }
}

// Sepet Verisini localStorage'a Kaydetme
function updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Sepet Görüntüleme ve Boş Kontrolü
window.onload = function() {
    updateCartDisplay(); // Sayfa yüklendiğinde sepeti güncelle
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });

    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
};

// Ürün Miktarını Güncelleme
function updateQuantity(event) {
    const productId = event.target.getAttribute('data-id');
    const newQuantity = parseInt(event.target.value);
    
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity >= 1) {
        item.quantity = newQuantity;
        updateCartInLocalStorage(); // Sepeti güncelle
        updateCartDisplay(); // Sepeti tekrar render et
    }
}

// Öne Çıkan Ürünler için Sepete Ekleme İşlevi
const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);
        const productImage = this.dataset.image;
        addToCart(productId, productName, productPrice, productImage);
    });
});

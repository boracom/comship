// Sepet Verilerini LocalStorage'dan Al veya Başlangıç Değeri
let sepet = JSON.parse(localStorage.getItem('cart')) || [];

// Sepete Ekle Butonlarına Olay Dinleyicisi Ekle
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        // Ürün Verilerini Butondan Al
        const productId = this.dataset.id;
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);

        // Ürün Zaten Sepette mi Kontrol Et
        const existingProduct = sepet.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1; // Eğer sepette varsa miktarını artır
        } else {
            // Yeni Ürünü Sepete Ekle
            sepet.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Sepeti Güncelle ve LocalStorage'a Kaydet
        updateCartUI();
        saveCart();
    });
});

// Sepet Arayüzünü Güncelleyen İşlev
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price'); // Toplam fiyat alanı
    cartItemsContainer.innerHTML = ''; // Önce içeriği temizle

    let total = 0;

    // Sepetteki Her Ürün için Bir Eleman Oluştur
    sepet.forEach(item => {
        total += item.price * item.quantity;

        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x ₺${item.price.toFixed(2)}</span>
            <button class="remove-item" data-id="${item.id}">Kaldır</button>
        `;
        cartItemsContainer.appendChild(productElement);
    });

    // Toplam Tutarı Güncelle
    totalPriceContainer.textContent = `Toplam Tutar: ₺${total.toFixed(2)}`;
    
    // Sepetteki Ürün Sayısını Güncelle
    updateCartIcon();
}

// Sepeti Temizle Butonuna Olay Dinleyicisi Ekle
document.getElementById('clear-cart-btn').addEventListener('click', function () {
    if (confirm('Sepeti temizlemek istediğinizden emin misiniz?')) {
        sepet = []; // Sepeti tamamen boşalt
        updateCartUI(); // Arayüzü güncelle
        saveCart(); // LocalStorage'ı temizle
        alert('Sepet temizlendi!');
    }
});

// "Satın Al" Butonuna Olay Dinleyicisi Ekle
document.getElementById('checkout-btn').addEventListener('click', function () {
    if (sepet.length === 0) {
        alert('Sepetiniz boş!');
    } else {
        // Ödeme işlemi simülasyonu
        alert('Satın alma işleminiz başarılı!');

        // Sepeti temizle ve arayüzü güncelle
        sepet = [];
        updateCartUI();
        saveCart();
    }
});

// Sepeti LocalStorage'a Kaydet
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(sepet));
}

// Sepet İkonunu Güncelle
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    const totalItems = sepet.reduce((total, item) => total + item.quantity, 0);
    cartIcon.textContent = totalItems > 0 ? totalItems : ''; // Sepet ikonunda toplam ürün sayısı
}

// Sayfa Yüklendiğinde Arayüzü Güncelle
window.onload = function () {
    updateCartUI();
    updateCartIcon();
};

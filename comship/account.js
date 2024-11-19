// Sayfa Yüklendiğinde Kullanıcı Bilgilerini Getir
window.onload = function() {
    loadUserData();
};

// Kullanıcı Bilgilerini Yükle (Örnek Veritabanı)
function loadUserData() {
    // Burada veritabanından gelen verileri simüle ediyoruz. Gerçek kullanımda, AJAX veya API ile veriler çekilecektir.
    const userData = {
        username: "JohnDoe",
        address: "İstanbul, Türkiye",
        phone: "0532 123 45 67"
    };

    // Kullanıcı bilgilerini formda göster
    document.getElementById('username').value = userData.username;
    document.getElementById('address').value = userData.address;
    document.getElementById('phone').value = userData.phone;
}

// Kaydet Butonuna Tıklandığında Veritabanına Kaydet
document.getElementById('save-btn').addEventListener('click', function() {
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Veritabanına kaydetme işlemi burada yapılacak
    // Bu örnekte, verilerin konsola yazdırıldığını görebilirsiniz
    console.log("Yeni Adres:", address);
    console.log("Yeni Telefon Numarası:", phone);

    // Örnek olarak, veri kaydedildikten sonra kullanıcıya bir mesaj gösteriyoruz
    alert("Bilgileriniz başarıyla kaydedildi!");

    // Gerçek veritabanı işlemleri için AJAX veya API kullanılır
});

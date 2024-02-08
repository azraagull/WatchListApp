# WatchListApp

Watchlist, React, Tailwind CSS ve Express.js kullanılarak geliştirilmiş bir web uygulamasıdır. Bu uygulama sayesinde favori oyuncularınızın, filmlerinizin ve dizilerinizin bilgilerini alabilir, izleme listesi oluşturabilir ve izlediklerinizi planlayabilirsiniz.

## Başlangıç

Projenin yerel bir ortamda çalıştırılması için aşağıdaki adımları takip edebilirsiniz.

### İlk Adımlar

1. Proje dizinine gidin:

   ```bash
   cd WatchListApp
   
2. İstemci (client) ve sunucu (server) klasörlerinde sırasıyla gerekli bağımlılıkları yükleyin:

   ```bash
   cd client
   npm install

   ```bash
   cd server
   npm install

3. `.env` dosyanızı oluşturun:
   ```bash
   MONGODB_URI=yourMongoDbUri
   RAPIDAPI_KEY=yourRapidApiKey
   RAPIDAPI_HOST=moviesdatabase.p.rapidapi.com
   JWT_SECRET=yourJwtSecretKey

### Kullanım

Watchlist projesi, aşağıdaki temel özelliklere sahiptir:

- Oyuncu Bilgileri: Favori oyuncularınızın biyografilerini, filmografi bilgilerini ve diğer detayları alabilirsiniz.

- Film ve Dizi Bilgileri: İzlemek istediğiniz veya izlediğiniz filmlerin ve dizilerin bilgilerini görüntüleyebilirsiniz.

- İzleme Listesi Oluşturma: Beğendiğiniz içerikleri izleme listesine ekleyerek daha sonra izlemek üzere kaydedebilirsiniz.

- İzleme Planı: İzleme listesine eklenen içerikleri planlayarak hangi gün ne izleyeceğinizi belirleyebilirsiniz

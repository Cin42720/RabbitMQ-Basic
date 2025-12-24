# RabbitMQ Basit Örnekleri

Bu proje, RabbitMQ mesaj kuyruğu sistemini öğrenmek için basit Node.js örnekleri içerir.

## Proje Hakkında

RabbitMQ, mesaj kuyruğu (message queue) sistemi için kullanılan açık kaynaklı bir yazılımdır. Bu proje, RabbitMQ'nun temel kullanımını gösteren basit örnekler içerir.

## Gereksinimler

- **Node.js** (v10 veya üzeri)
- **Erlang/OTP** (RabbitMQ'nun çalışması için gerekli)
- **RabbitMQ Server** (yerel olarak kurulu ve çalışır durumda)

### Erlang Hakkında ve Kurulumu

RabbitMQ, **Erlang** programlama dili ile yazılmıştır. Erlang, yüksek kullanılabilirlik ve dağıtık sistemler için tasarlanmış fonksiyonel bir programlama dilidir. RabbitMQ'nun çalışabilmesi için sisteminizde Erlang Runtime (ERL) kurulu olması gerekmektedir.

**Windows için Erlang Kurulumu:**
```bash
# Erlang/OTP'yi indirin ve kurun
# https://www.erlang.org/downloads
# veya
# https://github.com/erlang/otp/releases

# Kurulum sonrası versiyonu kontrol edin
erl -version
```

**Not:** RabbitMQ'nun çalışması için genellikle Erlang/OTP 23.2 veya üzeri bir sürüm gereklidir. RabbitMQ kurulum paketleri genellikle uyumlu Erlang sürümünü otomatik olarak içerir, ancak manuel kurulum yapıyorsanız Erlang'ın önce kurulması önerilir.

### RabbitMQ Kurulumu

**Windows:**
```bash
# RabbitMQ Server'ı indirin ve kurun
# https://www.rabbitmq.com/download.html
# Not: RabbitMQ kurulum paketi genellikle uyumlu Erlang sürümünü içerir

# Management UI'yi etkinleştirin
rabbitmq-plugins enable rabbitmq_management
```

### Management Plugin ve Web UI

RabbitMQ Management Plugin, RabbitMQ sunucusunu web arayüzü üzerinden yönetmenizi sağlayan önemli bir eklentidir. **Bu plugin etkinleştirilmediği takdirde, http://localhost:15672 adresine eriştiğinizde herhangi bir web arayüzü (UI) görünmeyecektir.** Management Plugin olmadan RabbitMQ'yu yalnızca komut satırı üzerinden yönetebilirsiniz.

**Management Plugin'i Etkinleştirme:**

```bash
# Plugin'i etkinleştir
rabbitmq-plugins enable rabbitmq_management

# Etkinleştirme sonrası RabbitMQ servisini yeniden başlatın (Windows)
net stop RabbitMQ
net start RabbitMQ

# veya PowerShell ile
Restart-Service RabbitMQ
```

**Plugin Durumunu Kontrol Etme:**

```bash
# Tüm plugin'lerin durumunu görüntüle
rabbitmq-plugins list

# Management plugin'in etkin olduğunu doğrula (liste içinde [E] işareti görünmeli)
```

**Management UI Erişimi:**

Plugin başarıyla etkinleştirildikten ve RabbitMQ servisi yeniden başlatıldıktan sonra:
- **URL:** http://localhost:15672
- **Varsayılan Kullanıcı Adı:** guest
- **Varsayılan Şifre:** guest

**Management Plugin Çalışmıyorsa:**

1. RabbitMQ servisinin çalıştığından emin olun:
   ```bash
   net start RabbitMQ
   ```

2. Plugin'in doğru şekilde etkinleştirildiğini kontrol edin:
   ```bash
   rabbitmq-plugins list | findstr management
   ```

3. Port 15672'nin başka bir uygulama tarafından kullanılmadığından emin olun:
   ```bash
   netstat -ano | findstr :15672
   ```

4. Windows Firewall'un port 15672'yi engellemediğinden emin olun

5. Eğer hala çalışmıyorsa, plugin'i devre dışı bırakıp tekrar etkinleştirin:
   ```bash
   rabbitmq-plugins disable rabbitmq_management
   rabbitmq-plugins enable rabbitmq_management
   net stop RabbitMQ
   net start RabbitMQ
   ```

**Management UI Özellikleri:**

Management Plugin etkin olduğunda web arayüzü üzerinden şunları yapabilirsiniz:
- Queue'ları görüntüleme ve yönetme
- Mesajları izleme ve test etme
- Bağlantıları ve kanalları görüntüleme
- Kullanıcı ve izinleri yönetme
- Sistem kaynaklarını izleme
- Exchange ve binding'leri yönetme

## Kurulum

```bash
# Bağımlılıkları yükleyin
npm install
```

## Kullanım

### 1. Consumer'ı Başlatın (Mesaj Alıcı)

**Terminal 1:**
```bash
npm run consumer
```

veya

```bash
node consumer.js
```

Consumer başladığında şu mesajı göreceksiniz:
```
mesaj beklemede...
```

### 2. Publisher'ı Başlatın (Mesaj Gönderen)

**Terminal 2:**
```bash
npm run publisher
```

veya

```bash
node publisher.js
```

Publisher başladığında her 1ms'de bir mesaj gönderecek:
```
Mesaj başarılı { description: 'bu bir test mesajı' }
```

### 3. Sonuçları İzleyin

Consumer terminalinde mesajları göreceksiniz:
```
mesaj beklemede...
messege {"description":"bu bir test mesajı"}
messege {"description":"bu bir test mesajı"}
...
```

## Özelleştirme

### Farklı Queue Adı Kullanma

```bash
# Publisher
node publisher.js MyCustomQueue

# Consumer
node consumer.js MyCustomQueue
```

### Mesaj İçeriğini Değiştirme

`publisher.js` dosyasındaki `messege` objesini düzenleyin:

```javascript
const messege = {
    description: "Özel mesajınız",
    timestamp: new Date().toISOString(),
    data: { /* istediğiniz veriler */ }
};
```

## Proje Yapısı

```
RabbitMQ/
├── publisher.js          # Mesaj gönderen (Producer)
├── consumer.js           # Mesaj alan (Consumer)
├── package.json          # Node.js bağımlılıkları
├── package-lock.json     # Bağımlılık kilidi
└── node_modules/         # Node.js paketleri (git'e eklenmez)
```

## Nasıl Çalışır?

1. **Publisher** → RabbitMQ'ya mesaj gönderir → `TestQueue` queue'suna ekler
2. **Consumer** → Queue'dan mesajları okur → Konsola yazdırır → Mesajı onaylar (ack)

### Queue Yönetimi

RabbitMQ Management UI'dan queue'ları görüntüleyebilirsiniz:
- http://localhost:15672
- Queues sekmesinden `TestQueue` queue'sunu görebilirsiniz

## Öğrenilen Kavramlar

- RabbitMQ bağlantısı kurma
- Queue oluşturma (`assertQueue`)
- Mesaj gönderme (`sendToQueue`)
- Mesaj alma (`consume`)
- Mesaj onaylama (`ack`)

## Sorun Giderme

**RabbitMQ bağlantı hatası:**
- RabbitMQ servisinin çalıştığından emin olun
- `net start RabbitMQ` (Windows) ile servisi başlatın
- Erlang Runtime'ın kurulu olduğundan emin olun (`erl -version` ile kontrol edin)

**Erlang kurulum sorunları:**
- RabbitMQ kurulumu sırasında Erlang bulunamazsa, önce Erlang/OTP'yi manuel olarak kurun
- Sistem PATH değişkeninde Erlang'ın doğru şekilde tanımlı olduğundan emin olun

**Management UI görünmüyor (http://localhost:15672 erişilemiyor):**
- Management Plugin'in etkinleştirildiğinden emin olun (`rabbitmq-plugins list` ile kontrol edin)
- RabbitMQ servisini yeniden başlatın (`net stop RabbitMQ` ve `net start RabbitMQ`)
- Port 15672'nin başka bir uygulama tarafından kullanılmadığını kontrol edin
- Windows Firewall ayarlarını kontrol edin
- Tarayıcıda farklı bir port deneyin veya RabbitMQ log dosyalarını kontrol edin

**Mesajlar görünmüyor:**
- Consumer'ın çalıştığından emin olun
- Queue adının aynı olduğunu kontrol edin

## Lisans

ISC

## Geliştirici Notları

Bu proje, RabbitMQ'nun temel kullanımını öğrenmek için oluşturulmuştur. Production ortamında kullanmadan önce hata yönetimi, bağlantı yönetimi ve güvenlik önlemleri eklenmelidir.

## Hazırlayan

Hüseyin Emre Ustaer

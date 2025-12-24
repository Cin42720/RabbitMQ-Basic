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

**Management UI:** http://localhost:15672 (varsayılan: guest/guest)

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

**Mesajlar görünmüyor:**
- Consumer'ın çalıştığından emin olun
- Queue adının aynı olduğunu kontrol edin

## Lisans

ISC

## Geliştirici Notları

Bu proje, RabbitMQ'nun temel kullanımını öğrenmek için oluşturulmuştur. Production ortamında kullanmadan önce hata yönetimi, bağlantı yönetimi ve güvenlik önlemleri eklenmelidir.

## Hazırlayan

Hüseyin Emre Ustaer

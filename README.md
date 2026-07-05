# Vantor

## English

Vantor is a domain-neutral Next.js application foundation built for public
pages, authenticated product areas, and admin screens. It provides the
application shell, theme, routing structure, metadata layer, form foundation,
and reusable interface pieces that are usually rebuilt at the start of every
product, so teams can move faster into the actual business logic.

The project is not tied to a specific industry or business model. It can be
used as a clean starting point for CRM systems, SaaS dashboards, operations
tools, customer portals, internal admin panels, MVPs, and enterprise web
applications.

### What It Provides

- Public, authenticated, and admin route groups on the Next.js App Router
- A premium, restrained interface system with a dark-theme-first direction
- Reusable `components/core` UI primitives
- Form components compatible with React Hook Form and Zod
- Core interface elements such as toast, dialog, dropdown, tabs, table, badge,
  card, switch, and date picker
- Built-in Turkish and English i18n structure
- Cookie-based access checks for user and admin areas
- Separate layouts and shells for public, authenticated, and admin surfaces
- Page metadata, sitemap, robots, manifest, and `llms.txt` foundations
- Domain-neutral placeholder screens and sample data areas

### Default Surfaces

Vantor recognizes three main surfaces by default:

- **Public area**: Open screens such as the landing page and login page.
- **Authenticated area**: Protected application screens such as dashboard,
  workspace, and settings for signed-in users.
- **Admin area**: Management screens such as admin login, overview, users, and
  settings.

This separation keeps marketing/public pages, the user-facing product, and the
internal management panel clearly isolated while the product grows.

### What You Can Build With It

Vantor can be used as a fast foundation for:

- **SaaS applications**: Subscription-based products with sign-in, dashboard,
  settings, and admin management.
- **CRM systems or customer portals**: Products with customer, company, offer,
  support ticket, or tracking screens.
- **Operations panels**: Internal tools for tasks, workflows, inventory, teams,
  requests, or approval flows.
- **Admin dashboards**: Management panels for users, roles, system status, and
  core metrics.
- **MVP prototypes**: Product ideas that need a professional shell before the
  domain is fully finalized.
- **Enterprise application foundations**: Multi-screen web applications that
  can be expanded around departments or business processes.

### What Is Intentionally Not Included

Vantor is a template, so it leaves product-specific business logic to you. The
following concerns are intentionally not included:

- Firebase or any other authentication provider integration
- Real user, role, and permission data models
- Domain-specific API routes
- Ready-made workflows for AI, kanban, project management, waitlists, or account
  products
- Product-specific stores, services, and data layers
- Monitoring, analytics, or production authentication policies

This keeps the project easier to adapt across different domains.

### Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- React Hook Form
- Zod
- Framer Motion
- `next-themes`

### Project Structure

```text
src/app
  (public)        Public pages
  (auth)          Protected user application area
  (admin)         Admin login and admin shell

src/features/routes
  public          Public screen modules
  auth            User screen modules
  admin           Admin screen modules

src/components/core
  Core UI components

src/components/forms
  Form foundation and field components

src/lib
  Metadata, locale, auth session, and helper functions
```

### Installation

```bash
npm install
npm run dev
```

The application runs at `http://localhost:3000` by default.

### Available Commands

```bash
npm run dev             # Development server
npm run build           # Production build
npm run start           # Production server
npm run type-check      # TypeScript check
npm run metadata:check  # Route metadata check
```

### Where to Start Development

1. Update the relevant public, authenticated, or admin screen under
   `src/features/routes` for your product.
2. Use the `src/components/core` primitives to build new screens consistently.
3. Add the real authentication provider, data source, and API routes for your
   domain.
4. Update site and page metadata in `src/lib/metadata/site-metadata.ts` for your
   brand.
5. Adapt Turkish and English copy from `src/features/routes/**/i18n` to your
   product language.

### License

This repository is prepared as a private application template. Usage and
distribution terms should be clarified according to the license policy defined
by the project owner.

---

## Türkçe

Vantor, public sayfalar, kullanıcıya özel uygulama alanları ve admin ekranları
için hazırlanmış, domain bağımsız bir Next.js uygulama temelidir. Her ürünün
başında tekrar tekrar kurulan uygulama kabuğunu, tema yapısını, route düzenini,
metadata katmanını, form temelini ve yeniden kullanılabilir arayüz parçalarını
hazır getirir; böylece ekipler asıl iş mantığına daha hızlı geçebilir.

Bu proje belirli bir sektöre veya iş modeline bağlı değildir. CRM sistemleri,
SaaS panelleri, operasyon araçları, müşteri portalları, internal admin
panelleri, MVP'ler ve kurumsal web uygulamaları için temiz bir başlangıç
noktası olarak kullanılabilir.

### Neler Sunar?

- Next.js App Router üzerinde public, auth ve admin route grupları
- Karanlık tema öncelikli, premium ve sade bir arayüz sistemi
- Tekrar kullanılabilir `components/core` UI bileşenleri
- React Hook Form ve Zod ile uyumlu form bileşenleri
- Toast, dialog, dropdown, tabs, table, badge, card, switch ve date picker gibi
  temel arayüz parçaları
- Türkçe ve İngilizce için hazır i18n yapısı
- Kullanıcı ve admin alanları için cookie tabanlı erişim kontrolleri
- Public, kullanıcı ve admin yüzeyleri için ayrı layout ve kabuk yapıları
- Sayfa metadata, sitemap, robots, manifest ve `llms.txt` temeli
- Domain bağımsız placeholder ekranlar ve örnek veri alanları

### Varsayılan Yüzeyler

Vantor, üç ana yüzeyi varsayılan olarak tanır:

- **Public alan**: Landing page ve login sayfası gibi herkese açık ekranlar.
- **Auth alanı**: Giriş yapmış kullanıcılar için dashboard, workspace ve
  ayarlar gibi korumalı uygulama ekranları.
- **Admin alanı**: Admin login, genel bakış, kullanıcılar ve ayarlar gibi
  yönetim ekranları.

Bu ayrım, ürün büyürken pazarlama/public sayfalarını, kullanıcıya dönük ürünü
ve iç yönetim panelini net şekilde ayrı tutar.

### Bu Proje ile Neler Yapılabilir?

Vantor aşağıdaki ürün tipleri için hızlı bir temel olabilir:

- **SaaS uygulamaları**: Üye girişi, dashboard, ayarlar ve admin yönetimi olan
  abonelik tabanlı ürünler.
- **CRM sistemleri veya müşteri portalları**: Müşteri, firma, teklif, destek
  kaydı veya takip ekranları olan ürünler.
- **Operasyon panelleri**: Görev, iş akışı, stok, ekip, talep veya onay
  süreçleri için internal araçlar.
- **Admin dashboard'ları**: Kullanıcı, rol, sistem durumu ve temel metriklerin
  yönetildiği paneller.
- **MVP prototipleri**: Domaini tam netleşmeden önce profesyonel bir kabuğa
  ihtiyaç duyan ürün fikirleri.
- **Kurumsal uygulama temelleri**: Departmanlara veya iş süreçlerine göre
  genişletilebilen çok ekranlı web uygulamaları.

### Bilerek Eklenmeyenler

Vantor bir template olduğu için ürüne özel iş mantığını size bırakır. Aşağıdaki
konular bilinçli olarak dahil edilmemiştir:

- Firebase veya başka bir authentication provider entegrasyonu
- Gerçek kullanıcı, rol ve yetki veri modelleri
- Domain spesifik API route'ları
- AI, kanban, proje yönetimi, waitlist veya account ürünleri için hazır iş
  akışları
- Ürüne özel store, servis ve veri katmanları
- Monitoring, analytics veya production authentication politikaları

Bu tercih, projenin farklı domainlere daha kolay uyarlanmasını sağlar.

### Teknoloji Yığını

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Lucide React ikonları
- React Hook Form
- Zod
- Framer Motion
- `next-themes`

### Proje Yapısı

```text
src/app
  (public)        Herkese açık sayfalar
  (auth)          Korumalı kullanıcı uygulama alanı
  (admin)         Admin login ve admin shell

src/features/routes
  public          Public ekran modülleri
  auth            Kullanıcı ekran modülleri
  admin           Admin ekran modülleri

src/components/core
  Temel UI bileşenleri

src/components/forms
  Form altyapısı ve alan bileşenleri

src/lib
  Metadata, locale, auth session ve yardımcı fonksiyonlar
```

### Kurulum

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

### Kullanılabilir Komutlar

```bash
npm run dev             # Geliştirme sunucusu
npm run build           # Production build
npm run start           # Production sunucusu
npm run type-check      # TypeScript kontrolü
npm run metadata:check  # Route metadata kontrolü
```

### Geliştirmeye Nereden Başlanır?

1. `src/features/routes` altında ilgili public, auth veya admin ekranını
   ürününüze göre güncelleyin.
2. Yeni ekranları tutarlı şekilde oluşturmak için `src/components/core`
   bileşenlerini kullanın.
3. Kendi domaininiz için gerçek authentication provider, veri kaynağı ve API
   route'larını ekleyin.
4. `src/lib/metadata/site-metadata.ts` içindeki site ve sayfa metadatalarını
   markanıza göre güncelleyin.
5. `src/features/routes/**/i18n` içindeki Türkçe ve İngilizce metinleri ürün
   dilinize uyarlayın.

### Lisans

Bu repo özel bir uygulama template'i olarak hazırlanmıştır. Kullanım ve dağıtım
koşulları proje sahibinin belirlediği lisans politikasına göre
netleştirilmelidir.

# Metadata, SEO ve AI Tooling Todo

## Arastirma Notlari

- [x] Next.js App Router icin resmi metadata modeli incelendi: `metadata` ve `generateMetadata` yalnizca Server Component route segmentlerinde destekleniyor; title template, description, Open Graph, Twitter, robots ve alternates alanlari route bazinda cozumleniyor. Kaynak: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- [x] Next.js resmi metadata file conventions incelendi: `app/robots.ts` crawler politikasi, `app/sitemap.ts` indekslenebilir route haritasi uretmek icin dogru yer. Kaynaklar: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots ve https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- [x] Google robots.txt dokumani incelendi: robots.txt crawler trafigini yonetir, guvenlik mekanizmasi degildir; hassas ekranlar noindex/auth ile korunmali. Kaynak: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- [x] OpenAI crawler dokumani incelendi: `OAI-SearchBot`, `GPTBot` ve `ChatGPT-User` robots.txt user-agent tokenlariyla ayri yonetilebilir. Kaynak: https://developers.openai.com/api/docs/bots
- [x] `llms.txt` pratigi arastirildi: kok dizinde Markdown tabanli, AI ajanlari icin curasyon dosyasi olarak onerilen bir standart; henuz resmi web standardi gibi garanti davranis saglamiyor, ama dusuk riskli bir discovery katmani olarak uygulanabilir. Kaynak: https://www.yotpo.com/blog/what-is-llms-txt/

## Mimari Kararlar

- [x] Global proje metadata'si merkezi ve tip guvenli bir helper uzerinden uretilecek.
- [x] Yeni route icin manuel merkezi registry zorunlu olmayacak; `createStaticMetadata({ path: '/new-route' })` path'ten section, robots, title ve AI purpose fallback uretecek.
- [x] Dinamik route'lar fetch ettikleri kayitla `createDynamicMetadata` / `buildDynamicPageMetadata` uzerinden title, description, canonical, image ve article zamanlarini besleyebilecek.
- [x] Yeni `page.tsx` dosyalarinda metadata export'u unutulursa `npm run metadata:check` bunu yakalayacak.
- [x] Public ana sayfa indekslenebilir olacak; login, auth ve admin ekranlari noindex/nofollow olarak isaretlenecek.
- [x] Protected ekranlar sitemap'e alinmayacak.
- [x] AI arama/kullanici ajanlarina public icerik acik tutulacak; training crawler'lari icin daha kisitlayici robots politikasi uygulanacak.
- [x] `localePrefix: 'never'` nedeniyle canonical path tekil tutulacak; ayni path uzerinden cookie ile degisen dil icin sahte locale URL'leri uretilmeyecek.

## Gelistirme Adimlari

- [x] Merkezi metadata konfigurasyonu ve route descriptor katmani ekle.
- [x] Root layout metadata'sini advanced proje metadata'siyle degistir.
- [x] Her `src/app` ekrani icin route-level `generateMetadata` ekle.
- [x] `robots.ts` ile genel SEO ve AI crawler politikasi ekle.
- [x] `sitemap.ts` ile indekslenebilir route haritasi ekle.
- [x] `llms.txt` route'u ile AI tool discovery dosyasi ekle.
- [x] Proxy static asset bypass listesine `llms.txt` ekle.
- [x] Static route metadata factory ekle: `createStaticMetadata('routeId')` ve `createStaticMetadata({ path })`.
- [x] Dinamik route metadata factory ekle: `createDynamicMetadata(async ({ params }) => metadataInput)`.
- [x] Route metadata kontrol script'i ekle: `npm run metadata:check`.
- [x] Type-check ile dogrula.
- [x] Production build ile dogrula.

## Yeni Route Kullanim Kurgusu

Statik ekran:

```ts
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata({
  path: '/reports',
  title: 'Reports',
  description: 'Public reports overview for Vantor.',
});
```

Korumali/admin ekranlarda path yeterli olur; robots otomatik noindex olur:

```ts
export const generateMetadata = createStaticMetadata({ path: '/admin/audit-log' });
```

Dinamik ekran:

```ts
import { createDynamicMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createDynamicMetadata<{ slug: string }>(
  async ({ params }) => {
    const record = await getRecord(params.slug);

    return {
      path: `/records/${params.slug}`,
      title: record.title,
      description: record.summary,
      image: record.coverImage,
      modifiedTime: record.updatedAt,
    };
  },
);
```

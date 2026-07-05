import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/lib/metadata/site-metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.legalName,
    short_name: siteMetadata.name,
    description: siteMetadata.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#030508',
    theme_color: '#5d5dff',
    icons: [
      {
        src: siteMetadata.assets.android192,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: siteMetadata.assets.android512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: siteMetadata.assets.android512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

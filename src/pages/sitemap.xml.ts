import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const root = site!.toString().replace(/\/$/, '') + base;
  const urls = ['en', 'zh'].map((l) => `  <url>
    <loc>${root}/${l}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${root}/en/"/>
    <xhtml:link rel="alternate" hreflang="zh-TW" href="${root}/zh/"/>
  </url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};

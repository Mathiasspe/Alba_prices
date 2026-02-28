// Cloudflare Worker: CORS proxy for Alba availability API
//
// Deploy via Cloudflare Dashboard (gratis):
// 1. Gå til dash.cloudflare.com → Workers & Pages → Create
// 2. Velg "Create Worker" → gi den navn "alba-avail-proxy"
// 3. Klikk "Edit code" → lim inn denne filen → Deploy
// 4. Kopier URL-en og oppdater AVAIL_API i index.html

const ALBA_API = 'https://api.albaplay.com/graphql';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.text();
      const res = await fetch(ALBA_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      const data = await res.text();
      return new Response(data, {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Proxy error' }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

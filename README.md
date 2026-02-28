# Alba Venue Price Dashboard

Et interaktivt dashboard for å sammenligne priser og tilgjengelighet på padelbaner fra [Alba](https://albaplay.com) i Norge.

## Funksjoner

- **Prissammenligning** - Se timepriser for alle Alba-venues, filtrert per dag og time
- **Interaktivt kart** - Leaflet-kart med fargekodede markører basert på pris (gronne = billig, rode = dyrt)
- **Omradefilter** - Filtrer venues etter region (Oslo, Bergen, Trondhjem, Stavanger, Kristiansand)
- **Tilgjengelighet** - Sjekk sanntids tilgjengelighet for valgt venue via Alba API
- **Omradevelger** - Tegn et omrade pa kartet for a filtrere venues geografisk
- **Responsivt design** - Fungerer pa bade desktop og mobil
- **Sortering** - Sorter etter pris (lav-hoy / hoy-lav) eller navn

## Teknisk oversikt

### Arkitektur

Prosjektet bestar av to filer:

| Fil | Beskrivelse |
|-----|------------|
| `index.html` | Hele dashboardet (HTML + CSS + JS) som en enkelt fil. Inneholder venue-data som innebygd JSON. |
| `worker.js` | Cloudflare Worker som fungerer som CORS-proxy mot Alba sin GraphQL API for tilgjengelighetsdata. |

### Teknologier

- **Frontend**: Vanilla HTML/CSS/JavaScript (ingen rammeverk)
- **Kart**: [Leaflet.js](https://leafletjs.com/) med OpenStreetMap-tiles
- **Fonter**: Google Fonts (Syne + DM Sans)
- **CORS-proxy**: [Cloudflare Workers](https://workers.cloudflare.com/) (gratis tier)
- **Hosting**: GitHub Pages

### Dataflyt

1. Venue-data (navn, adresse, koordinater, priser per dag/time) er lagret som JSON direkte i `index.html`
2. Nar brukeren velger et venue, hentes sanntids tilgjengelighet via Cloudflare Worker-proxyen
3. Worker-proxyen videresender GraphQL-sporringer til `api.albaplay.com/graphql`

## Oppsett

### Frontend (GitHub Pages)

Ingen bygging nodvendig - `index.html` kan serveres direkte. For lokal utvikling:

```bash
# Klon repoet
git clone https://github.com/Mathiasspe/Alba_prices.git
cd Alba_prices

# Start en lokal server
python3 -m http.server 8000
# eller
npx serve .
```

Apne `http://localhost:8000` i nettleseren.

### CORS-proxy (Cloudflare Worker)

1. Ga til [dash.cloudflare.com](https://dash.cloudflare.com) -> Workers & Pages -> Create
2. Velg "Create Worker" og gi den navn (f.eks. `alba-avail-proxy`)
3. Klikk "Edit code" -> lim inn innholdet fra `worker.js` -> Deploy
4. Oppdater `AVAIL_API`-konstanten i `index.html` med den nye Worker-URL-en

## Bruk

1. Velg **dag** og **time** i tidvelgeren overst i sidepanelet
2. Venue-listen og kartet oppdateres med priser for valgt tidspunkt
3. Klikk pa et venue for a se detaljer, tilgjengelighet og bookinglenke
4. Bruk **regionfilter** for a vise kun venues i bestemte omrader
5. Bruk **"Velg omrade"**-knappen pa kartet for a tegne et geografisk utvalg

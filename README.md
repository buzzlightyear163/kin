# KIN ($KIN) – sajten (v2, trading-app-design)

"Every fork buys the original." En launchpad på Raydium LaunchLab där varje fork paras mot sin parents token i stället för SOL.

## Filer

- `index.html` – startsidan (Explore, siffror, kvitto, släktträd, launch-panel)
- `docs.html` – Docs: parning, graduering, avgifter, launch, risker, FAQ, disclaimer
- `og.jpg` – förhandsbilden när länken delas på X
- `api/proxy.js` – liten Vercel-funktion som hämtar Raydium- och DexScreener-data om webbläsaren inte får anropa dem direkt. Rör den inte.

## Vad som fungerar

- **Fork-flödet** (Trending / New / Graduating / Graduated + sök på CA) läser alla KIN-forks från Raydium när `platformId` är ifyllt. Innan dess visas exempel-forks av riktiga runners, tydligt märkta "Preview".
- **De fyra siffrorna** räknas från samma data. "$KIN bought back" läser saldot i buyback-plånboken direkt från kedjan.
- **Kvitto-kortet** räknar ett köp på 2 SOL med live-priser från DexScreener.
- **Släktträdet** visar parent-info, "% of supply locked by forks", ett platt träd och en tabell över alla forks. Varje parent får en egen länk (`/#p-<CA>`) via "Copy link".
- **Launch-panelen** fyller i parent-info automatiskt när man klistrar in en CA. Connect wallet fungerar med Phantom, Solflare och Backpack.
- Om priser inte går att hämta används en märkt ögonblicksbild (10 nov 2026).

## Fyll i vid launch (överst i `<script>` i index.html, `const CONFIG`)

| Fält | Vad |
|---|---|
| `ca` | $KIN:s mint-adress |
| `buy` | Valfri köplänk. Tom = Raydiums LaunchLab-sida för CA:n |
| `x` | Länk till X-kontot (dyker upp i footern) |
| `platformId` | KIN:s LaunchLab platform config. Gör flödet, siffrorna och träden live |
| `buybackWallet` | Plånboken som tar emot återköpt $KIN |
| `launchUrl` | När fork-launch är kopplad: sidan som launchar. Tänder Launch-knappen |
| `gradSol`, `platformFeePct`, `protocolFeePct`, `fees` | 85 SOL, 1.74 %, 0.25 %, 40/30/30 |

## Deploy

1. Lägg mappen i ett GitHub-repo (allt i roten).
2. Vercel → Add New Project → välj repot → Framework Preset: **Other** → Deploy.
3. Koppla domänen under Settings → Domains.

## Kolla efter deploy

- Typsnitten är Geist och Geist Mono.
- Fork-flödet syns på första skärmen, även i mobilen.
- Klistra in en CA i sökrutan → filtrerar flödet och öppnar parentens släktträd.
- Delningsbilden (og.jpg) syns när länken postas på X.
- När `platformId` är ifyllt: lamporna ska säga "Live".

## Kvar att bygga

- Själva launch-transaktionen (SOL → parent → fork i en transaktion). Knappen säger "Launches open with $KIN" tills `launchUrl` fylls i.
- Raydium måste skapa en quote-config för varje parent före första forken.

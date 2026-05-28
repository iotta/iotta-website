# iotta Website — Designspecificatie
**Datum:** 2026-05-28
**Project:** Nieuwe website voor iotta (www.iotta.nl)

---

## 1. Context & Doelen

iotta is een Nederlands IoT- en data-bedrijf gevestigd in Rijswijk. De bestaande site is verouderd. De nieuwe site moet drie samenhangende pijlers presenteren als één coherent verhaal, niet als drie losse producten:

1. **Sensing as a Service** — complete, draadloze meetdienst als abonnement
2. **Partnering** — technologiepartner voor bedrijven die IoT-data nodig hebben
3. **AI & Analyse (ANTAIRA)** — AI-ondersteund analyse- en adviessysteem

**Doelgroep:** facility managers, vastgoedbeheerders, IT-managers, duurzaamheidsadviseurs, product managers bij bedrijven met IoT-behoeften.

**Taal:** volledig Nederlands.

---

## 2. Architectuur

### Aanpak: Losse HTML-pagina's met gedeelde CSS/JS

Zes aparte `.html`-bestanden, één `styles.css`, gedeelde componenten via `fetch()`.

```
my-website/
├── index.html
├── sensing-as-a-service.html
├── partnering.html
├── ai-en-analyse.html
├── over-iotta.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js             # Interactiviteit (nav, animaties)
│   └── components.js       # Header/footer inject via fetch
├── components/
│   ├── header.html
│   └── footer.html
└── assets/
    ├── logo.svg
    ├── hero-illustration.svg
    └── placeholders/       # Klantlogo's, teamfoto's — later te vervangen
```

**Header/footer:** `components.js` doet een `fetch()` op `header.html` en `footer.html` en injecteert deze in elke pagina. Geen build-stap vereist; werkt op elke statische host (Netlify, GitHub Pages).

**Hosting:** statisch, geen server-side vereisten. Contactformulier via Formspree (gratis tier).

---

## 3. Designsysteem

### Visuele richting: A+B hybride
Witte/lichtgrijze basis met veel witruimte (Clean & Minimal), gecombineerd met gedurfde typografie en donkere contrasterende secties (Bold & Technisch). Pagina's wisselen af tussen lichte en donkere secties voor ritmische visuele impact.

### Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--green` | `#8DC63F` | Primaire buttons, accenten, highlights |
| `--green-dark` | `#6fa832` | Hover-staat primaire button |
| `--black` | `#0d0d0d` | Hero-achtergronden, donkere secties |
| `--gray-900` | `#111827` | Hoofdtekst |
| `--gray-100` | `#f3f4f6` | Afwisselende sectie-achtergronden |
| `--white` | `#ffffff` | Basis-achtergrond |

### Typografie
- **Headings/display:** `Syne` (Google Fonts) — bold, modern, technisch karakter
- **Body/UI:** `Inter` (Google Fonts) — helder en goed leesbaar
- Geen serif. Geen italic voor lopende tekst.

### Knoppen
- **Primair:** groene achtergrond (`--green`), witte tekst, `border-radius: 4px`, kleine letter-spacing op label
- **Secundair:** transparant met border (wit op donkere bg, donker op lichte bg)

### Sectiepatroon per pagina
Elke pagina opent met een zwarte hero-sectie. De secties erna wisselen af: wit → lichtgrijs → wit → zwart (voor een CTA of testimonial). De zwarte secties buiten de hero zijn de "bold"-momenten die ritme geven aan de pagina.

### Responsiviteit
Mobile-first. CSS Grid/Flexbox. Breekpunten: 768px (tablet), 1024px (desktop). Hamburger-menu op mobiel.

### Toegankelijkheid
WCAG AA: voldoende kleurcontrast op alle combinaties, focus-states op alle interactieve elementen, alt-tekst op afbeeldingen, semantische HTML (`<nav>`, `<main>`, `<article>`, `<section>`).

---

## 4. Globale componenten

### Header (sticky)
```
[ iotta. ]    Sensing as a Service | Partnering | AI & Analyse | Over iotta    [ Contact ]
```
- Logo links, navigatielinks gecentreerd/rechts, groene CTA-knop "Contact" rechts
- Sticky bij scrollen, lichte achtergrond met subtiele box-shadow bij scroll
- Mobiel: hamburger-icoon → dropdown menu (uitklapbaar onder de header)

### Footer
```
[ iotta. ]                  Sensing as a Service     info@iotta.nl
"Meten zonder zorgen"       Partnering               010 223 2281
                            AI & Analyse             Cor Ruytstraat 2, 2288 EK Rijswijk
                            Over iotta

© 2026 iotta. Alle rechten voorbehouden.              [ LinkedIn ]
```

---

## 5. Pagina's

### 5.1 Homepage (`index.html`)

**Hero** (~85vh, achtergrond `#0d0d0d`):
- Links: display-kopje "Meten zonder zorgen." (Syne, groot, wit), subtitel "Wij leveren end-to-end IoT-oplossingen — van hardware tot dashboard en AI-gestuurde analyses.", twee knoppen ("Bekijk onze diensten" primair, "Neem contact op" secundair)
- Rechts: `hero-illustration.svg` — gestileerde SVG van een gebouw met sensoren (groene dots met CSS pulse-animatie), datalijnen en cloud-verbinding

**Drie pijlers** (wit, 3-koloms grid):
- Card 1: icoon sensor, "Sensing as a Service", korte tekst, "Lees meer →"
- Card 2: icoon handshake, "Partnering", korte tekst, "Lees meer →"
- Card 3: icoon brein/AI, "AI & Analyse", kort tekstje, groen "In ontwikkeling"-badge, "Lees meer →"
- Alle drie gepresenteerd als één verhaal: "Van meten naar inzicht naar actie"

**Social proof** (lichtgrijs):
- Koptekst: "Vertrouwd door organisaties in zorg, onderwijs en vastgoed"
- Rij met klantlogo-placeholders (grijze rechthoeken, later te vervangen door echte logo's)
- Geen integratierij

**Testimonial** (zwart):
- Groot aanhalingsteken, citaat in wit, attribuut in groen
- Placeholder-citaat, later te vervangen

**CTA-banner** (groen):
- "Klaar om te meten zonder zorgen?" + "Neem contact op"-knop (wit)

---

### 5.2 Sensing as a Service (`sensing-as-a-service.html`)

**Hero** (zwart):
- "Sensing as a Service" als titel
- Subtitel: "U zegt wat u wilt meten, wij regelen de rest."
- Intro: "Volledig draadloos, vaste prijs per sensor per jaar, 24/7 bewaakt."

**Wat is inbegrepen** (wit):
- Horizontale icon-stappen-rij (6 stappen):
  Sensoren → Infrastructuur (gateways + cloud) → Plaatsing → 24/7 Monitoring → Dashboard → Integratie
- Elk stap: SVG-icoon + label + korte beschrijving

**Beschikbare metingen** (lichtgrijs, 3-koloms card-grid):
Gebaseerd op de daadwerkelijke productcatalogus:
1. Binnenklimaat — CO₂, temperatuur, RH, licht, fijnstof, VOC
2. Bezetting & aanwezigheid — per ruimte en per werkplek
3. Temperatuurbewaking — koelingen/vriezers (HACCP-conform)
4. Parkeerplaatsbezetting
5. Tank- & afvalbak-niveaumeting
6. GPS-tracking
7. Maatwerk — "Specifieke wens? Wij regelen de sensor."

**Tariefmodel** (wit):
- Uitleg van het abonnementsmodel: alles inbegrepen, vaste prijs per sensor per jaar
- Geen concreet bedrag ("op aanvraag")
- CTA-knop: "Vraag een offerte aan" → contactpagina

**Klantcases** (lichtgrijs):
- 2–3 placeholder-cards met sector-label (bijv. "Onderwijs", "Zorg"), quote-placeholder, foto-placeholder
- Later te vervangen door echte klantcases

---

### 5.3 Partnering (`partnering.html`)

**Hero** (zwart):
- "Partnering" als titel
- Subtitel: "Samenwerken voor de beste klantoplossing."

**Zig-zag contentblokken** (afwisselend wit/lichtgrijs):
- Blok 1 — "Voor software-ontwikkelaars": tekst links, API/datastroomdiagram-placeholder rechts. Boodschap: wij leveren betrouwbare data via API's, geen hardware-kopzorgen.
- Blok 2 — "Voor installateurs": foto-placeholder links, tekst rechts. Boodschap: wij leveren sensoren en connectiviteit, jullie verzorgen de installatie.

**Wat levert iotta** (zwart):
- Drie punten met icoon:
  1. Hardware-ontwikkeling — snel nieuwe sensortypen bouwen en schaal produceren
  2. Software-integratie — real-time data in het gewenste formaat
  3. Beheer & onderhoud — van sensornetwerken op grote schaal

**CTA** (groen):
- "Word Partner" → contactformulier

---

### 5.4 AI & Analyse (`ai-en-analyse.html`)

**Toonrichtlijn:** eerlijk en zorgvuldig. iotta is nu al actief bezig met het ondersteunen van het opstellen van adviesrapporten met AI. ANTAIRA (de gestructureerde runtimearchitectuur) is de doorontwikkeling hiervan als R&D-project (MIT-subsidie). De pagina laat zien wat er nu al gebeurt én waar het naartoe gaat. Geen valse beloften, geen zwart-doos-taal.

**Hero** (zwart):
- "AI & Analyse" als titel
- Groen badge: "In actieve ontwikkeling"
- Subtitel: "Van data naar onderbouwde besluiten — met AI als betrouwbare assistent."

**Wat wij nu al doen** (wit):
- iotta ondersteunt nu al het opstellen van adviesrapporten voor verduurzaming van maatschappelijk vastgoed
- Combineert realtime sensordata met regelgeving en scenarioanalyse
- Output: reproduceerbare, auditeerbare rapportages
- Toon: "Wij ondersteunen u met meten én het ontwikkelen van onderbouwde adviesrapporten — met AI als betrouwbare assistent, niet als vervanger van de expert."

**Kernwaarden** (lichtgrijs, drie kolommen):
- Controleerbaar — geen black box
- Herleidbaar — elke conclusie is terug te voeren op data
- Reproduceerbaar — dezelfde input geeft dezelfde output

**ANTAIRA — de doorontwikkeling** (zwart):
- Uitleg van het R&D-project: gestructureerde AI-runtimearchitectuur voor schaalbare analyses
- Status: in ontwikkeling, MIT-subsidieproject
- Voor wie: adviesbureaus en beheerders van maatschappelijk vastgoed (scholen, zorg, gemeenten)
- Abstract dashboard-placeholder rechts

**Contact voor meer informatie** (groen):
- "Wil je meer weten over hoe wij dit toepassen?" → contactformulier (geen pilot-framing)

---

### 5.5 Over iotta (`over-iotta.html`)

**Hero** (gecentreerd, wit met groene accentregel):
- "Over iotta"
- Missiestelling: "Fysieke data vangen — extreem makkelijk maken voor elke organisatie."

**Ons verhaal** (lichtgrijs, 2-koloms):
- Tekst links: oorsprong YES!Delft / TU Delft, motivatie ("IoT-projecten stranden op verbindingsproblemen, batterijen en IT-integraties — dat moest anders"), missie
- Teamfoto-placeholder rechts (later te vervangen)

**Team** (wit, 2-koloms):
- Kaartje Erik Steenbergen: naam, rol, foto-placeholder
- Kaartje Rogier Lodewijks: naam, rol, foto-placeholder

**Tijdlijn** (lichtgrijs):
- Compacte horizontale tijdlijn van oprichting tot heden
- Placeholder-mijlpalen, later in te vullen

---

### 5.6 Contact (`contact.html`)

**Hero** (zwart):
- "Neem contact op"
- Subtitel: "Klaar om te meten zonder zorgen? Laat een bericht achter of bel ons."

**2-koloms layout** (wit):
- Links — contactformulier:
  - Velden: Naam, E-mailadres, Organisatie, Bericht (textarea)
  - Knop: "Verzenden"
  - Backend: Formspree (`action="https://formspree.io/f/[form-id]"`, `method="POST"`)
  - Succesmelding na verzenden: in-place JS-succesmelding (formulier verbergen, groene bevestigingstekst tonen — geen pagina-redirect)
- Rechts — contactgegevens:
  - Adres: Cor Ruytstraat 2, 2288 EK Rijswijk (met locatie-icoon)
  - Telefoon: 010 223 2281
  - E-mail: info@iotta.nl
  - Google Maps iframe (statisch embed, geen API-key vereist)

---

## 6. Assets & Placeholders

Alle klantlogo's, teamfoto's en installatiefoto's zijn nu placeholders. Placeholders zijn geïmplementeerd als grijze `<div>`-vlakken met vaste afmeting en een commentaarregel `<!-- vervang door: [beschrijving] -->` voor eenvoudige vervanging.

De hero-illustratie (`hero-illustration.svg`) wordt als handgeschreven SVG opgeleverd als onderdeel van de implementatie.

---

## 7. Technische randvoorwaarden

- Geen JavaScript-framework (vanilla JS)
- WCAG AA conformant
- Google Fonts via `<link>` in `<head>` (Inter + Syne)
- Geen cookies of tracking (tenzij later toegevoegd)
- Formspree free tier voor contactformulier
- Statisch hostbaar (Netlify aanbevolen)
- Google Maps iframe embed (geen API-key)

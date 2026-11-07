# Scheunentor

React + TypeScript + Tailwind CSS 4, mit shadcn-kompatibler Komponentenstruktur.

## Start

```sh
npm ci
npm run dev
```

`npm run build` prüft TypeScript und erstellt `dist/`.

Die wiederverwendbare Komponente liegt in `src/components/ui/barn-door-hero.tsx`, ihr eigenständiges Stylesheet daneben. Der Alias `@/` verweist auf `src/`. `components/ui` hält wiederverwendbare Komponenten an einem festen Ort und ist für shadcn konfiguriert. Die Demo benötigt keine weiteren UI-Komponenten und keine externen Medien.

```tsx
import BarnDoorHero from '@/components/ui/barn-door-hero';

<BarnDoorHero
  title="Das Tor geht auf."
  tagline="Willkommen auf der anderen Seite."
  scrollHint="Scrollen zum Öffnen"
  scrubDistance={1800}
/>
```

Bei Integration in ein anderes React-Projekt beide Komponentendateien kopieren. Kein Provider nötig. Tailwind ist für die Tor-Komponente selbst nicht erforderlich.

## Verhalten

Native Scrollbewegung mit einem Sticky-Bereich statt globaler Scrollsperre. Zwei SVG-Holztüren drehen sich an ihren äußeren Scharnieren. Zurückscrollen schließt sie wieder. Nach vollständigem Öffnen läuft die Seite normal weiter. Der Button öffnet sofort; bei reduzierter Bewegung bleibt das Tor offen. Keine Endlosschleife für Animationen, keine externen Schriftarten, Bilder oder Videos.

GitHub Actions baut und veröffentlicht auf GitHub Pages. Die bestehende Domain daniel-zahnweh.de wird über die GitHub-Pages-Konfiguration des Accounts verwendet; dieses Projekt setzt keinen eigenen CNAME.

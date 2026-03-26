# Energy Hero – Onboarding Flow

Standalone-Prototyp des Energy Hero Onboarding Flows für Strom-/Gastarifvergleich.
Basiert auf dem Mockup der Ergebnisseite und dem Flow von gridbert.at.

## Voraussetzungen

- **Node.js** >= 18
- **npm** (kommt mit Node.js)
- **Claude Code** (optional, zum Weiterentwickeln)

## Setup

```bash
git clone https://github.com/BMoer/energyhero_onboarding_flow.git
cd energyhero_onboarding_flow
npm install
npm run dev
```

Öffne dann http://localhost:5173 im Browser.

## Flow

Der Onboarding Flow hat 3 Steps:

1. **Deine Angaben** – Strom/Gas, PLZ, Personen im Haushalt, Jahresverbrauch
2. **Deine Auswahl** – Einsparpotenzial vs. geringe Teilbeträge, Ökostrom, Gesamtrechnung, Strom aus Österreich
3. **Ergebnisse** – Durchschnittliche Ersparnis, 3 Tarifoptionen mit Details, Unabhängigkeits-Banner, Gas-Upsell, E-Control Disclaimer

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── Header.tsx        # Navigation & Logo
│   ├── StepIndicator.tsx # Fortschrittsanzeige (1-2-3)
│   └── TariffCard.tsx    # Einzelne Tarifkarte mit Details
├── pages/            # Die 3 Steps
│   ├── InputStep.tsx
│   ├── PreferencesStep.tsx
│   └── ResultsStep.tsx
├── data/
│   └── mockTariffs.ts    # Mock-Daten (hier Tarife & Ersparnis anpassen)
├── types/
│   └── index.ts          # TypeScript Interfaces
├── styles/
│   └── global.css        # Globale Styles & CSS Variables
└── App.tsx               # Hauptkomponente mit Step-Steuerung
```

## Mock-Daten anpassen

In `src/data/mockTariffs.ts` kannst du ändern:
- **Ersparnis-Betrag** (z.B. 750 €)
- **Monat/Jahr** der Anzeige
- **Tarife** (Anbieter, Preise, Features)

## Scripts

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Dev-Server starten |
| `npm run build` | Production Build |
| `npm run preview` | Production Build lokal testen |
| `npm run lint` | ESLint laufen lassen |

## Mit Claude Code weiterentwickeln

```bash
# Im Projektordner einfach Claude Code starten:
claude

# Beispiel-Prompts:
# "Füge einen 4. Tarif hinzu"
# "Mach die Tarifdetails standardmäßig ausgeklappt"
# "Passe die Farben an das neue Branding an"
```

## Tech-Stack

- React 19 + TypeScript
- Vite 8
- CSS Modules (keine externen UI-Libraries)

## Nächste Schritte

- [ ] API-Anbindung an E-Control Daten (ersetzt Mock-Daten)
- [ ] Integration in die energyhero.at Website
- [ ] Responsive Fine-Tuning für Mobile
- [ ] Gas-Flow (aktuell nur Strom-Mockup)

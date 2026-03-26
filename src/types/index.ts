export interface UserInput {
  readonly energyType: 'strom' | 'gas';
  readonly plz: string;
  readonly verbrauch: number; // kWh per year
  readonly personen: number;
}

export interface TariffPreferences {
  readonly vollesEinsparpotenzial: boolean;
  readonly geringeTeilbetraege: boolean;
  readonly oekostrom: boolean;
  readonly gesamtrechnung: boolean;
  readonly stromAusOesterreich: boolean;
}

export interface TariffOption {
  readonly id: string;
  readonly anbieter: string;
  readonly tarifName: string;
  readonly jahreskosten: number;
  readonly geringeTeilbetraege: boolean;
  readonly oekostrom: boolean;
  readonly stromAusOesterreich: boolean;
  readonly gesamtrechnung: boolean;
  readonly grundpreis: number; // €/Monat
  readonly arbeitspreis: number; // Cent/kWh
  readonly neukundenbonus: number;
  readonly vertragslaufzeit: string;
}

export interface SavingsResult {
  readonly durchschnittlicheErsparnis: number;
  readonly monat: string;
  readonly jahr: number;
  readonly tarife: readonly TariffOption[];
}

export type Step = 'input' | 'preferences' | 'results';

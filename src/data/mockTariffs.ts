import type { TariffOption, SavingsResult } from '../types';

const MOCK_TARIFFS: readonly TariffOption[] = [
  {
    id: '1',
    anbieter: 'Awattar',
    tarifName: 'HOURLY',
    jahreskosten: 1382.39,
    geringeTeilbetraege: true,
    oekostrom: true,
    stromAusOesterreich: true,
    gesamtrechnung: true,
    grundpreis: 3.99,
    arbeitspreis: 18.52,
    neukundenbonus: 0,
    vertragslaufzeit: 'Keine Bindung',
  },
  {
    id: '2',
    anbieter: 'Verbund',
    tarifName: 'Strom Privat Float',
    jahreskosten: 1401.25,
    geringeTeilbetraege: true,
    oekostrom: true,
    stromAusOesterreich: true,
    gesamtrechnung: true,
    grundpreis: 4.49,
    arbeitspreis: 19.14,
    neukundenbonus: 50,
    vertragslaufzeit: 'Keine Bindung',
  },
  {
    id: '3',
    anbieter: 'Energie AG',
    tarifName: 'Online Strom Flex',
    jahreskosten: 1410.67,
    geringeTeilbetraege: true,
    oekostrom: true,
    stromAusOesterreich: true,
    gesamtrechnung: true,
    grundpreis: 4.29,
    arbeitspreis: 19.45,
    neukundenbonus: 75,
    vertragslaufzeit: '12 Monate',
  },
];

export function getMockResults(): SavingsResult {
  return {
    durchschnittlicheErsparnis: 750,
    monat: 'März',
    jahr: 2026,
    tarife: MOCK_TARIFFS,
  };
}

import { useState } from 'react';
import type { UserInput } from '../types';
import styles from './InputStep.module.css';

interface InputStepProps {
  readonly initialData: UserInput;
  readonly onNext: (data: UserInput) => void;
}

const PERSONEN_OPTIONS = [1, 2, 3, 4, 5];
const VERBRAUCH_DEFAULTS: Record<number, number> = {
  1: 1500,
  2: 2500,
  3: 3500,
  4: 4500,
  5: 5500,
};

export function InputStep({ initialData, onNext }: InputStepProps) {
  const [energyType, setEnergyType] = useState(initialData.energyType);
  const [plz, setPlz] = useState(initialData.plz);
  const [personen, setPersonen] = useState(initialData.personen);
  const [verbrauch, setVerbrauch] = useState(initialData.verbrauch);
  const [plzError, setPlzError] = useState('');

  const handlePersonenChange = (count: number) => {
    setPersonen(count);
    setVerbrauch(VERBRAUCH_DEFAULTS[count] ?? 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(plz)) {
      setPlzError('Bitte gib eine gültige 4-stellige PLZ ein.');
      return;
    }
    setPlzError('');

    onNext({
      energyType,
      plz,
      personen,
      verbrauch,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ersparnis berechnen</h1>
        <p className={styles.subtitle}>
          Finde den besten Stromtarif für deinen Haushalt.
          Wir vergleichen über 150 Anbieter in Österreich.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Energy Type Toggle */}
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${energyType === 'strom' ? styles.toggleActive : ''}`}
              onClick={() => setEnergyType('strom')}
            >
              ⚡ Strom
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${energyType === 'gas' ? styles.toggleActive : ''}`}
              onClick={() => setEnergyType('gas')}
            >
              🔥 Gas
            </button>
          </div>

          {/* PLZ */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="plz">Postleitzahl</label>
            <input
              id="plz"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="z.B. 1010"
              className={`${styles.input} ${plzError ? styles.inputError : ''}`}
              value={plz}
              onChange={(e) => {
                setPlz(e.target.value.replace(/\D/g, ''));
                setPlzError('');
              }}
            />
            {plzError && <span className={styles.error}>{plzError}</span>}
          </div>

          {/* Personen im Haushalt */}
          <div className={styles.field}>
            <label className={styles.label}>Personen im Haushalt</label>
            <div className={styles.personenGroup}>
              {PERSONEN_OPTIONS.map((count) => (
                <button
                  key={count}
                  type="button"
                  className={`${styles.personenBtn} ${personen === count ? styles.personenActive : ''}`}
                  onClick={() => handlePersonenChange(count)}
                >
                  {count}{count === 5 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Verbrauch */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="verbrauch">
              Jahresverbrauch
            </label>
            <div className={styles.inputWithUnit}>
              <input
                id="verbrauch"
                type="number"
                min={500}
                max={50000}
                step={100}
                className={styles.input}
                value={verbrauch}
                onChange={(e) => setVerbrauch(Number(e.target.value))}
              />
              <span className={styles.unit}>kWh/Jahr</span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={100}
              value={verbrauch}
              onChange={(e) => setVerbrauch(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Weiter zur Auswahl
          </button>
        </form>
      </div>
    </div>
  );
}

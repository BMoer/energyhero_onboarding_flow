import { useState } from 'react';
import type { TariffPreferences } from '../types';
import styles from './PreferencesStep.module.css';

interface PreferencesStepProps {
  readonly initialPrefs: TariffPreferences;
  readonly onNext: (prefs: TariffPreferences) => void;
  readonly onBack: () => void;
}

export function PreferencesStep({ initialPrefs, onNext, onBack }: PreferencesStepProps) {
  const [prefs, setPrefs] = useState<TariffPreferences>(initialPrefs);

  const togglePref = (key: keyof TariffPreferences) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(prefs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Deine Auswahl</h1>
        <p className={styles.subtitle}>
          Was ist dir bei deinem Stromtarif besonders wichtig?
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Einsparpotenzial */}
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="spartyp"
                checked={prefs.vollesEinsparpotenzial}
                onChange={() => setPrefs({ ...prefs, vollesEinsparpotenzial: true, geringeTeilbetraege: false })}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioTitle}>Volles Einsparpotenzial nutzen</span>
                <span className={styles.radioDesc}>Maximale Ersparnis, ggf. höhere monatliche Teilbeträge</span>
              </div>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="spartyp"
                checked={prefs.geringeTeilbetraege}
                onChange={() => setPrefs({ ...prefs, vollesEinsparpotenzial: false, geringeTeilbetraege: true })}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioTitle}>Geringe monatliche Teilbeträge</span>
                <span className={styles.radioDesc}>Niedrigere monatliche Kosten, moderate Ersparnis</span>
              </div>
            </label>
          </div>

          {/* Checkboxes */}
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={prefs.oekostrom}
                onChange={() => togglePref('oekostrom')}
                className={styles.checkboxInput}
              />
              <span className={styles.checkmark} />
              <span>Ökostrom</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={prefs.gesamtrechnung}
                onChange={() => togglePref('gesamtrechnung')}
                className={styles.checkboxInput}
              />
              <span className={styles.checkmark} />
              <span>Gesamtrechnung</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={prefs.stromAusOesterreich}
                onChange={() => togglePref('stromAusOesterreich')}
                className={styles.checkboxInput}
              />
              <span className={styles.checkmark} />
              <span>Strom aus Österreich</span>
            </label>
          </div>

          <div className={styles.disclaimer}>
            * Ohne Berücksichtigung noch nicht ausbezahlter oder gutgeschriebener
            Neukundenvergünstigungen des derzeitigen Versorgers.
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.backBtn} onClick={onBack}>
              ← Zurück
            </button>
            <button type="submit" className={styles.submitBtn}>
              Ergebnisse anzeigen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

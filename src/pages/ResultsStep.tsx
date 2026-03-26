import { useState } from 'react';
import type { TariffPreferences, UserInput } from '../types';
import { getMockResults } from '../data/mockTariffs';
import { TariffCard } from '../components/TariffCard';
import styles from './ResultsStep.module.css';

interface ResultsStepProps {
  readonly userInput: UserInput;
  readonly preferences: TariffPreferences;
  readonly onBack: () => void;
}

export function ResultsStep({ userInput, preferences, onBack }: ResultsStepProps) {
  const results = getMockResults();
  const [showAngaben, setShowAngaben] = useState(false);
  const [expandedTariff, setExpandedTariff] = useState<string | null>(null);

  const filteredTarife = results.tarife.filter((tarif) => {
    if (preferences.oekostrom && !tarif.oekostrom) return false;
    if (preferences.stromAusOesterreich && !tarif.stromAusOesterreich) return false;
    if (preferences.gesamtrechnung && !tarif.gesamtrechnung) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      {/* Back button + title */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Zurück
        </button>
        <h1 className={styles.pageTitle}>
          Ergebnisse <span className={styles.titleLight}>
            - {userInput.energyType === 'strom' ? 'Strom' : 'Gas'}
          </span>
        </h1>
      </div>

      {/* Savings Hero */}
      <div className={styles.savingsHero}>
        <div className={styles.savingsLeft}>
          <div className={styles.savingsLabel}>
            Durchschnittliche Ersparnis {results.monat} {results.jahr}
          </div>
          <div className={styles.savingsTooltip}>
            Was bedeutet das?{' '}
            <span className={styles.infoIcon} title="Basierend auf gemittelten Daten des E-Control Preismonitors für Österreich.">
              ⓘ
            </span>
          </div>
        </div>
        <div className={styles.savingsAmount}>
          <span className={styles.savingsValue}>{results.durchschnittlicheErsparnis} €</span>
          <span className={styles.savingsNote}>(exkl. Servicefee)</span>
        </div>
        <div className={styles.econtrolBadge}>
          <div className={styles.econtrolLogo}>E-CONTROL</div>
          <div className={styles.econtrolText}>Datenquelle: E-Control</div>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <button
            className={styles.angabenToggle}
            onClick={() => setShowAngaben(!showAngaben)}
          >
            Deine Angaben
            <span className={`${styles.chevron} ${showAngaben ? styles.chevronOpen : ''}`}>
              ▾
            </span>
          </button>

          {showAngaben && (
            <div className={styles.angabenDetails}>
              <div className={styles.angabenRow}>
                <span>PLZ:</span>
                <strong>{userInput.plz}</strong>
              </div>
              <div className={styles.angabenRow}>
                <span>Personen:</span>
                <strong>{userInput.personen}</strong>
              </div>
              <div className={styles.angabenRow}>
                <span>Verbrauch:</span>
                <strong>{userInput.verbrauch} kWh</strong>
              </div>
            </div>
          )}

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Deine Auswahl</h3>
            <div className={styles.filterInfo}>
              {preferences.vollesEinsparpotenzial && (
                <div className={styles.filterTag}>
                  <span className={styles.radioIndicator} />
                  Volles Einsparpotenzial nutzen
                </div>
              )}
              {preferences.geringeTeilbetraege && (
                <div className={styles.filterTag}>
                  <span className={styles.radioIndicator} />
                  Geringe monatliche Teilbeträge
                </div>
              )}
              {preferences.oekostrom && (
                <div className={styles.filterTag}>
                  <span className={styles.checkIndicator}>✓</span>
                  Ökostrom
                </div>
              )}
              {preferences.gesamtrechnung && (
                <div className={styles.filterTag}>
                  <span className={styles.checkIndicator}>✓</span>
                  Gesamtrechnung
                </div>
              )}
              {preferences.stromAusOesterreich && (
                <div className={styles.filterTag}>
                  <span className={styles.checkIndicator}>✓</span>
                  Strom aus Österreich
                </div>
              )}
            </div>
          </div>

          <div className={styles.disclaimer}>
            * Ohne Berücksichtigung noch nicht ausbezahlter oder gutgeschriebener
            Neukundenvergünstigungen des derzeitigen Versorgers.{' '}
            <span className={styles.infoIcon}>ⓘ</span>
          </div>
        </aside>

        {/* Tariff Results */}
        <div className={styles.results}>
          {/* CTA Buttons top */}
          <div className={styles.ctaRow}>
            <button className={styles.ctaOutline}>Ersparnis für Gas berechnen</button>
            <button className={styles.ctaPrimary}>Jetzt anmelden!</button>
          </div>

          {/* Tariff Cards */}
          {filteredTarife.map((tarif, index) => (
            <TariffCard
              key={tarif.id}
              tarif={tarif}
              optionNumber={index + 1}
              isExpanded={expandedTariff === tarif.id}
              onToggleDetails={() =>
                setExpandedTariff(expandedTariff === tarif.id ? null : tarif.id)
              }
            />
          ))}

          {filteredTarife.length === 0 && (
            <div className={styles.noResults}>
              Keine Tarife gefunden. Bitte passe deine Filter an.
            </div>
          )}
        </div>
      </div>

      {/* Independence Banner */}
      <div className={styles.independenceBanner}>
        <div className={styles.bannerIcon}>⚡</div>
        <p className={styles.bannerText}>
          Wir arbeiten <strong>vollkommen unabhängig</strong> von Energieanbietern und
          haben keine Provisionsvereinbarungen. Unsere Empfehlungen erfolgen{' '}
          <strong>ausschließlich im Interesse unserer Kund:innen</strong>.
        </p>
      </div>

      {/* Selection Summary */}
      <div className={styles.selectionSection}>
        <h2 className={styles.selectionTitle}>Deine Auswahl:</h2>
        <p className={styles.selectionDesc}>
          Folgend findest du deine Tarifauswahl, Energy Hero wird entsprechend dieser
          den Tarifdschungel für dich durchforsten.
        </p>
        <p className={styles.gasUpsell}>
          Füge jetzt auch noch Gas hinzu und du zahlst nur <strong>49 €/Jahr</strong>{' '}
          für den weiteren Zähler.
        </p>
        <div className={styles.ctaRow}>
          <button className={styles.ctaOutline}>Ersparnis für Gas berechnen</button>
          <button className={styles.ctaPrimary}>Jetzt anmelden!</button>
        </div>
      </div>

      {/* Why Energy Hero */}
      <div className={styles.whySection}>
        <h3 className={styles.whyTitle}>Warum lohnt sich eine Anmeldung bei Energy Hero?</h3>
        <p>
          Wir sind mehr als nur ein Wechselservice. Als dein Tarifaufpasser behalten wir
          deine Energiekosten dauerhaft im Blick.
        </p>
        <ul className={styles.whyList}>
          <li>Wir wechseln dich automatisch zu einem günstigeren Anbieter, sobald ein besserer Tarif verfügbar ist.</li>
          <li>Wir überprüfen deinen Tarif regelmäßig, damit du nicht unnötig zu viel zahlst.</li>
          <li>Bei Preiserhöhungen oder Kündigungen beraten wir dich und finden eine bessere Alternative.</li>
        </ul>
        <p>
          Und das Beste: Einmal angemeldet, kümmern wir uns dauerhaft um deine
          Energiekosten – so bleibst du immer beim besten Tarif.
        </p>
      </div>

      {/* E-Control Footer */}
      <div className={styles.econtrolFooter}>
        <div className={styles.econtrolFooterLogo}>E-CONTROL</div>
        <h4>Datenquelle: E-Control</h4>
        <p className={styles.econtrolDisclaimer}>
          Die Dateneingaben der angegebenen Preise und sonstigen Konditionen werden in der
          Regel durch die Elektrizitäts- und Erdgasunternehmen, direkt und selbst vorgenommen.
          Diese Unternehmen haben die Möglichkeit, die Konditionen tagesaktuell zu halten.
          Für die Richtigkeit, Vollständigkeit und Aktualität der von den Elektrizitäts- und
          Erdgasunternehmen selbst vorgenommenen Angaben kann keine Haftung übernommen werden.
        </p>
      </div>
    </div>
  );
}

import type { TariffOption } from '../types';
import styles from './TariffCard.module.css';

interface TariffCardProps {
  readonly tarif: TariffOption;
  readonly optionNumber: number;
  readonly isExpanded: boolean;
  readonly onToggleDetails: () => void;
}

function FeatureCheck({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`${styles.feature} ${active ? styles.featureActive : styles.featureInactive}`}>
      <span className={styles.featureIcon}>{active ? '✓' : '✗'}</span>
      <span>{label}</span>
    </div>
  );
}

function formatEuro(value: number): string {
  return value.toLocaleString('de-AT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function TariffCard({ tarif, optionNumber, isExpanded, onToggleDetails }: TariffCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.optionLabel}>Option {optionNumber}</div>

      <div className={styles.cardBody}>
        <div className={styles.priceSection}>
          <div className={styles.priceLabel}>Stromjahreskosten</div>
          <div className={styles.priceValue}>{formatEuro(tarif.jahreskosten)} €</div>
          <button className={styles.detailsToggle} onClick={onToggleDetails}>
            Tarifdetails {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        <div className={styles.features}>
          <FeatureCheck label="Geringe monatliche Teilbeträge" active={tarif.geringeTeilbetraege} />
          <FeatureCheck label="Ökostrom" active={tarif.oekostrom} />
          <FeatureCheck label="Strom aus Österreich" active={tarif.stromAusOesterreich} />
          <FeatureCheck label="Gesamtrechnung" active={tarif.gesamtrechnung} />
        </div>

        <div className={styles.selectSection}>
          <button className={styles.selectBtn}>
            <span className={styles.selectCheck}>✓</span>
            Ausgewählt
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span>Anbieter</span>
            <strong>{tarif.anbieter}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Tarifname</span>
            <strong>{tarif.tarifName}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Grundpreis</span>
            <strong>{formatEuro(tarif.grundpreis)} €/Monat</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Arbeitspreis</span>
            <strong>{formatEuro(tarif.arbeitspreis)} Cent/kWh</strong>
          </div>
          {tarif.neukundenbonus > 0 && (
            <div className={styles.detailRow}>
              <span>Neukundenbonus</span>
              <strong>{formatEuro(tarif.neukundenbonus)} €</strong>
            </div>
          )}
          <div className={styles.detailRow}>
            <span>Vertragslaufzeit</span>
            <strong>{tarif.vertragslaufzeit}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

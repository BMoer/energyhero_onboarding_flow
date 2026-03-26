import type { Step } from '../types';
import styles from './StepIndicator.module.css';

interface StepIndicatorProps {
  readonly currentStep: Step;
}

const STEPS: readonly { key: Step; label: string }[] = [
  { key: 'input', label: 'Deine Angaben' },
  { key: 'preferences', label: 'Deine Auswahl' },
  { key: 'results', label: 'Ergebnisse' },
];

function getStepIndex(step: Step): number {
  return STEPS.findIndex((s) => s.key === step);
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = getStepIndex(currentStep);

  return (
    <div className={styles.container}>
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.key} className={styles.step}>
            <div
              className={`${styles.circle} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <span
              className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && <div className={styles.connector} />}
          </div>
        );
      })}
    </div>
  );
}

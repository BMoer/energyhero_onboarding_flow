import { useState } from 'react';
import type { Step, UserInput, TariffPreferences } from './types';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { InputStep } from './pages/InputStep';
import { PreferencesStep } from './pages/PreferencesStep';
import { ResultsStep } from './pages/ResultsStep';

const DEFAULT_INPUT: UserInput = {
  energyType: 'strom',
  plz: '',
  verbrauch: 3500,
  personen: 2,
};

const DEFAULT_PREFERENCES: TariffPreferences = {
  vollesEinsparpotenzial: true,
  geringeTeilbetraege: false,
  oekostrom: true,
  gesamtrechnung: true,
  stromAusOesterreich: true,
};

export default function App() {
  const [step, setStep] = useState<Step>('input');
  const [userInput, setUserInput] = useState<UserInput>(DEFAULT_INPUT);
  const [preferences, setPreferences] = useState<TariffPreferences>(DEFAULT_PREFERENCES);

  const handleInputNext = (data: UserInput) => {
    setUserInput(data);
    setStep('preferences');
  };

  const handlePreferencesNext = (prefs: TariffPreferences) => {
    setPreferences(prefs);
    setStep('results');
  };

  return (
    <div>
      <Header />
      {step !== 'results' && <StepIndicator currentStep={step} />}
      <main style={{ paddingBottom: step === 'results' ? 0 : 48 }}>
        {step === 'input' && (
          <InputStep initialData={userInput} onNext={handleInputNext} />
        )}
        {step === 'preferences' && (
          <PreferencesStep
            initialPrefs={preferences}
            onNext={handlePreferencesNext}
            onBack={() => setStep('input')}
          />
        )}
        {step === 'results' && (
          <ResultsStep
            userInput={userInput}
            preferences={preferences}
            onBack={() => setStep('preferences')}
          />
        )}
      </main>
    </div>
  );
}

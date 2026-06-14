import { useState } from 'react';
import './App.css';
import { hexToRgb } from './color.js';

const DEFAULT_COLOR = '#34495e';
const ERROR_COLOR = '#e74c3c';
const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;

function App() {
  const [hex, setHex] = useState(DEFAULT_COLOR);
  const isComplete = hex.length === 7;
  const isValid = isComplete && HEX_COLOR_PATTERN.test(hex);
  const result = isComplete ? (isValid ? hexToRgb(hex) : 'Ошибка!') : '';
  const backgroundColor = isComplete
    ? (isValid ? hex : ERROR_COLOR)
    : DEFAULT_COLOR;

  return (
    <main className="app" style={{ backgroundColor }}>
      <section className="converter" aria-labelledby="converter-title">
        <header className="converter__header">
          <p className="converter__eyebrow">Конвертер цветов</p>
          <h1
            className="converter__title"
            id="converter-title"
            aria-label="Конвертер HEX в RGB"
          >
            HEX <span aria-hidden="true">→</span> RGB
          </h1>
          <p className="converter__description">
            Введите цвет в формате #RRGGBB
          </p>
        </header>

        <div className="converter__controls">
          <label className="visually-hidden" htmlFor="hex-color">
            Цвет в формате HEX
          </label>
          <input
            className="converter__input"
            id="hex-color"
            type="text"
            value={hex}
            maxLength={7}
            inputMode="text"
            autoComplete="off"
            spellCheck="false"
            aria-describedby="format-hint"
            onChange={(event) => setHex(event.target.value)}
          />
          <output
            className={`converter__result${isComplete && !isValid ? ' converter__result--error' : ''}`}
            htmlFor="hex-color"
            aria-live="polite"
          >
            {result}
          </output>
        </div>

        <p className="converter__hint" id="format-hint">
          7 символов, включая решётку
        </p>
      </section>
    </main>
  );
}

export default App;

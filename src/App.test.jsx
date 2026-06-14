import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import { hexToRgb } from './color.js';

describe('hexToRgb', () => {
  it('converts a HEX color to RGB', () => {
    expect(hexToRgb('#9921ff')).toBe('rgb(153, 33, 255)');
  });
});

describe('App', () => {
  it('shows the initial color and its RGB value', () => {
    const { container } = render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Конвертер HEX в RGB' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Цвет в формате HEX')).toHaveValue('#34495e');
    expect(screen.getByText('rgb(52, 73, 94)')).toBeInTheDocument();
    expect(screen.getByText('7 символов, включая решётку')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#34495e' });
  });

  it('converts a complete valid color and changes the background', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const input = screen.getByLabelText('Цвет в формате HEX');

    await user.clear(input);
    await user.type(input, '#9921FF');

    expect(screen.getByText('rgb(153, 33, 255)')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#9921ff' });
  });

  it('waits for all seven characters before validating', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const input = screen.getByLabelText('Цвет в формате HEX');

    await user.clear(input);
    await user.type(input, '#9921f');

    expect(screen.queryByText('Ошибка!')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#34495e' });
  });

  it('shows an error for a complete invalid color', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const input = screen.getByLabelText('Цвет в формате HEX');

    await user.clear(input);
    await user.type(input, '#привет');

    expect(screen.getByText('Ошибка!')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('converter__result--error');
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#e74c3c' });
  });
});

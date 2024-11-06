import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Real-Time Bus Tracking header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Real-Time Bus Tracking/i);
  expect(headerElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders project name', () => {
  render(<App />);
  const projectElement = screen.getByText(/Project Name/i);
  expect(projectElement).toBeInTheDocument();
});
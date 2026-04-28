import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    NavLink: ({ to, children }) => <a href={to}>{children}</a>,
    Navigate: () => null,
    Route: ({ element }) => element,
    Routes: ({ children }) => <>{children}</>,
  }),
  { virtual: true }
);

test('renders navigation and calls the codespace API endpoint', async () => {
  const originalCodespaceName = process.env.REACT_APP_CODESPACE_NAME;
  process.env.REACT_APP_CODESPACE_NAME = 'octofit-sample';

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  render(<App />);

  expect(screen.getByText(/OctoFit Tracker/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Activities/i })).toBeInTheDocument();

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://octofit-sample-8000.app.github.dev/api/activities/')
    );
  });

  process.env.REACT_APP_CODESPACE_NAME = originalCodespaceName;
  delete global.fetch;
});

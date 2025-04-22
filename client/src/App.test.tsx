import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as apiService from './services/api';

// mock the API service
jest.mock('./services/api', () => ({
  fetchItems: jest.fn(),
  fetchPriceUpdates: jest.fn(),
}));

describe('App component', () => {
  const mockItems = [
    { id: 1, name: 'Item 1', price: 10.99, updatedAt: '2025-04-22T10:00:00Z' },
    { id: 2, name: 'Item 2', price: 20.5, updatedAt: '2025-04-22T10:00:00Z' },
  ];

  beforeEach(() => {
    // reset mocks before each test
    jest.resetAllMocks();

    // our default mock implementations for core services
    apiService.fetchItems.mockResolvedValue(mockItems);
    apiService.fetchPriceUpdates.mockResolvedValue([
      { ...mockItems[0], price: 11.99, updatedAt: '2025-04-22T10:01:00Z' },
      { ...mockItems[1], price: 19.5, updatedAt: '2025-04-22T10:01:00Z' },
    ]);
  });

  afterEach(() => {
    // Ensure timers are reset after each test
    jest.useRealTimers();
  });

  test('renders the header and subscription buttons', async () => {
    render(<App />);

    // check header is rendered
    expect(screen.getByText('Price Updates Dashboard')).toBeInTheDocument();

    // check subscription buttons are rendered
    expect(screen.getByText('Subscribe to Price Updates')).toBeInTheDocument();
    expect(
      screen.getByText('Unsubscribe from Price Updates')
    ).toBeInTheDocument();

    // wait for items to load
    await waitFor(() => {
      expect(apiService.fetchItems).toHaveBeenCalled();
    });
  });

  test('should fetch and display items on load', async () => {
    render(<App />);

    // initially should show loading state
    expect(screen.getByText('Loading items...')).toBeInTheDocument();

    // wait for items to load
    await waitFor(() => {
      expect(screen.queryByText('Loading items...')).not.toBeInTheDocument();
    });

    // verify items are displayed
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // verify API was called
    expect(apiService.fetchItems).toHaveBeenCalled();
  });

  test('should fetch price updates when subscribed', async () => {
    jest.useFakeTimers();

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading items...')).not.toBeInTheDocument();
    });

    // click subscribe button
    fireEvent.click(screen.getByText('Subscribe to Price Updates'));

    // we need to ensure any pending promises resolves before we check the API call
    await Promise.resolve();

    // verify updates API was called once immediately
    expect(apiService.fetchPriceUpdates).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    // allow any pending promises to resolve again
    await Promise.resolve();

    // verify updates API was called again
    expect(apiService.fetchPriceUpdates).toHaveBeenCalledTimes(2);
  });
});

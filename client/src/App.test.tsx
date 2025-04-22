import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as apiService from './services/api';

// Mock the API service
jest.mock('./services/api', () => ({
  fetchItems: jest.fn(),
  fetchPriceUpdates: jest.fn()
}));

describe('App component', () => {
  const mockItems = [
    { id: 1, name: 'Item 1', price: 10.99, updatedAt: '2025-04-22T10:00:00Z' },
    { id: 2, name: 'Item 2', price: 20.50, updatedAt: '2025-04-22T10:00:00Z' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
    
    // Setup default mock implementations
    apiService.fetchItems.mockResolvedValue(mockItems);
    apiService.fetchPriceUpdates.mockResolvedValue([
      { ...mockItems[0], price: 11.99, updatedAt: '2025-04-22T10:01:00Z' },
      { ...mockItems[1], price: 19.50, updatedAt: '2025-04-22T10:01:00Z' },
    ]);
  });

  afterEach(() => {
    // Ensure timers are reset after each test
    jest.useRealTimers();
  });

  test('renders the header and subscription buttons', async () => {
    render(<App />);
    
    // Check header is rendered
    expect(screen.getByText('Price Updates Dashboard')).toBeInTheDocument();
    
    // Check subscription buttons are rendered
    expect(screen.getByText('Subscribe to Price Updates')).toBeInTheDocument();
    expect(screen.getByText('Unsubscribe from Price Updates')).toBeInTheDocument();
    
    // Wait for items to load
    await waitFor(() => {
      expect(apiService.fetchItems).toHaveBeenCalled();
    });
  });

  test('should fetch and display items on load', async () => {
    render(<App />);
    
    // Initially should show loading state
    expect(screen.getByText('Loading items...')).toBeInTheDocument();
    
    // Wait for items to load
    await waitFor(() => {
      expect(screen.queryByText('Loading items...')).not.toBeInTheDocument();
    });
    
    // Verify items are displayed
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    
    // Verify API was called
    expect(apiService.fetchItems).toHaveBeenCalled();
  });

  test('should fetch price updates when subscribed', async () => {
    // Use fake timers for interval testing
    jest.useFakeTimers();
    
    render(<App />);
    
    // Wait for initial items to load
    await waitFor(() => {
      expect(screen.queryByText('Loading items...')).not.toBeInTheDocument();
    });
    
    // Click subscribe button
    fireEvent.click(screen.getByText('Subscribe to Price Updates'));
    
    // Allow any pending promises to resolve
    await Promise.resolve();
    
    // Verify updates API was called once immediately
    expect(apiService.fetchPriceUpdates).toHaveBeenCalled();
    
    // Fast-forward one second
    jest.advanceTimersByTime(1000);
    
    // Allow any pending promises to resolve again
    await Promise.resolve();
    
    // Verify updates API was called again
    expect(apiService.fetchPriceUpdates).toHaveBeenCalledTimes(2);
  });
});

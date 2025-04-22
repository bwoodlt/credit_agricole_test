import React, { useState, useEffect, useRef } from 'react';
import { Item } from './types';
import { fetchItems, fetchPriceUpdates } from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const prevItemsRef = useRef<Item[]>([]);

  // Initial fetch of items
  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchItems();
        setItems(data);
        prevItemsRef.current = data;
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  // Handle subscription for price updates
  useEffect(() => {
    if (isSubscribed) {
      const fetchUpdates = async () => {
        try {
          const updatedItems = await fetchPriceUpdates();
          
          // Calculate price changes for visual indicators
          const itemsWithChanges = updatedItems.map((item) => {
            const prevItem = prevItemsRef.current.find(prev => prev.id === item.id);
            let priceChange: 'up' | 'down' | 'unchanged' = 'unchanged';
            
            if (prevItem) {
              if (item.price > prevItem.price) {
                priceChange = 'up';
              } else if (item.price < prevItem.price) {
                priceChange = 'down';
              }
            }
            
            return { ...item, priceChange };
          });
          
          setItems(itemsWithChanges);
          prevItemsRef.current = updatedItems;
        } catch (err) {
          console.error('Error fetching price updates:', err);
        }
      };

      // Fetch updates immediately and then every second
      fetchUpdates();
      intervalRef.current = window.setInterval(fetchUpdates, 1000);
    } else if (intervalRef.current !== null) {
      // Clear interval when unsubscribed
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isSubscribed]);

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Price Updates Dashboard</h1>
      </header>
      <main className="app-content">
        <div className="subscription-controls">
          <button
            className={`button ${isSubscribed ? 'button-disabled' : 'button-primary'}`}
            onClick={handleSubscribe}
            disabled={isSubscribed}
          >
            Subscribe to Price Updates
          </button>
          <button
            className={`button ${!isSubscribed ? 'button-disabled' : 'button-secondary'}`}
            onClick={handleUnsubscribe}
            disabled={!isSubscribed}
          >
            Unsubscribe from Price Updates
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <div className="items-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={`item-row ${item.priceChange || ''}`}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td className="price-cell">
                      ${item.price.toFixed(2)}
                      {item.priceChange && (
                        <span className={`price-indicator ${item.priceChange}`}>
                          {item.priceChange === 'up' ? '▲' : item.priceChange === 'down' ? '▼' : ''}
                        </span>
                      )}
                    </td>
                    <td>{new Date(item.updatedAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PriceUpdatesApi.Models;

namespace PriceUpdatesApi.Services
{
    public interface IItemService
    {
        List<Item> GetAllItems();
        Task<List<Item>> UpdatePrices();
    }

    public class ItemService : IItemService
    {
        // Initialize the static field with an empty list to fix the CS8618 warning
        private static List<Item> _items = new List<Item>();
        private static readonly Random _random = new Random();
        private static readonly object _lock = new object();
        private static bool _isInitialized = false;

        public ItemService()
        {
            // we're using a static list here for this sample exercise. we initialize the items list only once to avoid reinitialization on every request
            // this is a simple in-memory store, in a real application I'd use get data from a database or other persistent storage
            if (!_isInitialized)
            {
                lock (_lock)
                {
                    if (!_isInitialized)
                    {
                        _items = Enumerable.Range(1, 10)
                            .Select(i => new Item
                            {
                                Id = i,
                                Name = $"Item {i}",
                                Price = Math.Round((decimal)(_random.NextDouble() * 100), 2),
                                UpdatedAt = DateTime.Now
                            })
                            .ToList();
                        _isInitialized = true;
                    }
                }
            }
        }

        public List<Item> GetAllItems()
        {
            return _items.ToList();
        }

        public Task<List<Item>> UpdatePrices()
        {
            foreach (var item in _items)
            {
                // we will just get random price change between -5% and +5%
                decimal priceChange = (decimal)((_random.NextDouble() * 0.1) - 0.05);
                item.Price = Math.Max(0.01m, Math.Round(item.Price * (1 + priceChange), 2));
                item.UpdatedAt = DateTime.Now;
            }

            return Task.FromResult(_items.ToList());
        }
    }
}
using System;

namespace PriceUpdatesApi.Models
{
    public class Item
    {
        public int Id { get; set; }
        required public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
using Microsoft.AspNetCore.Mvc;
using PriceUpdatesApi.Models;
using PriceUpdatesApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PriceUpdatesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(IItemService itemService, ILogger<ItemsController> logger)
        {
            _itemService = itemService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            _logger.LogInformation("Getting all items");
            return Ok(_itemService.GetAllItems());
        }

        [HttpGet("update")]
        public async Task<ActionResult<IEnumerable<Item>>> UpdatePrices()
        {
            _logger.LogInformation("Updating prices");
            var items = await _itemService.UpdatePrices();
            return Ok(items);
        }
    }
}
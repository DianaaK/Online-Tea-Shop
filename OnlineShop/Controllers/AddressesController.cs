using Microsoft.AspNetCore.Mvc;
using OnlineShop.Entities;
using OnlineShop.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressesController(IAddressService addressService)
        {
            this._addressService = addressService;
        }

        [HttpPost("create")]
        public IActionResult Create(Address payload)
        {
            _addressService.Insert(payload);
            return Ok();
        }

        [HttpPost("update")]
        public IActionResult Update(Address payload)
        {
            _addressService.Update(payload);
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Entities;
using OnlineShop.IServices;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _service;
        public OrdersController(IOrderService service)
        {
            this._service = service;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var response = _service.GetAll();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _service.GetById(id);
            return Ok(response);
        }

        [HttpGet("active/{userId}")]
        public IActionResult GetActiveOrder(int userId)
        {
            var response = _service.GetCartOrder(userId);
            return Ok(response);
        }

        [HttpGet("all/{userId}")]
        public IActionResult GetOrdersForUser(int userId)
        {
            var response = _service.GetOrdersForUser(userId);
            return Ok(response);
        }

        [HttpPost("update")]
        public IActionResult Update(Order payload)
        {
            _service.Update(payload);
            return Ok();
        }

        [HttpPost("create")]
        public IActionResult Create(Order payload)
        {
             _service.Insert(payload);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }

        [HttpPost("order-product")]
        public IActionResult AddProductToOrder(ProductOrderRegister payload)
        {
            _service.AddProductToOrder(payload);
            return Ok();
        }

        [HttpDelete("delete-order-product")]
        public IActionResult DeleteProductFromOrder(ProductOrderRegister payload)
        {
            var response = _service.RemoveProductFromOrder(payload);
            return Ok(response);
        }
    }
}

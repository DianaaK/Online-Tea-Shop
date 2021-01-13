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
    public class UsersController : ControllerBase
    {

        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _userService.GetById(id);
            return Ok(response);
        }

        [HttpPost("update")]
        public IActionResult Update(User payload)
        {
            _userService.Update(payload);
            return Ok();
        }
    }
}

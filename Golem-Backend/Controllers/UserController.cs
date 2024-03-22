using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Golem.DTOs;
using Golem.Interfaces;
using Golem.Models;
using Golem.Configuration;
using System.Security.Claims;

namespace Golem.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _contract;
        private readonly UserManager<AppUser> _userManager;
        public UserController(IUserService contract, UserManager<AppUser> userManager)
        {
            _contract = contract;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            return Ok(await _contract.GetUsers());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AppUser>> GetUserById(string id)
        {
            return Ok(await _contract.GetUserById(id));
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return Ok(await _contract.DeleteUser(id));
        }
    }
}
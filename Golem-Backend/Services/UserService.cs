using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Golem.DTOs;
using Golem.Interfaces;
using Golem.Models;
using Golem.Configuration;
using Golem.DTOs;
using System.Security.Claims;

namespace Golem.Services
{
    public class UserService : ControllerBase, IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public UserService(UserManager<AppUser> userManager, IMapper mapper, ApplicationDbContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            //var users = await _userManager.Users.ToListAsync();
            var users = await _userManager.Users.Include(p => p.Photos)
                .Select(x => new UserDto
                {
                    Email = x.Email,
                    FirstName = x.FirstName,
                    Gender = x.Gender,
                    Id = x.Id,
                    LastName = x.LastName,
                    Username = x.UserName,
                    ProfileImage = x.Photos.FirstOrDefault(x => x.IsMain).Url,
                    ImageId = x.Photos.FirstOrDefault(x => x.IsMain).Id,
                })
                .ToListAsync();

            //var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);

            return Ok(users);
        }

        public async Task<ActionResult<UserDto>> GetUserById(string id)
        {
            var user = await _userManager.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }
            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                Gender = user.Gender,
                ProfileImage = user.Photos.FirstOrDefault(p => p.IsMain).Url
            };
        }


        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return NoContent();
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Golem.DTOs;
using Golem.DTOs;

namespace Golem.Interfaces
{
    public interface IUserService
    {
        Task<ActionResult<IEnumerable<UserDto>>> GetUsers();
        Task<ActionResult<UserDto>> GetUserById(string id);
        Task<IActionResult> DeleteUser(string id);
    }
}
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Golem.Interfaces;
using Golem.ProfileSpace;

namespace Golem.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProfilesController : BaseController, IProfilesController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return await (Mediator.Send(new Details.Query { Username = username }));
        }
    }
}

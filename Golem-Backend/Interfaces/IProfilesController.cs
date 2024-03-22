using Microsoft.AspNetCore.Mvc;
using Golem.ProfileSpace;

namespace Golem.Interfaces
{
    public interface IProfilesController
    {
        Task<ActionResult<Profile>> GetProfile(string username);
    }
}

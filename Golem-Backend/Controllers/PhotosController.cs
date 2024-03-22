using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Golem.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Golem.Photos;
using Polly;
using Golem.Models;
using Golem.Photos;
using Microsoft.AspNetCore.Authorization;

namespace Golem.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
        [HttpPost("{id}/setMain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await Mediator.Send(new SetMain.Command { Id = id });
        }
    }
}
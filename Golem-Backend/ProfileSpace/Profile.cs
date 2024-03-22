using Golem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Golem.ProfileSpace
{
    public class Profile
    {
        public string Username { get; set; }
        public string Image { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
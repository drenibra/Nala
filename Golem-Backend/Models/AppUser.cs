using Microsoft.AspNetCore.Identity;

namespace Golem.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public char Gender { get; set; }
        public ICollection<Photo>? Photos { get; set; }
    }
}

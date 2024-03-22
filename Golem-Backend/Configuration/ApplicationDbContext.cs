using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Golem.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Golem.Configuration
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Entity<AppUser>()
            //    .HasDiscriminator<string>("Discriminator")
            //    .HasValue<AppUser>("AppUser")
            //    .HasValue<Student>("Student");
        }
        public DbSet<Photo> Photos { get; set; }
    }
}

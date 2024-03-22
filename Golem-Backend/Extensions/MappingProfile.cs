using AutoMapper;
using Golem.DTOs;
using Golem.Models;
using Golem.DTOs;

namespace Golem.Extensions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<AppUser, ProfileSpace.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}

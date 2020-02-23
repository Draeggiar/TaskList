using System.Linq;
using AutoMapper;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserTaskEntity, UserTaskDetailsViewModel>().ReverseMap();
            CreateMap<TaskGroupEntity, TaskGroupViewModel>()
                .ForMember(dest => dest.UserTasks,
                    opt => opt.MapFrom(src => src.UserTasks.Select(t => t.Id)))
                .ReverseMap()
                .ForMember(dest => dest.UserTasks, opt => opt.Ignore());
        }
    }
}
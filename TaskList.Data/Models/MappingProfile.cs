using AutoMapper;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserTaskEntity, UserTaskViewModel>().ReverseMap();
            CreateMap<TaskGroupEntity, TaskGroupViewModel>().ReverseMap();
            CreateMap<UserEntity, UserViewModel>().ReverseMap();
        }
    }
}
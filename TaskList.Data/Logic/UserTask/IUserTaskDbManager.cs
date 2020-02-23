using System.Collections.Generic;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.UserTask
{
    public interface IUserTaskDbManager
    {
        List<UserTaskViewModel> Get();
        UserTaskViewModel Get(int id);
        UserTaskEntity Create(UserTaskViewModel taskViewModel);
        void Update(int id, UserTaskViewModel taskViewModel);
        void Remove(int id);
    }
}
using System.Collections.Generic;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.UserTask
{
    public interface IUserTaskDbManager
    {
        List<UserTaskDetailsViewModel> Get();
        UserTaskDetailsViewModel Get(int id);
        int Create(UserTaskDetailsViewModel taskDetailsViewModel);
        bool Update(int id, UserTaskDetailsViewModel taskDetailsViewModel);
        bool Remove(int id);
    }
}
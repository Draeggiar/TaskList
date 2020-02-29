using System.Collections.Generic;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.UserTask
{
    public interface IUserTaskDbManager
    {
        List<UserTaskViewModel> Get();
        UserTaskViewModel Get(int id);
        int Create(UserTaskViewModel taskDetailsViewModel);
        bool Update(int id, UserTaskViewModel taskDetailsViewModel);
        bool Remove(int id);
    }
}
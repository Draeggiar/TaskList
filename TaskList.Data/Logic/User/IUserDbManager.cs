using System.Collections.Generic;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.User
{
    public interface IUserDbManager
    {
        List<UserViewModel> Get();
    }
}
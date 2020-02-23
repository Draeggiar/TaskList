using System.Collections.Generic;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.TaskGroup
{
    public interface ITaskGroupDbManager
    {
        List<TaskGroupViewModel> Get();
        TaskGroupViewModel Get(int id);
        TaskGroupEntity Create(TaskGroupViewModel task);
        bool Update(int id, TaskGroupViewModel task);
        bool Remove(int id);
    }
}
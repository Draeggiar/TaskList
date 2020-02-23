using Microsoft.EntityFrameworkCore;
using TaskList.Data.Models.DbEntities;

namespace TaskList.Data
{
    public interface ITasksDbContext
    {
        DbSet<TaskGroupEntity> TaskGroups { get; set; }
        DbSet<UserTaskEntity> UserTasks { get; set; }
    }
}
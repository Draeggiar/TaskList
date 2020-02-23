using Microsoft.EntityFrameworkCore;
using TaskList.Data.Models.DbEntities;

namespace TaskList.Data
{
    public class TasksDbContext : DbContext, ITasksDbContext
    {
        public DbSet<TaskGroupEntity> TaskGroups { get; set; }
        public DbSet<UserTaskEntity> UserTasks { get; set; }

        public TasksDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
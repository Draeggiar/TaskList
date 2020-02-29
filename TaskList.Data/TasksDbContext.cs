using Microsoft.EntityFrameworkCore;
using TaskList.Data.Models.DbEntities;

namespace TaskList.Data
{
    public class TasksDbContext : DbContext
    {
        public DbSet<TaskGroupEntity> TaskGroups { get; set; }
        public DbSet<UserTaskEntity> UserTasks { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        public TasksDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserEntity>().HasData(new UserEntity
            {
                Id = 1,
                FirstName = "Krystian",
                LastName = "Nowak"
            }, new UserEntity
            {
                Id = 2,
                FirstName = "Maciej",
                LastName = "Kowalski"
            }, new UserEntity
            {
                Id = 3,
                FirstName = "Zbigniew",
                LastName = "Czajka"
            });
        }
    }
}
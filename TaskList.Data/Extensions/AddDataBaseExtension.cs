using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace TaskList.Data.Extensions
{
    public static class AddDataBaseExtension
    {
        public static void AddDataBase(this IServiceCollection services)
        {
            services.AddDbContext<TasksDbContext>(opt => opt.UseInMemoryDatabase(databaseName: "TaskList"));
            services.AddScoped<ITasksDbContext, TasksDbContext>();
        }
    }
}
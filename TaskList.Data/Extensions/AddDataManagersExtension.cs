using Microsoft.Extensions.DependencyInjection;
using TaskList.Data.Logic.TaskGroup;
using TaskList.Data.Logic.UserTask;

namespace TaskList.Data.Extensions
{
    public static class AddDataManagersExtension
    {
        public static void AddDataManagers(this IServiceCollection services)
        {
            services.AddScoped<IUserTaskDbManager, UserTaskDbManager>();
            services.AddScoped<ITaskGroupDbManager, TaskGroupDbManager>();
        }
    }
}
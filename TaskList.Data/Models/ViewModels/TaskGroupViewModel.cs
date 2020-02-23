using System.Collections.Generic;

namespace TaskList.Data.Models.ViewModels
{
    public class TaskGroupViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<int> UserTasks { get; set; }
    }
}
using System;

namespace TaskList.Data.Models.ViewModels
{
    public class UserTaskDetailsViewModel : SimpleUserTaskViewModel
    {
        public DateTime Deadline { get; set; }
        public int? UserId { get; set; }
        public int TaskStatus { get; set; }
        public int GroupId { get; set; }
    }
}
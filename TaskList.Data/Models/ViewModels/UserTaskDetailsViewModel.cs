using System;
using TaskList.Data.Enums;

namespace TaskList.Data.Models.ViewModels
{
    public class UserTaskDetailsViewModel : SimpleUserTaskViewModel
    {
        public DateTime Deadline { get; set; }
        public int? UserId { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public int GroupId { get; set; }
    }
}
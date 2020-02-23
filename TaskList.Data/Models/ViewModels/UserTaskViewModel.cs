using System;
using TaskList.Data.Enums;

namespace TaskList.Data.Models.ViewModels
{
    public class UserTaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Deadline { get; set; }
        public int? UserId { get; set; }
        public TaskStatus TaskStatus { get; set; }
    }
}
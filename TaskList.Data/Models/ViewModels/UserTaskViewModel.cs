using System;

namespace TaskList.Data.Models.ViewModels
{
    public class UserTaskViewModel : IEquatable<UserTaskViewModel>
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public DateTime Deadline { get; set; }
        public UserViewModel User { get; set; }
        public int TaskStatus { get; set; }
        public int GroupId { get; set; }

        public bool Equals(UserTaskViewModel other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id
                   && Name == other.Name
                   && Deadline.Equals(other.Deadline)
                   && User == other.User
                   && TaskStatus == other.TaskStatus
                   && GroupId == other.GroupId;
        }
    }
}
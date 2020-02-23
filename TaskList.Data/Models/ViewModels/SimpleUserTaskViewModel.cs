using System;

namespace TaskList.Data.Models.ViewModels
{
    public class SimpleUserTaskViewModel : IEquatable<SimpleUserTaskViewModel>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool Equals(SimpleUserTaskViewModel other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id && Name == other.Name;
        }
    }
}
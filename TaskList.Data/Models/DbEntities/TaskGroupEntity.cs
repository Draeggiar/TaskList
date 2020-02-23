using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskList.Data.Models.DbEntities
{
    public class TaskGroupEntity
    {
        public TaskGroupEntity()
        {
            UserTasks = new List<UserTaskEntity>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [InverseProperty("Group")]
        public virtual ICollection<UserTaskEntity> UserTasks { get; set; }
    }
}
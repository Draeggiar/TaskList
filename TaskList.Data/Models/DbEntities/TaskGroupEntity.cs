using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace TaskList.Data.Models.DbEntities
{
    public class TaskGroupEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<UserTaskEntity> UserTasks { get; set; }
    }
}
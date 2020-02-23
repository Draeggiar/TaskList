using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskList.Data.Models.DbEntities
{
    public class UserTaskEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Deadline { get; set; }
        public int UserId { get; set; }
        public int TaskStatus { get; set; }

        public int GroupId { get; set; }
        [ForeignKey("GroupId")]
        public virtual TaskGroupEntity Group { get; set; }
    }
}
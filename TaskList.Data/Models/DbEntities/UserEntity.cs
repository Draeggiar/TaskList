using System.ComponentModel.DataAnnotations;

namespace TaskList.Data.Models.DbEntities
{
    public class UserEntity
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
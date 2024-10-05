using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class PermissonRole
    {

        public PermissonRole() { }

        public PermissonRole(int? id, string? name, byte? status)
        {
            Id = id;
            Name = name;
            Status = status;


        }


        [Key]

        public int? Id { get; set; }
        public string? Name { get; set; }

        public byte? Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
      public class RoleModel
      {
            public RoleModel() { }

            public RoleModel(int? id, string? name)
            {
                  Id = id;
                  Name = name;
            }

            [Key]
            public int? Id { get; set; }
            public string? Name { get; set; }
      }
}

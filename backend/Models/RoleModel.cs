using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
      public class RoleModel
      {
            // Parameterless constructor required by EF Core
            public RoleModel() { }

            public RoleModel(int? id, string name)
            {
                  Id = id;
                  Name = name;
            }
        [Key]

            public int? Id { get; set; }
            public string? Name { get; set; }
      }
}

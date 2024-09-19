using System.ComponentModel;

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

            public int? Id { get; set; }
            public string? Name { get; set; }
      }
}

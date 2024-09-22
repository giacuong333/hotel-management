using System.ComponentModel;
using System.Text.Json.Serialization;

namespace backend.Models
{
      public class UserModel
      {
            // Parameterless constructor required by EF Core
            public UserModel() { }

            public UserModel(int? id, string? name, string? email, string? password, string? phoneNumber, string? gender, DateTime dob, int roleId, bool firstBook, DateTime createdAt, DateTime? updatedAt, DateTime? deletedAt)
            {
                  Id = id;
                  Name = name;
                  Email = email;
                  Password = password;
                  PhoneNumber = phoneNumber;
                  Gender = gender;
                  Dob = dob;
                  RoleId = roleId;
                  FirstBook = firstBook;
                  CreatedAt = createdAt;
                  UpdatedAt = updatedAt;
                  DeletedAt = deletedAt;
            }

            public int? Id { get; set; }
            public string? Name { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }
            public string? PhoneNumber { get; set; }
            public string? Gender { get; set; }
            public DateTime? Dob { get; set; }
            public int RoleId { get; set; }
            public bool FirstBook { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public DateTime? DeletedAt { get; set; }

            public virtual RoleModel? Role { get; set; }
      }
}

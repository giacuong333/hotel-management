using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
      public class UserModel
      {
            // Parameterless constructor required by EF Core
            public UserModel() { }

            public UserModel(int? id, string? name, string? email, byte[]? avatar, string? password, string? phoneNumber, string? gender, DateTime? dob, int? roleId, bool? firstBook, DateTime? createdAt, DateTime? updatedAt, DateTime? deletedAt)
            {
                  Id = id;
                  Name = name;
                  Email = email;
                  Avatar = avatar;
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

            [Key]
            public int? Id { get; set; }
            public string? Name { get; set; }
            public string? Email { get; set; }
            public byte[]? Avatar { get; set; }
            public string? Password { get; set; }
            public string? PhoneNumber { get; set; }
            public string? Gender { get; set; }
            [ForeignKey("Roles")]
            public int? RoleId { get; set; }
            public bool? FirstBook { get; set; }
            public DateTime? Dob { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public DateTime? CreatedAt { get; set; }
            [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            public DateTime? UpdatedAt { get; set; }
            public DateTime? DeletedAt { get; set; }

            public virtual RoleModel? Roles { get; set; }
      }
}

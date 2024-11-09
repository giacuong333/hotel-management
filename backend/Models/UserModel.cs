using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
      public class UserModel
      {
            public UserModel() { }

            [Key]
            public int Id { get; set; }
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

            public virtual RoleModel? Roles { get; set; } // Navigation property for RoleModel
      }
}

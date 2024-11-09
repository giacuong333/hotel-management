using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class RolepermissionModel
    {



        public RolepermissionModel() { }

        public RolepermissionModel(int? id, int? roleId, int? permissionID, string? resource)
        {
            Id = id;
            RoleId = roleId;
            PermissionId = permissionID;
            Resource = resource;
        }


        [Key]

        public int? Id { get; set; }

        public int? RoleId { get; set; }

        public int? PermissionId { get; set; }

        public string? Resource { get; set; }

        public RoleModel Role { get; set; }

        public PermissionModel Permission { get; set; }
    }
}

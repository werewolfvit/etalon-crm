using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class UserModel
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime? TimeLimit { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? PhotoId { get; set; }
        public string PhotoUrl { get; set; }
    }
}

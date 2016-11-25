using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    /* Users */
    public partial class DbService
    {
        public void DeleteUser(UserModel user)
        {
            //
        }

        public void UpdateUser(UserModel user)
        {
            using (var db = GetDataContext())
            {
                var currUser = db.Users.Single(x => x.UserId == user.UserId);
                currUser.Description = user.Description;
                currUser.Email = user.Email;
                currUser.IsActive = user.IsActive;
                currUser.Middlename = user.Middlename;
                currUser.Phone = user.Phone;
                currUser.PhotoId = user.PhotoId;
                currUser.Position = user.Position;
                currUser.Name = user.Name;
                currUser.Surname = user.Surname;
                currUser.TimeLimit = user.TimeLimit;
                currUser.UserName = user.UserName;
                db.SubmitChanges();
            }
        }

        public IEnumerable<UserModel> ListUser()
        {
            using (var db = GetDataContext())
            {
                return db.Users.Select(x => new UserModel()
                {
                    UserId = x.UserId,
                    UserName = x.UserName,
                    Name = x.Name,
                    Surname = x.Surname,
                    Middlename = x.Middlename,
                    Position = x.Position,
                    Description = x.Description,
                    Email = x.Email,
                    Phone = x.Phone,
                    IsActive = x.IsActive,
                    PhotoId = x.PhotoId,
                    PhotoUrl = GetRelativeUrl(x.File.Path),
                    TimeLimit = x.TimeLimit,
                }).ToList();
            }
        }

        public void SetUserPhotoId(int fileId, string userId)
        {
            using (var db = GetDataContext())
            {
                var curUser = db.Users.Single(x => x.UserId == Guid.Parse(userId));
                curUser.PhotoId = fileId;
                db.SubmitChanges();
            }
        }
    }
}

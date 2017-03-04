using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    //class GroupService
    public partial class DbService
    {
        public List<GroupModel> GetGroupsAll()
        {
            using (var db = GetDataContext())
            {
                return db.MsgGroups.Select(x => new GroupModel()
                {
                    GroupId = x.GroupId.ToString(),
                    GroupName = x.Name
                }).ToList();
            }
        }

        public List<string> GetGroupsByUserId(string userId)
        {
            using (var db = GetDataContext())
            {
                return db.UsersMsgGroups.Where(x => x.UserId == new Guid(userId)).Select(x => x.MsgGroup.Name).ToList();
            }
        }

        public void SetGroupsByUserId(string userId, List<string> groups)
        {
            using (var db = GetDataContext())
            {
                var curGroups = db.UsersMsgGroups.Where(x => x.UserId == new Guid(userId)).Select(x => x.MsgGroup.Name).ToList();

                var groupsToAdd = groups.Except(curGroups);
                var groupsToDel = curGroups.Except(groups);

                var toAdd = db.MsgGroups.Where(x => groupsToAdd.Contains(x.Name));
                foreach (var msgGroup in toAdd)
                {
                    db.UsersMsgGroups.InsertOnSubmit(new UsersMsgGroup()
                    {
                        GroupId = msgGroup.GroupId,
                        UserId = new Guid(userId)
                    });
                }

                var toDel = db.UsersMsgGroups.Where(x => x.UserId == new Guid(userId) && groupsToDel.Contains(x.MsgGroup.Name));
                foreach (var usersMsgGroup in toDel)
                {
                    db.UsersMsgGroups.DeleteOnSubmit(usersMsgGroup);
                }

                db.SubmitChanges();
            }
        }
    }
}

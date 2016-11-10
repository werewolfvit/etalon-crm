using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace DataService
{
    /* Messages */
    public partial class DbService
    {
        public IEnumerable<UserModel> GetRecepientList(string roleId)
        {
            using (var db = GetDataContext())
            {
                return db.Users.Select(x => new UserModel()
                {
                    UserName = x.UserName,
                    Surname = x.Surname,
                    Middlename = x.Middlename,
                    Position = x.Position,
                    UserId = x.UserId
                });
            }
        }

        public IEnumerable<MessageOutModel> GetMessages(string userId)
        {
            //using (var db = GetDataContext())
            //{
            //    var messages = db.MessageRecepients
            //        .Where(x => x.UserId.ToString() == userId)
            //        .Select(x => x.Message);
            //    return messages.Select(x => new MessageModel()
            //    {
            //        MessageText = x.MessageText,
            //        IdRecord = x.IdRecord,
            //        Sender = new UserModel()
            //        {
                        
            //        }
            //    })
                
            //}
            throw new Exception();
        }
    }
}

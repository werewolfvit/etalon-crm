using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using DataModel;

namespace DataService
{
    /* Messages */

    public partial class DbService
    {
        public List<RecepientModel> GetRecepientList(Guid userId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var allRecepients = new List<RecepientModel>();

                    var curUserMsgGroupIds = db.UsersMsgGroups.Where(x => x.UserId == userId).Select(x => x.GroupId).Distinct().ToList();
                    var curUserGroups =
                        db.MsgGroupsLinks.Where(x => curUserMsgGroupIds.Contains(x.FirstGroupId))
                            .Select(x => new RecepientModel()
                            {
                                IdRecord = x.SecondGroupId.ToString(),
                                Recepient = x.MsgGroup1.Name
                            }).ToList();

                    curUserGroups.AddRange(
                        db.MsgGroupsLinks.Where(x => curUserMsgGroupIds.Contains(x.SecondGroupId))
                            .Select(x => new RecepientModel()
                            {
                                IdRecord = x.FirstGroupId.ToString(),
                                Recepient = x.MsgGroup.Name
                            }).ToList());
                    

                    var groupsIds = curUserGroups.Select(y => y.IdRecord);
                    var users =
                        db.UsersMsgGroups.Where(x => groupsIds.Contains(x.GroupId.ToString()))
                            .Select(x => new RecepientModel()
                            {
                                IdRecord = x.User.UserId.ToString(),
                                Recepient = string.Format("{0} - {1} {2}", x.User.Company.Name, x.User.Surname, x.User.Name)
                            }).ToList();

                    var result = curUserGroups.Select(x => new RecepientModel()
                    {
                        IdRecord = x.IdRecord,
                        Recepient = x.Recepient//$"Группа - {x.Recepient}"
                    }).ToList();
                    result.AddRange(users);

                   result = result.GroupBy(x => x.IdRecord).Select(x => x.First()).ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't get recepient list");
            }
        }

        public List<UserMessageModel> GetIncomeMessages(string userId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    return db.MessageRecepients
                        .Where(x => x.ToUserId.ToString() == userId)
                        .Join(
                            db.Messages,
                            r => r.MessageId,
                            m => m.IdRecord,
                            (r, m) => new {msg = m, rec = r})
                        .Select(x => new UserMessageModel()
                        {
                            DateCreate = x.msg.DateCreate,
                            IdRecord = x.msg.IdRecord.ToString(),
                            IsReaded = x.rec.IsReaded,
                            Subject = x.msg.Subject,
                            Text = x.msg.MessageText,
                            TextTo = x.msg.ToUserText,
                            TextFrom = string.Format("{0} - {1} {2}", x.msg.User.Company.Name, x.msg.User.Surname, x.msg.User.Name),
                            UserIdFrom = x.msg.FromUserId.ToString()
                        }).ToList();
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't get income messages");
            }
            return null;
        }

        public List<UserMessageModel> GetOutcomeMessages(string userId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    return db.Messages.Where(x => x.FromUserId.ToString() == userId).Select(x => new UserMessageModel()
                    {
                        DateCreate = x.DateCreate,
                        IdRecord = x.IdRecord.ToString(),
                        //IsReaded = x.IsReaded,
                        Subject = x.Subject,
                        Text = x.MessageText,
                        TextFrom = x.User.UserName,
                        TextTo = x.ToUserText
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't get outcome messages");
            }

            return null;
        }

        public void SendMessage(UserMessageModel message, string userId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var recepientsList = new List<string>();
                    var userGroupList =
                        db.UsersMsgGroups.Where(x => message.Recepients.Contains(x.GroupId.ToString())).ToList();

                    var msgGroups = userGroupList.Select(x => x.MsgGroup).Distinct().ToList();
                    recepientsList.AddRange(msgGroups.Select(x => $"Группа - {x.Name}"));

                    var userList = db.Users.Where(x => message.Recepients.Contains(x.UserId.ToString())).ToList();
                    recepientsList.AddRange(userList.Select(x => x.UserName));

                    var recepientsStr = string.Join("; ", recepientsList);

                    var recepientsIdList = userGroupList.Select(x => x.UserId).ToList();
                    recepientsIdList.AddRange(userList.Select(x => x.UserId));
                    recepientsIdList = recepientsIdList.Distinct().ToList();

                    using (var tranScope = new TransactionScope())
                    {
                        using (var db_send = GetDataContext())
                        { 
                            try
                            {
                                Message msg = new Message
                                {
                                    DateCreate = DateTime.Now,
                                    FromUserId = new Guid(userId),
                                    MessageText = message.Text,
                                    Subject = message.Subject,
                                    ToUserText = recepientsStr
                                };
                                db_send.Messages.InsertOnSubmit(msg);
                                db_send.SubmitChanges();

                                foreach (var recepientId in recepientsIdList)
                                {
                                    MessageRecepient msgRecep = new MessageRecepient
                                    {
                                        MessageId = msg.IdRecord,
                                        ToUserId = recepientId,
                                        IsReaded = false
                                    };
                                    db_send.MessageRecepients.InsertOnSubmit(msgRecep);
                                }
                                db_send.SubmitChanges();

                                tranScope.Complete();
                            }
                            catch (Exception ex)
                            {
                                throw new Exception(ex.Message);
                            }
                        }
                    }

                    /*-------*/
                    try
                    {
                        var addresses = userGroupList.Select(x => x.User.Email).ToList();
                        addresses.AddRange(userList.Select(x => x.Email));
                        addresses = addresses.Distinct().ToList();

                        string sender = db.Users.Single(x => x.UserId.ToString() == userId).UserName;
                        string textToSend = string.Format("Автор сообщения: <b>{0}</b><br />Текст сообщения: <b>{1}</b><br /><br />", sender, message.Text);

                        MailSender.Send("Вам пришло новое сообщение в системе бизнес-центра \"Эталон\"", textToSend, addresses);
                    }
                    catch (Exception ex)
                    {
                        _logger.Error(ex.Message);
                    }
                    /*-------*/
                }
            }
            catch (Exception ex)
            {
                // log
                throw new Exception("Can't send message");
            }
        }

        public void SetMessageReaded(int messageId, string userId)
        {
            try
            {
                using (var db = GetDataContext())
                {
                    var userGuid = new Guid(userId);
                    var msg = db.MessageRecepients.Single(x => x.ToUserId == userGuid && x.MessageId == messageId);
                    msg.IsReaded = true;
                    db.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using DataModel;
using DataService;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;
using DataService;
using Microsoft.AspNet.Identity;


namespace etalon_crm_web.API
{
    [Authorize]
    public class MessagesController : ApiController
    {
        private DbService _dbService;

        public MessagesController()
            : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public MessagesController(DbService dbService)
        {
            _dbService = dbService;
        }

        public MessageModel GetRecepientList()
        {
            try
            {
                return MessageBuilder.GetSuccessMessage(_dbService.GetRecepientList(new Guid(User.Identity.GetUserId())));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        public MessageModel SendMessage(JObject jsonData)
        {
            try
            {
                var message = jsonData.ToObject<UserMessageModel>();
                _dbService.SendMessage(message, User.Identity.GetUserId());
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        public MessageModel SetReaded(int messageId)
        {
            try
            {
                _dbService.SetMessageReaded(messageId, User.Identity.GetUserId());
                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        public MessageModel GetIncomeMessagesList()
        {
            try
            {
                return MessageBuilder.GetSuccessMessage(_dbService.GetIncomeMessages(User.Identity.GetUserId()));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        public MessageModel GetOutcomeMessagesList()
        {
            try
            {
                return MessageBuilder.GetSuccessMessage(_dbService.GetOutcomeMessages(User.Identity.GetUserId()));
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        public MessageModel SetReaded(JObject jsonData)
        {
            throw new Exception();
        }
    }
}

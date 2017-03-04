using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataService;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;

namespace etalon_crm_web.API
{
    [Authorize(Roles = "Admin")]
    public class GroupsController : ApiController
    {
        private DbService _dbService;

        public GroupsController()
            : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public GroupsController(DbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost]
        public MessageModel SetByUserId(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                string[] needGroups = new string[]{};
                try
                {
                    var groupsArr = JArray.Parse(data.Data.ToString());
                   needGroups = groupsArr.ToObject<string[]>();
                }
                catch (Exception ex)
                {
                    // log
                }
                
                string userId = data.UserId;
                _dbService.SetGroupsByUserId(userId, new List<string>(needGroups));

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpGet]
        public MessageModel GetAll()
        {
            return MessageBuilder.GetSuccessMessage(_dbService.GetGroupsAll());
        }

        [HttpGet]
        public MessageModel GetByUserId(string userId)
        {
            return MessageBuilder.GetSuccessMessage(_dbService.GetGroupsByUserId(userId));
        }
    }
}

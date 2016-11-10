using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataService;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;
using DataService;


namespace etalon_crm_web.API
{
    [Authorize]
    public class MessagesController : ApiController
    {
        private DbService _dbService;

        public MessageModel GetRecepientList()
        {
            //_dbService.
            throw new Exception();
        }

        public MessageModel SendMessage(JObject jsonData)
        {
            throw new Exception();  
        }

        public MessageModel GetMails(JObject jsonData)
        {
            throw new Exception();
        }

        public MessageModel SetReaded(JObject jsonData)
        {
            throw new Exception();
        }
    }
}

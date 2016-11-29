using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataModel;
using DataService;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;

namespace etalon_crm_web.API
{
    public class RoomPhotosController : ApiController
    {
        private DbService _dbService;

        public RoomPhotosController() : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {

        }

        public RoomPhotosController(DbService dbService)
        {
            _dbService = dbService;
        }

        [HttpGet]
        public MessageModel List()
        {
            return MessageBuilder.GetSuccessMessage(_dbService.ListRoomPhoto());
        }

        [HttpPost]
        public MessageModel Delete(JObject jsonData)
        {
            RoomPhotoModel roomPhoto = jsonData.ToObject<RoomPhotoModel>();
            _dbService.DeleteRoomPhoto(roomPhoto);
            return MessageBuilder.GetSuccessMessage(null);
        }
    }
}

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
    [Authorize]
    public class RoomsController : ApiController
    {
        private DbService _dbService;

        public RoomsController() : this(new DbService(ConfigurationManager.ConnectionStrings["EtalonCrmDb"].ConnectionString))
        {
            
        }

        public RoomsController(DbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost]
        public MessageModel Add(JObject jsonData)
        {
            try
            {
                RoomModel roomModel = jsonData.ToObject<RoomModel>();

                var answerRoom = _dbService.AddRoom(roomModel);
                return MessageBuilder.GetSuccessMessage(answerRoom);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpPost]
        public MessageModel Update(JObject jsonData)
        {
            try
            {
                RoomModel roomModel = jsonData.ToObject<RoomModel>();
                _dbService.UpdateRoom(roomModel);

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [HttpGet]
        public MessageModel List()
        {
            return MessageBuilder.GetSuccessMessage(_dbService.ListRoom());
        }

        [AllowAnonymous]
        [HttpGet]
        public MessageModel ListPublic()
        {
            return MessageBuilder.GetSuccessMessage(_dbService.ListRoomPublic());
        }

        [HttpPost]
        public MessageModel Delete(JObject jsonData)
        {
            RoomModel roomModel = jsonData.ToObject<RoomModel>();
            _dbService.DeleteRoom(roomModel);

            return MessageBuilder.GetSuccessMessage(null);
        }
    }
}
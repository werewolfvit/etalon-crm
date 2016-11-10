using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;

namespace etalon_crm_web.API
{
    public class Rent
    {
        public int SquareId { get; set; }
        public int Floor { get; set; }
        public string Number { get; set; }
        public double Square { get; set; }
        public double Price { get; set; }
        public bool IsFree { get; set; }
        public int X1 { get; set; }
        public int X2 { get; set; }
        public int Y1 { get; set; }
        public int Y2 { get; set; }
    }

    public class RentsController : ApiController
    {
        private static List<Rent> _rents = new List<Rent>();
        private static int _squareId = 0;

        [System.Web.Http.HttpPost]
        public MessageModel Add(JObject jsonData)
        {
            dynamic data = jsonData;

            _squareId++;
            var rent = new Rent()
            {
                Floor = data.Floor,
                IsFree = data.IsFree,
                Number = data.Number,
                Price = data.Price,
                Square = data.Square,
                SquareId = _squareId
            };
            _rents.Add(rent);

            return MessageBuilder.GetSuccessMessage(rent);
        }

        [System.Web.Http.HttpPost]
        public MessageModel Update(JObject jsonData)
        {
            try
            {
                dynamic data = jsonData;
                int squareId = data.SquareId;
                var currRent = _rents.SingleOrDefault(x => x.SquareId == squareId);
                currRent.Floor = data.Floor;
                currRent.IsFree = data.IsFree;
                currRent.Price = data.Price;
                currRent.Number = data.Number;
                currRent.Square = data.Square;
                currRent.X1 = data.X1;
                currRent.X2 = data.X2;
                currRent.Y1 = data.Y1;
                currRent.Y2 = data.Y2;

                return MessageBuilder.GetSuccessMessage(null);
            }
            catch (Exception ex)
            {
                return MessageBuilder.GetErrorMessage(ex.Message);
            }
        }

        [System.Web.Http.HttpGet]
        public MessageModel List()
        {
            return MessageBuilder.GetSuccessMessage(_rents);
        }

        [System.Web.Http.HttpPost]
        public MessageModel Delete(JObject jsonData)
        {
            dynamic data = jsonData;
            var currRent = _rents.Single(x => x.SquareId == (int)data.SquareId);
            _rents.Remove(currRent);
            return MessageBuilder.GetSuccessMessage(null);
        }
    }
}

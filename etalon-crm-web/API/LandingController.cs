using DataService;
using etalon_crm_web.Models.Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace etalon_crm_web.API
{
    [AllowAnonymous]
    public class LandingController : ApiController
    {
        [HttpPost]
        public MessageModel SendOrder(JObject jsonData)
        {
            dynamic json = jsonData;
            string user = json.user;
            string email = json.email;
            string phone = json.phone;
            string officeNum = json.officeNum;

            string receiveAddress = ConfigurationManager.AppSettings["EmailForLandingOrders"];
            var address = new List<string>();
            address.Add(receiveAddress);

            MailSender.Send("Новый заказ помещения с сайта", string.Format("Добрый день, пользователь сделал заказ кабинета: <br> ФИО: {0} <br> Почта: {1} <br> Телефон: {2} <br> Номер желаемого офиса: {3} <br><br>", user, email, phone, officeNum), address);

            return MessageBuilder.GetSuccessMessage(null);
        }
    }
}
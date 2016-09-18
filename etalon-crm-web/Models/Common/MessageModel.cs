using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace etalon_crm_web.Models.Common
{
    public class MessageModel
    {
        public string Status;
        public string Message;
        public Object Data;
    }

    public static class MessageBuilder
    {
        public static MessageModel GetErrorMessage(string error)
        {
            var message = new MessageModel()
            {
                Status = "Error",
                Message = error,
                Data = string.Empty
            };

            return message;
        }

        public static MessageModel GetSuccessMessage(Object data)
        {
            var message = new MessageModel()
            {
                Status = "OK",
                Message = string.Empty,
                Data = data,
            };

            return message;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace etalon_crm_web.Models.Common
{
    public class MessageModel
    {
        public bool success;
        public string message;
        public Object data;
    }

    public static class MessageBuilder
    {
        public static MessageModel GetErrorMessage(string error)
        {
            var message = new MessageModel()
            {
                success = false,
                message = error,
                data = string.Empty
            };

            return message;
        }

        public static MessageModel GetSuccessMessage(Object data)
        {
            var message = new MessageModel()
            {
                success = true,
                message = string.Empty,
                data = data,
            };

            return message;
        }
    }
}
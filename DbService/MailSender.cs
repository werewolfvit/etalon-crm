using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace DataService
{
    public static class MailSender
    {
        private static string _login;
        private static string _pass;
        private static string _host;
        private static string _port;

        private static void ReadData()
        {
            _login = ConfigurationManager.AppSettings["login"];
            _pass = ConfigurationManager.AppSettings["pass"];
            _host = ConfigurationManager.AppSettings["host"];
            _port = ConfigurationManager.AppSettings["port"];
        }

        public static void Send(string subject, string message, List<string> addresses)
        {
            if (string.IsNullOrWhiteSpace(_login))
                ReadData();


            var smtpClient = new SmtpClient(_host, int.Parse(_port))
            {
                Credentials = new NetworkCredential(_login, _pass),
                EnableSsl = true
            };

            for (int i = 0; i <= addresses.Count - 1; i++)
            {
                var msg = new MailMessage(_login, addresses[i], subject, message + "</br></br><i><b>Данное сообщение отправлено автоматически, просим не отвечать на него.</b></i>");
                msg.IsBodyHtml = true;
                smtpClient.Send(msg);
            }
            
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class MessageHeaderOutModel
    {
        public int IdRecord { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public DateTime DateCreate { get; set; }
        public bool IsReaded { get; set; }
    }

    public class MessageOutModel
    {
        public int IdRecord { get; set; }
        public UserModel Sender { get; set; }
        public IEnumerable<UserModel> Recepients { get; set; }
        public DateTime DateCreate { get; set; }
        public string Subject { get; set; }
        public string MessageText { get; set; }
        public IEnumerable<AttachmentOutModel> Attachments { get; set; }
        public bool IsReaded { get; set; }
    }

    public class AttachmentOutModel
    {
        public int IdRecord { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public class MessageInModel
    {
        public string Subject { get; set; }
        public string MessageText { get; set; }
        public IEnumerable<int> Attachments { get; set; }
        public IEnumerable<string> Recepients { get; set; }
    }
}

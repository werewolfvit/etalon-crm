using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class RecepientModel
    {
        public string IdRecord { get; set; }
        public string Recepient { get; set; }
    }

    public class UserMessageModel
    {
        public string IdRecord { get; set; }
        public string Subject { get; set; }
        public List<string> Recepients { get; set; }
        public string UserIdFrom { get; set; }
        public string TextTo { get; set; }
        public string TextFrom { get; set; }
        public string Text { get; set; }
        public DateTime DateCreate { get; set; }
        public bool IsReaded { get; set; }
    }
}

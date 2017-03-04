using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class CompanyModel
    {
        public int? IdRecord { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string DocNum { get; set; }
        public DateTime? DocDate { get; set; }
        public string Building { get; set; }
        public string BTINums { get; set; }
        public DateTime? DocExpDate { get; set; }
        public decimal? RentPayment { get; set; }
        public int? MonthCount { get; set; }
        public decimal? PayByDoc { get; set; }
        public decimal? PayReceived { get; set; }
        public decimal? ToPay { get; set; }
    }
}

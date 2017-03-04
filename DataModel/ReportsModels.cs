using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataModel
{
    public class ReportClientRoomModel
    {
        public string DocNum { get; set; }
        public DateTime? DocDate { get; set; }
        public string FullName { get; set; }
        public decimal? Square { get; set; }
        public string Building { get; set; }
        public int? FloorId { get; set; }
        public string BTINums { get; set; }
        public string Number { get; set; }
        public DateTime? DocExpDate { get; set; }
        public decimal? RentPayment { get; set; }
	    public int? MonthCount{ get; set; }
        public decimal? PayByDoc { get; set; }
        public decimal? PayReceived { get; set; }
        public decimal? ToPay { get; set; }
        public decimal? MeterPrice { get; set; }
    }
}
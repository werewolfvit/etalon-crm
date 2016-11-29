using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class RoomModel
    {
        public int IdRecord { get; set; }
        public int? FloorId { get; set; }
        public string Number { get; set; }
        public decimal? Square { get; set; }
        public decimal? MeterPrice { get; set; }
        public int? X1 { get; set; }
        public int? X2 { get; set; }
        public int? Y1 { get; set; }
        public int? Y2 { get; set; }
        public int? CompanyId { get; set; }
        //
        public string DocNum { get; set; }
        public DateTime? DocDate { get; set; }
        public string Building { get; set; }
        public string BTINums { get; set; }
        public DateTime? DocExpDate { get; set; }
        public decimal? RentPayment { get; set; }
    }

    public class RoomPhotoModel
    {
        public int IdRecord { get; set; }
        public int RoomId { get; set; }
        public string Url { get; set; }
    }
}
